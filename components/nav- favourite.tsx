"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useNotesByLibrary } from "@/hooks/use-fav-notes"
import { useFolders } from "@/hooks/use-folders"
import { useLibraries } from "@/hooks/use-libraries"
import { useNotes } from "@/hooks/use-notes"
import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Note } from "@/types/main-types/note"
import { useQueryClient } from "@tanstack/react-query"
import { MoreHorizontalIcon, FolderIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Skeleton } from "./ui/skeleton"
import { useState } from "react"
import { SIDEBAR_FAV_LISTLEN_AT_BEG } from "@/lib/text-formaters/text-lengths"

export function NavFavourites() {
  const { isMobile } = useSidebar()
  const [showAll, setShowAll] = useState(false)

  const { libraryId, folderId, noteId } = useParams()
  const numericLibraryId = Number(libraryId)

  const { data: allNotes = [], isLoading } = useNotesByLibrary(numericLibraryId)

  const visibleNotesAtBeg = SIDEBAR_FAV_LISTLEN_AT_BEG

  const visibleNotes = showAll ? allNotes : allNotes.slice(0, visibleNotesAtBeg)

  if (isLoading) return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favourite notes</SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: visibleNotesAtBeg }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuButton>
              <Skeleton className="h-4 w-4 bg-foreground/5" />
              <Skeleton className="h-3 w-32 bg-foreground/5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favourite notes</SidebarGroupLabel>
      <SidebarMenu>
        {visibleNotes.map((note) => (
          <SidebarMenuItem key={note.title}>
            <SidebarMenuButton
              asChild
              isActive={Number(noteId) === note.id}
            >
              <Link href={`/mynotes/dashboard/${libraryId}/${note.folder_id}/${note.id}`}>
                <span>{note.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover className="aria-expanded:bg-muted">
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowRightIcon className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2Icon className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        {/* show more / show less */}
        {allNotes.length > visibleNotesAtBeg && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => setShowAll(!showAll)}
            >
              <MoreHorizontalIcon className="text-sidebar-foreground/70" />
              <span>{showAll ? 'Show less' : `${allNotes.length - visibleNotesAtBeg} more`}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

// export function NavFavourites() {
//   const { isMobile } = useSidebar()

//   const queryClient = useQueryClient()

//   const favs = [3, 8, 7, 1]

//   const favNotes = getNotes(8).filter((note) => favs.includes(note.id))

//   const { libraryId, folderId } = useParams()
//   const numericLibraryId = Number(libraryId)
//   const numericFolderId = Number(folderId)



//   const { data: libraries } = useLibraries()
//   const { data: allFolders } = useFolders(numericLibraryId)

//   const folderIds = allFolders?.map((folder) => folder.id) ?? []

//   const { data: allNotes = [], isLoading } = useNotesByLibrary(numericLibraryId)

//   if (isLoading) return (
//     <SidebarGroup className="group-data-[collapsible=icon]:hidden">
//       <SidebarGroupLabel>Favourite notes</SidebarGroupLabel>
//       <SidebarMenu>
//         {Array.from({ length: 4 }).map((_, i) => (
//           <SidebarMenuItem key={i}>
//             <SidebarMenuButton>
//               <Skeleton className="h-4 w-4 bg-foreground/5" />
//               <Skeleton className="h-3 w-32 bg-foreground/5" />
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )

//   return (
//     <SidebarGroup className="group-data-[collapsible=icon]:hidden">
//       <SidebarGroupLabel>Favourite notes</SidebarGroupLabel>
//       <SidebarMenu>
//         {allNotes.map((note) => (
//           <SidebarMenuItem key={note.title}>
//             <SidebarMenuButton asChild>
//               <Link href={`/mynotes/dashboard/${note.folder_id}/${note.id}`}> {/* href={item.url} */}
//                 {/* {item.icon} */}
//                 <span>{note.title}</span>
//               </Link>
//             </SidebarMenuButton>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuAction
//                   showOnHover
//                   className="aria-expanded:bg-muted"
//                 >
//                   <MoreHorizontalIcon
//                   />
//                   <span className="sr-only">More</span>
//                 </SidebarMenuAction>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-48 rounded-lg"
//                 side={isMobile ? "bottom" : "right"}
//                 align={isMobile ? "end" : "start"}
//               >
//                 <DropdownMenuItem>
//                   <FolderIcon className="text-muted-foreground" />
//                   <span>View Project</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <ArrowRightIcon className="text-muted-foreground" />
//                   <span>Share Project</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Trash2Icon className="text-muted-foreground" />
//                   <span>Delete Project</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         ))}
//         <SidebarMenuItem>
//           <SidebarMenuButton className="text-sidebar-foreground/70">
//             <MoreHorizontalIcon className="text-sidebar-foreground/70" />
//             <span>More</span>
//           </SidebarMenuButton>
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }
