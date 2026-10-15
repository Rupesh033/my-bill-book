import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as X } from "./x-BApCvQKU.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
//#region src/features/app-shell/components/active-filter-chip.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Shows the deep-linked filter a list is currently narrowed to, with a way out. */
function ActiveFilterChip({ label, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "secondary",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: onClear,
			size: "icon-sm",
			type: "button",
			variant: "ghost",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "sr-only",
				children: [
					"Clear ",
					label,
					" filter"
				]
			})]
		})]
	});
}
//#endregion
//#region src/features/app-shell/list-filter.ts
/**
* Resolves a deep-linked id (for example `?party=<uuid>` from the dashboard
* attention queue) against the records a panel has loaded.
*
* An id that matches nothing once the records have loaded is dropped, so a
* stale or hand-edited link falls back to the full list rather than an empty
* one. While the records are still loading the id is kept, so the filter is
* applied on the first render instead of flashing the unfiltered list.
*/
function resolveListFilter(id, records, recordsLoaded) {
	if (!id) return {};
	const match = records.find((record) => record.id === id);
	if (match) return {
		id,
		label: match.label
	};
	return recordsLoaded ? {} : { id };
}
//#endregion
export { ActiveFilterChip as n, resolveListFilter as t };
