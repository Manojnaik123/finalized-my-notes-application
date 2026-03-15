import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Note } from "@/types/main-types/note"

const deleteNote = async (noteId: number): Promise<void> => {
    console.log('from hook ');
    
    console.log(noteId);
    
    const res = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete note")
}

export function useDeleteNote(folderId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteNote,

        
        onMutate: async (noteId: number) => {
            await queryClient.cancelQueries({ queryKey: [NOTES_KEY, folderId] })

            const previousNotes = queryClient.getQueryData<Note[]>([NOTES_KEY, folderId])

            queryClient.setQueryData<Note[]>([NOTES_KEY, folderId], (old) =>
                old?.filter((note) => note.id !== noteId) ?? []
            )

            return { previousNotes }
        },

        
        onError: (err, noteId, context) => {
            queryClient.setQueryData([NOTES_KEY, folderId], context?.previousNotes)
        },

        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTES_KEY, folderId] })
        },
    })
}