"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"
import { useTheme } from "@/context/theme-context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export default function MynotesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isDark } = useTheme()
    const [queryClient] = useState(() => new QueryClient())

    return (
        <main className={isDark ? 'dark' : ''}>
            <Toaster/>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </QueryClientProvider>
        </main>
    )
}