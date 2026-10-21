import {
  BanknoteIcon,
  BoxesIcon,
  Building2Icon,
  CheckIcon,
  FileSpreadsheetIcon,
  LayersIcon,
  ReceiptIcon,
  ScaleIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
  WarehouseIcon,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Badge } from '#/components/ui/badge.tsx'
import { Button } from '#/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card.tsx'

const MODULES = [
  {
    title: '1. Sales & Invoicing Suite',
    icon: TrendingUpIcon,
    tone: 'text-money-in',
    bg: 'bg-emerald-500/10',
    description: 'High-speed counter tax invoices, estimates, quotations, and credit notes.',
    features: [
      'B2B & B2C GST Tax Invoices',
      'Proforma & Sales Quotations',
      'Sales Returns & Credit Notes',
      'Thermal 3-inch & A4 PDF Print',
    ],
    path: '/app/sales',
  },
  {
    title: '2. Purchases & Inward Goods',
    icon: ShoppingCartIcon,
    tone: 'text-money-out',
    bg: 'bg-amber-500/10',
    description: 'Track vendor bills, purchase orders, and physical goods receipt notes (GRN).',
    features: [
      'Purchase Invoices & Bills',
      'Purchase Orders (PO) with status',
      'Goods Receipt Notes (GRN)',
      'Paper Bill OCR Review Drafts',
    ],
    path: '/app/purchases',
  },
  {
    title: '3. Inventory & Multi-Godown',
    icon: BoxesIcon,
    tone: 'text-inventory',
    bg: 'bg-orange-500/10',
    description: 'Physical stock tracked strictly through movement records. No negative drift.',
    features: [
      'Multi-Warehouse / Godown Stock',
      'HSN / SAC Code Master Catalog',
      'Barcode Generation & Scanning',
      'Low Stock Reorder Alerts',
    ],
    path: '/app/inventory',
  },
  {
    title: '4. Parties & Khata Ledgers',
    icon: UsersIcon,
    tone: 'text-primary',
    bg: 'bg-primary/10',
    description: 'Unified customer & vendor khata with opening balances and payment terms.',
    features: [
      'Customer & Supplier Directory',
      'Automatic GSTIN State Verification',
      'Receivable & Payable Ageing',
      'WhatsApp Payment Reminder PDFs',
    ],
    path: '/app/masters/parties',
  },
  {
    title: '5. Cash, Banking & Expenses',
    icon: BanknoteIcon,
    tone: 'text-banking',
    bg: 'bg-cyan-500/10',
    description: 'Reconcile bank statements, track petty cash, and categorize operating expenses.',
    features: [
      'Bank Reconciliation (BRS)',
      'Multi-Bank & Cash Book',
      'Customer Receipts & Vendor Payments',
      'Operating Expense Vouchers',
    ],
    path: '/app/payments',
  },
  {
    title: '6. Double-Entry & GST Returns',
    icon: ScaleIcon,
    tone: 'text-gst',
    bg: 'bg-purple-500/10',
    description: 'Central accounting engine generating balanced books and exportable tax returns.',
    features: [
      'Automated Balanced Journal Vouchers',
      'Trial Balance, P&L & Balance Sheet',
      'GSTR-1 (Table 4A, 7, 12 HSN Summary)',
      'GSTR-3B & GSTR-2B ITC Matcher',
    ],
    path: '/app/reports',
  },
] as const

export function SystemArchitecture() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24" id="architecture">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary">
          System Architecture · सम्पूर्ण सिस्टम का स्ट्रक्चर
        </Badge>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Properly Arranged for Every Business Workflow
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Built like enterprise ERP software (Tally / BUSY) but modernized for the web. Each module operates seamlessly inside a company-aware database transaction.
        </p>
      </div>

      {/* Workflow Pipeline visual */}
      <div className="mb-12 overflow-x-auto rounded-xl border border-border bg-card p-4 shadow-(--elevation-1)">
        <div className="flex min-w-[650px] items-center justify-between text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-foreground">
            <Building2Icon className="size-4 text-primary" />
            <span>1. Masters Setup</span>
          </div>
          <span className="text-primary font-bold">➔</span>
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-foreground">
            <ShoppingCartIcon className="size-4 text-amber-500" />
            <span>2. Purchases & Stock</span>
          </div>
          <span className="text-primary font-bold">➔</span>
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-foreground">
            <TrendingUpIcon className="size-4 text-emerald-500" />
            <span>3. Counter Sales Bill</span>
          </div>
          <span className="text-primary font-bold">➔</span>
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-foreground">
            <BanknoteIcon className="size-4 text-cyan-500" />
            <span>4. Payments & Bank</span>
          </div>
          <span className="text-primary font-bold">➔</span>
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/30 px-3 py-2 text-primary">
            <FileSpreadsheetIcon className="size-4" />
            <span>5. 1-Click GST Returns</span>
          </div>
        </div>
      </div>

      {/* 6 Modules Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((module) => {
          const Icon = module.icon
          return (
            <Card
              key={module.title}
              className="border-border/80 bg-card shadow-(--elevation-1) hover:shadow-(--elevation-2) transition-all flex flex-col justify-between"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className={`mb-3 flex size-10 items-center justify-center rounded-lg ${module.bg}`}>
                    <Icon className={`size-5 ${module.tone}`} />
                  </div>
                  <CardTitle className="text-base font-heading text-foreground">
                    {module.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {module.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 border-t border-border/50 pt-3 text-xs">
                    {module.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-foreground/90">
                        <CheckIcon className="size-3.5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <div className="p-4 pt-0">
                <Button asChild size="sm" variant="outline" className="w-full text-xs font-semibold hover:bg-muted">
                  <Link to={module.path}>
                    Open Module
                  </Link>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
