import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { r as TabsList } from "./tabs-BBl_76LU.js";
import { t as cn } from "./utils-Bcmp4H83.js";
//#region src/components/ui/scrollable-tabs-list.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Horizontal scroll wrapper for tab bars on narrow screens. */
function ScrollableTabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-full overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		"data-slot": "scrollable-tabs-list",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
			className: cn("w-max min-w-0", className),
			...props
		})
	});
}
//#endregion
export { ScrollableTabsList as t };
