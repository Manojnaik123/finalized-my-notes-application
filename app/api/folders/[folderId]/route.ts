import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/types/api/api-response"
import { Library } from "@/types/main-types/library"
import { supabase } from "@/lib/data-base/supabase"
import { validateFolderNameServer } from "@/lib/validations/all-validations"


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ folderId: string }> }
) {
  try {
    const { folderId } = await context.params
    const body = await req.json();

    const inValidNameErrorMsg: string = validateFolderNameServer(body.folder_name) || '';

    if (inValidNameErrorMsg) {
      return NextResponse.json({ data: null, error: inValidNameErrorMsg }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("folders")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
        user_id: 1
      })
      .eq("id", folderId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data, error: null }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { data: null, error: "Failed to update library" },
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

    console.log('folderId');
    console.log(folderId);
    

    const { data, error } = await supabase
      .from("folders")
      .delete()
      .eq("id", folderId)
      .select()
    
    if (error) {
      console.log('error occured');
      
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data || data.length === 0) {
      console.log('count 0');
      
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