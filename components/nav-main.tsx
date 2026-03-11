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
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useLibraries } from "@/hooks/use-libraries"
import type { Folder } from "@/types/props-types/folder."
import { useFolders } from "@/hooks/use-folders"
import { Skeleton } from "./ui/skeleton"


export function NavFolders() {

  const [folders, setFolders] = useState<Folder[]>([]);
  const [showAddFolderDialog, setShowAddFolderDialog] = useState<boolean>(false)
  const { folderId, noteId } = useParams();
  const numericNoteId = Number(noteId);
  const numericFolderId = Number(folderId);


  const { data: libraries, error, isLoading } = useLibraries();

  const defaultLibraryId = libraries?.find((library) => library.is_default === true)?.id;

  const { libraryId } = useParams()
  const numericLibraryId = Number(libraryId)

  const { data: foldersData, isLoading: isFolderDataLoading } = useFolders(numericLibraryId)

  

  return (
    <>
      <AddFolderDialog open={showAddFolderDialog} setOpen={setShowAddFolderDialog} />
      <SidebarGroup>
        <SidebarMenuItem className="flex justify-between w-full">
          <SidebarGroupLabel>
            Folders
          </SidebarGroupLabel>
          <Button variant="ghost"
            onClick={() => setShowAddFolderDialog(true)}>
            <Plus />
          </Button>
        </SidebarMenuItem>
        <SidebarMenu>
          {!foldersData && (
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="w-full h-6 rounded-md"/>
              <Skeleton className="w-full h-6 rounded-md"/>
              <Skeleton className="w-full h-6 rounded-md"/>
            </div>
          )}
          {foldersData && foldersData.map((folder) => (
            <Collapsible
              key={folder.folder_name}
              asChild
              defaultOpen={numericFolderId === folder.id}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={folder.folder_name}>
                    <FolderIcon />
                    <span>{folder.folder_name}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>

                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}


// {folder.notes?.map((note) => (
//                       <SidebarMenuSubItem key={note.title}>
//                         <SidebarMenuSubButton asChild className={` ${numericNoteId === note.id ? 'hover:bg-foreground/5 bg-foreground/5' : 'hover:bg-foreground/5'} `}>
//                           <Link href={`/mynotes/dashboard/${folder.id}/${note.id}`} > {/* href={subItem.url} */}
//                             <StickyNote />
//                             <span>{note.title}</span>
//                           </Link>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}