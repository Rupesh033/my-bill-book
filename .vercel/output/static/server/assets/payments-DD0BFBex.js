import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Banknote } from "./banknote-DNTmPRpG.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { i as requirePositiveAmount, n as requireAmountNotExceeding, o as requireSelection, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { u as paymentStatusBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
//#region src/features/payments/components/payments-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PaymentsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, ledgerBySystemKey, isReady } = useWorkspace();
	const [mode, setMode] = import_react.useState("receipts");
	const [open, setOpen] = import_react.useState(false);
	const [documentId, setDocumentId] = import_react.useState("");
	const [amount, setAmount] = import_react.useState("");
	const [date, setDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
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
	const allocateReceipt = useMutation(trpc.payments.allocateCustomerReceipt.mutationOptions());
	const allocatePayment = useMutation(trpc.payments.allocateSupplierPayment.mutationOptions());
	const partyName = import_react.useMemo(() => {
		const map = new Map((partiesQuery.data ?? []).map((party) => [party.id, party.name]));
		return (id) => map.get(id) ?? id.slice(0, 8);
	}, [partiesQuery.data]);
	const openSales = (salesQuery.data ?? []).filter((row) => row.paymentStatus !== "Paid");
	const openPurchases = (purchasesQuery.data ?? []).filter((row) => row.paymentStatus !== "Paid");
	async function handleAllocate(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId, isReady)) return;
		const selectedDocumentId = requireSelection(documentId, "a document");
		if (!selectedDocumentId) return;
		const paymentAmount = requirePositiveAmount(amount, "Amount");
		if (!paymentAmount) return;
		const selectedDoc = mode === "receipts" ? openSales.find((row) => row.id === selectedDocumentId) : openPurchases.find((row) => row.id === selectedDocumentId);
		if (selectedDoc && !requireAmountNotExceeding(paymentAmount, selectedDoc.outstandingAmount, mode === "receipts" ? "Receipt" : "Payment")) return;
		let nextOutstanding = "";
		let nextStatus = "Pending";
		if (selectedDoc) {
			nextOutstanding = (Number(selectedDoc.outstandingAmount) - Number(paymentAmount)).toFixed(2);
			nextStatus = Number(nextOutstanding) <= 0 ? "Paid" : nextOutstanding === selectedDoc.totalAmount ? "Pending" : "Part paid";
		}
		setOpen(false);
		try {
			if (mode === "receipts") {
				if (!ledgerBySystemKey.cash || !ledgerBySystemKey.customer_receivable) throw new Error("Cash / receivable ledgers missing");
				const queryKey = trpc.sales.list.queryKey({ companyId });
				const previousRows = queryClient.getQueryData(queryKey);
				if (selectedDoc) queryClient.setQueryData(queryKey, (rows) => rows?.map((row) => row.id === selectedDocumentId ? {
					...row,
					outstandingAmount: nextOutstanding,
					paymentStatus: nextStatus
				} : row));
				try {
					await allocateReceipt.mutateAsync({
						companyId,
						invoiceId: selectedDocumentId,
						amount: paymentAmount,
						receiptDate: date,
						cashAccountId: ledgerBySystemKey.cash,
						receivableAccountId: ledgerBySystemKey.customer_receivable
					});
					await queryClient.invalidateQueries({ queryKey });
				} catch (err) {
					queryClient.setQueryData(queryKey, previousRows);
					throw err;
				}
			} else {
				if (!ledgerBySystemKey.cash || !ledgerBySystemKey.supplier_payable) throw new Error("Cash / payable ledgers missing");
				const queryKey = trpc.purchases.list.queryKey({ companyId });
				const previousRows = queryClient.getQueryData(queryKey);
				if (selectedDoc) queryClient.setQueryData(queryKey, (rows) => rows?.map((row) => row.id === selectedDocumentId ? {
					...row,
					outstandingAmount: nextOutstanding,
					paymentStatus: nextStatus
				} : row));
				try {
					await allocatePayment.mutateAsync({
						companyId,
						purchaseBillId: selectedDocumentId,
						amount: paymentAmount,
						paymentDate: date,
						cashAccountId: ledgerBySystemKey.cash,
						payableAccountId: ledgerBySystemKey.supplier_payable
					});
					await queryClient.invalidateQueries({ queryKey });
				} catch (err) {
					queryClient.setQueryData(queryKey, previousRows);
					throw err;
				}
			}
			setDocumentId("");
			setAmount("");
			toast.success(mode === "receipts" ? "Receipt posted" : "Payment posted");
		} catch (err) {
			toastActionError(err, "Allocation failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			onOpenChange: setOpen,
			open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), mode === "receipts" ? "Receive payment" : "Make payment"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: mode === "receipts" ? "Customer receipt" : "Supplier payment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Allocate amount against an open document and post to ledger." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: handleAllocate,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Document"
						}), (mode === "receipts" ? openSales : openPurchases).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-dashed bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground",
							children: mode === "receipts" ? "No open credit invoices. Create a credit sale first." : "No open purchase bills with balance due."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: setDocumentId,
							value: documentId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select document" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: mode === "receipts" ? openSales.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: row.id,
								children: [
									row.invoiceNumber,
									" · due",
									" ",
									formatInr(row.outstandingAmount)
								]
							}, row.id)) : openPurchases.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: row.id,
								children: [
									row.supplierBillNumber,
									" · due",
									" ",
									formatInr(row.outstandingAmount)
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
								htmlFor: "pay-amt",
								children: "Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "pay-amt",
								onChange: (event) => setAmount(event.target.value),
								required: true,
								value: amount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "pay-date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
								id: "pay-date",
								onChange: setDate,
								required: true,
								value: date
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: (mode === "receipts" ? openSales : openPurchases).length === 0,
						type: "submit",
						children: "Post allocation"
					}) })
				]
			})] })]
		}),
		description: "Customer receipts and supplier payments against open invoices and bills.",
		title: "Payments",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4 text-muted-foreground" }), "Open balances"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Allocate receipts and payments to update Paid / Part paid status" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				onValueChange: (value) => setMode(value),
				value: mode,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "receipts",
					children: "Receipts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "payments",
					children: "Payments"
				})] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Document" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Party" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Total" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Outstanding" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [mode === "receipts" ? openSales.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: row.invoiceNumber
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: partyName(row.customerId) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.totalAmount) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium text-money-in",
					children: formatInr(row.outstandingAmount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: paymentStatusBadgeIntent(row.paymentStatus),
					children: row.paymentStatus
				}) })
			] }, row.id)) : openPurchases.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: row.supplierBillNumber
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: partyName(row.supplierId) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.totalAmount) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium text-money-out",
					children: formatInr(row.outstandingAmount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: paymentStatusBadgeIntent(row.paymentStatus),
					children: row.paymentStatus
				}) })
			] }, row.id)), (mode === "receipts" ? openSales : openPurchases).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 5,
				children: "No open documents."
			}) }) : null] })] })
		})] })
	});
}
//#endregion
//#region src/routes/app/payments.tsx?tsr-split=component
function PaymentsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentsPanel, {});
}
//#endregion
export { PaymentsRoute as component };
