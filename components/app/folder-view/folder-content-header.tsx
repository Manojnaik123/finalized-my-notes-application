import SearchInput from '../fields/search-input';
import { Button } from '@/components/ui/button';
import { FilterIcon, Plus, SortDescIcon } from 'lucide-react';

const FolderContentHeader = () => {
    return (
        <>
            <SearchInput />
            <div className='flex w-full gap-2'>
                <Button variant={'outline'} className='grow text-secondary-foreground/70'>
                    <FilterIcon />
                    Filter
                </Button>
                <Button variant={'outline'} className='grow text-secondary-foreground/70'>
                    <SortDescIcon/>
                    Filter
                </Button>
                <Button className='bg-accent text-accent-foreground'>
                    <Plus />
                </Button>
            </div>
        </>
    )
}

export default FolderContentHeader;