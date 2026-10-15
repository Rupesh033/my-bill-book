import { t as Decimal } from "./decimal-DLy3he49.js";
//#region src/features/gst/gst-calculator.ts
Decimal.set({
	precision: 20,
	rounding: Decimal.ROUND_HALF_UP
});
function money(value) {
	return new Decimal(value);
}
function formatMoney(value) {
	return value.toFixed(2);
}
function calculateGst(input) {
	const taxableAmount = money(input.taxableAmount);
	const gstRate = money(input.gstRate);
	const totalGstAmount = taxableAmount.mul(gstRate).div(100);
	const supplyType = input.companyStateCode === input.partyStateCode ? "intra_state" : "inter_state";
	if (supplyType === "intra_state") {
		const half = totalGstAmount.div(2);
		return {
			taxableAmount: formatMoney(taxableAmount),
			gstRate: formatMoney(gstRate),
			supplyType,
			cgstAmount: formatMoney(half),
			sgstAmount: formatMoney(half),
			igstAmount: "0.00",
			totalGstAmount: formatMoney(totalGstAmount),
			totalAmount: formatMoney(taxableAmount.plus(totalGstAmount))
		};
	}
	return {
		taxableAmount: formatMoney(taxableAmount),
		gstRate: formatMoney(gstRate),
		supplyType,
		cgstAmount: "0.00",
		sgstAmount: "0.00",
		igstAmount: formatMoney(totalGstAmount),
		totalGstAmount: formatMoney(totalGstAmount),
		totalAmount: formatMoney(taxableAmount.plus(totalGstAmount))
	};
}
//#endregion
export { calculateGst as t };
