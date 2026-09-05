import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Spinner from '../ui/Spinner'
import Badge from '../ui/Badge'
import { useAsync } from '../../hooks/useAsync'
import { classes } from '../../services/content'
import { DAYS, CLASS_CATEGORIES } from '../../lib/constants'
import { formatTime } from '../../lib/utils'

export default function ClassSchedule({ heading = true }) {
  const { data, loading, error } = useAsync(() => classes.list(), [])
  const [day, setDay] = useState('')
  const [category, setCategory] = useState('')

  const filtered = useMemo(() => {
    let rows = data || []
    if (day) rows = rows.filter((c) => c.day === day)
    if (category) rows = rows.filter((c) => c.category === category)
    return rows.sort((a, b) => a.startTime.localeCompare(b.startTime))
  }, [data, day, category])

  const categories = useMemo(() => {
    const fromData = [...new Set((data || []).map((c) => c.category))]
    return fromData.length ? fromData : CLASS_CATEGORIES
  }, [data])

  return (
    <section className="section-pad border-t border-ink-line bg-ink-surface">
      <div className="container-x">
        {heading && (
          <SectionHeading
            eyebrow="Class schedule"
            title="Train on your time."
            subtitle="Filter by day or class type to plan your week."
          />
        )}

        <Reveal>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <div>
              <label htmlFor="day-filter" className="sr-only">
                Filter by day
              </label>
              <select
                id="day-filter"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="field-input sm:w-56"
              >
                <option value="">All Days</option>
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category-filter" className="sr-only">
                Filter by class type
              </label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="field-input sm:w-64"
              >
                <option value="">All Class Types</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        {loading && (
          <div className="mt-10 flex justify-center py-14 text-steel">
            <Spinner className="h-6 w-6" />
          </div>
        )}

        {error && (
          <p className="mt-10 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
            Couldn’t load the schedule: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {filtered.length === 0 && (
              <p className="text-sm text-steel md:col-span-2">
                No classes match the current filters.
              </p>
            )}
            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i * 0.04, 0.3)}>
                <div className="flex items-center gap-4 rounded-md border border-ink-line bg-ink-card p-4 transition-colors hover:border-accent/40">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded border border-accent/25 bg-accent/10">
                    <CalendarDays size={18} className="text-accent-bright" />
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-steel">
                      {formatTime(c.startTime)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-white">{c.name}</h3>
                      <Badge tone="muted">{c.day}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-steel">
                      {formatTime(c.startTime)} – {formatTime(c.endTime)} · {c.category}
                      {c.trainer && (
                        <span className="text-slate-500"> · with {c.trainer}</span>
                      )}
                    </p>
                  </div>
                  <span className="hidden text-xs text-slate-500 sm:block">Cap {c.capacity || '—'}</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <p className="mt-8 text-xs text-slate-500">
            Demo schedule — fictional sample data shown in this concept installation.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
