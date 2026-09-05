import PageHero from '../components/ui/PageHero'
import FaqSection from '../components/home/FaqSection'
import ContactSection from '../components/home/ContactSection'
import SEO from '../components/SEO'

export default function FaqPage() {
  return (
    <>
      <SEO
        title="FAQ"
        description="Answers to common questions about IronCore Fitness — training, memberships, classes, and getting started."
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions? Answered."
        subtitle="Everything you need to know about training, memberships, and starting at IronCore."
      />
      <div className="pt-12">
        <FaqSection heading={false} />
      </div>
      <ContactSection />
    </>
  )
}