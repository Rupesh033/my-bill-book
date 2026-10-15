import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as useNavigate } from "./useNavigate-B6w6xlxh.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import "./dist-FOYHZCix.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as ArrowRight } from "./arrow-right-B4LXPZ0O.js";
import { n as formatMediumDate, t as DatePicker } from "./date-picker-_tY6BkYJ.js";
import { t as Check } from "./check-C418P8rt.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { a as composeEventHandlers, o as createContextScope, r as useControllableState, s as Primitive } from "./dist-CJvPnXPN.js";
import { t as useDirection } from "./dist-9cMsLzPS.js";
import { n as Root, r as createRovingFocusGroupScope, t as Item } from "./dist-DuO4tPJu.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { r as cva, t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { t as WORKSPACE_COMPANY_KEY } from "./workspace-WPPJL99J.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { n as indianStates } from "./india-masters-DrWYWga8.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
//#endregion
//#region node_modules/.bun/@radix-ui+react-toggle@1.1.14+ae2b4604ef263bc9/node_modules/@radix-ui/react-toggle/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Toggle";
var Toggle = import_react.forwardRef((props, forwardedRef) => {
	const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
	const [pressed, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange,
		defaultProp: defaultPressed ?? false,
		caller: NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-pressed": pressed,
		"data-state": pressed ? "on" : "off",
		"data-disabled": props.disabled ? "" : void 0,
		...buttonProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => {
			if (!props.disabled) setPressed(!pressed);
		})
	});
});
Toggle.displayName = NAME;
//#endregion
//#region node_modules/.bun/@radix-ui+react-toggle-group@1.1.15+ae2b4604ef263bc9/node_modules/@radix-ui/react-toggle-group/dist/index.mjs
var TOGGLE_GROUP_NAME = "ToggleGroup";
var [createToggleGroupContext, createToggleGroupScope] = createContextScope(TOGGLE_GROUP_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var ToggleGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...toggleGroupProps } = props;
	if (type === "single") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplSingle, {
		role: "radiogroup",
		...toggleGroupProps,
		ref: forwardedRef
	});
	if (type === "multiple") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplMultiple, {
		role: "toolbar",
		...toggleGroupProps,
		ref: forwardedRef
	});
	throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``);
});
ToggleGroup$1.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupValueProvider, useToggleGroupValueContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...toggleGroupSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "single",
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemActivate: setValue,
		onItemDeactivate: import_react.useCallback(() => setValue(""), [setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupSingleProps,
			ref: forwardedRef
		})
	});
});
var ToggleGroupImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...toggleGroupMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	const handleButtonActivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleButtonDeactivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "multiple",
		value,
		onItemActivate: handleButtonActivate,
		onItemDeactivate: handleButtonDeactivate,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupMultipleProps,
			ref: forwardedRef
		})
	});
});
ToggleGroup$1.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupContext$1, useToggleGroupContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeToggleGroup, disabled = false, rovingFocus = true, orientation, dir, loop = true, ...toggleGroupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup);
	const direction = useDirection(dir);
	const commonProps = {
		dir: direction,
		...toggleGroupProps
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext$1, {
		scope: __scopeToggleGroup,
		rovingFocus,
		disabled,
		children: rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...commonProps,
				ref: forwardedRef
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			...commonProps,
			ref: forwardedRef
		})
	});
});
var ITEM_NAME = "ToggleGroupItem";
var ToggleGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const valueContext = useToggleGroupValueContext(ITEM_NAME, props.__scopeToggleGroup);
	const context = useToggleGroupContext(ITEM_NAME, props.__scopeToggleGroup);
	const rovingFocusGroupScope = useRovingFocusGroupScope(props.__scopeToggleGroup);
	const pressed = valueContext.value.includes(props.value);
	const disabled = context.disabled || props.disabled;
	const commonProps = {
		...props,
		pressed,
		disabled
	};
	const ref = import_react.useRef(null);
	return context.rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: pressed,
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
			...commonProps,
			ref: forwardedRef
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
		...commonProps,
		ref: forwardedRef
	});
});
ToggleGroupItem$1.displayName = ITEM_NAME;
var ToggleGroupItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeToggleGroup, value, ...itemProps } = props;
	const valueContext = useToggleGroupValueContext(ITEM_NAME, __scopeToggleGroup);
	const singleProps = {
		role: "radio",
		"aria-checked": props.pressed,
		"aria-pressed": void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
		...valueContext.type === "single" ? singleProps : void 0,
		...itemProps,
		ref: forwardedRef,
		onPressedChange: (pressed) => {
			if (pressed) valueContext.onItemActivate(value);
			else valueContext.onItemDeactivate(value);
		}
	});
});
//#endregion
//#region src/components/ui/toggle.tsx
var toggleVariants = cva("group/toggle inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-muted"
		},
		size: {
			default: "h-7 min-w-7 px-2 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
			sm: "h-6 min-w-6 rounded-[min(var(--radius-md),8px)] px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			lg: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region src/components/ui/toggle-group.tsx
var ToggleGroupContext = import_react.createContext({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal"
});
function ToggleGroup({ className, variant, size, spacing = 2, orientation = "horizontal", children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		"data-orientation": orientation,
		style: { "--gap": spacing },
		className: cn("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[size=sm]:rounded-[min(var(--radius-md),8px)] data-vertical:flex-col data-vertical:items-stretch", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing,
				orientation
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant = "default", size = "default", ...props }) {
	const context = import_react.useContext(ToggleGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem$1, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
}
//#endregion
//#region src/features/onboarding/components/create-company-panel.tsx
var businessTypes = [
	{
		value: "wholesale",
		label: "Wholesale / trading"
	},
	{
		value: "retail",
		label: "Retail"
	},
	{
		value: "distribution",
		label: "Distribution"
	},
	{
		value: "manufacturing_light",
		label: "Manufacturing"
	},
	{
		value: "services",
		label: "Services"
	},
	{
		value: "custom",
		label: "Other"
	}
];
var steps = [
	"Company",
	"Tax & books",
	"Business type"
];
function CreateCompanyPanel() {
	const navigate = useNavigate();
	const createWithSetup = useMutation(useTRPC().companies.createWithSetup.mutationOptions());
	const [step, setStep] = import_react.useState(0);
	const [legalName, setLegalName] = import_react.useState("");
	const [tradeName, setTradeName] = import_react.useState("");
	const [gstin, setGstin] = import_react.useState("");
	const [stateCode, setStateCode] = import_react.useState("27");
	const [financialYearStart, setFinancialYearStart] = import_react.useState("2026-04-01");
	const [businessType, setBusinessType] = import_react.useState("wholesale");
	const canContinueStep0 = legalName.trim() && tradeName.trim();
	const canContinueStep1 = stateCode && financialYearStart;
	async function handleFinish() {
		try {
			const result = await createWithSetup.mutateAsync({
				legalName: legalName.trim(),
				tradeName: tradeName.trim(),
				gstin: gstin.trim() ? gstin.trim().toUpperCase() : null,
				stateCode,
				financialYearStart,
				businessType
			});
			window.localStorage.setItem(WORKSPACE_COMPANY_KEY, result.company.id);
			navigate({ to: "/app/dashboard" });
		} catch (err) {
			toastActionError(err, "Unable to create company");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-8 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-lg",
			size: "sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex items-center gap-2",
						children: steps.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `flex size-6 items-center justify-center rounded-full text-sm font-medium ${index <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
								children: index < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-xs text-muted-foreground",
								children: label
							})]
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-lg",
						children: "Set up your company"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "We will seed your chart of accounts, financial year, and ledgers automatically." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [
						step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "ob-legal",
								children: "Legal name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ob-legal",
								onChange: (event) => setLegalName(event.target.value),
								placeholder: "Shaban Textiles Private Limited",
								value: legalName
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "ob-trade",
								children: "Trade name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ob-trade",
								onChange: (event) => setTradeName(event.target.value),
								placeholder: "Shaban Textiles",
								value: tradeName
							})]
						})] }) : null,
						step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "ob-gstin",
									children: "GSTIN (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ob-gstin",
									onChange: (event) => setGstin(event.target.value),
									placeholder: "27ABCDE1234F1Z5",
									value: gstin
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									htmlFor: "ob-fy",
									children: "Financial year start"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
									formatValue: formatMediumDate,
									id: "ob-fy",
									onChange: setFinancialYearStart,
									value: financialYearStart
								})]
							})
						] }) : null,
						step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup, {
							className: "grid w-full grid-cols-1 gap-2 sm:grid-cols-2",
							onValueChange: (value) => {
								if (value) setBusinessType(value);
							},
							spacing: 0,
							type: "single",
							value: businessType,
							variant: "outline",
							children: businessTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								className: "h-auto min-h-14 flex-col items-start justify-center gap-1 p-3 text-left text-sm",
								value: type.value,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: type.label
								})
							}, type.value))
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
					className: "flex flex-col-reverse gap-3 sm:flex-row sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: step === 0,
						onClick: () => setStep((current) => Math.max(0, current - 1)),
						type: "button",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "data-icon": "inline-start" }), "Back"]
					}), step < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: step === 0 ? !canContinueStep0 : !canContinueStep1,
						onClick: () => setStep((current) => current + 1),
						type: "button",
						children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "data-icon": "inline-end" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: createWithSetup.isPending,
						onClick: () => void handleFinish(),
						type: "button",
						children: [createWithSetup.isPending ? "Creating…" : "Create company", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "data-icon": "inline-end" })]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/routes/onboarding.tsx?tsr-split=component
function OnboardingRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateCompanyPanel, {});
}
//#endregion
export { OnboardingRoute as component };
