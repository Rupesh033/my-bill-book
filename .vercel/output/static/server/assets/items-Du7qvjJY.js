import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { n as useWorkspace } from "./workspace-context-Cz54y75x.js";
import { t as Package } from "./package-D6vIJ8zF.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { s as itemTrackingBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as SearchInput } from "./search-input-fZpU6QCO.js";
import { t as CreateItemDialog } from "./create-item-dialog-Cl1VT8cI.js";
import { t as useItemsList } from "./use-master-data-BBmwqEMI.js";
//#region src/features/inventory/components/items-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ItemsPanel() {
	const { error: workspaceError } = useWorkspace();
	const [query, setQuery] = import_react.useState("");
	const itemsQuery = useItemsList();
	const filtered = itemsQuery.data.filter((item) => {
		return `${item.name} ${item.hsnCode}`.toLowerCase().includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateItemDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "New item"] }) }),
		description: "Item master wired to inventory API, with optional opening stock movement.",
		title: "Items",
		children: [workspaceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: workspaceError
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4 text-muted-foreground" }), "Item master"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [filtered.length, " items · F2 lookup on vouchers uses this list"] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search name or HSN",
					value: query,
					wrapperClassName: "w-full max-w-sm"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Group" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "HSN" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GST" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Unit" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Purchase" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sale" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Stock" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: itemsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 8,
				children: "Loading items…"
			}) }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 8,
				children: "No items yet. Create the first item master."
			}) }) : filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.itemGroup || "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: item.hsnCode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					children: [item.gstRate, "%"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.baseUnit }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(item.purchaseRate) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(item.saleRate) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: itemTrackingBadgeIntent(item.tracksInventory),
					children: item.tracksInventory ? "Tracked" : "Service"
				}) })
			] }, item.id)) })] })
		})] })]
	});
}
//#endregion
//#region src/routes/app/masters/items.tsx?tsr-split=component
function ItemsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemsPanel, {});
}
//#endregion
export { ItemsRoute as component };
