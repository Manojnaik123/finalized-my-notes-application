'use client'

import ActivityThisWeek from "@/components/app/dashboard/activity-graph"
import Footer from "@/components/app/dashboard/footer"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Globe, Heart, History, Lightbulb, MoreHorizontal, Notebook, Pin, SquareLibrary, StickyNote } from "lucide-react"

const DashboardPage = () => {

  return (
    <>
      <div className="w-full h-screen overflow-y-auto flex flex-col p-4 gap-4">
        <div className="">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back, Manoj</h1>
          <p className="text-foreground/50">Your creative workspace is ready for today's insights.</p>
        </div>
        <StatsDashBoard />
        <DashboardMiddleSection />
        <DashboardBottomSection />
      </div>
      <Footer />
    </>
  )
}

export default DashboardPage

function StatsDashBoard() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex gap-4">
        <div className="bg-card flex flex-col flex-1 p-4 gap-2">
          <span className="text-foreground/50">Total Notes</span>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">1,284</h1>
            <StickyNote className="text-foreground/50" />
          </div>
        </div>

        <div className="bg-card flex flex-col flex-1 p-4 gap-2">
          <span className="text-foreground/50">Favorites</span>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">84</h1>
            <Heart className="text-foreground/50" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4">
        <div className="bg-card flex flex-col flex-1 p-4 gap-2">
          <span className="text-foreground/50">Shared Notes</span>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">42</h1>
            <Globe className="text-foreground/50" />
          </div>
        </div>
        <div className="bg-card flex flex-col flex-1 p-4 gap-2">
          <span className="text-foreground/50">Edited Today</span>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">4</h1>
            <History className="text-foreground/50" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardMiddleSection() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-4">
      <div className="w-full md:w-6/10 flex flex-col gap-4">
        <div>
          <span>Continue where you left off</span>
        </div>
        <div className="w-full flex-1 flex flex-col md:flex-row gap-4">
          <div className="w-full ">
            <DashBoardNoteCard />
          </div>
          {/* <div className="w-full md:w-1/2 ">
            <DashBoardNoteCard />
          </div> */}
        </div>
      </div>
      <div className="w-full md:w-4/10 h-full">
        <ActivityThisWeek />
      </div>
    </div>
  )
}

function DashboardBottomSection() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-4">
      <div className="w-full md:w-6/10 flex flex-col gap-4">
        <div className="flex items-center justify-start gap-2">
          <Pin className="h-4 fill-foreground" />
          <span>Recently Pinned Notes</span>
        </div>
        <div className="w-full flex-1 flex flex-col gap-4">
          <DashboardBottomSectionRowCard />
          <DashboardBottomSectionRowCard />
        </div>
      </div>
      <div className="w-full md:w-4/10 h-full flex flex-col gap-4">
        <div className="flex justify-start items-center gap-2">
          <SquareLibrary className="h-5" /> Most Used Libraries
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex gap-2 items-center">
            <button className="p-2 inline rounded-sm bg-amber-200" />
            <span className="text-foreground text-2xl">Personal research</span>
            <Badge variant={"outline"} className="ml-auto">
              total 56 notes
            </Badge>
          </div>
          <div className="w-full flex gap-2 items-center">
            <button className="p-2 inline rounded-sm bg-red-200" />
            <span className="text-foreground text-2xl">Client Projects</span>
            <Badge variant={"outline"} className="ml-auto">
              total 56 notes
            </Badge>
          </div>
          <div className="w-full flex gap-2 items-center">
            <button className="p-2 inline rounded-sm bg-blue-200" />
            <span className="text-foreground text-2xl">Creative Writing</span>
            <Badge variant={"outline"} className="ml-auto">
              total 56 notes
            </Badge>
          </div>
          <div className="w-full flex gap-2 items-center">
            <button className="p-2 inline rounded-sm bg-green-200" />
            <span className="text-foreground text-2xl">Archived Thoughts</span>
            <Badge variant={"outline"} className="ml-auto">
              total 56 notes
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardBottomSectionRowCard() {
  return (
    <div className="bg-card p-4 flex gap-4 justify-between items-center">
      <div className="bg-card-foreground/10 p-3 rounded-full">
        <Lightbulb />
      </div>
      <div className="flex-1">
        <h1 className="text-card-foreground">Lorem ipsum dolor sit amet consectetur adipi</h1>
        <p className="text-card-foreground/50 text-sm"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure nam aspernatur minus quisquam </p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <span className="text-sm text-card-foreground/50">Nov 4</span>
        <Heart className="h-3 w-3 fill-red-400 text-red-400" />
        <Globe className="h-3 w-3 text-blue-400" />
      </div>
    </div>
  )
}

function DashBoardNoteCard() {
  return (
    <div className="p-4 flex flex-col gap-2 bg-card min-h-full">
      <div className="flex justify-between items-center text-sm text-card-foreground/50">
        <span >Updated 12m ago</span>
        <MoreHorizontal />
      </div>
      <h1 className="text-2xl text-card-foreground">Lorem ipsum, dolor sit amet consectetur adipisicing</h1>
      <p className="text-sm text-card-foreground/50">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique veniam cupiditate qui, voluptatem nostrum laboriosam quam quasi soluta culpa laborum dignissimos corporis, molestias vitae velit. Vero, odio sed? Nobis, animi.</p>
      <div className="flex gap-2">
        <Badge
          variant="secondary"
          className="flex items-center gap-1 rounded-full bg-blue-500/10 text-blue-400 px-2 py-0.5 text-xs"
        >
          <Globe className="h-3 w-3" />
          Shared
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-1 rounded-full bg-red-500/10 text-red-400 px-2 py-0.5 text-xs"
        >
          <Heart className="h-3 w-3 fill-red-400" />
          Favourite
        </Badge>
      </div>
    </div>
  )
}