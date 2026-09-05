import { CONCEPT_LABEL, CONCEPT_NOTICE } from '../lib/constants'
import Badge from './ui/Badge'

/** Visible "concept / demo installation" disclosure used across the site. */
export default function ConceptNotice({ compact = false }) {
  if (compact) {
    return <Badge tone="muted">{CONCEPT_LABEL}</Badge>
  }
  return (
    <div className="border border-ink-line bg-ink-card/60 px-4 py-3 text-xs leading-relaxed text-steel">
      <span className="font-heading font-semibold uppercase tracking-widest text-slate-300">
        {CONCEPT_LABEL}
      </span>{' '}
      — {CONCEPT_NOTICE}
    </div>
  )
}
