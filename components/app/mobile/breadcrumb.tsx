import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { folders } from "@/delete-later/data";
import { FOLDERS_KEY, NOTES_KEY } from "@/lib/query-keys/query-keyx";
import { Note } from "@/types/main-types/note";
import { Folder } from "@/types/props-types/folder.";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export function BreadcrumbMobile() {
  const { folderId, libraryId, noteId } = useParams()

  const numericFolderId = Number(folderId)
  const numericNoteId = Number(noteId)

  const queryClient = useQueryClient()

  const curFolder = queryClient.getQueryData<Folder[]>([FOLDERS_KEY])?.find((folder) => folder.id === numericFolderId)
  const curNote = queryClient.getQueryData<Note[]>([NOTES_KEY, numericFolderId])?.find((note) => note.id === numericNoteId)


  console.log('from breadcrum')
  console.log(curNote);
  
  

  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="#">Base folder</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbLink href={`/mynotes/dashboard/${libraryId}/${folderId}`}>{curFolder?.folder_name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{curNote?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
