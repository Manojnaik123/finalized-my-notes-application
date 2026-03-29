// import { SignIn } from '@clerk/nextjs';
// import { shadcn } from '@clerk/themes';

// export default function SignInPage() {
//   return (
//     <div className='bg-muted flex w-full flex-1 items-center justify-center p-6 md:p-10'>
//       <SignIn
//         appearance={{
//           theme: shadcn,
//         }}
//       />
//     </div>
//   );
// }

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { Pencil } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <div className='min-w-[350px]'>
        <SignIn.Root>

          <SignIn.Step name='start'>
            <h1 className='text-center pb-4'>[ NotesLab ]</h1>
            <div className='flex flex-col gap-2 bg-card/70 border p-6 items-center rounded-t-md'>
              <h1 className='text-2xl font-semibold text-card-foreground'>Welcome Back</h1>
              <span className='text-card-foreground/50'>Sign In with your Google or Github account</span>

              <Clerk.Connection name='google' className='w-full'>
                <Button className='w-full flex gap-2' variant={'outline'}><Clerk.Icon className='h-4' />  Signin with Google</Button>
              </Clerk.Connection>

              <Clerk.Connection name='github' className='w-full'>
                <Button className='w-full flex gap-2' variant={'outline'}> <Clerk.Icon className=' brightness-45' />Signin with GitHub</Button>
              </Clerk.Connection>

              <div className='flex items-center w-full gap-2'>
                <Separator className='flex-1' />
                <span className='text-sm text-muted-foreground whitespace-nowrap'>Or continue with</span>
                <Separator className='flex-1' />
              </div>

              <Clerk.Field name='identifier' className='flex flex-col w-full'>
                <Clerk.Label>Email</Clerk.Label>
                <Clerk.Input asChild>
                  <Input />
                </Clerk.Input>
                <Clerk.FieldError />
              </Clerk.Field>

              <SignIn.Action submit className='w-full'>
                <Button className='w-full'>Continue</Button>
              </SignIn.Action>

              {/* <SignIn.Captcha className='self-center' /> */}
              <div id="clerk-captcha" />

            </div>
            <div className='bg-card p-4 flex justify-center items-center border border-t-0 rounded-b-md'>
              <span className='text-sm text-card-foreground/50'> Don't have an account? <b className='text-card-foreground'><u><Link href={'/mynotes/sign-up'}>Sign up</Link></u></b></span>
            </div>
          </SignIn.Step>

          {/* STEP 2: OTP verification — this is what shows after Continue */}
          <SignIn.Step name='verifications'>
            <SignIn.Strategy name='email_code'>
              <h1 className='text-center pb-4'>[ notestab ]</h1>
              <div className='bg-card/70 flex flex-col items-center p-6 border rounded-md'>
                <h1 className='text-card-foreground font-semibold'>Check your email</h1>
                <p className='text-sm text-card-foreground/50'>to continue to your app</p>
                <div className='flex items-center gap-2 pb-4'>
                  <span className='text-sm text-card-foreground/50'>
                    <SignIn.SafeIdentifier />
                  </span>
                  <SignIn.Action navigate='start' asChild>
                    <Button variant='link' size='sm' className='h-auto p-0 text-card-foreground/50'>
                      <span style={{ borderBottom: '1px solid currentColor', lineHeight: 1, display: 'inline-flex' }}>
                        <Pencil style={{ width: '10px', height: '10px' }} />
                      </span>
                    </Button>
                  </SignIn.Action>
                </div>
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
                  <Clerk.FieldError />
                </Clerk.Field>

                <SignIn.Action
                  className='pb-4 w-full '
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
                </SignIn.Action>

                <SignIn.Action submit asChild className='w-full'>
                  <Button className='w-full'>
                    Continue
                  </Button>
                </SignIn.Action>

                <SignIn.Action navigate='choose-strategy' asChild>
                  <Button variant='link' className='text-sm text-card-foreground/50'>Use another method</Button>
                </SignIn.Action>
              </div>
            </SignIn.Strategy>
          </SignIn.Step>

          <SignIn.Step name='choose-strategy'>
            <div className='flex flex-col items-center gap-2 p-6 bg-card/70 border rounded-md'>
              <h1 className='font-bold'>Use another method</h1>
              <p className='text-muted-foreground text-sm pb-4'>
                Facing issues? You can use any of these methods to sign in.
              </p>

              {/* OAuth providers use Clerk.Connection */}
              <Clerk.Connection name='google' asChild>
                <Button className='w-full flex gap-2' variant={'outline'}><Clerk.Icon className='h-4' />  Signin with Google</Button>
              </Clerk.Connection>

              <Clerk.Connection name='github' asChild>
                <Button className='w-full flex gap-2' variant={'outline'}> <Clerk.Icon className=' brightness-45' />Signin with GitHub</Button>
              </Clerk.Connection>

              {/* SignIn.SupportedStrategy is only for email_code, password, etc. */}
              <SignIn.SupportedStrategy name='email_code' asChild>
                <Button variant='outline' className='w-full'>
                  Continue with Email Code
                </Button>
              </SignIn.SupportedStrategy>

              <SignIn.Action navigate='previous' asChild>
                <Button variant='ghost' className='text-card-foreground/50'>Back</Button>
              </SignIn.Action>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  )
}