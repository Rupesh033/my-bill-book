import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as ArrowRight } from "./arrow-right-B4LXPZ0O.js";
import { a as FeatureGrid, i as LandingCta, n as LandingFooter, o as ComparisonTable, r as LandingFaq, s as GitBranch, t as LandingHeader } from "./landing-header-gJENYBij.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { d as HOW_IT_WORKS, f as KEYBOARD_SPEED, h as SITE, m as ROADMAP, u as HERO } from "./alternatives-content-DJKKrNlM.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
//#region src/features/marketing/components/how-it-works.tsx
var import_jsx_runtime = require_jsx_runtime();
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
		"data-ui": "chrome",
		id: HOW_IT_WORKS.id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-2xl flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-semibold tracking-tight md:text-3xl",
				children: HOW_IT_WORKS.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: HOW_IT_WORKS.subtitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-10 grid gap-4 md:grid-cols-3",
			children: HOW_IT_WORKS.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-3 rounded-[var(--radius-hero)] bg-card p-5 shadow-(--elevation-2)",
				"data-hero-surface": "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: String(index + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-heading text-base font-medium",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: step.body
					})
				]
			}, step.title))
		})]
	});
}
//#endregion
//#region src/features/marketing/components/product-preview.tsx
function BrowserChrome({ title, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("overflow-hidden rounded-[var(--radius-hero)] bg-card shadow-(--elevation-2)", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border/80 bg-muted/40 px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 truncate text-[0.625rem] text-muted-foreground",
					children: title
				})
			]
		}), children]
	});
}
function InvoicePreview({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserChrome, {
		className,
		title: "hisaabkro.in/app/sales/new",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": "true",
			className: "grid gap-3 bg-background p-4 text-[0.65rem] leading-relaxed text-foreground",
			"data-ui": "data",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium",
							children: "Tax Invoice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "INV-2026-0042 · 01 Aug 2026"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md bg-money-in/15 px-2 py-1 font-medium text-money-in",
						children: "Intra-state"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 rounded-md bg-card p-3 shadow-(--elevation-1)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bill to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Place of supply" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sharma Traders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "27 — Maharashtra" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-md bg-card shadow-(--elevation-1)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1.4fr_0.5fr_0.6fr_0.7fr] gap-2 border-b border-border bg-muted/50 px-3 py-2 font-medium text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Item" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Qty" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rate" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "Amount"
							})
						]
					}), [
						[
							"Copper Wire 2.5mm",
							"40",
							"185.00",
							"7,400.00"
						],
						[
							"MCB 32A",
							"12",
							"420.00",
							"5,040.00"
						],
						[
							"PVC Conduit 25mm",
							"60",
							"48.00",
							"2,880.00"
						]
					].map(([item, qty, rate, amount]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1.4fr_0.5fr_0.6fr_0.7fr] gap-2 border-b border-border/70 px-3 py-2 last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: qty }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rate }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right font-medium",
								children: amount
							})
						]
					}, item))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto grid w-48 gap-1 rounded-md bg-card p-3 shadow-(--elevation-1)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Taxable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "15,320.00" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-gst",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CGST + SGST" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2,757.60" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-t border-border pt-1 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-money-in",
								children: "18,077.60"
							})]
						})
					]
				})
			]
		})
	});
}
function ReportsPreview({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserChrome, {
		className,
		title: "hisaabkro.in/app/reports",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": "true",
			className: "grid gap-3 bg-background p-4 text-[0.65rem] text-foreground",
			"data-ui": "data",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium",
					children: "GST reports · Jul 2026"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						[
							"GSTR-1",
							"₹4.2L",
							"text-money-in"
						],
						[
							"GSTR-3B",
							"₹61.8K",
							"text-gst"
						],
						[
							"2B match",
							"96%",
							"text-banking"
						]
					].map(([label, value, tone]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-card p-2.5 shadow-(--elevation-1)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-1 text-sm font-medium", tone),
							children: value
						})]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 rounded-md bg-card p-2 shadow-(--elevation-1)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full items-end gap-1",
						children: [
							40,
							65,
							48,
							80,
							55,
							72,
							90
						].map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 rounded-sm bg-gst/35",
							style: { height: `${height}%` }
						}, index))
					})
				})
			]
		})
	});
}
function VoucherEntryPreview({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserChrome, {
		className,
		title: "hisaabkro.in/app/sales/new · voucher entry",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": "true",
			className: "grid gap-2 bg-background p-4 text-[0.65rem] text-foreground",
			"data-ui": "data",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_auto_auto] gap-2 rounded-md bg-muted/40 px-2 py-1.5 font-medium text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account / Item" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GST" })
					]
				}),
				[
					[
						"Sundry Debtors · Sharma Traders",
						"18,077.60",
						"",
						""
					],
					[
						"Sales — Electrical",
						"",
						"15,320.00",
						""
					],
					[
						"Output CGST 9%",
						"",
						"1,378.80",
						"9%"
					],
					[
						"Output SGST 9%",
						"",
						"1,378.80",
						"9%"
					]
				].map(([account, dr, cr, gst]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_auto_auto] gap-2 border-b border-border/60 px-2 py-1.5 last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: account
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-16 text-right font-medium text-money-in",
							children: dr
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-16 text-right font-medium text-money-out",
							children: cr
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-10 text-right text-gst",
							children: gst
						})
					]
				}, account)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-1 text-muted-foreground",
					children: "Balanced · posted to day book"
				})
			]
		})
	});
}
//#endregion
//#region src/features/marketing/components/keyboard-speed.tsx
function KeyboardSpeed() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border/70 bg-shell-canvas/40",
		"data-ui": "chrome",
		id: KEYBOARD_SPEED.id,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-2xl font-semibold tracking-tight md:text-3xl",
						children: KEYBOARD_SPEED.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: KEYBOARD_SPEED.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: KEYBOARD_SPEED.shortcuts.map((shortcut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-4 rounded-md bg-card px-3 py-2.5 shadow-(--elevation-1)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-foreground",
								children: shortcut.action
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded-sm border border-border bg-muted px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground",
								children: shortcut.keys
							})]
						}, shortcut.keys))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherEntryPreview, {})]
		})
	});
}
//#endregion
//#region src/features/marketing/components/landing-hero.tsx
function LandingHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		"data-ui": "chrome",
		id: "top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.94_0.02_95),transparent_55%),linear-gradient(180deg,var(--shell-canvas),var(--background)_70%)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-heading text-sm font-medium tracking-wide text-muted-foreground",
						children: SITE.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl",
						children: HERO.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-lg text-base text-pretty text-muted-foreground md:text-lg",
						children: HERO.subhead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: HERO.primaryCta.to,
								children: [HERO.primaryCta.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "data-icon": "inline-end" })]
							})
						}), HERO.secondaryCta.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: HERO.secondaryCta.href,
								rel: "noreferrer",
								target: "_blank",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { "data-icon": "inline-start" }), HERO.secondaryCta.label]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign in"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: HERO.reassurance
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-72 md:min-h-96",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsPreview, { className: "absolute top-0 right-0 w-[78%] rotate-2 opacity-90 max-md:hidden" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePreview, { className: "relative z-10 w-full max-w-xl md:mt-10 md:w-[92%] md:-rotate-1" })]
			})]
		})]
	});
}
//#endregion
//#region src/features/marketing/components/roadmap-strip.tsx
function RoadmapStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border/70 bg-muted/30",
		"data-ui": "chrome",
		id: ROADMAP.id,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-14 md:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-xl font-semibold tracking-tight md:text-2xl",
						children: ROADMAP.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: "Not shipped yet"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: ROADMAP.subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-2",
					children: ROADMAP.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 rounded-lg bg-card p-4 shadow-(--elevation-1)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-heading text-sm font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: item.body
						})]
					}, item.title))
				})
			]
		})
	});
}
//#endregion
//#region src/features/marketing/components/landing-page.tsx
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyboardSpeed, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonTable, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadmapStrip, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFaq, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCta, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, {})
		]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function LandingRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { LandingRoute as component };
