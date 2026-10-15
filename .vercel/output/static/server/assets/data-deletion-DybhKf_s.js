import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CbLG1PNp.js";
//#region src/routes/data-deletion.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function DataDeletionRoute() {
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
							children: "Data Deletion"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Request deletion of your My Bill Book account and associated business data."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "How To Request Deletion"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Send a request from your registered email address to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "font-medium text-foreground underline-offset-4 hover:underline",
							href: "mailto:privacy@hisaabkro.in?subject=HisaabKro%20account%20deletion%20request",
							children: "privacy@hisaabkro.in"
						}),
						". Include your account email and company name so we can verify the workspace."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can also open this page from the My Bill Book mobile app under Settings." })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "What Will Be Deleted"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We will delete or anonymize your user account, login sessions, company workspace data, ledgers, invoices, purchase records, attachments, and related operational records where deletion is legally and technically possible." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Some records may be retained where required for tax, legal, security, fraud-prevention, backup, or dispute-resolution obligations. Backup copies are removed according to the backup retention cycle." })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Need Help?"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "text-sm text-muted-foreground",
					children: [
						"For support, email",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "font-medium text-foreground underline-offset-4 hover:underline",
							href: "mailto:support@hisaabkro.in",
							children: "support@hisaabkro.in"
						}),
						" ",
						"or read the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "font-medium text-foreground underline-offset-4 hover:underline",
							to: "/privacy",
							children: "Privacy Policy"
						}),
						"."
					]
				})] })
			]
		})
	});
}
//#endregion
export { DataDeletionRoute as component };
