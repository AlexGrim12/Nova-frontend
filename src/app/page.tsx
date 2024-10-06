import Link from 'next/link'
import { HeroSection } from '@/app/components/landing/hero-section'
import { FeatureSection } from '@/app/components/landing/feature-section'
import { CallToAction } from '@/app/components/landing/call-to-action'
import { NavBar } from '@/app/components/landing/nav-bar'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900">
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <CallToAction />
    </main>
  )
}
