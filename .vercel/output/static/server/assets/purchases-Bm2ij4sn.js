import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as Eye, r as useInfiniteQuery, t as nextVoucherListCursor } from "./voucher-list-pagination-CnkxW_Wk.js";
import { t as VoucherPreviewSheet } from "./voucher-preview-sheet-BQSFKTkz.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { r as Printer } from "./voucher-print-toolbar-DIwvyMUS.js";
import { t as Truck } from "./truck-BM_rl-cq.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip } from "./tooltip-EnKH0H68.js";
import { t as Route } from "./purchases-BlqZRwGY.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { u as paymentStatusBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
import { t as SearchInput } from "./search-input-fZpU6QCO.js";
import { n as ActiveFilterChip, t as resolveListFilter } from "./list-filter-Btnp0CMc.js";
//#region src/features/purchases/components/purchases-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PurchasesPanel({ partyId, onClearPartyFilter }) {
	const trpc = useTRPC();
	const { companyId, isReady } = useWorkspace();
	const [query, setQuery] = import_react.useState("");
	const [filter, setFilter] = import_react.useState("all");
	const [previewTarget, setPreviewTarget] = import_react.useState(null);
	const [previewOpen, setPreviewOpen] = import_react.useState(false);
	const resolvedCompanyId = companyId ?? "00000000-0000-4000-8000-000000000099";
	const partiesQuery = useQuery({
		...trpc.parties.list.queryOptions({ companyId: resolvedCompanyId }),
		enabled: Boolean(companyId) && isReady
	});
	const partyFilter = resolveListFilter(partyId, (partiesQuery.data ?? []).map((party) => ({
		id: party.id,
		label: party.name
	})), partiesQuery.isSuccess);
	const purchasesQuery = useInfiniteQuery(trpc.purchases.list.infiniteQueryOptions({
		companyId: resolvedCompanyId,
		limit: 50,
		partyId: partyFilter.id,
		paymentStatus: filter === "all" ? void 0 : filter,
		search: query.trim() || void 0
	}, {
		enabled: Boolean(companyId) && isReady,
		getNextPageParam: (lastPage) => nextVoucherListCursor(lastPage, 50, (row) => row.billDate)
	}));
	const partyName = import_react.useMemo(() => {
		const map = new Map((partiesQuery.data ?? []).map((party) => [party.id, party.name]));
		return (id) => map.get(id) ?? id.slice(0, 8);
	}, [partiesQuery.data]);
	const rows = purchasesQuery.data?.pages.flat() ?? [];
	function openPreview(row) {
		setPreviewTarget({
			kind: "purchase",
			id: row.id,
			number: row.supplierBillNumber
		});
		setPreviewOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/purchases/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "New purchase bill"]
			})
		}),
		description: "Purchase register from posted supplier bills.",
		title: "Purchases",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-muted-foreground" }), "Purchase bills"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [rows.length, " loaded vouchers"] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						onValueChange: (value) => setFilter(value),
						value: filter,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "all",
								children: "All"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "Pending",
								children: "Pending"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "Part paid",
								children: "Part paid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "Paid",
								children: "Paid"
							})
						] })
					}), partyFilter.id && onClearPartyFilter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveFilterChip, {
						label: partyFilter.label ?? partyName(partyFilter.id),
						onClear: onClearPartyFilter
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search bill or supplier",
					value: query,
					wrapperClassName: "w-full max-w-sm"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-4 px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Supplier bill" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Supplier" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Due" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Taxable" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tax" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Total" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: purchasesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 9,
				children: "Loading purchases…"
			}) }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 9,
				children: "No purchases yet. Create a purchase voucher."
			}) }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: row.supplierBillNumber
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: partyName(row.supplierId) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.billDate }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.dueDate }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.taxableAmount) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.totalGstAmount) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium text-money-out",
					children: formatInr(row.totalAmount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: paymentStatusBadgeIntent(row.paymentStatus),
					children: row.paymentStatus
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => openPreview(row),
							size: "icon-sm",
							type: "button",
							variant: "ghost",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Preview bill"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Preview" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "icon-sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								params: { billId: row.id },
								to: "/app/purchases/$billId/print",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Print bill"
								})]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Print" })] })]
				}) })
			] }, row.id)) })] }), purchasesQuery.hasNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: purchasesQuery.isFetchingNextPage,
					onClick: () => void purchasesQuery.fetchNextPage(),
					type: "button",
					variant: "outline",
					children: purchasesQuery.isFetchingNextPage ? "Loading…" : "Load more"
				})
			}) : null]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherPreviewSheet, {
			onOpenChange: setPreviewOpen,
			open: previewOpen,
			target: previewTarget
		})]
	});
}
//#endregion
//#region src/routes/app/purchases/index.tsx?tsr-split=component
function PurchasesIndexRoute() {
	const { party } = Route.useSearch();
	const navigate = Route.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchasesPanel, {
		onClearPartyFilter: () => void navigate({ search: {} }),
		partyId: party
	});
}
//#endregion
export { PurchasesIndexRoute as component };
