'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <div className='min-w-[350px]'>
        <SignUp.Root>

          {/* STEP 1: Details input */}
          <SignUp.Step name='start'>
            <h1 className='text-center pb-4'>[ NotesLab ]</h1>
            <div className='flex flex-col gap-2 bg-card/70 border p-6 items-center rounded-t-md'>
              <h1 className='text-2xl font-semibold text-card-foreground'>Create account</h1>
              <span className='text-card-foreground/50 text-sm'>Sign up with your Google or GitHub account</span>

              <Clerk.Connection name='google' className='w-full'>
                <Button className='w-full flex gap-2' variant='outline'>
                  <Clerk.Icon className='h-4' /> Sign up with Google
                </Button>
              </Clerk.Connection>

              <Clerk.Connection name='github' className='w-full'>
                <Button className='w-full flex gap-2' variant='outline'>
                  <Clerk.Icon className='brightness-45' /> Sign up with GitHub
                </Button>
              </Clerk.Connection>

              <div className='flex items-center w-full gap-2'>
                <Separator className='flex-1' />
                <span className='text-sm text-muted-foreground whitespace-nowrap'>Or continue with</span>
                <Separator className='flex-1' />
              </div>

              <div className='flex gap-2 w-full'>
                <Clerk.Field name='firstName' className='flex flex-col w-full'>
                  <Clerk.Label className='text-sm'>First name</Clerk.Label>
                  <Clerk.Input asChild>
                    <Input placeholder='John' />
                  </Clerk.Input>
                  <Clerk.FieldError className='text-xs text-destructive mt-1' />
                </Clerk.Field>

                <Clerk.Field name='lastName' className='flex flex-col w-full'>
                  <Clerk.Label className='text-sm'>Last name</Clerk.Label>
                  <Clerk.Input asChild>
                    <Input placeholder='Doe' />
                  </Clerk.Input>
                  <Clerk.FieldError className='text-xs text-destructive mt-1' />
                </Clerk.Field>
              </div>

              <Clerk.Field name='emailAddress' className='flex flex-col w-full'>
                <Clerk.Label className='text-sm'>Email</Clerk.Label>
                <Clerk.Input asChild>
                  <Input placeholder='john@example.com' />
                </Clerk.Input>
                <Clerk.FieldError className='text-xs text-destructive mt-1' />
              </Clerk.Field>

              <Clerk.Field name='password' className='flex flex-col w-full'>
                <Clerk.Label className='text-sm'>Password</Clerk.Label>
                <div className='relative w-full'>
                  <Clerk.Input asChild>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='pr-10'
                    />
                  </Clerk.Input>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <Clerk.FieldError className='text-xs text-destructive mt-1' />
              </Clerk.Field>

              <SignUp.Captcha className='self-center' />

              <SignUp.Action submit className='w-full'>
                <Button className='w-full'>Continue</Button>
              </SignUp.Action>
            </div>
            <div className='bg-card p-4 flex justify-center items-center border border-t-0 rounded-b-md'>
              <span className='text-sm text-card-foreground/50'>
                Already have an account?{' '}
                <b className='text-card-foreground'>
                  <u><Link href='/sign-in'>Sign in</Link></u>
                </b>
              </span>
            </div>
          </SignUp.Step>

          {/* STEP 2: Email OTP verification */}
          <SignUp.Step name='verifications'>
            <SignUp.Strategy name='email_code'>
              <h1 className='text-center pb-4'>[ NotesLab ]</h1>
              <div className='bg-card/70 flex flex-col items-center p-6 border rounded-md'>
                <h1 className='text-card-foreground font-semibold'>Check your email</h1>
                <p className='text-sm text-card-foreground/50'>to continue to your account</p>

                <p className='text-sm text-card-foreground/50 pb-4'>
                  We sent a verification code to your email address.
                </p>

                <Clerk.Field name='code'>
                  <Clerk.Label className='sr-only'>Verification code</Clerk.Label>
                  <Clerk.Input
                    type='otp'
                    autoSubmit
                    className='flex gap-2'
                    render={({ value, status }) => (
                      <div
                        data-status={status}
                        className='w-10 h-10 border flex items-center justify-center text-sm rounded-md data-[status=selected]:ring-2 data-[status=cursor]:ring-2'
                      >
                        {value}
                      </div>
                    )}
                  />
                  <Clerk.FieldError className='text-xs text-destructive mt-1' />
                </Clerk.Field>

                <SignUp.Action
                  className='pb-4 w-full'
                  resend
                  fallback={({ resendableAfter }) => (
                    <Button variant='link' size='sm' disabled className='pb-4 w-full pt-2'>
                      Didn&apos;t receive a code? Resend ({resendableAfter})
                    </Button>
                  )}
                >
                  <Button variant='link' size='sm' className='w-full pt-2'>
                    Didn&apos;t receive a code? Resend
                  </Button>
                </SignUp.Action>

                <SignUp.Action submit asChild className='w-full'>
                  <Button className='w-full'>Continue</Button>
                </SignUp.Action>
              </div>
            </SignUp.Strategy>
          </SignUp.Step>
        </SignUp.Root>
      </div>
    </div>
  )
}