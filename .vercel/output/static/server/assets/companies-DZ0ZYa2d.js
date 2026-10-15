import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { r as useMutation, t as getFormErrorMessage } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Building2 } from "./building-2-Bb77V0Sw.js";
import { n as formatMediumDate, t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { s as requireStateCode, t as failForm } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { n as indianStates, s as stateLabel } from "./india-masters-DrWYWga8.js";
//#region src/features/companies/components/companies-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CompaniesPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companies: workspaceCompanies, refresh } = useWorkspace();
	const [open, setOpen] = import_react.useState(false);
	const [legalName, setLegalName] = import_react.useState("");
	const [tradeName, setTradeName] = import_react.useState("");
	const [gstin, setGstin] = import_react.useState("");
	const [stateCode, setStateCode] = import_react.useState("27");
	const [businessType, setBusinessType] = import_react.useState("wholesale");
	const [financialYearStart, setFinancialYearStart] = import_react.useState("2026-04-01");
	const [formError, setFormError] = import_react.useState(null);
	const companiesQuery = useQuery(trpc.companies.list.queryOptions());
	const createCompany = useMutation(trpc.companies.createWithSetup.mutationOptions());
	const companies = companiesQuery.data ?? workspaceCompanies;
	function resetForm() {
		setLegalName("");
		setTradeName("");
		setGstin("");
		setStateCode("27");
		setBusinessType("wholesale");
		setFinancialYearStart("2026-04-01");
		setFormError(null);
	}
	async function handleCreate(event) {
		event.preventDefault();
		if (!legalName.trim()) return failForm(setFormError, "Legal name is required.");
		if (!tradeName.trim()) return failForm(setFormError, "Trade name is required.");
		if (!requireStateCode(stateCode, "State")) return;
		setFormError(null);
		try {
			await createCompany.mutateAsync({
				legalName: legalName.trim(),
				tradeName: tradeName.trim(),
				gstin: gstin.trim() ? gstin.trim().toUpperCase() : null,
				stateCode,
				businessType,
				financialYearStart
			});
			await queryClient.invalidateQueries({ queryKey: trpc.companies.list.queryKey() });
			await refresh();
			resetForm();
			setOpen(false);
			toast.success("Company created.");
		} catch (error) {
			setFormError(getFormErrorMessage(error, "Create failed"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			onOpenChange: (next) => {
				setOpen(next);
				if (!next) resetForm();
			},
			open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "New company"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New company" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Creates firm profile and seeds chart of accounts automatically." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-4",
					onSubmit: handleCreate,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "co-legal",
								children: "Legal name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "co-legal",
								onChange: (event) => setLegalName(event.target.value),
								required: true,
								value: legalName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "co-trade",
								children: "Trade name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "co-trade",
								onChange: (event) => setTradeName(event.target.value),
								required: true,
								value: tradeName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "co-gstin",
									children: "GSTIN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "co-gstin",
									onChange: (event) => setGstin(event.target.value),
									value: gstin
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "State"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: setStateCode,
									value: stateCode,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: indianStates.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: state.code,
										children: [
											state.name,
											" (",
											state.code,
											")"
										]
									}, state.code)) }) })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Business type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: (value) => setBusinessType(value),
									value: businessType,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "wholesale",
											children: "Wholesale"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "trading",
											children: "Trading"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "retail",
											children: "Retail"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "services",
											children: "Services"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "distribution",
											children: "Distribution"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "manufacturing_light",
											children: "Manufacturing light"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "custom",
											children: "Custom"
										})
									] }) })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "co-fy",
									children: "FY start"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
									formatValue: formatMediumDate,
									id: "co-fy",
									onChange: setFinancialYearStart,
									required: true,
									value: financialYearStart
								})]
							})]
						}),
						formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: formError
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: createCompany.isPending,
							type: "submit",
							children: createCompany.isPending ? "Creating…" : "Create company"
						}) })
					]
				})]
			})]
		}),
		description: "Multi-company profiles wired to the companies API.",
		title: "Companies",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "flex items-center gap-2 text-base",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-muted-foreground" }), "Company directory"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [companies.length, " firms on this account"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Trade name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Legal name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "GSTIN" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "State" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "FY start" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: companies.map((company) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: company.tradeName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-[220px] truncate",
					children: company.legalName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: company.gstin ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "truncate",
					children: stateLabel(company.stateCode)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: company.businessType
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: company.financialYearStart })
			] }, company.id)) })] })
		})] })
	});
}
//#endregion
//#region src/routes/app/masters/companies.tsx?tsr-split=component
function CompaniesRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompaniesPanel, {});
}
//#endregion
export { CompaniesRoute as component };
