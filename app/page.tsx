import { LandingHeader } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorksSection } from '@/components/landing/how-it-works'
import { FeaturesSection } from '@/components/landing/features-section'
import { FooterSection } from '@/components/landing/footer-section'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
      <FooterSection />
    </div>
  )
}
