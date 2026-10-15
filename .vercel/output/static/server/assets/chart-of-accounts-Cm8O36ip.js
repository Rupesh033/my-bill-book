import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as BookOpen } from "./book-open-DtL_TZ4R.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BBl_76LU.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { t as accountTypeBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as SearchInput } from "./search-input-fZpU6QCO.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WalletCards = createLucideIcon("wallet-cards", [
	["path", {
		d: "M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21",
		key: "1vwh6y"
	}],
	["path", {
		d: "M3 7h18",
		key: "1uiuf2"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]
]);
//#endregion
//#region src/features/accounting/components/chart-of-accounts-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var accountTypeTabs = [
	{
		value: "all",
		label: "All"
	},
	{
		value: "asset",
		label: "Asset"
	},
	{
		value: "liability",
		label: "Liability"
	},
	{
		value: "equity",
		label: "Equity"
	},
	{
		value: "income",
		label: "Income"
	},
	{
		value: "expense",
		label: "Expense"
	}
];
function formatAccountType(accountType) {
	return accountType.charAt(0).toUpperCase() + accountType.slice(1);
}
function ChartOfAccountsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, company, isReady, refresh } = useWorkspace();
	const [typeFilter, setTypeFilter] = import_react.useState("all");
	const [searchQuery, setSearchQuery] = import_react.useState("");
	const accountsQuery = useQuery({
		...trpc.accounting.listLedgerAccounts.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const setupChart = useMutation(trpc.accounting.setupChartOfAccounts.mutationOptions());
	const accounts = accountsQuery.data ?? [];
	const normalizedQuery = searchQuery.trim().toLowerCase();
	const filteredAccounts = accounts.filter((account) => {
		if (typeFilter !== "all" && account.accountType !== typeFilter) return false;
		if (!normalizedQuery) return true;
		return account.name.toLowerCase().includes(normalizedQuery) || account.code.toLowerCase().includes(normalizedQuery);
	}).sort((left, right) => left.code.localeCompare(right.code));
	const typeCounts = {
		all: accounts.length,
		asset: 0,
		liability: 0,
		equity: 0,
		income: 0,
		expense: 0
	};
	for (const account of accounts) typeCounts[account.accountType] += 1;
	async function handleSetupDefaultAccounts() {
		if (!companyId || !company) {
			toast.error("Workspace is still loading. Try again in a moment.");
			return;
		}
		try {
			await setupChart.mutateAsync({
				companyId,
				businessType: company.businessType
			});
			await queryClient.invalidateQueries({ queryKey: trpc.accounting.listLedgerAccounts.queryKey({ companyId }) });
			await refresh();
			setTypeFilter("all");
			setSearchQuery("");
		} catch (err) {
			toastActionError(err, "Failed to set up chart of accounts");
		}
	}
	const hasAccounts = accounts.length > 0;
	const hasFilteredResults = filteredAccounts.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Company ledgers used for posting sales, purchases, GST, and cash movements.",
		title: "Chart of accounts",
		children: accountsQuery.isLoading || !isReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "flex flex-1 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "py-16 text-center text-sm text-muted-foreground",
				children: "Loading ledgers…"
			})
		}) : !hasAccounts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "flex flex-1 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center gap-4 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-medium",
							children: "No ledgers yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm text-sm text-muted-foreground",
							children: "Set up the default trading chart to create cash, bank, GST, sales, purchase, and stock ledgers."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: setupChart.isPending,
						onClick: handleSetupDefaultAccounts,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { "data-icon": "inline-start" }), "Set up default accounts"]
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "gap-0 overflow-hidden py-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "gap-4 border-b py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Ledgers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
							accounts.length,
							" accounts ·",
							" ",
							company?.businessType ?? "company"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
						onChange: (event) => setSearchQuery(event.target.value),
						placeholder: "Search by name or code",
						value: searchQuery,
						wrapperClassName: "w-full max-w-xs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					onValueChange: (value) => setTypeFilter(value),
					value: typeFilter,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "h-auto w-full flex-wrap justify-start",
						children: accountTypeTabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: tab.value,
							children: [tab.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "ml-1.5",
								variant: "neutral",
								children: typeCounts[tab.value]
							})]
						}, tab.value))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: hasFilteredResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-28 pl-6",
							children: "Code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-36",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-28 pr-6",
							children: "System"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredAccounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "pl-6 font-mono tabular-nums text-muted-foreground",
						children: account.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: account.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: accountTypeBadgeIntent(account.accountType),
						children: formatAccountType(account.accountType)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "pr-6",
						children: account.isSystem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "neutral",
							children: "System"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "—"
						})
					})
				] }, account.id)) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 px-6 py-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "No matching ledgers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Try a different type tab or clear the search."
					})]
				})
			})]
		})
	});
}
//#endregion
//#region src/routes/app/masters/chart-of-accounts.tsx?tsr-split=component
function ChartOfAccountsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartOfAccountsPanel, {});
}
//#endregion
export { ChartOfAccountsRoute as component };
