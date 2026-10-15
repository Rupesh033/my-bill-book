import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { t as Trash2 } from "./trash-2-Cksi9pld.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as Textarea } from "./textarea-BFjnTMvl.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { r as requireBalancedJournal, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
//#region src/features/accounting/components/journal-entry-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function emptyLine() {
	return {
		key: crypto.randomUUID(),
		ledgerAccountId: "",
		debit: "",
		credit: ""
	};
}
function JournalEntryPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, isReady } = useWorkspace();
	const [entryDate, setEntryDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [narration, setNarration] = import_react.useState("");
	const [lines, setLines] = import_react.useState([emptyLine(), emptyLine()]);
	const ledgersQuery = useQuery({
		...trpc.accounting.listLedgerAccounts.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const postEntry = useMutation(trpc.accounting.postLedgerEntry.mutationOptions());
	const accounts = ledgersQuery.data ?? [];
	function updateLine(key, patch) {
		setLines((current) => current.map((line) => line.key === key ? {
			...line,
			...patch
		} : line));
	}
	async function handleSubmit(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId, isReady)) return;
		const filled = lines.filter((line) => line.ledgerAccountId && (line.debit || line.credit));
		if (filled.length < 2) {
			toast.error("Add at least two ledger lines.");
			return;
		}
		if (!requireBalancedJournal(filled)) return;
		try {
			await postEntry.mutateAsync({
				companyId,
				entryDate,
				narration: narration.trim() || "Journal entry",
				voucherType: "journal",
				lines: filled.map((line) => ({
					ledgerAccountId: line.ledgerAccountId,
					debit: line.debit || "0.00",
					credit: line.credit || "0.00"
				}))
			});
			await queryClient.invalidateQueries({ queryKey: trpc.accounting.listLedgerAccounts.queryKey({ companyId }) });
			toast.success("Journal entry posted");
			setNarration("");
			setLines([emptyLine(), emptyLine()]);
		} catch (err) {
			toastActionError(err, "Post failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Manual double-entry journal vouchers.",
		title: "Journal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "Journal entry"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Minimum two lines; debits must equal credits." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
						onChange: setEntryDate,
						value: entryDate
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						onChange: (event) => setNarration(event.target.value),
						placeholder: "Narration",
						rows: 1,
						value: narration
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_1fr_auto] gap-2 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-3 sm:col-span-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: (value) => updateLine(line.key, { ledgerAccountId: value }),
									value: line.ledgerAccountId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Ledger account" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: accounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: account.id,
										children: [
											account.code,
											" · ",
											account.name
										]
									}, account.id)) }) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								onChange: (event) => updateLine(line.key, {
									debit: event.target.value,
									credit: ""
								}),
								placeholder: "Debit",
								value: line.debit
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								onChange: (event) => updateLine(line.key, {
									credit: event.target.value,
									debit: ""
								}),
								placeholder: "Credit",
								value: line.credit
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
								onClick: () => setLines((current) => current.length <= 2 ? current : current.filter((entry) => entry.key !== line.key)),
								size: "icon",
								type: "button",
								variant: "ghost",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})
						]
					}, line.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setLines((current) => [...current, emptyLine()]),
						type: "button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "Add line"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: postEntry.isPending,
						type: "submit",
						children: "Post journal"
					})]
				})
			]
		}) })] })
	});
}
//#endregion
//#region src/routes/app/accounting/journal.tsx?tsr-split=component
function JournalRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalEntryPanel, {});
}
//#endregion
export { JournalRoute as component };
