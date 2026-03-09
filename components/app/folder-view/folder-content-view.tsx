import React from 'react'
import SearchInput from '../fields/search-input'
import { Button } from '@/components/ui/button'
import { FilterIcon, Plus } from 'lucide-react'
import FolderContentHeader from './folder-content-header'
import FolderContentBody from './folder-content-body'

const FolderContentView = ({ onNoteClick }: { onNoteClick: (noteId: number) => void }) => {
  return (
    <div className='h-full  text-sidebar-foreground/50 '>
      <div className='p-2 flex flex-col gap-2'>
        <FolderContentHeader />
      </div>
      <div>
        <FolderContentBody onNoteClick={onNoteClick} />
      </div>
    </div>
  )
}

export default FolderContentView;

