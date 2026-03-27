"use client"

import * as React from "react"

import { NavFolders } from "@/components/nav-main"
import { NavFavourites } from "@/components/nav- favourite"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon, Settings2, Settings, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"


const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const teams = [
  {
    name: "Acme Inc",
    logo: (
      <GalleryVerticalEndIcon
      />
    ),
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: (
      <AudioLinesIcon
      />
    ),
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: (
      <TerminalIcon
      />
    ),
    plan: "Free",
  },
];

// This is sample data.
const data = {

  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: (
        <TerminalSquareIcon
        />
      ),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: (
        <BotIcon
        />
      ),
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: (
        <BookOpenIcon
        />
      ),
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <PieChartIcon
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <MapIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { libraryId } = useParams()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavFolders />
        <NavFavourites />
      </SidebarContent>
      {/* <SidebarMenu className="mt-auto px-2">
        <Link href={`/mynotes/dashboard/${libraryId}/settings`}>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SettingsIcon />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      </SidebarMenu> */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
