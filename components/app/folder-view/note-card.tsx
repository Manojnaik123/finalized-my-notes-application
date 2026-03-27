import { Badge } from '@/components/ui/badge';
import { getReadingTime, getRelativeTime, stripHtml, truncateString } from '@/lib/text-formaters/text-formaters';
import { NoteCardProps } from '@/types/props-types/notes-view';

import React from 'react'
import { Tooltip } from '../others/ToolTip';
import { Globe, Heart, PersonStanding, PersonStandingIcon, Pin, PinOff, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToggleFavourite } from '@/hooks/use-toggle-favourite';
import { useToggleNotePin } from '@/hooks/use-toggle-pinned-note';
import { toast } from 'sonner';
import { TOAST_POSITION } from '@/lib/query-keys/query-keyx';


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

    const { folderId, libraryId, noteId } = useParams()

    const numericFolderId = Number(folderId)
    const numericNoteId = Number(noteId)

    const { mutate: toggleNotePin } = useToggleNotePin(numericFolderId)

    function handleNotePin(isTrue: boolean) {
        toggleNotePin({
            noteId: note.id,
            isPinned: isTrue,
            folderId: numericFolderId
        }, {
            onError: (err) => {
                const [statusCode, message] = err.message.split(": ")

                if (statusCode == "403") {
                    toast.warning(message, { position: TOAST_POSITION })
                } else {
                    toast.error("Something went wrong", { position: TOAST_POSITION })
                }
            }
        })
    }

    const isPinned = note.is_pinned;

    return (
        <Link href={`/mynotes/dashboard/${libraryId}/${folderId}/${note.id}`}
            className={`${isActive ? 'bg-foreground/5' : 'bg-transparent hover:bg-foreground/5'} w-full flex border-b`}>
            <div className={`${isActive ? 'border-l-3 border-foreground/50' : 'border-l-3 border-transparent'}`} />
            <div className='p-4 flex flex-1 flex-col gap-2'>
                <div className=' flex justify-between'>
                    <Tooltip isVisible={true} text='Header if length exceeds' direction='top' className=''>
                        <h1 className='text-base text-foreground pb-2'>{note.title}</h1>
                    </Tooltip>
                    <div className='flex items-center justify-center gap-1'>
                        {/* {note.is_favourite && (
                            <Tooltip isVisible={true} text='Favourite' direction='top' className=''>
                                <Heart className={`${note?.is_favourite ? "fill-red-500 text-red-500" : ""} h-4`} />
                            </Tooltip>
                        )}
                        <Tooltip isVisible={true} text='this note is sharable' direction='top' className=''>
                            <Users className='h-4' />
                        </Tooltip> */}
                        <Tooltip isVisible={true} text={isPinned ? 'Un pin note' : 'Pin to top'} direction='top' className=''>
                            <Button variant={'ghost'} className='' onClick={() => isPinned ? handleNotePin(false) : handleNotePin(true)}>
                                {isPinned ? (
                                    <PinOff />
                                ) : (
                                    <Pin className='h-4' />
                                )}
                            </Button>
                        </Tooltip>

                    </div>
                </div>
                <div className="flex gap-2">
                    {note.is_favourite && (
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1 rounded-full bg-red-500/10 text-red-400 px-2 py-0.5 text-xs"
                        >
                            <Heart className="h-3 w-3 fill-red-400" />
                            Favourite
                        </Badge>
                    )}

                    {note.is_public && (
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1 rounded-full bg-blue-500/10 text-blue-400 px-2 py-0.5 text-xs"
                        >
                            <Globe className="h-3 w-3" />
                            Shared
                        </Badge>
                    )}
                </div>
                <p className='text-sm text-foreground/50'>
                    {truncateString(stripHtml(note.content), 150)}
                </p>
                <div className='flex justify-between pt-1'>
                    <span className='text-xs text-muted-foreground/30'>
                        {getReadingTime(stripHtml(note.content))} min read
                    </span>
                    <span className='text-xs text-muted-foreground/50'>
                        {getRelativeTime(note.updated_at)}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard;