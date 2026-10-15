import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object, y as string } from "./schemas-B0hhv1Dq.js";
//#region src/routes/app/purchases/index.tsx
var $$splitComponentImporter = () => import("./purchases-Bm2ij4sn.js");
var searchSchema = object({ party: string().uuid().optional().catch(void 0) });
var Route = createFileRoute("/app/purchases/")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
