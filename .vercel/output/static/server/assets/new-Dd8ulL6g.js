import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object, y as string } from "./schemas-B0hhv1Dq.js";
//#region src/routes/app/purchases/new.tsx
var $$splitComponentImporter = () => import("./new-D8Q-vwt9.js");
var searchSchema = object({
	fromGrn: string().uuid().optional().catch(void 0),
	supplierBillNumber: string().optional(),
	billDate: string().optional(),
	taxableAmount: string().optional()
});
var Route = createFileRoute("/app/purchases/new")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
