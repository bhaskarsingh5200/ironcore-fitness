import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

/**
 * Button / link button with consistent brand styling.
 * Variants: primary | ghost | ghostLight
 * Sizes: md | lg | sm
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-heading font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    variant === 'primary' && 'bg-accent text-white hover:bg-accent-bright',
    variant === 'ghost' && 'border border-ink-line bg-transparent text-white hover:border-accent hover:text-accent-bright',
    variant === 'ghostLight' && 'border border-white/15 text-white hover:border-white/40',
    size === 'md' && 'px-6 py-3 text-sm',
    size === 'lg' && 'px-8 py-4 text-sm',
    size === 'sm' && 'px-4 py-2 text-xs',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
