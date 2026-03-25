import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"
import { validateLibraryNameServer } from "@/lib/validations/all-validations";
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from "@/lib/data-base/users";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Library[]>>> {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)

    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const { data, error } = await supabase
      .from("libraries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })

    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })

    return NextResponse.json({ data, error: null }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Library>>> {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 })

    const user = await getUserByClerkId(clerkId)

    if (!user) return NextResponse.json({ data: null, error: "User not found" }, { status: 404 })

    const body = await req.json()

    const { name, description, color_id } = body

    const inValidNameErrorMsg: string = validateLibraryNameServer(name) || '';

    if (inValidNameErrorMsg) {
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("libraries")
      .insert({ name, color_id, user_id: user.id, description })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, error: null }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error; Failed to save the library" }, { status: 500 })
  }
}