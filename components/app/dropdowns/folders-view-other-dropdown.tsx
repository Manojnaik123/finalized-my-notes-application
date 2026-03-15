'use client'

import React from 'react'
import { AddFolderDialog } from '../dialogs/add-folder'
import SearchInput from '../fields/search-input'
import { Button } from '@/components/ui/button'
import { ArrowUpNarrowWide, Book, FilterIcon, MoreHorizontal, MoveRight, Notebook, Pen, Pin, Plus, SortDescIcon, Trash } from 'lucide-react'
import { Note } from '@/types/main-types/note'
import { useParams } from 'next/navigation'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/theme-context'
import { useMiddleSideBar } from '@/context/middle-sidebar-context'
import { useFolders } from '@/hooks/use-folders'

export function FolderViewOtherOptions({ deleteFolder, editFolder }: { deleteFolder: () => void, editFolder: () => void }) {

    const { isDark } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-0">
                <Button variant={'ghost'} className='grow text-secondary-foreground/70 focus:ring-0'>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-40 ${isDark ? 'dark' : ''}`} align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuItem onClick={editFolder}>
                        <Pen />
                        Edit Folder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive' onClick={deleteFolder}>
                        <Trash />
                        Delete Folder
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}