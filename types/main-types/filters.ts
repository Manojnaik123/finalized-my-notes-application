export type DateFilter = "today" | "last7" | "last30"
export type ReadTimeFilter = "quick" | "long"

export interface FilterState {
    pinned: boolean
    favourited: boolean
    date: DateFilter[]
    readTime: ReadTimeFilter[]
}

export const defaultFilter: FilterState = {
    pinned: false,
    favourited: false,
    date: [],
    readTime: [],
}