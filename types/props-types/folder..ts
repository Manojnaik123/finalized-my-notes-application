export interface AddFolderDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Folder {
    id: number, 
    name: string, 
    iconId: number,
}