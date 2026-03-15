"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon, Folder as FolderIcon, Notebook, Plus, StickyNote } from "lucide-react"

import { folders, getNotes } from "@/delete-later/data"
import { MappedFolder } from "@/types/main-types/folder"
import { Note } from "@/types/main-types/note"
import { Button } from "./ui/button"
import { Dialog } from "./ui/dialog"
import { AddFolderDialog } from "./app/dialogs/add-folder"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLibraries } from "@/hooks/use-libraries"
import type { Folder } from "@/types/props-types/folder."
import { useFolders } from "@/hooks/use-folders"
import { Skeleton } from "./ui/skeleton"
import { useNotes } from "@/hooks/use-notes"
import { NotesList } from "./notes-list"
import { folderIcons } from "@/lib/color-and-icon/colors-and-icons"


export function NavFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showAddFolderDialog, setShowAddFolderDialog] = useState<boolean>(false)
  const { folderId, noteId } = useParams()
  const router = useRouter()
  const numericNoteId = Number(noteId);
  const numericFolderId = Number(folderId);

  const { data: libraries, error, isLoading } = useLibraries();
  const defaultLibraryId = libraries?.find((library) => library.is_default === true)?.id;

  const { libraryId } = useParams()
  const numericLibraryId = Number(libraryId)

  const { data: foldersData, isLoading: isFolderDataLoading } = useFolders(numericLibraryId)

  return (
    <>
      <AddFolderDialog folderId={0} open={showAddFolderDialog} setOpen={setShowAddFolderDialog} />
      <SidebarGroup>
        <SidebarMenuItem className="flex justify-between items-center w-full">
          {isFolderDataLoading ? (
            <div className="flex justify-between items-center gap-2 w-full pb-2">
              <SidebarGroupLabel>Folders</SidebarGroupLabel>
              <Skeleton className="size-6 bg-foreground/5" />
            </div>
          ) : (
            <>
              <SidebarGroupLabel>Folders</SidebarGroupLabel>
              <Button variant="ghost" onClick={() => setShowAddFolderDialog(true)}>
                <Plus />
              </Button>
            </>
          )}
        </SidebarMenuItem>

        <SidebarMenu>
          {isFolderDataLoading ? (
            <div className="w-full flex flex-col gap-2 py-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 px-2">
                  <Skeleton className="h-4 w-4 bg-foreground/5" />
                  <Skeleton className="h-4 flex-1 bg-foreground/5" />
                  <Skeleton className="h-4 w-4 bg-foreground/5" />
                </div>
              ))}
            </div>
          ) : (
            
            foldersData?.map((folder) => {
              const IconComponent = folderIcons.find(i => i.id === folder.icon_id)?.icon ?? FolderIcon  // ← add this

              return (
              <Collapsible
                onClick={() => router.push(`/mynotes/dashboard/${libraryId}/${folder.id}`)}
                key={folder.folder_name}
                asChild
                defaultOpen={numericFolderId === folder.id}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={folder.folder_name}>
                      <IconComponent className="w-4 h-4" />  {/* ← replace FolderIcon with this */}
                      <span>{folder.folder_name}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <NotesList libraryId={numericLibraryId} folderId={folder.id} noteId={numericNoteId} />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              )
            })
            
          )}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
