"use client"

import { useState } from "react"
import { Pin, Heart, SlidersHorizontal } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

type DateFilter = "today" | "last7" | "last30"
type ReadTimeFilter = "quick" | "long"

interface FilterState {
    pinned: boolean
    favourited: boolean
    date: DateFilter[]
    readTime: ReadTimeFilter[]
}

const defaultFilter: FilterState = {
    pinned: false,
    favourited: false,
    date: [],
    readTime: [],
}

export function FilterPopover({ onApply }: { onApply?: (filters: FilterState) => void }) {
    const [filters, setFilters] = useState<FilterState>(defaultFilter)
    const [open, setOpen] = useState(false)

    function toggleDate(d: DateFilter) {
        setFilters(f => ({
            ...f,
            date: f.date.includes(d) ? f.date.filter(x => x !== d) : [...f.date, d]
        }))
    }

    function toggleReadTime(r: ReadTimeFilter) {
        setFilters(f => ({
            ...f,
            readTime: f.readTime.includes(r) ? f.readTime.filter(x => x !== r) : [...f.readTime, r]
        }))
    }

    function handleApply() {
        onApply?.(filters)
        setOpen(false)
    }

    function handleClear() {
        setFilters(defaultFilter)
        onApply?.(defaultFilter)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full">
                <Button variant={"outline"} className="w-full">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0 bg-neutral-950 border border-neutral-800 rounded-xl">
                <div className="">

                    {/* Status */}
                    <div className="px-4 py-2">
                        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Status</span>
                        <div className="space-y-1 flex justify-between">
                            <label className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-neutral-900 cursor-pointer">
                                <Checkbox
                                    checked={filters.pinned}
                                    onCheckedChange={(v) => setFilters(f => ({ ...f, pinned: !!v }))}
                                />
                                <span className="text-sm text-white flex-1">Pinned</span>
                                {/* <Pin className="h-4 w-4 text-neutral-500" /> */}
                            </label>
                            <label className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-neutral-900 cursor-pointer">
                                <Checkbox
                                    checked={filters.favourited}
                                    onCheckedChange={(v) => setFilters(f => ({ ...f, favourited: !!v }))}
                                />
                                <span className="text-sm text-white flex-1">Favourited</span>
                                {/* <Heart className="h-4 w-4 text-neutral-500" /> */}
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-neutral-800" />

                    {/* Date */}
                    <div className="px-4 py-2">
                        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Date</span>
                        <div className="grid grid-cols-2 gap-1">
                            {([
                                { value: "today", label: "Today" },
                                { value: "last7", label: "Last 7 days" },
                                { value: "last30", label: "Last 30 days" },
                            ] as { value: DateFilter; label: string }[]).map(({ value, label }, index) => (
                                <label
                                    key={value}
                                    className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-neutral-900 cursor-pointer
                                        ${index === 2 ? "col-span-2" : ""}  
                                    `}
                                >
                                    <Checkbox
                                        checked={filters.date.includes(value)}
                                        onCheckedChange={() => toggleDate(value)}
                                    />
                                    <span className="text-sm text-white">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-neutral-800" />

                    {/* Read Time */}
                    <div className="px-4 py-2">
                        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Read Time</span>
                        <div className="space-y-1">
                            {([
                                { value: "quick", label: "Quick (< 2 min)" },
                                { value: "long", label: "Long (> 5 min)" },
                            ] as { value: ReadTimeFilter; label: string }[]).map(({ value, label }) => (
                                <label key={value} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-neutral-900 cursor-pointer">
                                    <Checkbox
                                        checked={filters.readTime.includes(value)}
                                        onCheckedChange={() => toggleReadTime(value)}
                                    />
                                    <span className="text-sm text-white">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-neutral-800" />

                    {/* Actions */}
                    <div className="flex gap-2 px-4 py-2">
                        <button
                            onClick={handleClear}
                            className="w-full py-2 rounded-lg border border-neutral-700 text-sm text-neutral-400 hover:bg-neutral-900 transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleApply}
                            className="w-full py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                        >
                            Apply
                        </button>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    )
}