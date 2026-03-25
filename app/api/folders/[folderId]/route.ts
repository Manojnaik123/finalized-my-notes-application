import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"
import { validateFolderNameServer } from "@/lib/validations/all-validations"
import { getUserByClerkId } from "@/lib/data-base/users"
import { auth } from "@clerk/nextjs/server"


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ folderId: string }> }
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const { folderId } = await context.params
    const body = await req.json()

    // Validate folder name
    const inValidNameErrorMsg: string = validateFolderNameServer(body.folder_name) || ''
    if (inValidNameErrorMsg) {
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    // Verify folder ownership
    const { data: folder, error: folderError } = await supabase
      .from("folders")
      .select("library_id")
      .eq("id", folderId)
      .single()

    if (folderError || !folder) {
      return NextResponse.json({ data: null, error: "Folder not found" }, { status: 404 })
    }

    // Verify library ownership
    const { data: library } = await supabase
      .from("libraries")
      .select("id")
      .eq("id", folder.library_id)
      .eq("user_id", user.id)
      .single()

    if (!library) {
      return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 403 })
    }

    // Update folder
    const { data, error } = await supabase
      .from("folders")
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq("id", folderId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { data: null, error: "Failed to update folder" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ folderId: string }> }
) {
  try {
    const { folderId } = await context.params

    const { data, error } = await supabase
      .from("folders")
      .delete()
      .eq("id", folderId)
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Something went wrong, try deleting folder after sometime." }, { status: 400 })
    }

    return NextResponse.json({ data: null, error: null }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { data: null, error: "Failed to delete library" },
      { status: 500 }
    )
  }
}