import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiResponse } from "@/types/api/api-response";
import { FOLDERS_KEY } from "@/lib/query-keys/query-keyx";
import { Folder } from "@/types/props-types/folder.";

const saveFolder = async (body: Partial<Folder>): Promise<Folder> => {
  const method = body.id ? "PUT" : "POST";
  const url = body.id ? `/api/folders/${body.id}` : "/api/folders";
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = (await res.json()) as ApiResponse<Folder>;
  
  if (!res.ok || result.error) {
    throw new Error(result.error || `${method} request failed`);
  }

  return result.data!;
};

export const useSaveFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveFolder,

    onMutate: async (folder: Partial<Folder>) => {
      await queryClient.cancelQueries({ queryKey: [FOLDERS_KEY] });

      const previousFolders =
        queryClient.getQueryData<Folder[]>([FOLDERS_KEY]) || [];

      let tempId: number | undefined;

      queryClient.setQueryData([FOLDERS_KEY], (old: Folder[] = []) => {
        if (folder.id) {
          return old.map((fold) => {
            return fold.id === folder.id
              ? { ...fold, ...folder, updated_at: new Date().toISOString() }
              : fold
          });
        } else {
          tempId = Date.now();
          return [
            ...old,
            {
              id: tempId,
              folder_name: folder.folder_name || "",
              icon_id: folder.icon_id,
              user_id: 1,
              library_id: 1,
              description: folder.description,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } satisfies Folder,
          ];
        }
      });

      return { previousFolders, tempId };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData([FOLDERS_KEY], context?.previousFolders);
    },

    onSuccess: (savedFolder, _, context) => {
      queryClient.setQueryData([FOLDERS_KEY], (old: Folder[] = []) =>
        old.map((fold) =>
          fold.id === context?.tempId || fold.id === savedFolder.id
            ? savedFolder
            : fold
        )
      );
    },
  });
};