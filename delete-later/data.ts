import { Library } from "@/types/main-types/library";
import { Note } from "@/types/main-types/note";


export interface Folder {
  id: number;
  title: string;
}

export interface Favourites {
  noteId: number;
}

export const favourites: Favourites[] = [
  {
    noteId: 3
  },
  {
    noteId: 6
  }
]

export const folders: Folder[] = [
  {
    id: 1,
    title: 'Coding',
  },
  {
    id: 2,
    title: 'Studies',
  },
  {
    id: 3,
    title: 'Assignment',
  },
  {
    id: 4,
    title: 'Ideas',
  }
]

const notes: Note[] = [
  {
    id: 1,
    folder_id: 1,
    user_id: 1,
    title: "Dashboard Settings",
    content: ` We wil see ho we can modify the dashboard settings
    <h1>Dashboard Settings</h1>
      <p>Configure the main dashboard view for the alpha release. Need to sync with the design team on layout changes.</p>
      <h2>Overview</h2>
      <p>The new dashboard needs to accommodate both light and dark mode users while prioritizing readability of high-density data.</p>
      <ul>
        <li>Implement CSS Grid for widget placement.</li>
        <li>Add drag-and-drop functionality for dashboard customization.</li>
        <li>Ensure <code>z-index</code> layers are managed correctly for modals.</li>
      </ul>`,
    updated_at: '',
    created_at: ''
  },
];

export function getNotes(length?: number): Note[] {
  if (!length) return notes;
  return notes.slice(0, Math.min(length, notes.length));
}

export const libraries: Library[] = [
  {
    id: 1,
    user_id:1, 
    name: 'Job Related',
    description: 'Notes related to my job and work tasks.'
  },
]

