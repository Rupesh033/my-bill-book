import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { t as useSearch } from "./useSearch-CTKPZi5G.js";
import { t as useNavigate } from "./useNavigate-B6w6xlxh.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { a as AuthPage, i as AuthForm, n as AuthFieldGroup, r as AuthFooterText } from "./auth-form-layout-B98DW2xw.js";
//#region src/features/auth/components/reset-password-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordForm() {
	const navigate = useNavigate();
	const token = useSearch({ from: "/reset-password" }).token;
	const [password, setPassword] = import_react.useState("");
	const [confirm, setConfirm] = import_react.useState("");
	const [error, setError] = import_react.useState(null);
	const [isSubmitting, setIsSubmitting] = import_react.useState(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		if (!token) {
			setError("Reset link is invalid or expired.");
			return;
		}
		if (password !== confirm) {
			setError("Passwords do not match.");
			return;
		}
		setIsSubmitting(true);
		const result = await authClient.resetPassword({
			newPassword: password,
			token
		});
		setIsSubmitting(false);
		if (result.error) {
			setError(result.error.message ?? "Unable to reset password.");
			return;
		}
		navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, {
		description: "Choose a strong password you will remember.",
		title: "Set a new password",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthForm, {
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "reset-password",
					label: "New password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "new-password",
						id: "reset-password",
						minLength: 8,
						onChange: (event) => setPassword(event.target.value),
						required: true,
						type: "password",
						value: password
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFieldGroup, {
					htmlFor: "reset-confirm",
					label: "Confirm password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "new-password",
						id: "reset-confirm",
						minLength: 8,
						onChange: (event) => setConfirm(event.target.value),
						required: true,
						type: "password",
						value: confirm
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
					children: isSubmitting ? "Saving..." : "Reset password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFooterText, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "font-medium text-foreground underline-offset-4 hover:underline",
					to: "/login",
					children: "Back to sign in"
				}) })
			]
		})
	});
}
//#endregion
//#region src/routes/reset-password.tsx?tsr-split=component
function ResetPasswordRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPasswordForm, {});
}
//#endregion
export { ResetPasswordRoute as component };
