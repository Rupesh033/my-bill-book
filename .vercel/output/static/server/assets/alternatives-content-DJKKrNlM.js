//#region src/features/marketing/landing-content.ts
var SITE = {
	name: "My Bill Book",
	url: "http://localhost:3001",
	githubUrl: void 0,
	title: "My Bill Book — Free GST billing & accounting for Indian business",
	description: "Free GST billing, sales, purchases, inventory, party ledgers, and GST returns in one keyboard-first workspace. Proper double-entry books. No license fee.",
	/** Absolute URL for Open Graph / Twitter cards (1200×630). */
	ogImage: "/og-card.png"
};
/** Shared Open Graph + Twitter image tags for marketing pages. */
function buildSocialImageMeta(imageUrl = SITE.ogImage) {
	return [
		{
			property: "og:image",
			content: imageUrl
		},
		{
			property: "og:image:width",
			content: "1200"
		},
		{
			property: "og:image:height",
			content: "630"
		},
		{
			property: "og:image:alt",
			content: SITE.title
		},
		{
			name: "twitter:image",
			content: imageUrl
		}
	];
}
var NAV_LINKS = [
	{
		href: "#features",
		label: "Features"
	},
	{
		href: "#how-it-works",
		label: "How it works"
	},
	{
		href: "#compare",
		label: "Compare"
	},
	{
		href: "#faq",
		label: "FAQ"
	}
];
var HERO = {
	headline: "Free GST billing and accounting for Indian business.",
	subhead: "Sales, purchases, inventory, party ledgers, and GST returns in one workspace — with proper double-entry books underneath. Keyboard-first, so a full invoice takes seconds at the counter.",
	primaryCta: {
		label: "Start free",
		to: "/signup"
	},
	secondaryCta: {
		label: "Sign in",
		href: void 0
	},
	reassurance: "No license fee. No credit card. Self-host it if you prefer."
};
var HOW_IT_WORKS = {
	id: "how-it-works",
	title: "From company setup to GST filing",
	subtitle: "Three steps. The ledger stays balanced at every one of them.",
	steps: [
		{
			title: "Set up your company",
			body: "Enter GSTIN, state, and financial year. Chart of accounts is generated for you."
		},
		{
			title: "Bill and record",
			body: "Sales invoices, purchase bills, payments — each posts double-entry automatically."
		},
		{
			title: "File with confidence",
			body: "GSTR-1, GSTR-3B, HSN summary, and GSTR-2B reconciliation from the same books."
		}
	]
};
var KEYBOARD_SPEED = {
	id: "keyboard-speed",
	title: "Built for the counter PC",
	subtitle: "Desktop-first voucher entry for people who left Tally and Busy for a reason — speed without the license fee.",
	shortcuts: [
		{
			keys: "Tab / Enter",
			action: "Move through line items"
		},
		{
			keys: "⌘K",
			action: "Jump anywhere in the workspace"
		},
		{
			keys: "Esc",
			action: "Close preview without losing focus"
		}
	]
};
var FEATURES = {
	id: "features",
	title: "Everything that posts to the books",
	subtitle: "One workspace for the work you do every day.",
	items: [
		{
			tone: "money-in",
			title: "Sales",
			body: "Tax invoices with place of supply, CGST/SGST/IGST split, and print-ready layout."
		},
		{
			tone: "money-out",
			title: "Purchases & GRN",
			body: "Purchase bills, orders, and goods receipt — stock and payables stay in sync."
		},
		{
			tone: "gst",
			title: "GST & returns",
			body: "HSN summary, GSTR-style reports, and GSTR-2B reconciliation against your books."
		},
		{
			tone: "inventory",
			title: "Inventory & godowns",
			body: "Items with HSN, godowns, and stock that only moves through stock movements."
		},
		{
			tone: "banking",
			title: "Cash & bank",
			body: "Receipts, payments, cash book, and bank reconciliation in one place."
		},
		{
			tone: "foreground",
			title: "Parties & ageing",
			body: "Customers and suppliers with GSTIN, ledger balances, and receivable/payable ageing."
		}
	]
};
var COMPARISON = {
	id: "compare",
	title: "How HisaabKro compares",
	subtitle: "Stable facts only — pricing model and how the software is delivered. Feature checklists go stale; these do not.",
	columns: [
		"",
		"HisaabKro",
		"Tally",
		"Busy",
		"Vyapar",
		"Zoho Books"
	],
	rows: [
		{
			label: "Runs in a browser",
			values: [
				"Yes",
				"Desktop app",
				"Desktop app",
				"App / web",
				"Yes"
			]
		},
		{
			label: "Source code available",
			values: [
				"Yes (MIT)",
				"No",
				"No",
				"No",
				"No"
			]
		},
		{
			label: "Self-hostable",
			values: [
				"Yes",
				"On-prem install",
				"On-prem install",
				"No",
				"No"
			]
		},
		{
			label: "Multi-company",
			values: [
				"Yes",
				"Yes",
				"Yes",
				"Plan-dependent",
				"Plan-dependent"
			]
		},
		{
			label: "Pricing model",
			values: [
				"Free & open source",
				"Paid license",
				"Paid license",
				"Subscription",
				"Subscription"
			]
		}
	]
};
var ROADMAP = {
	id: "roadmap",
	title: "On the roadmap",
	subtitle: "Honest about what is not shipping yet.",
	items: [{
		title: "OCR bill capture",
		body: "Photograph a purchase bill and review extracted fields before posting. Review-and-post already exists; extraction is next."
	}, {
		title: "Android companion app",
		body: "Capture bills away from the counter. Desktop remains the daily workspace."
	}]
};
var FAQ = {
	id: "faq",
	title: "Questions worth asking",
	items: [
		{
			question: "Is HisaabKro really free?",
			answer: "Yes. The software is MIT-licensed open source. There is no license fee and no credit card required to sign up for the hosted app. You can also self-host on Cloudflare Workers and Neon."
		},
		{
			question: "Where is my data stored?",
			answer: "On the hosted service, business data lives in PostgreSQL (Neon). You control what you enter. We do not sell user data. See the privacy policy for details."
		},
		{
			question: "Can I self-host?",
			answer: "Yes. The recommended path is Cloudflare Workers for the app and Neon for PostgreSQL. The repository README covers setup and deploy."
		},
		{
			question: "Does it produce GSTR-1 and GSTR-3B?",
			answer: "Yes. You get GSTR-style reports, HSN summary, and GSTR-2B reconciliation from the same double-entry books that post your invoices and bills."
		},
		{
			question: "Can I run multiple companies?",
			answer: "Yes. Create multiple companies under one account, invite teammates with roles, and switch the active company from the workspace."
		},
		{
			question: "Do I still need a CA?",
			answer: "For filing strategy, notices, and advisory — yes, a CA remains valuable. HisaabKro keeps books, invoices, and GST reports organised so your CA works from clean data rather than chasing WhatsApp photos."
		}
	]
};
var CLOSING_CTA = {
	title: "Start with a free workspace today",
	body: "Create an account, set up your company, and post your first invoice — no license fee.",
	primaryCta: HERO.primaryCta,
	secondaryCta: HERO.secondaryCta
};
function buildFaqJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQ.items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer
			}
		}))
	};
}
function buildSoftwareJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: SITE.name,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "INR"
		},
		description: SITE.description,
		url: SITE.url,
		image: SITE.ogImage
	};
}
//#endregion
//#region src/features/marketing/alternatives-content.ts
var ALTERNATIVE_SLUGS = [
	"tally",
	"busy",
	"vyapar",
	"zoho-books"
];
/**
* Pulls a stable fact straight from the comparison table so alternative
* pages never drift out of sync with the numbers shown on `/`.
*/
function comparisonFact(rowLabel, competitorName) {
	const row = COMPARISON.rows.find((candidate) => candidate.label === rowLabel);
	const columnIndex = COMPARISON.columns.indexOf(competitorName);
	if (!row || columnIndex < 1) throw new Error(`Unknown comparison row/column: ${rowLabel}/${competitorName}`);
	return row.values[columnIndex - 1] ?? "";
}
var ALTERNATIVES_LIST = [
	{
		slug: "tally",
		name: "Tally",
		seoTitle: `Tally alternative — Free, browser-based GST accounting | ${SITE.name}`,
		seoDescription: "Switching off Tally? My Bill Book runs in the browser, is free and open source, and covers GST billing, inventory, and party ledgers.",
		headline: "A Tally alternative that runs in the browser, not just on the counter PC",
		intro: "Tally is a Windows desktop application with a paid, renewable license and no published source code. My Bill Book is the opposite on every one of those points: it runs in any browser, ships as MIT-licensed open source, and can be self-hosted on Cloudflare Workers and Neon if you would rather not use the hosted version. Sales, purchases, inventory, party ledgers, and GST returns work the same way either way.",
		faq: [{
			question: "Can I import my existing Tally data into My Bill Book?",
			answer: "Not yet — there is no automated Tally import tool today. You set up your company fresh (GSTIN, state, financial year) and enter opening balances for parties and stock."
		}, {
			question: "Does My Bill Book work offline like Tally?",
			answer: "No. My Bill Book is a browser-based, always-online workspace. If you self-host it, it runs on your own infrastructure, but it is still a web app, not an offline desktop program."
		}]
	},
	{
		slug: "busy",
		name: "Busy",
		seoTitle: `Busy accounting software alternative — Free GST billing | ${SITE.name}`,
		seoDescription: "Looking for a Busy accounting software alternative? My Bill Book is free, open source, and self-hostable, with GST billing, GRN, and party ledgers in the browser.",
		headline: "A Busy accounting software alternative without the annual license renewal",
		intro: "Like Tally, Busy is an on-premise desktop install sold under a paid license. My Bill Book has no license fee: it is free to use as a hosted app, its source code is published under MIT, and you can self-host it on Cloudflare Workers and Neon. The same voucher-entry speed carries over — sales, purchase bills, goods receipt, and GST reports all post to one double-entry ledger.",
		faq: [{
			question: "Can I import my existing Busy data into My Bill Book?",
			answer: "Not yet — there is no automated Busy import tool today. You set up your company fresh and enter opening balances for parties and stock."
		}, {
			question: "Does My Bill Book support multiple companies like Busy?",
			answer: "Yes. Create multiple companies under one account, invite teammates with roles, and switch the active company from the workspace — no plan upgrade required."
		}]
	},
	{
		slug: "vyapar",
		name: "Vyapar",
		seoTitle: `Vyapar alternative — Free GST billing, no subscription | ${SITE.name}`,
		seoDescription: "A Vyapar alternative for GST billing and inventory with no subscription fee — self-host it or use the free hosted workspace.",
		headline: "A Vyapar alternative with no subscription and no plan-gated features",
		intro: "Vyapar is billed as a subscription, and features like multi-company support are plan-dependent. My Bill Book's core workflow — sales, purchases, GRN, inventory with godowns, and GST returns — is free on every account, with multi-company included from the start. It runs in the browser rather than as a phone-first app, and it is open source if you want to self-host.",
		faq: [{
			question: "Can I import my existing Vyapar data into My Bill Book?",
			answer: "Not yet — there is no automated Vyapar import tool today. You set up your company fresh and enter opening balances for parties and stock."
		}, {
			question: "Is My Bill Book mobile-friendly like the Vyapar app?",
			answer: "My Bill Book is a desktop-first, keyboard-driven browser workspace. It is usable on a phone browser, but the counter-PC voucher entry — the thing it's optimised for — is built for a keyboard."
		}]
	},
	{
		slug: "zoho-books",
		name: "Zoho Books",
		seoTitle: `Zoho Books GST alternative — Free & open source | ${SITE.name}`,
		seoDescription: "A Zoho Books alternative for Indian GST billing that is free, open source, and self-hostable — no per-user subscription.",
		headline: "A Zoho Books alternative built specifically around Indian GST billing",
		intro: "Zoho Books is a general cloud accounting product sold on a subscription, with multi-company support depending on the plan. My Bill Book is purpose-built around the Indian GST billing workflow — CGST/SGST/IGST invoices, HSN summaries, GSTR-2B reconciliation — and is free and open source rather than subscription-based, with multi-company included on every account.",
		faq: [{
			question: "Can I import my existing Zoho Books data into My Bill Book?",
			answer: "Not yet — there is no automated Zoho Books import tool today. You set up your company fresh and enter opening balances for parties and stock."
		}, {
			question: "Is My Bill Book free the way Zoho Books free plan is?",
			answer: "Zoho Books' free plan is limited by invoice count and revenue. My Bill Book's core billing, inventory, and GST reporting workflow has no license fee and no such usage cap."
		}]
	}
];
var ALTERNATIVES = Object.fromEntries(ALTERNATIVES_LIST.map((alternative) => [alternative.slug, alternative]));
function buildAlternativeFaqJsonLd(alternative) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: alternative.faq.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer
			}
		}))
	};
}
function buildAlternativeBreadcrumbJsonLd(alternative) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: `${SITE.url}/`
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Alternatives",
				item: `${SITE.url}/alternatives`
			},
			{
				"@type": "ListItem",
				position: 3,
				name: alternative.name,
				item: `${SITE.url}/alternatives/${alternative.slug}`
			}
		]
	};
}
//#endregion
export { buildSocialImageMeta as _, comparisonFact as a, FAQ as c, HOW_IT_WORKS as d, KEYBOARD_SPEED as f, buildFaqJsonLd as g, SITE as h, buildAlternativeFaqJsonLd as i, FEATURES as l, ROADMAP as m, ALTERNATIVE_SLUGS as n, CLOSING_CTA as o, NAV_LINKS as p, buildAlternativeBreadcrumbJsonLd as r, COMPARISON as s, ALTERNATIVES as t, HERO as u, buildSoftwareJsonLd as v };
