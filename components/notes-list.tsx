import { StickyNote } from "lucide-react"
import { SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar"
import Link from "next/link"
import { useNotes } from "@/hooks/use-notes"
import { Skeleton } from "./ui/skeleton"

export function NotesList({ libraryId, folderId, noteId }: { libraryId: number, folderId: number, noteId: number }) {
    const { data: notes, isLoading } = useNotes(folderId)

    if (isLoading) return (
        <>
            {Array.from({ length: 2 }).map((_, i) => (
                <SidebarMenuSubItem key={i}>
                    <SidebarMenuSubButton className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-foreground/5" />
                        <Skeleton className="h-3 w-24 bg-foreground/5" />
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}
        </>
    )

    return (
        <>
            {notes?.map((note) => (
                <SidebarMenuSubItem key={note.title}>
                    <SidebarMenuSubButton asChild className={` ${noteId === note.id ? 'hover:bg-foreground/5 bg-foreground/5' : 'hover:bg-foreground/5'} `}>
                        <Link href={`/mynotes/dashboard/${libraryId}/${folderId}/${note.id}`} > {/* href={subItem.url} */}
                            <StickyNote />
                            <span>{note.title}</span>
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}
        </>
    )
}