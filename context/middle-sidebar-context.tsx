"use client"

import { createContext, useContext, useState } from "react"

type MiddleSideBarContextType = {
    isMiddleSideBarOpen: boolean
    toggleMiddleSideBar: () => void
}

const MiddleSideBarContext = createContext<MiddleSideBarContextType | null>(null)

export function MiddeSideBarProvider({ children }: { children: React.ReactNode }) {
    const [isMiddleSideBarOpen, setIsMiddleSideBarOpen] = useState(true)

    const toggleMiddleSideBar = () => setIsMiddleSideBarOpen(prev => !prev)

    return (
        <MiddleSideBarContext.Provider value={{ isMiddleSideBarOpen, toggleMiddleSideBar }}>
            {children}
        </MiddleSideBarContext.Provider>
    )
}

export function useMiddleSideBar() {
    const context = useContext(MiddleSideBarContext)
    if (!context) throw new Error("useMiddleSideBar must be used within its Provider")
    return context
}