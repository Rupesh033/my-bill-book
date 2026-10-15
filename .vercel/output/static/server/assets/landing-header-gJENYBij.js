import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as ArrowRight } from "./arrow-right-B4LXPZ0O.js";
import { t as Banknote } from "./banknote-DNTmPRpG.js";
import { n as Boxes, t as ShoppingCart } from "./shopping-cart-B37MloZw.js";
import { t as Check } from "./check-C418P8rt.js";
import { t as ChevronDown } from "./chevron-down-Brb20P0r.js";
import { t as ReceiptIndianRupee } from "./receipt-indian-rupee-wmTisob2.js";
import { t as Users } from "./users-DU0K0g2j.js";
import { t as X } from "./x-BApCvQKU.js";
import { n as CollapsibleContent, r as CollapsibleTrigger, t as Collapsible } from "./collapsible-DAmDyMt1.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { c as FAQ, h as SITE, l as FEATURES, n as ALTERNATIVE_SLUGS, o as CLOSING_CTA, p as NAV_LINKS, s as COMPARISON, t as ALTERNATIVES } from "./alternatives-content-DJKKrNlM.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileSpreadsheet = createLucideIcon("file-spreadsheet", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 13h2",
		key: "yr2amv"
	}],
	["path", {
		d: "M14 13h2",
		key: "un5t4a"
	}],
	["path", {
		d: "M8 17h2",
		key: "2yhykz"
	}],
	["path", {
		d: "M14 17h2",
		key: "10kma7"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GitBranch = createLucideIcon("git-branch", [
	["path", {
		d: "M15 6a9 9 0 0 0-9 9V3",
		key: "1cii5b"
	}],
	["circle", {
		cx: "18",
		cy: "6",
		r: "3",
		key: "1h7g24"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
//#endregion
//#region src/features/marketing/components/comparison-table.tsx
var import_jsx_runtime = require_jsx_runtime();
var ALTERNATIVE_SLUG_BY_COLUMN = {
	Tally: "tally",
	Busy: "busy",
	Vyapar: "vyapar",
	"Zoho Books": "zoho-books"
};
function cellKind(value) {
	if (/^Yes\b/i.test(value)) return "yes";
	if (value === "No") return "no";
	return "text";
}
function nuance(value) {
	return value.match(/^Yes\s*\((.+)\)$/i)?.[1] ?? null;
}
function ComparisonValue({ value }) {
	const kind = cellKind(value);
	const note = nuance(value);
	if (kind === "yes") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex flex-col items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex size-8 items-center justify-center rounded-full bg-money-in/15 text-money-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-4",
				strokeWidth: 2.5
			})
		}), note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-muted-foreground",
			children: note
		}) : null]
	});
	if (kind === "no") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
			className: "size-4",
			strokeWidth: 2.5
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm leading-snug text-muted-foreground md:text-[0.95rem]",
		children: value
	});
}
function ComparisonTable() {
	const textRows = /* @__PURE__ */ new Set(["Pricing model"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 md:py-24",
		"data-ui": "chrome",
		id: COMPARISON.id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-2xl flex-col gap-4 text-center md:mx-0 md:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-semibold tracking-tight md:text-3xl",
				children: COMPARISON.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base text-muted-foreground md:text-lg",
				children: COMPARISON.subtitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 overflow-x-auto rounded-[var(--radius-hero)] bg-card shadow-(--elevation-2)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-[58rem] text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "border-border/40 hover:bg-transparent",
					children: COMPARISON.columns.map((column, index) => {
						const isProduct = index === 1;
						const isFeature = index === 0;
						const alternativeSlug = ALTERNATIVE_SLUG_BY_COLUMN[column];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: cn("h-auto px-5 py-5 font-medium whitespace-normal md:px-6 md:py-6", isFeature && "sticky left-0 z-10 min-w-52 bg-card text-left text-sm text-muted-foreground", isProduct && "min-w-40 text-center font-heading text-base font-semibold text-foreground md:text-lg", !isFeature && !isProduct && "min-w-32 text-center text-sm text-muted-foreground md:text-base"),
							children: alternativeSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "hover:text-foreground hover:underline",
								params: { competitor: alternativeSlug },
								to: "/alternatives/$competitor",
								children: column
							}) : column
						}, column || "feature");
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: COMPARISON.rows.map((row) => {
					const isTextRow = textRows.has(row.label);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: cn("border-border/40 hover:bg-transparent", isTextRow && "border-t border-border/70"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: cn("sticky left-0 z-10 bg-card px-5 py-5 text-left text-sm font-medium text-foreground md:px-6 md:py-6 md:text-base", isTextRow && "font-semibold"),
							children: row.label
						}), row.values.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: cn("px-5 py-5 text-center align-middle whitespace-normal md:px-6 md:py-6", index === 0 && "font-medium text-foreground"),
							children: isTextRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-sm leading-snug md:text-base", index === 0 ? "font-semibold text-foreground" : "text-muted-foreground"),
								children: value
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonValue, { value })
						}, `${row.label}-${COMPARISON.columns[index + 1]}`))]
					}, row.label);
				}) })]
			})
		})]
	});
}
//#endregion
//#region src/features/marketing/components/feature-grid.tsx
var TONE_ICON = {
	"money-in": ReceiptIndianRupee,
	"money-out": ShoppingCart,
	gst: FileSpreadsheet,
	inventory: Boxes,
	banking: Banknote,
	foreground: Users
};
var TONE_VAR = {
	"money-in": "var(--money-in)",
	"money-out": "var(--money-out)",
	gst: "var(--gst)",
	inventory: "var(--inventory)",
	banking: "var(--banking)",
	foreground: "var(--foreground)"
};
function FeatureGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
		"data-ui": "chrome",
		id: FEATURES.id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-2xl flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-semibold tracking-tight md:text-3xl",
				children: FEATURES.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: FEATURES.subtitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: FEATURES.items.map((feature) => {
				const Icon = TONE_ICON[feature.tone];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					size: "hero",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "icon-duotone mb-2 grid size-10 place-items-center rounded-full bg-[color-mix(in_oklch,var(--icon-tone)_16%,transparent)]",
							style: { "--icon-tone": TONE_VAR[feature.tone] },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: cn("size-5"),
								"data-icon-stroke": "",
								style: { color: TONE_VAR[feature.tone] }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: feature.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							className: "text-sm",
							children: feature.body
						})
					] })
				}, feature.title);
			})
		})]
	});
}
//#endregion
//#region src/features/marketing/components/landing-cta.tsx
function LandingCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-4 pb-16 md:pb-20",
		"data-ui": "chrome",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start gap-5 rounded-[var(--radius-hero)] bg-primary px-6 py-10 text-primary-foreground shadow-(--elevation-2) md:flex-row md:items-center md:justify-between md:px-10",
			"data-hero-surface": "",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-w-xl flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-heading text-2xl font-semibold tracking-tight",
					children: CLOSING_CTA.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-primary-foreground/80",
					children: CLOSING_CTA.body
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: CLOSING_CTA.primaryCta.to,
						children: [CLOSING_CTA.primaryCta.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "data-icon": "inline-end" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
					size: "lg",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: CLOSING_CTA.secondaryCta.href,
						rel: "noreferrer",
						target: "_blank",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { "data-icon": "inline-start" }), CLOSING_CTA.secondaryCta.label]
					})
				})]
			})]
		})
	});
}
//#endregion
//#region src/features/marketing/components/landing-faq.tsx
function LandingFaq({ id = FAQ.id, title = FAQ.title, items = FAQ.items } = {}) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-16 md:py-20",
		"data-ui": "chrome",
		id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-heading text-2xl font-semibold tracking-tight md:text-3xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-col gap-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
				className: "rounded-lg bg-card shadow-(--elevation-1)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
					className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-foreground outline-none hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/30 [&[data-state=open]>svg]:rotate-180",
					children: [item.question, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform duration-(--duration-base) ease-(--ease-precise)" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, {
					className: "px-4 pb-4 text-sm text-muted-foreground",
					children: item.answer
				})]
			}, item.question))
		})]
	});
}
//#endregion
//#region src/features/marketing/components/landing-footer.tsx
function LandingFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					SITE.name,
					". MIT License."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Compare",
					className: "flex flex-wrap gap-4",
					children: ALTERNATIVE_SLUGS.map((slug) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "hover:text-foreground",
						params: { competitor: slug },
						to: "/alternatives/$competitor",
						children: ["vs ", ALTERNATIVES[slug].name]
					}, slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Legal",
					className: "flex flex-wrap gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "hover:text-foreground",
							to: "/privacy",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "hover:text-foreground",
							to: "/data-deletion",
							children: "Data deletion"
						}),
						SITE.githubUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "hover:text-foreground",
							href: SITE.githubUrl,
							rel: "noreferrer",
							target: "_blank",
							children: "GitHub"
						}) : null
					]
				})
			]
		})
	});
}
//#endregion
//#region src/features/marketing/components/landing-header.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function LandingHeader() {
	const [hasSession, setHasSession] = import_react.useState(false);
	const [menuOpen, setMenuOpen] = import_react.useState(false);
	import_react.useEffect(() => {
		let cancelled = false;
		authClient.getSession().then((session) => {
			if (!cancelled) setHasSession(Boolean(session.data));
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 bg-shell-canvas/90 backdrop-blur-md",
		"data-app-header": "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "font-heading text-base font-semibold tracking-tight text-foreground",
					href: "#top",
					children: SITE.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Primary",
					className: "hidden items-center gap-5 md:flex",
					children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-sm text-muted-foreground transition-colors duration-(--duration-fast) ease-(--ease-precise) hover:text-foreground",
						href: link.href,
						children: link.label
					}, link.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						SITE.githubUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: SITE.githubUrl,
								rel: "noreferrer",
								target: "_blank",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { "data-icon": "inline-start" }), "GitHub"]
							})
						}) : null,
						hasSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/dashboard",
								children: "Open dashboard"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "hidden sm:inline-flex",
							size: "sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign in"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								children: "Start free"
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"aria-expanded": menuOpen,
							"aria-label": menuOpen ? "Close menu" : "Open menu",
							className: "md:hidden",
							onClick: () => setMenuOpen((open) => !open),
							size: "icon-sm",
							variant: "ghost",
							children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					]
				})
			]
		}), menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Mobile",
			className: "flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden",
			children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted",
				href: link.href,
				onClick: () => setMenuOpen(false),
				children: link.label
			}, link.href))
		}) : null]
	});
}
//#endregion
export { FeatureGrid as a, LandingCta as i, LandingFooter as n, ComparisonTable as o, LandingFaq as r, GitBranch as s, LandingHeader as t };
