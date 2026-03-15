"use client"

import React, { createContext, useContext, useState } from "react"

type MiddleSideBarContextType = {
    isMiddleSideBarOpen: boolean
    toggleMiddleSideBar: () => void
    setIsMiddleSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
    isToggleDisabled: boolean
    setIsToggleDisabled: React.Dispatch<React.SetStateAction<boolean>>

    // new ones 
    sortBy: string
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    setSortBy: React.Dispatch<React.SetStateAction<string>>
}

const MiddleSideBarContext = createContext<MiddleSideBarContextType | null>(null)

export function MiddeSideBarProvider({ children }: { children: React.ReactNode }) {
    const [isMiddleSideBarOpen, setIsMiddleSideBarOpen] = useState(true)
    const [isToggleDisabled, setIsToggleDisabled] = useState(false)

    // new ones 
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("last-edited")

    const toggleMiddleSideBar = () => {
        if (!isToggleDisabled) setIsMiddleSideBarOpen(prev => !prev)  // ← guard
    }

    return (
        <MiddleSideBarContext.Provider value={{
            searchQuery,
            setSearchQuery,
            setSortBy,
            sortBy,
            // ^ new ones 
            isMiddleSideBarOpen,
            toggleMiddleSideBar,
            setIsMiddleSideBarOpen,
            isToggleDisabled,
            setIsToggleDisabled
        }}>
            {children}
        </MiddleSideBarContext.Provider>
    )
}

export function useMiddleSideBar() {
    const context = useContext(MiddleSideBarContext)
    if (!context) throw new Error("useMiddleSideBar must be used within its Provider")
    return context
}








// "use client"

// import React, { createContext, useContext, useState } from "react"

// type MiddleSideBarContextType = {
//     isMiddleSideBarOpen: boolean
//     toggleMiddleSideBar: () => void
//     setIsMiddleSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
//     isToggleDisabled: boolean
//     setIsToggleDisabled: React.Dispatch<React.SetStateAction<boolean>>

//     // new ones 
//     sortBy: string
//     searchQuery: string
//     setSearchQuery: React.Dispatch<React.SetStateAction<string>>
//     setSortBy: React.Dispatch<React.SetStateAction<string>>
// }

// const MiddleSideBarContext = createContext<MiddleSideBarContextType | null>(null)

// export function MiddeSideBarProvider({ children }: { children: React.ReactNode }) {
//     const [isMiddleSideBarOpen, setIsMiddleSideBarOpen] = useState(true)
//     const [isToggleDisabled, setIsToggleDisabled] = useState(false)

//     // new ones 
//     const [searchQuery, setSearchQuery] = useState("")
//     const [sortBy, setSortBy] = useState("last-edited")

//     const toggleMiddleSideBar = () => {
//         if (!isToggleDisabled) setIsMiddleSideBarOpen(prev => !prev)  // ← guard
//     }

//     return (
//         <MiddleSideBarContext.Provider value={{
//             searchQuery,
//             setSearchQuery,
//             setSortBy,
//             sortBy,
//             // ^ new ones 
//             isMiddleSideBarOpen,
//             toggleMiddleSideBar,
//             setIsMiddleSideBarOpen,
//             isToggleDisabled,
//             setIsToggleDisabled
//         }}>
//             {children}
//         </MiddleSideBarContext.Provider>
//     )
// }

// export function useMiddleSideBar() {
//     const context = useContext(MiddleSideBarContext)
//     if (!context) throw new Error("useMiddleSideBar must be used within its Provider")
//     return context
// }

