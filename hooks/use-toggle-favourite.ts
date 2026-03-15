import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Note } from "@/types/main-types/note"
import { toast } from "sonner"

const toggleFavourite = async ({ libraryId, noteId, isFavourite }: { noteId: number; isFavourite: boolean; libraryId: number }): Promise<Note> => {
  const res = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_favourite: isFavourite }),
  })
  if (!res.ok) throw new Error("Failed to update favourite")
  const { data } = await res.json()
  return data
}

export function useToggleFavourite(libraryId: number, folderId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavourite,

    onMutate: async ({ noteId, isFavourite }) => {
      await queryClient.cancelQueries({ queryKey: [NOTES_KEY, folderId] })
      await queryClient.cancelQueries({ queryKey: [NOTES_KEY, 'library', libraryId] })

      queryClient.invalidateQueries({ queryKey: [NOTES_KEY, folderId] })
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY, 'library', libraryId] })

      const previousNotes = queryClient.getQueryData<Note[]>([NOTES_KEY, folderId])
      const previousLibraryNotes = queryClient.getQueryData<Note[]>([NOTES_KEY, 'library', libraryId])

      queryClient.setQueryData<Note[]>([NOTES_KEY, folderId], (old) =>
        old?.map((note) =>
          note.id === noteId
            ? { ...note, is_favourite: isFavourite }
            : note
        ) ?? []
      )
      queryClient.setQueryData<Note[]>([NOTES_KEY, 'library', libraryId], (old) =>
        old?.map((note) =>
          note.id === noteId ? { ...note, is_favourite: isFavourite } : note
        ) ?? []
      )

      return { previousNotes, previousLibraryNotes }
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData([NOTES_KEY, folderId], context?.previousNotes)
      queryClient.setQueryData([NOTES_KEY, 'library', libraryId], context?.previousLibraryNotes) // ✅
      toast.error("Failed to update favourite")
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY, folderId] })
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY, 'library', libraryId] })
    },
  })
}