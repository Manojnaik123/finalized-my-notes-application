// components/logo.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'default' | 'lg'
  href?: string
  className?: string
}

const sizeMap = {
  sm: {
    bracket: 'text-sm font-light',
    text: 'text-xs tracking-[0.12em]',
  },
  default: {
    bracket: 'text-lg font-light',
    text: 'text-sm tracking-[0.12em]',
  },
  lg: {
    bracket: 'text-2xl font-light',
    text: 'text-xl tracking-[0.14em]',
  },
}

export function Logo({ size = 'default', href = '/', className }: LogoProps) {
  const s = sizeMap[size]

  const inner = (
    <span className={cn('inline-flex items-center gap-1.5 font-mono select-none', className)}>
      <span className={cn(s.bracket, 'text-muted-foreground transition-colors duration-200 group-hover:text-foreground')}>
        [
      </span>
      <span className={cn(s.text, 'font-medium uppercase tracking-widest text-foreground')}>
        NotesLab
      </span>
      <span className={cn(s.bracket, 'text-muted-foreground transition-colors duration-200 group-hover:text-foreground')}>
        ]
      </span>
    </span>
  )

  return (
    <Link href={href} className='group'>
      {inner}
    </Link>
  )
}