'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Check, Copy, Earth, Link, Link2, Lock, Share2, Users, WholeWord } from "lucide-react"
import { CustomToggle } from "../fields/custom-toggle"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { SHARABLE_NOTE_LINK } from "@/lib/internal-urls/sharable-url"

export function PopoverDemo({ onTogglePublic, isPublic, noteId }: { onTogglePublic: () => void, isPublic: boolean, noteId: number }) {
    const [copied, setCopied] = useState(false)
    const sharableUrl = SHARABLE_NOTE_LINK + noteId
    const pathName = usePathname()

    // const fullUrl = domain + pathName

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(sharableUrl)
            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (err) {
            console.error("Failed to copy", err)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Share2 className="h-4" />
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start" alignOffset={-265} sideOffset={10} >
                <div className="flex flex-col gap-2">
                    <div className="px-3 py-2 pt-3 flex flex-col gap-2">
                        <h4 className="leading-none font-medium text-lg">Share Note</h4>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <Lock className="h-3" /> Only you can access this note
                        </p>
                    </div>
                    <Separator orientation="horizontal" />

                    <div className="px-3 py-2 flex w-full">
                        <div className="flex flex-1 items-center gap-2">
                            <Earth className="h-7" />
                            <p className="text-md font-">Public access</p>
                        </div>
                        <CustomToggle
                            checked={isPublic}
                            onChange={onTogglePublic}
                        />
                    </div>
                    {isPublic && (
                        <>
                            <Separator orientation="horizontal" />
                            <div className="px-3 py-2 pb-3 flex flex-col gap-2">
                                <span>Share Link</span>
                                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                                    <Link2 className="h-4 w-4 text-neutral-500 shrink-0" />
                                    <span className="text-xs text-neutral-400 flex-1 truncate">{sharableUrl}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="text-neutral-400 hover:text-white transition-colors shrink-0"
                                    >
                                        {copied
                                            ? <Check className="h-4 w-4 text-emerald-500" />
                                            : <Copy className="h-4 w-4" />
                                        }
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
