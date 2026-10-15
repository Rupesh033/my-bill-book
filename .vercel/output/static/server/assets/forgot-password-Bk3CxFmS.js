import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { n as CardContent } from "./card-CbLG1PNp.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { a as AuthPage, i as AuthForm, n as AuthFieldGroup, r as AuthFooterText } from "./auth-form-layout-B98DW2xw.js";
//#region src/features/auth/components/forgot-password-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordForm() {
	const [email, setEmail] = import_react.useState("");
	const [sent, setSent] = import_react.useState(false);
	const [error, setError] = import_react.useState(null);
	const [isSubmitting, setIsSubmitting] = import_react.useState(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		const result = await authClient.requestPasswordReset({
			email,
			redirectTo: "/reset-password"
		});
		setIsSubmitting(false);
		if (result.error) {
			setError(result.error.message ?? "Unable to send reset link.");
			return;
		}
		setSent(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, {
		description: "Enter your email and we will send a reset link.",
		title: "Reset password",
		children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"If an account exists for ",
					email,
					", a reset link is on its way. Check your inbox."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Back to sign in"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthForm, {
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "forgot-email",
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "email",
						id: "forgot-email",
						onChange: (event) => setEmail(event.target.value),
						placeholder: "you@business.com",
						required: true,
						type: "email",
						value: email
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-destructive",
					role: "alert",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: isSubmitting,
					type: "submit",
					children: isSubmitting ? "Sending..." : "Send reset link"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthFooterText, { children: [
					"Remembered it?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/login",
						children: "Sign in"
					})
				] })
			]
		})
	});
}
//#endregion
//#region src/routes/forgot-password.tsx?tsr-split=component
function ForgotPasswordRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordForm, {});
}
//#endregion
export { ForgotPasswordRoute as component };
