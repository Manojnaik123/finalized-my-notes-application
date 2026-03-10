import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Library[]>>> {
  try {
    // const { searchParams } = new URL(req.url)
    // const userId = searchParams.get("user_id")

    const userId = 1;

    let query = supabase.from("libraries").select("*")

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