import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { supabase } from "@/lib/data-base/supabase"
import { Note } from "@/types/main-types/note"
import { log } from "node:console"

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await context.params
    const body = await req.json()
    const { title, content, is_favourite, is_pinned } = body
    
    if (is_pinned) {
      const { data: pinnedNotes, error: countError } = await supabase
        .from("notes")
        .select("id")
        .eq("folder_id", body.folder_id) 
        .eq("is_pinned", is_pinned)
        .neq("id", noteId)  

      if (countError) {
        return NextResponse.json({ data: null, error: countError.message }, { status: 500 })
      }

      if (pinnedNotes && pinnedNotes.length >= 5) {
        return NextResponse.json(
          { data: null, error: "You can only pin up to 5 notes per folder" },
          { status: 403 }
        )
      }
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    if (is_favourite !== undefined) updateData.is_favourite = is_favourite
    if (is_pinned !== undefined) updateData.is_pinned = is_pinned

    const { data, error } = await supabase
      .from("notes")
      .update(updateData)
      .eq("id", noteId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await context.params

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ data: null, error: null }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}
