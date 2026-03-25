import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from 'svix'
import { supabase } from "@/lib/data-base/supabase"

export async function POST(req: Request) {
    console.log('reached the web');
    
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add clerk web hook to .env')
    }

    const headerPayload = headers()
    const svix_id = (await headerPayload).get('svix-id')
    const svix_timestamp = (await headerPayload).get('svix-timestamp')
    const svix_signature = (await headerPayload).get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured', { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature
        }) as WebhookEvent
    } catch (err) {
        console.log('Error verifying webhook:', err)
        return new Response('Error occured', { status: 400 })
    }

    const eventType = evt.type

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name, last_name } = evt.data

        if (!id || !email_addresses) {
            return new Response('Error occured -- missing data', { status: 400 })
        }

        const userName = [first_name, last_name].filter(Boolean).join(' ') 
            || email_addresses[0].email_address.split('@')[0]

        const { data, error } = await supabase
            .from('users')
            .insert({
                clerk_id: id,
                email: email_addresses[0].email_address,
                user_name: userName,
            })
            .select()
            .single()

        if (error) {
            return new Response('Error saving user', { status: 500 })
        }
    }
    return new Response('', { status: 200 })
}