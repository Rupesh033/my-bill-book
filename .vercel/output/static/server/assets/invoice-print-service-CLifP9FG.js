import { t as Decimal } from "./decimal-DLy3he49.js";
//#region src/features/documents/voucher-print-mappers.ts
function toPrintCompany(company) {
	return {
		legalName: company.legalName,
		tradeName: company.tradeName,
		gstin: company.gstin,
		stateCode: company.stateCode,
		addressLine1: company.addressLine1,
		addressLine2: company.addressLine2,
		city: company.city,
		pincode: company.pincode,
		pan: company.pan,
		contactPhone: company.contactPhone,
		contactEmail: company.contactEmail,
		bankName: company.bankName,
		bankAccountNumber: company.bankAccountNumber,
		bankIfsc: company.bankIfsc,
		authorizedSignatory: company.authorizedSignatory,
		logoUrl: company.logoUrl,
		invoiceTerms: company.invoiceTerms
	};
}
function toPrintParty(party) {
	return {
		name: party.name,
		gstin: party.gstin,
		stateCode: party.stateCode,
		pan: party.pan,
		billingAddress: party.billingAddress,
		shippingAddress: party.shippingAddress,
		contactPhone: party.contactPhone,
		contactEmail: party.contactEmail
	};
}
//#endregion
//#region src/features/documents/gst-invoice-format.ts
Decimal.set({
	precision: 20,
	rounding: Decimal.ROUND_HALF_UP
});
var GST_STATE_NAMES = {
	"01": "Jammu and Kashmir",
	"02": "Himachal Pradesh",
	"03": "Punjab",
	"04": "Chandigarh",
	"05": "Uttarakhand",
	"06": "Haryana",
	"07": "Delhi",
	"08": "Rajasthan",
	"09": "Uttar Pradesh",
	"10": "Bihar",
	"11": "Sikkim",
	"12": "Arunachal Pradesh",
	"13": "Nagaland",
	"14": "Manipur",
	"15": "Mizoram",
	"16": "Tripura",
	"17": "Meghalaya",
	"18": "Assam",
	"19": "West Bengal",
	"20": "Jharkhand",
	"21": "Odisha",
	"22": "Chhattisgarh",
	"23": "Madhya Pradesh",
	"24": "Gujarat",
	"25": "Daman and Diu",
	"26": "Dadra and Nagar Haveli",
	"27": "Maharashtra",
	"28": "Andhra Pradesh (Old)",
	"29": "Karnataka",
	"30": "Goa",
	"31": "Lakshadweep",
	"32": "Kerala",
	"33": "Tamil Nadu",
	"34": "Puducherry",
	"35": "Andaman and Nicobar Islands",
	"36": "Telangana",
	"37": "Andhra Pradesh",
	"38": "Ladakh",
	"97": "Other Territory",
	"99": "Centre Jurisdiction"
};
function normalizeStateCode(code) {
	return (code ?? "").trim().slice(0, 2);
}
function stateLabel(code) {
	const normalized = normalizeStateCode(code);
	if (!normalized) return "";
	const name = GST_STATE_NAMES[normalized];
	return name ? `${normalized} - ${name}` : normalized;
}
/** Formats ISO dates (YYYY-MM-DD) for Indian tax invoices (DD-MM-YYYY). */
function formatIndianDate(value) {
	const raw = (value ?? "").trim().slice(0, 10);
	if (!raw) return "";
	const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
	if (isoMatch) return `${isoMatch[3]}-${isoMatch[2]}-${isoMatch[1]}`;
	return raw;
}
function isInterStateSupply(companyStateCode, placeOfSupplyCode) {
	const supplier = normalizeStateCode(companyStateCode);
	const place = normalizeStateCode(placeOfSupplyCode);
	if (!supplier || !place) return false;
	return supplier !== place;
}
function splitLineGst(input, isInterState) {
	const gstAmount = new Decimal(input.gstAmount || "0");
	const gstRate = new Decimal(input.gstRate || "0");
	if (isInterState) return {
		cgstRate: "0.00",
		cgstAmount: "0.00",
		sgstRate: "0.00",
		sgstAmount: "0.00",
		igstRate: gstRate.toFixed(2),
		igstAmount: gstAmount.toFixed(2)
	};
	const halfRate = gstRate.dividedBy(2);
	const halfAmount = gstAmount.dividedBy(2);
	return {
		cgstRate: halfRate.toFixed(2),
		cgstAmount: halfAmount.toFixed(2),
		sgstRate: halfRate.toFixed(2),
		sgstAmount: gstAmount.minus(halfAmount).toFixed(2),
		igstRate: "0.00",
		igstAmount: "0.00"
	};
}
var ONES = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen"
];
var TENS = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety"
];
function twoDigitsToWords(value) {
	if (value < 20) return ONES[value];
	const tens = Math.floor(value / 10);
	const ones = value % 10;
	return ones ? `${TENS[tens]} ${ONES[ones]}` : TENS[tens];
}
function integerToWords(value) {
	if (value === 0) return "Zero";
	const crore = Math.floor(value / 1e7);
	const lakh = Math.floor(value % 1e7 / 1e5);
	const thousand = Math.floor(value % 1e5 / 1e3);
	const hundred = Math.floor(value % 1e3 / 100);
	const rest = value % 100;
	const parts = [];
	if (crore) parts.push(`${integerToWords(crore)} Crore`);
	if (lakh) parts.push(`${twoDigitsToWords(lakh)} Lakh`);
	if (thousand) parts.push(`${twoDigitsToWords(thousand)} Thousand`);
	if (hundred) parts.push(`${ONES[hundred]} Hundred`);
	if (rest) parts.push(twoDigitsToWords(rest));
	return parts.join(" ");
}
function amountInWords(amount) {
	const value = new Decimal(amount || "0");
	const rupees = value.floor();
	const paise = value.minus(rupees).times(100).round().toNumber();
	let result = `${integerToWords(rupees.toNumber())} Rupees`;
	if (paise > 0) result += ` and ${twoDigitsToWords(paise)} Paise`;
	return `${result} Only`;
}
//#endregion
//#region src/features/documents/voucher-print-builder.ts
Decimal.set({
	precision: 20,
	rounding: Decimal.ROUND_HALF_UP
});
function buildVoucherPrintDocument(input) {
	const placeOfSupplyCode = input.placeOfSupplyCode || input.party.stateCode;
	const isInterState = isInterStateSupply(input.company.stateCode, placeOfSupplyCode);
	const lines = input.rawLines.map((line, index) => {
		const split = splitLineGst({
			gstRate: line.gstRate,
			gstAmount: line.gstAmount
		}, isInterState);
		return {
			serial: index + 1,
			description: line.description,
			hsnCode: line.hsnCode,
			quantity: line.quantity,
			unit: line.unit,
			rate: line.rate,
			discountAmount: line.discountAmount,
			taxableAmount: line.taxableAmount,
			gstRate: line.gstRate,
			gstAmount: line.gstAmount,
			lineTotal: line.lineTotal,
			...split
		};
	});
	const hsnMap = /* @__PURE__ */ new Map();
	for (const line of lines) {
		const key = line.hsnCode || "—";
		const existing = hsnMap.get(key) ?? {
			taxable: new Decimal(0),
			cgst: new Decimal(0),
			sgst: new Decimal(0),
			igst: new Decimal(0)
		};
		existing.taxable = existing.taxable.plus(line.taxableAmount || "0");
		existing.cgst = existing.cgst.plus(line.cgstAmount || "0");
		existing.sgst = existing.sgst.plus(line.sgstAmount || "0");
		existing.igst = existing.igst.plus(line.igstAmount || "0");
		hsnMap.set(key, existing);
	}
	const hsnSummary = [...hsnMap.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([hsnCode, totals]) => ({
		hsnCode,
		taxableAmount: totals.taxable.toFixed(2),
		cgstAmount: totals.cgst.toFixed(2),
		sgstAmount: totals.sgst.toFixed(2),
		igstAmount: totals.igst.toFixed(2),
		totalTax: totals.cgst.plus(totals.sgst).plus(totals.igst).toFixed(2)
	}));
	const totalCgst = lines.reduce((sum, line) => sum.plus(line.cgstAmount || "0"), new Decimal(0)).toFixed(2);
	const totalSgst = lines.reduce((sum, line) => sum.plus(line.sgstAmount || "0"), new Decimal(0)).toFixed(2);
	const totalIgst = lines.reduce((sum, line) => sum.plus(line.igstAmount || "0"), new Decimal(0)).toFixed(2);
	return {
		kind: input.kind,
		title: input.title,
		documentNumber: input.documentNumber,
		documentDate: input.documentDate,
		dueDate: input.dueDate,
		poReference: input.poReference,
		transportMode: input.transportMode,
		vehicleNo: input.vehicleNo,
		lrNumber: input.lrNumber,
		challanRef: input.challanRef,
		paymentMode: input.paymentMode,
		narration: input.narration,
		company: input.company,
		party: input.party,
		partyLabel: input.partyLabel,
		placeOfSupplyLabel: stateLabel(placeOfSupplyCode),
		reverseCharge: input.reverseCharge,
		isInterState,
		copyLabel: input.copyLabel ?? "Original for Recipient",
		lines,
		hsnSummary,
		freight: input.freight,
		packing: input.packing,
		roundOff: input.roundOff,
		billDiscount: input.billDiscount,
		taxableAmount: input.taxableAmount,
		totalCgst,
		totalSgst,
		totalIgst,
		totalGstAmount: input.totalGstAmount,
		totalAmount: input.totalAmount,
		amountInWords: amountInWords(input.totalAmount),
		outstandingAmount: input.outstandingAmount
	};
}
//#endregion
//#region src/features/purchases/purchase-bill-print-service.ts
function buildPurchaseBillPrintDocument(input) {
	const { bill } = input;
	return buildVoucherPrintDocument({
		kind: "purchase",
		title: "Purchase Bill",
		documentNumber: bill.supplierBillNumber,
		documentDate: bill.billDate,
		dueDate: bill.dueDate,
		poReference: bill.poReference,
		transportMode: bill.transportMode,
		vehicleNo: bill.vehicleNo,
		lrNumber: bill.lrNumber,
		challanRef: bill.challanRef,
		narration: bill.narration,
		company: input.company,
		party: input.supplier,
		partyLabel: "Supplier",
		placeOfSupplyCode: bill.placeOfSupply || input.supplier.stateCode,
		reverseCharge: bill.reverseCharge,
		copyLabel: "Office Copy",
		rawLines: bill.lines.map((line) => ({
			description: line.description,
			hsnCode: input.itemById.get(line.itemId)?.hsnCode ?? "",
			quantity: line.quantity,
			unit: line.unit,
			rate: line.rate,
			discountAmount: line.discountAmount,
			taxableAmount: line.taxableAmount,
			gstRate: line.gstRate,
			gstAmount: line.gstAmount,
			lineTotal: line.lineTotal
		})),
		freight: bill.freight,
		packing: bill.packing,
		roundOff: bill.roundOff,
		billDiscount: bill.billDiscount,
		taxableAmount: bill.taxableAmount,
		totalGstAmount: bill.totalGstAmount,
		totalAmount: bill.totalAmount,
		outstandingAmount: bill.outstandingAmount
	});
}
//#endregion
//#region src/features/sales/invoice-print-service.ts
function buildInvoicePrintDocument(input) {
	const { invoice } = input;
	return buildVoucherPrintDocument({
		kind: "sales",
		title: "Tax Invoice",
		documentNumber: invoice.invoiceNumber,
		documentDate: invoice.invoiceDate,
		dueDate: invoice.dueDate,
		poReference: invoice.poReference,
		transportMode: invoice.transportMode,
		vehicleNo: invoice.vehicleNo,
		lrNumber: invoice.lrNumber,
		challanRef: invoice.challanRef,
		paymentMode: invoice.paymentMode,
		narration: invoice.narration,
		company: input.company,
		party: input.customer,
		partyLabel: "Billed to",
		placeOfSupplyCode: invoice.placeOfSupply || input.customer.stateCode,
		reverseCharge: invoice.reverseCharge,
		rawLines: invoice.lines.map((line) => ({
			description: line.description,
			hsnCode: input.itemById.get(line.itemId)?.hsnCode ?? "",
			quantity: line.quantity,
			unit: line.unit,
			rate: line.rate,
			discountAmount: line.discountAmount,
			taxableAmount: line.taxableAmount,
			gstRate: line.gstRate,
			gstAmount: line.gstAmount,
			lineTotal: line.lineTotal
		})),
		freight: invoice.freight,
		packing: invoice.packing,
		roundOff: invoice.roundOff,
		billDiscount: invoice.billDiscount,
		taxableAmount: invoice.taxableAmount,
		totalGstAmount: invoice.totalGstAmount,
		totalAmount: invoice.totalAmount,
		outstandingAmount: invoice.outstandingAmount
	});
}
//#endregion
export { toPrintCompany as a, stateLabel as i, buildPurchaseBillPrintDocument as n, toPrintParty as o, formatIndianDate as r, buildInvoicePrintDocument as t };
