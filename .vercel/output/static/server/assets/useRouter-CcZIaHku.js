import { a as __toESM, n as require_react } from "./jsx-runtime-37ZnD8LL.js";
//#region node_modules/.bun/@tanstack+react-router@1.170.17+7492c01c6988791b/node_modules/@tanstack/react-router/dist/esm/routerContext.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var routerContext = import_react.createContext(null);
//#endregion
//#region node_modules/.bun/@tanstack+react-router@1.170.17+7492c01c6988791b/node_modules/@tanstack/react-router/dist/esm/useRouter.js
/**
* Access the current TanStack Router instance from React context.
* Must be used within a `RouterProvider`.
*
* Options:
* - `warn`: Log a warning if no router context is found (default: true).
*
* @returns The registered router instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterHook
*/
function useRouter(opts) {
	return import_react.useContext(routerContext);
}
//#endregion
export { routerContext as n, useRouter as t };
