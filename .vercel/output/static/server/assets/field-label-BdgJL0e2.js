import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as cn } from "./utils-Bcmp4H83.js";
//#region src/features/app-shell/components/field-label.tsx
var import_jsx_runtime = require_jsx_runtime();
function FieldLabel({ children, className, htmlFor }) {
	if (htmlFor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs text-muted-foreground", className),
		htmlFor,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("text-xs text-muted-foreground", className),
		children
	});
}
function FieldGroup({ label, children, className, htmlFor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor,
			children: label
		}), children]
	});
}
//#endregion
export { FieldGroup as t };
