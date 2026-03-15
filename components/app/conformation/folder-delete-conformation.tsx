import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useTheme } from "@/context/theme-context"
import { useDeleteFolder } from "@/hooks/use-delete-folder"
import { useDeleteLibrary } from "@/hooks/use-delete-library"
import { useFolders } from "@/hooks/use-folders"
import { FOLDERS_KEY, LIBRARIES_KEY } from "@/lib/query-keys/query-keyx"
import { Library } from "@/types/main-types/library"
import { DeleteLibraryDialogProps } from "@/types/props-types/delete-conformation-dialog"
import { DeleteFolderDialogProps } from "@/types/props-types/delete-folder-conformation-dialog"
import { Folder } from "@/types/props-types/folder."
import { useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export function DeleteFolderConformation({ open, setOpen }: DeleteFolderDialogProps) {
    const { folderId, libraryId } = useParams()

    const numericLibraryId = Number(libraryId)
    const numericFolderId = Number(folderId)

    const { data: folders } = useFolders(numericLibraryId)

    const curFolder = folders?.find((folder) => folder.id === numericFolderId)

    const { mutate: deleteFolder } = useDeleteFolder()

    const { isDark } = useTheme()

    const router = useRouter()

    function handleDeletion() {
        router.push(`/mynotes/dashboard/${numericLibraryId}`)
        deleteFolder(numericFolderId, {
            onError: (err) => {
                toast.error(`Failed to delete ${curFolder?.folder_name}. PLease try again later.`, { position: "top-center" });
            }
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={`sm:max-w-sm ${isDark && 'dark'}`}>
                <DialogHeader>
                    <DialogTitle className="text-foreground">Delete "{curFolder?.folder_name}"</DialogTitle>
                    <DialogDescription className="text-foreground/50">
                        This will permanently delete the folder and all its notes. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="text-foreground/50" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant={'destructive'} onClick={handleDeletion}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
