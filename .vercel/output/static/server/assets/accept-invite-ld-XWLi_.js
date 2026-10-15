import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as useSearch } from "./useSearch-CTKPZi5G.js";
import { t as useNavigate } from "./useNavigate-B6w6xlxh.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { t as WORKSPACE_COMPANY_KEY } from "./workspace-WPPJL99J.js";
//#region src/features/team/components/accept-invite-panel.tsx
var import_jsx_runtime = require_jsx_runtime();
function AcceptInvitePanel() {
	const navigate = useNavigate();
	const trpc = useTRPC();
	const { token } = useSearch({ from: "/accept-invite" });
	const acceptInvite = useMutation(trpc.team.acceptInvite.mutationOptions());
	async function handleAccept() {
		if (!token) {
			toast.error("This invite link is invalid.");
			return;
		}
		try {
			const result = await acceptInvite.mutateAsync({ token });
			window.localStorage.setItem(WORKSPACE_COMPANY_KEY, result.companyId);
			navigate({ to: "/app/dashboard" });
		} catch (err) {
			toastActionError(err, "Unable to accept invite");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Join company"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Accept your invitation to access the company books." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "flex flex-col gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Click accept to join the workspace you were invited to."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: acceptInvite.isPending || !token,
					onClick: () => void handleAccept(),
					children: acceptInvite.isPending ? "Joining…" : "Accept invite"
				}) })
			]
		})
	});
}
//#endregion
//#region src/routes/accept-invite.tsx?tsr-split=component
function AcceptInviteRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcceptInvitePanel, {});
}
//#endregion
export { AcceptInviteRoute as component };
