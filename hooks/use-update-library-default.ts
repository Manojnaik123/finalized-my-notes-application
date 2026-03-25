import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Library } from "@/types/main-types/library";
import { LIBRARIES_KEY, TOAST_POSITION } from "@/lib/query-keys/query-keyx";
import { toast } from "sonner";

export function useUpdateLibraryDefault() {
  const queryClient = useQueryClient();

  const { mutate: updateDefault, isPending: isLoading } = useMutation({
    mutationFn: async ({ libraryId, isDefault }: { libraryId: string; isDefault: boolean }) => {
      const res = await fetch(`/api/libraries/${libraryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_default: isDefault }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update library");
      return result.data;
    },

    onMutate: async ({ libraryId, isDefault }) => {
      await queryClient.cancelQueries({ queryKey: [LIBRARIES_KEY] });
      const previousLibraries = queryClient.getQueryData<Library[]>([LIBRARIES_KEY]);

      queryClient.setQueryData([LIBRARIES_KEY], (old: Library[] = []) =>
        old.map((lib) => ({
          ...lib,
          is_default: isDefault ? lib.id === Number(libraryId) : lib.id === Number(libraryId) ? false : lib.is_default,
        }))
      );

      return { previousLibraries };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData([LIBRARIES_KEY], context?.previousLibraries);
      toast.error(err instanceof Error ? err.message : "Failed to update library", { position: TOAST_POSITION });
    },
  });

  return { updateDefault, isLoading };
}