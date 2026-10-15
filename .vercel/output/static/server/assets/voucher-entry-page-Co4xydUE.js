import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { t as ChevronDown } from "./chevron-down-Brb20P0r.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { a as CommandItem, c as ChevronsUpDown, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, s as CommandSeparator, t as CommandDialog } from "./command-CP6lUVpw.js";
import { t as VoucherPreviewSheet } from "./voucher-preview-sheet-BQSFKTkz.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { t as Trash2 } from "./trash-2-Cksi9pld.js";
import { n as CollapsibleContent, r as CollapsibleTrigger, t as Collapsible } from "./collapsible-DAmDyMt1.js";
import { t as CreatePartyDialog } from "./create-party-dialog-D8t8XGFo.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { i as godowns, r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as Textarea } from "./textarea-BFjnTMvl.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { _ as resolvePlaceOfSupply, d as computeVoucherLine, f as computeVoucherTotals, g as partyStateForRegion, h as isValidStateCode, l as requireVoucherLines, m as emptyVoucherLine, p as createEmptyVoucherLines, v as resolveStateCode } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { a as purchaseSeriesOptions, l as uqcForUnit, n as indianStates, o as salesSeriesOptions, s as stateLabel } from "./india-masters-DrWYWga8.js";
import { t as CreateItemDialog } from "./create-item-dialog-Cl1VT8cI.js";
import { n as usePartiesList, t as useItemsList } from "./use-master-data-BBmwqEMI.js";
//#region src/features/app-shell/components/master-lookup.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function MasterLookup({ options, value, onValueChange, placeholder = "Select…", emptyText = "No matches.", searchPlaceholder = "Type to search…", title = "Lookup", className, appearance = "default", disabled, onFocus, createAction }) {
	const [open, setOpen] = import_react.useState(false);
	const selected = options.find((option) => option.value === value);
	const isGrid = appearance === "grid";
	function handleKeyDown(event) {
		if (disabled) return;
		if (event.key === "F2") {
			event.preventDefault();
			setOpen(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		className: cn("w-full justify-between font-normal", isGrid && "h-9 rounded-none px-2 shadow-none", className),
		"data-master-lookup": true,
		"data-voucher-grid-control": isGrid ? "" : void 0,
		disabled,
		onClick: () => setOpen(true),
		onFocus,
		onKeyDown: handleKeyDown,
		type: "button",
		variant: isGrid ? "ghost" : "outline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("truncate", !selected && "text-muted-foreground"),
			children: selected?.label ?? placeholder
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex shrink-0 items-center gap-1 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "rounded border px-1 font-mono text-[10px]",
				children: "F2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-3.5 opacity-50" })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandDialog, {
		description: "Search and select a master record",
		onOpenChange: setOpen,
		open,
		title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: searchPlaceholder }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: emptyText }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandItem, {
				"data-checked": option.value === value || void 0,
				keywords: option.keywords ? option.keywords.split(/\s+/).filter(Boolean) : void 0,
				onSelect: () => {
					onValueChange(option.value);
					setOpen(false);
				},
				value: `${option.label} ${option.keywords ?? ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: option.label
					}), option.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-[11px] text-muted-foreground",
						children: option.description
					}) : null]
				})
			}, option.value)) }),
			createAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
				onSelect: () => {
					setOpen(false);
					createAction.onSelect();
				},
				value: `__create__ ${createAction.label}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: createAction.label })]
			}) })] }) : null
		] })]
	})] });
}
//#endregion
//#region src/features/parties/recent-parties.ts
var MAX_RECENT = 5;
function storageKey(companyId, role) {
	return `recent-parties:${companyId}:${role}`;
}
function readRecentPartyIds(companyId, role) {
	if (typeof localStorage === "undefined") return [];
	const raw = localStorage.getItem(storageKey(companyId, role));
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
	} catch {
		return [];
	}
}
function trackRecentParty(companyId, role, partyId) {
	if (typeof localStorage === "undefined") return;
	const next = [partyId, ...readRecentPartyIds(companyId, role).filter((id) => id !== partyId)].slice(0, MAX_RECENT);
	localStorage.setItem(storageKey(companyId, role), JSON.stringify(next));
}
//#endregion
//#region src/features/parties/components/recent-party-chips.tsx
function useRecentParties(companyId, role) {
	const [recentIds, setRecentIds] = import_react.useState([]);
	import_react.useEffect(() => {
		if (!companyId) {
			setRecentIds([]);
			return;
		}
		setRecentIds(readRecentPartyIds(companyId, role));
	}, [companyId, role]);
	return {
		recentIds,
		rememberParty: import_react.useCallback((partyId) => {
			if (!companyId) return;
			trackRecentParty(companyId, role, partyId);
			setRecentIds((current) => [partyId, ...current.filter((id) => id !== partyId)].slice(0, 5));
		}, [companyId, role])
	};
}
function RecentPartyChips({ parties, recentIds, selectedId, onSelect, createLabel, onCreateNew }) {
	const recentParties = recentIds.map((id) => parties.find((party) => party.id === id)).filter((party) => Boolean(party));
	if (recentParties.length === 0 && !onCreateNew) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [recentParties.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: recentParties.map((party) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => onSelect(party.id),
				size: "sm",
				type: "button",
				variant: selectedId === party.id ? "default" : "outline",
				children: party.name
			}, party.id))
		}) : null, onCreateNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "h-auto justify-start px-0 text-primary",
			onClick: onCreateNew,
			type: "button",
			variant: "link",
			children: createLabel ?? "Add new party"
		}) : null]
	});
}
function SupplyRegionBadge({ region }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: "w-fit font-normal",
		variant: "secondary",
		children: region === "local" ? "Local (CGST+SGST)" : "IGST"
	});
}
//#endregion
//#region src/features/accounting/components/voucher-entry-page.tsx
function lineGstAmount(line, region) {
	if (region === "local") return Number(line.cgstAmount) + Number(line.sgstAmount);
	return Number(line.igstAmount);
}
function countFilled(...values) {
	return values.filter((value) => value?.trim()).length;
}
var CollapsibleSectionTrigger = import_react.forwardRef(function CollapsibleSectionTrigger({ title, filledCount, className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		className: cn("-ml-2 h-8 gap-2 px-2 font-medium", className),
		ref,
		type: "button",
		variant: "ghost",
		...props,
		children: [
			title,
			filledCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "font-normal",
				variant: "secondary",
				children: filledCount
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" })
		]
	});
});
function VoucherEntryPage({ mode, sourceDocumentId, sourceGrnId, gstr2bPrefill }) {
	const isSales = mode === "sales";
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, company, activeFinancialYearId, ledgerBySystemKey, godowns: godowns$1, isReady } = useWorkspace();
	const godownNames = godowns$1.length > 0 ? godowns$1.map((entry) => entry.name) : godowns;
	const seriesOptions = isSales ? salesSeriesOptions : purchaseSeriesOptions;
	const partiesQuery = usePartiesList();
	const itemsQuery = useItemsList();
	const postSales = useMutation(trpc.sales.postInvoice.mutationOptions());
	const postPurchase = useMutation(trpc.purchases.postBill.mutationOptions());
	const markDocumentConverted = useMutation(trpc.salesDocuments.markConverted.mutationOptions());
	const markGrnConverted = useMutation(trpc.purchaseGrns.markConverted.mutationOptions());
	const nextNumber = useMutation(trpc.documents.nextNumber.mutationOptions());
	const createAttachment = useMutation(trpc.documents.uploadAttachment.mutationOptions());
	const parties = partiesQuery.data.filter((party) => isSales ? party.partyType === "customer" || party.partyType === "both" : party.partyType === "supplier" || party.partyType === "both");
	const items = itemsQuery.data;
	const [series, setSeries] = import_react.useState(seriesOptions[0]);
	const [voucherNoPreview, setVoucherNoPreview] = import_react.useState("Auto");
	const [voucherDate, setVoucherDate] = import_react.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [region, setRegion] = import_react.useState(isSales ? "local" : "central");
	const [taxMode, setTaxMode] = import_react.useState("exclusive");
	const [partyId, setPartyId] = import_react.useState("");
	const [placeOfSupply, setPlaceOfSupply] = import_react.useState(company?.stateCode ?? "27");
	const [godown, setGodown] = import_react.useState(godownNames[0]);
	const [paymentMode, setPaymentMode] = import_react.useState("credit");
	const [supplierBillNo, setSupplierBillNo] = import_react.useState("");
	const [dueDate, setDueDate] = import_react.useState("");
	const [poReference, setPoReference] = import_react.useState("");
	const [transportMode, setTransportMode] = import_react.useState("");
	const [vehicleNo, setVehicleNo] = import_react.useState("");
	const [lrNumber, setLrNumber] = import_react.useState("");
	const [challanRef, setChallanRef] = import_react.useState("");
	const [narration, setNarration] = import_react.useState("");
	const [freight, setFreight] = import_react.useState("0.00");
	const [packing, setPacking] = import_react.useState("0.00");
	const [roundOff, setRoundOff] = import_react.useState("0.00");
	const [billDiscount, setBillDiscount] = import_react.useState("0.00");
	const [lines, setLines] = import_react.useState(() => createEmptyVoucherLines(1, godownNames[0]));
	const [priceListRates, setPriceListRates] = import_react.useState({});
	const [prefillApplied, setPrefillApplied] = import_react.useState(false);
	const [previewTarget, setPreviewTarget] = import_react.useState(null);
	const [previewOpen, setPreviewOpen] = import_react.useState(false);
	const [attachmentFile, setAttachmentFile] = import_react.useState(null);
	const [partyCreateOpen, setPartyCreateOpen] = import_react.useState(false);
	const [itemCreateOpen, setItemCreateOpen] = import_react.useState(false);
	const [itemCreateLineKey, setItemCreateLineKey] = import_react.useState(null);
	const formRef = import_react.useRef(null);
	const activeRowIndexRef = import_react.useRef(0);
	const companyState = resolveStateCode(company?.stateCode, "27");
	const party = parties.find((item) => item.id === partyId);
	const { recentIds, rememberParty } = useRecentParties(companyId, isSales ? "customer" : "supplier");
	function syncPlaceOfSupplyForParty(partyStateCode, nextRegion) {
		setPlaceOfSupply(resolvePlaceOfSupply({
			region: nextRegion ?? region,
			selectedPlaceOfSupply: "",
			partyStateCode,
			companyStateCode: companyState,
			fallbackStateCode: "27"
		}));
	}
	function handleRegionChange(nextRegion) {
		setRegion(nextRegion);
		syncPlaceOfSupplyForParty(party?.stateCode ?? "", nextRegion);
	}
	function reportSaveError(error, fallback = "Save failed") {
		if (typeof error === "string") {
			toast.error(error);
			return;
		}
		toastActionError(error, fallback);
	}
	import_react.useEffect(() => {
		function onKeyDown(event) {
			if (event.key === "F2") {
				if (event.target?.closest("[data-master-lookup]")) return;
				if (document.querySelector("[role=\"dialog\"][data-state=\"open\"]")) return;
				event.preventDefault();
				formRef.current?.requestSubmit();
				return;
			}
			if (event.key === "F9") {
				if (!event.target?.closest("[data-voucher-grid]")) return;
				event.preventDefault();
				const lineKey = lines[activeRowIndexRef.current]?.key;
				if (lineKey) setLines((current) => {
					const next = current.filter((line) => line.key !== lineKey);
					return next.length === 0 ? createEmptyVoucherLines(1, godown) : ensureTrailingEmptyRows(next);
				});
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [lines]);
	import_react.useEffect(() => {
		if (!partyId && parties[0]) {
			setPartyId(parties[0].id);
			syncPlaceOfSupplyForParty(parties[0].stateCode);
			setRegion(parties[0].stateCode === companyState ? "local" : "central");
		}
	}, [
		parties,
		partyId,
		companyState
	]);
	import_react.useEffect(() => {
		if (!isValidStateCode(placeOfSupply)) syncPlaceOfSupplyForParty(party?.stateCode ?? "");
	}, [
		companyState,
		party?.stateCode,
		region
	]);
	import_react.useEffect(() => {
		if (godowns$1.length > 0 && !godowns$1.some((entry) => entry.name === godown)) setGodown(godowns$1[0].name);
	}, [godowns$1, godown]);
	const activePriceListId = party?.priceListId ?? null;
	const salesDraftQuery = useQuery({
		...trpc.salesDocuments.buildInvoiceDraft.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			documentId: sourceDocumentId ?? "00000000-0000-4000-8000-000000000000"
		}),
		enabled: Boolean(companyId) && isReady && isSales && Boolean(sourceDocumentId) && !prefillApplied
	});
	const grnDraftQuery = useQuery({
		...trpc.purchaseGrns.buildBillDraft.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			grnId: sourceGrnId ?? "00000000-0000-4000-8000-000000000000"
		}),
		enabled: Boolean(companyId) && isReady && !isSales && Boolean(sourceGrnId) && !prefillApplied
	});
	const priceListItemsQuery = useQuery({
		...trpc.inventory.listPriceListItems.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			priceListId: activePriceListId ?? "00000000-0000-4000-8000-000000000000"
		}),
		enabled: Boolean(companyId) && Boolean(activePriceListId) && isReady
	});
	import_react.useEffect(() => {
		if (!priceListItemsQuery.data) {
			setPriceListRates({});
			return;
		}
		const nextRates = {};
		for (const entry of priceListItemsQuery.data) nextRates[entry.itemId] = entry.rate;
		setPriceListRates(nextRates);
	}, [priceListItemsQuery.data]);
	import_react.useEffect(() => {
		if (prefillApplied || isSales || !gstr2bPrefill || sourceGrnId || parties.length === 0) return;
		if (gstr2bPrefill.supplierBillNumber) setSupplierBillNo(gstr2bPrefill.supplierBillNumber);
		if (gstr2bPrefill.billDate) setVoucherDate(gstr2bPrefill.billDate);
		if (gstr2bPrefill.supplierGstin) {
			const normalizedGstin = gstr2bPrefill.supplierGstin.trim().toUpperCase();
			const match = parties.find((entry) => entry.gstin?.trim().toUpperCase() === normalizedGstin);
			if (match) setPartyId(match.id);
		}
		setPrefillApplied(true);
	}, [
		gstr2bPrefill,
		isSales,
		parties,
		prefillApplied,
		sourceGrnId
	]);
	import_react.useEffect(() => {
		if (prefillApplied) return;
		const draft = isSales ? salesDraftQuery.data : grnDraftQuery.data;
		if (!draft) return;
		if (isSales && "customerId" in draft) {
			setPartyId(draft.customerId);
			setVoucherDate(draft.documentDate);
			setNarration(draft.narration);
			setLines(draft.lines.map((line) => ({
				key: crypto.randomUUID(),
				itemId: line.itemId,
				itemName: line.itemName,
				hsnCode: line.hsnCode,
				gstRate: line.gstRate,
				unit: line.unit,
				uqc: uqcForUnit(line.unit),
				quantity: line.quantity,
				rate: line.rate,
				discountPercent: "0",
				godownName: godown
			})));
			setPrefillApplied(true);
			return;
		}
		if (!isSales && "supplierId" in draft) {
			setPartyId(draft.supplierId);
			setVoucherDate(draft.grnDate);
			setNarration(draft.narration);
			if (draft.godownName) setGodown(draft.godownName);
			setLines(draft.lines.map((line) => ({
				key: crypto.randomUUID(),
				itemId: line.itemId,
				itemName: line.itemName,
				hsnCode: line.hsnCode,
				gstRate: line.gstRate,
				unit: line.unit,
				uqc: uqcForUnit(line.unit),
				quantity: line.quantity,
				rate: line.rate,
				discountPercent: "0",
				godownName: draft.godownName ?? godown
			})));
			setPrefillApplied(true);
		}
	}, [
		grnDraftQuery.data,
		godown,
		isSales,
		prefillApplied,
		salesDraftQuery.data
	]);
	const computedLines = lines.map((line) => computeVoucherLine(line, region, placeOfSupply, taxMode, companyState));
	const totals = computeVoucherTotals(computedLines, {
		freight,
		packing,
		roundOff,
		billDiscount
	});
	function ensureTrailingEmptyRows(next) {
		if (next.at(-1)?.itemId) return [...next, emptyVoucherLine(godown)];
		return next;
	}
	function updateLine(key, patch) {
		setLines((current) => ensureTrailingEmptyRows(current.map((line) => line.key === key ? {
			...line,
			...patch
		} : line)));
	}
	function handleGridKeyDown(event, rowIndex, column) {
		if (event.key !== "Enter") return;
		event.preventDefault();
		const order = [
			"quantity",
			"rate",
			"discountPercent"
		];
		const colIndex = order.indexOf(column);
		if (colIndex < order.length - 1) {
			const next = document.querySelector(`[data-voucher-cell="${rowIndex}-${order[colIndex + 1]}"]`);
			next?.focus();
			next?.select();
			return;
		}
		const nextRow = document.querySelector(`[data-voucher-cell="${rowIndex + 1}-quantity"]`);
		if (nextRow) {
			nextRow.focus();
			nextRow.select();
			return;
		}
		addLine();
		requestAnimationFrame(() => {
			document.querySelector(`[data-voucher-cell="${rowIndex + 1}-quantity"]`)?.focus();
		});
	}
	function selectParty(nextPartyId) {
		rememberParty(nextPartyId);
		const nextParty = parties.find((entry) => entry.id === nextPartyId);
		setPartyId(nextPartyId);
		if (nextParty) {
			const nextRegion = nextParty.stateCode === companyState ? "local" : "central";
			setRegion(nextRegion);
			syncPlaceOfSupplyForParty(nextParty.stateCode, nextRegion);
			if (nextParty.paymentTermsDays > 0) {
				const due = /* @__PURE__ */ new Date();
				due.setDate(due.getDate() + nextParty.paymentTermsDays);
				setDueDate(due.toISOString().slice(0, 10));
			}
		}
	}
	function applyCreatedParty(createdParty) {
		selectParty(createdParty.id);
		if (!isSales && createdParty.paymentTermsDays > 0) {
			const due = /* @__PURE__ */ new Date();
			due.setDate(due.getDate() + createdParty.paymentTermsDays);
			setDueDate(due.toISOString().slice(0, 10));
		}
	}
	function applyItemToLine(key, item) {
		const rate = (activePriceListId ? priceListRates[item.id] : void 0) ?? (isSales ? item.saleRate : item.purchaseRate);
		updateLine(key, {
			itemId: item.id,
			itemName: item.name,
			hsnCode: item.hsnCode,
			gstRate: item.gstRate,
			unit: item.baseUnit,
			uqc: uqcForUnit(item.baseUnit),
			rate,
			godownName: godown
		});
	}
	function selectItem(key, itemId) {
		const item = items.find((entry) => entry.id === itemId);
		if (!item) return;
		applyItemToLine(key, item);
	}
	function openItemCreate(lineKey) {
		setItemCreateLineKey(lineKey);
		setItemCreateOpen(true);
	}
	function handleItemCreated(item) {
		const lineKey = itemCreateLineKey;
		setItemCreateLineKey(null);
		if (lineKey) applyItemToLine(lineKey, item);
	}
	function handleHeaderGodownChange(nextGodown) {
		setGodown(nextGodown);
		setLines((current) => current.map((line) => !line.itemId || line.godownName === godown ? {
			...line,
			godownName: nextGodown
		} : line));
	}
	function selectUnit(key, unit) {
		updateLine(key, {
			unit,
			uqc: uqcForUnit(unit)
		});
	}
	function addLine() {
		setLines((current) => [...current, emptyVoucherLine(godown)]);
	}
	function removeLine(key) {
		setLines((current) => {
			const next = current.filter((line) => line.key !== key);
			return next.length === 0 ? createEmptyVoucherLines(1, godown) : ensureTrailingEmptyRows(next);
		});
	}
	async function handleSave(event) {
		event.preventDefault();
		if (!companyId || !company) {
			reportSaveError("Workspace is still loading. Try again in a moment.");
			return;
		}
		if (!party) {
			reportSaveError(isSales ? "Select a customer or add one from the lookup." : "Select a supplier or add one from the lookup.");
			return;
		}
		const filledLines = computedLines.filter((line) => line.itemId);
		if (!requireVoucherLines(filledLines)) return;
		if (!isSales && !supplierBillNo.trim()) {
			reportSaveError("Supplier bill no. is required");
			return;
		}
		const companyStateCode = resolveStateCode(company.stateCode, "27");
		if (!isValidStateCode(companyStateCode)) {
			reportSaveError("Set a valid company state code in Company settings before posting.");
			return;
		}
		const resolvedPlaceOfSupply = resolvePlaceOfSupply({
			region,
			selectedPlaceOfSupply: placeOfSupply,
			partyStateCode: party.stateCode,
			companyStateCode,
			fallbackStateCode: "27"
		});
		if (!isValidStateCode(resolvedPlaceOfSupply)) {
			reportSaveError(isSales ? "Select a place of supply or set the customer state." : "Select a place of supply or set the supplier state.");
			return;
		}
		const requiredLedgers = isSales ? [
			"sales",
			"output_gst",
			"customer_receivable",
			"cash"
		] : [
			"purchase",
			"input_gst",
			"supplier_payable",
			"stock_in_hand"
		];
		for (const key of requiredLedgers) if (!ledgerBySystemKey[key]) {
			reportSaveError(`Missing ledger mapping: ${key}`);
			return;
		}
		const salesAccountId = ledgerBySystemKey.sales;
		const outputGstAccountId = ledgerBySystemKey.output_gst;
		const receivableAccountId = ledgerBySystemKey.customer_receivable;
		const cashAccountId = ledgerBySystemKey.cash;
		const purchaseAccountId = ledgerBySystemKey.purchase;
		const inputGstAccountId = ledgerBySystemKey.input_gst;
		const payableAccountId = ledgerBySystemKey.supplier_payable;
		const stockAccountId = ledgerBySystemKey.stock_in_hand;
		const cogsAccountId = ledgerBySystemKey.cogs;
		try {
			const allocatedNumber = await nextNumber.mutateAsync({
				companyId,
				financialYearId: activeFinancialYearId ?? company.financialYearStart,
				voucherType: isSales ? "sales" : "purchase",
				series,
				padLength: 4
			});
			setVoucherNoPreview(allocatedNumber);
			if (isSales) {
				const gstPartyState = partyStateForRegion(region, resolvedPlaceOfSupply, companyStateCode);
				if (!isValidStateCode(gstPartyState)) {
					reportSaveError("Customer state is missing. Update the customer master or place of supply.");
					return;
				}
				const invoice = await postSales.mutateAsync({
					companyId,
					companyStateCode,
					companyGstin: company.gstin,
					companyAddressLine1: company.addressLine1,
					companyAddressLine2: company.addressLine2,
					companyCity: company.city,
					companyPincode: company.pincode,
					customerId: party.id,
					customerStateCode: gstPartyState,
					placeOfSupply: resolvedPlaceOfSupply,
					invoiceNumber: allocatedNumber,
					invoiceDate: voucherDate,
					dueDate: dueDate || voucherDate,
					poReference,
					transportMode,
					vehicleNo,
					lrNumber,
					challanRef,
					paymentMode,
					taxMode,
					narration,
					freight,
					packing,
					roundOff,
					billDiscount,
					godownName: godown,
					salesAccountId,
					outputGstAccountId,
					receivableAccountId,
					cashAccountId,
					cogsAccountId,
					stockAccountId,
					lines: filledLines.map((line) => ({
						itemId: line.itemId,
						description: line.itemName,
						quantity: line.quantity,
						unit: line.unit,
						rate: line.rate,
						gstRate: line.gstRate,
						discountPercent: line.discountPercent,
						godownName: line.godownName || godown
					}))
				});
				if (sourceDocumentId) {
					await markDocumentConverted.mutateAsync({
						companyId,
						documentId: sourceDocumentId,
						invoiceId: invoice.id
					});
					await queryClient.invalidateQueries({ queryKey: trpc.salesDocuments.list.queryKey({ companyId }) });
				}
				await queryClient.invalidateQueries({ queryKey: trpc.sales.list.queryKey({ companyId }) });
				setPreviewTarget({
					kind: "sales",
					id: invoice.id,
					number: invoice.invoiceNumber
				});
				setPreviewOpen(true);
			} else {
				const gstPartyState = partyStateForRegion(region, resolvedPlaceOfSupply, companyStateCode);
				const bill = await postPurchase.mutateAsync({
					companyId,
					companyStateCode,
					companyGstin: company.gstin,
					companyAddressLine1: company.addressLine1,
					companyAddressLine2: company.addressLine2,
					companyCity: company.city,
					companyPincode: company.pincode,
					financialYearStart: company.financialYearStart,
					supplierId: party.id,
					supplierStateCode: gstPartyState,
					placeOfSupply: resolvedPlaceOfSupply,
					supplierBillNumber: supplierBillNo.trim(),
					billDate: voucherDate,
					dueDate: dueDate || voucherDate,
					poReference,
					transportMode,
					vehicleNo,
					lrNumber,
					challanRef,
					taxMode,
					narration,
					freight,
					packing,
					roundOff,
					billDiscount,
					godownName: godown,
					purchaseAccountId,
					inputGstAccountId,
					payableAccountId,
					stockAccountId,
					skipStockMovement: Boolean(sourceGrnId),
					lines: filledLines.map((line) => ({
						itemId: line.itemId,
						description: line.itemName,
						quantity: line.quantity,
						unit: line.unit,
						rate: line.rate,
						gstRate: line.gstRate,
						discountPercent: line.discountPercent,
						godownName: line.godownName || godown
					}))
				});
				if (sourceGrnId) {
					await markGrnConverted.mutateAsync({
						companyId,
						grnId: sourceGrnId,
						billId: bill.id
					});
					await queryClient.invalidateQueries({ queryKey: trpc.purchaseGrns.list.queryKey({ companyId }) });
				}
				if (attachmentFile) {
					const buffer = await attachmentFile.arrayBuffer();
					const bytes = new Uint8Array(buffer);
					let binary = "";
					for (const byte of bytes) binary += String.fromCharCode(byte);
					await createAttachment.mutateAsync({
						companyId,
						linkedDocumentType: "purchase_bill",
						linkedDocumentId: bill.id,
						originalFilename: attachmentFile.name,
						contentType: attachmentFile.type || "application/octet-stream",
						sizeBytes: attachmentFile.size,
						contentBase64: btoa(binary)
					});
					setAttachmentFile(null);
				}
				await queryClient.invalidateQueries({ queryKey: trpc.purchases.list.queryKey({ companyId }) });
				setPreviewTarget({
					kind: "purchase",
					id: bill.id,
					number: bill.supplierBillNumber
				});
				setPreviewOpen(true);
			}
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listStockBalances.queryKey({ companyId }) });
		} catch (error) {
			reportSaveError(error, "Save failed");
		}
	}
	const partyOptions = parties.map((entry) => ({
		value: entry.id,
		label: entry.name,
		keywords: `${entry.gstin ?? ""} ${entry.stateCode}`,
		description: `${entry.gstin ?? "Unregistered"} · ${stateLabel(entry.stateCode)}`
	}));
	const itemOptions = items.map((entry) => ({
		value: entry.id,
		label: entry.name,
		keywords: entry.hsnCode,
		description: `HSN ${entry.hsnCode} · ${entry.gstRate}% · ${entry.baseUnit}`
	}));
	const saving = postSales.isPending || postPurchase.isPending || nextNumber.isPending;
	const transportFilledCount = countFilled(poReference, challanRef, transportMode, vehicleNo, lrNumber);
	const chargesFilledCount = countFilled(narration, freight !== "0.00" ? freight : "", packing !== "0.00" ? packing : "", roundOff !== "0.00" ? roundOff : "", billDiscount !== "0.00" ? billDiscount : "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: isSales ? "/app/sales" : "/app/purchases",
				children: "Back to list"
			})
		}),
		title: isSales ? "New sales bill" : "New purchase bill",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] sm:pb-24",
				onSubmit: handleSave,
				ref: formRef,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "flex flex-col gap-4",
							children: isSales ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-col gap-1.5 self-start",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MasterLookup, {
											createAction: {
												label: "Add new customer…",
												onSelect: () => setPartyCreateOpen(true)
											},
											emptyText: "No contacts yet.",
											onValueChange: selectParty,
											options: partyOptions,
											placeholder: "Select customer",
											searchPlaceholder: "Search name / GSTIN",
											title: "Customer lookup",
											value: partyId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentPartyChips, {
											createLabel: "Add new customer…",
											onCreateNew: () => setPartyCreateOpen(true),
											onSelect: selectParty,
											parties,
											recentIds,
											selectedId: partyId
										}),
										party ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col gap-0.5 text-xs text-muted-foreground",
												children: [party.gstin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "break-all font-mono",
													children: party.gstin
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unregistered" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "break-words",
													children: stateLabel(placeOfSupply)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupplyRegionBadge, { region })]
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "vch-date",
												children: "Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
												id: "vch-date",
												onChange: setVoucherDate,
												required: true,
												value: voucherDate
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Payment"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												onValueChange: (value) => {
													const nextMode = value;
													setPaymentMode(nextMode);
													if (nextMode === "cash") setDueDate("");
												},
												value: paymentMode,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													className: "w-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "credit",
													children: "Credit"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "cash",
													children: "Cash"
												})] }) })]
											})]
										}),
										paymentMode === "credit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "sales-due-date",
												children: "Due date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
												id: "sales-due-date",
												onChange: setDueDate,
												value: dueDate
											})]
										}) : null
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-col gap-1.5 self-start",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Supplier"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MasterLookup, {
											createAction: {
												label: "Add new supplier…",
												onSelect: () => setPartyCreateOpen(true)
											},
											emptyText: "No contacts yet.",
											onValueChange: selectParty,
											options: partyOptions,
											placeholder: "Select supplier",
											searchPlaceholder: "Search name / GSTIN",
											title: "Supplier lookup",
											value: partyId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentPartyChips, {
											createLabel: "Add new supplier…",
											onCreateNew: () => setPartyCreateOpen(true),
											onSelect: selectParty,
											parties,
											recentIds,
											selectedId: partyId
										}),
										party ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col gap-0.5 text-xs text-muted-foreground",
												children: [party.gstin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "break-all font-mono",
													children: party.gstin
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unregistered" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "break-words",
													children: stateLabel(placeOfSupply)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupplyRegionBadge, { region })]
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "vch-date",
											children: "Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
											id: "vch-date",
											onChange: setVoucherDate,
											required: true,
											value: voucherDate
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Voucher no."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "w-fit font-mono",
											variant: "outline",
											children: voucherNoPreview === "Auto" ? `${series} · auto` : voucherNoPreview
										})]
									})]
								})]
							})
						}),
						isSales ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
							className: "group/collapsible",
							defaultOpen: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSectionTrigger, { title: "Tax & billing" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Series"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: setSeries,
											value: series,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: seriesOptions.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: entry,
												children: entry
											}, entry)) }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Supply type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: (value) => handleRegionChange(value),
											value: region,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "local",
												children: "Local (CGST + SGST)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "central",
												children: "IGST"
											})] }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Place of supply"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: setPlaceOfSupply,
											value: placeOfSupply,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: indianStates.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: state.code,
												children: [
													state.name,
													" (",
													state.code,
													")"
												]
											}, state.code)) }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Tax type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: (value) => setTaxMode(value),
											value: taxMode,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "exclusive",
												children: "Exclusive"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "inclusive",
												children: "Inclusive"
											})] }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Godown"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: handleHeaderGodownChange,
											value: godown,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: godownNames.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: entry,
												children: entry
											}, entry)) }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col justify-end gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Voucher no."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "w-fit font-mono",
											variant: "outline",
											children: voucherNoPreview === "Auto" ? `${series} · auto` : voucherNoPreview
										})]
									})
								]
							}) })]
						}) : null,
						!isSales ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
							className: "group/collapsible",
							defaultOpen: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSectionTrigger, { title: "Bill options" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Series"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: setSeries,
											value: series,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: seriesOptions.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: entry,
												children: entry
											}, entry)) }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Place of supply"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: setPlaceOfSupply,
											value: placeOfSupply,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: indianStates.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: state.code,
												children: [
													state.name,
													" (",
													state.code,
													")"
												]
											}, state.code)) }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Tax type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: (value) => setTaxMode(value),
											value: taxMode,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "exclusive",
												children: "Exclusive"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "inclusive",
												children: "Inclusive"
											})] }) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Godown"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: handleHeaderGodownChange,
											value: godown,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: godownNames.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: entry,
												children: entry
											}, entry)) }) })]
										})]
									}),
									party?.priceListId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Price list"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "rounded-md bg-muted/40 px-2.5 py-2 text-xs text-muted-foreground",
											children: "Party price list — rates apply on item pick"
										})]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "sup-bill",
											children: "Supplier bill no."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "sup-bill",
											onChange: (event) => setSupplierBillNo(event.target.value),
											required: true,
											value: supplierBillNo
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "due-date",
											children: "Due date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
											id: "due-date",
											onChange: setDueDate,
											value: dueDate
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5 sm:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "bill-attachment",
												children: "Bill attachment"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												accept: "image/*,.pdf",
												id: "bill-attachment",
												onChange: (event) => setAttachmentFile(event.target.files?.[0] ?? null),
												type: "file"
											}),
											attachmentFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "break-all text-xs text-muted-foreground",
												children: attachmentFile.name
											}) : null
										]
									})
								]
							}) })]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
							className: "group/collapsible",
							defaultOpen: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSectionTrigger, {
									filledCount: transportFilledCount,
									title: "Transport & references"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "po-ref",
											children: "PO / order ref"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "po-ref",
											onChange: (event) => setPoReference(event.target.value),
											value: poReference
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "challan-ref",
											children: "Challan ref"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "challan-ref",
											onChange: (event) => setChallanRef(event.target.value),
											value: challanRef
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "transport-mode",
											children: "Transport"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "transport-mode",
											onChange: (event) => setTransportMode(event.target.value),
											placeholder: "Road / Rail",
											value: transportMode
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "vehicle-no",
											children: "Vehicle no."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "vehicle-no",
											onChange: (event) => setVehicleNo(event.target.value),
											value: vehicleNo
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "lr-number",
											children: "LR / AWB"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "lr-number",
											onChange: (event) => setLrNumber(event.target.value),
											value: lrNumber
										})]
									})
								]
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium",
									children: "Line items"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: addLine,
									size: "sm",
									type: "button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "Add row"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto rounded-md border border-border",
								"data-voucher-grid": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: "hover:bg-transparent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "item",
											children: "Item"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "qty",
											children: "Qty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "unit",
											children: "Unit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "rate",
											children: "Rate"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "disc",
											children: "Disc%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "taxable",
											children: "Taxable"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "gst",
											children: region === "local" ? "GST" : "IGST"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-voucher-col": "total",
											children: "Total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { "data-voucher-col": "actions" })
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: computedLines.map((line, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-voucher-col": "item",
										"data-voucher-grid-cell": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex min-w-0 flex-col gap-0.5 py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MasterLookup, {
												appearance: "grid",
												createAction: {
													label: "Add new item…",
													onSelect: () => openItemCreate(line.key)
												},
												emptyText: "No items yet.",
												onFocus: () => {
													activeRowIndexRef.current = rowIndex;
												},
												onValueChange: (value) => selectItem(line.key, value),
												options: itemOptions,
												placeholder: "Select item",
												searchPlaceholder: "Search name / HSN",
												title: "Item lookup",
												value: line.itemId
											}), line.hsnCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "truncate px-2 font-mono text-[10px] text-muted-foreground",
												children: ["HSN ", line.hsnCode]
											}) : null]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-voucher-col": "qty",
										"data-voucher-grid-cell": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "tabular-nums",
											"data-voucher-cell": `${rowIndex}-quantity`,
											"data-voucher-grid-control": true,
											variant: "grid",
											onChange: (event) => updateLine(line.key, { quantity: event.target.value }),
											onFocus: () => {
												activeRowIndexRef.current = rowIndex;
											},
											onKeyDown: (event) => handleGridKeyDown(event, rowIndex, "quantity"),
											value: line.quantity
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-voucher-col": "unit",
										"data-voucher-grid-cell": true,
										children: line.itemId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: (value) => selectUnit(line.key, value),
											value: line.unit,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-voucher-grid-control": true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: line.unit,
												children: line.unit
											}) }) })]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block px-2 text-muted-foreground",
											children: "—"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-voucher-col": "rate",
										"data-voucher-grid-cell": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "tabular-nums",
											"data-voucher-cell": `${rowIndex}-rate`,
											"data-voucher-grid-control": true,
											variant: "grid",
											onChange: (event) => updateLine(line.key, { rate: event.target.value }),
											onFocus: () => {
												activeRowIndexRef.current = rowIndex;
											},
											onKeyDown: (event) => handleGridKeyDown(event, rowIndex, "rate"),
											value: line.rate
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-voucher-col": "disc",
										"data-voucher-grid-cell": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "tabular-nums",
											"data-voucher-cell": `${rowIndex}-discountPercent`,
											"data-voucher-grid-control": true,
											variant: "grid",
											onChange: (event) => updateLine(line.key, { discountPercent: event.target.value }),
											onFocus: () => {
												activeRowIndexRef.current = rowIndex;
											},
											onKeyDown: (event) => handleGridKeyDown(event, rowIndex, "discountPercent"),
											value: line.discountPercent
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-sm tabular-nums",
										"data-voucher-col": "taxable",
										children: formatInr(line.taxableAmount)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-sm tabular-nums",
										"data-voucher-col": "gst",
										children: formatInr(lineGstAmount(line, region))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-sm font-medium tabular-nums",
										"data-voucher-col": "total",
										children: formatInr(line.lineTotal)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-voucher-col": "actions",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
											onClick: () => removeLine(line.key),
											size: "icon-sm",
											type: "button",
											variant: "ghost",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: "Remove row"
											})]
										})
									})
								] }, line.key)) })] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
								className: "group/collapsible min-w-0",
								defaultOpen: false,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSectionTrigger, {
										filledCount: chargesFilledCount,
										title: "Charges & notes"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "freight",
												children: "Freight"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "freight",
												onChange: (event) => setFreight(event.target.value),
												value: freight
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "packing",
												children: "Packing"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "packing",
												onChange: (event) => setPacking(event.target.value),
												value: packing
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "roundoff",
												children: "Round off"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "roundoff",
												onChange: (event) => setRoundOff(event.target.value),
												value: roundOff
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "bill-discount",
												children: "Bill discount"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "bill-discount",
												onChange: (event) => setBillDiscount(event.target.value),
												value: billDiscount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5 sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												htmlFor: "narration",
												children: "Narration"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "narration",
												onChange: (event) => setNarration(event.target.value),
												placeholder: "Optional notes",
												rows: 2,
												value: narration
											})]
										})
									]
								}) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 text-sm sm:ml-auto sm:max-w-sm sm:w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-medium",
										children: "GST summary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: region === "local" ? "CGST + SGST" : "IGST"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Taxable"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium tabular-nums",
												children: formatInr(totals.taxableAmount)
											})]
										}),
										region === "local" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "CGST"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums",
												children: formatInr(totals.cgstAmount)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "SGST"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums",
												children: formatInr(totals.sgstAmount)
											})]
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "IGST"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums",
												children: formatInr(totals.igstAmount)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Sundry"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums",
												children: formatInr(totals.sundryTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3 border-t pt-3 text-base",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Grand total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("font-semibold tabular-nums", isSales ? "text-money-in" : "text-money-out"),
												children: formatInr(totals.grandTotal)
											})]
										})
									]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] backdrop-blur supports-[backdrop-filter]:bg-background/80 print:hidden md:left-[var(--sidebar-width)] md:transition-[left] md:duration-200 md:ease-linear group-has-data-[state=collapsed]/sidebar-wrapper:md:left-[var(--sidebar-width-icon)]",
					"data-ui": "chrome",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-3 py-2 sm:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Taxable"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium tabular-nums",
											children: formatInr(totals.taxableAmount)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "GST"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium tabular-nums",
											children: formatInr(region === "local" ? Number(totals.cgstAmount) + Number(totals.sgstAmount) : Number(totals.igstAmount))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-end gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold tabular-nums",
											children: formatInr(totals.grandTotal)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden flex-col items-end gap-0.5 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Grand total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-lg font-semibold tabular-nums", isSales ? "text-money-in" : "text-money-out"),
									children: formatInr(totals.grandTotal)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full sm:w-auto",
								disabled: saving,
								type: "submit",
								children: saving ? "Saving…" : "Save bill"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherPreviewSheet, {
				onOpenChange: setPreviewOpen,
				open: previewOpen,
				target: previewTarget
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePartyDialog, {
				defaultPartyType: isSales ? "customer" : "supplier",
				lockPartyType: true,
				onCreated: applyCreatedParty,
				onOpenChange: setPartyCreateOpen,
				open: partyCreateOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateItemDialog, {
				onCreated: handleItemCreated,
				onOpenChange: (next) => {
					setItemCreateOpen(next);
					if (!next) setItemCreateLineKey(null);
				},
				open: itemCreateOpen
			})
		]
	});
}
//#endregion
export { VoucherEntryPage as t };
