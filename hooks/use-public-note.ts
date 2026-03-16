import { useQuery } from "@tanstack/react-query"
import { Note } from "@/types/main-types/note"

const fetchPublicNote = async (noteId: string): Promise<Note> => {
    const res = await fetch(`/api/public/note/${noteId}`)
    const { data, error } = await res.json()

    if (!res.ok || !data) throw new Error(error ?? "Note not found")

    return data
}

export function usePublicNote(noteId: string) {
    return useQuery({
        queryKey: ["public-note", noteId],
        queryFn: () => fetchPublicNote(noteId),
        enabled: !!noteId,
        retry: false, // ✅ don't retry on 404
    })
}