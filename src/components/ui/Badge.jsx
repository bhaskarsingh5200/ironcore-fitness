import { cn } from '../../lib/utils'

const tones = {
  accent: 'border-accent/40 bg-accent/10 text-accent-bright',
  muted: 'border-ink-line bg-ink-card text-steel',
  good: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  warn: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  bad: 'border-red-500/40 bg-red-500/10 text-red-400',
}

export default function Badge({ children, tone = 'accent', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
        tones[tone] || tones.accent,
        className,
      )}
    >
      {children}
    </span>
  )
}
