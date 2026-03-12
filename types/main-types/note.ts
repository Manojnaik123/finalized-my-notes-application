export interface Note {
    id: number,
    title: string,
    content: string,
    user_id: number,
    folder_id: number,
    is_pinned?: boolean,
    is_favourite?: boolean,
    updated_at: string,
    created_at: string,
}