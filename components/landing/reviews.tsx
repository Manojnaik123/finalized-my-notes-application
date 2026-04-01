// components/reviews.tsx
'use client'

export function Reviews() {
  const reviews = [
    {
      initials: 'AJ',
      name: 'Alex J.',
      role: 'Senior Engineer, Stripe',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      text: 'The code block support is incredible. I use it for all my technical documentation now — the syntax highlighting makes it actually readable.',
    },
    {
      initials: 'MP',
      name: 'Maya P.',
      role: 'Researcher, MIT',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      text: 'Sharing notes with colleagues used to be a pain. Now I just hit Share and send the link. They don\'t even need an account to read it.',
    },
    {
      initials: 'TR',
      name: 'Tom R.',
      role: 'Indie Hacker',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      text: 'I switched from Notion and never looked back. Faster, simpler, and the optimistic UI makes it feel like a local app even when it\'s syncing.',
    },
  ]

  return (
    <section
      id='reviews'
      className='border-t border-[#f5f5f5] py-24 px-6 md:px-12'
    >
      <div className='max-w-[1200px] mx-auto'>

        {/* Section Header */}
        <div className='text-center mb-14'>
          <div className='inline-flex items-center gap-1.5 border border-[#e5e5e5] rounded-full px-3 py-1 text-[12.5px] font-mono text-[#555] bg-white mb-5'>
            ✦ Loved by writers
          </div>
          <h2
            className='text-[40px] font-extrabold text-[#0a0a0a] leading-[1.1]'
            style={{ letterSpacing: '-0.035em' }}
          >
            Don't take our word for it
          </h2>
        </div>

        {/* Featured Review */}
        <div className='text-center pb-16 mb-16 border-b border-[#f0f0f0]'>
          {/* Opening quote mark */}
          <span
            className='block leading-none mb-[-16px] select-none'
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '72px',
              color: '#e5e5e5',
            }}
          >
            "
          </span>

          <p
            className='text-[26px] text-[#0a0a0a] leading-[1.55] max-w-[680px] mx-auto mb-8 font-normal'
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}
          >
            NotesLab changed how I take research notes. The editor is fast,
            the sharing is seamless, and the auth just works — no friction anywhere.
          </p>

          {/* Author */}
          <div className='flex items-center justify-center gap-3'>
            <div
              className='w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0'
              style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
            >
              SK
            </div>
            <div className='text-left'>
              <div className='text-[14px] font-semibold text-[#0a0a0a]'>Sarah K.</div>
              <div className='text-[12.5px] text-[#aaa]'>Product Designer, Vercel</div>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {reviews.map((review) => (
            <div
              key={review.name}
              className='rounded-[12px] p-[22px] bg-white transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] cursor-default'
              style={{ border: '1px solid #e8e8e8' }}
            >
              {/* Top row */}
              <div className='flex items-center gap-[10px] mb-[14px]'>
                <div
                  className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0'
                  style={{ background: review.gradient }}
                >
                  {review.initials}
                </div>
                <div>
                  <div className='text-[13.5px] font-semibold text-[#0a0a0a]'>
                    {review.name}
                  </div>
                  <div className='text-[12px] text-[#aaa]'>{review.role}</div>
                </div>
              </div>

              {/* Stars */}
              <div className='flex gap-[2px] mb-[10px]'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className='text-[13px]' style={{ color: '#f59e0b' }}>★</span>
                ))}
              </div>

              {/* Review text */}
              <p className='text-[13.5px] text-[#555] leading-[1.65]'>
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}