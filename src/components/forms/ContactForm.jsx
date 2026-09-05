import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import Field from '../ui/Field'
import Button from '../ui/Button'
import { contactMessages } from '../../services/messages'
import { CONTACT_METHODS } from '../../lib/constants'
import { isSupabaseConfigured } from '../../lib/supabase'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^[0-9+\-\s()]+$/, 'Enter a valid phone number'),
  goal: z.string().min(2, 'Tell us what you’re working toward'),
  preferred_contact: z.string().min(1, 'Select a contact method'),
  message: z.string().min(5, 'Add a short message'),
})

export default function ContactForm({ compact = false }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { preferred_contact: 'WhatsApp' },
  })

  const onSubmit = async (values) => {
    setStatus('submitting')
    setError('')
    try {
      await contactMessages.create(values)
      setStatus('success')
      reset()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="card-surface flex flex-col items-center px-8 py-12 text-center">
        <CheckCircle2 size={44} className="text-accent-bright" />
        <h3 className="mt-4 font-heading text-xl font-bold text-white">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-steel">
          Thanks for reaching out. We’ll get back to you through your preferred contact method.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? 'space-y-4' : 'space-y-5'} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" placeholder="Your name" {...register('name')} error={errors.name?.message} autoComplete="name" />
        <Field label="Email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} autoComplete="email" />
      </div>
      <Field label="Phone" type="tel" placeholder="+91 90000 00000" {...register('phone')} error={errors.phone?.message} autoComplete="tel" />
      <Field label="Goal" placeholder="e.g. Build strength, lose fat, get fit" {...register('goal')} error={errors.goal?.message} />
      <Field label="Preferred Contact Method" as="select" {...register('preferred_contact')} error={errors.preferred_contact?.message}>
        {CONTACT_METHODS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </Field>
      <Field label="Message" as="textarea" rows={4} placeholder="Tell us a little more..." {...register('message')} error={errors.message?.message} />

      {status === 'error' && (
        <p className="flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-400" role="alert">
          <AlertCircle size={16} /> {error}
        </p>
      )}

      <p className="text-xs text-slate-500">
        {isSupabaseConfigured
          ? 'Your message is stored privately and is only visible to admins.'
          : 'Concept mode — your message is stored locally for the demo. Connect Supabase to persist messages.'}
      </p>

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}
