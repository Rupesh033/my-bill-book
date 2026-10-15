//#region src/features/gst/gstr2b-purchase-prefill.ts
var SESSION_KEY = "gstr2b-purchase-prefill";
function storeGstr2bPurchasePrefill(prefill) {
	if (typeof window === "undefined") return;
	sessionStorage.setItem(SESSION_KEY, JSON.stringify(prefill));
}
function consumeGstr2bPurchasePrefill() {
	if (typeof window === "undefined") return null;
	const raw = sessionStorage.getItem(SESSION_KEY);
	if (!raw) return null;
	sessionStorage.removeItem(SESSION_KEY);
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
//#endregion
export { storeGstr2bPurchasePrefill as n, consumeGstr2bPurchasePrefill as t };
