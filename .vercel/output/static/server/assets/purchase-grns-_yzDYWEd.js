import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as FileText } from "./file-text-zocqyWAx.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { o as requireSelection, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { f as workflowStatusBadgeIntent } from "./badge-intent-BgU9wzdu.js";
//#region src/features/purchases/components/purchase-grns-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PurchaseGrnsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, godowns, isReady } = useWorkspace();
	const [grnNumber, setGrnNumber] = import_react.useState("");
	const [grnDate, setGrnDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [purchaseOrderId, setPurchaseOrderId] = import_react.useState("");
	const [godownName, setGodownName] = import_react.useState("");
	const grnsQuery = useQuery({
		...trpc.purchaseGrns.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const ordersQuery = useQuery({
		...trpc.purchaseOrders.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const receiveFromPo = useMutation(trpc.purchaseGrns.receiveFromPurchaseOrder.mutationOptions());
	const openOrders = (ordersQuery.data ?? []).filter((order) => order.status === "open");
	const godownNames = godowns.map((entry) => entry.name);
	import_react.useEffect(() => {
		if (!purchaseOrderId && openOrders[0]) setPurchaseOrderId(openOrders[0].id);
		if (!godownName && godownNames[0]) setGodownName(godownNames[0]);
	}, [
		openOrders,
		purchaseOrderId,
		godownName,
		godownNames
	]);
	async function handleReceive(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId, isReady)) return;
		const selectedPoId = requireSelection(purchaseOrderId, "a purchase order");
		if (!selectedPoId) return;
		try {
			await receiveFromPo.mutateAsync({
				companyId,
				purchaseOrderId: selectedPoId,
				grnNumber: grnNumber.trim() || `GRN-${Date.now()}`,
				grnDate,
				godownName: godownName || void 0
			});
			await queryClient.invalidateQueries({ queryKey: trpc.purchaseGrns.list.queryKey({ companyId }) });
			await queryClient.invalidateQueries({ queryKey: trpc.purchaseOrders.list.queryKey({ companyId }) });
			setGrnNumber("");
			toast.success("Goods received into stock.");
		} catch (err) {
			toastActionError(err, "Receive failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Goods receipt notes record stock-in from purchase orders.",
		title: "Purchase GRNs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Receive from PO"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Posts stock-in without a purchase bill. Convert to bill when the supplier invoice arrives." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: handleReceive,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						onValueChange: setPurchaseOrderId,
						value: purchaseOrderId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Open purchase order" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: openOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: order.id,
							children: order.orderNumber
						}, order.id)) }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						onChange: (event) => setGrnNumber(event.target.value),
						placeholder: "GRN number (optional)",
						value: grnNumber
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
						onChange: setGrnDate,
						placeholder: "GRN date",
						value: grnDate
					}),
					godownNames.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						onValueChange: setGodownName,
						value: godownName,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Godown" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: godownNames.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: name,
							children: name
						}, name)) }) })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: receiveFromPo.isPending,
						type: "submit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "Receive goods"]
					})
				]
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "GRN register"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Received goods awaiting purchase bills." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Number" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Amount"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (grnsQuery.data ?? []).map((grn) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: grn.grnNumber }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: grn.grnDate }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: workflowStatusBadgeIntent(grn.status),
					children: grn.status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: formatInr(grn.totalAmount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: grn.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							search: { fromGrn: grn.id },
							to: "/app/purchases/new",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { "data-icon": "inline-start" }), "Convert to bill"]
						})
					}) : null
				})
			] }, grn.id)) })] }) })] })]
		})
	});
}
//#endregion
//#region src/routes/app/purchase-grns.tsx?tsr-split=component
function PurchaseGrnsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseGrnsPanel, {});
}
//#endregion
export { PurchaseGrnsRoute as component };
