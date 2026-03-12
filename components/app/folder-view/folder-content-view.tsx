import React from 'react'
import SearchInput from '../fields/search-input'
import { Button } from '@/components/ui/button'
import { Filter, FilterIcon, Pin, Plus, Search } from 'lucide-react'
import FolderContentHeader from './folder-content-header'
import FolderContentBody from './folder-content-body'
import { useMiddleSideBar } from '@/context/middle-sidebar-context'

const FolderContentView = ({ onNoteClick }: { onNoteClick: (noteId: number) => void }) => {
  const { isMiddleSideBarOpen } = useMiddleSideBar()

  return (
    <div className='h-full w-full text-sidebar-foreground/50 '>
      {isMiddleSideBarOpen ? (
        <>
          <div className='w-full p-2 flex flex-col gap-2'>
            <FolderContentHeader />
          </div>
          <div className='w-full'>
            <FolderContentBody onNoteClick={onNoteClick} />
          </div>
        </>
      ) : (
        <div className='flex flex-col justify-start items-center gap-2 px-2 py-4 '>
          <Button className='bg-accent text-accent-foreground'
            onClick={() => { }}>
            <Plus />
          </Button>
          <Button variant="ghost" size="icon">
            <Search />      {/* search */}
          </Button>
          <Button variant="ghost" size="icon">
            <Pin />         {/* pinned notes */}
          </Button>
          <div className="mt-auto">
            <Button variant="ghost" size="icon">
              <Filter />    {/* filter */}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FolderContentView;

