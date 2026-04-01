// components/footer.tsx
'use client'

import Link from 'next/link'

function GitHubIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  )
}

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Editor', href: '#' },
      { label: 'Sharing', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className='bg-[#0a0a0a]'>

      {/* Dark CTA */}
      <div
        className='relative overflow-hidden text-center px-6 md:px-12 py-24'
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {/* Subtle dark glow */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 100%)',
          }}
        />

        <div className='relative z-10 max-w-[640px] mx-auto'>
          <h2
            className='text-[48px] font-extrabold text-white leading-[1.08] mb-4'
            style={{ letterSpacing: '-0.04em' }}
          >
            Start writing.<br />It's free.
          </h2>
          <p className='text-[16px] text-[#555] mb-9'>
            No credit card. No setup. Just open and write.
          </p>

          {/* Buttons */}
          <div className='flex items-center justify-center gap-[10px] mb-9'>
            <Link
              href='/sign-up'
              className='inline-flex items-center gap-1.5 bg-white text-[#0a0a0a] text-[14px] font-medium px-[22px] py-[11px] rounded-[8px] no-underline transition-opacity duration-150 hover:opacity-90'
            >
              Start for free
            </Link>
            <Link
              href='https://github.com'
              className='inline-flex items-center gap-2 bg-transparent text-white text-[14px] font-medium px-[22px] py-[11px] rounded-[8px] no-underline transition-colors duration-150 hover:border-[#555]'
              style={{ border: '1px solid #333' }}
            >
              <GitHubIcon />
              View on GitHub
            </Link>
          </div>

          {/* Rating badges */}
          <div className='flex items-center justify-center gap-6'>
            {[
              { label: 'G', bg: '#ff6154', score: '4.9' },
              { label: 'P', bg: '#da552f', score: '5.0' },
              { label: 'A', bg: '#0070f3', score: '4.8' },
            ].map((r) => (
              <div key={r.label} className='flex items-center gap-[6px]'>
                <div
                  className='w-[22px] h-[22px] rounded-[5px] flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0'
                  style={{ background: r.bg }}
                >
                  {r.label}
                </div>
                <div className='flex gap-[1px]'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className='text-[11px]'
                      style={{ color: i < 4 || r.score === '5.0' ? '#f59e0b' : '#333' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className='text-[12px] text-[#555] font-mono'>{r.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arch divider — white concave shape */}
      <div className='relative h-[48px] bg-[#0a0a0a] overflow-hidden'>
        <div
          className='absolute bottom-0 left-[5%] right-[5%] h-[96px] bg-[#111]'
          style={{ borderRadius: '50%' }}
        />
      </div>

      {/* Footer body */}
      <div
        className='px-6 md:px-12 pt-14 pb-8'
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        <div className='max-w-[1200px] mx-auto'>

          {/* Top: brand + link columns */}
          <div className='grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-12'>

            {/* Brand */}
            <div className='col-span-2 md:col-span-1'>
              <div className='font-mono text-[15px] font-medium text-white mb-[10px]'>
                <span className='text-white/25 font-light'>[</span>
                {' '}NotesLab{' '}
                <span className='text-white/25 font-light'>]</span>
              </div>
              <p className='text-[13px] text-[#555] leading-[1.65] max-w-[220px]'>
                The modern note-taking app for thinkers, researchers, and makers.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <div
                  className='text-[11.5px] font-semibold text-white mb-[14px]'
                  style={{ textTransform: 'uppercase', letterSpacing: '0.07em' }}
                >
                  {col.title}
                </div>
                <ul className='list-none p-0 m-0'>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className='text-[13px] text-[#555] no-underline leading-[2.2] block transition-colors duration-150 hover:text-white'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className='border-t border-[#1a1a1a] mb-6' />

          {/* Bottom bar */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <span className='text-[12.5px] text-[#444] font-mono'>
              © 2026 NotesLab, Inc.
            </span>

            <div className='flex items-center gap-4'>
              <Link
                href='https://github.com'
                className='text-[#444] no-underline flex items-center transition-colors duration-150 hover:text-white'
                title='GitHub'
              >
                <GitHubIcon />
              </Link>
              <Link
                href='https://x.com'
                className='text-[#444] no-underline flex items-center transition-colors duration-150 hover:text-white'
                title='X / Twitter'
              >
                <XIcon />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}