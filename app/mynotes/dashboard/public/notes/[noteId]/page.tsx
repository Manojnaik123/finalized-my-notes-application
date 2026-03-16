'use client'

import Footer from '@/components/app/dashboard/footer'
import { usePublicNote } from '@/hooks/use-public-note'
import { editorStyle } from '@/lib/rich-text-related-data/rich-text-editor'
import { FileX } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const PublicNote = () => {
    const { noteId } = useParams()
    const htmlText = ' <h1>Brand Identity Framework</h1><p>A strong brand identity is the foundation of every successful company. It encompasses the visual elements, tone of voice, and core values that define how a business presents itself to the world.</p><h2>Visual Identity</h2><p>The visual identity includes the logo, color palette, typography, and imagery style. Each element must work harmoniously to create a <strong>cohesive and recognizable brand</strong>.</p><h3>Color Psychology</h3><p>Colors evoke emotions and associations. <mark>Blue conveys trust and reliability</mark>, while red signals urgency and passion. Green is associated with nature and growth, and purple suggests luxury and creativity.</p><ul><li><p>Primary colors should dominate all marketing materials</p></li><li><p>Secondary colors provide contrast and variety</p></li><li><p>Accent colors draw attention to key elements</p></li></ul><h2>Typography Standards</h2><p>Typography is often overlooked but plays a crucial role in brand perception. The fonts you choose communicate personality before a single word is read.</p><blockquote><p>Typography is the voice of your brand in visual form. Choose wisely and consistently.</p></blockquote><p>For digital applications, <strong>Inter</strong> and <strong>Poppins</strong> are excellent choices due to their readability across screen sizes. For print, serif fonts like <em>Playfair Display</em> add elegance and authority.</p><h2>Brand Voice</h2><p>Beyond visuals, your brand voice defines how you communicate. Are you formal or casual? Technical or accessible? Serious or playful? These decisions shape every piece of content you produce.</p><ol><li><p>Define your core personality traits</p></li><li><p>Document tone guidelines for different contexts</p></li><li><p>Train all team members on voice consistency</p></li></ol><h2>Implementation</h2><p>Implementing brand guidelines requires discipline and consistency. <s>Old approach: hope teams follow guidelines.</s> <mark>New approach: build systems that make consistency effortless.lessless</mark></p>'

    const { data: note, isLoading, error } = usePublicNote(String(noteId))

    console.log(note);
    

    return (
        <div className='w-full min-h-screen bg-background flex flex-col justify-center items-center'>
            <div className='bg-background text-foreground fixed top-0 left-0 right-0 h-14 w-full border-b
                            flex justify-between items-center p-4'>
                <span className='font-semibold'>
                    [ Notes Lab ]
                </span>
                <span className='text-foreground/50 text-sm'>
                    Made with NotesLab
                </span>
            </div>

            {/* {(!note || error) && (
                <div className="w-full flex flex-col items-center justify-center h-screen bg-background text-white gap-4">
                    <FileX className="h-12 w-12 text-neutral-600" />
                    <div className="text-center space-y-1">
                        <h1 className="text-xl font-semibold">Note not found</h1>
                        <p className="text-sm text-neutral-500">
                            This note doesn't exist or is not publicly accessible.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors mt-2"
                    >
                        Go to NotesLab →
                    </Link>
                </div>
            )} */}


            {/* {(note && !error) && ( */}
                <div className='w-full px-6 py-16'>
                    <div
                        className={editorStyle}
                        dangerouslySetInnerHTML={{ __html: note?.content ?? '' }}
                    />
                </div>
            {/* )} */}

            <div className='w-full'>
                <Footer />
            </div>
        </div>
    )
}

export default PublicNote