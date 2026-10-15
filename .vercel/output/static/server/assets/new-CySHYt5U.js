import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object, y as string } from "./schemas-B0hhv1Dq.js";
//#region src/routes/app/sales/new.tsx
var $$splitComponentImporter = () => import("./new-sh7c1Mof.js");
var searchSchema = object({ fromDocument: string().uuid().optional().catch(void 0) });
var Route = createFileRoute("/app/sales/new")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
