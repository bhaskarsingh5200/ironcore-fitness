import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Accordion from '../ui/Accordion'
import Spinner from '../ui/Spinner'
import Button from '../ui/Button'
import { useAsync } from '../../hooks/useAsync'
import { faqs } from '../../services/content'

export default function FaqSection({ heading = true }) {
  const { data, loading, error } = useAsync(() => faqs.list(), [])

  const groups = (data || []).reduce((acc, item) => {
    const key = item.category || 'General'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
  const groupNames = Object.keys(groups)

  return (
    <section className="section-pad">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          {heading && (
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered."
              subtitle="Everything you need to know before your first session at IronCore."
            />
          )}
          <Reveal delay={0.1}>
            <Button to="/contact" variant="ghost" className="mt-8">
              Ask Us Anything
            </Button>
          </Reveal>
        </div>

        <div>
          {loading && (
            <div className="flex justify-center py-14 text-steel">
              <Spinner className="h-6 w-6" />
            </div>
          )}
          {error && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
              Couldn’t load FAQs: {error.message}
            </p>
          )}
          {!loading && !error && (
            <div className="space-y-10">
              {groupNames.map((name) => (
                <div key={name}>
                  <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-accent-bright">
                    {name}
                  </h3>
                  <Accordion items={groups[name]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
