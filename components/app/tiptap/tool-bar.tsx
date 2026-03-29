// 'use client'

// import { Separator } from '@/components/ui/separator'
// import { Toggle } from '@/components/ui/toggle'
// import { Editor } from '@tiptap/react'
// import { BoldIcon, Code, Highlighter, ItalicIcon, List, ListOrdered, Quote, SquareCode, Strikethrough, Underline } from 'lucide-react'
// import { Undo, Redo, Minus, RemoveFormatting } from 'lucide-react'
// import { EditorState } from '@/types/main-types/rich-text-editor'
// import type { Level } from '@tiptap/extension-heading'

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { headers } from '@/lib/rich-text-related-data/rich-text-editor'

// const Toolbar = ({ editor, editorState }: { editor: Editor, editorState: EditorState }) => {

//   function handleSelectChange(value: string) {
//     if (Number(value) === 1) {
//       editor?.chain().focus().setParagraph().run()
//       return
//     }
//     editor?.chain().focus().toggleHeading({ level: (Number(value) - 1) as Level }).run()
//   }

//   const formatButtons = [
//     { icon: <ItalicIcon />, active: editorState.isItalic, action: () => editor?.chain().focus().toggleItalic().run() },
//     { icon: <BoldIcon />, active: editorState.isBold, action: () => editor?.chain().focus().toggleBold().run() },
//     { icon: <Underline />, active: editorState.isUnderline, action: () => editor?.chain().focus().toggleUnderline().run() },
//     { icon: <Strikethrough />, active: editorState.isStrike, action: () => editor?.chain().focus().toggleStrike().run() },
//   ]

//   const listButtons = [
//     { icon: <List />, active: editorState.isBulletList, action: () => editor?.chain().focus().toggleBulletList().run() },
//     { icon: <ListOrdered />, active: editorState.isOrderedList, action: () => editor?.chain().focus().toggleOrderedList().run() },
//   ]

//   const codeButtons = [
//     { icon: <Code />, active: editorState.isCode, action: () => editor?.chain().focus().toggleCode().run() },
//     { icon: <SquareCode />, active: editorState.isCodeBlock, action: () => editor?.chain().focus().toggleCodeBlock().run() },
//   ]

//   const extraButtons = [
//     { icon: <Highlighter />, active: editorState.isHighlight, action: () => editor?.chain().focus().toggleHighlight().run() },
//     { icon: <Quote />, active: editorState.isBlockquote, action: () => editor?.chain().focus().toggleBlockquote().run() },
//   ]

//   const renderButtons = (buttons: typeof formatButtons) => buttons.map((btn, i) => (
//     <Toggle key={i} variant="outline" className='border-none'
//       pressed={btn.active}
//       onPressedChange={btn.action}>
//       {btn.icon}
//     </Toggle>
//   ))

//   return (
//     <div className='flex border gap-1 rounded-md p-1 px-2 text-card-foreground/50 bg-card'>
//       {renderButtons(formatButtons)}
//       <Separator orientation='vertical' className='my-1' />
//       <Select onValueChange={handleSelectChange} value={editorState.currentHeading}>
//         <SelectTrigger className="w-auto">
//           <SelectValue placeholder="Paragraph" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {headers.map((header) => (
//               <SelectItem value={header.value.toString()}>{header.headerName}</SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <Separator orientation='vertical' className='my-1' />
//       {renderButtons(listButtons)}
//       <Separator orientation='vertical' className='my-1' />
//       {renderButtons(codeButtons)}
//       <Separator orientation='vertical' className='my-1' />
//       {renderButtons(extraButtons)}
//       <Separator orientation='vertical' className='my-1' />
//       <Toggle variant="outline" className='border-none' disabled={!editorState.isUndo}
//         onPressedChange={() => editor?.chain().focus().undo().run()}>
//         <Undo className='h-4 w-4' />
//       </Toggle>
//       <Toggle variant="outline" className='border-none' disabled={!editorState.isRedo}
//         onPressedChange={() => editor?.chain().focus().redo().run()}>
//         <Redo className='h-4 w-4' />
//       </Toggle>
//       <Separator orientation='vertical' className='my-1' />
//       <Toggle variant="outline" className='border-none'
//         onPressedChange={() => editor?.chain().focus().setHorizontalRule().run()}>
//         <Minus className='h-4 w-4' />
//       </Toggle>
//       <Toggle variant="outline" className='border-none'
//         onPressedChange={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}>
//         <RemoveFormatting className='h-4 w-4' />
//       </Toggle>
//     </div>
//   )
// }

// export default Toolbar;

'use client'

