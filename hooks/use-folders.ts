import { useQuery } from "@tanstack/react-query"
import { Library } from "@/types/main-types/library"
import { ApiResponse } from "@/types/api/api-response"
import { FOLDERS_KEY, LIBRARIES_KEY } from "@/lib/query-keys/query-keyx"
import { Folder } from "@/types/props-types/folder."

const fetchLibraries = async (libraryId: number): Promise<Folder[]> => {
  const res = await fetch(`/api/folders?libraryId=${libraryId}`)
  if (!res.ok) throw new Error("Failed to fetch")
  const { data, error } = await res.json() as ApiResponse<Folder[]>
  if (error) throw new Error(error)
  return data ?? []
}

export const useFolders = (libraryId: number) => {
  return useQuery({
    queryKey: [FOLDERS_KEY],
    queryFn: () => fetchLibraries(libraryId),
  })
}