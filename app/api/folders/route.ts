import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Folder } from "@/types/props-types/folder.";
import { supabase } from "@/lib/data-base/supabase"
import { validateFolderNameServer } from "@/lib/validations/all-validations";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Folder[]>>> {
  try {
    const { searchParams } = new URL(req.url)

    const library_Id = searchParams.get("libraryId")

    let query = supabase.from("folders")
      .select("*")
      .order("updated_at", { ascending: true });

    if (library_Id) {
      query = query.eq("library_id", library_Id)
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

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Folder>>> {
  try {

    const userId = 1
    // const icon_id = 1
    // const library_id = 1

    const body = await req.json()
    const { folder_name, library_id, icon_id } = body
    
    const inValidNameErrorMsg: string = validateFolderNameServer(folder_name) || '';

    if (inValidNameErrorMsg) {
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("folders")
      .insert({ folder_name, icon_id, user_id: userId, library_id  })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, error: null }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error: Failed to save the folder" }, { status: 500 })
  }
}