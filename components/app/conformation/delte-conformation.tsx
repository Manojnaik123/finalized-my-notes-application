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
import { useDeleteLibrary } from "@/hooks/use-delete-library"
import { LIBRARIES_KEY } from "@/lib/query-keys/query-keyx"
import { Library } from "@/types/main-types/library"
import { DeleteLibraryDialogProps } from "@/types/props-types/delete-conformation-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function DeleteConformation({ open, setOpen, libraryId }: DeleteLibraryDialogProps) {
    const queryClient = useQueryClient();

    const libraries = queryClient.getQueryData<Library[]>([LIBRARIES_KEY])

    const libraryToBeDeleted = libraries?.find((library) => library.id === libraryId);

    const { mutate: deleteLibrary } = useDeleteLibrary();

    function handleDeletion() {
        deleteLibrary(libraryId, {
            onError: (err) => {
                toast.error(`Failed to delete ${libraryToBeDeleted?.name}. PLease try again later.`, { position: "top-center" });
            }
        })
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete "{libraryToBeDeleted?.name}"</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the library and all its folders. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant={'destructive'} onClick={handleDeletion}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
