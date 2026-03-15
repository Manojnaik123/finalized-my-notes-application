import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter, useParams } from "next/navigation"
import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Note } from "@/types/main-types/note"
import { toast } from "sonner"

const createNote = async (payload: { title: string; folder_id: number }): Promise<Note> => {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create note")
  const { data } = await res.json()
  return data
}

export function useNewNote() {
  const router = useRouter()
  const { folderId, libraryId } = useParams()
  const numericFolderID = Number(folderId)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.setQueryData<Note[]>([NOTES_KEY, numericFolderID], (old) =>
        old ? [...old, newNote] : [newNote]
      )
      router.push(`/mynotes/dashboard/${libraryId}/${folderId}/${newNote.id}`)
    },
    onError: () => {
      toast.error("Failed to create note")
    }
  })

  const handleCreateNote = () => {
    const notes = queryClient.getQueryData<Note[]>([NOTES_KEY, numericFolderID])
    const untitledCount = notes?.filter((n) => n.title?.startsWith("Untitled")).length ?? 0
    const defaultTitle = untitledCount === 0 ? "Untitled" : `Untitled ${untitledCount + 1}`

    mutate({ title: defaultTitle, folder_id: numericFolderID })
  }

  return { handleCreateNote, isPending }
}