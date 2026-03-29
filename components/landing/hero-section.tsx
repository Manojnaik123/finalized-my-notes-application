// components/hero.tsx
'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className='relative overflow-hidden pt-[136px] pb-0 px-12 text-center min-h-[780px]'>

      {/* Grid Background */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      {/* Warm Glow */}
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none'
        style={{
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,180,100,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className='relative z-10'>

        {/* Badge */}
        <div className='inline-flex items-center gap-[7px] border border-[#e5e5e5] rounded-full px-3 py-1 pl-[5px] text-[12.5px] font-mono text-[#444] bg-white mb-7'>
          <span className='w-5 h-5 rounded-[5px] bg-[#0a0a0a] text-white flex items-center justify-center text-[10px]'>
            ✦
          </span>
          Rich Text Notes
        </div>

        {/* Headline */}
        <h1
          className='text-[58px] font-extrabold text-[#0a0a0a] max-w-[720px] mx-auto mb-5 leading-[1.08]'
          style={{ letterSpacing: '-0.04em' }}
        >
          Notes that think<br />as fast as you do
        </h1>

        {/* Subtext */}
        <p className='text-[17px] text-[#666] leading-[1.65] max-w-[500px] mx-auto mb-9 font-normal'>
          A distraction-free writing space with a powerful rich text editor,
          shareable notes, and lightning-fast sync.
        </p>

        {/* Buttons */}
        <div className='flex items-center justify-center gap-[10px] mb-14'>
          <Link
            href='/sign-up'
            className='inline-flex items-center gap-1.5 bg-[#0a0a0a] text-white text-sm font-medium px-[22px] py-[11px] rounded-lg hover:opacity-80 transition-opacity duration-150 no-underline'
          >
            Start for free
            <span className='opacity-60'>→</span>
          </Link>
          <Link
            href='#features'
            className='inline-flex items-center gap-1.5 bg-white text-[#0a0a0a] text-sm font-medium px-[22px] py-[11px] rounded-lg border border-[#d1d1d1] hover:border-[#aaa] transition-colors duration-150 no-underline'
          >
            See how it works
          </Link>
        </div>

        {/* Editor Card */}
        <div className='relative max-w-[660px] mx-auto'>
          <div
            className='bg-white rounded-[14px] overflow-hidden text-left relative'
            style={{
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.05)',
            }}
          >

            {/* Browser Chrome */}
            <div className='bg-[#fafafa] border-b border-[#f0f0f0] px-[14px] py-[10px] flex items-center gap-2'>
              <div className='flex gap-[5px]'>
                <div className='w-[10px] h-[10px] rounded-full bg-[#ff5f57]' />
                <div className='w-[10px] h-[10px] rounded-full bg-[#febc2e]' />
                <div className='w-[10px] h-[10px] rounded-full bg-[#28c840]' />
              </div>
              <span className='text-[12px] text-[#999] font-mono mx-auto pr-[60px]'>
                noteslab.app / my-research-notes
              </span>
            </div>

            {/* Toolbar */}
            <div className='border-b border-[#f0f0f0] px-4 py-2 flex items-center gap-0.5'>
              {[
                { label: 'B', style: 'font-bold', active: true },
                { label: 'I', style: 'italic' },
                { label: 'U', style: 'underline' },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className={`px-[7px] py-1 rounded-[5px] border-none text-[12px] font-semibold min-w-[28px] h-[26px] flex items-center justify-center cursor-pointer transition-colors duration-100
                    ${btn.active ? 'bg-[#0a0a0a] text-white' : 'bg-transparent text-[#666] hover:bg-[#f0f0f0] hover:text-[#0a0a0a]'}`}
                >
                  <span className={btn.style}>{btn.label}</span>
                </button>
              ))}

              <div className='w-px h-[18px] bg-[#e5e5e5] mx-1' />

              {['H1', 'H2'].map((btn) => (
                <button
                  key={btn}
                  className='px-[7px] py-1 rounded-[5px] border-none bg-transparent text-[11px] font-bold text-[#666] min-w-[28px] h-[26px] flex items-center justify-center cursor-pointer hover:bg-[#f0f0f0] hover:text-[#0a0a0a] transition-colors duration-100'
                >
                  {btn}
                </button>
              ))}

              <div className='w-px h-[18px] bg-[#e5e5e5] mx-1' />

              {['</>', '≡', '❝', '⊞', '🔗'].map((btn) => (
                <button
                  key={btn}
                  className='px-[7px] py-1 rounded-[5px] border-none bg-transparent text-[11px] text-[#666] min-w-[28px] h-[26px] flex items-center justify-center cursor-pointer hover:bg-[#f0f0f0] hover:text-[#0a0a0a] transition-colors duration-100'
                >
                  {btn}
                </button>
              ))}

              <div className='ml-auto'>
                <button className='px-[7px] py-1 rounded-[5px] border-none bg-transparent text-[11px] text-[#aaa] h-[26px] flex items-center cursor-pointer hover:text-[#0a0a0a] transition-colors duration-100'>
                  Share ↗
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className='px-6 pt-5 pb-6 min-h-[220px]'>
              <h2
                className='text-[20px] font-bold text-[#0a0a0a] mb-[10px]'
                style={{ letterSpacing: '-0.02em' }}
              >
                My Research Notes
              </h2>
              <p className='text-[13.5px] text-[#444] leading-[1.7] mb-3'>
                The key insight from today's reading is that{' '}
                <strong className='font-bold text-[#0a0a0a]'>distributed systems</strong>{' '}
                require careful handling of{' '}
                <em className='italic text-[#555]'>eventual consistency</em>.
                When nodes diverge, the reconciliation strategy determines user experience.
              </p>

              {/* Code Block */}
              <div
                className='bg-[#f6f6f7] rounded-[7px] px-[14px] py-[10px] mb-3 font-mono text-[12px] leading-[1.6]'
                style={{ border: '1px solid #e8e8ea' }}
              >
                <span className='text-[#7c5ff5]'>const</span>{' '}
                note ={' '}
                <span className='text-[#0070f3]'>createNote</span>
                {'({'}<br />
                &nbsp;&nbsp;title:{' '}
                <span className='text-[#16a34a]'>"Research Notes"</span>,<br />
                &nbsp;&nbsp;shared:{' '}
                <span className='text-[#7c5ff5]'>true</span>,
                optimistic:{' '}
                <span className='text-[#7c5ff5]'>true</span><br />
                {'});'}
              </div>

              {/* Bullet List */}
              <ul className='list-none p-0 m-0'>
                <li className='flex items-start gap-2 text-[13.5px] text-[#444] leading-[1.8]'>
                  <span className='text-[#999] mt-0.5'>•</span>
                  Real-time collaboration without conflicts
                </li>
                <li className='flex items-start gap-2 text-[13.5px] text-[#444] leading-[1.8]'>
                  <span className='text-[#999] mt-0.5'>•</span>
                  Instant local updates — synced in background
                  <span className='inline-block w-[2px] h-[14px] bg-[#0a0a0a] align-middle ml-px animate-[blink_1.1s_step-end_infinite]' />
                </li>
              </ul>
            </div>

            {/* Status Bar */}
            <div className='border-t border-[#f0f0f0] px-4 py-2 flex items-center justify-between'>
              <div className='flex items-center gap-[5px] text-[11.5px] text-[#16a34a] font-mono'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse' />
                Saved
              </div>
              <span className='text-[11.5px] text-[#aaa] font-mono'>247 words · 4 min read</span>
            </div>

            {/* Bottom Fade */}
            <div
              className='absolute bottom-0 left-0 right-0 h-20 pointer-events-none rounded-b-[14px]'
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }}
            />

          </div>
        </div>
      </div>
    </section>
  )
}