import { NoteHeaderProps } from '@/types/props-types/notes-view';

const NotesHeader = ({children, text, length} : NoteHeaderProps) => {
    return (
        <div className='p-3 flex justify-between items-center -y'>
            <div className='flex items-center text-card-foreground/70 font-semibold'>
                {children}
                <span className='text-sm'>{text}</span>
            </div>
            <span className='text-xs'>{length > 0 ? length : 0} Notes</span>
        </div>
    )
}

export default NotesHeader;