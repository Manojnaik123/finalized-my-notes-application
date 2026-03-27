'use client'

import { UserProfile } from "@clerk/nextjs"

export default function UserProfilePage() {
  return (
    <div className="flex justify-center p-6">
      <UserProfile />
    </div>
  )
}