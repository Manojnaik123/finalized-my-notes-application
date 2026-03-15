import React, { useEffect, useState } from 'react'
import SearchInput from '../fields/search-input'
import { Button } from '@/components/ui/button'
import { Book, Filter, FilterIcon, Pin, Plus, Search } from 'lucide-react'
import FolderContentHeader from './folder-content-header'
import FolderContentBody from './folder-content-body'
import { useMiddleSideBar } from '@/context/middle-sidebar-context'
import { Tooltip } from '../others/ToolTip'
import { Note } from '@/types/main-types/note'
import FolderContentViewBody from './folder-content-view-body'
import { useNotes } from '@/hooks/use-notes'
import { useParams } from 'next/navigation'
import { useNewNote } from '@/hooks/use-new-note'
import { Spinner } from '@/components/ui/spinner'

const FolderContentView = (
  {
    onNoteClick,

  }:
    {
      onNoteClick: (noteId: number) => void,

    }) => {
  const [notesData, setNotesData] = useState<Note[]>([])

  const { isMiddleSideBarOpen, toggleMiddleSideBar, searchQuery, setSearchQuery, setSortBy, sortBy } = useMiddleSideBar()

  const { folderId } = useParams()
  const numericFolderId = Number(folderId)

  const { data: notes } = useNotes(numericFolderId)

  // const { toggleMiddleSideBar } = useMiddleSideBar()


  function handleNoteSearch(text: string) {
    const filteredNotesData = notes?.filter((note) =>
      note.title.toLowerCase().includes(text.toLowerCase()) ||
      note.content.toLowerCase().includes(text.toLowerCase())
    )
    if (filteredNotesData) {
      setNotesData(filteredNotesData)
    }
  }

  const filteredAndSortedNotes = React.useMemo(() => {
    if (!notes) return []

    let result = notes?.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

    switch (sortBy) {
      case "last-edited":
        result = result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        break
      case "date-created":
        result = result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "title-asc":
        result = result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-des":
        result = result.sort((a, b) => b.title.localeCompare(a.title))
    }
    return result
  }, [notes, searchQuery, sortBy])

  // useEffect(() => {
  //   if (notes) {
  //     setNotesData(notes)
  //   }
  // }, [notes])

  const { handleCreateNote, isPending } = useNewNote()
  

  return (
    <div className='h-full w-full text-sidebar-foreground/50 '>
      {isMiddleSideBarOpen ? (
        <>
          <FolderContentViewBody handleSearch={handleNoteSearch} notes={filteredAndSortedNotes} />
        </>
      ) : (
        <div className='flex flex-col justify-start items-center gap-2 px-2 py-4 '>
          <Button variant={'ghost'} className='bg-accent text-accent-foreground'
              onClick={handleCreateNote} disabled={isPending}
            >
              {isPending ? <Spinner/> : <Plus />}
            </Button>
          <Tooltip text='Search for notes' direction='right' isVisible={true} className=''>
            <Button variant="ghost" size="icon"
              onClick={toggleMiddleSideBar}>
              <Search />
            </Button>
          </Tooltip>
          <Tooltip text='Pinned notes' direction='right' isVisible={true} className=''>
            <Button variant="ghost" size="icon"
              onClick={toggleMiddleSideBar}>
              <Pin />
            </Button>
          </Tooltip>
          <Tooltip text='All notes' direction='right' isVisible={true} className=''>
            <Button variant="ghost" size="icon"
              onClick={toggleMiddleSideBar}>
              <Book />
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default FolderContentView;

