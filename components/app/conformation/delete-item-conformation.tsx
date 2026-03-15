import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-context"
import { DeleteItemDialogProps } from "@/types/props-types/delete-item-conformation"
import { Trash2Icon } from "lucide-react"

export function AlertDialogForDeletion({ itemName, itemType, open, setOpen, handleDeletion }: DeleteItemDialogProps) {
    const { isDark } = useTheme()
    return (
        <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete "{itemName}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently <span className="text-destructive">delete</span> the {itemType} and all its contents. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDeletion}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
