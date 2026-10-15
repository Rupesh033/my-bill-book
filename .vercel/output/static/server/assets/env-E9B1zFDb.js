import { a as _enum, y as string } from "./schemas-B0hhv1Dq.js";
//#region node_modules/.bun/@t3-oss+env-core@0.13.11+1cd18485b0404aca/node_modules/@t3-oss/env-core/dist/standard.js
function ensureSynchronous(value, message) {
	if (value instanceof Promise) throw new Error(message);
}
function parseWithDictionary(dictionary, value) {
	const result = {};
	const issues = [];
	for (const key in dictionary) {
		const propResult = dictionary[key]["~standard"].validate(value[key]);
		ensureSynchronous(propResult, `Validation must be synchronous, but ${key} returned a Promise.`);
		if (propResult.issues) {
			issues.push(...propResult.issues.map((issue) => ({
				...issue,
				message: issue.message,
				path: [key, ...issue.path ?? []]
			})));
			continue;
		}
		result[key] = propResult.value;
	}
	if (issues.length) return { issues };
	return { value: result };
}
//#endregion
//#region node_modules/.bun/@t3-oss+env-core@0.13.11+1cd18485b0404aca/node_modules/@t3-oss/env-core/dist/index.js
/**
* Create a new environment variable schema.
*/
function createEnv(opts) {
	const runtimeEnv = opts.runtimeEnvStrict ?? opts.runtimeEnv ?? process.env;
	if (opts.emptyStringAsUndefined ?? false) {
		for (const [key, value] of Object.entries(runtimeEnv)) if (value === "") delete runtimeEnv[key];
	}
	if (!!opts.skipValidation) {
		if (opts.extends) for (const preset of opts.extends) preset.skipValidation = true;
		return runtimeEnv;
	}
	const _client = typeof opts.client === "object" ? opts.client : {};
	const _server = typeof opts.server === "object" ? opts.server : {};
	const _shared = typeof opts.shared === "object" ? opts.shared : {};
	const isServer = opts.isServer ?? (typeof window === "undefined" || "Deno" in window);
	const finalSchemaShape = isServer ? {
		..._server,
		..._shared,
		..._client
	} : {
		..._client,
		..._shared
	};
	const parsed = (opts.createFinalSchema?.(finalSchemaShape, isServer))?.["~standard"].validate(runtimeEnv) ?? parseWithDictionary(finalSchemaShape, runtimeEnv);
	ensureSynchronous(parsed, "Validation must be synchronous");
	const onValidationError = opts.onValidationError ?? ((issues) => {
		console.error("❌ Invalid environment variables:", issues);
		throw new Error("Invalid environment variables");
	});
	const onInvalidAccess = opts.onInvalidAccess ?? (() => {
		throw new Error("❌ Attempted to access a server-side environment variable on the client");
	});
	if (parsed.issues) return onValidationError(parsed.issues);
	const isServerAccess = (prop) => {
		if (!opts.clientPrefix) return true;
		return !prop.startsWith(opts.clientPrefix) && !(prop in _shared);
	};
	const isValidServerAccess = (prop) => {
		return isServer || !isServerAccess(prop);
	};
	const ignoreProp = (prop) => {
		return prop === "__esModule" || prop === "$$typeof";
	};
	const extendedObj = (opts.extends ?? []).reduce((acc, curr) => {
		return Object.assign(acc, curr);
	}, {});
	const fullObj = Object.assign(extendedObj, parsed.value);
	return new Proxy(fullObj, { get(target, prop) {
		if (typeof prop !== "string") return void 0;
		if (ignoreProp(prop)) return void 0;
		if (!isValidServerAccess(prop)) return onInvalidAccess(prop);
		return Reflect.get(target, prop);
	} });
}
//#endregion
//#region src/env.ts
var env = createEnv({
	server: { SERVER_URL: string().url().optional() },
	/**
	* The prefix that client-side variables must have. This is enforced both at
	* a type-level and at runtime.
	*/
	clientPrefix: "VITE_",
	client: {
		VITE_APP_TITLE: string().min(1).optional(),
		VITE_REQUIRE_AUTH: _enum(["true", "false"]).optional(),
		VITE_ENABLE_GOOGLE_AUTH: _enum(["true", "false"]).optional(),
		VITE_GA_MEASUREMENT_ID: string().min(1).optional(),
		VITE_GOOGLE_SITE_VERIFICATION: string().min(1).optional()
	},
	/**
	* What object holds the environment variables at runtime. This is usually
	* `process.env` or `import.meta.env`.
	*/
	runtimeEnv: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_APP_TITLE": "My Bill Book",
		"VITE_ENABLE_GOOGLE_AUTH": "false",
		"VITE_POSTGRES_CLAIM_URL": "https://neon.new/database/96b47ca1-b417-4a69-9090-9b0b56a32d0f",
		"VITE_REQUIRE_AUTH": "false"
	},
	/**
	* By default, this library will feed the environment variables directly to
	* the Zod validator.
	*
	* This means that if you have an empty string for a value that is supposed
	* to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	* it as a type mismatch violation. Additionally, if you have an empty string
	* for a value that is supposed to be a string with a default value (e.g.
	* `DOMAIN=` in an ".env" file), the default value will never be applied.
	*
	* In order to solve these issues, we recommend that all new projects
	* explicitly specify this option as true.
	*/
	emptyStringAsUndefined: true
});
//#endregion
export { env as t };
