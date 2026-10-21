import { ComparisonTable } from '#/features/marketing/components/comparison-table.tsx'
import { FeatureGrid } from '#/features/marketing/components/feature-grid.tsx'
import { GstCalculatorMini } from '#/features/marketing/components/gst-calculator-mini.tsx'
import { InteractiveShowcase } from '#/features/marketing/components/interactive-showcase.tsx'
import { KeyboardSpeed } from '#/features/marketing/components/keyboard-speed.tsx'
import { LandingCta } from '#/features/marketing/components/landing-cta.tsx'
import { LandingFaq } from '#/features/marketing/components/landing-faq.tsx'
import { LandingFooter } from '#/features/marketing/components/landing-footer.tsx'
import { LandingHeader } from '#/features/marketing/components/landing-header.tsx'
import { LandingHero } from '#/features/marketing/components/landing-hero.tsx'
import { RoadmapStrip } from '#/features/marketing/components/roadmap-strip.tsx'
import { StatsTrustStrip } from '#/features/marketing/components/stats-trust-strip.tsx'
import { SystemArchitecture } from '#/features/marketing/components/system-architecture.tsx'
import { WhyUpgradeSection } from '#/features/marketing/components/why-upgrade-section.tsx'
import { WorkflowSteps } from '#/features/marketing/components/workflow-steps.tsx'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <LandingHeader />
      <main>
        <LandingHero />
        <StatsTrustStrip />
        <WhyUpgradeSection />
        <WorkflowSteps />
        <InteractiveShowcase />
        <SystemArchitecture />
        <KeyboardSpeed />
        <FeatureGrid />
        <GstCalculatorMini />
        <ComparisonTable />
        <RoadmapStrip />
        <LandingFaq />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  )
}
