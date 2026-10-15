import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as useNavigate } from "./useNavigate-B6w6xlxh.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { a as AuthPage, i as AuthForm, n as AuthFieldGroup, r as AuthFooterText, t as AuthDivider } from "./auth-form-layout-B98DW2xw.js";
import { n as GoogleSignInButton, t as SHOW_GOOGLE_AUTH } from "./google-auth-B7c23VWf.js";
//#region src/features/auth/components/login-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function LoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = import_react.useState("");
	const [password, setPassword] = import_react.useState("");
	const [error, setError] = import_react.useState(null);
	const [isSubmitting, setIsSubmitting] = import_react.useState(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		const result = await authClient.signIn.email({
			email,
			password
		});
		setIsSubmitting(false);
		if (result.error) {
			setError(result.error.message ?? "Unable to sign in.");
			return;
		}
		navigate({ to: "/app/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, {
		description: "Access your My Bill Book workspace and company ledgers.",
		title: "Sign in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthForm, {
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "login-email",
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "email",
						id: "login-email",
						onChange: (event) => setEmail(event.target.value),
						placeholder: "you@business.com",
						required: true,
						type: "email",
						value: email
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "inline-flex min-h-6 items-center py-1 text-xs text-muted-foreground underline-offset-4 hover:underline",
						to: "/forgot-password",
						children: "Forgot password?"
					}),
					htmlFor: "login-password",
					label: "Password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "current-password",
						id: "login-password",
						onChange: (event) => setPassword(event.target.value),
						required: true,
						type: "password",
						value: password
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
					children: isSubmitting ? "Signing in..." : "Sign in"
				}),
				SHOW_GOOGLE_AUTH ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDivider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignInButton, { label: "Continue with Google" })] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthFooterText, { children: [
					"Need an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/signup",
						children: "Create one"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthFooterText, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/privacy",
						children: "Privacy"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/data-deletion",
						children: "Data deletion"
					})
				] })
			]
		})
	});
}
//#endregion
//#region src/routes/login.tsx?tsr-split=component
function LoginRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {});
}
//#endregion
export { LoginRoute as component };
