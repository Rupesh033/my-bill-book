import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Route } from "./new-CySHYt5U.js";
import { t as VoucherEntryPage } from "./voucher-entry-page-Co4xydUE.js";
//#region src/routes/app/sales/new.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function NewSalesVoucherRoute() {
	const { fromDocument } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherEntryPage, {
		mode: "sales",
		sourceDocumentId: fromDocument
	});
}
//#endregion
export { NewSalesVoucherRoute as component };
