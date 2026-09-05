import { cn } from '../../lib/utils'

export default function Spinner({ className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white',
        className,
      )}
    />
  )
}
