"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useTheme } from "@/context/theme-context"
import { SunMoon } from 'lucide-react'
import { useParams } from "next/navigation";
import { folders, getNotes } from "@/delete-later/data";
import FolderSidebar from "@/components/app/folder-view/folder-sidebar";
import { useLibraries } from "@/hooks/use-libraries";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toggleTheme } = useTheme();

  const { folderId, noteId, libraryId } = useParams();

  const numericNoteId = Number(noteId);

  const { data: libraries, isLoading, isError } = useLibraries();

  const curFolderName = folders.find((folder) => folder.id === Number(folderId))?.title;

  const curNoteName = getNotes().find((note) => note.id === numericNoteId)?.title;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 text-foreground" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>
                    {curFolderName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbLink className="flex md:hidden">
                  [Work space name]
                </BreadcrumbLink>
                {curNoteName && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbPage>
                        {curNoteName}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto">
            <button onClick={() => toggleTheme()} className="text-foreground p-4">
              <SunMoon />
            </button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 min-h-0">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}