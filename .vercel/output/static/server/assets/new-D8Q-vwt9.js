import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Route } from "./new-Dd8ulL6g.js";
import { t as VoucherEntryPage } from "./voucher-entry-page-Co4xydUE.js";
import { t as consumeGstr2bPurchasePrefill } from "./gstr2b-purchase-prefill-DAgGIjrs.js";
//#region src/routes/app/purchases/new.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function NewPurchaseVoucherRoute() {
	const search = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherEntryPage, {
		gstr2bPrefill: consumeGstr2bPurchasePrefill() ?? (search.supplierBillNumber ? {
			supplierBillNumber: search.supplierBillNumber,
			billDate: search.billDate,
			taxableAmount: search.taxableAmount
		} : void 0),
		mode: "purchase",
		sourceGrnId: search.fromGrn
	});
}
//#endregion
export { NewPurchaseVoucherRoute as component };
