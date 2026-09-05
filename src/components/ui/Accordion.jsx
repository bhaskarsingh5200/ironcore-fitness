import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Accessible accordion item used by the FAQ section.
 */
export function AccordionItem({ question, answer, open, onToggle, index }) {
  const reduce = useReducedMotion()
  const panelId = `accordion-panel-${index}`
  const buttonId = `accordion-button-${index}`

  return (
    <div className="card-surface overflow-hidden">
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-card',
            open && 'bg-ink-card',
          )}
        >
          <span className="font-heading text-sm font-semibold text-white sm:text-base">
            {question}
          </span>
          <ChevronDown
            size={18}
            className={cn('shrink-0 text-accent transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-steel sm:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Controlled accordion — only one item open at a time.
 */
export default function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.id || item.question}
          index={i}
          question={item.question}
          answer={item.answer}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
