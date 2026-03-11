export interface Library {
    id: number,
    name: string,
    description?: string,
    color_id?: number,
    user_id: number,
    is_default?: boolean,
    updated_at?: string,
    created_at?: string,
}