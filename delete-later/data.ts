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
    folderId: 1,
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
    updatedAt: ''
  },
  {
    id: 2,
    folderId: 1,
    title: "API Integration Notes",
    content: `<h1>API Integration Notes</h1>
      <p>Notes on integrating the third-party payment gateway into our existing backend.</p>
      <h2>Endpoints</h2>
      <ul>
        <li><code>POST /api/payments/initiate</code> — Start a transaction</li>
        <li><code>GET /api/payments/:id</code> — Fetch transaction status</li>
        <li><code>DELETE /api/payments/:id</code> — Cancel pending payment</li>
      </ul>
      <blockquote>Always validate webhook signatures before processing events.</blockquote>`,
    updatedAt: ''
  },
  {
    id: 3,
    folderId: 2,
    title: "Team Meeting — Q1 Planning",
    content: `<h1>Team Meeting — Q1 Planning</h1>
      <p>Agenda and action items from the Q1 roadmap planning session held on March 5th.</p>
      <h2>Action Items</h2>
      <ul>
        <li>Finalize feature list by March 15th.</li>
        <li>Assign squad leads for each workstream.</li>
        <li>Schedule design reviews biweekly.</li>
      </ul>
      <h2>Notes</h2>
      <p>Focus for Q1 is <strong>performance</strong> and <strong>onboarding</strong>. No major new features until tech debt is addressed.</p>`,
    updatedAt: ''
  },
  {
    id: 4,
    folderId: 2,
    title: "CSS Architecture Research",
    content: `<h1>CSS Architecture Research</h1>
      <p>Comparing different CSS methodologies for the upcoming design system migration.</p>
      <h2>Options Considered</h2>
      <ul>
        <li><strong>BEM</strong> — Verbose but predictable.</li>
        <li><strong>CSS Modules</strong> — Scoped by default, great with React.</li>
        <li><strong>Tailwind</strong> — Utility-first, fast iteration.</li>
      </ul>
      <p>Decision: Move forward with <strong>Tailwind + CSS Modules</strong> for component-level overrides.</p>`,
    updatedAt: ''
  },
  {
    id: 5,
    folderId: 3,
    title: "Book Notes — Atomic Habits",
    content: `<h1>Book Notes — Atomic Habits</h1>
      <p>Key takeaways from <em>Atomic Habits</em> by James Clear.</p>
      <h2>Core Ideas</h2>
      <ul>
        <li>1% better every day compounds to 37x improvement in a year.</li>
        <li>Focus on systems, not goals.</li>
        <li>Identity-based habits: become the person who does the thing.</li>
      </ul>
      <blockquote>"You do not rise to the level of your goals. You fall to the level of your systems."</blockquote>`,
    updatedAt: ''
  },
  {
    id: 6,
    folderId: 3,
    title: "Database Schema Draft",
    content: `<h1>Database Schema Draft</h1>
      <p>Initial schema design for the notes application.</p>
      <h2>Tables</h2>
      <ul>
        <li><code>users</code> — id, email, password_hash, created_at</li>
        <li><code>folders</code> — id, user_id, title, created_at</li>
        <li><code>notes</code> — id, folder_id, title, content, pinned, created_at</li>
        <li><code>tags</code> — id, note_id, label</li>
      </ul>
      <p>Consider adding <strong>soft deletes</strong> via a <code>deleted_at</code> column instead of hard deletes.</p>`,
    updatedAt: ''
  },
  {
    id: 7,
    folderId: 4,
    title: "Weekend Project Ideas",
    content: `<h1>Weekend Project Ideas</h1>
      <p>A running list of side projects to explore when time allows.</p>
      <ul>
        <li>Build a CLI tool for managing dotfiles.</li>
        <li>Create a habit tracker using local-first storage.</li>
        <li>Experiment with WebGL shaders for a portfolio background.</li>
        <li>Write a blog post on TypeScript utility types.</li>
      </ul>`,
    updatedAt: ''
  },
  {
    id: 8,
    folderId: 4,
    title: "Debugging Session — Auth Flow",
    content: `<h1>Debugging Session — Auth Flow</h1>
      <p>Tracked down a session expiry bug where users were getting logged out after exactly 1 hour regardless of activity.</p>
      <h2>Root Cause</h2>
      <p>The <code>maxAge</code> on the JWT was set to <code>3600</code> (seconds) but was not being refreshed on activity. Fixed by implementing a sliding session window.</p>
      <h2>Fix</h2>
      <ul>
        <li>Refresh token on every authenticated request.</li>
        <li>Store last activity timestamp in Redis.</li>
      </ul>`,
    updatedAt: ''
  },
];

export function getNotes(length?: number): Note[] {
  if (!length) return notes;
  return notes.slice(0, Math.min(length, notes.length));
}

export const libraries: Library[] = [
  {
    id: 1,
    title: 'Job Related',
    description: 'Notes related to my job and work tasks.'
  },
  {
    id: 2,
    title: 'Personal',
    description: 'Personal notes, thoughts and daily reflections.'
  },
  {
    id: 3,
    title: 'Learning',
    description: 'Study notes, courses and topics I am exploring.'
  },
  {
    id: 4,
    title: 'Projects',
    description: 'Notes and ideas for side projects I am working on.'
  }
]

