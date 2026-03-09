import { NoteHeaderProps } from '@/types/props-types/notes-view';

const NotesHeader = ({children} : NoteHeaderProps) => {
    return (
        <div className='p-3 flex justify-between items-center '>
            <div className='flex items-center text-card-foreground/70 font-semibold'>
                {children}
                <span className='text-sm'>PINNED NOTES</span>
            </div>
            <span className='text-xs'>X Notes</span>
        </div>
    )
}

export default NotesHeader;