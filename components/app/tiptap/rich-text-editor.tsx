'use client';

import {
    Bold as BoldIcon,
    Code,
    Heading1,
    Italic,
    List,
    ListOrdered,
    Image as ImageIcon,
    Strikethrough,
    Underline
} from "lucide-react"
import {
    useEditor,
    EditorContent,
    useEditorState,
    Editor
} from '@tiptap/react'
import { Toggle } from '@/components/ui/toggle'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import UnderlineExtension from '@tiptap/extension-underline'

const RichTextEditor = () => {

    var body;

    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
            Highlight.configure({ multicolor: true }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            Placeholder.configure({
                placeholder: 'Start typing...'
            }),
        ],
        content: '',
        immediatelyRender: false,
    })

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-col w-full h-full">
            {editor && <ToolBar editor={editor} />}
            <EditorContent editor={editor} placeholder="start typing" className='flex-1
            [&_.tiptap]:outline-none [&_.tiptap]:ring-0 [&_.tiptap]:border-none
            [&_h1]:text-2xl
          [&_h1]:text-foreground 
          [&_h1]:font-semibold
          [&_h1]:py-2
          [&_p]:text-sm
          [&_p]:text-foreground/50
          [&_p]:py-2
          
          [&_li]:text-sm
          [&_ul]:list-disc
          [&_ol]:list-decimal
          [&_ul]:ml-6
          [&_ol]:ml-6
          [&_li]:mb-1
          [&_li]:py-1
          [&_li]:text-md
          [&_li]:text-foreground/60

          [&_ul]:py-2
          [&_ul]:text-lg

          [&_ol]:py-2
          [&_ol]:text-lg
          
          [&_pre]:bg-foreground/3
          [&_pre]:p-2
          [&_pre]:rounded-sm
          [&_pre]:overflow-x-auto
          
          [&_pre]:my-4
          [&_pre]:mr-1
          [&_pre]:scrollbar-custom

          [&_code]:text-foreground/70
          [&_code]:px-1
          [&_code]:py-0.5
          [&_code]:rounded
            ' />
        </div>
    )
}

export default RichTextEditor;




const ToolBar = ({ editor }: { editor: Editor }) => {
    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                isBold: ctx.editor.isActive("bold") ?? false,
                isItalic: ctx.editor.isActive("italic") ?? false,
                isUnderline: ctx.editor.isActive("underline") ?? false,
                isStrike: ctx.editor.isActive("strike") ?? false,
                isCode: ctx.editor.isActive("code") ?? false,
                isHeading: ctx.editor.isActive("heading") ?? false,
            }
        },
    })

    return (
        <div className='flex p-1 border gap-1'>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isBold}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <BoldIcon />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isItalic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isUnderline}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Underline />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isStrike}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isCode}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
            >
                <Code />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isCode}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isCode}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List />
            </Toggle>
            <Toggle aria-label="Toggle bookmark" size="sm" variant="outline"
                pressed={editorState.isHeading}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 />
            </Toggle>
        </div>
    )
} 