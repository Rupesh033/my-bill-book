import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object, y as string } from "./schemas-B0hhv1Dq.js";
//#region src/routes/app/inventory.tsx
var $$splitComponentImporter = () => import("./inventory-CYEp3F2b.js");
var searchSchema = object({ item: string().uuid().optional().catch(void 0) });
var Route = createFileRoute("/app/inventory")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
