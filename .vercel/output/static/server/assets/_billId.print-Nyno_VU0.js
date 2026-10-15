import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object } from "./schemas-B0hhv1Dq.js";
import { t as loadPurchaseBillPrintDocument, z as boolean } from "./voucher-print-loader-DtysXH_U.js";
//#region src/routes/app/purchases/$billId.print.tsx
var $$splitComponentImporter = () => import("./_billId.print-BPFoiHx8.js");
var searchSchema = object({ autoprint: boolean().optional() });
var Route = createFileRoute("/app/purchases/$billId/print")({
	validateSearch: searchSchema,
	loader: ({ params }) => loadPurchaseBillPrintDocument(params.billId),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
