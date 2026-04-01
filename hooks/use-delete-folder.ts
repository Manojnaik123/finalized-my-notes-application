import { FOLDERS_KEY } from "@/lib/query-keys/query-keyx"
import { ApiResponse } from "@/types/api/api-response"
import { Folder } from "@/types/props-types/folder."
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteFolder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/folders/${id}`, { method: "DELETE" })
            if (!res.ok) {
                const { error } = await res.json() as ApiResponse<null>
                throw new Error(error || "Failed to delete Folder")
            }
        },

        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: [FOLDERS_KEY] })
            const previousFolders = queryClient.getQueryData<Folder[]>([FOLDERS_KEY])

            queryClient.setQueryData([FOLDERS_KEY], (old: Folder[] = []) =>
                old.filter((fold) => fold.id !== id)
            )

            return { previousFolders }
        },

        onError: (_, __, context) => {
            queryClient.setQueryData([FOLDERS_KEY], context?.previousFolders)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FOLDERS_KEY] })
        }
    })
}