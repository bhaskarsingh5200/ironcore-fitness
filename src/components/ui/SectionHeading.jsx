import { cn } from '../../lib/utils'
import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow', align === 'center' && 'justify-center')}>
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-balance font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  )
}
