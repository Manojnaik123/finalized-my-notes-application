'use client'

import React from 'react'
import { AddFolderDialog } from '../dialogs/add-folder'
import SearchInput from '../fields/search-input'
import { Button } from '@/components/ui/button'
import { ArrowUpNarrowWide, Book, FilterIcon, MoveRight, Notebook, Pin, Plus, SortDescIcon } from 'lucide-react'
import { Note } from '@/types/main-types/note'
import { useParams } from 'next/navigation'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/theme-context'
import { useMiddleSideBar } from '@/context/middle-sidebar-context'

export function SortDropDown() {
    const { isDark } = useTheme()
    const { setSortBy } = useMiddleSideBar()

    function handleSorting(text: string){
        setSortBy(text)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className='grow text-secondary-foreground/70'>
                    <ArrowUpNarrowWide />
                    Sort
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-40 ${isDark ? 'dark' : ''}`} align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleSorting('last-edited')}>
                        Last Created
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSorting('date-created')}> 
                        Created Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSorting('title-asc')}>
                        Title A <MoveRight /> Z
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSorting('title-des')}>
                        Title Z <MoveRight /> A
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}