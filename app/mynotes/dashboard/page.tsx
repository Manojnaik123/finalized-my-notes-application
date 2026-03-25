'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDefaultLibrary } from '@/hooks/use-libraries'

const DashboardPage = () => {
    const { defaultLibrary, isLoading, error } = useDefaultLibrary()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && defaultLibrary?.id) {
            console.log('Redirecting to:', defaultLibrary)
            router.push(`/mynotes/dashboard/${defaultLibrary.id}`)
        }
    }, [defaultLibrary, isLoading, router])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!defaultLibrary) return <div>No default library found</div>

    return <></>
}

export default DashboardPage