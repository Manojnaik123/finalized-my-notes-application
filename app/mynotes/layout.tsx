"use client";

import { TooltipProvider } from "@/components/ui/tooltip"
import { useTheme } from "@/context/theme-context";
export default function MynotesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {isDark} = useTheme();
    return (
        <main className={isDark ? 'dark' : ''}>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </main>
    )
}