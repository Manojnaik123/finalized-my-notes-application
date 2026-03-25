'use client'

import Footer from '@/components/app/dashboard/footer'
import { Spinner } from '@/components/ui/spinner'
import { usePublicNote } from '@/hooks/use-public-note'
import { editorStyle } from '@/lib/rich-text-related-data/rich-text-editor'
import { FileX } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const PublicNote = () => {
    const { noteId } = useParams()

    const { data: note, isLoading, error } = usePublicNote(String(noteId))

    return (
        <div className='w-full min-h-screen bg-background flex flex-col justify-between items-center'>
            
            {/* Top Bar */}
            <div className='bg-background text-foreground fixed top-0 left-0 right-0 h-14 w-full border-b
                            flex justify-between items-center p-4'>
                <span className='font-semibold'>[ Notes Lab ]</span>
                <span className='text-foreground/50 text-sm'>
                    Made with NotesLab
                </span>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className='w-full flex-1 flex justify-center items-center'>
                    <Spinner />
                </div>

            ) : error ? (
                // ❌ ERROR STATE
                <div className='w-full flex-1 flex flex-col justify-center items-center gap-4 text-center px-6'>
                    <FileX className='h-12 w-12 text-muted-foreground' />
                    
                    <h2 className='text-xl font-semibold'>
                        Note not found
                    </h2>

                    <p className='text-sm text-muted-foreground max-w-md'>
                        This note may be private, deleted, or the link is invalid.
                    </p>

                    <Link
                        href="/"
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Go back home
                    </Link>
                </div>

            ) : (
                // ✅ SUCCESS STATE
                <div className='w-full px-6 py-16'>
                    <div
                        className={editorStyle}
                        dangerouslySetInnerHTML={{ __html: note?.content ?? '' }}
                    />
                </div>
            )}

            {/* Footer */}
            <div className='w-full'>
                <Footer />
            </div>
        </div>
    )
}

export default PublicNote