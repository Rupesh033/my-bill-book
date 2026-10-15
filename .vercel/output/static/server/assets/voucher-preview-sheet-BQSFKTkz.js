import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { r as useMutation, t as getFormErrorMessage } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as CircleCheck } from "./circle-check-CmhdcspS.js";
import { t as Mail } from "./mail-MtVbx_Gu.js";
import { n as VoucherDocumentPaper, t as VoucherPrintToolbar } from "./voucher-print-toolbar-DIwvyMUS.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { a as toPrintCompany, n as buildPurchaseBillPrintDocument, o as toPrintParty, t as buildInvoicePrintDocument } from "./invoice-print-service-CLifP9FG.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { a as SheetHeader, i as SheetFooter, n as SheetContent, o as SheetTitle, r as SheetDescription, t as Sheet } from "./sheet-DbN5AHL7.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageCircle = createLucideIcon("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]);
//#endregion
//#region src/features/documents/components/invoice-share-actions.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function InvoiceShareActions({ companyId, invoiceId, invoiceNumber, companyName, amount, printPath }) {
	const trpc = useTRPC();
	const [emailOpen, setEmailOpen] = import_react.useState(false);
	const [toEmail, setToEmail] = import_react.useState("");
	const emailInvoice = useMutation(trpc.sales.emailInvoice.mutationOptions());
	const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${printPath}` : "";
	const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`Invoice ${invoiceNumber} from ${companyName} for ${amount}. ${shareUrl}`)}`;
	async function handleSendEmail() {
		try {
			await emailInvoice.mutateAsync({
				companyId,
				id: invoiceId,
				toEmail: toEmail.trim(),
				companyName,
				amount,
				url: shareUrl || void 0
			});
			toast.success(`Invoice emailed to ${toEmail.trim()}`);
			setEmailOpen(false);
			setToEmail("");
		} catch (err) {
			toast.error(getFormErrorMessage(err, "Unable to send email"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		type: "button",
		variant: "outline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: whatsappHref,
			rel: "noreferrer",
			target: "_blank",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { "data-icon": "inline-start" }), "WhatsApp"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		onOpenChange: setEmailOpen,
		open: emailOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { "data-icon": "inline-start" }), "Email"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Email invoice ", invoiceNumber] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Send a summary and link to the customer." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				onChange: (event) => setToEmail(event.target.value),
				placeholder: "customer@email.com",
				type: "email",
				value: toEmail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !toEmail.trim() || emailInvoice.isPending,
				onClick: () => void handleSendEmail(),
				type: "button",
				children: emailInvoice.isPending ? "Sending…" : "Send email"
			}) })
		] })]
	})] });
}
//#endregion
//#region src/features/documents/components/voucher-preview-sheet.tsx
function VoucherPreviewSheet({ target, open, onOpenChange, onDone }) {
	const trpc = useTRPC();
	const { companyId, company, isReady } = useWorkspace();
	const salesQuery = useQuery({
		...trpc.sales.getById.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			id: target?.id ?? ""
		}),
		enabled: open && target?.kind === "sales" && Boolean(target.id) && Boolean(companyId) && isReady
	});
	const purchaseQuery = useQuery({
		...trpc.purchases.getById.queryOptions({
			companyId: companyId ?? "00000000-0000-4000-8000-000000000099",
			id: target?.id ?? ""
		}),
		enabled: open && target?.kind === "purchase" && Boolean(target.id) && Boolean(companyId) && isReady
	});
	const partiesQuery = useQuery({
		...trpc.parties.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && open
	});
	const itemsQuery = useQuery({
		...trpc.inventory.listItems.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady && open
	});
	const itemById = import_react.useMemo(() => new Map((itemsQuery.data ?? []).map((item) => [item.id, item])), [itemsQuery.data]);
	const printDocument = import_react.useMemo(() => {
		if (!target || !company) return null;
		const companyInfo = toPrintCompany(company);
		if (target.kind === "sales") {
			const invoice = salesQuery.data;
			if (!invoice) return null;
			const customer = (partiesQuery.data ?? []).find((party) => party.id === invoice.customerId);
			if (!customer) return null;
			return buildInvoicePrintDocument({
				invoice,
				company: companyInfo,
				customer: toPrintParty(customer),
				itemById
			});
		}
		const bill = purchaseQuery.data;
		if (!bill) return null;
		const supplier = (partiesQuery.data ?? []).find((party) => party.id === bill.supplierId);
		if (!supplier) return null;
		return buildPurchaseBillPrintDocument({
			bill,
			company: companyInfo,
			supplier: toPrintParty(supplier),
			itemById
		});
	}, [
		company,
		itemById,
		partiesQuery.data,
		purchaseQuery.data,
		salesQuery.data,
		target
	]);
	const isLoading = !printDocument && (salesQuery.isLoading || purchaseQuery.isLoading || partiesQuery.isLoading || itemsQuery.isLoading);
	const fullPageHref = target?.kind === "sales" ? `/app/sales/${target.id}/print` : target ? `/app/purchases/${target.id}/print` : "#";
	const pdfHref = `${fullPageHref}?autoprint=1`;
	const listHref = target?.kind === "sales" ? "/app/sales" : "/app/purchases";
	const createAnotherHref = target?.kind === "sales" ? "/app/sales/new" : "/app/purchases/new";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		onOpenChange,
		open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "flex w-full max-w-none flex-col gap-0 overflow-hidden p-0 data-[side=right]:w-full data-[side=right]:sm:w-[60vw] data-[side=right]:sm:max-w-[60vw]",
			showCloseButton: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "shrink-0 border-b px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 pr-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-5 shrink-0 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "text-base",
								children: target?.kind === "sales" ? "Invoice saved" : "Bill saved"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [target?.number, " · Preview matches what prints or exports as PDF."] })]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 border-b px-6 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherPrintToolbar, {
							fullPageHref,
							pdfHref
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-0 flex-1 justify-center overflow-y-auto bg-background px-4 py-6 sm:px-6 sm:py-8",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex aspect-[210/297] w-full max-w-[min(794px,calc(60vw-3rem))] shrink-0 items-center justify-center rounded-lg border border-dashed bg-background p-10 text-center text-sm text-muted-foreground",
							children: "Loading preview…"
						}) : printDocument ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto aspect-[210/297] w-full max-w-[min(794px,calc(60vw-3rem))] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherDocumentPaper, {
								className: "h-full min-h-0 overflow-y-auto shadow-md print:h-auto print:overflow-visible",
								document: printDocument
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex aspect-[210/297] w-full max-w-[min(794px,calc(60vw-3rem))] shrink-0 items-center justify-center rounded-lg border border-dashed bg-background p-10 text-center text-sm text-destructive",
							children: "Could not load voucher preview."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetFooter, {
					className: "shrink-0 flex-row flex-wrap justify-end gap-2 border-t px-6 py-4",
					children: [
						target?.kind === "sales" && printDocument && companyId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceShareActions, {
							amount: printDocument.totalAmount,
							companyId,
							companyName: printDocument.company.legalName,
							invoiceId: target.id,
							invoiceNumber: target.number,
							printPath: fullPageHref
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								onOpenChange(false);
								onDone?.();
							},
							type: "button",
							variant: "outline",
							children: "Close"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							type: "button",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								onClick: () => {
									onOpenChange(false);
									onDone?.();
								},
								to: createAnotherHref,
								children: "Create another"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							type: "button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								onClick: () => {
									onOpenChange(false);
									onDone?.();
								},
								to: listHref,
								children: "Back to register"
							})
						})
					]
				})
			]
		})
	});
}
//#endregion
export { VoucherPreviewSheet as t };
