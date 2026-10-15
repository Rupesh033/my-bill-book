import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object, y as string } from "./schemas-B0hhv1Dq.js";
//#region src/routes/app/sales/index.tsx
var $$splitComponentImporter = () => import("./sales-D1aWBSA0.js");
var searchSchema = object({ party: string().uuid().optional().catch(void 0) });
var Route = createFileRoute("/app/sales/")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
