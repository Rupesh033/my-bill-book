import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace } from "./workspace-context-Cz54y75x.js";
import { r as useMutation, t as getFormErrorMessage } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as Textarea } from "./textarea-BFjnTMvl.js";
//#region src/features/companies/components/company-profile-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var emptyProfile = {
	addressLine1: "",
	addressLine2: "",
	city: "",
	pincode: "",
	pan: "",
	contactPhone: "",
	contactEmail: "",
	bankName: "",
	bankAccountNumber: "",
	bankIfsc: "",
	authorizedSignatory: "",
	logoUrl: "",
	invoiceTerms: ""
};
var fields = [
	{
		key: "addressLine1",
		label: "Address line 1",
		placeholder: "Shop 12, MG Road"
	},
	{
		key: "addressLine2",
		label: "Address line 2",
		placeholder: "Near City Mall"
	},
	{
		key: "city",
		label: "City"
	},
	{
		key: "pincode",
		label: "PIN code"
	},
	{
		key: "pan",
		label: "PAN",
		placeholder: "ABCDE1234F"
	},
	{
		key: "contactPhone",
		label: "Phone"
	},
	{
		key: "contactEmail",
		label: "Email"
	},
	{
		key: "authorizedSignatory",
		label: "Authorised signatory"
	},
	{
		key: "bankName",
		label: "Bank name"
	},
	{
		key: "bankAccountNumber",
		label: "Bank account number"
	},
	{
		key: "bankIfsc",
		label: "IFSC"
	},
	{
		key: "logoUrl",
		label: "Logo URL"
	},
	{
		key: "invoiceTerms",
		label: "Invoice terms",
		placeholder: "Payment due in 30 days. Goods once sold will not be taken back."
	}
];
function CompanyProfilePanel() {
	const trpc = useTRPC();
	const { companyId, company, refresh } = useWorkspace();
	const [profile, setProfile] = import_react.useState(emptyProfile);
	import_react.useEffect(() => {
		if (!company) return;
		setProfile({
			addressLine1: company.addressLine1,
			addressLine2: company.addressLine2,
			city: company.city,
			pincode: company.pincode,
			pan: company.pan,
			contactPhone: company.contactPhone,
			contactEmail: company.contactEmail,
			bankName: company.bankName,
			bankAccountNumber: company.bankAccountNumber,
			bankIfsc: company.bankIfsc,
			authorizedSignatory: company.authorizedSignatory,
			logoUrl: company.logoUrl,
			invoiceTerms: company.invoiceTerms
		});
	}, [company]);
	const updateProfile = useMutation(trpc.companies.updateProfile.mutationOptions());
	async function handleSave() {
		if (!companyId) return;
		try {
			await updateProfile.mutateAsync({
				companyId,
				...profile
			});
			await refresh();
			toast.success("Company profile saved");
		} catch (err) {
			toast.error(getFormErrorMessage(err, "Unable to save profile"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "Company profile"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Used on GST tax invoices: address, PAN, bank details, and signatory." })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "grid gap-4 sm:grid-cols-2",
			children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: field.key === "invoiceTerms" ? "flex flex-col gap-1.5 sm:col-span-2" : "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-medium",
					htmlFor: `company-${field.key}`,
					children: field.label
				}), field.key === "invoiceTerms" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: `company-${field.key}`,
					onChange: (event) => setProfile((current) => ({
						...current,
						[field.key]: event.target.value
					})),
					placeholder: field.placeholder,
					rows: 3,
					value: profile[field.key]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: `company-${field.key}`,
					onChange: (event) => setProfile((current) => ({
						...current,
						[field.key]: event.target.value
					})),
					placeholder: field.placeholder,
					value: profile[field.key]
				})]
			}, field.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
			className: "justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !companyId || updateProfile.isPending,
				onClick: () => void handleSave(),
				type: "button",
				children: updateProfile.isPending ? "Saving…" : "Save profile"
			})
		})
	] });
}
//#endregion
export { CompanyProfilePanel as t };
