// components/features.tsx
'use client'

import Link from 'next/link'

function MiniEditorMockup() {
  return (
    <div
      className='rounded-[10px] overflow-hidden'
      style={{
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Toolbar */}
      <div className='bg-[#fafafa] border-b border-[#f0f0f0] px-3 py-[6px] flex items-center gap-1.5'>
        <button className='px-[6px] py-[3px] rounded bg-[#0a0a0a] text-white text-[11px] font-bold border-none cursor-default'>B</button>
        <button className='px-[6px] py-[3px] rounded bg-transparent text-[#888] text-[11px] italic border-none cursor-default'>I</button>
        <button className='px-[6px] py-[3px] rounded bg-transparent text-[#888] text-[11px] font-bold border-none cursor-default'>H1</button>
        <div className='w-px h-[14px] bg-[#e5e5e5]' />
        <button className='px-[6px] py-[3px] rounded bg-transparent text-[#888] text-[10px] border-none cursor-default'>&lt;/&gt;</button>
        <button className='px-[6px] py-[3px] rounded bg-transparent text-[#888] text-[12px] border-none cursor-default'>≡</button>
        <button className='px-[6px] py-[3px] rounded bg-transparent text-[#888] text-[12px] border-none cursor-default'>❝</button>
        <div className='w-px h-[14px] bg-[#e5e5e5]' />
        <button className='px-[6px] py-[3px] rounded bg-transparent text-[#888] text-[10px] border-none cursor-default'>⊞</button>
      </div>

      {/* Body */}
      <div className='p-4 bg-white'>
        <div className='text-[14px] font-bold text-[#0a0a0a] mb-[6px]' style={{ letterSpacing: '-0.01em' }}>
          Meeting Notes — Q4 Review
        </div>
        <p className='text-[12px] text-[#666] leading-[1.65] mb-[6px]'>
          Key decisions from today's sync with <strong className='font-semibold text-[#0a0a0a]'>product team</strong>. Action items are <em className='italic'>time-sensitive</em>.
        </p>
        <div
          className='rounded-[5px] px-[10px] py-[6px] font-mono text-[11px] mb-[10px]'
          style={{ background: '#f6f6f7', border: '1px solid #e8e8ea', color: '#7c5ff5' }}
        >
          const deadline = <span style={{ color: '#16a34a' }}>"2026-04-01"</span>;
        </div>
        <ul className='list-none p-0 m-0 space-y-[3px]'>
          <li className='flex items-start gap-2 text-[12px] text-[#555]'>
            <span className='text-[#aaa]'>•</span> Ship v2 editor by end of month
          </li>
          <li className='flex items-start gap-2 text-[12px] text-[#555]'>
            <span className='text-[#aaa]'>•</span> Review sharing permissions
            <span className='inline-block w-[2px] h-[12px] bg-[#0a0a0a] align-middle animate-[blink_1.1s_step-end_infinite]' />
          </li>
        </ul>
      </div>
    </div>
  )
}

function ShareMockup() {
  return (
    <div
      className='rounded-[10px] overflow-hidden bg-white p-4'
      style={{
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Title row */}
      <div className='flex items-center gap-3 mb-[14px]'>
        <div className='w-[34px] h-[34px] rounded-[7px] bg-[#f0f0f0] flex items-center justify-center text-[14px] flex-shrink-0'>
          📄
        </div>
        <div>
          <div className='text-[13.5px] font-semibold text-[#0a0a0a]'>My Research Notes</div>
          <div className='text-[11.5px] text-[#aaa]'>Last edited 2 minutes ago</div>
        </div>
      </div>

      {/* URL row */}
      <div
        className='flex items-center gap-2 rounded-[7px] px-3 py-2 mb-3'
        style={{ background: '#f8f8f8', border: '1px solid #ebebeb' }}
      >
        <span className='flex-1 text-[12px] font-mono text-[#555] overflow-hidden whitespace-nowrap text-ellipsis'>
          noteslab.app/note/abc123
        </span>
        <button className='bg-[#0a0a0a] text-white border-none rounded-[5px] px-[10px] py-[4px] text-[11.5px] font-medium font-sans cursor-pointer whitespace-nowrap'>
          Copy
        </button>
      </div>

      {/* Share icons */}
      <div className='flex gap-2'>
        {['🐦', '💼', '✉️', '🔗'].map((icon) => (
          <div
            key={icon}
            className='w-8 h-8 rounded-[7px] flex items-center justify-center text-[14px] cursor-pointer transition-colors duration-100 hover:bg-[#f5f5f5]'
            style={{ border: '1px solid #e5e5e5' }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  )
}

function OptimisticMockup() {
  return (
    <div
      className='rounded-[10px] bg-white p-4'
      style={{
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div className='flex items-center justify-between mb-3'>
        <span className='text-[13.5px] font-semibold text-[#0a0a0a]'>Daily Standup</span>
        <span
          className='flex items-center gap-[5px] text-[11.5px] font-medium text-[#16a34a] rounded-full px-[10px] py-[3px]'
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            animation: 'fadeInBadge 2.5s ease-in-out infinite',
          }}
        >
          <span className='w-[6px] h-[6px] rounded-full bg-[#16a34a] animate-pulse' />
          Saved
        </span>
      </div>
      <div className='flex flex-col gap-[7px]'>
        <div className='h-2 bg-[#f0f0f0] rounded-full w-full' />
        <div className='h-2 bg-[#f0f0f0] rounded-full w-4/5' />
        <div className='h-2 bg-[#f0f0f0] rounded-full w-11/12' />
        <div className='h-2 bg-[#f0f0f0] rounded-full w-3/5' />
        <div
          className='h-2 rounded-full w-2/5'
          style={{
            background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

function AuthMockup() {
  return (
    <div
      className='rounded-[10px] bg-white p-5'
      style={{
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div className='text-[13.5px] font-bold text-[#0a0a0a] mb-1'>Welcome back</div>
      <div className='text-[12px] text-[#aaa] mb-[14px]'>Sign in to continue to NotesLab</div>

      {/* Google */}
      <button
        className='w-full flex items-center gap-[10px] rounded-[7px] px-3 py-[9px] text-[13px] font-medium text-[#333] bg-white mb-2 cursor-default transition-colors duration-100 hover:bg-[#f8f8f8]'
        style={{ border: '1px solid #e5e5e5', fontFamily: 'inherit' }}
      >
        <svg width='14' height='14' viewBox='0 0 24 24'>
          <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='#4285F4' />
          <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853' />
          <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z' fill='#FBBC05' />
          <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335' />
        </svg>
        Continue with Google
      </button>

      {/* GitHub */}
      <button
        className='w-full flex items-center gap-[10px] rounded-[7px] px-3 py-[9px] text-[13px] font-medium text-[#333] bg-white mb-2 cursor-default transition-colors duration-100 hover:bg-[#f8f8f8]'
        style={{ border: '1px solid #e5e5e5', fontFamily: 'inherit' }}
      >
        <svg width='14' height='14' viewBox='0 0 24 24' fill='#0a0a0a'>
          <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
        </svg>
        Continue with GitHub
      </button>

      {/* Divider */}
      <div className='flex items-center gap-2 my-[10px] text-[11.5px] text-[#ccc]'>
        <div className='flex-1 h-px bg-[#ebebeb]' />
        or
        <div className='flex-1 h-px bg-[#ebebeb]' />
      </div>

      {/* Email row */}
      <div className='flex gap-2'>
        <input
          className='flex-1 rounded-[6px] px-[10px] py-2 text-[12px] text-[#333] outline-none'
          style={{ border: '1px solid #e5e5e5', fontFamily: 'inherit' }}
          placeholder='your@email.com'
          readOnly
        />
        <button
          className='bg-[#0a0a0a] text-white border-none rounded-[6px] px-[14px] py-2 text-[12px] font-medium cursor-pointer'
          style={{ fontFamily: 'inherit' }}
        >
          →
        </button>
      </div>
    </div>
  )
}

interface FeatureCellProps {
  mockup: React.ReactNode
  label: string
  desc: string
  href?: string
}

function FeatureCell({ mockup, label, desc, href = '#' }: FeatureCellProps) {
  return (
    <div className='bg-white p-[44px_40px] flex flex-col'>
      <div className='mb-7'>{mockup}</div>
      <div className='text-[19px] font-bold text-[#0a0a0a] mb-2' style={{ letterSpacing: '-0.02em' }}>
        {label}
      </div>
      <div className='text-[14px] text-[#777] leading-[1.6] max-w-[340px]'>{desc}</div>
      <Link
        href={href}
        className='inline-flex items-center gap-1 text-[13px] text-[#aaa] no-underline mt-3 hover:text-[#0a0a0a] transition-colors duration-150'
      >
        Learn more <span>→</span>
      </Link>
    </div>
  )
}

export function Features() {
  return (
    <section id='features' className='py-24 px-6 md:px-12'>
      {/* Section Header */}
      <div className='text-center max-w-[1200px] mx-auto mb-14'>
        <div className='inline-flex items-center gap-1.5 border border-[#e5e5e5] rounded-full px-3 py-1 text-[12.5px] font-mono text-[#555] bg-white mb-5'>
          ✦ Everything you need
        </div>
        <h2
          className='text-[40px] font-extrabold text-[#0a0a0a] mb-2 leading-[1.1]'
          style={{ letterSpacing: '-0.035em' }}
        >
          Built for serious note-takers
        </h2>
        <p className='text-[16px] text-[#777] font-normal'>
          Every feature designed to get out of your way and let you think.
        </p>
      </div>

      {/* Bento Grid */}
      <div className='max-w-[1200px] mx-auto'>
        <div
          className='grid grid-cols-1 md:grid-cols-2 rounded-[16px] overflow-hidden'
          style={{ gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}
        >
          <FeatureCell
            mockup={<MiniEditorMockup />}
            label='Rich text editor'
            desc='Full markdown support, code blocks, tables, and embeds. Write anything, beautifully.'
          />
          <FeatureCell
            mockup={<ShareMockup />}
            label='Share with one click'
            desc='Generate a public link for any note. Share knowledge instantly — no account required to view.'
          />
          <FeatureCell
            mockup={<OptimisticMockup />}
            label='Feels instant, always'
            desc='No spinners. No lag. Changes reflect immediately as you type — synced silently in the background.'
          />
          <FeatureCell
            mockup={<AuthMockup />}
            label='Sign in your way'
            desc='Google, GitHub, or email OTP. No passwords. No friction. Just write.'
          />
        </div>
      </div>

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeInBadge {
          0%, 100% { opacity: 1; }
          45% { opacity: 1; }
          55% { opacity: 0.3; }
          65% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}