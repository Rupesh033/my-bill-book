import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Check } from "./check-C418P8rt.js";
import { t as ScanText } from "./scan-text-DStU9XQj.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { c as ocrDraftBadgeIntent } from "./badge-intent-BgU9wzdu.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function OcrReviewPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, company, ledgerBySystemKey, isReady } = useWorkspace();
	const draftsQuery = useQuery({
		...trpc.ocr.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const confirmMutation = useMutation(trpc.ocr.confirm.mutationOptions());
	async function handleConfirm(draftId) {
		if (!requireWorkspace(companyId, isReady) || !company) return;
		const purchaseAccountId = ledgerBySystemKey.purchase;
		const inputGstAccountId = ledgerBySystemKey.input_gst;
		const payableAccountId = ledgerBySystemKey.supplier_payable;
		const stockAccountId = ledgerBySystemKey.stock_in_hand;
		if (!purchaseAccountId || !inputGstAccountId || !payableAccountId || !stockAccountId) {
			toast.error("Ledger mappings required before posting OCR bills");
			return;
		}
		try {
			await confirmMutation.mutateAsync({
				companyId,
				draftId,
				companyStateCode: company.stateCode,
				financialYearStart: company.financialYearStart,
				purchaseAccountId,
				inputGstAccountId,
				payableAccountId,
				stockAccountId
			});
			await queryClient.invalidateQueries({ queryKey: trpc.ocr.list.queryKey({ companyId }) });
			await queryClient.invalidateQueries({ queryKey: trpc.purchases.list.queryKey() });
			toast.success("Purchase bill posted from OCR draft.");
		} catch (err) {
			toastActionError(err, "Failed to confirm OCR draft");
		}
	}
	const drafts = (draftsQuery.data ?? []).filter((draft) => draft.status !== "posted");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Review OCR-extracted purchase bills before posting.",
		title: "OCR review",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "flex items-center gap-2 text-base",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanText, { className: "size-4 text-muted-foreground" }), "Draft purchase bills"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Confirm posts a purchase bill from extracted header fields" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Supplier" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Bill" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Taxable" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GST" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Total" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: draftsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 8,
				children: "Loading OCR drafts…"
			}) }) : drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 8,
				children: "No OCR drafts awaiting review."
			}) }) : drafts.map((draft) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: draft.fields.supplierName.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: draft.fields.supplierGstin.value || "No GSTIN"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: draft.fields.billNumber.value }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: draft.fields.billDate.value }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(draft.fields.taxableAmount.value) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(draft.fields.gstAmount.value) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(draft.fields.totalAmount.value) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: ocrDraftBadgeIntent({
						lowConfidence: draft.lowConfidenceFields.length > 0,
						status: draft.status
					}),
					children: draft.lowConfidenceFields.length > 0 ? "Low confidence" : draft.status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: confirmMutation.isPending,
					onClick: () => handleConfirm(draft.id),
					size: "sm",
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "data-icon": "inline-start" }), "Confirm & post"]
				}) })
			] }, draft.id)) })] })
		})] })
	});
}
//#endregion
//#region src/routes/app/ocr.tsx?tsr-split=component
function OcrRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OcrReviewPanel, {});
}
//#endregion
export { OcrRoute as component };
