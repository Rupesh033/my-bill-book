import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Search } from "./search-CLPsoX-K.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { t as Input } from "./input-oruOz0Hj.js";
//#region src/components/ui/search-input.tsx
var import_jsx_runtime = require_jsx_runtime();
function SearchInput({ className, wrapperClassName, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", wrapperClassName),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			"aria-hidden": true,
			className: "pointer-events-none absolute top-1/2 left-3 size-4 shrink-0 -translate-y-1/2 text-muted-foreground"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: cn("pl-9", className),
			...props
		})]
	});
}
//#endregion
export { SearchInput as t };
