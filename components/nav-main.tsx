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
import { ChevronRightIcon, Folder, Notebook, Plus, StickyNote } from "lucide-react"

import { folders, getNotes } from "@/delete-later/data"
import { MappedFolder } from "@/types/main-types/folder"
import { Note } from "@/types/main-types/note"
import { Button } from "./ui/button"
import { Dialog } from "./ui/dialog"
import { AddFolderDialog } from "./app/dialogs/add-folder"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

export function NavFolders() {

  const notes: Note[] = getNotes(8);

  const [showAddFolderDialog, setShowAddFolderDialog] = useState<boolean>(false)

  const mappedFolder: MappedFolder[] = folders.map((folder) => ({
    ...folder,
    notes: notes.filter((note) => note.folderId === folder.id)
  }))

  const { folderId, noteId } = useParams();
  const numericNoteId = Number(noteId);
  const numericFolderId = Number(folderId);

  function handleShowAddFolderDialog(){
    setShowAddFolderDialog(true);
  }

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
          {mappedFolder.map((folder) => (
            <Collapsible
              key={folder.title}
              asChild
              defaultOpen={numericFolderId === folder.id}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={folder.title}>
                    <Folder />
                    <span>{folder.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {folder.notes?.map((note) => (
                      <SidebarMenuSubItem key={note.title}>
                        <SidebarMenuSubButton asChild className={` ${numericNoteId === note.id ? 'hover:bg-foreground/5 bg-foreground/5' : 'hover:bg-foreground/5'} `}>
                          <Link href={`/mynotes/dashboard/${folder.id}/${note.id}`} > {/* href={subItem.url} */}
                            <StickyNote />
                            <span>{note.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
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
