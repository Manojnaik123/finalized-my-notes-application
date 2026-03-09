import { Badge } from '@/components/ui/badge';
import { truncate } from '@/lib/text-formaters/text-formaters';
import { NoteCardProps } from '@/types/props-types/notes-view';

import React from 'react'
import { Tooltip } from '../others/ToolTip';
import { PersonStanding, PersonStandingIcon, Pin, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// import { Tooltip } from 'radix-ui';

const NoteCard = ({
    note,
    isActive,
    onNoteClick,
}: NoteCardProps) => {

    // remove this later 
    type BadgeVariant = "link" | "default" | "secondary" | "destructive" | "outline" | "ghost"
    var variants: BadgeVariant[] = ['outline', 'default', 'destructive']

    // const x = variants[(Math.floor(Math.random() * 3) + 1) - 1]
    const x = variants[0]
    const y = variants[(Math.floor(Math.random() * 3) + 1) - 1]
    const z = variants[(Math.floor(Math.random() * 3) + 1) - 1]

    const { folderId } = useParams();

    return (
        <Link href={`/mynotes/dashboard/${folderId}/${note.id}`}
            className={`${isActive ? 'bg-foreground/5' : 'bg-transparent hover:bg-foreground/5'} flex border-b`}>
            <div className={`${isActive ? 'border-l-3 border-foreground/50' : 'border-l-3 border-transparent'}`} />
            <div className='p-4 flex flex-col gap-2'>
                <div className=' flex justify-between'>
                    <Tooltip isVisible={true} text='Header if length exceeds' direction='top'>
                        <h1 className='text-base text-foreground pb-2'>{note.title}</h1>
                    </Tooltip>
                    <div className='flex items-center justify-center gap-1'>
                        <Tooltip isVisible={true} text='this note is sharable' direction='right'>
                            <Users className='h-4 fill-foreground/50' />
                        </Tooltip>
                        <Tooltip isVisible={true} text='Pin to top' direction='right'>
                            <Pin className='h-4  fill-sidebar-foreground/50' />
                        </Tooltip>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Badge variant={x}>
                        Coding
                    </Badge>
                    <Badge variant={x}>
                        Coding
                    </Badge>
                    <Badge variant={x}>
                        Coding
                    </Badge>
                </div>
                <p className='text-sm text-foreground/50'>
                    {truncate(note.content, 150)}
                </p>
                <div className='flex justify-between pt-1'>
                    <span className='text-xs text-muted-foreground/30'>
                        3min read
                    </span>
                    <span className='text-xs text-muted-foreground/50'>
                        Edited 2 days ago
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard;