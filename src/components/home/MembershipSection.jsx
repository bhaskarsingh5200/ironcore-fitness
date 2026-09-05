import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import EnquiryModal from '../forms/EnquiryModal'
import { useAsync } from '../../hooks/useAsync'
import { memberships } from '../../services/content'
import { formatPrice } from '../../lib/utils'

export default function MembershipSection({ heading = true, onEnquire }) {
  const { data, loading, error } = useAsync(() => memberships.list(), [])
  const [activePlan, setActivePlan] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const openEnquiry = (planName) => {
    setActivePlan(planName)
    setModalOpen(true)
  }

  const items = data || []

  return (
    <section className="section-pad border-t border-ink-line bg-ink-surface">
      <div className="container-x">
        {heading && (
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title="Choose your membership."
            subtitle="Simple plans with no hidden terms. Upgrade, downgrade, or cancel anytime."
          />
        )}

        {loading && (
          <div className="mt-12 flex justify-center py-16 text-steel">
            <Spinner className="h-6 w-6" />
          </div>
        )}

        {error && (
          <p className="mt-12 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
            Couldn’t load memberships: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {items.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-md border p-7 ${
                    plan.featured
                      ? 'border-accent bg-ink-card shadow-glow-sm'
                      : 'border-ink-line bg-ink-card'
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      <Zap size={12} /> Most Popular
                    </span>
                  )}
                  <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-slate-300">
                    {plan.name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-extrabold tracking-tight text-white">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-sm text-steel">/ {plan.billingPeriod}</span>
                  </p>
                  <p className="mt-3 text-sm text-steel">{plan.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {(plan.features || []).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent-bright" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.featured ? 'primary' : 'ghost'}
                    className="mt-7 w-full"
                    onClick={() => (onEnquire ? onEnquire(plan.name) : openEnquiry(plan.name))}
                  >
                    Enquire Now
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <p className="mt-8 text-center text-xs text-slate-500">
            Concept pricing for demo purposes — no real payments are processed on this project.
          </p>
        </Reveal>
      </div>

      {!onEnquire && (
        <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} initialPlan={activePlan} />
      )}
    </section>
  )
}
