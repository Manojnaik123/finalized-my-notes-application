'use client'

import { Skeleton } from "@/components/ui/skeleton"

const DashboardPage = () => {

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-foreground text-2xl text-center p-6">Welcome back manoj</h1>
      <div className="w-full h-1/5 flex justify-between items-center gap-4 p-4">
        <Skeleton className="h-full w-1/5" />
        <Skeleton className="h-full w-1/5" />
        <Skeleton className="h-full w-1/5" />
        <Skeleton className="h-full w-1/5" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
        <Skeleton className="h-14 w-full"/>
      </div>
    </div>
  )
}

export default DashboardPage