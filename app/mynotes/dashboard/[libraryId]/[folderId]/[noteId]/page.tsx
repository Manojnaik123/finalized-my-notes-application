'use client';

import React, { useEffect, useState } from 'react'
import Tiptap from '@/components/app/tiptap/trial-editor'
import { Button } from '@/components/ui/button'
import { Calendar, CalendarRange, Check, CircleX, Heart, History, MoreHorizontal, PanelLeft, PanelLeftIcon, Pin, SaveOff, Tag, Ticket, Trash, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { folders, getNotes } from '@/delete-later/data'
import { BreadcrumbMobile } from '@/components/app/mobile/breadcrumb'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query';
import { NOTES_KEY, TOAST_POSITION } from '@/lib/query-keys/query-keyx';
import { Note } from '@/types/main-types/note';
import { Separator } from '@/components/ui/separator';
import { useMiddleSideBar } from '@/context/middle-sidebar-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip } from '@/components/app/others/ToolTip';
import { Spinner } from '@/components/ui/spinner';
import { useAutoSave } from '@/hooks/use-auto-save'
import { Input } from '@/components/ui/input';
import { NoteViewDropDown } from '@/components/app/dropdowns/note-view-dropdown';
import { DeleteConformation } from '@/components/app/conformation/library-delete-conformation';
import { AlertDialogForDeletion } from '@/components/app/conformation/delete-item-conformation';
import { useDeleteNote } from '@/hooks/use-delete-note';
import { toast } from 'sonner';
import { useToggleFavourite } from '@/hooks/use-toggle-favourite';
import { useToggleNotePin } from '@/hooks/use-toggle-pinned-note';
import { formatCreatedDate } from '@/lib/text-formaters/text-formaters';
import { PopoverDemo } from '@/components/app/dropdowns/sharable-popover';

import { useUser } from '@clerk/nextjs';
import { useToggleNotePublic } from '@/hooks/use-toggle-note-public';
import { useQuery } from '@tanstack/react-query';

const NotePage = () => {
    const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false)
    const [showSkeleton, setShowSkeleton] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')

    const { libraryId, noteId, folderId } = useParams()

    const numericFolderID = Number(folderId)
    const numericNoteID = Number(noteId)
    const numericLibraryID = Number(libraryId)

    const queryClient = useQueryClient()
    const { toggleMiddleSideBar, isToggleDisabled } = useMiddleSideBar()

    const { data: notes } = useQuery<Note[]>({
        queryKey: [NOTES_KEY, numericFolderID],
        enabled: false, 
        staleTime: Infinity,
    })

    const currentNote = notes?.find((note) => note.id === numericNoteID)

    const { saveStatus, triggerSave } = useAutoSave({
        libraryId: numericLibraryID,
        noteId: String(numericNoteID),
        folderId: numericFolderID
    })

    const SaveIndicator = () => {
        if (saveStatus === 'saving') return <span className='text-xs text-muted-foreground flex items-center gap-1'><Spinner /> saving...</span>
        if (saveStatus === 'saved') return (
            <span className="flex items-center gap-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                all changes saved
            </span>
        )
        if (saveStatus === 'error') return <span className='text-xs text-muted-foreground flex items-center gap-1'><CircleX className='h-4' /> unable to save</span>
        return null
    }

    const { mutate: deleteNote, isPending } = useDeleteNote(numericFolderID)

    const router = useRouter()

    const { mutate: toggleFavourite } = useToggleFavourite(numericLibraryID, numericFolderID)

    const { mutate: toggleNotePin } = useToggleNotePin(numericFolderID)

    const { user } = useUser()

    const clerkId = user?.id

    function handleNoteDeletion() {
        router.push(`/mynotes/dashboard/${numericLibraryID}/${numericFolderID}`)
        setShowAlertDialog(false)
        deleteNote(numericNoteID, {
            onError: (err) => {
                toast.error(err.message, {
                    position: TOAST_POSITION
                })
            }
        })
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value
        setTitle(newTitle)
        if (!currentNote) return
        triggerSave({
            title: newTitle,
            content: currentNote.content ?? '',  // use currentNote, not optional chain default
            folder_id: numericFolderID
        })
    }

    function handleNotePinToggle(isPinned: boolean) {
        toggleNotePin({
            noteId: numericNoteID,
            isPinned: isPinned,
            folderId: numericFolderID
        }, {
            onError: (err) => {
                toast.error(err.message, {
                    position: TOAST_POSITION
                })
            }
        })
    }

    const { togglePublic } = useToggleNotePublic(numericFolderID)

    function handleToggleSharable() {
        if (!currentNote) return
        togglePublic({
            noteId: numericNoteID,
            isPublic: !currentNote.is_public
        })
    }

    useEffect(() => {
        if (!currentNote) {
            const untitledCount = notes?.filter((note) =>
                note.title?.startsWith('Untitled')
            ).length ?? 0

            const defaultTitle = untitledCount === 0
                ? 'Untitled'
                : `Untitled ${untitledCount + 1}`

            setTitle(defaultTitle)
        } else {
            setTitle(currentNote.title)
        }
    }, [currentNote])

    return (
        <>
            <AlertDialogForDeletion open={showAlertDialog} setOpen={setShowAlertDialog} handleDeletion={handleNoteDeletion} itemName={currentNote?.title || ''} itemType='note' />
            <div className='flex flex-col h-full'>
                <div className=' z-30 hidden md:flex justify-between items-center gap-2 h-14 w-full border-b text-foreground/70 p-4 flex-shrink-0'>
                    <Button
                        data-sidebar="trigger"
                        data-slot="sidebar-trigger"
                        variant="ghost"
                        size="icon-sm"
                        onClick={toggleMiddleSideBar}
                    // disabled={isToggleDisabled}
                    >
                        <PanelLeftIcon className='text-foreground/90' />
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    <div className='flex-1 flex justify-between items-center'>
                        <div className='flex flex-1 justify-start items-center gap-2 '>
                            <div className='flex flex-1 '>
                                <input
                                    type='text'
                                    className='flex-1 text-foreground bg-transparent border-none outline-none w-full'
                                    value={title}
                                    onChange={(e) => handleTitleChange(e)}
                                    disabled={!currentNote}
                                />
                            </div>
                        </div>
                        <div className='flex items-center '>
                            {currentNote?.is_favourite && (
                                <Button
                                    variant="ghost"
                                    className="rounded-full"
                                    onClick={() =>
                                        toggleFavourite({
                                            libraryId: numericLibraryID,
                                            noteId: numericNoteID,
                                            isFavourite: !currentNote?.is_favourite
                                        })
                                    }
                                >
                                    <Heart className={currentNote?.is_favourite ? "fill-red-500 text-red-500" : ""} />
                                </Button>
                            )}
                            <PopoverDemo noteId={currentNote?.id ?? 0} isPublic={currentNote?.is_public ?? false} onTogglePublic={handleToggleSharable} />
                            {currentNote && (
                                <NoteViewDropDown note={currentNote} handleNotePinToggle={handleNotePinToggle} setDeleteAlertOpen={setShowAlertDialog} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex md:hidden flex-shrink-0 border-b px-4 py-2">
                    <BreadcrumbMobile />
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-custom">
                    <div className="flex flex-1 prose prose-invert max-w-none p-4 ">
                        <Tiptap
                            key={numericNoteID}
                            content={currentNote?.content ?? ''}
                            noteId={numericNoteID}
                            title={title}
                            triggerSave={triggerSave}
                            folder_id={numericFolderID}
                        />
                    </div>
                </div>

                <div className='flex items-center justify-between border-t px-4 py-2 text-foreground/50 flex-shrink-0'>
                    <div className=''>
                        <SaveIndicator />
                    </div>
                    {currentNote && (
                        <div className='flex items-center'>
                            <CalendarRange className='h-3' />
                            <span className='text-xs'>{formatCreatedDate(currentNote.created_at)}</span>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default NotePage