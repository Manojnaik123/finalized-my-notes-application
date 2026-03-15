'use client'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/context/theme-context"
import { useToggleFavourite } from "@/hooks/use-toggle-favourite"
import { Note } from "@/types/main-types/note"
import { Heart, HeartOff, MoreHorizontal, Pin, PinOff, Plus, Star, Trash } from "lucide-react"
import { useParams } from "next/navigation"

export function NoteViewDropDown({ setDeleteAlertOpen, handleNotePinToggle, note }: { setDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>, handleNotePinToggle: (isTrue: boolean) => void, note: Note }) {
    const { libraryId } = useParams();
    const numericLibraryId = Number(libraryId)

    const { isDark } = useTheme()
    const { mutate: toggleFavourite } = useToggleFavourite(numericLibraryId, note.folder_id)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`${isDark ? 'dark' : ''} w-52 `} alignOffset={-170}>
                <DropdownMenuGroup>
                    <DropdownMenuItem className=""
                        onClick={() =>
                            toggleFavourite({
                                libraryId: numericLibraryId,
                                noteId: note.id,
                                isFavourite: !note?.is_favourite
                            })
                        }>
                        {note.is_favourite ? (
                            <>
                                <HeartOff />
                                Remove from Favourite
                            </>

                        ) : (
                            <>
                                <Heart />
                                Add to Favourite
                            </>
                        )}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleNotePinToggle(note.is_pinned ? false : true)}>
                        {note.is_pinned ? (
                            <>
                                <PinOff />
                                Unpin this note
                            </>
                        ) : (
                            <>
                                <Pin />
                                Pin this note
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteAlertOpen(true)}>
                    <Trash />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
