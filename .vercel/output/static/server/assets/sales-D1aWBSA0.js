import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as Eye, r as useInfiniteQuery, t as nextVoucherListCursor } from "./voucher-list-pagination-CnkxW_Wk.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as VoucherPreviewSheet } from "./voucher-preview-sheet-BQSFKTkz.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { r as Printer } from "./voucher-print-toolbar-DIwvyMUS.js";
import { a as useComposedRefs } from "./dist-CL3tOL9N.js";
import { a as composeEventHandlers, o as createContextScope } from "./dist-CJvPnXPN.js";
import { c as Dialog, d as DialogDescription, f as DialogOverlay, g as createDialogScope, h as DialogTrigger, l as DialogClose, m as DialogTitle, p as DialogPortal, u as DialogContent } from "./dialog-CKQZkisS.js";
import { i as TabsTrigger, t as Tabs } from "./tabs-BBl_76LU.js";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip } from "./tooltip-EnKH0H68.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { t as Route } from "./sales-C1KHfSkU.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { o as invoiceStatusBadgeIntent } from "./badge-intent-BgU9wzdu.js";
import { t as ScrollableTabsList } from "./scrollable-tabs-list-CTZgivbJ.js";
import { t as SearchInput } from "./search-input-fZpU6QCO.js";
import { n as ActiveFilterChip, t as resolveListFilter } from "./list-filter-Btnp0CMc.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Ban = createLucideIcon("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]);
//#endregion
//#region node_modules/.bun/@radix-ui+react-alert-dialog@1.1.19+ae2b4604ef263bc9/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
});
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		...dialogScope,
		...portalProps
	});
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
});
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null));
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
		scope: __scopeAlertDialog,
		cancelRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			role: "alertdialog",
			...dialogScope,
			...contentProps,
			ref: composedRefs,
			onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
				event.preventDefault();
				cancelRef.current?.focus({ preventScroll: true });
			}),
			onPointerDownOutside: (event) => event.preventDefault(),
			onInteractOutside: (event) => event.preventDefault(),
			children
		})
	});
});
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
});
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
});
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		...dialogScope,
		...cancelProps,
		ref
	});
});
AlertDialogCancel$1.displayName = CANCEL_NAME;
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
//#endregion
//#region src/components/ui/alert-dialog.tsx
function AlertDialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-3 rounded-md bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-64 data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		"data-slot": "alert-dialog-title",
		className: cn("font-heading text-sm font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		"data-slot": "alert-dialog-description",
		className: cn("text-xs/relaxed text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant,
		size,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
			"data-slot": "alert-dialog-action",
			className: cn(className),
			...props
		})
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant,
		size,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
			"data-slot": "alert-dialog-cancel",
			className: cn(className),
			...props
		})
	});
}
//#endregion
//#region src/features/sales/components/sales-panel.tsx
function SalesPanel({ partyId, onClearPartyFilter }) {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, isReady } = useWorkspace();
	const [query, setQuery] = import_react.useState("");
	const [filter, setFilter] = import_react.useState("all");
	const [previewTarget, setPreviewTarget] = import_react.useState(null);
	const [previewOpen, setPreviewOpen] = import_react.useState(false);
	const [cancelTarget, setCancelTarget] = import_react.useState(null);
	const resolvedCompanyId = companyId ?? "00000000-0000-4000-8000-000000000099";
	const partiesQuery = useQuery({
		...trpc.parties.list.queryOptions({ companyId: resolvedCompanyId }),
		enabled: Boolean(companyId) && isReady
	});
	const partyFilter = resolveListFilter(partyId, (partiesQuery.data ?? []).map((party) => ({
		id: party.id,
		label: party.name
	})), partiesQuery.isSuccess);
	const salesQuery = useInfiniteQuery(trpc.sales.list.infiniteQueryOptions({
		companyId: resolvedCompanyId,
		limit: 50,
		partyId: partyFilter.id,
		paymentStatus: filter === "all" ? void 0 : filter,
		search: query.trim() || void 0
	}, {
		enabled: Boolean(companyId) && isReady,
		getNextPageParam: (lastPage) => nextVoucherListCursor(lastPage, 50, (row) => row.invoiceDate)
	}));
	const cancelInvoiceMutation = useMutation({
		...trpc.sales.cancelInvoice.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: trpc.sales.list.queryKey() });
		},
		onError: (error) => {
			toastActionError(error, "Failed to cancel invoice");
		}
	});
	const partyName = import_react.useMemo(() => {
		const map = new Map((partiesQuery.data ?? []).map((party) => [party.id, party.name]));
		return (id) => map.get(id) ?? id.slice(0, 8);
	}, [partiesQuery.data]);
	const rows = salesQuery.data?.pages.flat() ?? [];
	function openPreview(row) {
		setPreviewTarget({
			kind: "sales",
			id: row.id,
			number: row.invoiceNumber
		});
		setPreviewOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/sales/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "New sales bill"]
			})
		}),
		description: "Sales register from posted invoices.",
		title: "Sales",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
								onValueChange: (value) => setFilter(value),
								value: filter,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollableTabsList, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "all",
										children: "All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "Pending",
										children: "Pending"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "Part paid",
										children: "Part paid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "Paid",
										children: "Paid"
									})
								] })
							}), partyFilter.id && onClearPartyFilter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveFilterChip, {
								label: partyFilter.label ?? partyName(partyFilter.id),
								onClear: onClearPartyFilter
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
							className: "w-full sm:max-w-xs",
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search invoice or party",
							value: query,
							wrapperClassName: "w-full max-w-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Invoice" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Party" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Taxable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tax" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Total" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: salesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "py-10 text-center text-muted-foreground",
						colSpan: 8,
						children: "Loading sales…"
					}) }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "py-10 text-center text-muted-foreground",
						colSpan: 8,
						children: "No sales yet. Create a sales voucher."
					}) }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: row.invoiceNumber
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: partyName(row.customerId) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.invoiceDate }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.taxableAmount) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatInr(row.totalGstAmount) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium text-money-in",
							children: formatInr(row.totalAmount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: invoiceStatusBadgeIntent({
								cancelled: row.status === "cancelled",
								paymentStatus: row.paymentStatus
							}),
							children: row.status === "cancelled" ? "Cancelled" : row.paymentStatus
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => openPreview(row),
										size: "icon-sm",
										type: "button",
										variant: "ghost",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Preview invoice"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Preview" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "icon-sm",
										variant: "ghost",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											params: { invoiceId: row.id },
											to: "/app/sales/$invoiceId/print",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: "Print invoice"
											})]
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Print" })] }),
								row.status === "cancelled" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
										disabled: cancelInvoiceMutation.isPending,
										onClick: () => setCancelTarget({
											id: row.id,
											invoiceNumber: row.invoiceNumber
										}),
										size: "icon-sm",
										variant: "ghost",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Cancel invoice"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Cancel" })] })
							]
						}) })
					] }, row.id)) })] }),
					salesQuery.hasNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: salesQuery.isFetchingNextPage,
							onClick: () => void salesQuery.fetchNextPage(),
							type: "button",
							variant: "outline",
							children: salesQuery.isFetchingNextPage ? "Loading…" : "Load more"
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherPreviewSheet, {
				onOpenChange: setPreviewOpen,
				open: previewOpen,
				target: previewTarget
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				onOpenChange: (open) => {
					if (!open) setCancelTarget(null);
				},
				open: cancelTarget !== null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					"Cancel invoice ",
					cancelTarget?.invoiceNumber,
					"?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This reverses the ledger and stock postings and cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep invoice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (cancelTarget) cancelInvoiceMutation.mutate({
							companyId: companyId ?? "",
							id: cancelTarget.id
						});
						setCancelTarget(null);
					},
					children: "Cancel invoice"
				})] })] })
			})
		]
	});
}
//#endregion
//#region src/routes/app/sales/index.tsx?tsr-split=component
function SalesIndexRoute() {
	const { party } = Route.useSearch();
	const navigate = Route.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesPanel, {
		onClearPartyFilter: () => void navigate({ search: {} }),
		partyId: party
	});
}
//#endregion
export { SalesIndexRoute as component };
