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
// import { iconsForTeams } from "@/delete-later/data"
import { folderIcons } from "@/lib/color-and-icon/colors-and-icons"
import { AddFolderDialogProps } from "@/types/props-types/folder."
import { Folder, Plus } from "lucide-react"

export function AddFolderDialog({ open, setOpen }: AddFolderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <form className="dark">
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col">
            <div className="flex items-center gap-2">
              <Folder />
              <DialogTitle>New Folder</DialogTitle>
            </div>
            <div>
              <DialogDescription className="text-sm">
                Organise your notes into a folder.
              </DialogDescription>
            </div>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="e.g. Work, Personal, Ideas" />
              <FieldDescription>This will appear in your sidebar. </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="textarea-message">Description <span className="text-card-foreground/50">(optional)</span></FieldLabel>
              <Textarea id="textarea-message" placeholder="Enter anything that describes this library." />
            </Field>
            <Field>
              <FieldLabel>
                Color <span className="text-card-foreground/50">(optional)</span>
              </FieldLabel>

              <div className="flex flex-wrap gap-3">
                {folderIcons.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Button
                      key={index}
                      className="rounded-md w-10 h-10 p-4 flex items-center justify-center border bg-transparent
                     bg-card-foreground/50 ring ring-card-foreground/50 ring-offset-2 ring-offset-background"
                    >
                      <Icon className="w-6 h-6 text-card-foreground" />
                    </Button>
                  );
                })}
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
