import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
//#region src/features/auth/components/auth-form-layout.tsx
var import_jsx_runtime = require_jsx_runtime();
function AuthPage({ title, description, children, maxWidth = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-8 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: maxWidth === "lg" ? "w-full max-w-lg" : "w-full max-w-md",
			size: "sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: description })] }), children]
		})
	});
}
function AuthForm({ onSubmit, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: "contents",
		onSubmit,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "flex flex-col gap-3 [&_[data-slot=input]]:h-11 [&_[data-slot=input]]:text-base sm:[&_[data-slot=input]]:text-sm [&_button]:min-h-11",
			children
		})
	});
}
function AuthFieldGroup({ label, htmlFor, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-6 items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium",
				htmlFor,
				children: label
			}), hint]
		}), children]
	});
}
function AuthDivider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: "or"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
		]
	});
}
function AuthFooterText({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-center text-xs text-muted-foreground",
		children
	});
}
//#endregion
export { AuthPage as a, AuthForm as i, AuthFieldGroup as n, AuthFooterText as r, AuthDivider as t };
