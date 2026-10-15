//#region src/lib/badge-intent.ts
function paymentStatusBadgeIntent(status) {
	if (status === "Paid") return "success";
	return "warning";
}
function invoiceStatusBadgeIntent(input) {
	if (input.cancelled) return "destructive";
	return paymentStatusBadgeIntent(input.paymentStatus);
}
function workflowStatusBadgeIntent(status) {
	if (status === "open") return "info";
	if (status === "converted" || status === "closed") return "success";
	if (status === "cancelled") return "destructive";
	return "neutral";
}
function documentStatusBadgeIntent(status) {
	if (status === "open") return "info";
	if (status === "converted") return "success";
	if (status === "cancelled") return "destructive";
	return "neutral";
}
function partyTypeBadgeIntent(partyType) {
	if (partyType === "customer") return "info";
	if (partyType === "supplier") return "warning";
	return "neutral";
}
function stockStatusBadgeIntent(input) {
	return input.isLowOrZero ? "warning" : "success";
}
function itemTrackingBadgeIntent(tracksInventory) {
	return tracksInventory ? "success" : "neutral";
}
function gstReconciliationBadgeIntent(status) {
	if (status === "matched") return "success";
	if (status === "mismatched" || status === "conflict") return "warning";
	if (status === "missing" || status === "extra" || status === "missing_in_books" || status === "missing_in_2b" || status === "missing_in_gstr1") return "destructive";
	return "neutral";
}
/**
* Receivables/payables ageing risk scale used across accounting UIs:
* current → amber → deeper amber → money-out → overdue red. Never GST purple.
*/
function ageingBucketBadgeIntent(bucket) {
	if (bucket === "not-due") return "success";
	if (bucket === "1-30") return "warning";
	if (bucket === "31-60") return "inventory";
	if (bucket === "61-90") return "money-out";
	return "destructive";
}
/** Chart fill for an ageing bucket — same risk scale as the badge intents. */
function ageingBucketChartColor(bucket) {
	if (bucket === "not-due") return "var(--success)";
	if (bucket === "1-30") return "var(--warning)";
	if (bucket === "31-60") return "var(--inventory)";
	if (bucket === "61-90") return "var(--money-out)";
	return "var(--destructive)";
}
function accountTypeBadgeIntent(accountType) {
	if (accountType === "asset") return "info";
	if (accountType === "liability") return "warning";
	if (accountType === "income") return "success";
	if (accountType === "expense") return "destructive";
	return "neutral";
}
function ocrDraftBadgeIntent(input) {
	if (input.lowConfidence) return "warning";
	if (input.status === "posted") return "success";
	if (input.status === "rejected") return "destructive";
	return "secondary";
}
//#endregion
export { gstReconciliationBadgeIntent as a, ocrDraftBadgeIntent as c, stockStatusBadgeIntent as d, workflowStatusBadgeIntent as f, documentStatusBadgeIntent as i, partyTypeBadgeIntent as l, ageingBucketBadgeIntent as n, invoiceStatusBadgeIntent as o, ageingBucketChartColor as r, itemTrackingBadgeIntent as s, accountTypeBadgeIntent as t, paymentStatusBadgeIntent as u };
