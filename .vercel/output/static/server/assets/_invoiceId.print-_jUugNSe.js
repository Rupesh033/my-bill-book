import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { h as object } from "./schemas-B0hhv1Dq.js";
import { n as loadSalesInvoicePrintDocument, z as boolean } from "./voucher-print-loader-DtysXH_U.js";
//#region src/routes/app/sales/$invoiceId.print.tsx
var $$splitComponentImporter = () => import("./_invoiceId.print-Cpo8yPEi.js");
var searchSchema = object({ autoprint: boolean().optional() });
var Route = createFileRoute("/app/sales/$invoiceId/print")({
	validateSearch: searchSchema,
	loader: ({ params }) => loadSalesInvoicePrintDocument(params.invoiceId),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
