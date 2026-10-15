import { a as __toESM, n as require_react } from "./jsx-runtime-37ZnD8LL.js";
//#region node_modules/.bun/@radix-ui+react-use-callback-ref@1.1.2+93dbe784b8baa420/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
//#endregion
export { useCallbackRef as t };
