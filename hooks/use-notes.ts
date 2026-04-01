import { useQuery } from "@tanstack/react-query"
import { Library } from "@/types/main-types/library"
import { ApiResponse } from "@/types/api/api-response"
import { FOLDERS_KEY, LIBRARIES_KEY, NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Folder } from "@/types/props-types/folder."
import { Note } from "@/types/main-types/note"

export const fetchNotes = async (folderId: number): Promise<Note[]> => {
  const res = await fetch(`/api/notes?folderId=${folderId}`)
  if (!res.ok) throw new Error("Failed to fetch")
  const { data, error } = await res.json() as ApiResponse<Note[]>
  if (error) throw new Error(error)
  return data ?? []
}

export const useNotes = (folderId: number) => {
  return useQuery({
    queryKey: [NOTES_KEY, folderId],
    queryFn: () => fetchNotes(folderId),
  })
}