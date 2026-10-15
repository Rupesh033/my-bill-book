import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
//#region src/features/app-shell/components/workspace-page.tsx
var import_jsx_runtime = require_jsx_runtime();
function WorkspacePage({ title, description, actions, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-x-hidden p-3 sm:gap-4 sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
			"data-ui": "chrome",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold tracking-tight sm:text-xl",
					children: title
				}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-sm text-muted-foreground",
					children: description
				}) : null]
			}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full min-w-0 shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end",
				children: actions
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-w-0 flex-col gap-4",
			"data-ui": "data",
			children
		})]
	});
}
//#endregion
export { WorkspacePage as t };
