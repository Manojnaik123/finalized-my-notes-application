'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function SSOCallbackPage() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center gap-3'>
      <h1 className='font-mono text-sm tracking-widest uppercase text-muted-foreground'>
        [ NotesLab ]
      </h1>
      <p className='text-sm text-muted-foreground animate-pulse'>
        Signing you in...
      </p>
      {/* <div id='clerk-captcha' /> */}
      <AuthenticateWithRedirectCallback/>
    </div>
  )
}