import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as PackageCheck } from "./package-check-DKbrg5Od.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { t as Trash2 } from "./trash-2-Cksi9pld.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { a as requirePositiveQuantity, o as requireSelection, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { f as workflowStatusBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as FieldGroup } from "./field-label-BdgJL0e2.js";
//#region src/features/purchases/components/purchase-orders-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function createEmptyPurchaseOrderLine() {
	return {
		key: crypto.randomUUID(),
		itemId: "",
		quantity: "1",
		rate: ""
	};
}
function PurchaseOrdersPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, godowns, isReady } = useWorkspace();
	const [orderNumber, setOrderNumber] = import_react.useState("");
	const [orderDate, setOrderDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [supplierId, setSupplierId] = import_react.useState("");
	const [lines, setLines] = import_react.useState([createEmptyPurchaseOrderLine()]);
	const ordersQuery = useQuery({
		...trpc.purchaseOrders.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const partiesQuery = useQuery({
		...trpc.parties.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const itemsQuery = useQuery({
		...trpc.inventory.listItems.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const createOrder = useMutation(trpc.purchaseOrders.create.mutationOptions());
	const receiveFromPo = useMutation(trpc.purchaseGrns.receiveFromPurchaseOrder.mutationOptions());
	const godownNames = godowns.map((entry) => entry.name);
	const suppliers = (partiesQuery.data ?? []).filter((party) => party.partyType === "supplier" || party.partyType === "both");
	const items = itemsQuery.data ?? [];
	import_react.useEffect(() => {
		if (!supplierId && suppliers[0]) setSupplierId(suppliers[0].id);
	}, [suppliers, supplierId]);
	import_react.useEffect(() => {
		if (!items[0]) return;
		setLines((current) => {
			if (current[0]?.itemId) return current;
			return current.map((line, index) => index === 0 ? {
				...line,
				itemId: items[0].id,
				rate: items[0].purchaseRate
			} : line);
		});
	}, [items]);
	function updateLine(index, patch) {
		setLines((current) => current.map((line, lineIndex) => lineIndex === index ? {
			...line,
			...patch
		} : line));
	}
	function addLine() {
		const nextItem = items[0];
		setLines((current) => [...current, {
			...createEmptyPurchaseOrderLine(),
			itemId: nextItem?.id ?? "",
			rate: nextItem?.purchaseRate ?? ""
		}]);
	}
	function removeLine(index) {
		setLines((current) => current.length > 1 ? current.filter((_, lineIndex) => lineIndex !== index) : current);
	}
	async function handleCreate(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId, isReady)) return;
		const selectedSupplierId = requireSelection(supplierId, "a supplier");
		if (!selectedSupplierId) return;
		const payloadLines = [];
		for (const line of lines) {
			const item = items.find((entry) => entry.id === line.itemId);
			if (!item) continue;
			const lineQuantity = requirePositiveQuantity(line.quantity, "Quantity");
			if (!lineQuantity) return;
			payloadLines.push({
				itemId: item.id,
				description: item.name,
				quantity: lineQuantity,
				unit: item.baseUnit,
				rate: line.rate || item.purchaseRate,
				gstRate: item.gstRate
			});
		}
		if (payloadLines.length === 0) {
			toast.error("Add at least one item.");
			return;
		}
		try {
			await createOrder.mutateAsync({
				companyId,
				supplierId: selectedSupplierId,
				orderNumber: orderNumber.trim() || `PO-${Date.now()}`,
				orderDate,
				lines: payloadLines
			});
			await queryClient.invalidateQueries({ queryKey: trpc.purchaseOrders.list.queryKey({ companyId }) });
			setOrderNumber("");
			setLines([{
				...createEmptyPurchaseOrderLine(),
				itemId: items[0]?.id ?? "",
				rate: items[0]?.purchaseRate ?? ""
			}]);
			toast.success("Purchase order created.");
		} catch (err) {
			toastActionError(err, "Create failed");
		}
	}
	async function handleReceive(orderId) {
		if (!requireWorkspace(companyId, isReady)) return;
		if (!godownNames[0]) {
			toast.error("Add a godown before receiving stock.");
			return;
		}
		try {
			await receiveFromPo.mutateAsync({
				companyId,
				purchaseOrderId: orderId,
				grnNumber: `GRN-${Date.now()}`,
				grnDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				godownName: godownNames[0]
			});
			await queryClient.invalidateQueries({ queryKey: trpc.purchaseOrders.list.queryKey({ companyId }) });
			await queryClient.invalidateQueries({ queryKey: trpc.purchaseGrns.list.queryKey({ companyId }) });
			toast.success("Goods received into stock.");
		} catch (err) {
			toastActionError(err, "Receive failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Purchase orders without ledger posting or stock movement.",
		title: "Purchase orders",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "New purchase order"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Commitment to supplier — convert to purchase bill when goods arrive." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: handleCreate,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
						label: "PO number",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							onChange: (event) => setOrderNumber(event.target.value),
							placeholder: "Auto if blank",
							value: orderNumber
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
						label: "Order date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
							onChange: setOrderDate,
							value: orderDate
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
						label: "Supplier",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: setSupplierId,
							value: supplierId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select supplier" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: suppliers.map((party) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: party.id,
								children: party.name
							}, party.id)) }) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 rounded-lg bg-muted/40 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-medium",
										children: ["Line ", index + 1]
									}), lines.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => removeLine(index),
										size: "icon",
										type: "button",
										variant: "ghost",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
									label: "Item",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										onValueChange: (value) => {
											updateLine(index, {
												itemId: value,
												rate: items.find((entry) => entry.id === value)?.purchaseRate ?? line.rate
											});
										},
										value: line.itemId,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select item" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: item.id,
											children: item.name
										}, item.id)) }) })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
										label: "Quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											onChange: (event) => updateLine(index, { quantity: event.target.value }),
											value: line.quantity
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
										label: "Rate",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											onChange: (event) => updateLine(index, { rate: event.target.value }),
											value: line.rate
										})
									})]
								})
							]
						}, line.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: addLine,
							type: "button",
							variant: "outline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "Add line"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: createOrder.isPending,
						type: "submit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "Create PO"]
					})
				]
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Open orders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Non-posted purchase orders." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Number" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Amount"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (ordersQuery.data ?? []).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.orderNumber }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.orderDate }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: workflowStatusBadgeIntent(order.status),
					children: order.status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: formatInr(order.totalAmount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: order.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: receiveFromPo.isPending,
						onClick: () => handleReceive(order.id),
						size: "sm",
						type: "button",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { "data-icon": "inline-start" }), "Receive (GRN)"]
					}) : null
				})
			] }, order.id)) })] }) })] })]
		})
	});
}
//#endregion
//#region src/routes/app/purchase-orders.tsx?tsr-split=component
function PurchaseOrdersRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseOrdersPanel, {});
}
//#endregion
export { PurchaseOrdersRoute as component };
