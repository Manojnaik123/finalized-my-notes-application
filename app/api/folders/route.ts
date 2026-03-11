import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Folder } from "@/types/props-types/folder.";
import { supabase } from "@/lib/data-base/supabase"

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Folder[]>>> {
  try {
    console.log('reached');
    
    const { searchParams } = new URL(req.url)

    const library_Id = searchParams.get("libraryId")

    console.log(library_Id);
    

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

// export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Library>>> {
//   try {
//     const body = await req.json()
//     const { name } = body

//     if (!name) {
//       return NextResponse.json({ data: null, error: "Library Name is required" }, { status: 400 })
//     }

//     const userId = 1
//     const color_id = 1

//     const { data, error } = await supabase
//       .from("libraries")
//       .insert({ name, color_id, user_id: userId })
//       .select()
//       .single()

//     if (error) {
//       return NextResponse.json({ data: null, error: error.message }, { status: 500 })
//     }

//     return NextResponse.json({ data, error: null }, { status: 201 })

//   } catch (err) {
//     return NextResponse.json({ data: null, error: "Internal server error" }, { status: 500 })
//   }
// }