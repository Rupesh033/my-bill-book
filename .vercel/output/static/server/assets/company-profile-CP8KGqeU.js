import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as CompanyProfilePanel } from "./company-profile-panel-Drrbotuq.js";
//#region src/routes/app/masters/company-profile.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function CompanyProfileRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		description: "Registered address, GST/PAN, bank details, and invoice terms for print and PDF.",
		title: "Company profile",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyProfilePanel, {})
	});
}
//#endregion
export { CompanyProfileRoute as component };
