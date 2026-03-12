import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { supabase } from "@/lib/data-base/supabase"
import { Note } from "@/types/main-types/note"

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Note[]>>> {
  try {
    const { searchParams } = new URL(req.url)

    const folder_id = searchParams.get("folderId")
    const library_id = searchParams.get("libraryId")

    console.log('libraryid' + library_id);


    let query = supabase.from("notes")
      .select("*")
      .order("updated_at", { ascending: true });

    if (folder_id) {
      query = query.eq("folder_id", folder_id)
    } else if (library_id) {
      const { data: folders } = await supabase
        .from("folders")
        .select("id")
        .eq("library_id", library_id)

      const folderIds = folders?.map((f) => f.id) ?? []
      query = query.in("folder_id", folderIds).eq("is_favourite", true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}
