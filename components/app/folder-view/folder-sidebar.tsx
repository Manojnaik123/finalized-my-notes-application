"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Footer from "@/components/app/dashboard/footer";
import FolderContentView from "@/components/app/folder-view/folder-content-view";
import NoteView from "@/components/app/folder-view/note-view";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useMiddleSideBar } from "@/context/middle-sidebar-context";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/types/main-types/note";
import { Heart, NotebookPen, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// export default function FolderSidebar({ children }: { children: React.ReactNode }) {

//     const [selectedNoteId, setselectedNoteId] = useState<number>(0);

//     const { folderId, noteId } = useParams()
//     const numericNoteId = Number(noteId)
//     const numericFolderId = Number(folderId)

//     function handleNoteSelected(noteId: number) {
//         setselectedNoteId(noteId);
//     }

//     const { isMiddleSideBarOpen, toggleMiddleSideBar } = useMiddleSideBar()

//     return (
//         <div className="w-full flex-1 flex flex-col min-h-0">
//             <div className="flex flex-1 min-h-0">
//                 <div className={`${numericNoteId ? 'hidden md:flex' : 'flex'} ${isMiddleSideBarOpen ? 'sm:max-w-sm' : 'max-w-14'} w-full  2xl:w-1/4 border-r overflow-y-auto scrollbar-custom`}>
//                     <FolderContentView onNoteClick={handleNoteSelected} />
//                 </div>
//                 {(numericNoteId > 0) && (
//                     <div className="flex-1 2xl:w-3/4 ">
//                         {children}
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     )
// }


export default function FolderSidebar({ children }: { children: React.ReactNode }) {
    const [notesData, setNotesData] = useState<Note[]>([])

    const [selectedNoteId, setselectedNoteId] = useState<number>(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const { libraryId ,folderId, noteId } = useParams()
    const numericNoteId = Number(noteId)
    const numericFolderId = Number(folderId)


    const { data: notes } = useNotes(numericFolderId)

    // setNotesData(notesData)

    const { isMiddleSideBarOpen, setIsToggleDisabled, setIsMiddleSideBarOpen } = useMiddleSideBar()  // ← need setter

    // useEffect(() => {
    //     if (!containerRef.current) return

    //     const observer = new ResizeObserver((entries) => {
    //         const width = entries[0].contentRect.width
    //         if (width < 850) {
    //             setIsMiddleSideBarOpen(false)
    //             setIsToggleDisabled(true)
    //         } else {
    //             setIsMiddleSideBarOpen(true)
    //             setIsToggleDisabled(false)
    //         }
    //     })

    //     observer.observe(containerRef.current)
    //     return () => observer.disconnect()
    // }, [])

    function handleNoteSelected(noteId: number) {
        setselectedNoteId(noteId);
    }

    return (
        <div ref={containerRef} className="w-full flex-1 flex flex-col min-h-0">
            <div className="flex flex-1 min-h-0">
                <div className={`${numericNoteId ? 'hidden md:flex' : 'flex'} ${isMiddleSideBarOpen ? 'sm:max-w-sm' : 'max-w-14'} w-full 2xl:w-1/4 border-r overflow-y-auto scrollbar-custom`}>
                    <FolderContentView onNoteClick={handleNoteSelected} />
                </div>
                {(numericNoteId >= 0) ? (
                    <div className="flex-1 2xl:w-3/4">
                        {children}
                    </div>
                ) : (
                    <div className="hidden md:flex w-full flex-col items-center justify-center h-full text-center text-foreground gap-3">
                        <NotebookPen className="w-10 h-10 text-muted-foreground" />
                        <h2 className="text-lg font-medium">No note selected</h2>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Pick a note from the list or create a new one to get started.
                        </p>
                        <Link href={`/mynotes/dashboard/${libraryId}/${folderId}/0`}

                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm mt-2"
                        >
                            <Plus className="w-4 h-4" />
                            New Note
                        </Link>
                    </div>

                )}
            </div>
            <Footer />
        </div>
    )
}

