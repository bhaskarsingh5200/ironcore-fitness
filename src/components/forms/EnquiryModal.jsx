import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Field from '../ui/Field'
import Button from '../ui/Button'
import { membershipEnquiries } from '../../services/messages'
import { memberships } from '../../services/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import { conceptMemberships } from '../../data/concept'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^[0-9+\-\s()]+$/, 'Enter a valid phone number'),
  plan: z.string().min(1, 'Select a membership plan'),
  start_date: z.string().min(1, 'Choose a preferred start date'),
  message: z.string().optional(),
})

export default function EnquiryModal({ open, onClose, initialPlan = '' }) {
  const [plans, setPlans] = useState([])
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { plan: initialPlan },
  })

  useEffect(() => {
    if (open) {
      setStatus('idle')
      setError('')
      reset({ plan: initialPlan })
      memberships.list().then((rows) => setPlans(rows.length ? rows : conceptMemberships))
    }
  }, [open, initialPlan, reset])

  const onSubmit = async (values) => {
    setStatus('submitting')
    setError('')
    try {
      await membershipEnquiries.create(values)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Membership Enquiry">
      {status === 'success' ? (
        <div className="py-6 text-center">
          <CheckCircle2 size={44} className="mx-auto text-accent-bright" />
          <h3 className="mt-4 font-heading text-xl font-bold text-white">
            Thanks! Your membership enquiry has been received.
          </h3>
          <p className="mt-2 text-sm text-steel">
            {isSupabaseConfigured
              ? 'Our team will get back to you shortly.'
              : 'Concept mode — this enquiry was recorded locally for the demo. Connect Supabase to persist enquiries.'}
          </p>
          <Button className="mt-6" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" placeholder="Your name" {...register('name')} error={errors.name?.message} autoComplete="name" />
            <Field label="Email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} autoComplete="email" />
          </div>
          <Field label="Phone" type="tel" placeholder="+91 90000 00000" {...register('phone')} error={errors.phone?.message} autoComplete="tel" />
          <Field label="Membership Plan" as="select" {...register('plan')} error={errors.plan?.message}>
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.name}>
                {plan.name} — ₹{Number(plan.price).toLocaleString('en-IN')}/month
              </option>
            ))}
          </Field>
          <Field label="Preferred Start Date" type="date" {...register('start_date')} error={errors.start_date?.message} />
          <Field label="Message (optional)" as="textarea" rows={3} placeholder="Tell us about your goals..." {...register('message')} />

          {status === 'error' && (
            <p className="flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-400" role="alert">
              <AlertCircle size={16} /> {error}
            </p>
          )}

          <p className="text-xs text-slate-500">
            Concept installation — no real payment or membership is created.
          </p>

          <Button type="submit" disabled={status === 'submitting'} className="w-full">
            {status === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              'Send Enquiry'
            )}
          </Button>
        </form>
      )}
    </Modal>
  )
}
