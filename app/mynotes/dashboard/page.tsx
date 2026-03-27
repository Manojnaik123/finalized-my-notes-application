'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDefaultLibrary } from '@/hooks/use-libraries'
import { useUser } from '@clerk/nextjs'

const quotes = [
    { text: "Your notes are your second brain.", author: "Tiago Forte" },
    { text: "Write it down before you forget it.", author: "Unknown" },
    { text: "Clarity comes from capturing thoughts.", author: "David Allen" },
    { text: "Small notes today, big ideas tomorrow.", author: "Unknown" },
    { text: "Organized notes = organized mind.", author: "Unknown" },
    { text: "If it's not written, it doesn't exist.", author: "Unknown" },
    { text: "Great ideas start as messy notes.", author: "Unknown" },
    { text: "The faintest ink is more powerful than the strongest memory.", author: "Chinese Proverb" },
    { text: "A short pencil is better than a long memory.", author: "Unknown" },
    { text: "Writing is thinking on paper.", author: "William Zinsser" },
    { text: "Notes are the seeds of future masterpieces.", author: "Unknown" },
    { text: "Capture everything, regret nothing.", author: "Unknown" },
    { text: "One idea written down is worth a thousand in your head.", author: "Unknown" },
    { text: "The palest ink outlasts the strongest memory.", author: "Unknown" },
    { text: "Knowledge is only potential power until it is organized.", author: "Napoleon Hill" },
    { text: "To understand is to perceive patterns.", author: "Isaiah Berlin" },
    { text: "An idea not written down is an idea lost.", author: "Unknown" },
    { text: "Take notes. Change your life.", author: "Unknown" },
    { text: "Your future self will thank you for writing it down.", author: "Unknown" },
    { text: "Every expert was once a beginner with a notebook.", author: "Unknown" },
]

const DashboardPage = () => {
    const [quote, setQuote] = React.useState(quotes[Math.floor(Math.random() * 20)])
    const { defaultLibrary, isLoading, error } = useDefaultLibrary()
    const { user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        // ⛔ wait for EVERYTHING
        if (!isLoaded || isLoading) return

        const onboardingCompleted = user?.unsafeMetadata?.onboardingCompleted

        // ✅ ONLY redirect if explicitly false or missing
        if (onboardingCompleted !== true) {
            router.replace('/mynotes/onboarding')
            return
        }

        // ✅ Safe dashboard redirect
        if (defaultLibrary?.id) {
            router.replace(`/mynotes/dashboard/${defaultLibrary.id}`)
        }

    }, [isLoaded, isLoading, user, defaultLibrary, router])

    useEffect(() => {
        const pickRandom = () =>
            quotes[Math.floor(Math.random() * quotes.length)]

        setQuote(pickRandom())

        const interval = setInterval(() => {
            setQuote(pickRandom())
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    if (isLoading || !isLoaded) {
        return (
            <div className="flex h-[80vh] flex-col items-center justify-center text-center px-4">
                <p className="text-lg italic font-medium transition-all duration-500 ease-in-out">
                    “{quote.text}”
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    — {quote.author}
                </p>

                <div className="mt-4 h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            </div>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    return null
}

export default DashboardPage