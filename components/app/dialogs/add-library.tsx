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
import { useSaveLibrary } from "@/hooks/use-add-library"
import { useLibraries } from "@/hooks/use-libraries"
import { libraryColors } from "@/lib/color-and-icon/colors-and-icons"
import { validateLibraryNameClient } from "@/lib/validations/all-validations"
import { Library } from "@/types/main-types/library"
import { AddLibraryDialogProps } from "@/types/props-types/library"
import { Check, Folder, LibraryBig, LibraryBigIcon, Plus, PlusIcon, SquareLibrary } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

const defaultForm: Partial<Library> = {
    name: '',
    description: '',
    color_id: libraryColors[0].id
}

export function AddLibraryDialog({ open, setOpen, libraryId }: AddLibraryDialogProps) {
    const [form, setFormData] = useState<Partial<Library>>(defaultForm)
    const [error, setError] = useState<string>('')
    const { mutate: addLibrary, error: responseError } = useSaveLibrary()

    const { data: libraries } = useLibraries()

    useEffect(() => {
        setError('');
        if (libraryId && libraryId > 0 && libraries) {
            const lib = libraries.find(l => l.id === libraryId)
            if (lib) {
                setFormData({
                    id: lib.id,
                    name: lib.name,
                    description: lib.description,
                    color_id: lib.color_id,
                });
                return;
            }
        }
        setFormData(defaultForm);
    }, [open, libraries])

    function handleChange(field: keyof typeof defaultForm, value: string | number) {
        setFormData((prev) => (
            {
                ...prev,
                [field]: value
            }
        ))
    }

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const error = validateLibraryNameClient(form.name || '');
        if (error) {
            setError(error);
            return;
        }
        addLibrary(form, {
            onError: (err) => {
                toast.error(err.message, { position: "top-center" });
            }
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-md">
                <form className="" onSubmit={handleSubmit}>
                    <DialogHeader className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <SquareLibrary />
                            <DialogTitle>New Library</DialogTitle>
                        </div>
                        <div>
                            <DialogDescription className="text-sm">
                                Organise your folder into a library.
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
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
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
                        <Field className="">
                            <FieldLabel htmlFor="textarea-message">Color <span className="text-card-foreground/50">(optional)</span></FieldLabel>
                            <div className="flex gap-3">
                                {libraryColors.map((color, index) => (
                                    <Button
                                        type="button"
                                        key={index}
                                        style={{ backgroundColor: color.code }}
                                        onClick={() => handleChange("color_id", color.id)}
                                        className={`rounded-full w-10 h-10 p-0 flex items-center justify-center
                                                    ${form.color_id === color.id ? 'ring-2 ring-card-foreground/50 ring-offset-2 ring-offset-background' : ''}`}
                                    >
                                        {form.color_id === color.id && <Check className="text-card-foreground/50" strokeWidth={3} />}
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
                </form>
            </DialogContent>

        </Dialog>
    )
}
