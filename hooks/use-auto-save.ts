import { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { NOTES_KEY } from "@/lib/query-keys/query-keyx"
import { Note } from "@/types/main-types/note"

type SaveStatus = "saved" | "saving" | "error"

interface AutoSaveOptions {
    noteId: string
    folderId: number
    delay?: number
    libraryId: number
}

interface SavePayload {
    title: string
    content: string
    folder_id: number
}

export function useAutoSave({ noteId, folderId, delay = 1500, libraryId }: AutoSaveOptions) {
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved")
    const lastSavedRef = useRef<SavePayload | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isSavingRef = useRef(false)
    const queryClient = useQueryClient()

    const updateCache = useCallback((payload: SavePayload) => {
        queryClient.setQueryData<Note[]>([NOTES_KEY, folderId], (old) =>
            old?.map((note) =>
                note.id === Number(noteId)
                    ? { ...note, title: payload.title, content: payload.content }
                    : note
            ) ?? []
        )
    }, [noteId, folderId, queryClient])

    const save = useCallback(async (payload: SavePayload) => {
        if(!noteId || noteId === '0') return 
        if(isSavingRef.current) return
        if (isSavingRef.current) return
        isSavingRef.current = true
        setSaveStatus("saving")
        const previousNotes = queryClient.getQueryData<Note[]>([NOTES_KEY, folderId])
        updateCache(payload)
        try {
            const res = await fetch(Number(noteId) > 0 ? `/api/notes/${noteId}` : `/api/notes`, {
                method: Number(noteId) > 0 ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error("Failed to save")
            queryClient.setQueryData<Note[]>([NOTES_KEY, folderId], (old) =>
                old?.map((note) =>
                    note.id === Number(noteId)
                        ? { ...note, title: payload.title, content: payload.content }
                        : note
                ) ?? []
            )

            setSaveStatus("saved")
            await queryClient.invalidateQueries({ queryKey: [NOTES_KEY, folderId] })
            await queryClient.invalidateQueries({ queryKey: [NOTES_KEY, 'library', libraryId] })

            const { data } = await res.json()
            return data
        } catch (err) {
            queryClient.setQueryData([NOTES_KEY, folderId], previousNotes)
            setSaveStatus("error")
        } finally {
            isSavingRef.current = false
        }
    }, [noteId, folderId, queryClient, libraryId])

    const triggerSave = useCallback((payload: SavePayload) => {
        setSaveStatus("saving")

        // update cache instantly on every keystroke
        updateCache(payload)

        // debounce the DB save
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            save(payload)
        }, delay)
    }, [save, delay, updateCache])

    // flush on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            if (lastSavedRef.current && !isSavingRef.current) {
                save(lastSavedRef.current)
            }
        }
    }, [save])

    return { saveStatus, triggerSave }
}