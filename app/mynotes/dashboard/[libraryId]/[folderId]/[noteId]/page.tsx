'use client';

import React from 'react'
import Tiptap from '@/components/app/tiptap/trial-editor'
import { Button } from '@/components/ui/button'
import { Calendar, Heart, History, MoreHorizontal, PanelLeft, PanelLeftIcon, Pin, Tag, Trash, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { folders, getNotes } from '@/delete-later/data'
import { BreadcrumbMobile } from '@/components/app/mobile/breadcrumb'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query';
import { NOTES_KEY } from '@/lib/query-keys/query-keyx';
import { Note } from '@/types/main-types/note';
import { Separator } from '@/components/ui/separator';
import { useMiddleSideBar } from '@/context/middle-sidebar-context';
import { Skeleton } from '@/components/ui/skeleton';


const NotePage = () => {
    const [showSkeleton, setShowSkeleton] = React.useState(true)


    const { noteId, folderId } = useParams()
    const numericFolderID = Number(folderId)
    const numericNoteID = Number(noteId)

    const queryClient = useQueryClient()
    const { toggleMiddleSideBar } = useMiddleSideBar()

    const notes = queryClient.getQueryData<Note[]>([NOTES_KEY, numericFolderID])
    const currentNote = notes?.find((note) => note.id === numericNoteID)

    React.useEffect(() => {
        const timer = setTimeout(() => setShowSkeleton(false), 1000)
        return () => clearTimeout(timer)
    }, [numericNoteID])

    if (!currentNote) return (
        <div className='flex flex-col h-full'>
            {/* Top bar skeleton */}
            <div className='hidden md:flex justify-between items-center gap-2 h-14 w-full border-b text-foreground/70 p-4 flex-shrink-0'>
                <Skeleton className='h-6 w-6 bg-foreground/5' />
                <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
                <div className='flex-1 flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-40 bg-foreground/5' />
                        <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
                        <Skeleton className='h-4 w-28 bg-foreground/5' />
                    </div>
                    <div className='flex items-center gap-1'>
                        <Skeleton className='h-8 w-8 rounded-full bg-foreground/5' />
                        <Skeleton className='h-8 w-8 rounded-full bg-foreground/5' />
                        <Skeleton className='h-8 w-8 rounded-full bg-foreground/5' />
                    </div>
                </div>
            </div>

            {/* Mobile breadcrumb skeleton */}
            <div className="flex md:hidden flex-shrink-0 border-b px-4 py-2">
                <Skeleton className='h-4 w-48 bg-foreground/5' />
            </div>

            {/* Content skeleton */}
            <div className="flex-1 overflow-y-auto scrollbar-custom p-4">
                <div className='flex flex-col gap-4'>
                    <Skeleton className='h-8 w-3/4 bg-foreground/5' />
                    <Skeleton className='h-4 w-full bg-foreground/5' />
                    <Skeleton className='h-4 w-full bg-foreground/5' />
                    <Skeleton className='h-4 w-2/3 bg-foreground/5' />
                    <Skeleton className='h-6 w-1/2 bg-foreground/5 mt-4' />
                    <Skeleton className='h-4 w-full bg-foreground/5' />
                    <Skeleton className='h-4 w-full bg-foreground/5' />
                    <Skeleton className='h-4 w-3/4 bg-foreground/5' />
                    <Skeleton className='h-4 w-full bg-foreground/5' />
                    <Skeleton className='h-6 w-1/2 bg-foreground/5 mt-4' />
                    <Skeleton className='h-4 w-full bg-foreground/5' />
                    <Skeleton className='h-4 w-2/3 bg-foreground/5' />
                </div>
            </div>

            {/* Bottom bar skeleton */}
            <div className='flex items-center border-t px-4 py-2 flex-shrink-0'>
                <Skeleton className='h-4 w-36 bg-foreground/5' />
            </div>
        </div>
    )

    return (
        <div className='flex flex-col h-full'>
            <div className='hidden md:flex justify-between items-center gap-2 h-14 w-full border-b text-foreground/70 p-4 flex-shrink-0'>
                <Button
                    data-sidebar="trigger"
                    data-slot="sidebar-trigger"
                    variant="ghost"
                    size="icon-sm"
                    onClick={toggleMiddleSideBar}
                >
                    <PanelLeftIcon className='text-foreground/90' />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
                <Separator
                    orientation="vertical"
                    className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
                <div className='flex-1 flex justify-between items-center'>
                    <div className='flex justify-start items-center gap-2'>
                        <div>
                            <h1 className='text-foreground'>
                                {currentNote?.title}
                            </h1>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        />
                        <div className='flex items-center gap-1'>
                            <History className='h-4 text-foreground/50' />
                            <span className='text-sm text-foreground/50'>Edited 2 days ago</span>
                        </div>
                    </div>
                    <div className='flex items-center '>
                        <Button variant={'ghost'} className='rounded-full'>
                            <Heart />
                        </Button>
                        <Button variant={'ghost'} className='rounded-full'>
                            <Users />
                        </Button>
                        <Button variant={'ghost'} className='rounded-full'>
                            <MoreHorizontal />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex md:hidden flex-shrink-0 border-b px-4 py-2">
                <BreadcrumbMobile />
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-custom">
                {/* <BreadcrumbMobile /> */}
                <div className="flex flex-1 prose prose-invert max-w-none p-4 ">
                    <Tiptap key={numericNoteID} content={currentNote?.content ?? ''} />
                </div>
            </div>
            <div className='flex items-center border-t px-4 py-2 text-foreground/50 flex-shrink-0'>
                <History className='h-4' />
                <span className='text-sm'>Created on Mar 7, 2026</span>
            </div>
        </div>
    )
}

export default NotePage