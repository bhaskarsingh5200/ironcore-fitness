import SEO from '../components/SEO'
import Hero from '../components/home/Hero'
import TrustStrip from '../components/home/TrustStrip'
import AboutSection from '../components/home/AboutSection'
import ProgramsSection from '../components/home/ProgramsSection'
import BmiCalculator from '../components/home/BmiCalculator'
import FacilitiesSection from '../components/home/FacilitiesSection'
import ClassSchedule from '../components/home/ClassSchedule'
import GallerySection from '../components/home/GallerySection'
import TrainersSection from '../components/home/TrainersSection'
import MembershipSection from '../components/home/MembershipSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import LocationSection from '../components/home/LocationSection'
import FaqSection from '../components/home/FaqSection'
import ContactSection from '../components/home/ContactSection'
import { IMG } from '../data/images'

export default function HomePage() {
  return (
    <>
      <SEO
        description="IronCore Fitness — a premium fitness center focused on strength training, personal coaching, functional fitness, and sustainable transformation."
        image={IMG.heroAthlete}
      />
      <Hero />
      <TrustStrip />
      <AboutSection />
      <ProgramsSection />
      <BmiCalculator />
      <FacilitiesSection />
      <ClassSchedule />
      <GallerySection />
      <TrainersSection />
      <MembershipSection />
      <TestimonialsSection />
      <LocationSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}
