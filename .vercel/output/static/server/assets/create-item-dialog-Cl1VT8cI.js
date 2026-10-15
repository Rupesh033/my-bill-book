import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace } from "./workspace-context-Cz54y75x.js";
import { r as useMutation, t as getFormErrorMessage } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { i as godowns } from "./voucher-demo-masters-CbFRv67D.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as failForm } from "./form-validation-CiOjD7zS.js";
import { c as unitOptions, l as uqcForUnit, r as itemGroups, t as gstRateOptions } from "./india-masters-DrWYWga8.js";
//#region src/features/inventory/components/create-item-dialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	alias: "",
	group: "Fabrics",
	hsnCode: "",
	gstRate: "5.00",
	baseUnit: "Meter",
	uqc: "MTR",
	altUnit: "none",
	conversionFactor: "",
	purchaseRate: "",
	saleRate: "",
	mrp: "",
	reorderLevel: "",
	openingQuantity: "100",
	openingGodown: godowns[0],
	tracksInventory: "yes"
};
function CreateItemDialog({ open: controlledOpen, onOpenChange: controlledOnOpenChange, trigger, onCreated }) {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, isReady, error: workspaceError, godowns: godowns$1 } = useWorkspace();
	const godownNames = godowns$1.length > 0 ? godowns$1.map((entry) => entry.name) : godowns;
	const [internalOpen, setInternalOpen] = import_react.useState(false);
	const open = controlledOpen ?? internalOpen;
	const setOpen = controlledOnOpenChange ?? setInternalOpen;
	const [form, setForm] = import_react.useState(emptyForm);
	const [formError, setFormError] = import_react.useState(null);
	const createItem = useMutation(trpc.inventory.createItemWithOpening.mutationOptions());
	function updateForm(field, value) {
		setForm((current) => {
			const next = {
				...current,
				[field]: value
			};
			if (field === "baseUnit") next.uqc = uqcForUnit(value);
			return next;
		});
	}
	function resetForm() {
		setForm({
			...emptyForm,
			openingGodown: godownNames[0] ?? godowns[0]
		});
		setFormError(null);
	}
	function handleOpenChange(next) {
		setOpen(next);
		if (!next) resetForm();
	}
	async function handleCreate(event) {
		event.preventDefault();
		if (!companyId) {
			setFormError(isReady ? workspaceError ?? "No active company. Open Companies and create one." : "Workspace is still loading. Try again in a moment.");
			return;
		}
		if (!form.name.trim()) return failForm(setFormError, "Item name is required.");
		if (!form.hsnCode.trim()) return failForm(setFormError, "HSN code is required.");
		setFormError(null);
		try {
			const result = await createItem.mutateAsync({
				companyId,
				name: form.name.trim(),
				alias: form.alias.trim(),
				itemGroup: form.group,
				hsnCode: form.hsnCode.trim(),
				gstRate: form.gstRate,
				baseUnit: form.baseUnit,
				alternateUnit: form.altUnit === "none" ? "" : form.altUnit,
				conversionFactor: form.altUnit === "none" ? "1" : form.conversionFactor || "1",
				mrp: form.mrp || "0.00",
				reorderLevel: form.reorderLevel || "0",
				purchaseRate: form.purchaseRate || "0.00",
				saleRate: form.saleRate || "0.00",
				tracksInventory: form.tracksInventory === "yes",
				openingQuantity: form.tracksInventory === "yes" && form.openingQuantity.trim() ? form.openingQuantity.trim() : null,
				openingOccurredOn: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
			});
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listItems.queryKey({ companyId }) });
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listStockBalances.queryKey({ companyId }) });
			resetForm();
			setOpen(false);
			toast.success("Item created.");
			onCreated?.(result.item);
		} catch (error) {
			setFormError(getFormErrorMessage(error));
		}
	}
	const dialog = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "max-h-[90vh] overflow-y-auto sm:max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Item master" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Group, HSN, tax slab, units, rates, and optional opening stock." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-4",
			onSubmit: handleCreate,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-name",
								children: "Item name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-name",
								onChange: (event) => updateForm("name", event.target.value),
								required: true,
								value: form.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-alias",
								children: "Alias / code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-alias",
								onChange: (event) => updateForm("alias", event.target.value),
								value: form.alias
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Item group"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => updateForm("group", value),
								value: form.group,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: itemGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: group,
									children: group
								}, group)) }) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-hsn",
								children: "HSN / SAC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-hsn",
								onChange: (event) => updateForm("hsnCode", event.target.value),
								required: true,
								value: form.hsnCode
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "GST tax slab"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => updateForm("gstRate", value),
								value: form.gstRate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: gstRateOptions.map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: rate,
									children: [rate, "%"]
								}, rate)) }) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Main unit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => updateForm("baseUnit", value),
								value: form.baseUnit,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: unitOptions.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: unit.label,
									children: unit.label
								}, unit.label)) }) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "UQC (GST return)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								readOnly: true,
								value: form.uqc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Alternate unit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => updateForm("altUnit", value),
								value: form.altUnit,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "none",
									children: "None"
								}), unitOptions.filter((unit) => unit.label !== form.baseUnit).map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: unit.label,
									children: unit.label
								}, unit.label))] }) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-conv",
								children: "Conversion (1 alt = ? main)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								disabled: form.altUnit === "none",
								id: "item-conv",
								onChange: (event) => updateForm("conversionFactor", event.target.value),
								placeholder: "e.g. 50",
								value: form.conversionFactor
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-pur",
								children: "Purchase rate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-pur",
								onChange: (event) => updateForm("purchaseRate", event.target.value),
								value: form.purchaseRate
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-sale",
								children: "Sale rate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-sale",
								onChange: (event) => updateForm("saleRate", event.target.value),
								value: form.saleRate
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-mrp",
								children: "MRP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-mrp",
								onChange: (event) => updateForm("mrp", event.target.value),
								placeholder: "Optional",
								value: form.mrp
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-reorder",
								children: "Reorder level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "item-reorder",
								onChange: (event) => updateForm("reorderLevel", event.target.value),
								placeholder: "Optional",
								value: form.reorderLevel
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Track inventory"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => updateForm("tracksInventory", value),
								value: form.tracksInventory,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "yes",
									children: "Yes — stock item"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "no",
									children: "No — service / non-stock"
								})] }) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "item-open",
								children: "Opening stock qty"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								disabled: form.tracksInventory !== "yes",
								id: "item-open",
								onChange: (event) => updateForm("openingQuantity", event.target.value),
								placeholder: "Optional",
								value: form.openingQuantity
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Opening godown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								disabled: form.tracksInventory !== "yes",
								onValueChange: (value) => updateForm("openingGodown", value),
								value: form.openingGodown,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: godownNames.map((godown) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: godown,
									children: godown
								}, godown)) }) })]
							})]
						})
					]
				}),
				formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: formError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: createItem.isPending,
					type: "submit",
					children: createItem.isPending ? "Saving…" : "Save item"
				}) })
			]
		})]
	});
	if (trigger) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		onOpenChange: handleOpenChange,
		open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), dialog]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		onOpenChange: handleOpenChange,
		open,
		children: dialog
	});
}
//#endregion
export { CreateItemDialog as t };
