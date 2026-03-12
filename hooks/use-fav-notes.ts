import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { ApiResponse } from "@/types/api/api-response"
import { Note } from "@/types/main-types/note"
import { useQuery } from "@tanstack/react-query"

export const fetchNotesByLibrary = async (libraryId: number): Promise<Note[]> => {
  const res = await fetch(`/api/notes?libraryId=${libraryId}`)
  if (!res.ok) throw new Error("Failed to fetch")
  const { data, error } = await res.json() as ApiResponse<Note[]>
  if (error) throw new Error(error)
  return data ?? []
}

export const useNotesByLibrary = (libraryId: number) => {
  return useQuery({
    queryKey: [NOTES_KEY, 'library', libraryId],
    queryFn: () => fetchNotesByLibrary(libraryId),
    enabled: !!libraryId,
  })
}