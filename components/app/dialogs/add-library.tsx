import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { libraryColors } from "@/lib/color-and-icon/colors-and-icons"
import { AddLibraryDialogProps } from "@/types/props-types/library"
import { Check, Folder, LibraryBig, LibraryBigIcon, Plus, PlusIcon, SquareLibrary } from "lucide-react"

export function AddLibraryDialog({ open, setOpen }: AddLibraryDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <form className="dark">
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <SquareLibrary/>
                            <DialogTitle>New Library</DialogTitle>
                        </div>
                        <div>
                            <DialogDescription className="text-sm">
                                Organise your folder into a library.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" placeholder="e.g. Work, Personal, Ideas" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="textarea-message">Description <span className="text-card-foreground/50">(optional)</span></FieldLabel>
                            {/* <FieldDescription></FieldDescription> */}
                            <Textarea id="textarea-message" placeholder="Enter anything that describes this library." />
                        </Field>
                        <Field className="">
                            <FieldLabel htmlFor="textarea-message">Color <span className="text-card-foreground/50">(optional)</span></FieldLabel>
                            <div className="flex gap-3">
                                {libraryColors.map((color, index) => (
                                    <Button
                                        key={index}
                                        style={{ backgroundColor: color.code }}
                                        className="rounded-full w-10 h-10 p-0 flex items-center justify-center
                                                    ring-2 ring-card-foreground/50 ring-offset-2 ring-offset-background"
                                    >
                                        <Check className="text-card-foreground/50" />
                                    </Button>
                                ))}
                            </div>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">add library</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
