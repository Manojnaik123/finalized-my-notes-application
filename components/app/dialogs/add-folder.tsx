'use client'
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
import { useTheme } from "@/context/theme-context"
import { useFolders } from "@/hooks/use-folders"

import { useSaveFolder } from "@/hooks/use-save-folder"
// import { iconsForTeams } from "@/delete-later/data"
import { folderIcons } from "@/lib/color-and-icon/colors-and-icons"
import { validateFolderNameClient } from "@/lib/validations/all-validations"
import { AddFolderDialogProps, Folder } from "@/types/props-types/folder."
import { Folder as FolderIcon, Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const defaultForm: Partial<Folder> = {
  folder_name: '',
  description: '',
  library_id: 0,
  icon_id: 1 // hardcoded values needs attention
}

export function AddFolderDialog({ open, setOpen, folderId }: AddFolderDialogProps) {
  const [form, setFormData] = useState<Partial<Folder>>(defaultForm)

  const [error, setError] = useState<string>('')

  const { isDark } = useTheme()

  const { libraryId } = useParams()
  const numericLibraryId = Number(libraryId)

  const { data: folders } = useFolders(numericLibraryId)

  const { mutate: addFolder, error: responseError } = useSaveFolder()

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault()
    setOpen(false)
    const error = validateFolderNameClient(form.folder_name || '')
    if (error) {
      setError(error);
      return;
    }
    addFolder(form, {
      // onSuccess: () => {
      //   setOpen(false)
      // },
      onError: (err) => {
        toast.error(err.message, { position: "top-center" });
      }
    })
  }

  function handleChange(identifier: keyof typeof defaultForm, value: string) {
    setFormData((prev) => (
      {
        ...prev,
        [identifier]: value
      }
    ))
  }

  useEffect(() => {
    setError('');
    if (folderId && folderId > 0 && folders) {
      const fold = folders.find(l => l.id === folderId)
      if (fold) {
        setFormData({
          id: fold.id,
          folder_name: fold.folder_name,
          description: fold.description,
          icon_id: fold.icon_id,
          library_id: fold.library_id
        });
      }
    } else {
      setFormData({
        folder_name: "",
        description: "",
        icon_id: 0,
        library_id: numericLibraryId,
      })
    }

  }, [open, folders, folderId])

  console.log(form);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className={`sm:max-w-md text-foreground ${isDark ? 'dark' : ''}`}>
        <form className="" onSubmit={handleSubmit}>
          <DialogHeader className="flex flex-col">
            <div className="flex items-center gap-2">
              <FolderIcon />
              <DialogTitle>New Folder</DialogTitle>
            </div>
            <div>
              <DialogDescription className="text-sm">
                Organise your notes into a folder.
              </DialogDescription>
            </div>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="e.g. Work, Personal, Ideas"
                value={form.folder_name}
                onChange={(e) => handleChange("folder_name", e.target.value)}
              />
              {error != '' && (
                <FieldDescription className="text-destructive"> {error} </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="textarea-message">Description <span className="text-card-foreground/50">(optional)</span></FieldLabel>
              <Textarea
                id="textarea-message"
                placeholder="Enter anything that describes this library."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
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
                      type="button"
                      key={item.id}
                      className="rounded-md w-10 h-10 p-4 flex items-center justify-center border bg-transparent
                     bg-card-foreground/50 ring ring-card-foreground/50 ring-offset-2 ring-offset-background"
                      onClick={() => {
                        setFormData((prev) => (
                          {
                            ...prev,
                            icon_id: item.id
                          }
                        ))
                      }}
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
        </form>
      </DialogContent>
    </Dialog>
  )
}
