import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { t as Warehouse } from "./warehouse-DIOSSXgA.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { t as Route } from "./inventory-DPI1ITjx.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { d as stockStatusBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
import { t as SearchInput } from "./search-input-fZpU6QCO.js";
import { n as ActiveFilterChip, t as resolveListFilter } from "./list-filter-Btnp0CMc.js";
//#region src/features/inventory/components/inventory-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function InventoryPanel({ itemId, onClearItemFilter }) {
	const trpc = useTRPC();
	const { companyId, isReady } = useWorkspace();
	const [query, setQuery] = import_react.useState("");
	const [statusFilter, setStatusFilter] = import_react.useState("all");
	const stockQuery = useQuery({
		...trpc.inventory.listStockBalances.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const rows = stockQuery.data ?? [];
	const itemFilter = resolveListFilter(itemId, rows.map((row) => ({
		id: row.itemId,
		label: row.itemName
	})), stockQuery.isSuccess);
	const filtered = rows.filter((row) => {
		if (itemFilter.id && row.itemId !== itemFilter.id) return false;
		const isLow = Number(row.quantity) < 1;
		const matchesStatus = statusFilter === "all" || (statusFilter === "low" ? isLow : !isLow);
		const haystack = row.itemName.toLowerCase();
		return matchesStatus && haystack.includes(query.trim().toLowerCase());
	});
	const totalValue = filtered.reduce((sum, row) => sum + Number(row.quantity) * Number(row.avgRate), 0);
	const lowCount = filtered.filter((row) => Number(row.quantity) < 1).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		description: "Godown-agnostic stock balances from the movement ledger API.",
		title: "Inventory",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Lines shown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-2xl tabular-nums",
						children: filtered.length
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Stock value (avg)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-2xl tabular-nums",
						children: formatInr(totalValue)
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Zero / low" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-2xl tabular-nums",
						children: lowCount
					})]
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warehouse, { className: "size-4 text-muted-foreground" }), "Stock status"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Live balances from opening / purchase / sale movements" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						onValueChange: (value) => setStatusFilter(value),
						value: statusFilter,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "all",
								children: "All"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "healthy",
								children: "In stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "low",
								children: "Low / zero"
							})
						] })
					}), itemFilter.id && onClearItemFilter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveFilterChip, {
						label: itemFilter.label ?? "Selected item",
						onClear: onClearItemFilter
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search item",
					value: query,
					wrapperClassName: "w-full max-w-sm"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Item" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Qty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Unit" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Avg rate" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Value" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: stockQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 6,
				children: "Loading stock…"
			}) }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 6,
				children: "No stock balances yet. Add opening stock on an item."
			}) }) : filtered.map((row) => {
				const isLow = Number(row.quantity) < 1;
				const value = Number(row.quantity) * Number(row.avgRate);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: row.itemName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "tabular-nums",
						children: row.quantity
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.unit }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.avgRate) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(value) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: stockStatusBadgeIntent({ isLowOrZero: isLow }),
						children: isLow ? "Low / zero" : "In stock"
					}) })
				] }, row.itemId);
			}) })] })
		})] })]
	});
}
//#endregion
//#region src/routes/app/inventory.tsx?tsr-split=component
function InventoryRoute() {
	const { item } = Route.useSearch();
	const navigate = Route.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryPanel, {
		itemId: item,
		onClearItemFilter: () => void navigate({ search: {} })
	});
}
//#endregion
export { InventoryRoute as component };
