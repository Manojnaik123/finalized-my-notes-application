"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ArrowRightIcon, ChevronsUpDownIcon, EllipsisVertical, FolderIcon, MoreHorizontal, MoreHorizontalIcon, PlusIcon, Star, StarIcon, Trash2Icon } from "lucide-react"
// import { libraries } from "@/delete-later/data"
import { AddFolderDialog } from "./app/dialogs/add-folder"
import { AddLibraryDialog } from "./app/dialogs/add-library"
import { useLibraries } from "@/hooks/use-libraries"
import { libraryColors } from "@/lib/color-and-icon/colors-and-icons"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { truncateString } from "@/lib/text-formaters/text-formaters"
import { DeleteConformation } from "./app/conformation/delte-conformation"
import { useSaveLibrary } from "@/hooks/use-add-library"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Skeleton } from "./ui/skeleton"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const [addLibraryDialogOpen, setAddLibraryDialogOpen] = React.useState<boolean>(false)
  const [deleteLibraryDialogOpen, setDeleteLibraryDialogOpen] = React.useState<boolean>(false)
  const [selectedLibraryId, setSelectedLibraryId] = React.useState<number>(0)

  const folderNameLength = 16;

  const { data: libraries = [], isLoading, error } = useLibraries()

  const { mutate: saveLibrary } = useSaveLibrary()

  const { libraryId } = useParams()

  const numericLibraryId = Number(libraryId)

  const curLibrary = libraries.find((library) => library.id === numericLibraryId)

  function handleLibraryClick(libraryId: number) {
    setSelectedLibraryId(libraryId)
    setAddLibraryDialogOpen(true)
  }

  function handleFolderDeleteClick(libraryId: number) {
    setSelectedLibraryId(libraryId)
    setDeleteLibraryDialogOpen(true)
  }

  function handleDefaultset(e: React.MouseEvent<HTMLElement>, libraryId: number) {
    e.preventDefault()
    saveLibrary({ id: libraryId, is_default: true })
  }

  const sortedLibraries = React.useMemo(() =>
    [...libraries].sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
    , [libraries])

  function handleDropDownLibraryClick() {

  }

  if (!activeTeam) {
    return null
  }

  return (
    <>
      <DeleteConformation libraryId={selectedLibraryId} open={deleteLibraryDialogOpen} setOpen={setDeleteLibraryDialogOpen} />
      <AddLibraryDialog libraryId={selectedLibraryId} open={addLibraryDialogOpen} setOpen={setAddLibraryDialogOpen} />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {activeTeam.logo}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {curLibrary ? (
                    <>
                      <span className="truncate font-medium">{curLibrary?.name}</span>
                      <span className="truncate text-xs">{curLibrary?.description}</span>
                    </>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-full h-3" />
                    </div>
                  )}
                </div>
                <ChevronsUpDownIcon className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-72 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Libraries
              </DropdownMenuLabel>
              {sortedLibraries.sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
                .map((library) => (
                  <Link href={`/mynotes/dashboard/${library.id}`}>
                    <DropdownMenuItem onClick={handleDropDownLibraryClick}
                      key={library.name + library.id} className="flex justify-between gap-2 p-2 hover:!bg-muted hover:!text-foreground data-[highlighted]:!bg-muted data-[highlighted]:!text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            style={{
                              backgroundColor: libraryColors.find(
                                (color) => color.id === (library.color_id || 0)
                              )?.code
                            }}
                            className="flex size-6 items-center justify-center rounded-md flex-shrink-0"
                          />
                          {library.is_default && (
                            <StarIcon className="absolute -top-1.5 -right-1.5 w-3 h-3 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>

                        {library.name.length > folderNameLength ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{truncateString(library.name, folderNameLength)}</span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>{library.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span>{library.name}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <span> 3 folders </span>

                        {/* Action menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="start" side="right" sideOffset={8} className="w-48 rounded-lg">
                            <DropdownMenuItem onClick={() => handleLibraryClick(library.id)} className="hover:!bg-muted hover:!text-foreground data-[highlighted]:!bg-muted data-[highlighted]:!text-foreground">
                              <FolderIcon className="text-muted-foreground" />
                              <span>Edit Folder</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              onClick={(e) => handleDefaultset(e, library.id)}
                              className="hover:!bg-muted hover:!text-foreground data-[highlighted]:!bg-muted data-[highlighted]:!text-foreground">
                              <Star className="text-muted-foreground fill-yellow-400 text-yellow-400" />
                              <span>Set as Default</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:!bg-muted hover:!text-foreground data-[highlighted]:!bg-muted data-[highlighted]:!text-foreground">
                              <Trash2Icon className="text-destructive" />
                              <span className="text-destructive" onClick={() => handleFolderDeleteClick(library.id)}>Delete Project</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={() => handleLibraryClick(0)}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <PlusIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add library</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
