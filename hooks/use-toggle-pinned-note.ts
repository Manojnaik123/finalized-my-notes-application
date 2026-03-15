'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Note } from "@/types/main-types/note"
import { toast } from "sonner"

const togglePinNote = async ({ noteId, folderId, isPinned }: { noteId: number; folderId: number; isPinned: boolean }): Promise<Note> => {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_id: folderId, is_pinned: isPinned }),
    })
    
    const { data, error } = await res.json();

    (res.status)
    if (!res.ok) {
        throw new Error(`${res.status}: ${error}`)
    }
    return data
}

export function useToggleNotePin(folderId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: togglePinNote,

        onMutate: async ({ noteId, isPinned }) => {
            await queryClient.cancelQueries({ queryKey: [NOTES_KEY, folderId] })

            const previousNotes = queryClient.getQueryData<Note[]>([NOTES_KEY, folderId])

            if (isPinned) {
                const pinnedCount = previousNotes?.filter(
                    (note) => note.is_pinned && note.id !== noteId
                ).length ?? 0

                if (pinnedCount >= 5) {
                    // ✅ Return a signal instead of throwing
                    return { previousNotes, blocked: true, blockReason: "You can only pin up to 5 notes per folder" }
                }
            }

            queryClient.setQueryData<Note[]>([NOTES_KEY, folderId], (old) =>
                old?.map((note) =>
                    note.id === noteId
                        ? { ...note, is_pinned: isPinned }
                        : note
                ) ?? []
            )

            return { previousNotes }
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData([NOTES_KEY, folderId], context?.previousNotes)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTES_KEY, folderId] })
        },
    })
}