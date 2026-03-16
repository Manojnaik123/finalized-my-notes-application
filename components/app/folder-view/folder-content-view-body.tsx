import React, { useState } from 'react'
import { AddFolderDialog } from '../dialogs/add-folder'
import SearchInput from '../fields/search-input'
import { Button } from '@/components/ui/button'
import { ArrowUpNarrowWide, Book, FilterIcon, MoreHorizontal, Notebook, Pin, Plus, SortDescIcon } from 'lucide-react'
import NotesHeader from './notes-header'
import NoNotesComp from './no-notes-comp'
import NoteCard from './note-card'
import { Note } from '@/types/main-types/note'
import { useParams, useRouter } from 'next/navigation'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SortDropDown } from '../dropdowns/folders-view-sort-dropdoem'
import { Tooltip } from '../others/ToolTip'
import { FolderViewOtherOptions } from '../dropdowns/folders-view-other-dropdown'
import { DeleteFolderConformation } from '../conformation/folder-delete-conformation'
import { useFolders } from '@/hooks/use-folders'
import { useNewNote } from '@/hooks/use-new-note'
import { Spinner } from '@/components/ui/spinner'
import { FilterPopover } from '../dropdowns/filter-popover'
import { FilterState } from '@/types/main-types/filters'

type FolderContentViewBodyProps = {
  notes: Note[],
  handleSearch: (text: string) => void,
  onFilterApply: (filters: FilterState) => void
}

const FolderContentViewBody = ({ notes, handleSearch, onFilterApply }: FolderContentViewBodyProps) => {
  const [showEditFolderDialog, setShowEditFolderDilog] = useState<boolean>(false)
  const [showDeleteFolderDialog, setDeleteEditFolderDilog] = useState<boolean>(false)

  const router = useRouter()

  const { noteId, folderId, libraryId } = useParams()

  const numericNoteId = Number(noteId)
  const numericFolderId = Number(folderId)
  const numericLibraryId = Number(libraryId)

  const { data: folders } = useFolders(numericLibraryId)
  const curFolder = folders?.find((folder) => folder.id === numericFolderId);

  const pinnedNotes = notes.filter((note) => note.is_pinned === true)
  const unPinnedNotes = notes.filter((note) => note.is_pinned !== true)

  const { handleCreateNote, isPending } = useNewNote()

  function handleShowEditFolderDialog() {
    setShowEditFolderDilog(true)
  }

  return (
    <>
      <div className='w-full p-2 flex flex-col gap-2'>
        <DeleteFolderConformation open={showDeleteFolderDialog} setOpen={setDeleteEditFolderDilog} />
        <AddFolderDialog folderId={numericFolderId} open={showEditFolderDialog} setOpen={setShowEditFolderDilog} />
        <div className='flex items-center gap-2'>
          <h1 className='flex-1 text-foreground'>{curFolder?.folder_name}</h1>
          <Tooltip className='' isVisible={true} text='Add Notes' direction='bottom'>
            <Button variant={'ghost'} className='text-accent-foreground'
              onClick={handleCreateNote} disabled={isPending}
            >
              {isPending ? <Spinner /> : <Plus />}
            </Button>
          </Tooltip>
          <FolderViewOtherOptions editFolder={() => setShowEditFolderDilog(true)} deleteFolder={() => setDeleteEditFolderDilog(true)} />
        </div>
        <div className='flex flex-row gap-2'>

          <SearchInput handleSearch={handleSearch} />

        </div>
        <div className='flex w-full gap-2'>
          <div className="flex-1">
            <SortDropDown />
          </div>
          <div className="flex-1">
            <FilterPopover onApply={onFilterApply} />
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div>
          {(pinnedNotes.length !== 0 || notes.length !== 0) && (
            <NotesHeader text='Pinned Notes' length={pinnedNotes.length}>
              <Pin className='h-4 text-foreground' />
            </NotesHeader>
          )}
          {(pinnedNotes.length === 0 && notes.length !== 0) && (
            <div className='p-3 py-4'>
              <NoNotesComp title='Pinned Notes' description='No pinned notes yet — pin one to keep it at the top'>
                <Pin />
              </NoNotesComp>
            </div>
          )}

          <div className=''>
            {pinnedNotes.map((note) => (
              <div key={note.id} className="first:border-t first:border-border">
                <NoteCard
                  isActive={numericNoteId === note.id}
                  note={note}
                  onNoteClick={() => { }}
                />
              </div>
            ))}
          </div>
          <NotesHeader text='All Notes' length={unPinnedNotes.length} >
            <Book className='h-4 text-foreground' />
          </NotesHeader>

          {unPinnedNotes.length === 0 && (
            <div className='p-3 py-4'>
              <NoNotesComp title='All Notes' description='Click + to create your first note'>
                <Book />
              </NoNotesComp>
            </div>
          )}

          <div className=''>
            {unPinnedNotes.map((note) => (
              <div key={note.id} className="first:border-t first:border-border">
                <NoteCard
                  isActive={numericNoteId === note.id}
                  note={note}
                  onNoteClick={() => { }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FolderContentViewBody
