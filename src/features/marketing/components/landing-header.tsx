import * as React from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  GitBranchIcon,
  MenuIcon,
  ReceiptIcon,
  SparklesIcon,
  XIcon,
} from 'lucide-react'

import { Button } from '#/components/ui/button.tsx'
import { NAV_LINKS, SITE } from '#/features/marketing/landing-content.ts'
import { authClient } from '#/lib/auth-client.ts'

export function LandingHeader() {
  const [hasSession, setHasSession] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    void authClient.getSession().then((session) => {
      if (!cancelled) setHasSession(Boolean(session.data))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full px-4 pt-3 pb-1"
      data-app-header=""
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-border/80 bg-background/80 px-5 shadow-[0_8px_20px_rgba(163,177,198,0.25)] backdrop-blur-xl">
        {/* Brand logo & Badge */}
        <a
          className="flex items-center gap-2.5 font-heading text-base font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-90"
          href="#top"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
            <ReceiptIcon className="size-4" />
          </div>
          <span className="flex items-center gap-1.5">
            {SITE.name}
            <span className="hidden sm:inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-bold text-primary">
              GST ERP
            </span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-150 hover:bg-muted/70 hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {SITE.githubUrl ? (
            <Button asChild size="sm" variant="ghost" className="rounded-full text-xs">
              <a
                href={SITE.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                <GitBranchIcon data-icon="inline-start" />
                GitHub
              </a>
            </Button>
          ) : null}

          {hasSession ? (
            <Button asChild size="sm" className="rounded-full font-semibold px-4 shadow-(--neu-button)">
              <Link to="/app/dashboard">Open Billing App</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex rounded-full text-xs">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="hidden md:inline-flex rounded-full text-xs border-border/80">
                <Link to="/signup">Create Account</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full font-semibold px-4 bg-primary text-primary-foreground shadow-(--neu-button) hover:brightness-105"
              >
                <Link to="/app/dashboard">Open Billing App</Link>
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          <Button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden rounded-full"
            onClick={() => setMenuOpen((open) => !open)}
            size="icon-sm"
            variant="ghost"
          >
            {menuOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen ? (
        <nav
          aria-label="Mobile"
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-border bg-card p-4 shadow-lg backdrop-blur-xl md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-border/60 mt-2">
            {!hasSession ? (
              <div className="grid grid-cols-2 gap-2">
                <Button asChild className="w-full rounded-lg" size="sm" variant="outline">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button asChild className="w-full font-semibold rounded-lg" size="sm" variant="secondary">
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    Create Account
                  </Link>
                </Button>
              </div>
            ) : null}
            <Button asChild className="w-full font-semibold rounded-lg" size="sm">
              <Link to="/app/dashboard" onClick={() => setMenuOpen(false)}>
                Open Billing App
              </Link>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
