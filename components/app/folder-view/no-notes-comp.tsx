import { Pin } from 'lucide-react'
import { NoNoteProps } from '@/types/props-types/notes-view';

const NoNotesComp = ({
    children,
    title,
    description,
}: NoNoteProps) => {
    return (
        <div className='p-4 flex flex-col bg-sidebar justify-center items-center border border-dashed '>
            <button className='bg-muted p-3 rounded-full'>
                {children}
            </button>
            <h1 className='text-foreground/70 pt-2'>
                {title}
            </h1>
            <p className='text-muted-foreground/50 text-sm'>
                {description}
            </p>
        </div>
    )
}

export default NoNotesComp;