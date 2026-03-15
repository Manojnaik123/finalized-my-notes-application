import React from 'react'
import RichTextEditor from '../tiptap/rich-text-editor'
import TrialEditor from '../tiptap/trial-editor'
import { Button } from '@/components/ui/button'
import { Calendar, Heart, History, Pin, Tag, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getNotes } from '@/delete-later/data'
import { BreadcrumbMobile } from '../mobile/breadcrumb'
import { useParams } from 'next/navigation'

const NoteView = ({ noteId }: { noteId: number }) => {

  const note = getNotes(4).find((note) => note.id === noteId);

  if (!note) return;

  return (
    <div className="flex flex-col h-auto min-h-full mx-auto">

      <BreadcrumbMobile />
      <div className="py-6 border-b flex flex-col gap-3">
        <div className='w-100 h-14 border-b'>
          hello
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center text-foreground'>
          <div className='md:w-full'>
            hehehehe
            <input className='text-2xl md:text-3xl font-semibold focus:outline-0' value={note?.title} />
          </div>
          {/* <div>
            <Button variant={'ghost'}>
              <Pin className='text-foreground/70' />
            </Button>
            <Button variant={'ghost'}>
              <Heart className='text-foreground/70 fill-red-400' />
            </Button>
            <Button variant={'ghost'} className='text-destructive'>
              <Trash />
            </Button>
          </div> */}
        </div>
        <div className='text-foreground/50 flex flex-col md:flex-row gap-8'>
          <div className='flex gap-2 text-xs'>
            <div className='flex items-center'>
              <Calendar className='h-4' /> <span>Created Mar 7, 2026</span>
            </div>
            <div className='flex items-center'>
              <History className='h-4' /> <span>Created Mar 7, 2026</span>
            </div>
          </div>
          <div className='flex gap-1'>
            <Tag className='h-4' />
            <Badge variant={'secondary'} className='text-foreground/70'>Strategy</Badge>
            <Badge variant={'outline'} className='text-foreground/70'>Decesion</Badge>
            <Badge variant={'destructive'} className='text-foreground/70'>UI</Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-1 prose prose-invert max-w-none pt-4">
        {/* <TrialEditor folder_id={note.folder_id} noteId={note?.id} title={note.title} triggerSave={} content={note?.content} /> */}
      </div>
    </div>
  )
}

export default NoteView