import { t as Decimal } from "./decimal-DLy3he49.js";
//#region src/features/accounting/ageing-service.ts
/** Buckets in escalating order, for anything that renders the whole set. */
var AGEING_BUCKET_ORDER = [
	"not-due",
	"1-30",
	"31-60",
	"61-90",
	"90+"
];
var AGEING_BUCKET_DISPLAY_LABEL = {
	"not-due": "Not due",
	"1-30": "1-30 days",
	"31-60": "31-60 days",
	"61-90": "61-90 days",
	"90+": "90+ days"
};
function bucketFor(daysPastDue) {
	if (daysPastDue <= 0) return "not-due";
	if (daysPastDue <= 30) return "1-30";
	if (daysPastDue <= 60) return "31-60";
	if (daysPastDue <= 90) return "61-90";
	return "90+";
}
function daysBetween(from, asOf) {
	const fromDate = new Date(from);
	const diffMs = asOf.getTime() - fromDate.getTime();
	return Math.max(0, Math.floor(diffMs / (1e3 * 60 * 60 * 24)));
}
/**
* Cash/immediate documents carry no usable due date, so they age from the day
* they were raised.
*/
function effectiveDueDate(dueDate, documentDate) {
	const candidate = dueDate?.trim();
	if (!candidate || Number.isNaN(new Date(candidate).getTime())) return documentDate;
	return candidate;
}
function emptyBucketTotals() {
	return {
		"not-due": "0.00",
		"1-30": "0.00",
		"31-60": "0.00",
		"61-90": "0.00",
		"90+": "0.00"
	};
}
function addBucketTotals(totals, rows) {
	const sums = {
		"not-due": new Decimal(totals["not-due"]),
		"1-30": new Decimal(totals["1-30"]),
		"31-60": new Decimal(totals["31-60"]),
		"61-90": new Decimal(totals["61-90"]),
		"90+": new Decimal(totals["90+"])
	};
	for (const row of rows) sums[row.bucket] = sums[row.bucket].plus(new Decimal(row.outstandingAmount));
	return {
		"not-due": sums["not-due"].toFixed(2),
		"1-30": sums["1-30"].toFixed(2),
		"31-60": sums["31-60"].toFixed(2),
		"61-90": sums["61-90"].toFixed(2),
		"90+": sums["90+"].toFixed(2)
	};
}
async function buildReceivablesAgeing(deps, companyId, asOf = /* @__PURE__ */ new Date()) {
	const [invoices, parties] = await Promise.all([deps.invoices.listByCompanyId(companyId), deps.parties.listByCompanyId(companyId)]);
	const partyById = new Map(parties.map((party) => [party.id, party]));
	const rows = invoices.filter((invoice) => new Decimal(invoice.outstandingAmount).gt(0)).map((invoice) => {
		const dueDate = effectiveDueDate(invoice.dueDate, invoice.invoiceDate);
		const daysPastDue = daysBetween(dueDate, asOf);
		return {
			partyId: invoice.customerId,
			partyName: partyById.get(invoice.customerId)?.name ?? "Customer",
			documentNumber: invoice.invoiceNumber,
			documentDate: invoice.invoiceDate,
			dueDate,
			outstandingAmount: invoice.outstandingAmount,
			daysOutstanding: daysBetween(invoice.invoiceDate, asOf),
			daysPastDue,
			bucket: bucketFor(daysPastDue)
		};
	});
	return {
		companyId,
		rows,
		bucketTotals: addBucketTotals(emptyBucketTotals(), rows)
	};
}
async function buildPayablesAgeing(deps, companyId, asOf = /* @__PURE__ */ new Date()) {
	const [bills, parties] = await Promise.all([deps.bills.listByCompanyId(companyId), deps.parties.listByCompanyId(companyId)]);
	const partyById = new Map(parties.map((party) => [party.id, party]));
	const rows = bills.filter((bill) => new Decimal(bill.outstandingAmount).gt(0)).map((bill) => {
		const dueDate = effectiveDueDate(bill.dueDate, bill.billDate);
		const daysPastDue = daysBetween(dueDate, asOf);
		return {
			partyId: bill.supplierId,
			partyName: partyById.get(bill.supplierId)?.name ?? "Supplier",
			documentNumber: bill.supplierBillNumber,
			documentDate: bill.billDate,
			dueDate,
			outstandingAmount: bill.outstandingAmount,
			daysOutstanding: daysBetween(bill.billDate, asOf),
			daysPastDue,
			bucket: bucketFor(daysPastDue)
		};
	});
	return {
		companyId,
		rows,
		bucketTotals: addBucketTotals(emptyBucketTotals(), rows)
	};
}
//#endregion
export { buildReceivablesAgeing as i, AGEING_BUCKET_ORDER as n, buildPayablesAgeing as r, AGEING_BUCKET_DISPLAY_LABEL as t };
