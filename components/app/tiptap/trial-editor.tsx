// components/app/tiptap/trial-editor.tsx
'use client'

import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import Highlight from '@tiptap/extension-highlight'
import Paragraph from '@tiptap/extension-paragraph'
import React, { useEffect, useState } from 'react'

import { EditorState, defaultEditorState } from '@/types/main-types/rich-text-editor'
import { editorStyle } from '@/lib/rich-text-related-data/rich-text-editor'
import { BubbleMenu } from '@tiptap/react/menus'
import { useEditor, EditorContent, useEditorState, Editor } from '@tiptap/react'
import Toolbar from './tool-bar'
import { useAutoSave } from '@/hooks/use-auto-save' // 👈 import hook
// import { useAutoSave } from '@/hooks/use-auto-save'

interface TiptapProps {
  content: string
  noteId: number  // 👈 add this
  title: string   // 👈 add this
  triggerSave: (payload: { title: string; content: string; folder_id: number }) => void
  folder_id: number
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
      triggerSave({ title, content: editor.getHTML(), folder_id: folder_id  }) 
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

  // useEffect(() => {
  //   if (editor && content !== editor.getHTML()) {
  //     editor.commands.setContent(content)
  //     setIsTyping(content.replace(/<[^>]*>/g, '').length > 0)
  //   }
  // }, [content, editor])

  const editorState: EditorState = useEditorState({
    editor,
    selector: (ctx: { editor: Editor | null }) => ({
      isBold: ctx.editor?.isActive('bold') ?? false,
      isItalic: ctx.editor?.isActive('italic') ?? false,
      isUnderline: ctx.editor?.isActive('underline') ?? false,
      isStrike: ctx.editor?.isActive('strike') ?? false,
      isHeading1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
      isHeading2: ctx.editor?.isActive('heading', { level: 2 }) ?? false,
      isHeading3: ctx.editor?.isActive('heading', { level: 3 }) ?? false,
      isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
      isCode: ctx.editor?.isActive('code') ?? false,
      isUndo: ctx.editor?.can().undo() ?? false,
      isRedo: ctx.editor?.can().redo() ?? false,
      isHighlight: ctx.editor?.isActive('highlight') ?? false,
      isBulletList: ctx.editor?.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
      isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
      currentHeading: ctx.editor?.isActive('heading', { level: 1 }) ? '2'
        : ctx.editor?.isActive('heading', { level: 2 }) ? '3'
          : ctx.editor?.isActive('heading', { level: 3 }) ? '4'
            : '1',
    })
  }) ?? defaultEditorState

  return (
    <>
      {editor && showMenu && (
        <BubbleMenu className='z-100' editor={editor} options={{ placement: 'top', offset: 8, flip: true }}>
          <Toolbar editor={editor} editorState={editorState} />
        </BubbleMenu>
      )}
      <div className="relative w-full h-full">
        {!isTyping && !isFocused && (
          <p className="absolute top-0 left-0 py-1 text-foreground/70 text-sm pointer-events-none z-10 px-0 py-0">
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