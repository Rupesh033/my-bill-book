import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Undo2 } from "./undo-2-fXpaXzDi.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { a as requirePositiveQuantity, o as requireSelection, s as requireStateCode, u as requireWorkspace, v as resolveStateCode } from "./form-validation-CiOjD7zS.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
//#region src/features/returns/components/returns-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ReturnsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, company, ledgerBySystemKey, isReady } = useWorkspace();
	const [mode, setMode] = import_react.useState("sales");
	const [documentId, setDocumentId] = import_react.useState("");
	const [quantity, setQuantity] = import_react.useState("1");
	const [returnDate, setReturnDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [message, setMessage] = import_react.useState(null);
	const salesQuery = useQuery({
		...trpc.sales.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const purchasesQuery = useQuery({
		...trpc.purchases.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const partiesQuery = useQuery({
		...trpc.parties.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const postSalesReturn = useMutation(trpc.returns.postSalesReturn.mutationOptions());
	const postPurchaseReturn = useMutation(trpc.returns.postPurchaseReturn.mutationOptions());
	const selectedSales = (salesQuery.data ?? []).find((row) => row.id === documentId);
	const selectedPurchase = (purchasesQuery.data ?? []).find((row) => row.id === documentId);
	async function handleReturn(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId, isReady) || !company) return;
		if (!requireSelection(documentId, mode === "sales" ? "a sales invoice" : "a purchase bill")) return;
		const returnQuantity = requirePositiveQuantity(quantity, "Return quantity");
		if (!returnQuantity) return;
		const companyStateCode = resolveStateCode(company.stateCode, "27");
		if (!requireStateCode(companyStateCode, "Company state")) return;
		setMessage(null);
		try {
			if (mode === "sales") {
				if (!selectedSales?.lines[0]) {
					toast.error("Selected invoice has no line items.");
					return;
				}
				const line = selectedSales.lines[0];
				const customerStateCode = resolveStateCode((partiesQuery.data ?? []).find((entry) => entry.id === selectedSales.customerId)?.stateCode, companyStateCode);
				if (!requireStateCode(customerStateCode, "Customer state")) return;
				if (!ledgerBySystemKey.sales || !ledgerBySystemKey.output_gst || !ledgerBySystemKey.customer_receivable) {
					toast.error("Sales ledger mappings are missing for this company.");
					return;
				}
				const salesReturn = await postSalesReturn.mutateAsync({
					companyId,
					companyStateCode,
					customerId: selectedSales.customerId,
					customerStateCode,
					salesInvoiceId: selectedSales.id,
					returnDate,
					salesAccountId: ledgerBySystemKey.sales,
					outputGstAccountId: ledgerBySystemKey.output_gst,
					receivableAccountId: ledgerBySystemKey.customer_receivable,
					lines: [{
						itemId: line.itemId,
						description: line.description,
						quantity: returnQuantity,
						unit: line.unit,
						rate: line.rate,
						gstRate: line.gstRate
					}]
				});
				await queryClient.invalidateQueries({ queryKey: trpc.inventory.listStockBalances.queryKey({ companyId }) });
				toast.success(`Credit note ${salesReturn.noteNumber} posted for ${selectedSales.invoiceNumber}.`);
				setMessage(`Credit note ${salesReturn.noteNumber} posted for ${selectedSales.invoiceNumber}`);
			} else {
				if (!selectedPurchase?.lines[0]) {
					toast.error("Selected bill has no line items.");
					return;
				}
				const line = selectedPurchase.lines[0];
				const supplierStateCode = resolveStateCode((partiesQuery.data ?? []).find((entry) => entry.id === selectedPurchase.supplierId)?.stateCode, companyStateCode);
				if (!requireStateCode(supplierStateCode, "Supplier state")) return;
				if (!ledgerBySystemKey.purchase || !ledgerBySystemKey.input_gst || !ledgerBySystemKey.supplier_payable) {
					toast.error("Purchase ledger mappings are missing for this company.");
					return;
				}
				const purchaseReturn = await postPurchaseReturn.mutateAsync({
					companyId,
					companyStateCode,
					supplierId: selectedPurchase.supplierId,
					supplierStateCode,
					purchaseBillId: selectedPurchase.id,
					returnDate,
					purchaseAccountId: ledgerBySystemKey.purchase,
					inputGstAccountId: ledgerBySystemKey.input_gst,
					payableAccountId: ledgerBySystemKey.supplier_payable,
					lines: [{
						itemId: line.itemId,
						description: line.description,
						quantity: returnQuantity,
						unit: line.unit,
						rate: line.rate,
						gstRate: line.gstRate
					}]
				});
				await queryClient.invalidateQueries({ queryKey: trpc.inventory.listStockBalances.queryKey({ companyId }) });
				toast.success(`Debit note ${purchaseReturn.noteNumber} posted for ${selectedPurchase.supplierBillNumber}.`);
				setMessage(`Debit note ${purchaseReturn.noteNumber} posted for ${selectedPurchase.supplierBillNumber}`);
			}
		} catch (err) {
			toastActionError(err, "Return failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Sales and purchase returns reverse stock and GST through the ledger engine.",
		title: "Returns",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4 text-muted-foreground" }), "Return / note entry"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Returns first line of the selected document for a quick MVP flow" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				onValueChange: (value) => {
					setMode(value);
					setDocumentId("");
				},
				value: mode,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "sales",
					children: "Sales return"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "purchase",
					children: "Purchase return"
				})] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid max-w-xl gap-4",
			onSubmit: handleReturn,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: mode === "sales" ? "Sales invoice" : "Purchase bill"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						onValueChange: setDocumentId,
						value: documentId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select document" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: mode === "sales" ? (salesQuery.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: row.id,
							children: [
								row.invoiceNumber,
								" · ",
								formatInr(row.totalAmount)
							]
						}, row.id)) : (purchasesQuery.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: row.id,
							children: [
								row.supplierBillNumber,
								" ·",
								" ",
								formatInr(row.totalAmount)
							]
						}, row.id)) }) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "ret-qty",
							children: "Return qty (first line)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ret-qty",
							onChange: (event) => setQuantity(event.target.value),
							required: true,
							value: quantity
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "ret-date",
							children: "Return date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
							id: "ret-date",
							onChange: setReturnDate,
							required: true,
							value: returnDate
						})]
					})]
				}),
				message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: message
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: postSalesReturn.isPending || postPurchaseReturn.isPending,
					type: "submit",
					children: "Post return"
				})
			]
		}) })] })
	});
}
//#endregion
//#region src/routes/app/returns.tsx?tsr-split=component
function ReturnsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnsPanel, {});
}
//#endregion
export { ReturnsRoute as component };
