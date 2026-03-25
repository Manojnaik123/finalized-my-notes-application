import { supabase } from "@/lib/data-base/supabase"

export async function getUserByClerkId(clerkId: string) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("clerk_id", clerkId)
        .single()

    if (error) throw new Error(error.message)
    return data
}