import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import { BoldIcon, Code, Highlighter, ItalicIcon, List, ListOrdered, Quote, SquareCode, Strikethrough, Underline } from 'lucide-react'
import { Undo, Redo, Minus, RemoveFormatting } from 'lucide-react'
import { EditorState } from '@/types/main-types/rich-text-editor'
import type { Level } from '@tiptap/extension-heading'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { headers } from '@/lib/rich-text-related-data/rich-text-editor'

const Toolbar = ({ editor, editorState }: { editor: Editor, editorState: EditorState }) => {

  function handleSelectChange(value: string) {
    if (Number(value) === 1) {
      editor?.chain().focus().setParagraph().run()
      return
    }
    editor?.chain().focus().toggleHeading({ level: (Number(value) - 1) as Level }).run()
  }

  const formatButtons = [
    { icon: <ItalicIcon className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isItalic, action: () => editor?.chain().focus().toggleItalic().run() },
    { icon: <BoldIcon className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isBold, action: () => editor?.chain().focus().toggleBold().run() },
    { icon: <Underline className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isUnderline, action: () => editor?.chain().focus().toggleUnderline().run() },
    { icon: <Strikethrough className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isStrike, action: () => editor?.chain().focus().toggleStrike().run() },
  ]

  const listButtons = [
    { icon: <List className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isBulletList, action: () => editor?.chain().focus().toggleBulletList().run() },
    { icon: <ListOrdered className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isOrderedList, action: () => editor?.chain().focus().toggleOrderedList().run() },
  ]

  const codeButtons = [
    { icon: <Code className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isCode, action: () => editor?.chain().focus().toggleCode().run() },
    { icon: <SquareCode className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isCodeBlock, action: () => editor?.chain().focus().toggleCodeBlock().run() },
  ]

  const extraButtons = [
    { icon: <Highlighter className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isHighlight, action: () => editor?.chain().focus().toggleHighlight().run() },
    { icon: <Quote className='h-3 w-3 md:h-4 md:w-4' />, active: editorState.isBlockquote, action: () => editor?.chain().focus().toggleBlockquote().run() },
  ]

  const renderButtons = (buttons: typeof formatButtons) => buttons.map((btn, i) => (
    <Toggle
      key={i}
      variant="outline"
      className='border-none h-7 w-7 md:h-8 md:w-8 p-1'   // ✅ smaller on mobile
      pressed={btn.active}
      onPressedChange={btn.action}
    >
      {btn.icon}
    </Toggle>
  ))

  return (
    // ✅ scrollable wrapper — prevents overflow on mobile
    <div className='overflow-x-auto scrollbar-none max-w-[95vw] md:max-w-none'>
      <div className='flex border gap-0.5 md:gap-1 rounded-md p-1 px-1 md:px-2 text-card-foreground/50 bg-card min-w-max'>
        {renderButtons(formatButtons)}
        <Separator orientation='vertical' className='my-1' />
        <Select onValueChange={handleSelectChange} value={editorState.currentHeading}>
          <SelectTrigger className="w-20 md:w-auto h-7 md:h-8 text-xs md:text-sm">  {/* ✅ smaller on mobile */}
            <SelectValue placeholder="Paragraph" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {headers.map((header) => (
                <SelectItem key={header.value} value={header.value.toString()}>{header.headerName}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator orientation='vertical' className='my-1' />
        {renderButtons(listButtons)}
        <Separator orientation='vertical' className='my-1' />
        {renderButtons(codeButtons)}
        <Separator orientation='vertical' className='my-1' />
        {renderButtons(extraButtons)}
        <Separator orientation='vertical' className='my-1' />
        <Toggle variant="outline" className='border-none h-7 w-7 md:h-8 md:w-8 p-1' disabled={!editorState.isUndo}
          onPressedChange={() => editor?.chain().focus().undo().run()}>
          <Undo className='h-3 w-3 md:h-4 md:w-4' />
        </Toggle>
        <Toggle variant="outline" className='border-none h-7 w-7 md:h-8 md:w-8 p-1' disabled={!editorState.isRedo}
          onPressedChange={() => editor?.chain().focus().redo().run()}>
          <Redo className='h-3 w-3 md:h-4 md:w-4' />
        </Toggle>
        <Separator orientation='vertical' className='my-1' />
        <Toggle variant="outline" className='border-none h-7 w-7 md:h-8 md:w-8 p-1'
          onPressedChange={() => editor?.chain().focus().setHorizontalRule().run()}>
          <Minus className='h-3 w-3 md:h-4 md:w-4' />
        </Toggle>
        <Toggle variant="outline" className='border-none h-7 w-7 md:h-8 md:w-8 p-1'
          onPressedChange={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}>
          <RemoveFormatting className='h-3 w-3 md:h-4 md:w-4' />
        </Toggle>
      </div>
    </div>
  )
}

export default Toolbar