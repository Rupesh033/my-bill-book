import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ClockIcon,
  CoinsIcon,
  MonitorSmartphoneIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  ZapIcon,
} from 'lucide-react'

import { Badge } from '#/components/ui/badge.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card.tsx'

export function WhyUpgradeSection() {
  const legacyIssues = [
    {
      title: 'Expensive Annual Subscriptions',
      desc: 'Tally & Busy charge hefty annual TSS/license renewals (₹10,000 - ₹54,000) just to receive basic tax updates.',
    },
    {
      title: 'Counter PC & Hardware Dongle Lock',
      desc: 'You are chained to a single Windows desktop. No remote access from home or while traveling without expensive remote setups.',
    },
    {
      title: 'Silent Ledger & Tax Drift',
      desc: 'Simple billing apps allow negative stock and unbalanced journals, leading to tax notice nightmares from your CA.',
    },
  ]

  const modernSolutions = [
    {
      title: '100% Free Forever (MIT Open Source)',
      desc: 'Zero license cost, zero renewal fees, no credit card needed. Deploy on Cloudflare Workers and Neon or use the cloud version free.',
    },
    {
      title: 'Works in Any Web Browser',
      desc: 'Access your books seamlessly on any counter PC, laptop, or tablet. Lightning-fast response with zero local database corruption.',
    },
    {
      title: 'Guaranteed Double-Entry Ledger',
      desc: 'Every sales bill, purchase, return, and payment posts balanced Dr/Cr entries. GSTR-1, 3B, and Balance Sheet match to the paisa.',
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24" id="why-upgrade">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary">
          Why Upgrade · पुराने सॉफ्टवेयर से बेहतर क्यों?
        </Badge>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Built for the Modern Counter, Free from Licensing Traps
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          See why smart Indian retailers, wholesalers, and accountants are leaving obsolete desktop programs behind.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Legacy Column */}
        <Card className="border-red-500/30 bg-red-500/5 shadow-(--elevation-1)">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-red-500 mb-1">
              <ShieldAlertIcon className="size-5" />
              <span className="text-xs font-bold uppercase tracking-wider">The Old Way (Tally, Busy, Vyapar)</span>
            </div>
            <CardTitle className="text-xl font-heading text-foreground">
              Expensive, Rigid & Desktop-Bound
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {legacyIssues.map((issue) => (
              <div key={issue.title} className="flex items-start gap-3 rounded-lg bg-card/60 p-3.5 border border-red-500/20">
                <AlertCircleIcon className="size-4 shrink-0 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground text-xs">{issue.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{issue.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modern Solution Column */}
        <Card className="border-emerald-500/40 bg-emerald-500/5 shadow-(--elevation-1)">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <ShieldCheckIcon className="size-5" />
              <span className="text-xs font-bold uppercase tracking-wider">The Modern Way (My Bill Book)</span>
            </div>
            <CardTitle className="text-xl font-heading text-foreground">
              Fast, Browser-Based & Free Forever
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {modernSolutions.map((sol) => (
              <div key={sol.title} className="flex items-start gap-3 rounded-lg bg-card/60 p-3.5 border border-emerald-500/20">
                <CheckCircle2Icon className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground text-xs">{sol.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
