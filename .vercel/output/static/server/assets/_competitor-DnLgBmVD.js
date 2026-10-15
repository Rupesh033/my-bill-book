import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as ArrowRight } from "./arrow-right-B4LXPZ0O.js";
import { a as FeatureGrid, i as LandingCta, n as LandingFooter, o as ComparisonTable, r as LandingFaq, s as GitBranch, t as LandingHeader } from "./landing-header-gJENYBij.js";
import { a as comparisonFact, h as SITE, t as ALTERNATIVES, u as HERO } from "./alternatives-content-DJKKrNlM.js";
import { t as Route } from "./_competitor-DKo1y8Ge.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CbLG1PNp.js";
//#region src/features/marketing/components/alternative-page.tsx
var import_jsx_runtime = require_jsx_runtime();
function AlternativePage({ slug }) {
	const alternative = ALTERNATIVES[slug];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden",
					"data-ui": "chrome",
					id: "top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.94_0.02_95),transparent_55%),linear-gradient(180deg,var(--shell-canvas),var(--background)_70%)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 md:py-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-heading text-sm font-medium tracking-wide text-muted-foreground",
								children: [
									SITE.name,
									" vs ",
									alternative.name
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance text-foreground md:text-4xl",
								children: alternative.headline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-base text-pretty text-muted-foreground md:text-lg",
								children: alternative.intro
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
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: HERO.secondaryCta.href,
										rel: "noreferrer",
										target: "_blank",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { "data-icon": "inline-start" }), HERO.secondaryCta.label]
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-4 pb-4",
					"data-ui": "chrome",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							"Pricing model",
							"Self-hostable",
							"Source code available"
						].map((rowLabel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							size: "hero",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-sm text-muted-foreground",
								children: rowLabel
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex flex-col gap-1 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium text-foreground",
									children: [
										SITE.name,
										": ",
										comparisonFact(rowLabel, "HisaabKro")
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground",
									children: [
										alternative.name,
										": ",
										comparisonFact(rowLabel, alternative.name)
									]
								})]
							})]
						}, rowLabel))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonTable, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFaq, {
					id: "faq",
					items: alternative.faq,
					title: `Switching from ${alternative.name}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCta, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, {})
		]
	});
}
//#endregion
//#region src/routes/alternatives/$competitor.tsx?tsr-split=component
function AlternativeRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlternativePage, { slug: Route.useLoaderData().slug });
}
//#endregion
export { AlternativeRoute as component };
