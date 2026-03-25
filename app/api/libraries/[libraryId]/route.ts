import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"
import { Params } from "next/dist/server/request/params"
import { validateLibraryNameServer } from "@/lib/validations/all-validations"
import { getUserByClerkId } from "@/lib/data-base/users"
import { auth } from "@clerk/nextjs/server"

// change library model to folder

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Library[]>>> {
  try {
    // const { searchParams } = new URL(req.url)
    // const userId = searchParams.get("user_id")

    // const userId = 1;

    // let query = supabase.from("libraries").select("*")

    // if (userId) {
    //   query = query.eq("user_id", userId)
    // }

    // const { data, error } = await query

    // if (error) {
    //   return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    // }

    // return NextResponse.json({ data, error: null }, { status: 200 })

    const data: Library[] = []
    return NextResponse.json({ data, error: null }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ libraryId: string }> }
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const { libraryId } = await context.params
    const body = await req.json()

    console.log('Request body:', body) // ✅ DEBUG LOG
    console.log('libraryId:', libraryId) // ✅ DEBUG LOG

    // Validate that name is provided
    if (body.name === undefined) {
      return NextResponse.json({ data: null, error: "Library name is required" }, { status: 400 })
    }

    // Validate library name
    const inValidNameErrorMsg: string = validateLibraryNameServer(body.name) || ''
    if (inValidNameErrorMsg) {
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    // Verify library ownership
    const { data: library, error: libError } = await supabase
      .from("libraries")
      .select("id")
      .eq("id", libraryId)
      .eq("user_id", user.id)
      .single()

    if (libError || !library) {
      return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 403 })
    }

    // Update only the library name
    const updateData = {
      name: body.name,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("libraries")
      .update(updateData)
      .eq("id", libraryId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    console.log(err)

    return NextResponse.json(
      { data: null, error: "Failed to update library" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ libraryId: string }> }
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })
 
    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })
 
    const { libraryId } = await context.params
    const body = await req.json()
 
    console.log('Request body:', body) // ✅ DEBUG LOG
    console.log('libraryId:', libraryId) // ✅ DEBUG LOG
 
    // Validate that is_default is provided
    if (body.is_default === undefined) {
      return NextResponse.json({ data: null, error: "is_default field is required" }, { status: 400 })
    }
 
    // Verify library ownership
    const { data: library, error: libError } = await supabase
      .from("libraries")
      .select("id, is_default")
      .eq("id", libraryId)
      .eq("user_id", user.id)
      .single()
 
    if (libError || !library) {
      return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 403 })
    }
 
    // If setting as default, unset other libraries as default
    if (body.is_default === true && library.is_default !== true) {
      const { error: unsetError } = await supabase
        .from("libraries")
        .update({ is_default: false })
        .eq("user_id", user.id)
        .neq("id", libraryId)
 
      if (unsetError) {
        return NextResponse.json({ data: null, error: unsetError.message }, { status: 500 })
      }
    }
 
    // Update only the is_default status
    const updateData = {
      is_default: body.is_default,
      updated_at: new Date().toISOString()
    }
 
    const { data, error } = await supabase
      .from("libraries")
      .update(updateData)
      .eq("id", libraryId)
      .select()
      .single()
 
    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 400 })
    }
 
    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    console.log(err)
 
    return NextResponse.json(
      { data: null, error: "Failed to update library default status" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ libraryId: string }> }
) {
  try {
    const { libraryId } = await context.params

    const { data, error } = await supabase
      .from("libraries")
      .delete()
      .eq("id", libraryId)
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