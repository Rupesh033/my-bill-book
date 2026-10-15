import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { r as useMutation, t as getFormErrorMessage } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Check } from "./check-C418P8rt.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, s as usePrevious, t as Select } from "./select-nNaz3Adl.js";
import { a as useComposedRefs } from "./dist-CL3tOL9N.js";
import { a as composeEventHandlers, n as Presence, o as createContextScope, r as useControllableState, s as Primitive } from "./dist-CJvPnXPN.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { o as useSize } from "./dist-Db88peJe.js";
import { t as Label } from "./label-DX7_3rQN.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as Textarea } from "./textarea-BFjnTMvl.js";
import { h as isValidStateCode, t as failForm } from "./form-validation-CiOjD7zS.js";
import { i as paymentTermsOptions, n as indianStates } from "./india-masters-DrWYWga8.js";
//#region node_modules/.bun/@radix-ui+react-checkbox@1.3.7+ae2b4604ef263bc9/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
	const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", internal_do_not_use_render } = props;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: CHECKBOX_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = control ? !!form || !!control.closest("form") : true;
	const context = {
		checked,
		disabled,
		setChecked,
		control,
		setControl,
		name,
		form,
		value,
		hasConsumerStoppedPropagationRef,
		required,
		defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
		isFormControl,
		bubbleInput,
		setBubbleInput
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
		scope: __scopeCheckbox,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = import_react.forwardRef(({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
	const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialCheckedStateRef = import_react.useRef(checked);
	import_react.useEffect(() => {
		const form = control?.form;
		if (form) {
			const reset = () => setChecked(initialCheckedStateRef.current);
			form.addEventListener("reset", reset);
			return () => form.removeEventListener("reset", reset);
		}
	}, [control, setChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
		"aria-required": required,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...checkboxProps,
		ref: composedRefs,
		onKeyDown: composeEventHandlers(onKeyDown, (event) => {
			if (event.key === "Enter") event.preventDefault();
		}),
		onClick: composeEventHandlers(onClick, (event) => {
			setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
		__scopeCheckbox,
		checked,
		defaultChecked,
		disabled,
		required,
		onCheckedChange,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
			...checkboxProps,
			ref: forwardedRef,
			__scopeCheckbox
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox })] })
	});
});
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
	const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(context.checked) || context.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "none",
				...props.style
			}
		})
	});
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = import_react.forwardRef(({ __scopeCheckbox, ...props }, forwardedRef) => {
	const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const bubbles = !hasConsumerStoppedPropagationRef.current;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			input.indeterminate = isIndeterminate(checked);
			setChecked.call(input, isIndeterminate(checked) ? false : checked);
			input.dispatchEvent(event);
		}
	}, [
		bubbleInput,
		prevChecked,
		checked,
		hasConsumerStoppedPropagationRef
	]);
	const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: defaultChecked ?? defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region src/components/ui/checkbox.tsx
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		"data-slot": "checkbox",
		className: cn("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
		})
	});
}
//#endregion
//#region src/features/parties/components/create-party-dialog.tsx
function CreatePartyDialog({ open: controlledOpen, onOpenChange: controlledOnOpenChange, trigger, onCreated, onUpdated, party, defaultPartyType = "customer", lockPartyType = false }) {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, ledgerBySystemKey, isReady, error: workspaceError } = useWorkspace();
	const isEdit = Boolean(party);
	const [internalOpen, setInternalOpen] = import_react.useState(false);
	const open = controlledOpen ?? internalOpen;
	const setOpen = controlledOnOpenChange ?? setInternalOpen;
	const [name, setName] = import_react.useState("");
	const [partyType, setPartyType] = import_react.useState(defaultPartyType);
	const [gstin, setGstin] = import_react.useState("");
	const [pan, setPan] = import_react.useState("");
	const [stateCode, setStateCode] = import_react.useState("27");
	const [addressLine1, setAddressLine1] = import_react.useState("");
	const [addressLine2, setAddressLine2] = import_react.useState("");
	const [city, setCity] = import_react.useState("");
	const [pincode, setPincode] = import_react.useState("");
	const [contactPhone, setContactPhone] = import_react.useState("");
	const [contactEmail, setContactEmail] = import_react.useState("");
	const [shipSameAsBilling, setShipSameAsBilling] = import_react.useState(true);
	const [shippingAddress, setShippingAddress] = import_react.useState("");
	const [creditLimit, setCreditLimit] = import_react.useState("");
	const [paymentTermsDays, setPaymentTermsDays] = import_react.useState("30");
	const [priceListId, setPriceListId] = import_react.useState("");
	const [formError, setFormError] = import_react.useState(null);
	const priceListsQuery = useQuery({
		...trpc.inventory.listPriceLists.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const createParty = useMutation(trpc.parties.create.mutationOptions());
	const updateParty = useMutation(trpc.parties.update.mutationOptions());
	function loadPartyValues(entry) {
		if (!entry) {
			resetForm();
			return;
		}
		setName(entry.name);
		setPartyType(entry.partyType);
		setGstin(entry.gstin ?? "");
		setPan(entry.pan ?? "");
		setStateCode(entry.stateCode);
		setAddressLine1(entry.addressLine1 ?? "");
		setAddressLine2(entry.addressLine2 ?? "");
		setCity(entry.city ?? "");
		setPincode(entry.pincode ?? "");
		setContactPhone(entry.contactPhone ?? "");
		setContactEmail(entry.contactEmail ?? "");
		const hasDistinctShipping = Boolean(entry.shippingAddress?.trim()) && entry.shippingAddress.trim() !== entry.billingAddress?.trim();
		setShipSameAsBilling(!hasDistinctShipping);
		setShippingAddress(hasDistinctShipping ? entry.shippingAddress : "");
		setCreditLimit(entry.creditLimit ?? "");
		setPaymentTermsDays(String(entry.paymentTermsDays));
		setPriceListId(entry.priceListId ?? "");
		setFormError(null);
	}
	import_react.useEffect(() => {
		if (open) {
			loadPartyValues(party);
			if (!party) setPartyType(defaultPartyType);
		}
	}, [
		open,
		party,
		defaultPartyType
	]);
	function resetForm() {
		setName("");
		setPartyType(defaultPartyType);
		setGstin("");
		setPan("");
		setStateCode("27");
		setAddressLine1("");
		setAddressLine2("");
		setCity("");
		setPincode("");
		setContactPhone("");
		setContactEmail("");
		setShipSameAsBilling(true);
		setShippingAddress("");
		setCreditLimit("");
		setPaymentTermsDays("30");
		setPriceListId("");
		setFormError(null);
	}
	function handleOpenChange(next) {
		setOpen(next);
		if (!next) resetForm();
	}
	async function handleSubmit(event) {
		event.preventDefault();
		if (!companyId) {
			setFormError(isReady ? workspaceError ?? "No active company. Open Companies and create one." : "Workspace is still loading. Try again in a moment.");
			return;
		}
		if (!name.trim()) return failForm(setFormError, "Party name is required.");
		if (!isValidStateCode(stateCode)) return failForm(setFormError, "State must be a valid 2-digit state code.");
		const receivableAccountId = ledgerBySystemKey.customer_receivable ?? null;
		const payableAccountId = ledgerBySystemKey.supplier_payable ?? null;
		if (!isEdit && (partyType === "customer" || partyType === "both") && !receivableAccountId) {
			setFormError("Receivable ledger is missing for this company");
			toast.error("Receivable ledger is missing for this company.");
			return;
		}
		if (!isEdit && (partyType === "supplier" || partyType === "both") && !payableAccountId) {
			setFormError("Payable ledger is missing for this company");
			toast.error("Payable ledger is missing for this company.");
			return;
		}
		const contactPayload = {
			pan: pan.trim(),
			addressLine1: addressLine1.trim(),
			addressLine2: addressLine2.trim(),
			city: city.trim(),
			pincode: pincode.trim(),
			contactPhone: contactPhone.trim(),
			contactEmail: contactEmail.trim(),
			billingAddress: "",
			shippingAddress: shipSameAsBilling ? "" : shippingAddress.trim()
		};
		setFormError(null);
		try {
			if (isEdit && party) {
				const updated = await updateParty.mutateAsync({
					id: party.id,
					companyId,
					name: name.trim(),
					partyType,
					gstin: gstin.trim() ? gstin.trim().toUpperCase() : null,
					stateCode,
					creditLimit: creditLimit.trim() || null,
					paymentTermsDays: Number(paymentTermsDays) || 0,
					priceListId: priceListId || null,
					...contactPayload
				});
				await queryClient.invalidateQueries({ queryKey: trpc.parties.list.queryKey({ companyId }) });
				resetForm();
				setOpen(false);
				toast.success("Party updated.");
				onUpdated?.(updated);
				return;
			}
			const created = await createParty.mutateAsync({
				companyId,
				name: name.trim(),
				partyType,
				gstin: gstin.trim() ? gstin.trim().toUpperCase() : null,
				stateCode,
				creditLimit: creditLimit.trim() || null,
				paymentTermsDays: Number(paymentTermsDays) || 0,
				receivableAccountId: partyType === "supplier" ? null : receivableAccountId,
				payableAccountId: partyType === "customer" ? null : payableAccountId,
				priceListId: priceListId || null,
				...contactPayload
			});
			await queryClient.invalidateQueries({ queryKey: trpc.parties.list.queryKey({ companyId }) });
			resetForm();
			setOpen(false);
			toast.success("Party created.");
			onCreated?.(created);
		} catch (error) {
			setFormError(getFormErrorMessage(error));
		}
	}
	const saving = createParty.isPending || updateParty.isPending;
	const dialog = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "max-h-[90vh] overflow-y-auto sm:max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isEdit ? "Edit party" : "New party" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Billing address, GST/PAN, and contact details print on tax invoices." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "party-name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "party-name",
								onChange: (event) => setName(event.target.value),
								placeholder: "Legal / trade name",
								required: true,
								value: name
							})]
						}),
						!lockPartyType ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => setPartyType(value),
								value: partyType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Type" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									position: "popper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "customer",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "supplier",
											children: "Supplier"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "both",
											children: "Both"
										})
									] })
								})]
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "State / POS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: setStateCode,
								value: stateCode,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									position: "popper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: indianStates.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: state.code,
										children: [
											state.name,
											" (",
											state.code,
											")"
										]
									}, state.code)) })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "party-gstin",
								children: "GSTIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "party-gstin",
								onChange: (event) => setGstin(event.target.value),
								placeholder: "Optional · unregistered if blank",
								value: gstin
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "party-pan",
								children: "PAN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "party-pan",
								onChange: (event) => setPan(event.target.value),
								placeholder: "ABCDE1234F",
								value: pan
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Billing address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "party-addr1",
									children: "Address line 1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "party-addr1",
									onChange: (event) => setAddressLine1(event.target.value),
									placeholder: "Shop / building / street",
									value: addressLine1
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "party-addr2",
									children: "Address line 2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "party-addr2",
									onChange: (event) => setAddressLine2(event.target.value),
									placeholder: "Area, landmark",
									value: addressLine2
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "party-city",
									children: "City"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "party-city",
									onChange: (event) => setCity(event.target.value),
									value: city
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "party-pincode",
									children: "PIN code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "party-pincode",
									onChange: (event) => setPincode(event.target.value),
									value: pincode
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "party-phone",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "party-phone",
							onChange: (event) => setContactPhone(event.target.value),
							value: contactPhone
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "party-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "party-email",
							onChange: (event) => setContactEmail(event.target.value),
							type: "email",
							value: contactEmail
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: shipSameAsBilling,
							id: "party-ship-same",
							onCheckedChange: (checked) => setShipSameAsBilling(checked === true)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "party-ship-same",
							children: "Ship-to same as billing"
						})]
					}), !shipSameAsBilling ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "party-ship",
							children: "Shipping address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "party-ship",
							onChange: (event) => setShippingAddress(event.target.value),
							placeholder: "Full ship-to address if different",
							rows: 3,
							value: shippingAddress
						})]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Payment terms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: setPaymentTermsDays,
							value: paymentTermsDays,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								position: "popper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: paymentTermsOptions.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(term.days),
									children: term.label
								}, term.days)) })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							htmlFor: "party-credit",
							children: "Credit limit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "party-credit",
							onChange: (event) => setCreditLimit(event.target.value),
							placeholder: "e.g. 100000.00",
							value: creditLimit
						})]
					})]
				}),
				(partyType === "customer" || partyType === "both") && (priceListsQuery.data ?? []).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Price list"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						onValueChange: (value) => setPriceListId(value === "none" ? "" : value),
						value: priceListId || "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Default item rates" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							position: "popper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "none",
								children: "Default item rates"
							}), (priceListsQuery.data ?? []).map((list) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: list.id,
								children: list.name
							}, list.id))] })
						})]
					})]
				}) : null,
				formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: formError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: saving,
					type: "submit",
					children: saving ? "Saving…" : isEdit ? "Save changes" : "Save"
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
export { CreatePartyDialog as t };
