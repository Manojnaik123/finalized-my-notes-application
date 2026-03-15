import SearchInput from '../fields/search-input';
import { Button } from '@/components/ui/button';
import { FilterIcon, Plus, SortDescIcon } from 'lucide-react';
import { AddFolderDialog } from '../dialogs/add-folder';
import { useState } from 'react';

const FolderContentHeader = () => {
    const [showAddFolderDialog, setShowAddFolderDilog] = useState<boolean>(false);

    function handleShowAddFolderDialog(){
        setShowAddFolderDilog(true);
    }

    return (
        <>
        {/* <AddFolderDialog open={showAddFolderDialog} setOpen={setShowAddFolderDilog}/> */}
            {/* <SearchInput /> */}
            <div className='flex w-full gap-2'>
                <Button variant={'outline'} className='grow text-secondary-foreground/70'>
                    <FilterIcon />
                    Filter
                </Button>
                <Button variant={'outline'} className='grow text-secondary-foreground/70'>
                    <SortDescIcon/>
                    Filter
                </Button>
                <Button className='bg-accent text-accent-foreground' 
                        onClick={handleShowAddFolderDialog}>
                    <Plus  />
                </Button>
            </div>
        </>
    )
}

export default FolderContentHeader;