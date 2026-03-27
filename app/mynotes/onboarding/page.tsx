'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const OnboardingPage = () => {
  const { user } = useUser()
  const router = useRouter()

  const handleContinue = async () => {
    try {
      await user?.update({
        unsafeMetadata: {
          onboardingCompleted: true,
        },
      })

      // 🔥 force refresh user data
      await user?.reload()

      router.replace('/mynotes/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 text-center">

        {/* 👋 Welcome */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">
            Welcome, {user?.firstName || 'there'} 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Let’s get you familiar with your workspace
          </p>
        </div>

        {/* 🧠 Message Card */}
        <div className="border rounded-2xl p-8 bg-card space-y-6 text-left">

          <p className="text-base leading-relaxed">
            We’ve set up a sample workspace for you so you can explore how everything works without starting from scratch.
          </p>

          <p className="text-base leading-relaxed">
            Inside your dashboard, you’ll find pre-created libraries, folders, and notes to give you a clear idea of how to organize your thoughts effectively.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">How it works:</h3>

            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Create libraries to group your ideas</li>
              <li>Add folders to structure your content</li>
              <li>Write and manage notes effortlessly</li>
              <li>Keep everything organized in one place</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Once you’re comfortable, you can start creating your own content anytime.
          </p>
        </div>

        {/* 🚀 CTA */}
        <Button
          onClick={handleContinue}
          className="w-full h-11 text-base"
        >
          Go to Dashboard →
        </Button>

      </div>
    </div>
  )
}

export default OnboardingPage