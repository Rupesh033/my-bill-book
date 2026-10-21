import * as React from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CommandIcon,
  CreditCardIcon,
  FileDownIcon,
  KeyboardIcon,
  PlusIcon,
  PrinterIcon,
  ReceiptIcon,
  SparklesIcon,
  Trash2Icon,
} from 'lucide-react'

import { Badge } from '#/components/ui/badge.tsx'
import { Button } from '#/components/ui/button.tsx'
import { HERO, SITE } from '#/features/marketing/landing-content.ts'
import { cn } from '#/lib/utils.ts'

interface MockItem {
  id: string
  name: string
  hsn: string
  qty: number
  rate: number
}

const AVAILABLE_CATALOG: Array<MockItem> = [
  { id: '1', name: 'Polycab 2.5mm Copper Wire (90m)', hsn: '8544', qty: 10, rate: 1850 },
  { id: '2', name: 'Schneider 32A Double Pole MCB', hsn: '8536', qty: 8, rate: 420 },
  { id: '3', name: 'Anchor Roma 8-Module Switch Plate', hsn: '8538', qty: 25, rate: 260 },
  { id: '4', name: 'Philips 18W Slim LED Recessed Panel', hsn: '9405', qty: 12, rate: 490 },
]

export function LandingHero() {
  const [selectedItems, setSelectedItems] = React.useState<Array<MockItem>>(AVAILABLE_CATALOG.slice(0, 3))
  const [taxMode, setTaxMode] = React.useState<'intra' | 'inter'>('intra')

  const toggleItem = (item: MockItem) => {
    setSelectedItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      if (exists) {
        if (prev.length === 1) return prev // keep at least 1 item
        return prev.filter((p) => p.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const taxableAmount = selectedItems.reduce((acc, curr) => acc + curr.qty * curr.rate, 0)
  const gstRate = 0.18
  const totalTax = taxableAmount * gstRate
  const cgst = taxMode === 'intra' ? totalTax / 2 : 0
  const sgst = taxMode === 'intra' ? totalTax / 2 : 0
  const igst = taxMode === 'inter' ? totalTax : 0
  const grandTotal = taxableAmount + totalTax

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28" id="top">
      {/* Background glow meshes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.55_0.22_260/16%),transparent_70%),radial-gradient(circle_at_80%_20%,oklch(0.60_0.18_155/12%),transparent_50%)]"
      />

      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/80 px-4 py-1.5 text-xs font-semibold text-primary shadow-[0_2px_8px_rgba(163,177,198,0.3)] backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <SparklesIcon className="size-3.5 text-primary animate-pulse" />
          <span>{SITE.name} · 100% Free & Open-Source GST ERP</span>
          <span className="hidden sm:inline-block text-muted-foreground">|</span>
          <span className="hidden sm:inline-block text-muted-foreground font-normal">No License Fee · Zero Drift</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl font-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-balance">
          {HERO.headline}
        </h1>

        {/* Subhead */}
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed text-balance">
          {HERO.subhead}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-8 font-bold text-sm bg-primary text-primary-foreground shadow-(--neu-button) hover:brightness-105 transition-all hover:scale-102"
          >
            <Link to={HERO.primaryCta.to} aria-label="Open Billing App">
              {HERO.primaryCta.label}
              <ArrowRightIcon className="size-4 ml-1.5" data-icon="inline-end" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-6 font-semibold text-sm border-border/80 bg-card/80 backdrop-blur-sm hover:bg-card transition-all"
          >
            <a href="#interactive-cockpit">
              Try Interactive Simulator
            </a>
          </Button>
        </div>

        {/* Value Reassurance Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5 text-foreground/85">
            <CheckCircle2Icon className="size-3.5 text-emerald-500" />
            100% Free Forever (MIT)
          </span>
          <span className="flex items-center gap-1.5 text-foreground/85">
            <CheckCircle2Icon className="size-3.5 text-primary" />
            Real Double-Entry Ledger
          </span>
          <span className="flex items-center gap-1.5 text-foreground/85">
            <CheckCircle2Icon className="size-3.5 text-purple-500" />
            GSTR-1, 3B & E-Way Ready
          </span>
          <span className="flex items-center gap-1.5 text-foreground/85">
            <CheckCircle2Icon className="size-3.5 text-cyan-500" />
            Instant Counter Speed
          </span>
        </div>

        {/* Cockpit Centerpiece Showcase */}
        <div className="mt-14 w-full" id="interactive-cockpit">
          <div className="relative rounded-2xl border border-border/90 bg-card shadow-(--elevation-2) overflow-hidden text-left">
            {/* macOS / Window title bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-400/90" />
                <span className="size-3 rounded-full bg-amber-400/90" />
                <span className="size-3 rounded-full bg-emerald-400/90" />
                <div className="ml-3 hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Sharma Electricals & Hardware</span>
                  <span>·</span>
                  <span>GSTIN: 27AABCS1429B1Z8</span>
                  <span>·</span>
                  <Badge variant="outline" className="text-[0.65rem] py-0 px-1.5 font-mono">FY 2026-27</Badge>
                </div>
              </div>

              {/* Tax Mode Switcher */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground font-medium hidden sm:inline">Tax Mode:</span>
                <div className="inline-flex rounded-lg border border-border bg-card p-0.5 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setTaxMode('intra')}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-xs font-semibold transition-all',
                      taxMode === 'intra'
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    Intra-State (CGST+SGST)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaxMode('inter')}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-xs font-semibold transition-all',
                      taxMode === 'inter'
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    Inter-State (IGST)
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Item Picker Chips */}
            <div className="border-b border-border/60 bg-muted/20 px-4 py-2.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground mr-1">Click to toggle items:</span>
              {AVAILABLE_CATALOG.map((cat) => {
                const isSelected = selectedItems.some((s) => s.id === cat.id)
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleItem(cat)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all border text-xs',
                      isSelected
                        ? 'bg-primary/10 border-primary/40 text-primary font-semibold shadow-xs'
                        : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-border/80',
                    )}
                  >
                    {isSelected ? <CheckCircle2Icon className="size-3" /> : <PlusIcon className="size-3" />}
                    <span>{cat.name.split(' ')[0]} {cat.name.split(' ')[1]}</span>
                  </button>
                )
              })}
            </div>

            {/* Invoice Content */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Header Info */}
              <div className="grid gap-4 sm:grid-cols-2 rounded-xl bg-muted/30 p-4 border border-border/60">
                <div>
                  <span className="text-[0.7rem] uppercase tracking-wider font-bold text-muted-foreground">
                    Party (Customer / Sundry Debtor)
                  </span>
                  <p className="font-heading font-extrabold text-foreground text-base mt-0.5">
                    Raza Hardware & Electrical Works
                  </p>
                  <p className="text-xs text-muted-foreground">
                    GSTIN: 27BXYZA9912C1ZR · State: 27-Maharashtra
                  </p>
                </div>
                <div className="sm:text-right flex flex-col justify-between">
                  <div>
                    <span className="text-[0.7rem] uppercase tracking-wider font-bold text-muted-foreground">
                      Voucher Reference
                    </span>
                    <p className="font-mono font-bold text-foreground text-base mt-0.5">
                      INV-2026-0042
                    </p>
                  </div>
                  <div className="mt-1">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {taxMode === 'intra' ? 'Place of Supply: Intra-State' : 'Place of Supply: Inter-State'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Table of items */}
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/60 border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-3">Item Description</th>
                      <th className="p-3">HSN</th>
                      <th className="p-3 text-right">Qty</th>
                      <th className="p-3 text-right">Rate (₹)</th>
                      <th className="p-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {selectedItems.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/20">
                        <td className="p-3 font-medium text-foreground">{item.name}</td>
                        <td className="p-3 font-mono text-muted-foreground">{item.hsn}</td>
                        <td className="p-3 text-right font-mono">{item.qty} pcs</td>
                        <td className="p-3 text-right font-mono">₹{item.rate.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right font-mono font-bold text-foreground">
                          ₹{(item.qty * item.rate).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Calculations & Action Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Ledger Balance:</span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono text-[0.7rem]">
                      ✓ Debit = Credit Balanced
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground pt-1">
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem]">Enter</kbd> Next
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem]">Tab</kbd> Move
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem]">F2</kbd> Save
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem]">⌘K</kbd> Search
                  </div>
                </div>

                <div className="w-full sm:w-80 rounded-xl bg-muted/40 p-4 border border-border/70 space-y-2 text-xs shadow-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxable Value:</span>
                    <span className="font-mono font-medium">₹{taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>

                  {taxMode === 'intra' ? (
                    <>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Output CGST (9%):</span>
                        <span className="font-mono text-primary font-medium">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Output SGST (9%):</span>
                        <span className="font-mono text-primary font-medium">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Output IGST (18%):</span>
                      <span className="font-mono text-primary font-medium">₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-2 flex justify-between font-extrabold text-sm text-foreground">
                    <span>Grand Total:</span>
                    <span className="font-mono text-money-in text-base">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
