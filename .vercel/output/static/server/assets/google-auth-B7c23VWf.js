import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as env } from "./env-E9B1zFDb.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { t as Button } from "./button-CwLzwKUP.js";
//#region src/features/auth/components/google-sign-in-button.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GoogleSignInButton({ label }) {
	const [isPending, setIsPending] = import_react.useState(false);
	async function handleGoogle() {
		setIsPending(true);
		try {
			const { error } = await authClient.signIn.social({
				provider: "google",
				callbackURL: "/app/dashboard"
			});
			if (error) toast.error("Google sign-in is unavailable. Use email and password.");
		} catch {
			toast.error("Google sign-in failed. Try again or use email.");
		} finally {
			setIsPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		className: "w-full",
		disabled: isPending,
		onClick: () => void handleGoogle(),
		type: "button",
		variant: "outline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			"aria-hidden": true,
			className: "size-4",
			viewBox: "0 0 24 24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z",
					fill: "#4285F4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z",
					fill: "#34A853"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z",
					fill: "#FBBC05"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z",
					fill: "#EA4335"
				})
			]
		}), label]
	});
}
//#endregion
//#region src/features/auth/google-auth.ts
/**
* Google sign-in is on by default so a fresh clone works without setup. Only
* an explicit `false` turns it off, which is what `bun run deploy` sets for the
* Cloudflare build — the flag is inlined by Vite, so it has to be present at
* build time rather than as a Worker secret.
*/
function isGoogleAuthEnabled(flag) {
	return flag !== "false";
}
var SHOW_GOOGLE_AUTH = isGoogleAuthEnabled(env.VITE_ENABLE_GOOGLE_AUTH);
//#endregion
export { GoogleSignInButton as n, SHOW_GOOGLE_AUTH as t };
