import { useState } from 'react'
import { cn } from '../../lib/utils'

const FALLBACK_GRADIENT =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1118"/><stop offset="1" stop-color="#101923"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><rect x="20" y="20" width="760" height="560" fill="none" stroke="#1B2634" stroke-width="2"/></svg>`,
  )

/**
 * Lazy image with fixed dimensions, aspect handling and a branded
 * gradient fallback so a broken URL never renders as a broken icon.
 */
export default function Image({
  src,
  alt = '',
  className,
  imgClassName,
  aspect = 'aspect-[4/3]',
  eager = false,
  ...props
}) {
  const [failed, setFailed] = useState(false)
  const [fallback, setFallback] = useState(FALLBACK_GRADIENT)

  return (
    <div className={cn('overflow-hidden', aspect, className)} {...props}>
      <img
        src={failed ? fallback : src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => {
          if (!failed) {
            setFailed(true)
            setFallback(FALLBACK_GRADIENT)
          }
        }}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}
