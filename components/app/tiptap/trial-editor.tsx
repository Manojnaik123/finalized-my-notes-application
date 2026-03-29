// // components/app/tiptap/trial-editor.tsx
// 'use client'

// import StarterKit from '@tiptap/starter-kit'
// import Heading from '@tiptap/extension-heading'
// import CodeBlock from '@tiptap/extension-code-block'
// import Highlight from '@tiptap/extension-highlight'
// import Paragraph from '@tiptap/extension-paragraph'
// import React, { useEffect, useState } from 'react'

// import { EditorState, defaultEditorState } from '@/types/main-types/rich-text-editor'
// import { editorStyle } from '@/lib/rich-text-related-data/rich-text-editor'
// import { BubbleMenu } from '@tiptap/react/menus'
// import { useEditor, EditorContent, useEditorState, Editor } from '@tiptap/react'
// import Toolbar from './tool-bar'
// import { useAutoSave } from '@/hooks/use-auto-save' // 👈 import hook
// // import { useAutoSave } from '@/hooks/use-auto-save'

// interface TiptapProps {
//   content: string
//   noteId: number  // 👈 add this
//   title: string   // 👈 add this
//   triggerSave: (payload: { title: string; content: string; folder_id: number }) => void
//   folder_id: number
// }

// const Tiptap = ({ content, noteId, title, triggerSave, folder_id }: TiptapProps) => {
//   const [showMenu, setShowMenu] = useState(true)
//   const [placeholderText, setPlaceholderText] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const [isFocused, setIsFocused] = useState(false)

//   const editor = useEditor({
//     extensions: [
//       Paragraph,
//       StarterKit,
//       CodeBlock,
//       Heading.configure({ levels: [1, 2, 3] }),
//       Highlight.configure({ multicolor: true }),
//     ],
//     content: content,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       setIsTyping(editor.getText().length > 0)
//       triggerSave({ title, content: editor.getHTML(), folder_id: folder_id  }) 
//     },
//     onFocus: () => setIsFocused(true),
//     onBlur: () => {
//       if (editor?.getText().length === 0) setIsFocused(false)
//     },
//   })

//   useEffect(() => {
//     const fullText = 'Start typing...'
//     let i = 0
//     const interval = setInterval(() => {
//       if (i < fullText.length) {
//         setPlaceholderText(fullText.slice(0, i + 2))
//         i += 2
//       } else {
//         clearInterval(interval)
//       }
//     }, 10)
//     return () => clearInterval(interval)
//   }, [])

//   const editorState: EditorState = useEditorState({
//     editor,
//     selector: (ctx: { editor: Editor | null }) => ({
//       isBold: ctx.editor?.isActive('bold') ?? false,
//       isItalic: ctx.editor?.isActive('italic') ?? false,
//       isUnderline: ctx.editor?.isActive('underline') ?? false,
//       isStrike: ctx.editor?.isActive('strike') ?? false,
//       isHeading1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
//       isHeading2: ctx.editor?.isActive('heading', { level: 2 }) ?? false,
//       isHeading3: ctx.editor?.isActive('heading', { level: 3 }) ?? false,
//       isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
//       isCode: ctx.editor?.isActive('code') ?? false,
//       isUndo: ctx.editor?.can().undo() ?? false,
//       isRedo: ctx.editor?.can().redo() ?? false,
//       isHighlight: ctx.editor?.isActive('highlight') ?? false,
//       isBulletList: ctx.editor?.isActive('bulletList') ?? false,
//       isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
//       isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
//       currentHeading: ctx.editor?.isActive('heading', { level: 1 }) ? '2'
//         : ctx.editor?.isActive('heading', { level: 2 }) ? '3'
//           : ctx.editor?.isActive('heading', { level: 3 }) ? '4'
//             : '1',
//     })
//   }) ?? defaultEditorState

//   return (
//     <>
//       {editor && showMenu && (
//         <BubbleMenu className='z-100' editor={editor} options={{ placement: 'top', offset: 8, flip: true }}>
//           <Toolbar editor={editor} editorState={editorState} />
//         </BubbleMenu>
//       )}
//       <div className="relative w-full h-full">
//         {!isTyping && !isFocused && (
//           <p className="absolute top-0 left-0 py-1 text-foreground/70 text-sm pointer-events-none z-10 px-0 py-0">
//             {placeholderText}
//             <span className="animate-pulse">|</span>
//           </p>
//         )}
//         <EditorContent editor={editor} className={`relative w-full h-full ${editorStyle}`} />
//       </div>
//     </>
//   )
// }

// export default Tiptap

// components/app/tiptap/trial-editor.tsx
'use client'

import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import Highlight from '@tiptap/extension-highlight'
import Paragraph from '@tiptap/extension-paragraph'
import React, { useEffect, useRef, useState } from 'react'

import { EditorState, defaultEditorState } from '@/types/main-types/rich-text-editor'
import { editorStyle } from '@/lib/rich-text-related-data/rich-text-editor'
import { BubbleMenu } from '@tiptap/react/menus'
import { useEditor, EditorContent, useEditorState, Editor } from '@tiptap/react'
import { useAutoSave } from '@/hooks/use-auto-save'
import {
  BoldIcon, ItalicIcon, Underline, Strikethrough,
  Highlighter, Quote, Code, SquareCode,
  List, ListOrdered, Undo, Redo, Minus,
  RemoveFormatting, Search
} from 'lucide-react'
import type { Level } from '@tiptap/extension-heading'
import { Separator } from '@/components/ui/separator'

interface TiptapProps {
  content: string
  noteId: number
  title: string
  triggerSave: (payload: { title: string; content: string; folder_id: number }) => void
  folder_id: number
}

