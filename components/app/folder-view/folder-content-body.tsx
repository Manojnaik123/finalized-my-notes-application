import { Book, Pin } from 'lucide-react'
import NoNotesComp from './no-notes-comp';
import NoteCard from './note-card';
import NotesHeader from './notes-header';
import { getNotes } from '@/delete-later/data';
import { useParams } from 'next/navigation';
import { useNotes } from '@/hooks/use-notes';
import { Skeleton } from '@/components/ui/skeleton';

const FolderContentBody = ({ onNoteClick }: {
    onNoteClick: (noteId: number) => void
}) => {

    const { folderId, noteId } = useParams();

    const numericFolderID = Number(folderId)
    const numericNoteID = Number(noteId)

    const { data: notes } = useNotes(numericFolderID)

    // if (!notes) return (
    //     <div>
    //         <div className='flex items-center gap-2 p-3'>
    //             <Skeleton className='h-4 w-4' />
    //             <Skeleton className='h-4 w-24' />
    //         </div>

    //         <div className='p-3 py-4'>
    //             <Skeleton className='h-32 w-full rounded-lg mb-2' />
    //         </div>

    //         <div className='flex items-center gap-2 p-3'>
    //             <Skeleton className='h-4 w-4' />
    //             <Skeleton className='h-4 w-24' />
    //         </div>

    //         <div className='border-t'>
    //             {Array.from({ length: 5 }).map((_, i) => (
    //                 <div key={i} className='flex flex-col gap-2 p-3 border-b'>
    //                     <Skeleton className='h-4 w-3/4' />
    //                     <Skeleton className='h-3 w-full' />
    //                     <Skeleton className='h-3 w-1/2' />
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )

    return (
        <div>
            {/* <NotesHeader> */}
                <Pin className='h-4 text-foreground' />
            {/* </NotesHeader> */}
            <div className='p-3 py-4'>
                <NoNotesComp title='Pinned Notes' description='Click + to create your first note'>
                    <Pin />
                </NoNotesComp>
            </div>
            {/* <NotesHeader> */}
                <Book className='h-4 text-foreground' />
            {/* </NotesHeader> */}
            <div className='border-t'>
                {notes && notes.map((note) => (
                    <NoteCard key={note.id} isActive={numericNoteID === note.id} note={note} onNoteClick={onNoteClick} />
                ))}
            </div>
        </div>
    )
}

export default FolderContentBody;