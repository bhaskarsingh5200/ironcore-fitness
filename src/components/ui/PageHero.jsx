import { motion, useReducedMotion } from 'framer-motion'

/** Interior page hero with eyebrow + title + optional subtitle. */
export default function PageHero({ eyebrow, title, subtitle }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden border-b border-ink-line pb-14 pt-32 md:pb-20 md:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-faint [background-size:56px_56px] opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-blue-glow blur-3xl"
      />
      <div className="container-x relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.65, 0.35, 1] }}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-heading text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
