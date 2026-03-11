import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"
import { validateLibraryNameServer } from "@/lib/validations/all-validations";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Library[]>>> {
  try {
    // const { searchParams } = new URL(req.url)
    // const userId = searchParams.get("user_id")

    const userId = 1;

    let query = supabase.from("libraries")
      .select("*")
      .order("created_at", { ascending: true });

    if (userId) {
      query = query.eq("user_id", userId)
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

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Library>>> {
  try {
    const body = await req.json()
    const { name } = body

    const inValidNameErrorMsg: string = validateLibraryNameServer(name) || '';

    if (inValidNameErrorMsg) {    
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    const userId = 1
    const color_id = 1

    const { data, error } = await supabase
      .from("libraries")
      .insert({ name, color_id, user_id: userId })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, error: null }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
  }
}