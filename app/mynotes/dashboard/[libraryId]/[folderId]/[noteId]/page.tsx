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


const NotePage = () => {

    const { noteId, folderId } = useParams();
    const numericFolderID = Number(folderId)
    const numericNoteID = Number(noteId)

    const queryClient = useQueryClient()
    const { toggleMiddleSideBar } = useMiddleSideBar()

    const notes = queryClient.getQueryData<Note[]>([NOTES_KEY, numericFolderID])
    const currentNote = notes?.find((note) => note.id === numericNoteID)

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
                        {/* <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        /> */}
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
                    <Tiptap content={currentNote?.content ?? ''} />
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