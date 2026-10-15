import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as Pencil } from "./pencil-BQdE0Tea.js";
import { t as Plus } from "./plus-DXSyyTig.js";
import { t as Trash2 } from "./trash-2-Cksi9pld.js";
import { t as Warehouse } from "./warehouse-DIOSSXgA.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CKQZkisS.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { c as requireTrimmed, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
//#endregion
//#region src/features/inventory/components/godowns-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GodownsPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId, isReady } = useWorkspace();
	const [createOpen, setCreateOpen] = import_react.useState(false);
	const [editGodown, setEditGodown] = import_react.useState(null);
	const [name, setName] = import_react.useState("");
	const godownsQuery = useQuery({
		...trpc.inventory.listGodowns.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	});
	const createMutation = useMutation(trpc.inventory.createGodown.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listGodowns.queryKey({ companyId: companyId ?? "" }) });
			setCreateOpen(false);
			setName("");
			toast.success("Godown created");
		},
		onError: (error) => toastActionError(error, "Action failed")
	}));
	const updateMutation = useMutation(trpc.inventory.updateGodown.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listGodowns.queryKey({ companyId: companyId ?? "" }) });
			setEditGodown(null);
			setName("");
			toast.success("Godown updated");
		},
		onError: (error) => toastActionError(error, "Action failed")
	}));
	const deleteMutation = useMutation(trpc.inventory.deleteGodown.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listGodowns.queryKey({ companyId: companyId ?? "" }) });
			toast.success("Godown deleted");
		},
		onError: (error) => toastActionError(error, "Action failed")
	}));
	const setDefaultMutation = useMutation(trpc.inventory.setDefaultGodown.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: trpc.inventory.listGodowns.queryKey({ companyId: companyId ?? "" }) });
			toast.success("Default godown updated");
		},
		onError: (error) => toastActionError(error, "Action failed")
	}));
	function openCreate() {
		setName("");
		setCreateOpen(true);
	}
	function openEdit(godown) {
		setEditGodown(godown);
		setName(godown.name);
	}
	function submitCreate() {
		if (!requireWorkspace(companyId)) return;
		const godownName = requireTrimmed(name, "Godown name");
		if (!godownName) return;
		createMutation.mutate({
			companyId,
			name: godownName
		});
	}
	function submitEdit() {
		if (!requireWorkspace(companyId) || !editGodown) return;
		const godownName = requireTrimmed(name, "Godown name");
		if (!godownName) return;
		updateMutation.mutate({
			companyId,
			godownId: editGodown.id,
			name: godownName
		});
	}
	const godowns = godownsQuery.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), "Add godown"]
		}),
		title: "Godowns",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Default" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-40 text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [godowns.map((godown) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: godown.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: godown.isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					children: "Default"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						if (!requireWorkspace(companyId)) return;
						setDefaultMutation.mutate({
							companyId,
							godownId: godown.id
						});
					},
					size: "sm",
					type: "button",
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" }), "Set default"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => openEdit(godown),
							size: "icon-sm",
							type: "button",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: godown.isDefault,
							onClick: () => {
								if (!requireWorkspace(companyId)) return;
								deleteMutation.mutate({
									companyId,
									godownId: godown.id
								});
							},
							size: "icon-sm",
							type: "button",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})]
					})
				})
			] }, godown.id)), godowns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				colSpan: 3,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warehouse, { className: "size-4" }), "No godowns yet. Add your first warehouse location."]
				})
			}) }) : null] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				onOpenChange: setCreateOpen,
				open: createOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New godown" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						onChange: (event) => setName(event.target.value),
						placeholder: "Godown name",
						value: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submitCreate,
						type: "button",
						children: "Create"
					}) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				onOpenChange: (open) => {
					if (!open) setEditGodown(null);
				},
				open: Boolean(editGodown),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Rename godown" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						onChange: (event) => setName(event.target.value),
						value: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submitEdit,
						type: "button",
						children: "Save"
					}) })
				] })
			})
		]
	});
}
//#endregion
//#region src/routes/app/masters/godowns.tsx?tsr-split=component
function GodownsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GodownsPanel, {});
}
//#endregion
export { GodownsRoute as component };
