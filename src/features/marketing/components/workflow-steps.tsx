import {
  ArrowRightIcon,
  Building2Icon,
  CheckCircle2Icon,
  FileCheck2Icon,
  PackagePlusIcon,
  ReceiptIndianRupeeIcon,
  SparklesIcon,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Badge } from '#/components/ui/badge.tsx'
import { Button } from '#/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card.tsx'

const STEPS = [
  {
    step: '01',
    badge: 'Step 1 · Basic Setup',
    title: 'Company Profile & GSTIN Setup',
    hindiTitle: 'कंपनी और GST सेटअप',
    description:
      'Enter your Business Name, 15-digit GSTIN (e.g. 27AAAAA0000A1Z5), State code, and Financial Year. The software automatically constructs your standard Indian Chart of Accounts (COA) and invoice sequences.',
    features: [
      'Automatic state-code detection for Intra/Inter-state tax rules',
      'Upload business logo, contact number & bank details for bill print',
      'Multi-company support: Add separate firms under one login',
    ],
    proTip: 'No credit card or license activation required.',
    linkTo: '/app/masters/company-profile',
    linkLabel: 'Setup Profile',
  },
  {
    step: '02',
    badge: 'Step 2 · Masters Catalog',
    title: 'Parties & Item Master Catalog',
    hindiTitle: 'पार्टी और स्टॉक मास्टर्स जोड़ें',
    description:
      'Add Customers & Suppliers with GSTIN, billing address, and credit limits. Add your inventory items with HSN/SAC codes, GST tax slabs (0%, 5%, 12%, 18%, 28%), godowns, and opening stock balance.',
    features: [
      'Customer & Vendor Khata with opening balance tracking',
      'HSN / SAC directory with automatic tax rate calculation',
      'Multi-godown & warehouse stock allocation',
    ],
    proTip: 'Supports fast bulk CSV/Excel import in one click.',
    linkTo: '/app/masters/parties',
    linkLabel: 'Manage Masters',
  },
  {
    step: '03',
    badge: 'Step 3 · Daily Billing',
    title: 'Lightning-Fast Counter Billing',
    hindiTitle: 'सुपरफास्ट बिलिंग और खरीदारी',
    description:
      'Create Tax Invoices in under 10 seconds. Select customer, enter product or scan barcode, and press Tab/Enter. CGST+SGST or IGST splits automatically based on delivery state. Record Purchase bills or scan physical bills via OCR.',
    features: [
      'Keyboard-first counter flow (Tab / Enter / ⌘K)',
      '1-click print on 3-inch thermal POS or standard A4 PDF',
      'Direct WhatsApp invoice PDF sharing with payment QR',
    ],
    proTip: 'Safe sequence logic ensures zero invoice number gaps.',
    linkTo: '/app/sales',
    linkLabel: 'Create Invoice',
  },
  {
    step: '04',
    badge: 'Step 4 · Accounts & Returns',
    title: 'Payments, Ledgers & 1-Click GST Returns',
    hindiTitle: 'पेमेंट, खाता और GST रिटर्न फाइलिंग',
    description:
      'Record customer payments via UPI/Bank/Cash. The party ledger updates immediately. At month-end, export audit-ready GSTR-1, GSTR-3B, Profit & Loss statement, and Balance Sheet ready for your CA.',
    features: [
      'Real-time Party Outstanding & Ageing Analysis',
      'GSTR-1 (Table 4 B2B, Table 7 B2C, Table 12 HSN) ready for GST portal',
      'Complete Trial Balance and P&L balanced to the paisa',
    ],
    proTip: 'Every voucher strictly balances Debit and Credit.',
    linkTo: '/app/reports',
    linkLabel: 'View Reports',
  },
] as const

export function WorkflowSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24" id="steps">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary">
          Step-by-Step Guide · इस्तेमाल करने के आसान स्टेप्स
        </Badge>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          How to Use My Bill Book in 4 Simple Steps
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          From first setup to filing GST returns — discover how easy it is to manage your store, inventory, and accounts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {STEPS.map((step) => (
          <Card
            key={step.step}
            className="relative border-border/80 bg-card shadow-(--elevation-1) transition-all hover:shadow-(--elevation-2) flex flex-col justify-between"
          >
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {step.badge}
                  </Badge>
                  <span className="font-mono text-3xl font-extrabold text-primary/25">
                    {step.step}
                  </span>
                </div>
                <CardTitle className="text-xl font-heading text-foreground">
                  {step.title}
                </CardTitle>
                <p className="text-xs font-semibold text-primary/90">
                  {step.hindiTitle}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-border/60">
                  {step.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs text-foreground/90">
                      <CheckCircle2Icon className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>

            <div className="p-6 pt-0 mt-2">
              <div className="flex items-center justify-between rounded-lg bg-muted/40 p-3 text-xs border border-border/50">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <SparklesIcon className="size-3.5 text-amber-500 shrink-0" />
                  <span>{step.proTip}</span>
                </div>
                <Button asChild size="sm" variant="ghost" className="h-7 text-xs font-semibold text-primary gap-1">
                  <Link to={step.linkTo}>
                    {step.linkLabel}
                    <ArrowRightIcon className="size-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
