import { LIBRARIES_KEY } from "@/lib/query-keys/query-keyx"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteLibrary = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/libraries/${id}`, { method: "DELETE" })
            if (!res.ok) {
                const { error } = await res.json() as ApiResponse<null>
                throw new Error(error || "Failed to delete library")
            }
        },

        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: [LIBRARIES_KEY] })
            const previousLibraries = queryClient.getQueryData<Library[]>([LIBRARIES_KEY])

            queryClient.setQueryData([LIBRARIES_KEY], (old: Library[] = []) =>
                old.filter((lib) => lib.id !== id)
            )

            return { previousLibraries }
        },

        onError: (_, __, context) => {
            queryClient.setQueryData([LIBRARIES_KEY], context?.previousLibraries)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [LIBRARIES_KEY] })
        }
    })
}