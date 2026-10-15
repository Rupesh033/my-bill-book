import { a as __toESM$3, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.subscribe = this.subscribe.bind(this);
	}
	subscribe(listener) {
		this.listeners.add(listener);
		this.onSubscribe();
		return () => {
			this.listeners.delete(listener);
			this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
};
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
	#focused;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onFocus) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const listener = () => onFocus();
				window.addEventListener("visibilitychange", listener, false);
				return () => {
					window.removeEventListener("visibilitychange", listener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup((focused) => {
			if (typeof focused === "boolean") this.setFocused(focused);
			else this.onFocus();
		});
	}
	setFocused(focused) {
		if (this.#focused !== focused) {
			this.#focused = focused;
			this.onFocus();
		}
	}
	onFocus() {
		const isFocused = this.isFocused();
		this.listeners.forEach((listener) => {
			listener(isFocused);
		});
	}
	isFocused() {
		if (typeof this.#focused === "boolean") return this.#focused;
		return globalThis.document?.visibilityState !== "hidden";
	}
};
var focusManager = new FocusManager();
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timeoutId) => clearTimeout(timeoutId),
	setInterval: (callback, delay) => setInterval(callback, delay),
	clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
	#provider = defaultTimeoutProvider;
	#providerCalled = false;
	setTimeoutProvider(provider) {
		this.#provider = provider;
	}
	setTimeout(callback, delay) {
		return this.#provider.setTimeout(callback, delay);
	}
	clearTimeout(timeoutId) {
		this.#provider.clearTimeout(timeoutId);
	}
	setInterval(callback, delay) {
		return this.#provider.setInterval(callback, delay);
	}
	clearInterval(intervalId) {
		this.#provider.clearInterval(intervalId);
	}
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
	setTimeout(callback, 0);
}
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop$1() {}
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
	return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
	return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
	return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveQueryBoolean(option, query) {
	return typeof option === "function" ? option(query) : option;
}
function matchQuery(filters, query) {
	const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
	if (queryKey) {
		if (exact) {
			if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
		} else if (!partialMatchKey(query.queryKey, queryKey)) return false;
	}
	if (type !== "all") {
		const isActive = query.isActive();
		if (type === "active" && !isActive) return false;
		if (type === "inactive" && isActive) return false;
	}
	if (typeof stale === "boolean" && query.isStale() !== stale) return false;
	if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
	if (predicate && !predicate(query)) return false;
	return true;
}
function matchMutation(filters, mutation) {
	const { exact, status, predicate, mutationKey } = filters;
	if (mutationKey) {
		if (!mutation.options.mutationKey) return false;
		if (exact) {
			if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
		} else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
	}
	if (status && mutation.state.status !== status) return false;
	if (predicate && !predicate(mutation)) return false;
	return true;
}
function hashQueryKeyByOptions(queryKey, options) {
	return (options?.queryKeyHashFn || hashKey)(queryKey);
}
function hashKey(queryKey) {
	return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
		result[key] = val[key];
		return result;
	}, {}) : val);
}
function partialMatchKey(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a && b && typeof a === "object" && typeof b === "object") return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
	return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
	if (a === b) return a;
	if (depth > 500) return b;
	const array = isPlainArray(a) && isPlainArray(b);
	if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
	const aSize = (array ? a : Object.keys(a)).length;
	const bItems = array ? b : Object.keys(b);
	const bSize = bItems.length;
	const copy = array ? new Array(bSize) : {};
	let equalItems = 0;
	for (let i = 0; i < bSize; i++) {
		const key = array ? i : bItems[i];
		const aItem = a[key];
		const bItem = b[key];
		if (aItem === bItem) {
			copy[key] = aItem;
			if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
			continue;
		}
		if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
			copy[key] = bItem;
			continue;
		}
		const v = replaceEqualDeep(aItem, bItem, depth + 1);
		copy[key] = v;
		if (v === aItem) equalItems++;
	}
	return aSize === bSize && equalItems === aSize ? a : copy;
}
function shallowEqualObjects(a, b) {
	if (!b || Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (a[key] !== b[key]) return false;
	return true;
}
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	if (Object.getPrototypeOf(o) !== Object.prototype) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
	return new Promise((resolve) => {
		timeoutManager.setTimeout(resolve, timeout);
	});
}
function replaceData(prevData, data, options) {
	if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
	else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data);
	return data;
}
function addToEnd(items, item, max = 0) {
	const newItems = [...items, item];
	return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
	const newItems = [item, ...items];
	return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
	if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
	if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
	return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
	if (typeof throwOnError === "function") return throwOnError(...params);
	return !!throwOnError;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
	let consumed = false;
	let signal;
	Object.defineProperty(object, "signal", {
		enumerable: true,
		get: () => {
			signal ??= getSignal();
			if (consumed) return signal;
			consumed = true;
			if (signal.aborted) onCancelled();
			else signal.addEventListener("abort", onCancelled, { once: true });
			return signal;
		}
	});
	return object;
}
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/environmentManager.js
var environmentManager = /* @__PURE__ */ (() => {
	let isServerFn = () => isServer;
	return {
		/**
		* Returns whether the current runtime should be treated as a server environment.
		*/
		isServer() {
			return isServerFn();
		},
		/**
		* Overrides the server check globally.
		*/
		setIsServer(isServerValue) {
			isServerFn = isServerValue;
		}
	};
})();
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
	let resolve;
	let reject;
	const thenable = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	thenable.status = "pending";
	thenable.catch(() => {});
	function finalize(data) {
		Object.assign(thenable, data);
		delete thenable.resolve;
		delete thenable.reject;
	}
	thenable.resolve = (value) => {
		finalize({
			status: "fulfilled",
			value
		});
		resolve(value);
	};
	thenable.reject = (reason) => {
		finalize({
			status: "rejected",
			reason
		});
		reject(reason);
	};
	return thenable;
}
function tryResolveSync(promise) {
	let data;
	promise.then((result) => {
		data = result;
		return result;
	}, noop$1)?.catch(noop$1);
	if (data !== void 0) return { data };
}
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
	let queue = [];
	let transactions = 0;
	let notifyFn = (callback) => {
		callback();
	};
	let batchNotifyFn = (callback) => {
		callback();
	};
	let scheduleFn = defaultScheduler;
	const schedule = (callback) => {
		if (transactions) queue.push(callback);
		else scheduleFn(() => {
			notifyFn(callback);
		});
	};
	const flush = () => {
		const originalQueue = queue;
		queue = [];
		if (originalQueue.length) scheduleFn(() => {
			batchNotifyFn(() => {
				originalQueue.forEach((callback) => {
					notifyFn(callback);
				});
			});
		});
	};
	return {
		batch: (callback) => {
			let result;
			transactions++;
			try {
				result = callback();
			} finally {
				transactions--;
				if (!transactions) flush();
			}
			return result;
		},
		/**
		* All calls to the wrapped function will be batched.
		*/
		batchCalls: (callback) => {
			return (...args) => {
				schedule(() => {
					callback(...args);
				});
			};
		},
		schedule,
		/**
		* Use this method to set a custom notify function.
		* This can be used to for example wrap notifications with `React.act` while running tests.
		*/
		setNotifyFunction: (fn) => {
			notifyFn = fn;
		},
		/**
		* Use this method to set a custom function to batch notifications together into a single tick.
		* By default React Query will use the batch function provided by ReactDOM or React Native.
		*/
		setBatchNotifyFunction: (fn) => {
			batchNotifyFn = fn;
		},
		setScheduler: (fn) => {
			scheduleFn = fn;
		}
	};
}
var notifyManager = createNotifyManager();
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
	#online = true;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onOnline) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const onlineListener = () => onOnline(true);
				const offlineListener = () => onOnline(false);
				window.addEventListener("online", onlineListener, false);
				window.addEventListener("offline", offlineListener, false);
				return () => {
					window.removeEventListener("online", onlineListener);
					window.removeEventListener("offline", offlineListener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup(this.setOnline.bind(this));
	}
	setOnline(online) {
		if (this.#online !== online) {
			this.#online = online;
			this.listeners.forEach((listener) => {
				listener(online);
			});
		}
	}
	isOnline() {
		return this.#online;
	}
};
var onlineManager = new OnlineManager();
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
	return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
	return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
	constructor(options) {
		super("CancelledError");
		this.revert = options?.revert;
		this.silent = options?.silent;
	}
};
function createRetryer(config) {
	let isRetryCancelled = false;
	let failureCount = 0;
	let continueFn;
	const thenable = pendingThenable();
	const isResolved = () => thenable.status !== "pending";
	const cancel = (cancelOptions) => {
		if (!isResolved()) {
			const error = new CancelledError(cancelOptions);
			reject(error);
			config.onCancel?.(error);
		}
	};
	const cancelRetry = () => {
		isRetryCancelled = true;
	};
	const continueRetry = () => {
		isRetryCancelled = false;
	};
	const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
	const canStart = () => canFetch(config.networkMode) && config.canRun();
	const resolve = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.resolve(value);
		}
	};
	const reject = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.reject(value);
		}
	};
	const pause = () => {
		return new Promise((continueResolve) => {
			continueFn = (value) => {
				if (isResolved() || canContinue()) continueResolve(value);
			};
			config.onPause?.();
		}).then(() => {
			continueFn = void 0;
			if (!isResolved()) config.onContinue?.();
		});
	};
	const run = () => {
		if (isResolved()) return;
		let promiseOrValue;
		const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
		try {
			promiseOrValue = initialPromise ?? config.fn();
		} catch (error) {
			promiseOrValue = Promise.reject(error);
		}
		Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
			if (isResolved()) return;
			const retry = config.retry ?? (environmentManager.isServer() ? 0 : 3);
			const retryDelay = config.retryDelay ?? defaultRetryDelay;
			const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
			const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
			if (isRetryCancelled || !shouldRetry) {
				reject(error);
				return;
			}
			failureCount++;
			config.onFail?.(failureCount, error);
			sleep(delay).then(() => {
				return canContinue() ? void 0 : pause();
			}).then(() => {
				if (isRetryCancelled) reject(error);
				else run();
			});
		});
	};
	return {
		promise: thenable,
		status: () => thenable.status,
		cancel,
		continue: () => {
			continueFn?.();
			return thenable;
		},
		cancelRetry,
		continueRetry,
		canStart,
		start: () => {
			if (canStart()) run();
			else pause().then(run);
			return thenable;
		}
	};
}
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
	#gcTimeout;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout();
		if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime);
	}
	updateGcTime(newGcTime) {
		this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (environmentManager.isServer() ? Infinity : 300 * 1e3));
	}
	clearGcTimeout() {
		if (this.#gcTimeout !== void 0) {
			timeoutManager.clearTimeout(this.#gcTimeout);
			this.#gcTimeout = void 0;
		}
	}
};
//#endregion
//#region node_modules/.bun/@tanstack+query-core@5.101.2/node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
	#client;
	#observers;
	#mutationCache;
	#retryer;
	constructor(config) {
		super();
		this.#client = config.client;
		this.mutationId = config.mutationId;
		this.#mutationCache = config.mutationCache;
		this.#observers = [];
		this.state = config.state || getDefaultState();
		this.setOptions(config.options);
		this.scheduleGc();
	}
	setOptions(options) {
		this.options = options;
		this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(observer) {
		if (!this.#observers.includes(observer)) {
			this.#observers.push(observer);
			this.clearGcTimeout();
			this.#mutationCache.notify({
				type: "observerAdded",
				mutation: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		this.#observers = this.#observers.filter((x) => x !== observer);
		this.scheduleGc();
		this.#mutationCache.notify({
			type: "observerRemoved",
			mutation: this,
			observer
		});
	}
	optionalRemove() {
		if (!this.#observers.length) if (this.state.status === "pending") this.scheduleGc();
		else this.#mutationCache.remove(this);
	}
	continue() {
		return this.#retryer?.continue() ?? this.execute(this.state.variables);
	}
	async execute(variables) {
		const onContinue = () => {
			this.#dispatch({ type: "continue" });
		};
		const mutationFnContext = {
			client: this.#client,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		this.#retryer = createRetryer({
			fn: () => {
				if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
				return this.options.mutationFn(variables, mutationFnContext);
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#mutationCache.canRun(this)
		});
		const restored = this.state.status === "pending";
		const isPaused = !this.#retryer.canStart();
		try {
			if (restored) onContinue();
			else {
				this.#dispatch({
					type: "pending",
					variables,
					isPaused
				});
				if (this.#mutationCache.config.onMutate) await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
				const context = await this.options.onMutate?.(variables, mutationFnContext);
				if (context !== this.state.context) this.#dispatch({
					type: "pending",
					context,
					variables,
					isPaused
				});
			}
			const data = await this.#retryer.start();
			await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
			await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
			await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
			await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
			this.#dispatch({
				type: "success",
				data
			});
			return data;
		} catch (error) {
			try {
				await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			this.#dispatch({
				type: "error",
				error
			});
			throw error;
		} finally {
			this.#mutationCache.runNext(this);
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					failureCount: action.failureCount,
					failureReason: action.error
				};
				case "pause": return {
					...state,
					isPaused: true
				};
				case "continue": return {
					...state,
					isPaused: false
				};
				case "pending": return {
					...state,
					context: action.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: action.isPaused,
					status: "pending",
					variables: action.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...state,
					data: action.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: false
				};
				case "error": return {
					...state,
					data: void 0,
					error: action.error,
					failureCount: state.failureCount + 1,
					failureReason: action.error,
					isPaused: false,
					status: "error"
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.#observers.forEach((observer) => {
				observer.onMutationUpdate(action);
			});
			this.#mutationCache.notify({
				mutation: this,
				type: "updated",
				action
			});
		});
	}
};
function getDefaultState() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: false,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region node_modules/.bun/@tanstack+react-query@5.101.2+e14d3f224186685e/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var import_react = /* @__PURE__ */ __toESM$3(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var QueryClientContext = import_react.createContext(void 0);
var useQueryClient = (queryClient) => {
	const client = import_react.useContext(QueryClientContext);
	if (queryClient) return queryClient;
	if (!client) throw new Error("No QueryClient set, use QueryClientProvider to set one");
	return client;
};
var QueryClientProvider = ({ client, children }) => {
	import_react.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
		value: client,
		children
	});
};
//#endregion
//#region node_modules/.bun/@tanstack+react-query@5.101.2+e14d3f224186685e/node_modules/@tanstack/react-query/build/modern/queryOptions.js
function queryOptions(options) {
	return options;
}
//#endregion
//#region node_modules/.bun/@tanstack+react-query@5.101.2+e14d3f224186685e/node_modules/@tanstack/react-query/build/modern/infiniteQueryOptions.js
function infiniteQueryOptions(options) {
	return options;
}
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/objectSpread2-BvkFp-_Y.mjs
var __create$2 = Object.create;
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$2 = Object.getOwnPropertyNames;
var __getProtoOf$2 = Object.getPrototypeOf;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __commonJS$2 = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames$2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$2 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$2(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp$2.call(to, key) && key !== except) __defProp$2(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc$2(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$2 = (mod, isNodeMode, target) => (target = mod != null ? __create$2(__getProtoOf$2(mod)) : {}, __copyProps$2(isNodeMode || !mod || !mod.__esModule ? __defProp$2(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var require_typeof$2 = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports, module) {
	function _typeof$2(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
			return typeof o$1;
		} : function(o$1) {
			return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof$2(o);
	}
	module.exports = _typeof$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPrimitive$2 = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports, module) {
	var _typeof$1 = require_typeof$2()["default"];
	function toPrimitive$1(t, r) {
		if ("object" != _typeof$1(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof$1(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPropertyKey$2 = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports, module) {
	var _typeof = require_typeof$2()["default"];
	var toPrimitive = require_toPrimitive$2();
	function toPropertyKey$1(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_defineProperty$2 = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports, module) {
	var toPropertyKey = require_toPropertyKey$2();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectSpread2$2 = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports, module) {
	var defineProperty = require_defineProperty$2();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
				defineProperty(e, r$1, t[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
				Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
			});
		}
		return e;
	}
	module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
//#endregion
//#region node_modules/.bun/@trpc+server@11.18.0+7524df1edfed9f02/node_modules/@trpc/server/dist/observable-UMO3vUa_.mjs
/** @public */
function isObservable(x) {
	return typeof x === "object" && x !== null && "subscribe" in x;
}
/** @public */
function observable(subscribe) {
	const self = {
		subscribe(observer) {
			let teardownRef = null;
			let isDone = false;
			let unsubscribed = false;
			let teardownImmediately = false;
			function unsubscribe() {
				if (teardownRef === null) {
					teardownImmediately = true;
					return;
				}
				if (unsubscribed) return;
				unsubscribed = true;
				if (typeof teardownRef === "function") teardownRef();
				else if (teardownRef) teardownRef.unsubscribe();
			}
			teardownRef = subscribe({
				next(value) {
					var _observer$next;
					if (isDone) return;
					(_observer$next = observer.next) === null || _observer$next === void 0 || _observer$next.call(observer, value);
				},
				error(err) {
					var _observer$error;
					if (isDone) return;
					isDone = true;
					(_observer$error = observer.error) === null || _observer$error === void 0 || _observer$error.call(observer, err);
					unsubscribe();
				},
				complete() {
					var _observer$complete;
					if (isDone) return;
					isDone = true;
					(_observer$complete = observer.complete) === null || _observer$complete === void 0 || _observer$complete.call(observer);
					unsubscribe();
				}
			});
			if (teardownImmediately) unsubscribe();
			return { unsubscribe };
		},
		pipe(...operations) {
			return operations.reduce(pipeReducer, self);
		}
	};
	return self;
}
function pipeReducer(prev, fn) {
	return fn(prev);
}
/** @internal */
function observableToPromise(observable$1) {
	const ac = new AbortController();
	return new Promise((resolve, reject) => {
		let isDone = false;
		function onDone() {
			if (isDone) return;
			isDone = true;
			obs$.unsubscribe();
		}
		ac.signal.addEventListener("abort", () => {
			reject(ac.signal.reason);
		});
		const obs$ = observable$1.subscribe({
			next(data) {
				isDone = true;
				resolve(data);
				onDone();
			},
			error(data) {
				reject(data);
			},
			complete() {
				ac.abort();
				onDone();
			}
		});
	});
}
/**
* @internal
*/
function observableToReadableStream(observable$1, signal) {
	let unsub = null;
	const onAbort = () => {
		unsub === null || unsub === void 0 || unsub.unsubscribe();
		unsub = null;
		signal.removeEventListener("abort", onAbort);
	};
	return new ReadableStream({
		start(controller) {
			unsub = observable$1.subscribe({
				next(data) {
					controller.enqueue({
						ok: true,
						value: data
					});
				},
				error(error) {
					controller.enqueue({
						ok: false,
						error
					});
					controller.close();
				},
				complete() {
					controller.close();
				}
			});
			if (signal.aborted) onAbort();
			else signal.addEventListener("abort", onAbort, { once: true });
		},
		cancel() {
			onAbort();
		}
	});
}
/** @internal */
function observableToAsyncIterable(observable$1, signal) {
	const reader = observableToReadableStream(observable$1, signal).getReader();
	const iterator = {
		async next() {
			const value = await reader.read();
			if (value.done) return {
				value: void 0,
				done: true
			};
			const { value: result } = value;
			if (!result.ok) throw result.error;
			return {
				value: result.value,
				done: false
			};
		},
		async return() {
			await reader.cancel();
			return {
				value: void 0,
				done: true
			};
		}
	};
	return { [Symbol.asyncIterator]() {
		return iterator;
	} };
}
//#endregion
//#region node_modules/.bun/@trpc+server@11.18.0+7524df1edfed9f02/node_modules/@trpc/server/dist/observable-CUiPknO-.mjs
function share(_opts) {
	return (source) => {
		let refCount = 0;
		let subscription = null;
		const observers = [];
		function startIfNeeded() {
			if (subscription) return;
			subscription = source.subscribe({
				next(value) {
					for (const observer of observers) {
						var _observer$next;
						(_observer$next = observer.next) === null || _observer$next === void 0 || _observer$next.call(observer, value);
					}
				},
				error(error) {
					for (const observer of observers) {
						var _observer$error;
						(_observer$error = observer.error) === null || _observer$error === void 0 || _observer$error.call(observer, error);
					}
				},
				complete() {
					for (const observer of observers) {
						var _observer$complete;
						(_observer$complete = observer.complete) === null || _observer$complete === void 0 || _observer$complete.call(observer);
					}
				}
			});
		}
		function resetIfNeeded() {
			if (refCount === 0 && subscription) {
				const _sub = subscription;
				subscription = null;
				_sub.unsubscribe();
			}
		}
		return observable((subscriber) => {
			refCount++;
			observers.push(subscriber);
			startIfNeeded();
			return { unsubscribe() {
				refCount--;
				resetIfNeeded();
				const index = observers.findIndex((v) => v === subscriber);
				if (index > -1) observers.splice(index, 1);
			} };
		});
	};
}
/**
* @internal
* An observable that maintains and provides a "current value" to subscribers
* @see https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
*/
function behaviorSubject(initialValue) {
	let value = initialValue;
	const observerList = [];
	const addObserver = (observer) => {
		if (value !== void 0) observer.next(value);
		observerList.push(observer);
	};
	const removeObserver = (observer) => {
		observerList.splice(observerList.indexOf(observer), 1);
	};
	const obs = observable((observer) => {
		addObserver(observer);
		return () => {
			removeObserver(observer);
		};
	});
	obs.next = (nextValue) => {
		if (value === nextValue) return;
		value = nextValue;
		for (const observer of observerList) observer.next(nextValue);
	};
	obs.get = () => value;
	return obs;
}
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/splitLink-B7Cuf2c_.mjs
/** @internal */
function createChain(opts) {
	return observable((observer) => {
		function execute(index = 0, op = opts.op) {
			const next = opts.links[index];
			if (!next) throw new Error("No more links to execute - did you forget to add an ending link?");
			return next({
				op,
				next(nextOp) {
					return execute(index + 1, nextOp);
				}
			});
		}
		return execute().subscribe(observer);
	});
}
//#endregion
//#region node_modules/.bun/@trpc+server@11.18.0+7524df1edfed9f02/node_modules/@trpc/server/dist/codes-DagpWZLc.mjs
/**
* Ensures there are no duplicate keys when building a procedure.
* @internal
*/
function mergeWithoutOverrides(obj1, ...objs) {
	const newObj = Object.assign(emptyObject(), obj1);
	for (const overrides of objs) for (const key in overrides) {
		if (key in newObj && newObj[key] !== overrides[key]) throw new Error(`Duplicate key ${key}`);
		newObj[key] = overrides[key];
	}
	return newObj;
}
/**
* Check that value is object
* @internal
*/
function isObject(value) {
	return !!value && !Array.isArray(value) && typeof value === "object";
}
function isFunction$1(fn) {
	return typeof fn === "function";
}
/**
* Create an object without inheriting anything from `Object.prototype`
* @internal
*/
function emptyObject() {
	return Object.create(null);
}
var asyncIteratorsSupported = typeof Symbol === "function" && !!Symbol.asyncIterator;
function isAsyncIterable(value) {
	return asyncIteratorsSupported && isObject(value) && Symbol.asyncIterator in value;
}
/**
* Run an IIFE
*/
var run = (fn) => fn();
function identity(it) {
	return it;
}
/**
* Ponyfill for
* [`AbortSignal.any`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static).
*/
function abortSignalsAnyPonyfill(signals) {
	if (typeof AbortSignal.any === "function") return AbortSignal.any(signals);
	const ac = new AbortController();
	for (const signal of signals) {
		if (signal.aborted) {
			trigger();
			break;
		}
		signal.addEventListener("abort", trigger, { once: true });
	}
	return ac.signal;
	function trigger() {
		ac.abort();
		for (const signal of signals) signal.removeEventListener("abort", trigger);
	}
}
/**
* JSON-RPC 2.0 Error codes
*
* `-32000` to `-32099` are reserved for implementation-defined server-errors.
* For tRPC we're copying the last digits of HTTP 4XX errors.
*/
var TRPC_ERROR_CODES_BY_KEY = {
	PARSE_ERROR: -32700,
	BAD_REQUEST: -32600,
	INTERNAL_SERVER_ERROR: -32603,
	NOT_IMPLEMENTED: -32603,
	BAD_GATEWAY: -32603,
	SERVICE_UNAVAILABLE: -32603,
	GATEWAY_TIMEOUT: -32603,
	UNAUTHORIZED: -32001,
	PAYMENT_REQUIRED: -32002,
	FORBIDDEN: -32003,
	NOT_FOUND: -32004,
	METHOD_NOT_SUPPORTED: -32005,
	TIMEOUT: -32008,
	CONFLICT: -32009,
	PRECONDITION_FAILED: -32012,
	PAYLOAD_TOO_LARGE: -32013,
	UNSUPPORTED_MEDIA_TYPE: -32015,
	UNPROCESSABLE_CONTENT: -32022,
	PRECONDITION_REQUIRED: -32028,
	TOO_MANY_REQUESTS: -32029,
	CLIENT_CLOSED_REQUEST: -32099
};
var TRPC_ERROR_CODES_BY_NUMBER = {
	[-32700]: "PARSE_ERROR",
	[-32600]: "BAD_REQUEST",
	[-32603]: "INTERNAL_SERVER_ERROR",
	[-32001]: "UNAUTHORIZED",
	[-32002]: "PAYMENT_REQUIRED",
	[-32003]: "FORBIDDEN",
	[-32004]: "NOT_FOUND",
	[-32005]: "METHOD_NOT_SUPPORTED",
	[-32008]: "TIMEOUT",
	[-32009]: "CONFLICT",
	[-32012]: "PRECONDITION_FAILED",
	[-32013]: "PAYLOAD_TOO_LARGE",
	[-32015]: "UNSUPPORTED_MEDIA_TYPE",
	[-32022]: "UNPROCESSABLE_CONTENT",
	[-32028]: "PRECONDITION_REQUIRED",
	[-32029]: "TOO_MANY_REQUESTS",
	[-32099]: "CLIENT_CLOSED_REQUEST"
};
TRPC_ERROR_CODES_BY_KEY.BAD_GATEWAY, TRPC_ERROR_CODES_BY_KEY.SERVICE_UNAVAILABLE, TRPC_ERROR_CODES_BY_KEY.GATEWAY_TIMEOUT, TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR;
//#endregion
//#region node_modules/.bun/@trpc+server@11.18.0+7524df1edfed9f02/node_modules/@trpc/server/dist/getErrorShape-BPSzUA7W.mjs
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$1(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var noop = () => {};
var freezeIfAvailable = (obj) => {
	if (Object.freeze) Object.freeze(obj);
};
function createInnerProxy(callback, path, memo) {
	var _memo$cacheKey;
	const cacheKey = path.join(".");
	(_memo$cacheKey = memo[cacheKey]) !== null && _memo$cacheKey !== void 0 || (memo[cacheKey] = new Proxy(noop, {
		get(_obj, key) {
			if (typeof key !== "string" || key === "then") return void 0;
			return createInnerProxy(callback, [...path, key], memo);
		},
		apply(_1, _2, args) {
			const lastOfPath = path[path.length - 1];
			if (lastOfPath === "valueOf" || lastOfPath === "toString" || lastOfPath === "toJSON") return `tRPC.proxy(${path.slice(0, -1).join(".")})`;
			let opts = {
				args,
				path
			};
			if (lastOfPath === "call") opts = {
				args: args.length >= 2 ? [args[1]] : [],
				path: path.slice(0, -1)
			};
			else if (lastOfPath === "apply") opts = {
				args: args.length >= 2 ? args[1] : [],
				path: path.slice(0, -1)
			};
			freezeIfAvailable(opts.args);
			freezeIfAvailable(opts.path);
			return callback(opts);
		}
	}));
	return memo[cacheKey];
}
/**
* Creates a proxy that calls the callback with the path and arguments
*
* @internal
*/
var createRecursiveProxy = (callback) => createInnerProxy(callback, [], emptyObject());
/**
* Used in place of `new Proxy` where each handler will map 1 level deep to another value.
*
* @internal
*/
var createFlatProxy = (callback) => {
	return new Proxy(noop, { get(_obj, name) {
		if (name === "then") return void 0;
		return callback(name);
	} });
};
var JSONRPC2_TO_HTTP_CODE = {
	PARSE_ERROR: 400,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_SUPPORTED: 405,
	TIMEOUT: 408,
	CONFLICT: 409,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	UNSUPPORTED_MEDIA_TYPE: 415,
	UNPROCESSABLE_CONTENT: 422,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	CLIENT_CLOSED_REQUEST: 499,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504
};
function getStatusCodeFromKey(code) {
	var _JSONRPC2_TO_HTTP_COD;
	return (_JSONRPC2_TO_HTTP_COD = JSONRPC2_TO_HTTP_CODE[code]) !== null && _JSONRPC2_TO_HTTP_COD !== void 0 ? _JSONRPC2_TO_HTTP_COD : 500;
}
function getHTTPStatusCode(json) {
	const httpStatuses = new Set((Array.isArray(json) ? json : [json]).map((res) => {
		if ("error" in res && isObject(res.error.data)) {
			var _res$error$data;
			if (typeof ((_res$error$data = res.error.data) === null || _res$error$data === void 0 ? void 0 : _res$error$data["httpStatus"]) === "number") return res.error.data["httpStatus"];
			const code = TRPC_ERROR_CODES_BY_NUMBER[res.error.code];
			return getStatusCodeFromKey(code);
		}
		return 200;
	}));
	if (httpStatuses.size !== 1) return 207;
	return httpStatuses.values().next().value;
}
function getHTTPStatusCodeFromError(error) {
	return getStatusCodeFromKey(error.code);
}
var require_typeof$1 = __commonJS$1({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports, module) {
	function _typeof$2(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
			return typeof o$1;
		} : function(o$1) {
			return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof$2(o);
	}
	module.exports = _typeof$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPrimitive$1 = __commonJS$1({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports, module) {
	var _typeof$1 = require_typeof$1()["default"];
	function toPrimitive$1(t, r) {
		if ("object" != _typeof$1(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof$1(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPropertyKey$1 = __commonJS$1({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports, module) {
	var _typeof = require_typeof$1()["default"];
	var toPrimitive = require_toPrimitive$1();
	function toPropertyKey$1(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_defineProperty$1 = __commonJS$1({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports, module) {
	var toPropertyKey = require_toPropertyKey$1();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectSpread2$1 = __commonJS$1({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports, module) {
	var defineProperty = require_defineProperty$1();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
				defineProperty(e, r$1, t[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
				Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
			});
		}
		return e;
	}
	module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var import_objectSpread2$14 = __toESM$1(require_objectSpread2$1(), 1);
/**
* @internal
*/
function getErrorShape(opts) {
	const { path, error, config } = opts;
	const { code } = opts.error;
	const shape = {
		message: error.message,
		code: TRPC_ERROR_CODES_BY_KEY[code],
		data: {
			code,
			httpStatus: getHTTPStatusCodeFromError(error)
		}
	};
	if (config.isDev && typeof opts.error.stack === "string") shape.data.stack = opts.error.stack;
	if (typeof path === "string") shape.data.path = path;
	return config.errorFormatter((0, import_objectSpread2$14.default)((0, import_objectSpread2$14.default)({}, opts), {}, { shape }));
}
//#endregion
//#region node_modules/.bun/@trpc+server@11.18.0+7524df1edfed9f02/node_modules/@trpc/server/dist/tracked-DWInO6EQ.mjs
var defaultFormatter = ({ shape }) => {
	return shape;
};
var import_defineProperty$6 = __toESM$1(require_defineProperty$1(), 1);
var UnknownCauseError = class extends Error {
	constructor(cause) {
		super(getMessage(cause));
		Object.assign(this, cause);
	}
};
function getMessage(cause) {
	if ("message" in cause) return String(cause.message);
}
function getCauseFromUnknown(cause) {
	if (cause instanceof Error) return cause;
	const type = typeof cause;
	if (type === "undefined" || type === "function" || cause === null) return void 0;
	if (type !== "object") return new Error(String(cause));
	if (isObject(cause)) return new UnknownCauseError(cause);
}
function getTRPCErrorFromUnknown(cause) {
	if (cause instanceof TRPCError) return cause;
	if (cause instanceof Error && cause.name === "TRPCError") return cause;
	const trpcError = new TRPCError({
		code: "INTERNAL_SERVER_ERROR",
		cause
	});
	if (cause instanceof Error && cause.stack) trpcError.stack = cause.stack;
	return trpcError;
}
var TRPCError = class extends Error {
	constructor(opts) {
		var _ref, _opts$message, _this$cause;
		const cause = getCauseFromUnknown(opts.cause);
		const message = (_ref = (_opts$message = opts.message) !== null && _opts$message !== void 0 ? _opts$message : cause === null || cause === void 0 ? void 0 : cause.message) !== null && _ref !== void 0 ? _ref : opts.code;
		super(message, { cause });
		(0, import_defineProperty$6.default)(this, "cause", void 0);
		(0, import_defineProperty$6.default)(this, "code", void 0);
		this.code = opts.code;
		this.name = "TRPCError";
		(_this$cause = this.cause) !== null && _this$cause !== void 0 || (this.cause = cause);
	}
};
var import_objectSpread2$1$9 = __toESM$1(require_objectSpread2$1(), 1);
/**
* @internal
*/
function getDataTransformer(transformer) {
	if ("input" in transformer) return transformer;
	return {
		input: transformer,
		output: transformer
	};
}
/**
* @internal
*/
var defaultTransformer = {
	input: {
		serialize: (obj) => obj,
		deserialize: (obj) => obj
	},
	output: {
		serialize: (obj) => obj,
		deserialize: (obj) => obj
	}
};
function transformTRPCResponseItem(config, item) {
	if ("error" in item) return (0, import_objectSpread2$1$9.default)((0, import_objectSpread2$1$9.default)({}, item), {}, { error: config.transformer.output.serialize(item.error) });
	if ("data" in item.result) return (0, import_objectSpread2$1$9.default)((0, import_objectSpread2$1$9.default)({}, item), {}, { result: (0, import_objectSpread2$1$9.default)((0, import_objectSpread2$1$9.default)({}, item.result), {}, { data: config.transformer.output.serialize(item.result.data) }) });
	return item;
}
/**
* Takes a unserialized `TRPCResponse` and serializes it with the router's transformers
**/
function transformTRPCResponse(config, itemOrItems) {
	return Array.isArray(itemOrItems) ? itemOrItems.map((item) => transformTRPCResponseItem(config, item)) : transformTRPCResponseItem(config, itemOrItems);
}
/** @internal */
function transformResultInner(response, transformer) {
	if ("error" in response) {
		const error = transformer.deserialize(response.error);
		return {
			ok: false,
			error: (0, import_objectSpread2$1$9.default)((0, import_objectSpread2$1$9.default)({}, response), {}, { error })
		};
	}
	return {
		ok: true,
		result: (0, import_objectSpread2$1$9.default)((0, import_objectSpread2$1$9.default)({}, response.result), (!response.result.type || response.result.type === "data") && {
			type: "data",
			data: transformer.deserialize(response.result.data)
		})
	};
}
var TransformResultError = class extends Error {
	constructor() {
		super("Unable to transform response from server");
	}
};
/**
* Transforms and validates that the result is a valid TRPCResponse
* @internal
*/
function transformResult(response, transformer) {
	let result;
	try {
		result = transformResultInner(response, transformer);
	} catch (_unused) {
		throw new TransformResultError();
	}
	if (!result.ok && (!isObject(result.error.error) || typeof result.error.error["code"] !== "number")) throw new TransformResultError();
	if (result.ok && !isObject(result.result)) throw new TransformResultError();
	return result;
}
var import_objectSpread2$13 = __toESM$1(require_objectSpread2$1(), 1);
/**
* @internal
*/
var lazyMarker = "lazyMarker";
function once(fn) {
	const uncalled = Symbol();
	let result = uncalled;
	return () => {
		if (result === uncalled) result = fn();
		return result;
	};
}
function isLazy(input) {
	return typeof input === "function" && lazyMarker in input;
}
function isRouter(value) {
	return isObject(value) && isObject(value["_def"]) && "router" in value["_def"];
}
var emptyRouter = {
	_ctx: null,
	_errorShape: null,
	_meta: null,
	queries: {},
	mutations: {},
	subscriptions: {},
	errorFormatter: defaultFormatter,
	transformer: defaultTransformer
};
/**
* Reserved words that can't be used as router or procedure names
*/
var reservedWords = [
	"then",
	"call",
	"apply"
];
/**
* @internal
*/
function createRouterFactory(config) {
	function createRouterInner(input) {
		const reservedWordsUsed = new Set(Object.keys(input).filter((v) => reservedWords.includes(v)));
		if (reservedWordsUsed.size > 0) throw new Error("Reserved words used in `router({})` call: " + Array.from(reservedWordsUsed).join(", "));
		const procedures = emptyObject();
		const lazy$1 = emptyObject();
		function createLazyLoader(opts) {
			return {
				ref: opts.ref,
				load: once(async () => {
					const router$1 = await opts.ref();
					const lazyPath = [...opts.path, opts.key];
					const lazyKey = lazyPath.join(".");
					opts.aggregate[opts.key] = step(router$1._def.record, lazyPath);
					delete lazy$1[lazyKey];
					for (const [nestedKey, nestedItem] of Object.entries(router$1._def.lazy)) {
						const nestedRouterKey = [...lazyPath, nestedKey].join(".");
						lazy$1[nestedRouterKey] = createLazyLoader({
							ref: nestedItem.ref,
							path: lazyPath,
							key: nestedKey,
							aggregate: opts.aggregate[opts.key]
						});
					}
				})
			};
		}
		function step(from, path = []) {
			const aggregate = emptyObject();
			for (const [key, item] of Object.entries(from !== null && from !== void 0 ? from : {})) {
				if (isLazy(item)) {
					lazy$1[[...path, key].join(".")] = createLazyLoader({
						path,
						ref: item,
						key,
						aggregate
					});
					continue;
				}
				if (isRouter(item)) {
					aggregate[key] = step(item._def.record, [...path, key]);
					continue;
				}
				if (!isProcedure(item)) {
					aggregate[key] = step(item, [...path, key]);
					continue;
				}
				const newPath = [...path, key].join(".");
				if (procedures[newPath]) throw new Error(`Duplicate key: ${newPath}`);
				procedures[newPath] = item;
				aggregate[key] = item;
			}
			return aggregate;
		}
		const record = step(input);
		const _def = (0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({
			_config: config,
			router: true,
			procedures,
			lazy: lazy$1
		}, emptyRouter), {}, { record });
		return (0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, record), {}, {
			_def,
			createCaller: createCallerFactory()({ _def })
		});
	}
	return createRouterInner;
}
function isProcedure(procedureOrRouter) {
	return typeof procedureOrRouter === "function";
}
/**
* @internal
*/
async function getProcedureAtPath(router, path) {
	const { _def } = router;
	let procedure = _def.procedures[path];
	while (!procedure) {
		const key = Object.keys(_def.lazy).find((key$1) => path.startsWith(key$1));
		if (!key) return null;
		await _def.lazy[key].load();
		procedure = _def.procedures[path];
	}
	return procedure;
}
/**
* @internal
*/
async function callProcedure(opts) {
	const { type, path } = opts;
	const proc = await getProcedureAtPath(opts.router, path);
	if (!proc || !isProcedure(proc) || proc._def.type !== type && !opts.allowMethodOverride) throw new TRPCError({
		code: "NOT_FOUND",
		message: `No "${type}"-procedure on path "${path}"`
	});
	/* istanbul ignore if -- @preserve */
	if (proc._def.type !== type && opts.allowMethodOverride && proc._def.type === "subscription") throw new TRPCError({
		code: "METHOD_NOT_SUPPORTED",
		message: `Method override is not supported for subscriptions`
	});
	return proc(opts);
}
function createCallerFactory() {
	return function createCallerInner(router) {
		const { _def } = router;
		return function createCaller(ctxOrCallback, opts) {
			return createRecursiveProxy(async (innerOpts) => {
				const { path, args } = innerOpts;
				const fullPath = path.join(".");
				if (path.length === 1 && path[0] === "_def") return _def;
				const procedure = await getProcedureAtPath(router, fullPath);
				let ctx = void 0;
				try {
					if (!procedure) throw new TRPCError({
						code: "NOT_FOUND",
						message: `No procedure found on path "${path}"`
					});
					ctx = isFunction$1(ctxOrCallback) ? await Promise.resolve(ctxOrCallback()) : ctxOrCallback;
					return await procedure({
						path: fullPath,
						getRawInput: async () => args[0],
						ctx,
						type: procedure._def.type,
						signal: opts === null || opts === void 0 ? void 0 : opts.signal,
						batchIndex: 0
					});
				} catch (cause) {
					var _opts$onError, _procedure$_def$type;
					opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
						ctx,
						error: getTRPCErrorFromUnknown(cause),
						input: args[0],
						path: fullPath,
						type: (_procedure$_def$type = procedure === null || procedure === void 0 ? void 0 : procedure._def.type) !== null && _procedure$_def$type !== void 0 ? _procedure$_def$type : "unknown"
					});
					throw cause;
				}
			});
		};
	};
}
function mergeRouters(...routerList) {
	var _routerList$, _routerList$2;
	const record = mergeWithoutOverrides({}, ...routerList.map((r) => r._def.record));
	return createRouterFactory({
		errorFormatter: routerList.reduce((currentErrorFormatter, nextRouter) => {
			if (nextRouter._def._config.errorFormatter && nextRouter._def._config.errorFormatter !== defaultFormatter) {
				if (currentErrorFormatter !== defaultFormatter && currentErrorFormatter !== nextRouter._def._config.errorFormatter) throw new Error("You seem to have several error formatters");
				return nextRouter._def._config.errorFormatter;
			}
			return currentErrorFormatter;
		}, defaultFormatter),
		transformer: routerList.reduce((prev, current) => {
			if (current._def._config.transformer && current._def._config.transformer !== defaultTransformer) {
				if (prev !== defaultTransformer && prev !== current._def._config.transformer) throw new Error("You seem to have several transformers");
				return current._def._config.transformer;
			}
			return prev;
		}, defaultTransformer),
		isDev: routerList.every((r) => r._def._config.isDev),
		allowOutsideOfServer: routerList.every((r) => r._def._config.allowOutsideOfServer),
		isServer: routerList.every((r) => r._def._config.isServer),
		$types: (_routerList$ = routerList[0]) === null || _routerList$ === void 0 ? void 0 : _routerList$._def._config.$types,
		sse: (_routerList$2 = routerList[0]) === null || _routerList$2 === void 0 ? void 0 : _routerList$2._def._config.sse
	})(record);
}
var trackedSymbol = Symbol();
function isTrackedEnvelope(value) {
	return Array.isArray(value) && value[2] === trackedSymbol;
}
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/TRPCClientError-apv8gw59.mjs
var import_defineProperty$5 = __toESM$2(require_defineProperty$2(), 1);
var import_objectSpread2$12 = __toESM$2(require_objectSpread2$2(), 1);
function isTRPCClientError(cause) {
	return cause instanceof TRPCClientError;
}
function isTRPCErrorResponse(obj) {
	return isObject(obj) && isObject(obj["error"]) && typeof obj["error"]["code"] === "number" && typeof obj["error"]["message"] === "string";
}
function getMessageFromUnknownError(err, fallback) {
	if (typeof err === "string") return err;
	if (isObject(err) && typeof err["message"] === "string") return err["message"];
	return fallback;
}
var TRPCClientError = class TRPCClientError extends Error {
	constructor(message, opts) {
		var _opts$result, _opts$result2;
		const cause = opts === null || opts === void 0 ? void 0 : opts.cause;
		super(message, { cause });
		(0, import_defineProperty$5.default)(this, "cause", void 0);
		(0, import_defineProperty$5.default)(this, "shape", void 0);
		(0, import_defineProperty$5.default)(this, "data", void 0);
		(0, import_defineProperty$5.default)(this, "meta", void 0);
		this.meta = opts === null || opts === void 0 ? void 0 : opts.meta;
		this.cause = cause;
		this.shape = opts === null || opts === void 0 || (_opts$result = opts.result) === null || _opts$result === void 0 ? void 0 : _opts$result.error;
		this.data = opts === null || opts === void 0 || (_opts$result2 = opts.result) === null || _opts$result2 === void 0 ? void 0 : _opts$result2.error.data;
		this.name = "TRPCClientError";
		Object.setPrototypeOf(this, TRPCClientError.prototype);
	}
	static from(_cause, opts = {}) {
		const cause = _cause;
		if (isTRPCClientError(cause)) {
			if (opts.meta) cause.meta = (0, import_objectSpread2$12.default)((0, import_objectSpread2$12.default)({}, cause.meta), opts.meta);
			return cause;
		}
		if (isTRPCErrorResponse(cause)) return new TRPCClientError(cause.error.message, (0, import_objectSpread2$12.default)((0, import_objectSpread2$12.default)({}, opts), {}, {
			result: cause,
			cause: opts.cause
		}));
		return new TRPCClientError(getMessageFromUnknownError(cause, "Unknown error"), (0, import_objectSpread2$12.default)((0, import_objectSpread2$12.default)({}, opts), {}, { cause }));
	}
};
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/unstable-internals-Bg7n9BBj.mjs
/**
* @internal
*/
/**
* @internal
*/
function getTransformer(transformer) {
	const _transformer = transformer;
	if (!_transformer) return {
		input: {
			serialize: (data) => data,
			deserialize: (data) => data
		},
		output: {
			serialize: (data) => data,
			deserialize: (data) => data
		}
	};
	if ("input" in _transformer) return _transformer;
	return {
		input: _transformer,
		output: _transformer
	};
}
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/httpUtils-BNq9QC3d.mjs
var isFunction = (fn) => typeof fn === "function";
function getFetch(customFetchImpl) {
	if (customFetchImpl) return customFetchImpl;
	if (typeof window !== "undefined" && isFunction(window.fetch)) return window.fetch;
	if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) return globalThis.fetch;
	throw new Error("No fetch implementation found");
}
var import_objectSpread2$11 = __toESM$2(require_objectSpread2$2());
function resolveHTTPLinkOptions(opts) {
	return {
		url: opts.url.toString(),
		fetch: opts.fetch,
		transformer: getTransformer(opts.transformer),
		methodOverride: opts.methodOverride
	};
}
function arrayToDict(array) {
	const dict = {};
	for (let index = 0; index < array.length; index++) dict[index] = array[index];
	return dict;
}
var METHOD = {
	query: "GET",
	mutation: "POST",
	subscription: "PATCH"
};
function getInput(opts) {
	return "input" in opts ? opts.transformer.input.serialize(opts.input) : arrayToDict(opts.inputs.map((_input) => opts.transformer.input.serialize(_input)));
}
var getUrl = (opts) => {
	const parts = opts.url.split("?");
	let url = parts[0].replace(/\/$/, "") + "/" + opts.path;
	const queryParts = [];
	if (parts[1]) queryParts.push(parts[1]);
	if ("inputs" in opts) queryParts.push("batch=1");
	if (opts.type === "query" || opts.type === "subscription") {
		const input = getInput(opts);
		if (input !== void 0 && opts.methodOverride !== "POST") queryParts.push(`input=${encodeURIComponent(JSON.stringify(input))}`);
	}
	if (queryParts.length) url += "?" + queryParts.join("&");
	return url;
};
var getBody = (opts) => {
	if (opts.type === "query" && opts.methodOverride !== "POST") return void 0;
	const input = getInput(opts);
	return input !== void 0 ? JSON.stringify(input) : void 0;
};
var jsonHttpRequester = (opts) => {
	return httpRequest((0, import_objectSpread2$11.default)((0, import_objectSpread2$11.default)({}, opts), {}, {
		contentTypeHeader: "application/json",
		getUrl,
		getBody
	}));
};
/**
* Polyfill for DOMException with AbortError name
*/
var AbortError = class extends Error {
	constructor() {
		const name = "AbortError";
		super(name);
		this.name = name;
		this.message = name;
	}
};
/**
* Polyfill for `signal.throwIfAborted()`
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted
*/
var throwIfAborted = (signal) => {
	var _signal$throwIfAborte;
	if (!(signal === null || signal === void 0 ? void 0 : signal.aborted)) return;
	(_signal$throwIfAborte = signal.throwIfAborted) === null || _signal$throwIfAborte === void 0 || _signal$throwIfAborte.call(signal);
	if (typeof DOMException !== "undefined") throw new DOMException("AbortError", "AbortError");
	throw new AbortError();
};
async function fetchHTTPResponse(opts) {
	var _opts$methodOverride, _opts$trpcAcceptHeade;
	throwIfAborted(opts.signal);
	const url = opts.getUrl(opts);
	const body = opts.getBody(opts);
	const method = (_opts$methodOverride = opts.methodOverride) !== null && _opts$methodOverride !== void 0 ? _opts$methodOverride : METHOD[opts.type];
	const resolvedHeaders = await (async () => {
		const heads = await opts.headers();
		if (Symbol.iterator in heads) return Object.fromEntries(heads);
		return heads;
	})();
	const headers = (0, import_objectSpread2$11.default)((0, import_objectSpread2$11.default)((0, import_objectSpread2$11.default)({}, opts.contentTypeHeader && method !== "GET" ? { "content-type": opts.contentTypeHeader } : {}), opts.trpcAcceptHeader ? { [(_opts$trpcAcceptHeade = opts.trpcAcceptHeaderKey) !== null && _opts$trpcAcceptHeade !== void 0 ? _opts$trpcAcceptHeade : "trpc-accept"]: opts.trpcAcceptHeader } : void 0), resolvedHeaders);
	return getFetch(opts.fetch)(url, {
		method,
		signal: opts.signal,
		body,
		headers
	});
}
async function httpRequest(opts) {
	const meta = {};
	const res = await fetchHTTPResponse(opts);
	meta.response = res;
	const json = await res.json();
	meta.responseJSON = json;
	return {
		json,
		meta
	};
}
__toESM$2(require_objectSpread2$2(), 1);
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/httpBatchLink-CaWjh1oW.mjs
/**
* A function that should never be called unless we messed something up.
*/
var throwFatalError = () => {
	throw new Error("Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new");
};
/**
* Dataloader that's very inspired by https://github.com/graphql/dataloader
* Less configuration, no caching, and allows you to cancel requests
* When cancelling a single fetch the whole batch will be cancelled only when _all_ items are cancelled
*/
function dataLoader(batchLoader) {
	let pendingItems = null;
	let dispatchTimer = null;
	const destroyTimerAndPendingItems = () => {
		clearTimeout(dispatchTimer);
		dispatchTimer = null;
		pendingItems = null;
	};
	/**
	* Iterate through the items and split them into groups based on the `batchLoader`'s validate function
	*/
	function groupItems(items) {
		const groupedItems = [[]];
		let index = 0;
		while (true) {
			const item = items[index];
			if (!item) break;
			const lastGroup = groupedItems[groupedItems.length - 1];
			if (item.aborted) {
				var _item$reject;
				(_item$reject = item.reject) === null || _item$reject === void 0 || _item$reject.call(item, /* @__PURE__ */ new Error("Aborted"));
				index++;
				continue;
			}
			if (batchLoader.validate(lastGroup.concat(item).map((it) => it.key))) {
				lastGroup.push(item);
				index++;
				continue;
			}
			if (lastGroup.length === 0) {
				var _item$reject2;
				(_item$reject2 = item.reject) === null || _item$reject2 === void 0 || _item$reject2.call(item, /* @__PURE__ */ new Error("Input is too big for a single dispatch"));
				index++;
				continue;
			}
			groupedItems.push([]);
		}
		return groupedItems;
	}
	function dispatch() {
		const groupedItems = groupItems(pendingItems);
		destroyTimerAndPendingItems();
		for (const items of groupedItems) {
			if (!items.length) continue;
			const batch = { items };
			for (const item of items) item.batch = batch;
			batchLoader.fetch(batch.items.map((_item) => _item.key)).then(async (result) => {
				await Promise.all(result.map(async (valueOrPromise, index) => {
					const item = batch.items[index];
					try {
						var _item$resolve;
						const value = await Promise.resolve(valueOrPromise);
						(_item$resolve = item.resolve) === null || _item$resolve === void 0 || _item$resolve.call(item, value);
					} catch (cause) {
						var _item$reject3;
						(_item$reject3 = item.reject) === null || _item$reject3 === void 0 || _item$reject3.call(item, cause);
					}
					item.batch = null;
					item.reject = null;
					item.resolve = null;
				}));
				for (const item of batch.items) {
					var _item$reject4;
					(_item$reject4 = item.reject) === null || _item$reject4 === void 0 || _item$reject4.call(item, /* @__PURE__ */ new Error("Missing result"));
					item.batch = null;
				}
			}).catch((cause) => {
				for (const item of batch.items) {
					var _item$reject5;
					(_item$reject5 = item.reject) === null || _item$reject5 === void 0 || _item$reject5.call(item, cause);
					item.batch = null;
				}
			});
		}
	}
	function load(key) {
		var _dispatchTimer;
		const item = {
			aborted: false,
			key,
			batch: null,
			resolve: throwFatalError,
			reject: throwFatalError
		};
		const promise = new Promise((resolve, reject) => {
			var _pendingItems;
			item.reject = reject;
			item.resolve = resolve;
			(_pendingItems = pendingItems) !== null && _pendingItems !== void 0 || (pendingItems = []);
			pendingItems.push(item);
		});
		(_dispatchTimer = dispatchTimer) !== null && _dispatchTimer !== void 0 || (dispatchTimer = setTimeout(dispatch));
		return promise;
	}
	return { load };
}
/**
* Like `Promise.all()` but for abort signals
* - When all signals have been aborted, the merged signal will be aborted
* - If one signal is `null`, no signal will be aborted
*/
function allAbortSignals(...signals) {
	const ac = new AbortController();
	const count = signals.length;
	let abortedCount = 0;
	const onAbort = () => {
		if (++abortedCount === count) ac.abort();
	};
	for (const signal of signals) if (signal === null || signal === void 0 ? void 0 : signal.aborted) onAbort();
	else signal === null || signal === void 0 || signal.addEventListener("abort", onAbort, { once: true });
	return ac.signal;
}
var import_objectSpread2$9 = __toESM$2(require_objectSpread2$2(), 1);
/**
* @see https://trpc.io/docs/client/links/httpBatchLink
*/
function httpBatchLink(opts) {
	var _opts$maxURLLength, _opts$maxItems;
	const resolvedOpts = resolveHTTPLinkOptions(opts);
	const maxURLLength = (_opts$maxURLLength = opts.maxURLLength) !== null && _opts$maxURLLength !== void 0 ? _opts$maxURLLength : Infinity;
	const maxItems = (_opts$maxItems = opts.maxItems) !== null && _opts$maxItems !== void 0 ? _opts$maxItems : Infinity;
	return () => {
		const batchLoader = (type) => {
			return {
				validate(batchOps) {
					if (maxURLLength === Infinity && maxItems === Infinity) return true;
					if (batchOps.length > maxItems) return false;
					const path = batchOps.map((op) => op.path).join(",");
					const inputs = batchOps.map((op) => op.input);
					return getUrl((0, import_objectSpread2$9.default)((0, import_objectSpread2$9.default)({}, resolvedOpts), {}, {
						type,
						path,
						inputs,
						signal: null
					})).length <= maxURLLength;
				},
				async fetch(batchOps) {
					const path = batchOps.map((op) => op.path).join(",");
					const inputs = batchOps.map((op) => op.input);
					const signal = allAbortSignals(...batchOps.map((op) => op.signal));
					const res = await jsonHttpRequester((0, import_objectSpread2$9.default)((0, import_objectSpread2$9.default)({}, resolvedOpts), {}, {
						path,
						inputs,
						type,
						headers() {
							if (!opts.headers) return {};
							if (typeof opts.headers === "function") return opts.headers({ opList: batchOps });
							return opts.headers;
						},
						signal
					}));
					return (Array.isArray(res.json) ? res.json : batchOps.map(() => res.json)).map((item) => ({
						meta: res.meta,
						json: item
					}));
				}
			};
		};
		const loaders = {
			query: dataLoader(batchLoader("query")),
			mutation: dataLoader(batchLoader("mutation"))
		};
		return ({ op }) => {
			return observable((observer) => {
				/* istanbul ignore if -- @preserve */
				if (op.type === "subscription") throw new Error("Subscriptions are unsupported by `httpLink` - use `httpSubscriptionLink` or `wsLink`");
				const promise = loaders[op.type].load(op);
				let _res = void 0;
				promise.then((res) => {
					_res = res;
					const transformed = transformResult(res.json, resolvedOpts.transformer.output);
					if (!transformed.ok) {
						observer.error(TRPCClientError.from(transformed.error, { meta: res.meta }));
						return;
					}
					observer.next({
						context: res.meta,
						result: transformed.result
					});
					observer.complete();
				}).catch((err) => {
					observer.error(TRPCClientError.from(err, { meta: _res === null || _res === void 0 ? void 0 : _res.meta }));
				});
				return () => {};
			});
		};
	};
}
__toESM$2(require_objectSpread2$2(), 1);
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/wsLink-DSf4KOdW.mjs
/**
* Get the result of a value or function that returns a value
* It also optionally accepts typesafe arguments for the function
*/
var resultOf = (value, ...args) => {
	return typeof value === "function" ? value(...args) : value;
};
__toESM$2(require_defineProperty$2(), 1);
function withResolvers() {
	let resolve;
	let reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
/**
* Resolves a WebSocket URL and optionally appends connection parameters.
*
* If connectionParams are provided, appends 'connectionParams=1' query parameter.
*/
async function prepareUrl(urlOptions) {
	const url = await resultOf(urlOptions.url);
	if (!urlOptions.connectionParams) return url;
	return url + `${url.includes("?") ? "&" : "?"}connectionParams=1`;
}
async function buildConnectionMessage(connectionParams, encoder) {
	const message = {
		method: "connectionParams",
		data: await resultOf(connectionParams)
	};
	return encoder.encode(message);
}
__toESM$2(require_defineProperty$2(), 1);
var import_defineProperty$1 = __toESM$2(require_defineProperty$2(), 1);
/**
* Opens a WebSocket connection asynchronously and returns a promise
* that resolves when the connection is successfully established.
* The promise rejects if an error occurs during the connection attempt.
*/
function asyncWsOpen(ws) {
	const { promise, resolve, reject } = withResolvers();
	ws.addEventListener("open", () => {
		ws.removeEventListener("error", reject);
		resolve();
	});
	ws.addEventListener("error", reject);
	return promise;
}
/**
* Sets up a periodic ping-pong mechanism to keep the WebSocket connection alive.
*
* - Sends "PING" messages at regular intervals defined by `intervalMs`.
* - If a "PONG" response is not received within the `pongTimeoutMs`, the WebSocket is closed.
* - The ping timer resets upon receiving any message to maintain activity.
* - Automatically starts the ping process when the WebSocket connection is opened.
* - Cleans up timers when the WebSocket is closed.
*
* @param ws - The WebSocket instance to manage.
* @param options - Configuration options for ping-pong intervals and timeouts.
*/
function setupPingInterval(ws, { intervalMs, pongTimeoutMs }) {
	let pingTimeout;
	let pongTimeout;
	function start() {
		pingTimeout = setTimeout(() => {
			ws.send("PING");
			pongTimeout = setTimeout(() => {
				ws.close();
			}, pongTimeoutMs);
		}, intervalMs);
	}
	function reset() {
		clearTimeout(pingTimeout);
		start();
	}
	function pong() {
		clearTimeout(pongTimeout);
		reset();
	}
	ws.addEventListener("open", start);
	ws.addEventListener("message", ({ data }) => {
		clearTimeout(pingTimeout);
		start();
		if (data === "PONG") pong();
	});
	ws.addEventListener("close", () => {
		clearTimeout(pingTimeout);
		clearTimeout(pongTimeout);
	});
}
/**
* Manages a WebSocket connection with support for reconnection, keep-alive mechanisms,
* and observable state tracking.
*/
var WsConnection = class WsConnection {
	constructor(opts) {
		var _opts$WebSocketPonyfi;
		(0, import_defineProperty$1.default)(this, "id", ++WsConnection.connectCount);
		(0, import_defineProperty$1.default)(this, "WebSocketPonyfill", void 0);
		(0, import_defineProperty$1.default)(this, "urlOptions", void 0);
		(0, import_defineProperty$1.default)(this, "keepAliveOpts", void 0);
		(0, import_defineProperty$1.default)(this, "encoder", void 0);
		(0, import_defineProperty$1.default)(this, "wsObservable", behaviorSubject(null));
		(0, import_defineProperty$1.default)(this, "openPromise", null);
		this.WebSocketPonyfill = (_opts$WebSocketPonyfi = opts.WebSocketPonyfill) !== null && _opts$WebSocketPonyfi !== void 0 ? _opts$WebSocketPonyfi : WebSocket;
		if (!this.WebSocketPonyfill) throw new Error("No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill");
		this.urlOptions = opts.urlOptions;
		this.keepAliveOpts = opts.keepAlive;
		this.encoder = opts.encoder;
	}
	get ws() {
		return this.wsObservable.get();
	}
	set ws(ws) {
		this.wsObservable.next(ws);
	}
	/**
	* Checks if the WebSocket connection is open and ready to communicate.
	*/
	isOpen() {
		return !!this.ws && this.ws.readyState === this.WebSocketPonyfill.OPEN && !this.openPromise;
	}
	/**
	* Checks if the WebSocket connection is closed or in the process of closing.
	*/
	isClosed() {
		return !!this.ws && (this.ws.readyState === this.WebSocketPonyfill.CLOSING || this.ws.readyState === this.WebSocketPonyfill.CLOSED);
	}
	async open() {
		var _this = this;
		if (_this.openPromise) return _this.openPromise;
		_this.id = ++WsConnection.connectCount;
		_this.openPromise = prepareUrl(_this.urlOptions).then((url) => new _this.WebSocketPonyfill(url)).then(async (ws) => {
			_this.ws = ws;
			ws.binaryType = "arraybuffer";
			ws.addEventListener("message", function({ data }) {
				if (data === "PING") this.send("PONG");
			});
			if (_this.keepAliveOpts.enabled) setupPingInterval(ws, _this.keepAliveOpts);
			ws.addEventListener("close", () => {
				if (_this.ws === ws) _this.ws = null;
			});
			await asyncWsOpen(ws);
			if (_this.urlOptions.connectionParams) ws.send(await buildConnectionMessage(_this.urlOptions.connectionParams, _this.encoder));
		});
		try {
			await _this.openPromise;
		} finally {
			_this.openPromise = null;
		}
	}
	/**
	* Closes the WebSocket connection gracefully.
	* Waits for any ongoing open operation to complete before closing.
	*/
	async close() {
		var _this2 = this;
		try {
			await _this2.openPromise;
		} finally {
			var _this$ws;
			(_this$ws = _this2.ws) === null || _this$ws === void 0 || _this$ws.close();
		}
	}
};
(0, import_defineProperty$1.default)(WsConnection, "connectCount", 0);
__toESM$2(require_defineProperty$2(), 1);
__toESM$2(require_objectSpread2$2(), 1);
//#endregion
//#region node_modules/.bun/@trpc+client@11.18.0+acc6907a906fa511/node_modules/@trpc/client/dist/index.mjs
var import_defineProperty = __toESM$2(require_defineProperty$2(), 1);
var import_objectSpread2$4$1 = __toESM$2(require_objectSpread2$2(), 1);
var TRPCUntypedClient = class {
	constructor(opts) {
		(0, import_defineProperty.default)(this, "links", void 0);
		(0, import_defineProperty.default)(this, "runtime", void 0);
		(0, import_defineProperty.default)(this, "requestId", void 0);
		this.requestId = 0;
		this.runtime = {};
		this.links = opts.links.map((link) => link(this.runtime));
	}
	$request(opts) {
		var _opts$context;
		return createChain({
			links: this.links,
			op: (0, import_objectSpread2$4$1.default)((0, import_objectSpread2$4$1.default)({}, opts), {}, {
				context: (_opts$context = opts.context) !== null && _opts$context !== void 0 ? _opts$context : {},
				id: ++this.requestId
			})
		}).pipe(share());
	}
	async requestAsPromise(opts) {
		var _this = this;
		try {
			return (await observableToPromise(_this.$request(opts))).result.data;
		} catch (err) {
			throw TRPCClientError.from(err);
		}
	}
	query(path, input, opts) {
		return this.requestAsPromise({
			type: "query",
			path,
			input,
			context: opts === null || opts === void 0 ? void 0 : opts.context,
			signal: opts === null || opts === void 0 ? void 0 : opts.signal
		});
	}
	mutation(path, input, opts) {
		return this.requestAsPromise({
			type: "mutation",
			path,
			input,
			context: opts === null || opts === void 0 ? void 0 : opts.context,
			signal: opts === null || opts === void 0 ? void 0 : opts.signal
		});
	}
	subscription(path, input, opts) {
		return this.$request({
			type: "subscription",
			path,
			input,
			context: opts.context,
			signal: opts.signal
		}).subscribe({
			next(envelope) {
				switch (envelope.result.type) {
					case "state":
						var _opts$onConnectionSta;
						(_opts$onConnectionSta = opts.onConnectionStateChange) === null || _opts$onConnectionSta === void 0 || _opts$onConnectionSta.call(opts, envelope.result);
						break;
					case "started":
						var _opts$onStarted;
						(_opts$onStarted = opts.onStarted) === null || _opts$onStarted === void 0 || _opts$onStarted.call(opts, { context: envelope.context });
						break;
					case "stopped":
						var _opts$onStopped;
						(_opts$onStopped = opts.onStopped) === null || _opts$onStopped === void 0 || _opts$onStopped.call(opts);
						break;
					case "data":
					case void 0:
						var _opts$onData;
						(_opts$onData = opts.onData) === null || _opts$onData === void 0 || _opts$onData.call(opts, envelope.result.data);
						break;
				}
			},
			error(err) {
				var _opts$onError;
				(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, err);
			},
			complete() {
				var _opts$onComplete;
				(_opts$onComplete = opts.onComplete) === null || _opts$onComplete === void 0 || _opts$onComplete.call(opts);
			}
		});
	}
};
var untypedClientSymbol = Symbol.for("trpc_untypedClient");
var clientCallTypeMap = {
	query: "query",
	mutate: "mutation",
	subscribe: "subscription"
};
/** @internal */
var clientCallTypeToProcedureType = (clientCallType) => {
	return clientCallTypeMap[clientCallType];
};
/**
* @internal
*/
function createTRPCClientProxy(client) {
	const proxy = createRecursiveProxy(({ path, args }) => {
		const pathCopy = [...path];
		const procedureType = clientCallTypeToProcedureType(pathCopy.pop());
		const fullPath = pathCopy.join(".");
		return client[procedureType](fullPath, ...args);
	});
	return createFlatProxy((key) => {
		if (key === untypedClientSymbol) return client;
		return proxy[key];
	});
}
function createTRPCClient(opts) {
	return createTRPCClientProxy(new TRPCUntypedClient(opts));
}
/**
* Get an untyped client from a proxy client
* @internal
*/
function getUntypedClient(client) {
	return client[untypedClientSymbol];
}
__toESM$2(require_objectSpread2$2(), 1);
__toESM$2(require_objectSpread2$2(), 1);
__toESM$2(__commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(exports, module) {
	function _asyncIterator$1(r) {
		var n, t, o, e = 2;
		for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) {
			if (t && null != (n = r[t])) return n.call(r);
			if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
			t = "@@asyncIterator", o = "@@iterator";
		}
		throw new TypeError("Object is not async iterable");
	}
	function AsyncFromSyncIterator(r) {
		function AsyncFromSyncIteratorContinuation(r$1) {
			if (Object(r$1) !== r$1) return Promise.reject(/* @__PURE__ */ new TypeError(r$1 + " is not an object."));
			var n = r$1.done;
			return Promise.resolve(r$1.value).then(function(r$2) {
				return {
					value: r$2,
					done: n
				};
			});
		}
		return AsyncFromSyncIterator = function AsyncFromSyncIterator$1(r$1) {
			this.s = r$1, this.n = r$1.next;
		}, AsyncFromSyncIterator.prototype = {
			s: null,
			n: null,
			next: function next() {
				return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
			},
			"return": function _return(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.resolve({
					value: r$1,
					done: !0
				}) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			},
			"throw": function _throw(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.reject(r$1) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			}
		}, new AsyncFromSyncIterator(r);
	}
	module.exports = _asyncIterator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} })(), 1);
__toESM$2(require_objectSpread2$2(), 1);
var require_usingCtx = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(exports, module) {
	function _usingCtx() {
		var r = "function" == typeof SuppressedError ? SuppressedError : function(r$1, e$1) {
			var n$1 = Error();
			return n$1.name = "SuppressedError", n$1.error = r$1, n$1.suppressed = e$1, n$1;
		}, e = {}, n = [];
		function using(r$1, e$1) {
			if (null != e$1) {
				if (Object(e$1) !== e$1) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
				if (r$1) var o = e$1[Symbol.asyncDispose || Symbol["for"]("Symbol.asyncDispose")];
				if (void 0 === o && (o = e$1[Symbol.dispose || Symbol["for"]("Symbol.dispose")], r$1)) var t = o;
				if ("function" != typeof o) throw new TypeError("Object is not disposable.");
				t && (o = function o$1() {
					try {
						t.call(e$1);
					} catch (r$2) {
						return Promise.reject(r$2);
					}
				}), n.push({
					v: e$1,
					d: o,
					a: r$1
				});
			} else r$1 && n.push({
				d: e$1,
				a: r$1
			});
			return e$1;
		}
		return {
			e,
			u: using.bind(null, !1),
			a: using.bind(null, !0),
			d: function d() {
				var o, t = this.e, s = 0;
				function next() {
					for (; o = n.pop();) try {
						if (!o.a && 1 === s) return s = 0, n.push(o), Promise.resolve().then(next);
						if (o.d) {
							var r$1 = o.d.call(o.v);
							if (o.a) return s |= 2, Promise.resolve(r$1).then(next, err);
						} else s |= 1;
					} catch (r$2) {
						return err(r$2);
					}
					if (1 === s) return t !== e ? Promise.reject(t) : Promise.resolve();
					if (t !== e) throw t;
				}
				function err(n$1) {
					return t = t !== e ? new r(n$1, t) : n$1, next();
				}
				return next();
			}
		};
	}
	module.exports = _usingCtx, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_OverloadYield = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(exports, module) {
	function _OverloadYield(e, d) {
		this.v = e, this.k = d;
	}
	module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_awaitAsyncGenerator = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(exports, module) {
	var OverloadYield$1 = require_OverloadYield();
	function _awaitAsyncGenerator$1(e) {
		return new OverloadYield$1(e, 0);
	}
	module.exports = _awaitAsyncGenerator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_wrapAsyncGenerator = __commonJS$2({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(exports, module) {
	var OverloadYield = require_OverloadYield();
	function _wrapAsyncGenerator$1(e) {
		return function() {
			return new AsyncGenerator(e.apply(this, arguments));
		};
	}
	function AsyncGenerator(e) {
		var r, t;
		function resume(r$1, t$1) {
			try {
				var n = e[r$1](t$1), o = n.value, u = o instanceof OverloadYield;
				Promise.resolve(u ? o.v : o).then(function(t$2) {
					if (u) {
						var i = "return" === r$1 ? "return" : "next";
						if (!o.k || t$2.done) return resume(i, t$2);
						t$2 = e[i](t$2).value;
					}
					settle(n.done ? "return" : "normal", t$2);
				}, function(e$1) {
					resume("throw", e$1);
				});
			} catch (e$1) {
				settle("throw", e$1);
			}
		}
		function settle(e$1, n) {
			switch (e$1) {
				case "return":
					r.resolve({
						value: n,
						done: !0
					});
					break;
				case "throw":
					r.reject(n);
					break;
				default: r.resolve({
					value: n,
					done: !1
				});
			}
			(r = r.next) ? resume(r.key, r.arg) : t = null;
		}
		this._invoke = function(e$1, n) {
			return new Promise(function(o, u) {
				var i = {
					key: e$1,
					arg: n,
					resolve: o,
					reject: u,
					next: null
				};
				t ? t = t.next = i : (r = t = i, resume(e$1, n));
			});
		}, "function" != typeof e["return"] && (this["return"] = void 0);
	}
	AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
		return this;
	}, AsyncGenerator.prototype.next = function(e) {
		return this._invoke("next", e);
	}, AsyncGenerator.prototype["throw"] = function(e) {
		return this._invoke("throw", e);
	}, AsyncGenerator.prototype["return"] = function(e) {
		return this._invoke("return", e);
	};
	module.exports = _wrapAsyncGenerator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
__toESM$2(require_usingCtx(), 1);
__toESM$2(require_awaitAsyncGenerator(), 1);
__toESM$2(require_wrapAsyncGenerator(), 1);
__toESM$2(require_objectSpread2$2(), 1);
//#endregion
//#region node_modules/.bun/@trpc+tanstack-react-query@11.18.0+a5dd836c16f2373a/node_modules/@trpc/tanstack-react-query/dist/index.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var require_typeof = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports, module) {
	function _typeof$2(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
			return typeof o$1;
		} : function(o$1) {
			return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof$2(o);
	}
	module.exports = _typeof$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPrimitive = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports, module) {
	var _typeof$1 = require_typeof()["default"];
	function toPrimitive$1(t, r) {
		if ("object" != _typeof$1(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof$1(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPropertyKey = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports, module) {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey$1(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_defineProperty = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports, module) {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectSpread2 = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports, module) {
	var defineProperty = require_defineProperty();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
				defineProperty(e, r$1, t[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
				Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
			});
		}
		return e;
	}
	module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_asyncIterator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(exports, module) {
	function _asyncIterator$1(r) {
		var n, t, o, e = 2;
		for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) {
			if (t && null != (n = r[t])) return n.call(r);
			if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
			t = "@@asyncIterator", o = "@@iterator";
		}
		throw new TypeError("Object is not async iterable");
	}
	function AsyncFromSyncIterator(r) {
		function AsyncFromSyncIteratorContinuation(r$1) {
			if (Object(r$1) !== r$1) return Promise.reject(/* @__PURE__ */ new TypeError(r$1 + " is not an object."));
			var n = r$1.done;
			return Promise.resolve(r$1.value).then(function(r$2) {
				return {
					value: r$2,
					done: n
				};
			});
		}
		return AsyncFromSyncIterator = function AsyncFromSyncIterator$1(r$1) {
			this.s = r$1, this.n = r$1.next;
		}, AsyncFromSyncIterator.prototype = {
			s: null,
			n: null,
			next: function next() {
				return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
			},
			"return": function _return(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.resolve({
					value: r$1,
					done: !0
				}) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			},
			"throw": function _throw(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.reject(r$1) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			}
		}, new AsyncFromSyncIterator(r);
	}
	module.exports = _asyncIterator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectWithoutPropertiesLoose = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(exports, module) {
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (e.includes(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectWithoutProperties = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(exports, module) {
	var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
	function _objectWithoutProperties$1(e, t) {
		if (null == e) return {};
		var o, r, i = objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var s = Object.getOwnPropertySymbols(e);
			for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	module.exports = _objectWithoutProperties$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var import_objectSpread2$5 = __toESM(require_objectSpread2(), 1);
var import_asyncIterator = __toESM(require_asyncIterator(), 1);
var import_objectWithoutProperties = __toESM(require_objectWithoutProperties(), 1);
var _excluded = ["cursor", "direction"];
/**
* @internal
*/
function createTRPCOptionsResult(value) {
	return { path: value.path.join(".") };
}
function isPrefixedQueryKey(queryKey) {
	return queryKey.length >= 3;
}
function readQueryKey(queryKey) {
	if (isPrefixedQueryKey(queryKey)) return {
		type: "prefixed",
		prefix: queryKey[0],
		path: queryKey[1],
		args: queryKey[2]
	};
	else return {
		type: "unprefixed",
		prefix: void 0,
		path: queryKey[0],
		args: queryKey[1]
	};
}
/**
* @internal
*/
function getClientArgs(queryKey, opts, infiniteParams) {
	var _queryKeyData$args;
	const queryKeyData = readQueryKey(queryKey);
	let input = (_queryKeyData$args = queryKeyData.args) === null || _queryKeyData$args === void 0 ? void 0 : _queryKeyData$args.input;
	if (infiniteParams) {
		var _queryKeyData$args$in, _queryKeyData$args2;
		input = (0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)({}, (_queryKeyData$args$in = (_queryKeyData$args2 = queryKeyData.args) === null || _queryKeyData$args2 === void 0 ? void 0 : _queryKeyData$args2.input) !== null && _queryKeyData$args$in !== void 0 ? _queryKeyData$args$in : {}), infiniteParams.pageParam !== void 0 ? { cursor: infiniteParams.pageParam } : {}), {}, { direction: infiniteParams.direction });
	}
	return [
		queryKeyData.path.join("."),
		input,
		opts === null || opts === void 0 ? void 0 : opts.trpc
	];
}
/**
* @internal
*/
async function buildQueryFromAsyncIterable(asyncIterable, queryClient, queryKey) {
	const query = queryClient.getQueryCache().build(queryClient, { queryKey });
	query.setState({
		data: [],
		status: "success"
	});
	const aggregate = [];
	var _iteratorAbruptCompletion = false;
	var _didIteratorError = false;
	var _iteratorError;
	try {
		for (var _iterator = (0, import_asyncIterator.default)(asyncIterable), _step; _iteratorAbruptCompletion = !(_step = await _iterator.next()).done; _iteratorAbruptCompletion = false) {
			const value = _step.value;
			aggregate.push(value);
			query.setState({ data: [...aggregate] });
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (_iteratorAbruptCompletion && _iterator.return != null) await _iterator.return();
		} finally {
			if (_didIteratorError) throw _iteratorError;
		}
	}
	return aggregate;
}
/**
* To allow easy interactions with groups of related queries, such as
* invalidating all queries of a router, we use an array as the path when
* storing in tanstack query.
*
* @internal
*/
function getQueryKeyInternal(opts) {
	const key = run(() => {
		const { input, type } = opts;
		const splitPath = opts.path.flatMap((part) => part.split("."));
		if (!input && type === "any") return splitPath.length ? [splitPath] : [];
		if (type === "infinite" && isObject(input) && ("direction" in input || "cursor" in input)) {
			const { cursor: _, direction: __ } = input;
			return [splitPath, {
				input: (0, import_objectWithoutProperties.default)(input, _excluded),
				type: "infinite"
			}];
		}
		return [splitPath, (0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)({}, typeof input !== "undefined" && input !== skipToken && { input }), type && type !== "any" && { type })];
	});
	if (opts.prefix) key.unshift([opts.prefix]);
	return key;
}
/**
* @internal
*/
function getMutationKeyInternal(opts) {
	const key = [opts.path.flatMap((part) => part.split("."))];
	if (opts.prefix) key.unshift([opts.prefix]);
	return key;
}
/**
* @internal
*/
function unwrapLazyArg(valueOrLazy) {
	return isFunction$1(valueOrLazy) ? valueOrLazy() : valueOrLazy;
}
var import_objectSpread2$4 = __toESM(require_objectSpread2());
function trpcInfiniteQueryOptions(args) {
	var _opts$initialCursor;
	const { input, query, path, queryKey, opts } = args;
	const inputIsSkipToken = input === skipToken;
	const queryFn = async (queryFnContext) => {
		var _opts$trpc;
		const actualOpts = (0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts), {}, { trpc: (0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts === null || opts === void 0 ? void 0 : opts.trpc), (opts === null || opts === void 0 || (_opts$trpc = opts.trpc) === null || _opts$trpc === void 0 ? void 0 : _opts$trpc.abortOnUnmount) ? { signal: queryFnContext.signal } : { signal: null }) });
		return await query(...getClientArgs(queryKey, actualOpts, {
			direction: queryFnContext.direction,
			pageParam: queryFnContext.pageParam
		}));
	};
	return Object.assign(infiniteQueryOptions((0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts !== null && opts !== void 0 ? opts : {}), {}, {
		queryKey,
		queryFn: inputIsSkipToken ? skipToken : queryFn,
		initialPageParam: (_opts$initialCursor = opts === null || opts === void 0 ? void 0 : opts.initialCursor) !== null && _opts$initialCursor !== void 0 ? _opts$initialCursor : input === null || input === void 0 ? void 0 : input.cursor
	})), { trpc: createTRPCOptionsResult({ path }) });
}
var import_objectSpread2$3 = __toESM(require_objectSpread2());
/**
* @internal
*/
function trpcMutationOptions(args) {
	var _opts$keyPrefix, _overrides$onSuccess;
	const { mutate, path, prefix, opts, overrides } = args;
	const queryClient = unwrapLazyArg(args.queryClient);
	const mutationKey = getMutationKeyInternal({
		path,
		prefix: (_opts$keyPrefix = opts === null || opts === void 0 ? void 0 : opts.keyPrefix) !== null && _opts$keyPrefix !== void 0 ? _opts$keyPrefix : prefix
	});
	const defaultOpts = queryClient.defaultMutationOptions(queryClient.getMutationDefaults(mutationKey));
	const mutationSuccessOverride = (_overrides$onSuccess = overrides === null || overrides === void 0 ? void 0 : overrides.onSuccess) !== null && _overrides$onSuccess !== void 0 ? _overrides$onSuccess : (options) => options.originalFn();
	const mutationFn = async (input) => {
		return await mutate(...getClientArgs([...mutationKey, { input }], opts));
	};
	return (0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({}, opts), {}, {
		mutationKey,
		mutationFn,
		onSuccess(...args$1) {
			var _ref, _opts$meta;
			const originalFn = () => {
				var _opts$onSuccess, _opts$onSuccess2, _defaultOpts$onSucces;
				return (_opts$onSuccess = opts === null || opts === void 0 || (_opts$onSuccess2 = opts.onSuccess) === null || _opts$onSuccess2 === void 0 ? void 0 : _opts$onSuccess2.call(opts, ...args$1)) !== null && _opts$onSuccess !== void 0 ? _opts$onSuccess : defaultOpts === null || defaultOpts === void 0 || (_defaultOpts$onSucces = defaultOpts.onSuccess) === null || _defaultOpts$onSucces === void 0 ? void 0 : _defaultOpts$onSucces.call(defaultOpts, ...args$1);
			};
			return mutationSuccessOverride({
				originalFn,
				queryClient,
				meta: (_ref = (_opts$meta = opts === null || opts === void 0 ? void 0 : opts.meta) !== null && _opts$meta !== void 0 ? _opts$meta : defaultOpts === null || defaultOpts === void 0 ? void 0 : defaultOpts.meta) !== null && _ref !== void 0 ? _ref : {}
			});
		},
		trpc: createTRPCOptionsResult({ path })
	});
}
var import_objectSpread2$2 = __toESM(require_objectSpread2());
/**
* @internal
*/
function trpcQueryOptions(args) {
	const { input, query, path, queryKey, opts } = args;
	const queryClient = unwrapLazyArg(args.queryClient);
	const inputIsSkipToken = input === skipToken;
	const queryFn = async (queryFnContext) => {
		var _opts$trpc;
		const actualOpts = (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts), {}, { trpc: (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts === null || opts === void 0 ? void 0 : opts.trpc), (opts === null || opts === void 0 || (_opts$trpc = opts.trpc) === null || _opts$trpc === void 0 ? void 0 : _opts$trpc.abortOnUnmount) ? { signal: queryFnContext.signal } : { signal: null }) });
		const queryKey$1 = queryFnContext.queryKey;
		const result = await query(...getClientArgs(queryKey$1, actualOpts));
		if (isAsyncIterable(result)) return buildQueryFromAsyncIterable(result, queryClient, queryKey$1);
		return result;
	};
	return Object.assign(queryOptions((0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts), {}, {
		queryKey,
		queryFn: inputIsSkipToken ? skipToken : queryFn
	})), { trpc: createTRPCOptionsResult({ path }) });
}
var import_objectSpread2$1 = __toESM(require_objectSpread2(), 1);
/**
* @internal
*/
var trpcSubscriptionOptions = (args) => {
	var _readQueryKey;
	const { subscribe, path, queryKey, opts = {} } = args;
	const input = (_readQueryKey = readQueryKey(queryKey)) === null || _readQueryKey === void 0 || (_readQueryKey = _readQueryKey.args) === null || _readQueryKey === void 0 ? void 0 : _readQueryKey.input;
	const enabled = "enabled" in opts ? !!opts.enabled : input !== skipToken;
	const _subscribe = (innerOpts) => {
		return subscribe(path.join("."), input !== null && input !== void 0 ? input : void 0, innerOpts);
	};
	return (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
		enabled,
		subscribe: _subscribe,
		queryKey,
		trpc: createTRPCOptionsResult({ path })
	});
};
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
/**
* Create a typed proxy from your router types. Can also be used on the server.
*
* @see https://trpc.io/docs/client/tanstack-react-query/setup#3b-setup-without-react-context
* @see https://trpc.io/docs/client/tanstack-react-query/server-components#5-create-a-trpc-caller-for-server-components
*/
function createTRPCOptionsProxy(opts) {
	const prefix = opts.keyPrefix;
	const callIt = (type) => {
		return (path, input, trpcOpts) => {
			if ("router" in opts) return Promise.resolve(unwrapLazyArg(opts.ctx)).then((ctx) => callProcedure({
				router: opts.router,
				path,
				getRawInput: async () => input,
				ctx,
				type,
				signal: void 0,
				batchIndex: 0
			}));
			return (opts.client instanceof TRPCUntypedClient ? opts.client : getUntypedClient(opts.client))[type](path, input, trpcOpts);
		};
	};
	return createRecursiveProxy(({ args, path: _path }) => {
		const path = [..._path];
		const utilName = path.pop();
		const [arg1, arg2] = args;
		return {
			"~types": void 0,
			pathKey: () => {
				return getQueryKeyInternal({
					path,
					type: "any",
					prefix
				});
			},
			pathFilter: () => {
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, arg1), {}, { queryKey: getQueryKeyInternal({
					path,
					type: "any",
					prefix
				}) });
			},
			queryOptions: () => {
				return trpcQueryOptions({
					input: arg1,
					opts: arg2,
					path,
					queryClient: opts.queryClient,
					queryKey: getQueryKeyInternal({
						path,
						input: arg1,
						type: "query",
						prefix
					}),
					query: callIt("query")
				});
			},
			queryKey: () => {
				return getQueryKeyInternal({
					path,
					input: arg1,
					type: "query",
					prefix
				});
			},
			queryFilter: () => {
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, arg2), {}, { queryKey: getQueryKeyInternal({
					path,
					input: arg1,
					type: "query",
					prefix
				}) });
			},
			infiniteQueryOptions: () => {
				return trpcInfiniteQueryOptions({
					input: arg1,
					opts: arg2,
					path,
					queryClient: opts.queryClient,
					queryKey: getQueryKeyInternal({
						path,
						input: arg1,
						type: "infinite",
						prefix
					}),
					query: callIt("query")
				});
			},
			infiniteQueryKey: () => {
				return getQueryKeyInternal({
					path,
					input: arg1,
					type: "infinite",
					prefix
				});
			},
			infiniteQueryFilter: () => {
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, arg2), {}, { queryKey: getQueryKeyInternal({
					path,
					input: arg1,
					type: "infinite",
					prefix
				}) });
			},
			mutationOptions: () => {
				var _opts$overrides;
				return trpcMutationOptions({
					opts: arg1,
					path,
					prefix,
					queryClient: opts.queryClient,
					mutate: callIt("mutation"),
					overrides: (_opts$overrides = opts.overrides) === null || _opts$overrides === void 0 ? void 0 : _opts$overrides.mutations
				});
			},
			mutationKey: () => {
				return getMutationKeyInternal({
					path,
					prefix
				});
			},
			subscriptionOptions: () => {
				return trpcSubscriptionOptions({
					opts: arg2,
					path,
					queryKey: getQueryKeyInternal({
						path,
						input: arg1,
						type: "any",
						prefix
					}),
					subscribe: callIt("subscription")
				});
			}
		}[utilName]();
	});
}
/**
* Create a set of type-safe provider-consumers
*
* @see https://trpc.io/docs/client/tanstack-react-query/setup#3a-setup-the-trpc-context-provider
*/
function createTRPCContext() {
	const TRPCClientContext = import_react.createContext(null);
	const TRPCContext = import_react.createContext(null);
	const TRPCProvider = (props) => {
		const value = import_react.useMemo(() => createTRPCOptionsProxy({
			client: props.trpcClient,
			queryClient: props.queryClient,
			keyPrefix: props.keyPrefix
		}), [
			props.trpcClient,
			props.queryClient,
			props.keyPrefix
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TRPCClientContext.Provider, {
			value: props.trpcClient,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TRPCContext.Provider, {
				value,
				children: props.children
			})
		});
	};
	TRPCProvider.displayName = "TRPCProvider";
	function useTRPC() {
		const utils = import_react.useContext(TRPCContext);
		if (!utils) throw new Error("useTRPC() can only be used inside of a <TRPCProvider>");
		return utils;
	}
	function useTRPCClient() {
		const client = import_react.useContext(TRPCClientContext);
		if (!client) throw new Error("useTRPCClient() can only be used inside of a <TRPCProvider>");
		return client;
	}
	return {
		TRPCProvider,
		useTRPC,
		useTRPCClient
	};
}
//#endregion
//#region src/integrations/trpc/react.ts
var { TRPCProvider, useTRPC } = createTRPCContext();
//#endregion
export { hashKey as $, mergeWithoutOverrides as A, CancelledError as B, require_objectSpread2$1 as C, isAsyncIterable as D, identity as E, QueryClientProvider as F, pendingThenable as G, createRetryer as H, useQueryClient as I, addConsumeAwareSignal as J, tryResolveSync as K, Mutation as L, isObservable as M, observable as N, isFunction$1 as O, observableToAsyncIterable as P, functionalUpdate as Q, getDefaultState as R, require_defineProperty$1 as S, emptyObject as T, onlineManager as U, canFetch as V, notifyManager as W, addToStart as X, addToEnd as Y, ensureQueryFn as Z, transformTRPCResponse as _, httpBatchLink as a, partialMatchKey as at, getErrorShape as b, createCallerFactory as c, resolveStaleTime as ct, defaultTransformer as d, skipToken as dt, hashQueryKeyByOptions as et, getDataTransformer as f, timeUntilStale as ft, mergeRouters as g, isTrackedEnvelope as h, Subscribable as ht, createTRPCClient as i, noop$1 as it, run as j, isObject as k, createRouterFactory as l, shallowEqualObjects as lt, getTRPCErrorFromUnknown as m, focusManager as mt, useTRPC as n, matchMutation as nt, TRPCClientError as o, replaceData as ot, getProcedureAtPath as p, timeoutManager as pt, environmentManager as q, createTRPCOptionsProxy as r, matchQuery as rt, TRPCError as s, resolveQueryBoolean as st, TRPCProvider as t, isValidTimeout as tt, defaultFormatter as u, shouldThrowError as ut, __commonJS$1 as v, abortSignalsAnyPonyfill as w, getHTTPStatusCode as x, __toESM$1 as y, Removable as z };
