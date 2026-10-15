import { n as toast } from "./dist-FOYHZCix.js";
import { t as Decimal } from "./decimal-DLy3he49.js";
import { t as calculateGst } from "./gst-calculator-BMG0M7aV.js";
//#region src/features/accounting/voucher-math.ts
Decimal.set({
	precision: 20,
	rounding: Decimal.ROUND_HALF_UP
});
function money(value) {
	const parsed = Number(value);
	return new Decimal(Number.isFinite(parsed) ? parsed : 0);
}
function format(value) {
	return value.toFixed(2);
}
function isValidStateCode(code) {
	return /^[0-9]{2}$/.test((code ?? "").trim());
}
function resolveStateCode(...candidates) {
	for (const candidate of candidates) {
		const normalized = (candidate ?? "").trim();
		if (isValidStateCode(normalized)) return normalized;
	}
	return "";
}
function resolvePlaceOfSupply(input) {
	const fallback = input.fallbackStateCode ?? "27";
	const companyState = resolveStateCode(input.companyStateCode, fallback);
	const partyState = resolveStateCode(input.partyStateCode, companyState);
	const selected = resolveStateCode(input.selectedPlaceOfSupply);
	if (input.region === "local") return companyState;
	return selected || partyState || companyState;
}
function partyStateForRegion(region, partyStateCode, companyStateCode) {
	if (region === "local") return companyStateCode;
	return partyStateCode === companyStateCode ? "24" : partyStateCode;
}
function computeVoucherLine(line, region, partyStateCode, taxMode = "exclusive", companyStateCode = "27") {
	const qty = money(line.quantity);
	const rate = money(line.rate);
	const discountPercent = money(line.discountPercent);
	const gstRate = money(line.gstRate || "0");
	const grossAmount = qty.mul(rate);
	const discountAmount = grossAmount.mul(discountPercent).div(100);
	const netAmount = Decimal.max(grossAmount.minus(discountAmount), new Decimal(0));
	let taxableAmount = netAmount;
	if (taxMode === "inclusive" && gstRate.gt(0)) taxableAmount = netAmount.mul(100).div(gstRate.plus(100));
	const gst = calculateGst({
		taxableAmount: format(taxableAmount),
		gstRate: line.gstRate || "0",
		companyStateCode,
		partyStateCode: partyStateForRegion(region, partyStateCode, companyStateCode)
	});
	return {
		...line,
		grossAmount: format(grossAmount),
		discountAmount: format(discountAmount),
		taxableAmount: gst.taxableAmount,
		cgstAmount: gst.cgstAmount,
		sgstAmount: gst.sgstAmount,
		igstAmount: gst.igstAmount,
		lineTotal: taxMode === "inclusive" ? format(netAmount) : gst.totalAmount
	};
}
function computeVoucherTotals(lines, sundry) {
	const taxableAmount = lines.reduce((sum, line) => sum.plus(money(line.taxableAmount)), new Decimal(0));
	const cgstAmount = lines.reduce((sum, line) => sum.plus(money(line.cgstAmount)), new Decimal(0));
	const sgstAmount = lines.reduce((sum, line) => sum.plus(money(line.sgstAmount)), new Decimal(0));
	const igstAmount = lines.reduce((sum, line) => sum.plus(money(line.igstAmount)), new Decimal(0));
	const totalGstAmount = cgstAmount.plus(sgstAmount).plus(igstAmount);
	const billDiscountAmount = money(sundry.billDiscount ?? "0");
	const sundryTotal = money(sundry.freight).plus(money(sundry.packing)).plus(money(sundry.roundOff)).minus(billDiscountAmount);
	const grandTotal = taxableAmount.plus(totalGstAmount).plus(sundryTotal);
	return {
		taxableAmount: format(taxableAmount),
		cgstAmount: format(cgstAmount),
		sgstAmount: format(sgstAmount),
		igstAmount: format(igstAmount),
		totalGstAmount: format(totalGstAmount),
		sundryTotal: format(sundryTotal),
		billDiscountAmount: format(billDiscountAmount),
		grandTotal: format(grandTotal)
	};
}
function emptyVoucherLine(defaultGodown = "") {
	return {
		key: crypto.randomUUID(),
		itemId: "",
		itemName: "",
		hsnCode: "",
		gstRate: "0.00",
		unit: "",
		uqc: "",
		quantity: "1",
		rate: "0.00",
		discountPercent: "0",
		godownName: defaultGodown
	};
}
function createEmptyVoucherLines(count = 1, defaultGodown = "") {
	return Array.from({ length: count }, () => emptyVoucherLine(defaultGodown));
}
//#endregion
//#region src/lib/form-validation.ts
var WORKSPACE_LOADING_MESSAGE = "Workspace is still loading. Try again in a moment.";
var NO_COMPANY_MESSAGE = "Select or create a company before continuing.";
function showValidationError(message) {
	toast.error(message);
	return false;
}
function failForm(setFormError, message) {
	setFormError(message);
	toast.error(message);
	return false;
}
function requireWorkspace(companyId, isReady = true) {
	if (companyId) return true;
	showValidationError(isReady ? NO_COMPANY_MESSAGE : WORKSPACE_LOADING_MESSAGE);
	return false;
}
function requireTrimmed(value, label) {
	const trimmed = (value ?? "").trim();
	if (!trimmed) {
		showValidationError(`${label} is required.`);
		return null;
	}
	return trimmed;
}
function requireSelection(value, label) {
	if (!value?.trim()) {
		showValidationError(`Select ${label.toLowerCase()}.`);
		return null;
	}
	return value;
}
function parsePositiveDecimal(value) {
	const trimmed = (value ?? "").trim();
	if (!trimmed) return null;
	const parsed = Number(trimmed);
	if (!Number.isFinite(parsed) || parsed <= 0) return null;
	return new Decimal(parsed);
}
function requirePositiveAmount(value, label) {
	const trimmed = (value ?? "").trim();
	if (!trimmed) {
		showValidationError(`${label} is required.`);
		return null;
	}
	if (!parsePositiveDecimal(trimmed)) {
		showValidationError(`${label} must be greater than zero.`);
		return null;
	}
	return trimmed;
}
function requirePositiveQuantity(value, label = "Quantity") {
	return requirePositiveAmount(value, label);
}
function requireStateCode(value, label) {
	const trimmed = (value ?? "").trim();
	if (!isValidStateCode(trimmed)) {
		showValidationError(`${label} must be a valid 2-digit state code.`);
		return null;
	}
	return trimmed;
}
function requireAmountNotExceeding(amount, maximum, label) {
	const amountDecimal = parsePositiveDecimal(amount);
	if (!amountDecimal) return false;
	const maxDecimal = parsePositiveDecimal(maximum);
	if (!maxDecimal) {
		showValidationError(`${label} cannot exceed the outstanding balance.`);
		return false;
	}
	if (amountDecimal.gt(maxDecimal)) {
		showValidationError(`${label} cannot exceed outstanding balance (${maxDecimal.toFixed(2)}).`);
		return false;
	}
	return true;
}
function requireBalancedJournal(lines) {
	let debitTotal = new Decimal(0);
	let creditTotal = new Decimal(0);
	for (const line of lines) {
		const debit = Number(line.debit || 0);
		const credit = Number(line.credit || 0);
		if (Number.isFinite(debit)) debitTotal = debitTotal.plus(debit);
		if (Number.isFinite(credit)) creditTotal = creditTotal.plus(credit);
	}
	if (debitTotal.lte(0)) {
		showValidationError("Enter debit and credit amounts.");
		return false;
	}
	if (!debitTotal.equals(creditTotal)) {
		showValidationError(`Debits (${debitTotal.toFixed(2)}) must equal credits (${creditTotal.toFixed(2)}).`);
		return false;
	}
	return true;
}
function requireVoucherLines(lines) {
	if (lines.length === 0) {
		showValidationError("Add at least one item row.");
		return false;
	}
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		const row = index + 1;
		if (!parsePositiveDecimal(line.quantity)) {
			showValidationError(`Row ${row}: quantity must be greater than zero.`);
			return false;
		}
		if (!parsePositiveDecimal(line.rate)) {
			showValidationError(`Row ${row}: rate must be greater than zero.`);
			return false;
		}
	}
	return true;
}
//#endregion
export { resolvePlaceOfSupply as _, requirePositiveQuantity as a, requireTrimmed as c, computeVoucherLine as d, computeVoucherTotals as f, partyStateForRegion as g, isValidStateCode as h, requirePositiveAmount as i, requireVoucherLines as l, emptyVoucherLine as m, requireAmountNotExceeding as n, requireSelection as o, createEmptyVoucherLines as p, requireBalancedJournal as r, requireStateCode as s, failForm as t, requireWorkspace as u, resolveStateCode as v };
