import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { t as Receipt } from "./receipt-D9RlH_nC.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { c as requireTrimmed, i as requirePositiveAmount, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
//#region src/features/expenses/components/expenses-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ExpensesPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, ledgerBySystemKey, isReady } = useWorkspace();
	const [open, setOpen] = import_react.useState(false);
	const [narration, setNarration] = import_react.useState("");
	const [amount, setAmount] = import_react.useState("");
	const [expenseDate, setExpenseDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [paymentAccountId, setPaymentAccountId] = import_react.useState("");
	const expensesQuery = useQuery({
		...trpc.expenses.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const ledgersQuery = useQuery({
		...trpc.accounting.listLedgerAccounts.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const postExpense = useMutation(trpc.expenses.post.mutationOptions());
	const expenseAccountId = ledgerBySystemKey.expenses;
	const paymentAccounts = (ledgersQuery.data ?? []).filter((account) => account.systemKey === "cash" || account.systemKey === "bank");
	import_react.useEffect(() => {
		if (!paymentAccountId && paymentAccounts[0]) setPaymentAccountId(paymentAccounts[0].id);
	}, [paymentAccountId, paymentAccounts]);
	async function handleCreate(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId, isReady)) return;
		if (!expenseAccountId || !paymentAccountId) {
			toast.error("Workspace or expense ledgers are not ready yet.");
			return;
		}
		const expenseNarration = requireTrimmed(narration, "Narration");
		if (!expenseNarration) return;
		const expenseAmount = requirePositiveAmount(amount, "Amount");
		if (!expenseAmount) return;
		try {
			await postExpense.mutateAsync({
				companyId,
				expenseDate,
				narration: expenseNarration,
				amount: expenseAmount,
				expenseAccountId,
				paymentAccountId
			});
			await queryClient.invalidateQueries({ queryKey: trpc.expenses.list.queryKey({ companyId }) });
			setOpen(false);
			setNarration("");
			setAmount("");
			toast.success("Expense posted");
		} catch (err) {
			toastActionError(err, "Failed to post expense");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			onOpenChange: setOpen,
			open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "New expense"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Expense voucher" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Debits Expenses and credits Cash/Bank through the ledger engine." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: handleCreate,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "exp-narr",
							children: "Narration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "exp-narr",
							onChange: (event) => setNarration(event.target.value),
							required: true,
							value: narration
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "exp-amt",
								children: "Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "exp-amt",
								onChange: (event) => setAmount(event.target.value),
								required: true,
								value: amount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "exp-date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
								id: "exp-date",
								onChange: setExpenseDate,
								required: true,
								value: expenseDate
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Paid from"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: setPaymentAccountId,
							value: paymentAccountId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: paymentAccounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: account.id,
								children: account.name
							}, account.id)) }) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Post expense"
					}) })
				]
			})] })]
		}),
		description: "Operating expenses posted through double-entry ledger.",
		title: "Expenses",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "flex items-center gap-2 text-base",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-4 text-muted-foreground" }), "Expense register"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [(expensesQuery.data ?? []).length, " expenses"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Narration" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (expensesQuery.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "py-10 text-center text-muted-foreground",
				colSpan: 3,
				children: "No expenses yet."
			}) }) : (expensesQuery.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.expenseDate }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: row.narration
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.amount) })
			] }, row.id)) })] })
		})] })
	});
}
//#endregion
//#region src/routes/app/expenses.tsx?tsr-split=component
function ExpensesRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpensesPanel, {});
}
//#endregion
export { ExpensesRoute as component };
