import { useQuery } from "@tanstack/react-query"
import { Library } from "@/types/main-types/library"
import { ApiResponse } from "@/types/api/api-response"
import { LIBRARIES_KEY } from "@/lib/query-keys/query-keyx"

const fetchLibraries = async (): Promise<Library[]> => {
  const res = await fetch("/api/libraries")
  if (!res.ok) throw new Error("Failed to fetch")
  const { data, error } = await res.json() as ApiResponse<Library[]>
  if (error) throw new Error(error)
  return data ?? []
}

export const useLibraries = () => {
  return useQuery({
    queryKey: [LIBRARIES_KEY],
    queryFn: fetchLibraries,
  })
}