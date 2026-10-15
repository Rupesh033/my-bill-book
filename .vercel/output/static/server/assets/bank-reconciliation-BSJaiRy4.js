import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { i as localCalendarDate, t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { t as Check } from "./check-C418P8rt.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Upload } from "./upload-S7S08Ahj.js";
import { t as Label } from "./label-DX7_3rQN.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WandSparkles = createLucideIcon("wand-sparkles", [
	["path", {
		d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
		key: "ul74o6"
	}],
	["path", {
		d: "m14 7 3 3",
		key: "1r5n42"
	}],
	["path", {
		d: "M5 6v4",
		key: "ilb8ba"
	}],
	["path", {
		d: "M19 14v4",
		key: "blhpug"
	}],
	["path", {
		d: "M10 2v2",
		key: "7u0qdc"
	}],
	["path", {
		d: "M7 8H3",
		key: "zfb6yr"
	}],
	["path", {
		d: "M21 16h-4",
		key: "1cnmox"
	}],
	["path", {
		d: "M11 3H9",
		key: "1obp7u"
	}]
]);
//#endregion
//#region src/features/banking/components/bank-reconciliation-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function statusBadge(status) {
	if (status === "matched") return "success";
	if (status === "unmatched_book") return "warning";
	return "secondary";
}
function statusLabel(status) {
	if (status === "matched") return "Matched";
	if (status === "unmatched_book") return "In books only";
	return "In statement only";
}
function BankReconciliationPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, isReady } = useWorkspace();
	const today = localCalendarDate();
	const monthStart = `${today.slice(0, 7)}-01`;
	const ledgersQuery = useQuery({
		...trpc.accounting.listLedgerAccounts.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const bankAccounts = import_react.useMemo(() => (ledgersQuery.data ?? []).filter((account) => account.systemKey === "bank" || account.systemKey === "cash"), [ledgersQuery.data]);
	const [ledgerAccountId, setLedgerAccountId] = import_react.useState("");
	const [periodStart, setPeriodStart] = import_react.useState(monthStart);
	const [periodEnd, setPeriodEnd] = import_react.useState(today);
	const [statementId, setStatementId] = import_react.useState();
	const [csvText, setCsvText] = import_react.useState("");
	import_react.useEffect(() => {
		if (!ledgerAccountId && bankAccounts[0]) setLedgerAccountId(bankAccounts[0].id);
	}, [bankAccounts, ledgerAccountId]);
	const resolvedCompanyId = companyId ?? "";
	const queryEnabled = Boolean(companyId) && isReady && Boolean(ledgerAccountId);
	const reconciliationQuery = useQuery({
		...trpc.banking.getReconciliation.queryOptions({
			companyId: resolvedCompanyId,
			ledgerAccountId,
			periodStart,
			periodEnd,
			statementId
		}),
		enabled: queryEnabled
	});
	const statementsQuery = useQuery({
		...trpc.banking.listStatements.queryOptions({ companyId: resolvedCompanyId }),
		enabled: Boolean(companyId) && isReady
	});
	const importMutation = useMutation({
		...trpc.banking.importStatement.mutationOptions(),
		onSuccess: (statement) => {
			setStatementId(statement.id);
			queryClient.invalidateQueries({ queryKey: trpc.banking.listStatements.queryKey() });
			queryClient.invalidateQueries({ queryKey: trpc.banking.getReconciliation.queryKey() });
			toast.success("Bank statement imported");
		},
		onError: (error) => {
			toastActionError(error, "Failed to import bank statement");
		}
	});
	const autoMatchMutation = useMutation({
		...trpc.banking.autoMatch.mutationOptions(),
		onSuccess: (result) => {
			queryClient.invalidateQueries({ queryKey: trpc.banking.getReconciliation.queryKey() });
			toast.success(`Matched ${result.matched} line(s)`);
		},
		onError: (error) => {
			toastActionError(error, "Auto-match failed");
		}
	});
	async function handleFileChange(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		setCsvText(await file.text());
	}
	function handleImport() {
		const resolved = requireWorkspace(companyId);
		if (!ledgerAccountId) {
			toast.error("Select a bank account");
			return;
		}
		if (!csvText.trim()) {
			toast.error("Upload a CSV bank statement first");
			return;
		}
		importMutation.mutate({
			companyId: resolved,
			ledgerAccountId,
			periodStart,
			periodEnd,
			sourceFilename: "bank-statement.csv",
			csvText
		});
	}
	function handleAutoMatch() {
		const resolved = requireWorkspace(companyId);
		if (!statementId) {
			toast.error("Import a bank statement first");
			return;
		}
		autoMatchMutation.mutate({
			companyId: resolved,
			ledgerAccountId,
			statementId,
			periodStart,
			periodEnd
		});
	}
	const report = reconciliationQuery.data;
	const selectedAccount = bankAccounts.find((account) => account.id === ledgerAccountId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Match bank statement lines with cash book entries.",
		title: "Bank reconciliation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Statement import"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "CSV columns: Date, Description, Debit, Credit (or Amount)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-account",
									children: "Bank / cash account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: setLedgerAccountId,
									value: ledgerAccountId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "bank-account",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select account" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: bankAccounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: account.id,
										children: [
											account.code,
											" · ",
											account.name
										]
									}, account.id)) }) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period from" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
									onChange: setPeriodStart,
									value: periodStart
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
									onChange: setPeriodEnd,
									value: periodEnd
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-csv",
									children: "Statement CSV"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									accept: ".csv,.txt,.tsv",
									id: "bank-csv",
									onChange: (event) => void handleFileChange(event),
									type: "file"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							disabled: importMutation.isPending,
							onClick: handleImport,
							type: "button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { "data-icon": "inline-start" }), "Import statement"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							disabled: autoMatchMutation.isPending || !statementId,
							onClick: handleAutoMatch,
							type: "button",
							variant: "secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { "data-icon": "inline-start" }), "Auto-match"]
						})]
					}),
					statementsQuery.data && statementsQuery.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Latest import:",
							" ",
							statementsQuery.data.filter((entry) => entry.ledgerAccountId === ledgerAccountId).sort((left, right) => right.importedAt.getTime() - left.importedAt.getTime())[0]?.sourceFilename ?? "—"
						]
					}) : null
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-base",
				children: [
					selectedAccount?.name ?? "Reconciliation",
					" · ",
					periodStart,
					" to",
					" ",
					periodEnd
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: report ? `${report.matchedCount} matched · ${report.unmatchedStatementCount} statement only · ${report.unmatchedBookCount} books only` : "Import a statement to begin matching." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Stmt date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Statement" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Book date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Books" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Stmt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Book"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: reconciliationQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-8 text-center",
				colSpan: 7,
				children: "Loading reconciliation…"
			}) }) : !report || report.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-8 text-center text-muted-foreground",
				colSpan: 7,
				children: "No reconciliation rows yet."
			}) }) : report.rows.map((row, index) => {
				const statementAmount = Number(row.statementCredit) > 0 ? row.statementCredit : row.statementDebit;
				const bookAmount = Number(row.bookDebit) > 0 ? row.bookDebit : row.bookCredit;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: statusBadge(row.status),
						children: [row.status === "matched" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "data-icon": "inline-start" }) : null, statusLabel(row.status)]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.statementDate ?? "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "max-w-48 truncate",
						children: row.statementDescription ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.bookDate ?? "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "max-w-48 truncate",
						children: row.bookNarration ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right tabular-nums",
						children: statementAmount ? formatInr(statementAmount) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right tabular-nums",
						children: bookAmount ? formatInr(bookAmount) : "—"
					})
				] }, `${row.matchId ?? "row"}-${index}`);
			}) })] }) })] })]
		})
	});
}
//#endregion
//#region src/routes/app/bank-reconciliation.tsx?tsr-split=component
function BankReconciliationRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankReconciliationPanel, {});
}
//#endregion
export { BankReconciliationRoute as component };
