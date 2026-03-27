'use client'

import { AlertDialogForDeletion } from '@/components/app/conformation/delete-item-conformation'
import Footer from '@/components/app/dashboard/footer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TOAST_POSITION } from '@/lib/query-keys/query-keyx'
import { useUser } from '@clerk/nextjs'
import { LogOut, Settings } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const LibraryPage = () => {

    const [isDeleteConformationDialogOpen, setIsDeleteConformationDialogOpen] = useState(false)

    const { user } = useUser()
    const router = useRouter()
    const { libraryId } = useParams()

    const isOAuthUser = user?.externalAccounts?.length ?? 0 > 0

    const handleAccounDeletion = async () => {
        try {
            await user?.delete()
            router.replace('/')
        } catch (err) {
            toast("Can't delete the account right after creating it", { position: TOAST_POSITION })
        }
        // router.push(`/mynotes/dashboard/${libraryId}/user-profile`)
    }

    return (
        <>
            <AlertDialogForDeletion itemName={`Your account`} itemType='account' open={isDeleteConformationDialogOpen} setOpen={setIsDeleteConformationDialogOpen} handleDeletion={handleAccounDeletion} />
            <div className='h-screen overflow-y-auto p-4 '>
                <h1 className='text-2xl font-semibold pb-2'>Settings</h1>
                <p className='text-sm text-foreground/50 mb-8'>Manage your account, appearance and data.</p>
                <span className='text-foreground/50'>PROFILE</span>
                <div className=' bg-card flex flex-col mb-8 mt-2 '>
                    <div className='flex justify-between items-center p-4  gap-2'>
                        <div className='relative w-12 h-12 bg-foreground/20 rounded-md border overflow-hidden'>
                            <Image
                                src={user?.imageUrl ?? '/default-avatar.png'}
                                alt={user?.fullName?.[0] ?? 'P'}
                                fill
                                className='object-cover'
                            />
                        </div>
                        <div className='flex-1 flex justify-start flex-col '>
                            <h1 className='text-lg'>{user?.fullName}</h1>
                            <p className='text-card-foreground/50'>{user?.emailAddresses[0].emailAddress}</p>
                        </div>
                        <div>
                            {!isOAuthUser && (
                                <Button variant={'outline'}>
                                    Edit
                                </Button>
                            )}
                        </div>
                    </div>
                    {!isOAuthUser && (
                        <>
                            <Separator orientation='horizontal' />
                            <div className='flex justify-between items-center p-4'>
                                <div className='flex-1 flex justify-start flex-col '>
                                    <h1 className='text-lg'>Password</h1>
                                    <p className='text-card-foreground/50'>Last changed 3 months ago</p>
                                </div>
                                <div>
                                    <Button variant={'outline'}>
                                        Change
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <span className='text-foreground/50'>ACCOUNT CONTROL</span>
                <div className=' bg-red-400/5 flex flex-col mt-2 '>
                    <div className='flex justify-between items-center p-4 border-b gap-2'>
                        <div className='flex-1 flex justify-start flex-col '>
                            <h1 className='text-lg'>Reset all settings</h1>
                            <p className='text-card-foreground/50'>Reverts all preferences to defaults</p>
                        </div>
                        <div>
                            <Button variant={'outline'}>
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-4'>
                        <div className='flex-1 flex justify-start flex-col '>
                            <h1 className='text-lg'>Delete Account</h1>
                            <p className='text-card-foreground/50'>Permanently removes your account and all notes</p>
                        </div>
                        <div>
                            <Button variant={'outline'} onClick={() => setIsDeleteConformationDialogOpen(true)}>
                                Delete account
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default LibraryPage