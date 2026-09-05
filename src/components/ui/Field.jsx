import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Accessible form field: label + input/select/textarea + error message.
 * Forwarded props and the ref land on the control (`as` selects the tag).
 * forwardRef is required so React Hook Form's register() ref reaches the
 * real input element.
 */
const Field = forwardRef(function Field({ label, error, as = 'input', className, hint, id, ...props }, ref) {
  const Tag = as
  const inputId = id || props.name
  const base = 'field-input disabled:cursor-not-allowed disabled:opacity-60'
  const errorClasses = error ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/30' : ''

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <Tag id={inputId} ref={ref} className={cn(base, errorClasses)} aria-invalid={Boolean(error)} {...props} />
      {error ? (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  )
})

export default Field