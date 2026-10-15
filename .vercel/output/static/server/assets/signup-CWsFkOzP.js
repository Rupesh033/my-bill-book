import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as useNavigate } from "./useNavigate-B6w6xlxh.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { a as AuthPage, i as AuthForm, n as AuthFieldGroup, r as AuthFooterText, t as AuthDivider } from "./auth-form-layout-B98DW2xw.js";
import { n as GoogleSignInButton, t as SHOW_GOOGLE_AUTH } from "./google-auth-B7c23VWf.js";
//#region src/features/auth/components/signup-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function signupErrorMessage(error) {
	const message = error.message ?? "";
	if (/internal server error|database|relation|migrate|econnrefused|failed query|does not exist/i.test(message)) return "Account setup failed. Ensure the database is migrated (`bun run db:push`).";
	return message || "Unable to create account.";
}
function SignupForm() {
	const navigate = useNavigate();
	const [name, setName] = import_react.useState("");
	const [email, setEmail] = import_react.useState("");
	const [password, setPassword] = import_react.useState("");
	const [error, setError] = import_react.useState(null);
	const [isSubmitting, setIsSubmitting] = import_react.useState(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		const result = await authClient.signUp.email({
			name,
			email,
			password
		});
		setIsSubmitting(false);
		if (result.error) {
			setError(signupErrorMessage(result.error));
			return;
		}
		navigate({ to: "/onboarding" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, {
		description: "Start a My Bill Book workspace for GST-ready books and inventory.",
		title: "Create account",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthForm, {
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "signup-name",
					label: "Full name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "name",
						id: "signup-name",
						onChange: (event) => setName(event.target.value),
						placeholder: "Your full name",
						required: true,
						type: "text",
						value: name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "signup-email",
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "email",
						id: "signup-email",
						onChange: (event) => setEmail(event.target.value),
						placeholder: "you@business.com",
						required: true,
						type: "email",
						value: email
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "signup-password",
					label: "Password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "new-password",
						id: "signup-password",
						minLength: 8,
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
					children: isSubmitting ? "Creating account..." : "Create account"
				}),
				SHOW_GOOGLE_AUTH ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDivider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignInButton, { label: "Sign up with Google" })] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthFooterText, { children: [
					"Already have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/login",
						children: "Sign in"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthFooterText, { children: [
					"By creating an account, you agree to My Bill Book handling your data as described in the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/privacy",
						children: "Privacy Policy"
					}),
					". You can request deletion from the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-foreground underline-offset-4 hover:underline",
						to: "/data-deletion",
						children: "Data Deletion page"
					}),
					"."
				] })
			]
		})
	});
}
//#endregion
//#region src/routes/signup.tsx?tsr-split=component
function SignupRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupForm, {});
}
//#endregion
export { SignupRoute as component };
