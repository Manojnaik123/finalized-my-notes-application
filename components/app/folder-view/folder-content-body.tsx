import { Book, Pin } from 'lucide-react'
import NoNotesComp from './no-notes-comp';
import NoteCard from './note-card';
import NotesHeader from './notes-header';
import { getNotes } from '@/delete-later/data';
import { useParams } from 'next/navigation';

const FolderContentBody = ({ onNoteClick }: {
    onNoteClick: (noteId: number) => void
}) => {

    const { folderId, noteId } = useParams();

    const numericNoteId = Number(noteId);

    const notes = getNotes().filter((note) => note.folderId === Number(folderId))

    return (
        <div>
            <NotesHeader>
                <Pin className='h-4 text-foreground' />
            </NotesHeader>
            <div className='p-3 py-4'>
                <NoNotesComp title='Pinned Notes' description='Click + to create your first note'>
                    <Pin />
                </NoNotesComp>
            </div>
            <NotesHeader>
                <Book className='h-4 text-foreground' />
            </NotesHeader>
            {/* <div className='p-2'>
                <NoNotesComp title='All Notes' description='Click + to create your first note'>
                    <Book />
                </NoNotesComp>
            </div> */}
            <div className='border-t'>
                {notes.map((note) => (
                    <NoteCard isActive={note.id === numericNoteId } note={note} onNoteClick={onNoteClick} />
                ))}
            </div>
        </div>
    )
}

export default FolderContentBody;