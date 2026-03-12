"use client"

import FolderSidebar from "@/components/app/folder-view/folder-sidebar"
import { useParams } from "next/navigation"


export default function FolderIdLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const folderId = params.folderId

  return (
      <FolderSidebar>
        {children}
      </FolderSidebar>
  )
}