import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Upload } from "./upload-S7S08Ahj.js";
import { t as Label } from "./label-DX7_3rQN.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { n as parseDelimitedRows, t as parseCsvRows } from "./csv-parser-DDPDpDWu.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as Textarea } from "./textarea-BFjnTMvl.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { c as requireTrimmed, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
//#region src/features/imports/busy-format-parser.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var PARTY_NAME_KEYS = [
	"account name",
	"party name",
	"name",
	"account"
];
var PARTY_TYPE_KEYS = [
	"account type",
	"type",
	"group",
	"account group"
];
var GSTIN_KEYS = [
	"gst no.",
	"gst no",
	"gstin",
	"gst number",
	"gst no "
];
var STATE_KEYS = [
	"state",
	"state code",
	"state name"
];
var ITEM_NAME_KEYS = [
	"item name",
	"name",
	"product name"
];
var HSN_KEYS = [
	"hsn/sac",
	"hsn",
	"hsn code",
	"sac"
];
var RATE_KEYS = [
	"sale rate",
	"rate",
	"purchase rate",
	"mrp"
];
var UNIT_KEYS = [
	"unit",
	"main unit",
	"base unit",
	"uom"
];
function normalizeHeader(header) {
	return header.trim().toLowerCase().replace(/\s+/g, " ");
}
function pickField(row, aliases) {
	const normalized = new Map(Object.entries(row).map(([key, value]) => [normalizeHeader(key), value]));
	for (const alias of aliases) {
		const value = normalized.get(alias);
		if (value !== void 0 && value.trim().length > 0) return value.trim();
	}
	return "";
}
function stateCodeFromGstin(gstin) {
	if (gstin.length < 2) return null;
	const code = gstin.slice(0, 2);
	return /^\d{2}$/.test(code) ? code : null;
}
var STATE_NAME_TO_CODE = {
	maharashtra: "27",
	gujarat: "24",
	karnataka: "29",
	"tamil nadu": "33",
	delhi: "07",
	rajasthan: "08",
	"uttar pradesh": "09",
	"west bengal": "19",
	telangana: "36",
	"andhra pradesh": "37"
};
function resolveStateCode(rawState, gstin) {
	const fromGstin = stateCodeFromGstin(gstin);
	if (fromGstin) return fromGstin;
	const trimmed = rawState.trim();
	if (/^\d{2}$/.test(trimmed)) return trimmed;
	const mapped = STATE_NAME_TO_CODE[trimmed.toLowerCase()];
	if (mapped) return mapped;
	return "27";
}
function mapPartyType(rawType) {
	const value = rawType.toLowerCase();
	if (value.includes("supplier") || value.includes("creditor") || value.includes("purchase")) return "supplier";
	if (value.includes("customer") || value.includes("debtor") || value.includes("sales")) return "customer";
	return "customer";
}
function mapBusyPartyRow(row) {
	const name = pickField(row, PARTY_NAME_KEYS);
	const gstin = pickField(row, GSTIN_KEYS) || null;
	const stateCode = resolveStateCode(pickField(row, STATE_KEYS), gstin ?? "");
	return {
		name,
		partyType: mapPartyType(pickField(row, PARTY_TYPE_KEYS)),
		gstin,
		stateCode
	};
}
function mapBusyItemRow(row) {
	return {
		name: pickField(row, ITEM_NAME_KEYS),
		hsn: pickField(row, HSN_KEYS) || "9997",
		rate: pickField(row, RATE_KEYS) || "0.00",
		unit: pickField(row, UNIT_KEYS) || "Nos"
	};
}
function parseBusyExport(text, kind) {
	const rows = parseDelimitedRows(text);
	const mapper = kind === "parties" ? mapBusyPartyRow : mapBusyItemRow;
	return rows.map((row) => mapper(row)).filter((row) => row.name.trim().length > 0);
}
//#endregion
//#region src/features/imports/components/imports-panel.tsx
var import_jsx_runtime = require_jsx_runtime();
var sampleParties = `[
  { "name": "Imported Retail", "partyType": "customer", "gstin": "27AAAAA0000A1Z5", "stateCode": "27" },
  { "name": "Imported Mill", "partyType": "supplier", "gstin": "24BBBBB0000B1Z5", "stateCode": "24" }
]`;
var sampleStock = `[
  { "itemName": "Imported Cotton", "quantity": "100", "unit": "Meter", "rate": "80.00" }
]`;
var sampleItems = `[
  { "name": "Imported Yarn", "hsn": "5205", "rate": "120.00", "unit": "Kg" }
]`;
var sampleOpeningBalances = `[
  { "ledgerCode": "1000", "openingDebit": "5000.00", "openingCredit": "0.00" },
  { "ledgerCode": "3000", "openingDebit": "0.00", "openingCredit": "5000.00" }
]`;
var sampleCsvParties = `name,partyType,gstin,stateCode
Imported Retail,customer,27AAAAA0000A1Z5,27
Imported Mill,supplier,24BBBBB0000B1Z5,24`;
var sampleCsvStock = `itemName,quantity,unit,rate
Imported Cotton,100,Meter,80.00`;
var sampleCsvItems = `name,hsn,rate,unit
Imported Yarn,5205,120.00,Kg`;
var sampleBusyParties = `Account Name\tGST No.\tState\tAccount Type
Imported Retail\t27AAAAA0000A1Z5\tMaharashtra\tCustomer
Imported Mill\t24BBBBB0000B1Z5\tGujarat\tSupplier`;
var sampleBusyItems = `Item Name\tHSN/SAC\tSale Rate\tUnit
Imported Yarn\t5205\t120.00\tKg`;
function ImportsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, ledgerBySystemKey } = useWorkspace();
	const [mode, setMode] = import_react.useState("parties");
	const [format, setFormat] = import_react.useState("json");
	const [jsonText, setJsonText] = import_react.useState(sampleParties);
	const [result, setResult] = import_react.useState(null);
	const [dryRunComplete, setDryRunComplete] = import_react.useState(false);
	function parseRows(text) {
		if (format === "busy") {
			if (mode !== "parties" && mode !== "items") throw new Error("BUSY format supports parties and items only");
			return parseBusyExport(text, mode);
		}
		if (format === "csv") return parseCsvRows(text);
		return JSON.parse(text);
	}
	function sampleTextFor(nextMode, nextFormat) {
		if (nextFormat === "busy") {
			if (nextMode === "parties") return sampleBusyParties;
			if (nextMode === "items") return sampleBusyItems;
			return sampleCsvParties;
		}
		if (nextFormat === "csv") {
			if (nextMode === "parties") return sampleCsvParties;
			if (nextMode === "stock") return sampleCsvStock;
			if (nextMode === "items") return sampleCsvItems;
			return `ledgerCode,openingDebit,openingCredit
1000,5000.00,0.00
3000,0.00,5000.00`;
		}
		if (nextMode === "parties") return sampleParties;
		if (nextMode === "stock") return sampleStock;
		if (nextMode === "items") return sampleItems;
		return sampleOpeningBalances;
	}
	const dryRunParties = useMutation(trpc.imports.dryRunParties.mutationOptions());
	const commitParties = useMutation(trpc.imports.commitParties.mutationOptions());
	const dryRunStock = useMutation(trpc.imports.dryRunOpeningStock.mutationOptions());
	const commitStock = useMutation(trpc.imports.commitOpeningStock.mutationOptions());
	const dryRunItems = useMutation(trpc.imports.dryRunItems.mutationOptions());
	const commitItems = useMutation(trpc.imports.commitItems.mutationOptions());
	const dryRunOpeningBalances = useMutation(trpc.imports.dryRunOpeningBalances.mutationOptions());
	const commitOpeningBalances = useMutation(trpc.imports.commitOpeningBalances.mutationOptions());
	async function handleFileUpload(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		setResult(null);
		setDryRunComplete(false);
		try {
			const text = await file.text();
			setJsonText(text);
		} catch {
			toast.error("Could not read the selected file");
		} finally {
			event.target.value = "";
		}
	}
	async function handleDryRun() {
		setResult(null);
		setDryRunComplete(false);
		if (!requireTrimmed(jsonText, "Import data")) return;
		try {
			const rows = parseRows(jsonText);
			const report = mode === "parties" ? await dryRunParties.mutateAsync({ rows }) : mode === "stock" ? await dryRunStock.mutateAsync({ rows }) : mode === "items" ? await dryRunItems.mutateAsync({ rows }) : await dryRunOpeningBalances.mutateAsync({ rows });
			setDryRunComplete(true);
			setResult(`Dry-run: ${report.validCount} valid, ${report.errors.length} errors, wroteData=${report.wroteData}`);
			if (report.errors.length > 0) toast.error(`Dry-run found ${report.errors.length} error(s). Fix them before commit.`);
			else toast.success("Dry-run passed. You can commit the import.");
		} catch (err) {
			toastActionError(err, "Invalid rows / dry-run failed");
		}
	}
	async function handleCommit() {
		if (!requireWorkspace(companyId)) return;
		if (!dryRunComplete) {
			toast.error("Run dry-run and fix errors before committing.");
			return;
		}
		if (!requireTrimmed(jsonText, "Import data")) return;
		setResult(null);
		try {
			const rows = parseRows(jsonText);
			if (mode === "parties") {
				if (!ledgerBySystemKey.customer_receivable || !ledgerBySystemKey.supplier_payable) {
					toast.error("Receivable and payable ledger mappings are required.");
					return;
				}
				const report = await commitParties.mutateAsync({
					companyId,
					rows,
					receivableAccountId: ledgerBySystemKey.customer_receivable,
					payableAccountId: ledgerBySystemKey.supplier_payable
				});
				await queryClient.invalidateQueries({ queryKey: trpc.parties.list.queryKey({ companyId }) });
				setResult(`Committed ${report.createdCount} parties (${report.errors.length} errors)`);
				toast.success(`Imported ${report.createdCount} parties.`);
			} else if (mode === "stock") {
				const report = await commitStock.mutateAsync({
					companyId,
					rows,
					occurredOn: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
				});
				await queryClient.invalidateQueries({ queryKey: trpc.inventory.listItems.queryKey({ companyId }) });
				await queryClient.invalidateQueries({ queryKey: trpc.inventory.listStockBalances.queryKey({ companyId }) });
				setResult(`Committed ${report.createdCount} opening stock rows (${report.errors.length} errors)`);
				toast.success(`Imported ${report.createdCount} opening stock rows.`);
			} else if (mode === "items") {
				const report = await commitItems.mutateAsync({
					companyId,
					rows
				});
				await queryClient.invalidateQueries({ queryKey: trpc.inventory.listItems.queryKey({ companyId }) });
				setResult(`Committed ${report.createdCount} items (${report.errors.length} errors)`);
				toast.success(`Imported ${report.createdCount} items.`);
			} else {
				const report = await commitOpeningBalances.mutateAsync({
					companyId,
					entryDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					rows
				});
				setResult(`Committed ${report.createdCount} opening balances (${report.errors.length} errors)`);
				toast.success(`Imported ${report.createdCount} opening balances.`);
			}
			setDryRunComplete(false);
		} catch (err) {
			toastActionError(err, "Commit failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Dry-run then commit masters, stock, items, and opening balances.",
		title: "Import",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 text-muted-foreground" }), "Opening import"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Validate first — commit only writes after a clean dry-run path" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					onValueChange: (value) => {
						const next = value;
						setMode(next);
						setJsonText(sampleTextFor(next, format));
						setResult(null);
						setDryRunComplete(false);
					},
					value: mode,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "parties",
							children: "Parties"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "stock",
							children: "Opening stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "items",
							children: "Items"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "openingBalances",
							children: "Opening balances"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					onValueChange: (value) => {
						const next = value;
						setFormat(next);
						setJsonText(sampleTextFor(mode, next));
						setResult(null);
					},
					value: format,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "json",
							children: "JSON"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "csv",
							children: "CSV"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "busy",
							children: "BUSY/EZY"
						})
					] })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "import-file",
						children: "Import file"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						accept: ".csv,.tsv,.txt,.json",
						id: "import-file",
						onChange: handleFileUpload,
						type: "file"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: format === "busy" ? "BUSY/EZY export" : format === "csv" ? "CSV rows" : "JSON rows"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "min-h-48 font-mono text-xs",
					onChange: (event) => setJsonText(event.target.value),
					value: jsonText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleDryRun,
							type: "button",
							variant: "outline",
							children: "Dry-run"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: !companyId,
							onClick: handleCommit,
							type: "button",
							children: "Commit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: format === "busy" ? "BUSY/EZY" : format === "csv" ? "CSV" : "JSON"
						})
					]
				}),
				result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: result
				}) : null
			]
		})] })
	});
}
//#endregion
//#region src/routes/app/imports.tsx?tsr-split=component
function ImportsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportsPanel, {});
}
//#endregion
export { ImportsRoute as component };
