import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Folder } from "@/types/props-types/folder."
import { supabase } from "@/lib/data-base/supabase"
import { validateFolderNameServer } from "@/lib/validations/all-validations"
import { auth } from '@clerk/nextjs/server'                   // ✅ added
import { getUserByClerkId } from "@/lib/data-base/users"      // ✅ added

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Folder[]>>> {
  try {
    const { searchParams } = new URL(req.url)
    const library_Id = searchParams.get("libraryId")

    // ✅ added — was fetching ALL folders from ALL users before
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    let query = supabase.from("folders")
      .select("*")
      .eq("user_id", user.id)                                  // ✅ added — filter by user
      .order("updated_at", { ascending: true })

    if (library_Id) {
      query = query.eq("library_id", library_Id)
    }

    const { data, error } = await query

    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    return NextResponse.json({ data, error: null }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Folder>>> {
  try {
    // ✅ replaced — was const userId = 1
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const body = await req.json()
    const { folder_name, library_id, icon_id } = body

    const inValidNameErrorMsg: string = validateFolderNameServer(folder_name) || ''
    if (inValidNameErrorMsg) {
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("folders")
      .insert({ folder_name, icon_id, user_id: user.id, library_id })  // ✅ userId → user.id
      .select()
      .single()

    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    return NextResponse.json({ data, error: null }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error: Failed to save the folder" }, { status: 500 })
  }
}