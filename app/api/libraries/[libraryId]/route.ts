import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"
import { Params } from "next/dist/server/request/params"

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
) {
  try {
    const { libraryId } = await context.params
    const body = await req.json();

    if (body.is_default) {
      await supabase
        .from("libraries")
        .update({ is_default: false })
        .eq("user_id", 1)
    }

    const { data, error } = await supabase
      .from("libraries")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
        user_id: 1
      })
      .eq("id", libraryId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { data: null, error: "Failed to update library" },
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

    const { error, count } = await supabase
      .from("libraries")
      .delete()
      .eq("id", libraryId)
      .select()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!count || count === 0) {
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