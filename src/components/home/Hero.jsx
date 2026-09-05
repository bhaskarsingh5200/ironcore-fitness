import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import Image from '../ui/Image'
import Badge from '../ui/Badge'
import { IMG } from '../../data/images'
import { CONCEPT_LABEL } from '../../lib/constants'
import { useSettings } from '../../context/SettingsContext'

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.65, 0.35, 1] } },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { settings } = useSettings()

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-faint [background-size:56px_56px] opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[520px] w-[520px] animate-pulse-glow rounded-full bg-blue-glow blur-2xl"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={reduce ? undefined : stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">Premium Fitness Center</Badge>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                {CONCEPT_LABEL}
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-heading text-[40px] font-extrabold uppercase leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[64px] xl:text-[76px]"
          >
            {settings.hero_heading}
            <br />
            <span className="bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
              {settings.hero_highlight}
            </span>{' '}
            {settings.hero_tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-steel sm:text-lg"
          >
            {settings.hero_subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={settings.primary_cta_to}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-bright"
            >
              {settings.primary_cta_label} <ArrowRight size={16} />
            </Link>
            <Link
              to={settings.secondary_cta_to}
              className="inline-flex items-center gap-2 rounded-md border border-ink-line px-7 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-accent hover:text-accent-bright"
            >
              <Play size={15} /> {settings.secondary_cta_label}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.21, 0.65, 0.35, 1] }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-lg bg-gradient-to-tr from-accent/30 via-transparent to-transparent opacity-60 blur-xl"
          />
          <Image
            src={IMG.heroAthlete}
            alt="Athlete training on the strength floor at IronCore Fitness"
            eager
            aspect="aspect-[4/3]"
            className="relative rounded-lg border border-ink-line shadow-card"
          />
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-md border border-ink-line bg-ink-card px-4 py-3 shadow-card sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-accent/15 text-accent-bright">
              <ArrowRight size={16} />
            </span>
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                Strength. Discipline. Progress.
              </p>
              <p className="text-xs text-steel">Purposeful training, every session.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
