import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as Link } from "./link-DgG2XgNt.js";
import { I as useQueryClient, n as useTRPC } from "./react-CJuu14_E.js";
import { n as useWorkspace, r as useQuery } from "./workspace-context-Cz54y75x.js";
import { n as toastActionError, r as useMutation, t as getFormErrorMessage } from "./form-error-C1Pg8DRC.js";
import { n as toast } from "./dist-FOYHZCix.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select } from "./select-nNaz3Adl.js";
import { t as Download } from "./download-D9biyPia.js";
import { t as ExternalLink } from "./external-link-B9NAK4Ww.js";
import { t as Mail } from "./mail-MtVbx_Gu.js";
import { t as Trash2 } from "./trash-2-Cksi9pld.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CKQZkisS.js";
import { t as authClient } from "./auth-client-PUg2QA33.js";
import { t as Button } from "./button-CwLzwKUP.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CbLG1PNp.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BRR9yZCH.js";
import { t as Input } from "./input-oruOz0Hj.js";
import { t as WorkspacePage } from "./workspace-page-Bvg78oR3.js";
import { c as requireTrimmed, t as failForm, u as requireWorkspace } from "./form-validation-CiOjD7zS.js";
import { t as Badge } from "./badge-CFl7pX1d.js";
import { t as CompanyProfilePanel } from "./company-profile-panel-Drrbotuq.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var History = createLucideIcon("history", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region src/features/audit/components/audit-log-viewer.tsx
var import_jsx_runtime = require_jsx_runtime();
function AuditLogViewer() {
	const trpc = useTRPC();
	const { companyId, isReady } = useWorkspace();
	const events = [...useQuery({
		...trpc.audit.list.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: Boolean(companyId) && isReady
	}).data ?? []].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
		className: "flex items-center gap-2 text-base",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-muted-foreground" }), "Audit log"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Company setup and document activity for this workspace." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "px-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "When" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Entity" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "py-10 text-center text-muted-foreground",
			colSpan: 3,
			children: "No audit events recorded yet."
		}) }) : events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-xs text-muted-foreground",
				children: new Date(event.createdAt).toLocaleString()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: event.action
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "font-mono text-xs",
				children: [
					event.entityType,
					":",
					event.entityId
				]
			})
		] }, event.id)) })] })
	})] });
}
//#endregion
//#region src/features/team/components/team-members-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var assignableRoles = [
	{
		value: "admin",
		label: "Admin",
		description: "Full access including team, masters, posting, reports, and bank reconciliation."
	},
	{
		value: "accountant",
		label: "Accountant",
		description: "Masters, all vouchers, bank reconciliation, and financial reports."
	},
	{
		value: "billing",
		label: "Billing",
		description: "Sales invoices, payments, and operational lists only."
	},
	{
		value: "inventory",
		label: "Inventory",
		description: "Items, stock, godowns, and operational lists."
	},
	{
		value: "readonly",
		label: "Read only",
		description: "View transactions and reports; cannot post or change masters."
	}
];
function TeamMembersPanel() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { companyId } = useWorkspace();
	const { data: session } = authClient.useSession();
	const currentUserId = session?.user.id;
	const [inviteOpen, setInviteOpen] = import_react.useState(false);
	const [inviteEmail, setInviteEmail] = import_react.useState("");
	const [inviteRole, setInviteRole] = import_react.useState("billing");
	const [formError, setFormError] = import_react.useState(null);
	const enabled = Boolean(companyId);
	const membersQuery = useQuery({
		...trpc.team.listMembers.queryOptions({ companyId: companyId ?? "" }),
		enabled
	});
	const queryKey = trpc.team.listMembers.queryKey({ companyId: companyId ?? "" });
	const invalidate = () => queryClient.invalidateQueries({ queryKey });
	const inviteMutation = useMutation({
		...trpc.team.invite.mutationOptions(),
		onSuccess: () => void invalidate()
	});
	const resendMutation = useMutation({
		...trpc.team.resendInvite.mutationOptions(),
		onError: (error) => toastActionError(error, "Unable to resend invite"),
		onSuccess: () => toast.success("Invitation resent.")
	});
	const revokeMutation = useMutation({
		...trpc.team.revokeInvite.mutationOptions(),
		onSuccess: () => {
			invalidate();
			toast.success("Invitation revoked.");
		},
		onError: (error) => toastActionError(error, "Unable to revoke invite")
	});
	const updateRoleMutation = useMutation({
		...trpc.team.updateRole.mutationOptions(),
		onSuccess: () => {
			invalidate();
			toast.success("Role updated.");
		},
		onError: (error) => toastActionError(error, "Unable to update role")
	});
	const removeMutation = useMutation({
		...trpc.team.removeMember.mutationOptions(),
		onSuccess: () => {
			invalidate();
			toast.success("Member removed.");
		},
		onError: (error) => toastActionError(error, "Unable to remove member")
	});
	async function handleInvite(event) {
		event.preventDefault();
		if (!requireWorkspace(companyId)) return;
		const email = requireTrimmed(inviteEmail, "Email");
		if (!email) {
			failForm(setFormError, "Email is required.");
			return;
		}
		setFormError(null);
		try {
			await inviteMutation.mutateAsync({
				companyId,
				email,
				role: inviteRole
			});
			setInviteEmail("");
			setInviteRole("billing");
			setInviteOpen(false);
			toast.success("Invitation sent.");
		} catch (error) {
			setFormError(getFormErrorMessage(error, "Unable to send invite"));
		}
	}
	const data = membersQuery.data;
	const members = data?.members ?? [];
	const invitations = data?.invitations ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Team members"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Invite teammates and control what they can do." })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			onOpenChange: setInviteOpen,
			open: inviteOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full sm:w-auto",
					disabled: !companyId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { "data-icon": "inline-start" }), "Invite"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Invite teammate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "They will receive an email link to join this company." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-4",
					onSubmit: handleInvite,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								htmlFor: "invite-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "invite-email",
								onChange: (event) => setInviteEmail(event.target.value),
								placeholder: "teammate@business.com",
								required: true,
								type: "email",
								value: inviteEmail
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: (value) => setInviteRole(value),
									value: inviteRole,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: assignableRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: role.value,
										children: role.label
									}, role.value)) }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: assignableRoles.find((role) => role.value === inviteRole)?.description
								})
							]
						}),
						formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: formError
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: inviteMutation.isPending,
							type: "submit",
							children: inviteMutation.isPending ? "Sending…" : "Send invite"
						}) })
					]
				})]
			})]
		})]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex flex-col gap-6 px-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Member" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Role" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-10" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [members.map((member) => {
			const isSelf = member.userId === currentUserId;
			const isOwner = member.role === "owner";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [member.name ?? member.email ?? member.userId.slice(0, 8), isSelf ? " (you)" : ""]
					}), member.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: member.email
					}) : null]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: isOwner || isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: member.role
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					onValueChange: (value) => companyId && updateRoleMutation.mutate({
						companyId,
						userId: member.userId,
						role: value
					}),
					value: member.role,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-36",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: assignableRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: role.value,
						children: role.label
					}, role.value)) }) })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: isOwner || isSelf ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
					onClick: () => companyId && removeMutation.mutate({
						companyId,
						userId: member.userId
					}),
					size: "icon-sm",
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Remove member"
					})]
				}) })
			] }, member.userId);
		}), members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-sm text-muted-foreground",
			colSpan: 3,
			children: "No members yet."
		}) }) : null] })] }), invitations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Pending invitations"
			}), invitations.map((invitation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-md bg-muted/40 p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: invitation.email
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: invitation.role
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "text-muted-foreground",
						disabled: resendMutation.isPending,
						onClick: () => companyId && resendMutation.mutate({
							companyId,
							email: invitation.email
						}),
						size: "icon-sm",
						variant: "ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Resend invite"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
						onClick: () => companyId && revokeMutation.mutate({
							companyId,
							email: invitation.email
						}),
						size: "icon-sm",
						variant: "ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Revoke invite"
						})]
					})]
				})]
			}, invitation.email))]
		}) : null]
	})] });
}
//#endregion
//#region src/routes/app/settings.tsx?tsr-split=component
function SettingsRoute() {
	const trpc = useTRPC();
	const { companyId, isReady } = useWorkspace();
	const exportQuery = useQuery({
		...trpc.reports.accountantExport.queryOptions({ companyId: companyId ?? "00000000-0000-4000-8000-000000000099" }),
		enabled: false
	});
	async function downloadBackup() {
		if (!companyId) return;
		const data = await exportQuery.refetch();
		if (!data.data) return;
		const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `company-backup-${companyId}.json`;
		anchor.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspacePage, {
		description: "Company preferences, invoice series, roles, and audit controls.",
		title: "Settings",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Invoice series"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Safe sequences by voucher type and financial year are ready in the domain layer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "text-sm text-muted-foreground",
						children: "Sales/purchase vouchers allocate numbers on save (series + padded sequence). Attachments store company-scoped metadata; R2 binary storage comes next."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Backup export"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Download trial balance, sales, and purchases as JSON (Phase 7 stub)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: !companyId || !isReady || exportQuery.isFetching,
						onClick: () => void downloadBackup(),
						type: "button",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { "data-icon": "inline-start" }), "Download company backup"]
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Document storage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Bill attachments use an object-storage adapter (R2 next)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "text-sm text-muted-foreground",
						children: "Metadata is company-scoped; files stay outside the database."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Privacy and data"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Public policy and account deletion request links for store compliance." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/privacy",
								children: ["Privacy policy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { "data-icon": "inline-end" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/data-deletion",
								children: ["Data deletion", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { "data-icon": "inline-end" })]
							})
						})]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyProfilePanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMembersPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditLogViewer, {})
		]
	});
}
//#endregion
export { SettingsRoute as component };
