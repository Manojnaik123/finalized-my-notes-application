// components/navbar.tsx
'use client'

import Link from 'next/link'

export function Navbar() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 md:px-12 bg-white/85 backdrop-blur-md border-b border-black/[0.07]'>
      
      {/* Logo */}
      <Link href='/' className='font-mono text-base font-medium text-[#0a0a0a] tracking-tight no-underline'>
        <span className='text-black/30 font-light'>[</span>
        {' '}NotesLab{' '}
        <span className='text-black/30 font-light'>]</span>
      </Link>

      {/* Nav Links */}
      <ul className='items-center gap-8 list-none hidden md:flex'>
        <li><Link href='#features' className='text-sm text-[#555] hover:text-[#0a0a0a] transition-colors duration-150 no-underline'>Features</Link></li>
        <li><Link href='#reviews' className='text-sm text-[#555] hover:text-[#0a0a0a] transition-colors duration-150 no-underline'>Reviews</Link></li>
        <li><Link href='#pricing' className='text-sm text-[#555] hover:text-[#0a0a0a] transition-colors duration-150 no-underline'>Pricing</Link></li>
        <li><Link href='#docs' className='text-sm text-[#555] hover:text-[#0a0a0a] transition-colors duration-150 no-underline'>Docs</Link></li>
      </ul>

      {/* CTA */}
      <Link
        href='/sign-up'
        className='bg-[#0a0a0a] text-white text-[13.5px] font-medium px-4 py-2 rounded-[7px] hover:opacity-85 transition-opacity duration-150 no-underline'
      >
        Get Started
      </Link>

    </nav>
  )
}