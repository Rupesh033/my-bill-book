import * as React from 'react'
import { ArrowRightIcon, CalculatorIcon, CheckCircle2Icon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Badge } from '#/components/ui/badge.tsx'
import { Button } from '#/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card.tsx'
import { Input } from '#/components/ui/input.tsx'
import { cn } from '#/lib/utils.ts'

export function GstCalculatorMini() {
  const [amountStr, setAmountStr] = React.useState('10000')
  const [rate, setRate] = React.useState<number>(18)
  const [mode, setMode] = React.useState<'intra' | 'inter'>('intra')

  const amount = Number.parseFloat(amountStr) || 0
  const taxAmount = (amount * rate) / 100
  const cgst = mode === 'intra' ? taxAmount / 2 : 0
  const sgst = mode === 'intra' ? taxAmount / 2 : 0
  const igst = mode === 'inter' ? taxAmount : 0
  const totalAmount = amount + taxAmount

  return (
    <section className="mx-auto max-w-4xl px-4 py-16" id="gst-calculator">
      <Card className="border-border/80 bg-card shadow-(--elevation-2) overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CalculatorIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-lg">Instant GST Invoice Calculator</CardTitle>
                <p className="text-xs text-muted-foreground">Test how tax splits work for your bills</p>
              </div>
            </div>
            <Badge variant="outline" className="w-fit text-xs font-mono">
              Live Interactive Utility
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label htmlFor="taxable-amount-input" className="text-xs font-semibold text-muted-foreground block mb-1">
                  Taxable Amount (₹):
                </label>
                <Input
                  id="taxable-amount-input"
                  type="number"
                  min="0"
                  step="100"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="font-mono text-base font-semibold"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  GST Tax Rate:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 12, 18, 28].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRate(r)}
                      className={cn(
                        'py-1.5 rounded-md text-xs font-semibold transition-all border',
                        rate === r
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                          : 'bg-muted/50 text-foreground border-border hover:bg-muted',
                      )}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  Supply Type:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setMode('intra')}
                    className={cn(
                      'py-1.5 px-3 rounded-md font-medium transition-all border text-center',
                      mode === 'intra'
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-muted/50 text-foreground border-border hover:bg-muted',
                    )}
                  >
                    Intra-State (CGST + SGST)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('inter')}
                    className={cn(
                      'py-1.5 px-3 rounded-md font-medium transition-all border text-center',
                      mode === 'inter'
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-muted/50 text-foreground border-border hover:bg-muted',
                    )}
                  >
                    Inter-State (IGST)
                  </button>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="rounded-xl bg-muted/40 p-5 border border-border/70 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Calculation Breakdown
              </span>

              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>Base Taxable Value:</span>
                  <span className="font-mono font-medium text-foreground">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>

                {mode === 'intra' ? (
                  <>
                    <div className="flex justify-between text-muted-foreground">
                      <span>CGST ({rate / 2}%):</span>
                      <span className="font-mono font-medium text-primary">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>SGST ({rate / 2}%):</span>
                      <span className="font-mono font-medium text-primary">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-muted-foreground">
                    <span>IGST ({rate}%):</span>
                    <span className="font-mono font-medium text-primary">₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="border-t border-border pt-2 flex justify-between text-sm font-bold text-foreground">
                  <span>Total Invoice Value:</span>
                  <span className="font-mono text-money-in text-base">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild size="sm" className="w-full text-xs font-semibold gap-1.5 shadow-(--neu-button)">
                  <Link to="/app/sales">
                    Create Invoice in App
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
