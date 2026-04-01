import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/data-base/supabase"

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ noteId: string }> }
) {
    try {
        const { noteId } = await context.params

        const { data: note, error } = await supabase
            .from("notes")
            .select("*")
            .eq("id", noteId)
            .eq("is_public", true)
            .single()

        if (error || !note) {
            return NextResponse.json(
                { data: null, error: "Note not found or not publicly accessible" },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: note, error: null }, { status: 200 })

    } catch (err) {
        return NextResponse.json(
            { data: null, error: "Internal server error" },
            { status: 500 }
        )
    }
}