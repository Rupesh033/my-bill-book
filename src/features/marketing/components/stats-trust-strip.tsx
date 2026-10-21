import {
  Building2Icon,
  CheckCircle2Icon,
  CoinsIcon,
  FileCheckIcon,
  ScaleIcon,
  ZapIcon,
} from 'lucide-react'

const STATS = [
  {
    icon: CoinsIcon,
    value: '100% Free',
    label: 'Open-source MIT. Zero license fee',
  },
  {
    icon: ScaleIcon,
    value: 'Double-Entry',
    label: 'Auto-balanced central ledger engine',
  },
  {
    icon: ZapIcon,
    value: '<50ms Speed',
    label: 'Lightning fast counter billing',
  },
  {
    icon: FileCheckIcon,
    value: 'GST Ready',
    label: 'GSTR-1, 3B & HSN summary reports',
  },
  {
    icon: Building2Icon,
    value: 'Multi-Company',
    label: 'Unlimited businesses & godowns',
  },
] as const

export function StatsTrustStrip() {
  return (
    <section className="border-y border-border/70 bg-card/60 backdrop-blur-xs py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.value}
                className="flex flex-col items-center text-center p-3 rounded-lg transition-all hover:bg-muted/40"
              >
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <span className="font-heading text-lg font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
