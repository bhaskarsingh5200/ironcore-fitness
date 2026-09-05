import { Check, Dumbbell } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Image from '../ui/Image'
import { conceptFacilities } from '../../data/concept'

export default function FacilitiesSection() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Facilities"
          title="Built for serious training."
          subtitle="Five dedicated zones so every kind of training has the right space."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conceptFacilities.map((facility, i) => (
            <Reveal key={facility.id} delay={i * 0.06} className={i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}>
              <div
                className={`group relative h-full overflow-hidden rounded-md border border-ink-line ${
                  i === 0 ? 'min-h-[420px]' : ''
                }`}
              >
                <Image
                  src={facility.image}
                  alt={facility.name}
                  aspect={i === 0 ? 'aspect-[16/11]' : 'aspect-[4/3]'}
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/40 bg-ink/70 text-accent-bright">
                      <Dumbbell size={15} />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white">{facility.name}</h3>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-steel">
                    {facility.description}
                  </p>
                  {facility.highlights?.length > 0 && (
                    <ul className="mt-3 flex max-w-md flex-wrap gap-1.5">
                      {facility.highlights.map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1 rounded border border-white/10 bg-ink/70 px-2 py-1 text-[11px] text-slate-300 backdrop-blur-sm"
                        >
                          <Check size={11} className="text-accent-bright" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
