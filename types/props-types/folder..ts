export interface AddFolderDialogProps {
    folderId: number,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Folder {
    id: number, 
    folder_name: string, 
    description?: string,
    user_id: number,
    library_id: number,
    icon_id?: number,
    updated_at?: string, 
    created_at?: string,
}