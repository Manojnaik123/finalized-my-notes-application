import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { supabase } from "@/lib/data-base/supabase"
import { Note } from "@/types/main-types/note"
import { auth } from '@clerk/nextjs/server'                
import { getUserByClerkId } from "@/lib/data-base/users"  

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Note[]>>> {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const { searchParams } = new URL(req.url)
    const folder_id = searchParams.get("folderId")
    const library_id = searchParams.get("libraryId")

    // Verify library ownership first
    if (library_id) {
      const { data: library, error: libError } = await supabase
        .from("libraries")
        .select("id")
        .eq("id", library_id)
        .eq("user_id", user.id)
        .single()

      if (libError || !library) {
        return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 403 })
      }
    }

    // Verify folder ownership if provided
    if (folder_id) {
      const { data: folder, error: folderError } = await supabase
        .from("folders")
        .select("library_id")
        .eq("id", folder_id)
        .single()

      if (folderError || !folder) {
        return NextResponse.json({ data: null, error: "Folder not found" }, { status: 404 })
      }

      const { data: library, error: libError } = await supabase
        .from("libraries")
        .select("id")
        .eq("id", folder.library_id)
        .eq("user_id", user.id)
        .single()

      if (libError || !library) {
        return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 403 })
      }
    }

    let query = supabase.from("notes")
      .select("*")
      .order("updated_at", { ascending: false })

    if (folder_id) {
      query = query.eq("folder_id", folder_id)
    } else if (library_id) {
      const { data: folders } = await supabase
        .from("folders")
        .select("id")
        .eq("library_id", library_id)

      const folderIds = folders?.map((f) => f.id) ?? []
      if (folderIds.length === 0) {
        return NextResponse.json({ data: [], error: null }, { status: 200 })
      }
      query = query.in("folder_id", folderIds).eq("is_favourite", true)
    }

    const { data, error } = await query

    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    return NextResponse.json({ data, error: null }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}


export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Note>>> {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const body = await req.json()
    const { title, content, folder_id } = body

    if (!folder_id) {
      return NextResponse.json({ data: null, error: "folder_id is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("notes")
      .insert({ title, content, folder_id })  
      .select()
      .single()

    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    return NextResponse.json({ data, error: null }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}