const COMMANDS = [
  { label: 'Bold', group: 'Text', icon: <BoldIcon size={14} />, action: (e: Editor) => e.chain().focus().toggleBold().run() },
  { label: 'Italic', group: 'Text', icon: <ItalicIcon size={14} />, action: (e: Editor) => e.chain().focus().toggleItalic().run() },
  { label: 'Underline', group: 'Text', icon: <Underline size={14} />, action: (e: Editor) => e.chain().focus().toggleUnderline().run() },
  { label: 'Strikethrough', group: 'Text', icon: <Strikethrough size={14} />, action: (e: Editor) => e.chain().focus().toggleStrike().run() },
  { label: 'Highlight', group: 'Text', icon: <Highlighter size={14} />, action: (e: Editor) => e.chain().focus().toggleHighlight().run() },
  { label: 'Heading 1', group: 'Structure', icon: <span className='text-xs font-bold'>H1</span>, action: (e: Editor) => e.chain().focus().toggleHeading({ level: 1 as Level }).run() },
  { label: 'Heading 2', group: 'Structure', icon: <span className='text-xs font-bold'>H2</span>, action: (e: Editor) => e.chain().focus().toggleHeading({ level: 2 as Level }).run() },
  { label: 'Heading 3', group: 'Structure', icon: <span className='text-xs font-bold'>H3</span>, action: (e: Editor) => e.chain().focus().toggleHeading({ level: 3 as Level }).run() },
  { label: 'Bullet list', group: 'Structure', icon: <List size={14} />, action: (e: Editor) => e.chain().focus().toggleBulletList().run() },
  { label: 'Ordered list', group: 'Structure', icon: <ListOrdered size={14} />, action: (e: Editor) => e.chain().focus().toggleOrderedList().run() },
  { label: 'Blockquote', group: 'Structure', icon: <Quote size={14} />, action: (e: Editor) => e.chain().focus().toggleBlockquote().run() },
  { label: 'Code', group: 'Code', icon: <Code size={14} />, action: (e: Editor) => e.chain().focus().toggleCode().run() },
  { label: 'Code block', group: 'Code', icon: <SquareCode size={14} />, action: (e: Editor) => e.chain().focus().toggleCodeBlock().run() },
  { label: 'Divider', group: 'Insert', icon: <Minus size={14} />, action: (e: Editor) => e.chain().focus().setHorizontalRule().run() },
  { label: 'Clear formatting', group: 'Insert', icon: <RemoveFormatting size={14} />, action: (e: Editor) => e.chain().focus().clearNodes().unsetAllMarks().run() },
  { label: 'Undo', group: 'History', icon: <Undo size={14} />, action: (e: Editor) => e.chain().focus().undo().run() },
  { label: 'Redo', group: 'History', icon: <Redo size={14} />, action: (e: Editor) => e.chain().focus().redo().run() },
]

const CommandMenu = ({ editor, onClose }: { editor: Editor; onClose: () => void }) => {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  )

  const groups = Array.from(new Set(filtered.map(c => c.group)))

  return (
    <div className='bg-card border border-border rounded-lg overflow-hidden w-48 z-50'>
      {/* search */}
      <div className='flex items-center gap-2 px-3 py-2 border-b border-border'>
        <Search size={12} className='text-muted-foreground flex-shrink-0' />
        <input
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          className='bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-full'
        />
      </div>

      {/* results */}
      <div className='max-h-64 overflow-y-auto'>
        {filtered.length === 0 && (
          <p className='text-xs text-muted-foreground text-center py-4'>No results</p>
        )}
        {groups.map(group => (
          <>
          <div key={group}>
            <p className='text-xs text-muted-foreground px-3 pt-2 pb-1  tracking-wide'>{group}</p>

            {filtered.filter(c => c.group === group).map((cmd, i) => (
              <>
                <button
                  key={i}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    cmd.action(editor)
                    onClose()
                  }}
                  className='w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors text-left'
                >
                  <span className='text-muted-foreground w-4 flex items-center justify-center flex-shrink-0'>
                    {cmd.icon}
                  </span>
                  {cmd.label}
                </button>
              </>
            ))}
          </div>
          <Separator orientation='horizontal' />
          </>
        ))}
      </div>
    </div>
  )
}

const Tiptap = ({ content, noteId, title, triggerSave, folder_id }: TiptapProps) => {
  const [showMenu, setShowMenu] = useState(true)
  const [placeholderText, setPlaceholderText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const editor = useEditor({
    extensions: [
      Paragraph,
      StarterKit,
      CodeBlock,
      Heading.configure({ levels: [1, 2, 3] }),
      Highlight.configure({ multicolor: true }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setIsTyping(editor.getText().length > 0)
      triggerSave({ title, content: editor.getHTML(), folder_id })
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => {
      if (editor?.getText().length === 0) setIsFocused(false)
    },
  })

  useEffect(() => {
    const fullText = 'Start typing...'
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setPlaceholderText(fullText.slice(0, i + 2))
        i += 2
      } else {
        clearInterval(interval)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {editor && showMenu && (
        <BubbleMenu
          className='z-100'
          editor={editor}
          options={{ placement: 'bottom-start', offset: 8, flip: true }}
        >
          <CommandMenu
            editor={editor}
            onClose={() => {
              // deselect text after applying command
              editor.commands.setTextSelection(editor.state.selection.to)
            }}
          />
        </BubbleMenu>
      )}
      <div className="relative w-full h-full">
        {!isTyping && !isFocused && (
          <p className="absolute top-0 left-0 text-foreground/70 text-sm pointer-events-none z-10 px-0 py-0">
            {placeholderText}
            <span className="animate-pulse">|</span>
          </p>
        )}
        <EditorContent editor={editor} className={`relative w-full h-full ${editorStyle}`} />
      </div>
    </>
  )
}

export default Tiptap