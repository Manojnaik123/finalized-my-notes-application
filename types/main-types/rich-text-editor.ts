export interface EditorState {
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean
    isStrike: boolean
    isHeading1: boolean
    isHeading2: boolean
    isHeading3: boolean
    isCodeBlock: boolean
    isCode: boolean
    isHighlight: boolean
    isBulletList: boolean
    isOrderedList: boolean
    isBlockquote: boolean
    isUndo: boolean
    isRedo: boolean
    currentHeading: HeadingLevel
}

export const defaultEditorState: EditorState = {
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrike: false,
    isHeading1: false,
    isHeading2: false,
    isHeading3: false,
    isCodeBlock: false,
    isCode: false,
    isHighlight: false,
    isBulletList: false,
    isOrderedList: false,
    isBlockquote: false,
    isUndo: false,
    isRedo: false,
    currentHeading: '1'
}

export type HeadingLevel = '1' | '2' | '3' | '4'