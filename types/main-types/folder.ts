import { Note } from "./note"

interface Folder {
  id: number
  title: string
  // ...other folder fields
}

export type MappedFolder = Folder & { notes: Note[] }

