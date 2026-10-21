import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, CheckCircle2Icon, SparklesIcon } from 'lucide-react'

import { Button } from '#/components/ui/button.tsx'
import { CLOSING_CTA, SITE } from '#/features/marketing/landing-content.ts'

export function LandingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 md:pb-28" data-ui="chrome">
      <div
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-8 sm:p-12 md:p-16 shadow-(--elevation-2)"
        data-hero-surface=""
      >
        {/* Glow backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <SparklesIcon className="size-3.5" />
              <span>Instant Workspace Access</span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {CLOSING_CTA.title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {CLOSING_CTA.body} No signup credit card required. Generate tax invoices, track debtor khata, and export balanced GST returns in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                <CheckCircle2Icon className="size-3.5 text-emerald-500" />
                100% Free MIT Open Source
              </span>
              <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                <CheckCircle2Icon className="size-3.5 text-primary" />
                Double-Entry Compliant
              </span>
              <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                <CheckCircle2Icon className="size-3.5 text-purple-500" />
                Unlimited Multi-Company
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-8 text-sm font-bold bg-primary text-primary-foreground shadow-(--neu-button) hover:brightness-105 hover:scale-102 transition-all"
            >
              <Link to={CLOSING_CTA.primaryCta.to} aria-label="Open Billing App">
                {CLOSING_CTA.primaryCta.label}
                <ArrowRightIcon className="size-4 ml-1.5" data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full px-6 text-sm font-semibold border-border/80 bg-card hover:bg-muted/60"
              size="lg"
              variant="outline"
            >
              <a href={CLOSING_CTA.secondaryCta.href || '#steps'}>
                {CLOSING_CTA.secondaryCta.label}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
