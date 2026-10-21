import * as React from 'react'
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LayersIcon,
  PrinterIcon,
  ReceiptIcon,
  ScaleIcon,
  TrendingUpIcon,
} from 'lucide-react'

import { Badge } from '#/components/ui/badge.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '#/components/ui/tabs.tsx'
import { cn } from '#/lib/utils.ts'

export function InteractiveShowcase() {
  const [supplyType, setSupplyType] = React.useState<'intra' | 'inter'>('intra')

  const items = [
    {
      name: 'Polycab 2.5mm Industrial Copper Wire (90m)',
      hsn: '8544',
      qty: 20,
      rate: 1850,
      amount: 37000,
    },
    {
      name: 'Schneider 32A Double Pole MCB Isolator',
      hsn: '8536',
      qty: 15,
      rate: 420,
      amount: 6300,
    },
    {
      name: 'Anchor Roma Modular Switch Panel 8-Module',
      hsn: '8538',
      qty: 40,
      rate: 245,
      amount: 9800,
    },
  ]

  const taxableTotal = items.reduce((sum, item) => sum + item.amount, 0)
  const gstRate = 0.18
  const totalTax = taxableTotal * gstRate
  const cgst = supplyType === 'intra' ? totalTax / 2 : 0
  const sgst = supplyType === 'intra' ? totalTax / 2 : 0
  const igst = supplyType === 'inter' ? totalTax : 0
  const grandTotal = taxableTotal + totalTax

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24" id="showcase">
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary">
          Live Interactive Simulator
        </Badge>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Experience the Ledger-Backed Billing Engine
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          See how an invoice calculates Indian GST, posts directly into double-entry books, updates inventory, and feeds into GSTR-1 automatically.
        </p>
      </div>

      <Tabs defaultValue="invoice" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl h-auto p-1 bg-muted/60">
            <TabsTrigger value="invoice" className="gap-2 py-2">
              <ReceiptIcon className="size-4" />
              <span>Tax Invoice</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="gap-2 py-2">
              <ScaleIcon className="size-4" />
              <span>Double-Entry</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2 py-2">
              <TrendingUpIcon className="size-4" />
              <span>Live Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="gst" className="gap-2 py-2">
              <FileSpreadsheetIcon className="size-4" />
              <span>GSTR-1 Ready</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Tax Invoice */}
        <TabsContent value="invoice">
          <Card className="border-border/80 shadow-(--elevation-2) overflow-hidden">
            <CardHeader className="border-b border-border/60 bg-muted/30 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs text-muted-foreground ml-2">
                    app.mybillbook/sales/new · Tax Invoice
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Supply Type:</span>
                  <div className="inline-flex rounded-md border border-border bg-card p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setSupplyType('intra')}
                      className={cn(
                        'px-2.5 py-1 rounded font-medium transition-colors',
                        supplyType === 'intra'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      Intra-State (CGST + SGST)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupplyType('inter')}
                      className={cn(
                        'px-2.5 py-1 rounded font-medium transition-colors',
                        supplyType === 'inter'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      Inter-State (IGST)
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Invoice Meta */}
              <div className="grid gap-4 sm:grid-cols-2 rounded-lg bg-muted/20 p-4 border border-border/50">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Billed To (Sundry Debtor)
                  </span>
                  <p className="font-heading font-bold text-foreground text-base mt-1">
                    Sharma Electricals & Hardware Store
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    GSTIN: 27AABCS1429B1Z8 · State Code: 27 (Maharashtra)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Address: Shop 14, MG Road Market, Pune, MH 411001
                  </p>
                </div>
                <div className="sm:text-right flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Invoice Details
                    </span>
                    <p className="font-mono font-bold text-foreground text-base mt-1">
                      INV-2026-0842
                    </p>
                    <p className="text-xs text-muted-foreground">Date: 21 Oct 2026</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Badge variant="secondary" className="text-xs">
                      {supplyType === 'intra' ? 'Place of Supply: 27-Maharashtra (Intra-state)' : 'Place of Supply: 24-Gujarat (Inter-state)'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Item Description</th>
                      <th className="p-3">HSN</th>
                      <th className="p-3 text-right">Qty</th>
                      <th className="p-3 text-right">Rate (₹)</th>
                      <th className="p-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {items.map((item, idx) => (
                      <tr key={item.name} className="hover:bg-muted/20">
                        <td className="p-3 text-muted-foreground">{idx + 1}</td>
                        <td className="p-3 font-medium text-foreground">{item.name}</td>
                        <td className="p-3 font-mono text-muted-foreground">{item.hsn}</td>
                        <td className="p-3 text-right font-mono">{item.qty} pcs</td>
                        <td className="p-3 text-right font-mono">₹{item.rate.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right font-mono font-medium">₹{item.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Tax Split */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
                <div className="text-xs text-muted-foreground max-w-sm space-y-1">
                  <p className="font-semibold text-foreground">Terms & Conditions:</p>
                  <p>1. Certified that the particulars given above are true and correct.</p>
                  <p>2. Subject to Pune jurisdiction. Payment due in 15 days.</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="outline" className="text-[0.65rem] gap-1">
                      <CheckCircle2Icon className="size-3 text-emerald-500" /> E-Way Bill Ready
                    </Badge>
                    <Badge variant="outline" className="text-[0.65rem] gap-1">
                      <PrinterIcon className="size-3 text-primary" /> Thermal & A4 Ready
                    </Badge>
                  </div>
                </div>

                <div className="w-full sm:w-72 rounded-lg bg-card p-4 border border-border/80 shadow-xs space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono">₹{taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>

                  {supplyType === 'intra' ? (
                    <>
                      <div className="flex justify-between text-muted-foreground">
                        <span>CGST (9.0%):</span>
                        <span className="font-mono text-primary font-medium">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>SGST (9.0%):</span>
                        <span className="font-mono text-primary font-medium">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-muted-foreground">
                      <span>IGST (18.0%):</span>
                      <span className="font-mono text-primary font-medium">₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-2 flex justify-between font-bold text-sm text-foreground">
                    <span>Grand Total (INR):</span>
                    <span className="font-mono text-money-in text-base">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Double-Entry Ledger */}
        <TabsContent value="journal">
          <Card className="border-border/80 shadow-(--elevation-2)">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Automated Double-Entry Journal Posting</CardTitle>
                  <CardDescription>
                    Every invoice transaction automatically balances Debit and Credit in your General Ledger without manual journal entries.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">
                  ✓ Ledger Balanced
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-3">Account Head</th>
                      <th className="p-3">Account Group</th>
                      <th className="p-3 text-right">Debit (₹)</th>
                      <th className="p-3 text-right">Credit (₹)</th>
                      <th className="p-3">Posting Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Sundry Debtors — Sharma Electricals</td>
                      <td className="p-3 text-muted-foreground">Current Assets</td>
                      <td className="p-3 text-right font-mono font-bold text-money-in">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-mono text-muted-foreground">—</td>
                      <td className="p-3 text-muted-foreground">Increase in Asset (Receivable)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Sales Revenue Account (Electrical Goods)</td>
                      <td className="p-3 text-muted-foreground">Operating Revenue</td>
                      <td className="p-3 text-right font-mono text-muted-foreground">—</td>
                      <td className="p-3 text-right font-mono font-bold text-money-out">₹{taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-muted-foreground">Increase in Revenue</td>
                    </tr>
                    {supplyType === 'intra' ? (
                      <>
                        <tr>
                          <td className="p-3 font-semibold text-foreground">Output CGST Payable 9%</td>
                          <td className="p-3 text-muted-foreground">Duties & Taxes (Liabilities)</td>
                          <td className="p-3 text-right font-mono text-muted-foreground">—</td>
                          <td className="p-3 text-right font-mono font-bold text-gst">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                          <td className="p-3 text-muted-foreground">Tax Collected (Govt Liability)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-foreground">Output SGST Payable 9%</td>
                          <td className="p-3 text-muted-foreground">Duties & Taxes (Liabilities)</td>
                          <td className="p-3 text-right font-mono text-muted-foreground">—</td>
                          <td className="p-3 text-right font-mono font-bold text-gst">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                          <td className="p-3 text-muted-foreground">Tax Collected (Govt Liability)</td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Output IGST Payable 18%</td>
                        <td className="p-3 text-muted-foreground">Duties & Taxes (Liabilities)</td>
                        <td className="p-3 text-right font-mono text-muted-foreground">—</td>
                        <td className="p-3 text-right font-mono font-bold text-gst">₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="p-3 text-muted-foreground">Inter-state Tax Collected</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-muted/40 font-bold border-t-2 border-border text-foreground">
                    <tr>
                      <td colSpan={2} className="p-3 text-right">Trial Balance Check:</td>
                      <td className="p-3 text-right font-mono text-money-in">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-mono text-money-in">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-emerald-600 font-semibold">Matched (Zero Variance)</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Live Dashboard */}
        <TabsContent value="dashboard">
          <Card className="border-border/80 shadow-(--elevation-2)">
            <CardHeader>
              <CardTitle className="text-lg">Real-Time Executive Operations Dashboard</CardTitle>
              <CardDescription>
                Live snapshot of cash position, party receivables, payables, and inventory health.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg bg-card p-4 border border-border shadow-xs">
                  <span className="text-xs text-muted-foreground font-medium">Monthly Sales (Oct)</span>
                  <p className="font-heading text-2xl font-bold text-money-in mt-1">₹4,82,500</p>
                  <span className="text-[0.7rem] text-emerald-600 font-medium">↑ +18.4% vs last month</span>
                </div>
                <div className="rounded-lg bg-card p-4 border border-border shadow-xs">
                  <span className="text-xs text-muted-foreground font-medium">Sundry Debtors (Receivables)</span>
                  <p className="font-heading text-2xl font-bold text-foreground mt-1">₹1,18,400</p>
                  <span className="text-[0.7rem] text-muted-foreground">Across 14 customer accounts</span>
                </div>
                <div className="rounded-lg bg-card p-4 border border-border shadow-xs">
                  <span className="text-xs text-muted-foreground font-medium">Sundry Creditors (Payables)</span>
                  <p className="font-heading text-2xl font-bold text-money-out mt-1">₹42,200</p>
                  <span className="text-[0.7rem] text-muted-foreground">Due in next 7-15 days</span>
                </div>
                <div className="rounded-lg bg-card p-4 border border-border shadow-xs">
                  <span className="text-xs text-muted-foreground font-medium">Cash & Bank Balances</span>
                  <p className="font-heading text-2xl font-bold text-banking mt-1">₹3,65,800</p>
                  <span className="text-[0.7rem] text-emerald-600 font-medium">Reconciled with HDFC & SBI</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/20 p-4 border border-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LayersIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Stock Valuation & Godowns</p>
                    <p className="text-xs text-muted-foreground">3 Godowns Active · 142 SKUs Tracked · 3 Items Below Reorder Level</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  View Stock Movements
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: GST Compliance */}
        <TabsContent value="gst">
          <Card className="border-border/80 shadow-(--elevation-2)">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">One-Click GST Filing Reports (GSTR-1 & GSTR-3B)</CardTitle>
                  <CardDescription>
                    Tables auto-aggregated straight from double-entry vouchers. Zero manual tallying.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="font-mono text-xs">FY 2026-27 · Q3</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-card p-4 border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">GSTR-1 Table 4A (B2B)</p>
                  <p className="font-heading text-xl font-bold text-foreground mt-1">₹3,84,200</p>
                  <p className="text-xs text-muted-foreground mt-0.5">38 Verified Invoices with GSTIN</p>
                </div>
                <div className="rounded-lg bg-card p-4 border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">GSTR-1 Table 7 (B2C Small)</p>
                  <p className="font-heading text-xl font-bold text-foreground mt-1">₹98,300</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Counter Retail Sales</p>
                </div>
                <div className="rounded-lg bg-card p-4 border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">GSTR-2B ITC Match Rate</p>
                  <p className="font-heading text-xl font-bold text-emerald-600 mt-1">98.4% Match</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Vendor Invoices Reconciled</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border/60 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500" />
                  <span className="text-foreground">HSN/SAC 12 Table Summary ready for GST Portal offline JSON utility tool.</span>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  Export JSON / Excel
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
