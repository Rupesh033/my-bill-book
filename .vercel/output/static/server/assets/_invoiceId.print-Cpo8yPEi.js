import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as VoucherDocumentPaper, t as VoucherPrintToolbar } from "./voucher-print-toolbar-DIwvyMUS.js";
import { a as toPrintCompany, o as toPrintParty, t as buildInvoicePrintDocument } from "./invoice-print-service-CLifP9FG.js";
import { t as Route } from "./_invoiceId.print-_jUugNSe.js";
//#region src/features/sales/components/invoice-print-view.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function InvoicePrintView({ invoiceId, autoprint, initialDocument }) {
	const trpc = useTRPC();
	const { companyId, company, isReady } = useWorkspace();
	const invoiceQuery = useQuery({
		...trpc.sales.getById.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			id: invoiceId
		}),
		enabled: !initialDocument && Boolean(invoiceId) && Boolean(companyId) && isReady
	});
	const partiesQuery = useQuery({
		...trpc.parties.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: !initialDocument && Boolean(companyId) && isReady
	});
	const itemsQuery = useQuery({
		...trpc.inventory.listItems.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: !initialDocument && Boolean(companyId) && isReady
	});
	const invoice = invoiceQuery.data;
	const customer = (partiesQuery.data ?? []).find((party) => party.id === invoice?.customerId);
	const itemById = import_react.useMemo(() => new Map((itemsQuery.data ?? []).map((item) => [item.id, item])), [itemsQuery.data]);
	const printDoc = import_react.useMemo(() => {
		if (initialDocument) return initialDocument;
		if (!invoice || !company || !customer) return null;
		return buildInvoicePrintDocument({
			invoice,
			company: toPrintCompany(company),
			customer: toPrintParty(customer),
			itemById
		});
	}, [
		company,
		customer,
		initialDocument,
		invoice,
		itemById
	]);
	import_react.useEffect(() => {
		if (autoprint && printDoc) {
			const timer = window.setTimeout(() => window.print(), 300);
			return () => window.clearTimeout(timer);
		}
	}, [autoprint, printDoc]);
	if (!printDoc) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-sm text-muted-foreground",
		children: "Loading invoice…"
	});
	const fullPageHref = `/app/sales/${invoiceId}/print`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen max-w-4xl p-4 sm:p-6 print:max-w-none print:p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherPrintToolbar, {
			className: "mb-4",
			fullPageHref,
			pdfHref: `${fullPageHref}?autoprint=1`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherDocumentPaper, { document: printDoc })]
	});
}
//#endregion
//#region src/routes/app/sales/$invoiceId.print.tsx?tsr-split=component
function InvoicePrintRoute() {
	const { invoiceId } = Route.useParams();
	const { autoprint } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePrintView, {
		autoprint,
		initialDocument: Route.useLoaderData(),
		invoiceId
	});
}
//#endregion
export { InvoicePrintRoute as component };
