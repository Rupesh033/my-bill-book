import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { t as Pencil } from "./pencil-BQdE0Tea.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { t as Users } from "./users-DU0K0g2j.js";
import { t as CreatePartyDialog } from "./create-party-dialog-D8t8XGFo.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { l as partyTypeBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
import { t as SearchInput } from "./search-input-fZpU6QCO.js";
import { i as paymentTermsOptions, s as stateLabel } from "./india-masters-DrWYWga8.js";
import { n as usePartiesList } from "./use-master-data-BBmwqEMI.js";
//#region src/features/parties/components/parties-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function partyTypeBadge(partyType) {
	const label = partyType === "customer" ? "Customer" : partyType === "supplier" ? "Supplier" : "Both";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: partyTypeBadgeIntent(partyType),
		children: label
	});
}
function PartiesPanel() {
	const trpc = useTRPC();
	const { companyId, isReady, error: workspaceError } = useWorkspace();
	const [query, setQuery] = import_react.useState("");
	const [filter, setFilter] = import_react.useState("all");
	const [editParty, setEditParty] = import_react.useState(null);
	const partiesQuery = usePartiesList();
	const salesQuery = useQuery({
		...trpc.sales.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const purchasesQuery = useQuery({
		...trpc.purchases.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const priceListsQuery = useQuery({
		...trpc.inventory.listPriceLists.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const priceListNameById = import_react.useMemo(() => {
		return new Map((priceListsQuery.data ?? []).map((list) => [list.id, list.name]));
	}, [priceListsQuery.data]);
	const outstandingByPartyId = import_react.useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		for (const invoice of salesQuery.data ?? []) map.set(invoice.customerId, (map.get(invoice.customerId) ?? 0) + Number(invoice.outstandingAmount));
		for (const bill of purchasesQuery.data ?? []) map.set(bill.supplierId, (map.get(bill.supplierId) ?? 0) + Number(bill.outstandingAmount));
		return map;
	}, [purchasesQuery.data, salesQuery.data]);
	const filtered = partiesQuery.data.filter((party) => {
		const matchesFilter = filter === "all" || party.partyType === filter;
		const haystack = `${party.name} ${party.gstin ?? ""} ${party.stateCode}`.toLowerCase();
		return matchesFilter && haystack.includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePartyDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "New party"] }) }),
		description: "GST billing address, PAN, and contact details for tax invoices.",
		title: "Customers & suppliers",
		children: [
			workspaceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: workspaceError
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-muted-foreground" }), "Customer & supplier list"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [filtered.length, " contacts · State drives CGST/SGST vs IGST"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						onValueChange: (value) => setFilter(value),
						value: filter,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "all",
								children: "All"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "customer",
								children: "Customers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "supplier",
								children: "Suppliers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "both",
								children: "Both"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search name or GSTIN",
						value: query,
						wrapperClassName: "w-full max-w-sm"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GSTIN" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "State" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "City" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Credit limit" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Terms" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Price list" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Outstanding"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-12" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: partiesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "py-10 text-center text-muted-foreground",
					colSpan: 9,
					children: "Loading…"
				}) }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "py-10 text-center text-muted-foreground",
					colSpan: 9,
					children: "No customers or suppliers yet."
				}) }) : filtered.map((party) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: party.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: partyTypeBadge(party.partyType) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: party.gstin ?? "Unregistered"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "truncate",
						children: stateLabel(party.stateCode)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "truncate",
						children: party.city || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: party.creditLimit ? `₹${Number(party.creditLimit).toLocaleString("en-IN")}` : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: paymentTermsOptions.find((term) => term.days === party.paymentTermsDays)?.label ?? `${party.paymentTermsDays}d` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "truncate",
						children: party.priceListId ? priceListNameById.get(party.priceListId) ?? "Assigned" : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right tabular-nums",
						children: formatInr(outstandingByPartyId.get(party.id) ?? 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"aria-label": `Edit ${party.name}`,
						className: "text-muted-foreground",
						onClick: () => setEditParty(party),
						size: "icon-sm",
						type: "button",
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
					}) })
				] }, party.id)) })] })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePartyDialog, {
				onOpenChange: (next) => {
					if (!next) setEditParty(null);
				},
				open: Boolean(editParty),
				party: editParty
			})
		]
	});
}
//#endregion
//#region src/routes/app/masters/parties.tsx?tsr-split=component
function PartiesRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartiesPanel, {});
}
//#endregion
export { PartiesRoute as component };
