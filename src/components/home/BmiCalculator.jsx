import { useState } from 'react'
import { Calculator } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Field from '../ui/Field'
import Button from '../ui/Button'
import { bmiCategory } from '../../lib/utils'
import { motion } from 'framer-motion'

const toneStyles = {
  accent: 'text-accent-bright',
  good: 'text-emerald-400',
  warn: 'text-amber-400',
  bad: 'text-red-400',
}

export default function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)

  const calculate = (e) => {
    e.preventDefault()
    const h = Number(height)
    const w = Number(weight)
    if (h > 0 && w > 0) {
      const meters = h / 100
      const bmi = w / (meters * meters)
      setResult({ bmi: Number(bmi.toFixed(1)), category: bmiCategory(bmi) })
    }
  }

  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Health check"
            title="Know your numbers."
            subtitle="A quick BMI calculation is a useful starting point for setting realistic training goals."
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              This calculator is for general informational purposes only and is not medical advice.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="card-surface p-6 sm:p-8">
            <form onSubmit={calculate} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Height (cm)"
                  type="number"
                  inputMode="decimal"
                  placeholder="e.g. 175"
                  min="80"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Field
                  label="Weight (kg)"
                  type="number"
                  inputMode="decimal"
                  placeholder="e.g. 75"
                  min="20"
                  max="400"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                <Calculator size={16} /> Calculate BMI
              </Button>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-md border border-ink-line bg-ink p-5"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Your BMI
                  </span>
                  <span className="font-heading text-4xl font-extrabold text-white">
                    {result.bmi}
                  </span>
                </div>
                <p className={`mt-2 font-heading text-sm font-bold uppercase tracking-wider ${toneStyles[result.category.tone]}`}>
                  {result.category.label}
                </p>
                <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-ink-card">
                  {['Underweight', 'Healthy', 'Overweight', 'Obesity'].map((label) => {
                    const active =
                      (label === 'Underweight' && result.category.label === 'Underweight') ||
                      (label === 'Healthy' && result.category.label === 'Healthy') ||
                      (label === 'Overweight' && result.category.label === 'Overweight') ||
                      (label === 'Obesity' && result.category.label === 'Obesity')
                    return (
                      <span
                        key={label}
                        className={`h-full flex-1 ${active ? 'bg-accent-bright' : 'bg-ink-line'}`}
                      />
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
