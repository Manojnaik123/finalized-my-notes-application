'use client'

import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import Highlight from '@tiptap/extension-highlight'
import Paragraph from '@tiptap/extension-paragraph'
import React, { useEffect } from 'react'

import { EditorState, defaultEditorState } from '@/types/main-types/rich-text-editor'
import { dummyData, editorStyle } from '@/lib/rich-text-related-data/rich-text-editor'
import { BubbleMenu } from '@tiptap/react/menus'
import { useEditor, EditorContent, useEditorState, Editor } from '@tiptap/react'

import Toolbar from './tool-bar'

const Tiptap = ({ content }: { content: string }) => {
  const [showMenu, setShowMenu] = React.useState(true);

  const editor = useEditor({
    extensions: [
      Paragraph,
      StarterKit,
      CodeBlock,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Highlight.configure({ multicolor: true }),
    ],
    content: content,
    immediatelyRender: false,
    // editable:false
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

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
      isOrderedList: ctx.editor?.isActive('bulletList') ?? false,
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
        <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8, flip: true }}>
          <Toolbar editor={editor} editorState={editorState} />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className={`relative w-full h-full ${editorStyle} `} />
    </>
  )
}

export default Tiptap

