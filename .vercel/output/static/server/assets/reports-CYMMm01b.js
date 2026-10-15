import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as useNavigate } from "./useNavigate-B6w6xlxh.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { t as Download } from "./download-D9biyPia.js";
import { t as FileChartColumnIncreasing } from "./file-chart-column-increasing-_J5eMm5v.js";
import { t as Label } from "./label-DX7_3rQN.js";
import { i as TabsTrigger, n as TabsContent, t as Tabs } from "./tabs-BBl_76LU.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as AGEING_BUCKET_DISPLAY_LABEL } from "./ageing-service-DxSmQahl.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as Textarea } from "./textarea-BFjnTMvl.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { c as requireTrimmed, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { a as gstReconciliationBadgeIntent, n as ageingBucketBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
import { n as storeGstr2bPurchasePrefill } from "./gstr2b-purchase-prefill-DAgGIjrs.js";
//#region src/lib/gst-period.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function gstMonthStart(year, month) {
	return `${year}-${String(month).padStart(2, "0")}-01`;
}
function gstMonthEnd(year, month) {
	const lastDay = new Date(year, month, 0).getDate();
	return `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
}
function currentGstMonthPeriod(from = /* @__PURE__ */ new Date()) {
	const year = from.getFullYear();
	const month = from.getMonth() + 1;
	return {
		periodStart: gstMonthStart(year, month),
		periodEnd: gstMonthEnd(year, month),
		label: from.toLocaleDateString("en-IN", {
			month: "short",
			year: "numeric"
		})
	};
}
//#endregion
//#region src/features/gst/gstr1-portal-parser.ts
function normalizeInvoiceNumber$1(value) {
	return value.trim().toUpperCase().replace(/\s+/g, "");
}
function normalizeGstin$1(value) {
	return value.trim().toUpperCase();
}
function normalizePortalDate$1(value) {
	const trimmed = value.trim();
	if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
	const dmy = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
	if (dmy) {
		const [, day, month, year] = dmy;
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
	}
	return trimmed;
}
function money$1(value) {
	if (typeof value === "number") return Math.abs(value).toFixed(2);
	if (typeof value === "string" && value.trim()) {
		const parsed = Number(value.replace(/,/g, ""));
		if (Number.isFinite(parsed)) return Math.abs(parsed).toFixed(2);
	}
	return "0.00";
}
function sumTaxComponents$1(row) {
	const cgst = money$1(row.cgstAmount ?? row.camt ?? row.cgst ?? 0);
	const sgst = money$1(row.sgstAmount ?? row.samt ?? row.sgst ?? 0);
	const igst = money$1(row.igstAmount ?? row.iamt ?? row.igst ?? 0);
	return {
		cgstAmount: cgst,
		sgstAmount: sgst,
		igstAmount: igst,
		totalGstAmount: money$1(row.totalGstAmount ?? row.gstAmount ?? Number(cgst) + Number(sgst) + Number(igst))
	};
}
function mapPortalRow$1(customerGstin, row) {
	const invoiceNumber = String(row.invoiceNumber ?? row.inum ?? row.supplierInvoiceNumber ?? "").trim();
	const invoiceDate = normalizePortalDate$1(String(row.invoiceDate ?? row.idt ?? row.dt ?? ""));
	if (!invoiceNumber || !invoiceDate) return null;
	const taxes = sumTaxComponents$1(row);
	const taxableAmount = money$1(row.taxableAmount ?? row.txval ?? row.val ?? row.taxable_value ?? 0);
	return {
		customerGstin: normalizeGstin$1(customerGstin || String(row.customerGstin ?? row.ctin ?? "")),
		invoiceNumber: normalizeInvoiceNumber$1(invoiceNumber),
		invoiceDate,
		taxableAmount,
		cgstAmount: taxes.cgstAmount,
		sgstAmount: taxes.sgstAmount,
		igstAmount: taxes.igstAmount,
		totalGstAmount: taxes.totalGstAmount
	};
}
function extractB2bGroups$1(parsed) {
	if (!parsed || typeof parsed !== "object") return [];
	const root = parsed;
	const candidates = [
		root.b2b,
		root.data?.b2b,
		root.docdata?.b2b,
		root.data?.docdata && root.data.docdata.b2b,
		root.rows
	];
	for (const candidate of candidates) if (Array.isArray(candidate)) return candidate;
	return [];
}
function parseGstr1PortalJson(text) {
	const parsed = JSON.parse(text);
	const rows = [];
	if (Array.isArray(parsed)) {
		for (const entry of parsed) {
			if (!entry || typeof entry !== "object") continue;
			const mapped = mapPortalRow$1(String(entry.customerGstin ?? ""), entry);
			if (mapped) rows.push(mapped);
		}
		if (rows.length > 0) return rows;
	}
	const b2bGroups = extractB2bGroups$1(parsed);
	for (const group of b2bGroups) {
		const customerGstin = String(group.ctin ?? group.gstin ?? group.customerGstin ?? "");
		const invoices = Array.isArray(group.inv) ? group.inv : Array.isArray(group.invoices) ? group.invoices : [];
		for (const invoice of invoices) {
			if (!invoice || typeof invoice !== "object") continue;
			const mapped = mapPortalRow$1(customerGstin, invoice);
			if (mapped) rows.push(mapped);
		}
		if (invoices.length === 0) {
			const mapped = mapPortalRow$1(customerGstin, group);
			if (mapped) rows.push(mapped);
		}
	}
	if (rows.length === 0) throw new Error("Could not find GSTR-1 rows. Paste a JSON array or portal export with b2b invoices.");
	return rows;
}
//#endregion
//#region src/features/gst/gstr2b-portal-parser.ts
function normalizeInvoiceNumber(value) {
	return value.trim().toUpperCase().replace(/\s+/g, "");
}
function normalizeGstin(value) {
	return value.trim().toUpperCase();
}
function normalizePortalDate(value) {
	const trimmed = value.trim();
	if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
	const dmy = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
	if (dmy) {
		const [, day, month, year] = dmy;
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
	}
	return trimmed;
}
function money(value) {
	if (typeof value === "number") return Math.abs(value).toFixed(2);
	if (typeof value === "string" && value.trim()) {
		const parsed = Number(value.replace(/,/g, ""));
		if (Number.isFinite(parsed)) return Math.abs(parsed).toFixed(2);
	}
	return "0.00";
}
function sumTaxComponents(row) {
	const cgst = money(row.cgstAmount ?? row.camt ?? row.cgst ?? 0);
	const sgst = money(row.sgstAmount ?? row.samt ?? row.sgst ?? 0);
	const igst = money(row.igstAmount ?? row.iamt ?? row.igst ?? 0);
	return {
		cgstAmount: cgst,
		sgstAmount: sgst,
		igstAmount: igst,
		totalGstAmount: money(row.totalGstAmount ?? row.gstAmount ?? Number(cgst) + Number(sgst) + Number(igst))
	};
}
function mapPortalRow(supplierGstin, row) {
	const supplierInvoiceNumber = String(row.supplierInvoiceNumber ?? row.inum ?? row.invoiceNumber ?? "").trim();
	const invoiceDate = normalizePortalDate(String(row.invoiceDate ?? row.idt ?? row.dt ?? ""));
	if (!supplierInvoiceNumber || !invoiceDate) return null;
	const taxes = sumTaxComponents(row);
	const taxableAmount = money(row.taxableAmount ?? row.txval ?? row.val ?? row.taxable_value ?? 0);
	return {
		supplierGstin: normalizeGstin(supplierGstin || String(row.supplierGstin ?? row.ctin ?? "")),
		supplierInvoiceNumber: normalizeInvoiceNumber(supplierInvoiceNumber),
		invoiceDate,
		taxableAmount,
		cgstAmount: taxes.cgstAmount,
		sgstAmount: taxes.sgstAmount,
		igstAmount: taxes.igstAmount,
		totalGstAmount: taxes.totalGstAmount
	};
}
function extractB2bGroups(parsed) {
	if (!parsed || typeof parsed !== "object") return [];
	const root = parsed;
	const candidates = [
		root.b2b,
		root.data?.b2b,
		root.docdata?.b2b,
		root.data?.docdata && root.data.docdata.b2b,
		root.rows
	];
	for (const candidate of candidates) if (Array.isArray(candidate)) return candidate;
	return [];
}
function parseGstr2bPortalJson(text) {
	const parsed = JSON.parse(text);
	const rows = [];
	if (Array.isArray(parsed)) {
		for (const entry of parsed) {
			if (!entry || typeof entry !== "object") continue;
			const mapped = mapPortalRow(String(entry.supplierGstin ?? ""), entry);
			if (mapped) rows.push(mapped);
		}
		if (rows.length > 0) return rows;
	}
	const b2bGroups = extractB2bGroups(parsed);
	for (const group of b2bGroups) {
		const supplierGstin = String(group.ctin ?? group.gstin ?? group.supplierGstin ?? "");
		const invoices = Array.isArray(group.inv) ? group.inv : Array.isArray(group.invoices) ? group.invoices : [];
		for (const invoice of invoices) {
			if (!invoice || typeof invoice !== "object") continue;
			const mapped = mapPortalRow(supplierGstin, invoice);
			if (mapped) rows.push(mapped);
		}
		if (invoices.length === 0) {
			const mapped = mapPortalRow(supplierGstin, group);
			if (mapped) rows.push(mapped);
		}
	}
	if (rows.length === 0) throw new Error("Could not find GSTR-2B rows. Paste a JSON array or portal export with b2b invoices.");
	return rows;
}
//#endregion
//#region src/features/gst/components/reports-panel.tsx
var import_jsx_runtime = require_jsx_runtime();
function ReportsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { companyId, company, isReady } = useWorkspace();
	const [tab, setTab] = import_react.useState("gstr1");
	const defaultReconPeriod = import_react.useMemo(() => currentGstMonthPeriod(), []);
	const [reconPeriodStart, setReconPeriodStart] = import_react.useState(defaultReconPeriod.periodStart);
	const [reconPeriodEnd, setReconPeriodEnd] = import_react.useState(defaultReconPeriod.periodEnd);
	const [gstr2bText, setGstr2bText] = import_react.useState("");
	const [gstr2bPortalRows, setGstr2bPortalRows] = import_react.useState([]);
	const [gstr2bReport, setGstr2bReport] = import_react.useState(null);
	const [gstr3bWorking, setGstr3bWorking] = import_react.useState(null);
	const [gstr1ReconText, setGstr1ReconText] = import_react.useState("");
	const [gstr1ReconReport, setGstr1ReconReport] = import_react.useState(null);
	const periodStart = "2026-04-01";
	const periodEnd = "2027-03-31";
	const gstr1Query = useQuery({
		...trpc.reports.gstr1.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			companyStateCode: company?.stateCode ?? "27",
			periodStart,
			periodEnd
		}),
		enabled: Boolean(companyId) && isReady && tab === "gstr1"
	});
	const gstr3bQuery = useQuery({
		...trpc.reports.gstr3b.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			companyStateCode: company?.stateCode ?? "27",
			periodStart,
			periodEnd
		}),
		enabled: Boolean(companyId) && isReady && tab === "gstr3b"
	});
	const trialQuery = useQuery({
		...trpc.reports.trialBalance.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "trial"
	});
	const profitAndLossQuery = useQuery({
		...trpc.reports.profitAndLoss.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "pl"
	});
	const balanceSheetQuery = useQuery({
		...trpc.reports.balanceSheet.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "bs"
	});
	const receivablesAgeingQuery = useQuery({
		...trpc.reports.receivablesAgeing.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "ageing"
	});
	const payablesAgeingQuery = useQuery({
		...trpc.reports.payablesAgeing.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "ageing"
	});
	const stockSummaryQuery = useQuery({
		...trpc.reports.stockSummary.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "stock"
	});
	const stockValuationQuery = useQuery({
		...trpc.reports.stockValuation.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "valuation"
	});
	const dayBookQuery = useQuery({
		...trpc.reports.dayBook.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			companyStateCode: company?.stateCode ?? "27",
			periodStart,
			periodEnd
		}),
		enabled: Boolean(companyId) && isReady && tab === "daybook"
	});
	const cashBookQuery = useQuery({
		...trpc.reports.cashBook.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			companyStateCode: company?.stateCode ?? "27",
			periodStart,
			periodEnd
		}),
		enabled: Boolean(companyId) && isReady && tab === "cashbook"
	});
	const hsnSummaryQuery = useQuery({
		...trpc.reports.hsnSummary.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			companyStateCode: company?.stateCode ?? "27",
			periodStart,
			periodEnd
		}),
		enabled: Boolean(companyId) && isReady && tab === "hsn"
	});
	const exportQuery = useQuery({
		...trpc.reports.accountantExport.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && tab === "export"
	});
	const [gstr2bLoading, setGstr2bLoading] = import_react.useState(false);
	const gstr2bItcMutation = useMutation(trpc.reports.setGstr2bItcDecision.mutationOptions());
	const gstr3bWorkingMutation = useMutation(trpc.reports.gstr3bWorking.mutationOptions());
	const gstr1ReconMutation = useMutation(trpc.reports.gstr1Reconciliation.mutationOptions());
	async function refreshGstr2bReport(portalRows) {
		if (!companyId) return null;
		setGstr2bLoading(true);
		try {
			const report = await queryClient.fetchQuery(trpc.reports.gstr2bReconciliation.queryOptions({
				companyId,
				companyStateCode: company?.stateCode ?? "27",
				periodStart: reconPeriodStart,
				periodEnd: reconPeriodEnd,
				portalRows
			}));
			setGstr2bReport(report);
			const working = await gstr3bWorkingMutation.mutateAsync({
				companyId,
				companyStateCode: company?.stateCode ?? "27",
				periodStart: reconPeriodStart,
				periodEnd: reconPeriodEnd,
				portalRows
			});
			setGstr3bWorking(working);
			return report;
		} finally {
			setGstr2bLoading(false);
		}
	}
	async function handleGstr2bFile(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		try {
			setGstr2bText(await file.text());
		} catch {
			toast.error("Could not read the uploaded file");
		} finally {
			event.target.value = "";
		}
	}
	async function runGstr2bReconciliation() {
		if (!requireWorkspace(companyId)) return;
		if (!requireTrimmed(gstr2bText, "GSTR-2B portal data")) return;
		try {
			const portalRows = parseGstr2bPortalJson(gstr2bText);
			setGstr2bPortalRows(portalRows);
			await refreshGstr2bReport(portalRows);
		} catch (err) {
			toastActionError(err, "GSTR-2B reconciliation failed");
		}
	}
	async function setGstr2bItcStatus(rowKey, status) {
		if (!requireWorkspace(companyId) || gstr2bPortalRows.length === 0) return;
		try {
			await gstr2bItcMutation.mutateAsync({
				companyId,
				companyStateCode: company?.stateCode ?? "27",
				periodStart: reconPeriodStart,
				periodEnd: reconPeriodEnd,
				rowKey,
				status,
				portalRows: gstr2bPortalRows
			});
			await refreshGstr2bReport(gstr2bPortalRows);
		} catch (err) {
			toastActionError(err, "Could not update ITC decision");
		}
	}
	async function runGstr1Reconciliation() {
		if (!requireWorkspace(companyId)) return;
		if (!requireTrimmed(gstr1ReconText, "GSTR-1 portal data")) return;
		try {
			const portalRows = parseGstr1PortalJson(gstr1ReconText);
			const report = await gstr1ReconMutation.mutateAsync({
				companyId,
				periodStart: reconPeriodStart,
				periodEnd: reconPeriodEnd,
				portalRows
			});
			setGstr1ReconReport(report);
		} catch (err) {
			toastActionError(err, "GSTR-1 reconciliation failed");
		}
	}
	function downloadExport() {
		if (!requireWorkspace(companyId) || !exportQuery.data) return;
		const blob = new Blob([JSON.stringify(exportQuery.data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `accountant-export-${companyId}.json`;
		anchor.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Live GSTR working reports and trial balance from posted documents.",
		title: "Reports",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			onValueChange: setTab,
			value: tab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "gstr1",
						children: "GSTR-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "gstr3b",
						children: "GSTR-3B"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "trial",
						children: "Trial balance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "pl",
						children: "Profit & loss"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "bs",
						children: "Balance sheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "ageing",
						children: "Ageing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "stock",
						children: "Stock summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "valuation",
						children: "Stock valuation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "daybook",
						children: "Day book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "cashbook",
						children: "Cash book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "hsn",
						children: "HSN summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "gstr2b",
						children: "GSTR-2B"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "export",
						children: "Export"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					className: "mt-4",
					value: "gstr1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileChartColumnIncreasing, { className: "size-4 text-muted-foreground" }), "GSTR-1 working report"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
						"FY ",
						periodStart,
						" to ",
						periodEnd,
						" · taxable",
						" ",
						formatInr(gstr1Query.data?.totalTaxableValue ?? 0)
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Invoice" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Party" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GSTIN" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Taxable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tax" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (gstr1Query.data?.b2b ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "py-10 text-center text-muted-foreground",
							colSpan: 5,
							children: "No outward supplies in period."
						}) }) : (gstr1Query.data?.b2b ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: row.invoiceNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.partyName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-mono text-xs",
								children: row.partyGstin ?? "URP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.taxableAmount) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.totalGstAmount) })
						] }, row.invoiceNumber)) })] })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "GSTR-1 vs books"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
							"Paste filed GSTR-1 JSON and reconcile against sales invoices for",
							" ",
							reconPeriodStart,
							" to ",
							reconPeriodEnd
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-end gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
											onChange: setReconPeriodStart,
											value: reconPeriodStart,
											variant: "toolbar"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period end" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
											onChange: setReconPeriodEnd,
											value: reconPeriodEnd,
											variant: "toolbar"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									className: "min-h-32 font-mono text-xs",
									onChange: (event) => setGstr1ReconText(event.target.value),
									placeholder: "[{\"customerGstin\":\"24AAAA...\",\"invoiceNumber\":\"INV-1\",\"invoiceDate\":\"2026-01-06\",\"taxableAmount\":\"1000.00\",\"totalGstAmount\":\"180.00\"}]",
									value: gstr1ReconText
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									disabled: !companyId || gstr1ReconMutation.isPending,
									onClick: runGstr1Reconciliation,
									type: "button",
									children: "Reconcile GSTR-1"
								}),
								gstr1ReconReport ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted/40 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Matched"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-semibold",
												children: gstr1ReconReport.summary.matchedCount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted/40 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Mismatched"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-semibold",
												children: gstr1ReconReport.summary.mismatchedCount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted/40 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Missing in books"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-semibold",
												children: gstr1ReconReport.summary.missingInBooksCount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted/40 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Missing in GSTR-1"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-semibold",
												children: gstr1ReconReport.summary.missingInGstr1Count
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Invoice" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GSTIN" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Books taxable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GSTR-1 taxable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: gstr1ReconReport.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "font-medium",
										children: row.invoiceNumber
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "font-mono text-xs",
										children: row.customerGstin ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.bookTaxableAmount ? formatInr(row.bookTaxableAmount) : "—" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.portalTaxableAmount ? formatInr(row.portalTaxableAmount) : "—" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: gstReconciliationBadgeIntent(row.status),
										children: row.status.replaceAll("_", " ")
									}) })
								] }, row.rowKey)) })] })] }) : null
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					className: "mt-4",
					value: "gstr3b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Output GST" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bQuery.data?.outputGst ?? 0)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Input GST / ITC (books)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bQuery.data?.inputGst ?? 0)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Net payable (books ITC)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bQuery.data?.netGstPayable ?? 0)
								})]
							}) })
						]
					}), gstr3bWorking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Accepted ITC (2B)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bWorking.acceptedInputGst)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Pending ITC" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bWorking.pendingInputGst)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Rejected ITC" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bWorking.rejectedInputGst)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Net payable (accepted ITC)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(gstr3bWorking.netGstPayableWithAcceptedItc)
								})]
							}) })
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "trial",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Trial balance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Chart of accounts skeleton (balances filled as books deepen)" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Code" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Account" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Debit" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Credit" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (trialQuery.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-mono text-xs",
								children: row.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: row.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: row.accountType
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.debit) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.credit) })
						] }, row.id)) })] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					className: "mt-4",
					value: "pl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Total income" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(profitAndLossQuery.data?.totalIncome ?? 0)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Total expense" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(profitAndLossQuery.data?.totalExpense ?? 0)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Net profit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(profitAndLossQuery.data?.netProfit ?? 0)
								})]
							}) })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Income"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (profitAndLossQuery.data?.incomeRows ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.amount)
							})] }, row.accountId)) }) })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Expenses"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (profitAndLossQuery.data?.expenseRows ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.amount)
							})] }, row.accountId)) }) })
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					className: "mt-4",
					value: "bs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Total assets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(balanceSheetQuery.data?.totalAssets ?? 0)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Total liabilities" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(balanceSheetQuery.data?.totalLiabilities ?? 0)
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Equity + net profit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-2xl",
									children: formatInr(Number(balanceSheetQuery.data?.totalEquity ?? 0) + Number(balanceSheetQuery.data?.netProfit ?? 0))
								})]
							}) })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Assets"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (balanceSheetQuery.data?.assetRows ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.amount)
							})] }, row.accountId)) }) })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Liabilities & equity"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: [...balanceSheetQuery.data?.liabilityRows ?? [], ...balanceSheetQuery.data?.equityRows ?? []].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.amount)
							})] }, row.accountId)) }) })
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "ageing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Receivables ageing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Outstanding customer invoices" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Party" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Invoice" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Days past due" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Bucket" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Outstanding"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (receivablesAgeingQuery.data?.rows ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "py-10 text-center text-muted-foreground",
								colSpan: 5,
								children: "No outstanding receivables."
							}) }) : (receivablesAgeingQuery.data?.rows ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.partyName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.documentNumber }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.daysPastDue }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: ageingBucketBadgeIntent(row.bucket),
									children: AGEING_BUCKET_DISPLAY_LABEL[row.bucket]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: formatInr(row.outstandingAmount)
								})
							] }, row.documentNumber)) })] })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Payables ageing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Outstanding supplier bills" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Party" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Bill" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Days past due" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Bucket" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Outstanding"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (payablesAgeingQuery.data?.rows ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "py-10 text-center text-muted-foreground",
								colSpan: 5,
								children: "No outstanding payables."
							}) }) : (payablesAgeingQuery.data?.rows ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.partyName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.documentNumber }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.daysPastDue }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: ageingBucketBadgeIntent(row.bucket),
									children: AGEING_BUCKET_DISPLAY_LABEL[row.bucket]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: formatInr(row.outstandingAmount)
								})
							] }, row.documentNumber)) })] })
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "stock",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Stock summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Current quantity on hand by item" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Item" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Unit" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Qty on hand"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (stockSummaryQuery.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "py-10 text-center text-muted-foreground",
							colSpan: 3,
							children: "No stock movements recorded yet."
						}) }) : (stockSummaryQuery.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: row.itemName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.baseUnit }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: row.quantityOnHand
							})
						] }, row.itemId)) })] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "valuation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Stock valuation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Quantity on hand valued at item purchase rate (weighted average placeholder)" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Item" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Unit" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Avg rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Value"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (stockValuationQuery.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "py-10 text-center text-muted-foreground",
							colSpan: 5,
							children: "No inventory to value."
						}) }) : (stockValuationQuery.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: row.itemName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.unit }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: row.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.avgRate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right font-medium",
								children: formatInr(row.stockValue)
							})
						] }, row.itemId)) })] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "daybook",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Day book"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
						"All ledger vouchers between ",
						periodStart,
						" and ",
						periodEnd
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Narration" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Debit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Credit"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (dayBookQuery.data?.entries ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "py-10 text-center text-muted-foreground",
							colSpan: 5,
							children: "No ledger entries in this period."
						}) }) : (dayBookQuery.data?.entries ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: entry.entryDate }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "neutral",
								children: entry.voucherType
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-64 truncate",
								children: entry.narration
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(entry.totalDebit)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(entry.totalCredit)
							})
						] }, entry.entryId)) })] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "cashbook",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Cash book"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
						"Cash and bank movements · closing",
						" ",
						formatInr(cashBookQuery.data?.closingBalance ?? 0)
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Account" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Narration" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Debit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Credit"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (cashBookQuery.data?.lines ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "py-10 text-center text-muted-foreground",
							colSpan: 5,
							children: "No cash or bank movements in this period."
						}) }) : (cashBookQuery.data?.lines ?? []).map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: line.entryDate }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: line.ledgerName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-64 truncate",
								children: line.narration
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(line.debit)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(line.credit)
							})
						] }, `${line.entryId}-${index}`)) })] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "hsn",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "HSN summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Sales taxable value and GST grouped by HSN code" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "HSN" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Quantity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Taxable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "GST"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (hsnSummaryQuery.data?.rows ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "py-10 text-center text-muted-foreground",
							colSpan: 4,
							children: "No taxable sales in this period."
						}) }) : (hsnSummaryQuery.data?.rows ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: row.hsnCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: row.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.taxableAmount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatInr(row.gstAmount)
							})
						] }, row.hsnCode)) })] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "gstr2b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "GSTR-2B reconciliation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Import portal JSON, reconcile purchase bills for the return period, and accept or reject ITC before filing GSTR-3B" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
										onChange: setReconPeriodStart,
										value: reconPeriodStart,
										variant: "toolbar"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period end" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
										onChange: setReconPeriodEnd,
										value: reconPeriodEnd,
										variant: "toolbar"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "gstr2b-file",
									children: "Portal file"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									accept: ".json,.csv,.txt",
									id: "gstr2b-file",
									onChange: handleGstr2bFile,
									type: "file"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "min-h-40 font-mono text-xs",
								onChange: (event) => setGstr2bText(event.target.value),
								placeholder: "[{\"supplierGstin\":\"24AAAA...\",\"supplierInvoiceNumber\":\"SB-1\",\"invoiceDate\":\"2026-01-06\",\"taxableAmount\":\"500.00\",\"totalGstAmount\":\"90.00\"}]",
								value: gstr2bText
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									disabled: !companyId || gstr2bLoading,
									onClick: runGstr2bReconciliation,
									type: "button",
									children: "Reconcile"
								})
							}),
							gstr2bReport ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Matched"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: gstr2bReport.summary.matchedCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Mismatched"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: gstr2bReport.summary.mismatchedCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Missing in books"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: gstr2bReport.summary.missingInBooksCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Missing in 2B"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: gstr2bReport.summary.missingIn2bCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Conflicts"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: gstr2bReport.summary.conflictCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "2B ITC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: formatInr(gstr2bReport.summary.portalItcTotal)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Claimable ITC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold",
											children: formatInr(gstr2bReport.summary.claimableItcTotal)
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Invoice" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GSTIN" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Books GST" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "2B GST" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "CGST / SGST / IGST (2B)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ITC" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: gstr2bReport.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium",
									children: row.supplierInvoiceNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.invoiceDate ?? "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-mono text-xs",
									children: row.supplierGstin ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.bookTotalGstAmount ? formatInr(row.bookTotalGstAmount) : "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.portalTotalGstAmount ? formatInr(row.portalTotalGstAmount) : "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-xs",
									children: row.portalCgstAmount ? `${formatInr(row.portalCgstAmount)} / ${formatInr(row.portalSgstAmount ?? 0)} / ${formatInr(row.portalIgstAmount ?? 0)}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: gstReconciliationBadgeIntent(row.status),
									children: row.status.replaceAll("_", " ")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: row.itcStatus === "accepted" ? "default" : row.itcStatus === "rejected" ? "destructive" : "secondary",
									children: row.itcStatus
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1",
									children: [row.status === "matched" && row.portalTotalGstAmount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										disabled: gstr2bItcMutation.isPending,
										onClick: () => setGstr2bItcStatus(row.rowKey, "accepted"),
										size: "sm",
										type: "button",
										variant: "outline",
										children: "Accept"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										disabled: gstr2bItcMutation.isPending,
										onClick: () => setGstr2bItcStatus(row.rowKey, "rejected"),
										size: "sm",
										type: "button",
										variant: "outline",
										children: "Reject"
									})] }) : null, row.status === "missing_in_books" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => {
											storeGstr2bPurchasePrefill({
												supplierGstin: row.supplierGstin ?? void 0,
												supplierBillNumber: row.supplierInvoiceNumber,
												billDate: row.invoiceDate ?? void 0,
												taxableAmount: row.portalTaxableAmount ?? void 0
											});
											navigate({ to: "/app/purchases/new" });
										},
										size: "sm",
										type: "button",
										variant: "outline",
										children: "Create bill"
									}) : null]
								}) })
							] }, row.rowKey)) })] })] }) : null
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					className: "mt-4",
					value: "export",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Accountant export"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Trial balance, sales invoices, and purchase bills as JSON" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Sales invoices"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-semibold",
										children: exportQuery.data?.salesInvoices.length ?? 0
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Purchase bills"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-semibold",
										children: exportQuery.data?.purchaseBills.length ?? 0
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Trial balance rows"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-semibold",
										children: exportQuery.data?.trialBalance.rows.length ?? 0
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-fit",
							disabled: !exportQuery.data,
							onClick: downloadExport,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { "data-icon": "inline-start" }), "Download JSON pack"]
						})]
					})] })
				})
			]
		})
	});
}
//#endregion
//#region src/routes/app/reports.tsx?tsr-split=component
function ReportsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsPanel, {});
}
//#endregion
export { ReportsRoute as component };
