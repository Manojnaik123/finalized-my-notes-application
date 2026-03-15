import { Input } from '@/components/ui/input'
import { useMiddleSideBar } from '@/context/middle-sidebar-context'
import { Search } from 'lucide-react'
import React from 'react'

type SearchInputProps = {
  handleSearch: (text: string) => void
}

const SearchInput = ({ handleSearch }: SearchInputProps) => {

  const { setSearchQuery } = useMiddleSideBar()

  return (
    <div className='flex flex-1 gap-4'>
      <div className="relative grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          className="pl-9 "
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchInput