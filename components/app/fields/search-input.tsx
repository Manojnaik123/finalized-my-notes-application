import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const SearchInput = () => {
  return (
    <div className='flex flex-1 gap-4'>
      <div className="relative grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          className="pl-9 "
        />
      </div>
    </div>
  )
}

export default SearchInput