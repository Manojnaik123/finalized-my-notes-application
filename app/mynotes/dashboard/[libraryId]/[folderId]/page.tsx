"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Footer from "@/components/app/dashboard/footer";
import FolderContentView from "@/components/app/folder-view/folder-content-view";
import NoteView from "@/components/app/folder-view/note-view";
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
import { Heart, NotebookPen, Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {

  console.log('manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj manoj nmanoj manoj ');
  

  const [selectedNoteId, setselectedNoteId] = useState<number>(0);

  function handleNoteSelected(noteId: number) {
    setselectedNoteId(noteId);
  }

  return (
    <>
      <h1 className="text-foreground">Add notes message</h1>
    </>
  )
}





 // <div className="w-full flex-1 flex flex-col min-h-0">
    //   <div className="flex flex-1 min-h-0">
    //     {!selectedNoteId && (
    //       <div className="w-full md:max-w-sm 2xl:w-1/4  border-r overflow-y-auto scrollbar-custom">
    //         <FolderContentView onNoteClick={handleNoteSelected} />
    //       </div>
    //     )}
    //     {(selectedNoteId !== 0) ? (
    //       <div className="flex-1 2xl:w-3/4 px-8 py-6 overflow-y-auto scrollbar-custom">
    //         <NoteView noteId={selectedNoteId} />
    //       </div>) : (
    //         <p>Nothing selected</p>
    //       )
    //     }
    //   </div>
    //   <Footer />
    // </div>