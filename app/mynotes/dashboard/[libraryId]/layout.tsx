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
// import { folders, getNotes } from "@/delete-later/data";
import FolderSidebar from "@/components/app/folder-view/folder-sidebar";
import { useLibraries } from "@/hooks/use-libraries"
import { MiddeSideBarProvider } from "@/context/middle-sidebar-context"
import Link from "next/link";
import { useFolders } from "@/hooks/use-folders";
import { useNotes } from "@/hooks/use-notes";
import { ClerkProvider, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // remove this 
  // const { user } = useAuth();

  const { user } = useUser()

  console.log(' this is from the layout ');
  console.log(user?.id);
  console.log(user?.emailAddresses[0].emailAddress);
  console.log(user?.imageUrl);


  const { toggleTheme } = useTheme();

  const { folderId, noteId, libraryId } = useParams();

  const numericNoteId = Number(noteId);
  const numericFolderId = Number(folderId);
  const numericLibraryId = Number(libraryId);

  const { data: libraries, isLoading, isError } = useLibraries()
  const { data: folders } = useFolders(numericLibraryId)
  const { data: notes } = useNotes(numericFolderId)

  const curLibraryName = libraries?.find((lib) => lib.id === numericLibraryId)?.name

  const curFolderName = folders?.find((folder) => folder.id === Number(folderId))?.folder_name;

  const curNoteName = notes?.find((note) => note.id === numericNoteId)?.title

  return (
    <MiddeSideBarProvider>
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
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-muted-foreground">{curLibraryName}</BreadcrumbPage>
                  </BreadcrumbItem>
                  {curFolderName && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbPage className={curNoteName ? "text-muted-foreground" : "text-foreground"}>
                      {curFolderName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  {curNoteName && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">{curNoteName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex">
              <button onClick={() => toggleTheme()} className="text-foreground p-4">
                <SunMoon />
              </button>
            </div>
          </header>
          <div className="flex flex-1 flex-col min-h-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </MiddeSideBarProvider>
  )
}