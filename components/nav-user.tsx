"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { ChevronsUpDownIcon, SparklesIcon, BadgeCheckIcon, CreditCardIcon, BellIcon, LogOutIcon, Settings } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export function NavUser() {
  const { isMobile } = useSidebar()

  const { user: curUser } = useUser()

  const { libraryId } = useParams()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={curUser?.imageUrl} alt={curUser?.fullName ?? ''} />
                <AvatarFallback className="rounded-lg"></AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{curUser?.fullName}</span>
                <span className="truncate text-xs">{curUser?.emailAddresses[0].emailAddress}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={curUser?.imageUrl} alt={curUser?.fullName ?? ''} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{curUser?.fullName}</span>
                  <span className="truncate text-xs text-muted-foreground">{curUser?.emailAddresses[0].emailAddress}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={`/mynotes/dashboard/${libraryId}/settings`}
                  className="
                      flex items-center gap-2 w-full

                      data-[highlighted]:bg-foreground/5
                      data-[highlighted]:text-foreground

                      [&_svg]:stroke-current
                      [&_svg]:text-current
                      [&_svg]:opacity-100
                    "
                >
                  <Settings />
                  Account Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem asChild>
                <div
                  className="
                      flex items-center gap-2 w-full

                      data-[highlighted]:bg-foreground/5
                      data-[highlighted]:text-foreground

                      [&_svg]:stroke-current
                      [&_svg]:text-current
                    "
                >
                  <LogOutIcon />
                  Log out
                </div>
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
