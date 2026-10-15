import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CbLG1PNp.js";
//#region src/routes/privacy.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var updatedAt = "July 18, 2026";
function PrivacyRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-10 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-3xl flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "My Bill Book"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold tracking-tight",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Last updated: ", updatedAt]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "What We Collect"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "My Bill Book collects account details such as name, email address, login session data, and business workspace information needed to run GST billing, khata, inventory, purchases, and reports." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Users may add company details, GSTIN, party ledgers, invoices, purchase bills, stock records, payments, attachments, and OCR review data. Camera or photo access is requested only when a user chooses to capture or attach bill images." })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "How We Use Data"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Data is used to provide accounting workflows, authenticate users, keep company records, generate invoices and reports, process bill attachments, and maintain security and reliability." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "My Bill Book does not sell user data. Data may be processed by service providers used for hosting, database, authentication, email delivery, storage, analytics, or OCR where required to run the service. We use Google Analytics to understand aggregate website traffic and usage." })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Retention And Deletion"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Business records are retained while the account or workspace is active, or as needed for legal, tax, security, backup, and dispute handling requirements." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"To request account and data deletion, visit",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "font-medium text-foreground underline-offset-4 hover:underline",
							to: "/data-deletion",
							children: "Data Deletion"
						}),
						" ",
						"or email",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "font-medium text-foreground underline-offset-4 hover:underline",
							href: "mailto:privacy@hisaabkro.in",
							children: "privacy@hisaabkro.in"
						}),
						"."
					] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Contact"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "text-sm text-muted-foreground",
					children: [
						"For privacy questions, contact",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "font-medium text-foreground underline-offset-4 hover:underline",
							href: "mailto:privacy@hisaabkro.in",
							children: "privacy@hisaabkro.in"
						}),
						"."
					]
				})] })
			]
		})
	});
}
//#endregion
export { PrivacyRoute as component };
