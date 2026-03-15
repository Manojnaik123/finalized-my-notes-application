import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Library } from "@/types/main-types/library";
import { ApiResponse } from "@/types/api/api-response";
import { LIBRARIES_KEY } from "@/lib/query-keys/query-keyx";

const saveLibrary = async (body: Partial<Library>): Promise<Library> => {
  const method = body.id ? "PUT" : "POST";
  const url = body.id ? `/api/libraries/${body.id}` : "/api/libraries";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = (await res.json()) as ApiResponse<Library>;

  if (!res.ok || result.error) {
    throw new Error(result.error || `${method} request failed`);
  }

  return result.data!;
};

export const useSaveLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveLibrary,

    onMutate: async (library: Partial<Library>) => {
      await queryClient.cancelQueries({ queryKey: [LIBRARIES_KEY] });

      const previousLibraries =
        queryClient.getQueryData<Library[]>([LIBRARIES_KEY]) || [];

      let tempId: number | undefined;

      queryClient.setQueryData([LIBRARIES_KEY], (old: Library[] = []) => {
        if (library.id) {
          return old.map((lib) => {
            // if setting default, reset all others first
            if (library.is_default) {
              return lib.id === library.id
                ? { ...lib, ...library, updated_at: new Date().toISOString() }
                : { ...lib, is_default: false }  // ← reset all others
            }

            // normal update
            return lib.id === library.id
              ? { ...lib, ...library, updated_at: new Date().toISOString() }
              : lib
          });
        } else {
          tempId = Date.now();
          return [
            ...old,
            {
              id: tempId,
              name: library.name || "",
              color_id: library.color_id,
              user_id: 1,
              description: library.description,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } satisfies Library,
          ];
        }
      });

      return { previousLibraries, tempId };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData([LIBRARIES_KEY], context?.previousLibraries);
    },

    onSuccess: (savedLibrary, _, context) => {
      queryClient.setQueryData([LIBRARIES_KEY], (old: Library[] = []) =>
        old.map((lib) =>
          lib.id === context?.tempId || lib.id === savedLibrary.id
            ? savedLibrary
            : lib
        )
      );
    },
  });
};