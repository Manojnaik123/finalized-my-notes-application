import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NOTES_KEY, TOAST_POSITION } from "@/lib/query-keys/query-keyx";
import { Note } from "@/types/main-types/note";
import { toast } from "sonner";

export function useToggleNotePublic(folderId: number) {
    const queryClient = useQueryClient();

    const { mutate: togglePublic, isPending: isLoading } = useMutation({
        mutationFn: async ({ noteId, isPublic }: { noteId: number; isPublic: boolean }) => {
            const res = await fetch(`/api/notes/${noteId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_public: isPublic }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to update note");
            return result.data;
        },

        onMutate: async ({ noteId, isPublic }) => {
            await queryClient.cancelQueries({ queryKey: [NOTES_KEY] });
            const previousNotes = queryClient.getQueryData<Note[]>([NOTES_KEY]);

            queryClient.setQueryData([NOTES_KEY], (old: Note[] = []) =>
                old.map((note) =>
                    note.id === noteId ? { ...note, is_public: isPublic } : note
                )
            );

            return { previousNotes };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData([NOTES_KEY], context?.previousNotes);
            toast.error(err instanceof Error ? err.message : "Failed to update note", {
                position: TOAST_POSITION,
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTES_KEY, folderId] });
            toast.success("Note visibility updated", { position: TOAST_POSITION });
        },
    });

    return { togglePublic, isLoading };
}