import React from "react";
import { Note } from "../main-types/note";

export interface NoNoteProps {
    children: React.ReactNode,
    title: string,
    description: string,
}

export interface NoteCardProps {
    children?: React.ReactNode,
    note: Note,
    isActive: boolean,
    onNoteClick: (noteId: number) => void
}

export interface ToolTipProps {
    children: React.ReactNode,
    text: string,
    direction: 'right'|'left'|'top'|'bottom';
    className: string,
    isVisible: boolean,
}

export interface NoteHeaderProps {
    text: string,
    length: number,
    children: React.ReactNode,
}