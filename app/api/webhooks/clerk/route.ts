import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from 'svix'


export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add clerk web hook to .env'
        )
    }

    const headerPayload = headers()
    const svix_id = (await headerPayload).get('svix-id')
    const svix_timestamp = (await headerPayload).get('svix-timestamp')
    const svix_signature = (await headerPayload).get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured', {
            status: 400
        })
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
        console.log('Error verifyng webhook:', err)
        return new Response('Error occured', {
            status: 400
        })
    }

    const eventType = evt.type

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data

        if (!id || !email_addresses) {
            return new Response('Error occured -- missing data', {
                status: 400
            })
        }

        const user = {
            clerkUserId: id,
            email: email_addresses[0].email_address,
            ...(first_name ? { firstName: first_name } : {}),
            ...(last_name ? { lastName: last_name } : {}),
            ...(image_url ? { imgUrl: image_url } : {})
        }

        console.log(user);
        // add the data to save the user data in the db here 
        // await createuser
    }
    return new Response('', { status: 200 })
}