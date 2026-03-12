"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
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
import { ArrowRightIcon, ArrowRightLeft, ChevronsRight, ChevronsUpDownIcon, CirclePlus, Construction, EllipsisVertical, FolderIcon, FolderOpen, MoreHorizontal, MoreHorizontalIcon, PlusIcon, RefreshCcw, RefreshCw, Settings, SquarePen, Star, StarIcon, Trash, Trash2Icon } from "lucide-react"
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
import { useParams, useRouter } from "next/navigation"
import { Skeleton } from "./ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"
import NotImplemented from "./not-implemented"
import { useTheme } from "@/context/theme-context"
import { SIDEBAR_LIBRARY_LENGTH } from "@/lib/text-formaters/text-lengths"

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

  const { isDark } = useTheme()

  const libraryNameLength = 16;

  const { data: libraries = [], isLoading, error } = useLibraries()

  const { mutate: saveLibrary } = useSaveLibrary()

  // const { libraryId } = useParams()

  const params = useParams()

  const numericLibraryId = React.useMemo(() => {
    if (!params?.libraryId) return null
    return Number(params.libraryId)
  }, [params?.libraryId])

  const curLibrary = libraries.find((library) => library.id === numericLibraryId) ?? libraries[0]

  const router = useRouter();

  function handleAddEditLibraryClick(libraryId: number) {
    setSelectedLibraryId(libraryId)
    setAddLibraryDialogOpen(true)
  }

  function handleLibraryDeleteClick(libraryId: number) {
    setSelectedLibraryId(libraryId)
    setDeleteLibraryDialogOpen(true)
  }

  function handleLibrarySwitchClick(libraryId: number) {
    router.replace(`/mynotes/dashboard/${libraryId}`)
  }

  function handleDefaultset(libraryId: number) {
    saveLibrary({ id: libraryId, is_default: true })
  }

  const sortedLibraries = React.useMemo(() =>
    [...libraries].sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
    , [libraries])

  return (
    <>
      <DeleteConformation libraryId={selectedLibraryId} open={deleteLibraryDialogOpen} setOpen={setDeleteLibraryDialogOpen} />
      <AddLibraryDialog libraryId={selectedLibraryId} open={addLibraryDialogOpen} setOpen={setAddLibraryDialogOpen} />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              {curLibrary ? (
                <SidebarMenuButton
                  size="lg"
                  className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {activeTeam.logo}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{curLibrary?.name}</span>
                    <span className="truncate text-xs">{curLibrary?.description}</span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto" />
                </SidebarMenuButton>
              ) : (
                <>
                  <SidebarMenuButton
                    size="lg"
                    className="hover:bg-transparent"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Skeleton className="size-8 bg-foreground/5" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 text-left text-sm leading-tight">
                      <Skeleton className="w-full h-4 bg-foreground/5" />
                      <Skeleton className="w-full h-3 bg-foreground/5" />
                    </div>
                    <Skeleton className="h-8 w-5 bg-foreground/5" />
                  </SidebarMenuButton>
                </>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-72 ${isDark ? 'dark' : ''} `} align="start" side="bottom" sideOffset={4}>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                {sortedLibraries && sortedLibraries.map((library) => (
                  <DropdownMenuSub >
                    <DropdownMenuSubTrigger className="
                              hover:bg-foreground/5!
                              hover:text-foreground!
                              data-highlighted:bg-foreground/5!
                              data-highlighted:text-foreground!
                              data-[state=open]:bg-foreground/5!
                              data-[state=open]:text-foreground!
                            ">
                      <div className="relative">
                        <div
                          style={{
                            backgroundColor: libraryColors.find(
                              (color) => color.id === (library.color_id || 0)
                            )?.code
                          }}
                          className="flex size-4 items-center justify-center rounded-sm flex-shrink-0"
                        />
                        {library.is_default && (
                          <StarIcon className="absolute -top-1.5 -right-1.5 w-3 h-3 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <div className="w-full flex justify-between items-center">
                        {library.name.length > SIDEBAR_LIBRARY_LENGTH ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <span>{truncateString(library.name, SIDEBAR_LIBRARY_LENGTH)}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{library.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span>{library.name}</span>
                        )}
                        <span className="text-xs text-foreground/50">3 folders</span>
                      </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className={`${isDark && 'dark'}`}
                        sideOffset={isMobile? -100 : 0}  // negative offset pulls it down below the trigger
                        alignOffset={isMobile? 25 : 10}
                        avoidCollisions={false}>
                        <DropdownMenuItem onClick={() => handleLibrarySwitchClick(library.id)} className="hover:bg-foreground/5! hover:text-foreground! data-highlighted:bg-foreground/5! data-highlighted:text-foreground!">
                          <RefreshCcw />
                          Switch Library
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDefaultset(library.id)} className="hover:bg-foreground/5! hover:text-foreground! data-highlighted:bg-foreground/5! data-highlighted:text-foreground!">
                          <Star className="fill-yellow-400 text-yellow-400" />
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAddEditLibraryClick(library.id)} className="hover:bg-foreground/5! hover:text-foreground! data-highlighted:bg-foreground/5! data-highlighted:text-foreground!">
                          <SquarePen />
                          Edit Library
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleLibraryDeleteClick(library.id)} className="text-destructive hover:bg-foreground/5! hover:text-destructive! data-highlighted:bg-foreground/5! data-highlighted:text-destructive!">
                          <Trash className="text-destructive hover:bg-foreground/5! hover:text-destructive! data-highlighted:bg-foreground/5! data-highlighted:text-destructive!" />
                          Delete Library
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))}

              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleAddEditLibraryClick(0)} className="hover:bg-foreground/5! hover:text-foreground! data-highlighted:bg-foreground/5! data-highlighted:text-foreground!">
                  <CirclePlus />
                  Add Library
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu >
    </>
  )
}