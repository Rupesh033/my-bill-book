import { a as __toESM, n as require_react } from "./jsx-runtime-37ZnD8LL.js";
import { $ as hashKey, I as useQueryClient, R as getDefaultState, W as notifyManager, ht as Subscribable, it as noop, lt as shallowEqualObjects, o as TRPCClientError, ut as shouldThrowError } from "./react-CJuu14_E.js";
import { n as toast } from "./dist-FOYHZCix.js";
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var MutationObserver = class extends Subscribable {
	#client;
	#currentResult = void 0;
	#currentMutation;
	#mutateOptions;
	constructor(client, options) {
		super();
		this.#client = client;
		this.setOptions(options);
		this.bindMethods();
		this.#updateResult();
	}
	bindMethods() {
		this.mutate = this.mutate.bind(this);
		this.reset = this.reset.bind(this);
	}
	setOptions(options) {
		const prevOptions = this.options;
		this.options = this.#client.defaultMutationOptions(options);
		if (!shallowEqualObjects(this.options, prevOptions)) this.#client.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#currentMutation,
			observer: this
		});
		if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) this.reset();
		else if (this.#currentMutation?.state.status === "pending") this.#currentMutation.setOptions(this.options);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.#currentMutation?.removeObserver(this);
	}
	onMutationUpdate(action) {
		this.#updateResult();
		this.#notify(action);
	}
	getCurrentResult() {
		return this.#currentResult;
	}
	reset() {
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = void 0;
		this.#updateResult();
		this.#notify();
	}
	mutate(variables, options) {
		this.#mutateOptions = options;
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
		this.#currentMutation.addObserver(this);
		return this.#currentMutation.execute(variables);
	}
	#updateResult() {
		const state = this.#currentMutation?.state ?? getDefaultState();
		this.#currentResult = {
			...state,
			isPending: state.status === "pending",
			isSuccess: state.status === "success",
			isError: state.status === "error",
			isIdle: state.status === "idle",
			mutate: this.mutate,
			reset: this.reset
		};
	}
	#notify(action) {
		notifyManager.batch(() => {
			if (this.#mutateOptions && this.hasListeners()) {
				const variables = this.#currentResult.variables;
				const onMutateResult = this.#currentResult.context;
				const context = {
					client: this.#client,
					meta: this.options.meta,
					mutationKey: this.options.mutationKey
				};
				if (action?.type === "success") {
					try {
						this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				} else if (action?.type === "error") {
					try {
						this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				}
			}
			this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
		});
	}
};
//#endregion
//#region node_modules/.bun/@tanstack+react-query@5.101.2+e14d3f224186685e/node_modules/@tanstack/react-query/build/modern/useMutation.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useMutation(options, queryClient) {
	const client = useQueryClient(queryClient);
	const [observer] = import_react.useState(() => new MutationObserver(client, options));
	import_react.useEffect(() => {
		observer.setOptions(options);
	}, [observer, options]);
	const result = import_react.useSyncExternalStore(import_react.useCallback((onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	const mutate = import_react.useCallback((variables, mutateOptions) => {
		observer.mutate(variables, mutateOptions).catch(noop);
	}, [observer]);
	if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) throw result.error;
	return {
		...result,
		mutate,
		mutateAsync: result.mutate
	};
}
//#endregion
//#region src/features/app-shell/form-error.ts
var UUID_PATTERN = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
var MESSAGE_RULES = [
	{
		test: /e-way bill already exists/i,
		message: "An e-way bill is already generated for this invoice."
	},
	{
		test: /e-invoice already exists/i,
		message: "An e-invoice is already generated for this invoice."
	},
	{
		test: /supplier bill number already exists|DuplicateSupplierBill/i,
		message: "This supplier bill number is already recorded."
	},
	{
		test: /invoice already cancelled/i,
		message: "This invoice is already cancelled."
	},
	{
		test: /InsufficientStock|insufficient stock/i,
		message: "Insufficient stock for one or more items."
	},
	{
		test: /DuplicateGodownName|godown name already exists/i,
		message: "A godown with this name already exists."
	},
	{
		test: /GodownInUse|godown is in use/i,
		message: "This godown cannot be deleted because stock movements reference it."
	},
	{
		test: /CannotDeleteDefaultGodown/i,
		message: "The default godown cannot be deleted."
	},
	{
		test: /CannotDeleteLastGodown/i,
		message: "At least one godown must remain."
	},
	{
		test: /GodownNotFound/i,
		message: "Godown not found."
	},
	{
		test: /DuplicatePartyName/i,
		message: "A party with this name already exists."
	},
	{
		test: /PartyNotFound/i,
		message: "Party not found."
	},
	{
		test: /DuplicateCompanyGstin/i,
		message: "A company with this GSTIN already exists."
	},
	{
		test: /LedgerAccountNotFound/i,
		message: "One or more ledger accounts could not be found."
	},
	{
		test: /InsufficientRole|FORBIDDEN|permission denied/i,
		message: "You do not have permission to perform this action."
	},
	{
		test: /Invitation not found/i,
		message: "This invitation is invalid or has expired."
	},
	{
		test: /PaymentAllocationError|Receipt amount must be greater than zero|Payment amount must be greater than zero|exceeds bill outstanding|exceeds invoice outstanding/i,
		message: "Payment amount is invalid or exceeds the document balance."
	},
	{
		test: /UnbalancedLedgerEntry|debits must equal credits/i,
		message: "Journal entry is not balanced. Total debits must equal total credits."
	},
	{
		test: /UNAUTHORIZED|unauthorized/i,
		message: "Please sign in to continue."
	}
];
function extractRawMessage(error) {
	if (error instanceof TRPCClientError) return error.message;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	return "";
}
function parseZodIssues(message) {
	if (!message.startsWith("[")) return null;
	try {
		const parsed = JSON.parse(message);
		if (!Array.isArray(parsed) || parsed.length === 0) return null;
		const fieldLabels = {
			customerStateCode: "Customer state",
			supplierStateCode: "Supplier state",
			companyStateCode: "Company state",
			placeOfSupply: "Place of supply",
			stateCode: "State",
			legalName: "Legal name",
			tradeName: "Trade name",
			name: "Name",
			email: "Email",
			amount: "Amount",
			narration: "Narration",
			customerId: "Customer",
			supplierId: "Supplier",
			invoiceId: "Invoice",
			purchaseBillId: "Purchase bill",
			supplierBillNumber: "Supplier bill number",
			hsnCode: "HSN code",
			quantity: "Quantity",
			rate: "Rate"
		};
		return parsed.map((issue) => {
			const field = issue.path?.[0];
			const label = typeof field === "string" ? fieldLabels[field] ?? field : "";
			const issueMessage = issue.message ?? "Invalid value";
			if (label && /too small|expected string to have|invalid input|required/i.test(issueMessage)) {
				if (field === "customerStateCode" || field === "supplierStateCode" || field === "placeOfSupply" || field === "companyStateCode" || field === "stateCode") return `${label} must be a valid 2-digit Indian state code.`;
				if (field === "email") return "Enter a valid email address.";
				return `${label} is required.`;
			}
			return `${issue.path && issue.path.length > 0 ? `${issue.path.join(".")}: ` : ""}${issueMessage}`;
		}).join("; ");
	} catch {
		return null;
	}
}
function mapToFriendlyMessage(rawMessage) {
	for (const rule of MESSAGE_RULES) if (rule.test.test(rawMessage)) return rule.message;
	return null;
}
function sanitizeMessage(message) {
	return message.replace(/^TRPCClientError:\s*/i, "").replace(/^Error:\s*/i, "").replace(UUID_PATTERN, "").replace(/\s+for sales invoice:\s*\.?/gi, ".").replace(/\s+for invoice:\s*\.?/gi, ".").replace(/\s{2,}/g, " ").replace(/:\s*\.?$/, ".").trim();
}
function looksLikeInternalError(message) {
	if (!message) return true;
	if (UUID_PATTERN.test(message)) return true;
	if (/^[A-Z][A-Za-z]+Error(?::|\s|$)/.test(message)) return true;
	if (/\/src\/|\.ts:\d+|at\s+\w+/.test(message)) return true;
	if (message.length > 200) return true;
	return false;
}
/** Extract a user-safe message from tRPC / Zod / Error failures. */
function getFormErrorMessage(error, fallback = "Something went wrong. Please try again.") {
	const raw = extractRawMessage(error).trim();
	if (!raw) return fallback;
	const zodMessage = parseZodIssues(raw);
	if (zodMessage) return zodMessage;
	const friendly = mapToFriendlyMessage(raw);
	if (friendly) return friendly;
	const sanitized = sanitizeMessage(raw);
	if (looksLikeInternalError(sanitized)) return fallback;
	return sanitized || fallback;
}
/** Show a toast for action failures without leaking backend details. */
function toastActionError(error, fallback = "Something went wrong. Please try again.") {
	toast.error(getFormErrorMessage(error, fallback));
}
//#endregion
export { toastActionError as n, useMutation as r, getFormErrorMessage as t };
