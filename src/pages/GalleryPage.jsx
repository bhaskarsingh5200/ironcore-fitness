import PageHero from '../components/ui/PageHero'
import GallerySection from '../components/home/GallerySection'
import ContactSection from '../components/home/ContactSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import SEO from '../components/SEO'
import { GALLERY_CATEGORIES } from '../lib/constants'
import { Image as ImageIcon } from 'lucide-react'

export default function GalleryPage() {
  return (
    <>
      <SEO
        title="Gallery"
        description="Concept imagery from inside IronCore Fitness — training zones, community, and facilities."
      />
      <PageHero
        eyebrow="Gallery"
        title="A look inside."
        subtitle="Browse concept imagery across our training zones, community, and facilities. No real transformation claims are made."
      />
      <div className="pt-20">
        <GallerySection heading={false} showAllLink={false} />
      </div>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="What you’ll see"
            title="Four sides of IronCore."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {GALLERY_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.value} delay={i * 0.05}>
                <div className="card-surface h-full p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                    <ImageIcon size={18} />
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold text-white">{cat.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel">{cat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
