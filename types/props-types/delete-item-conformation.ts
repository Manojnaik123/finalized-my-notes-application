export interface DeleteItemDialogProps {
    itemName: string,
    itemType: 'library' | 'folder' | 'note'| 'account',
    handleDeletion: () => void,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}