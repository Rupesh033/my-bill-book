import { t as require_jsx_runtime } from "./jsx-runtime-37ZnD8LL.js";
import { t as createLucideIcon } from "./createLucideIcon-BzxoKMg5.js";
import { t as Download } from "./download-D9biyPia.js";
import { t as ExternalLink } from "./external-link-B9NAK4Ww.js";
import { t as cn } from "./utils-Bcmp4H83.js";
import { r as formatInr } from "./voucher-demo-masters-CbFRv67D.js";
import { i as stateLabel, r as formatIndianDate } from "./invoice-print-service-CLifP9FG.js";
import { t as Button } from "./button-CwLzwKUP.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Printer = createLucideIcon("printer", [
	["path", {
		d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
		key: "143wyd"
	}],
	["path", {
		d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
		key: "1itne7"
	}],
	["rect", {
		x: "6",
		y: "14",
		width: "12",
		height: "8",
		rx: "1",
		key: "1ue0tg"
	}]
]);
//#endregion
//#region src/features/documents/components/voucher-document-paper.tsx
var import_jsx_runtime = require_jsx_runtime();
var cell = "border border-black p-1 align-top text-[11px] leading-snug text-black";
var headCell = "border border-black bg-neutral-100 p-1 text-[10px] font-semibold uppercase leading-snug text-black";
var numCell = cn(cell, "text-right tabular-nums");
function companyAddressLines(company) {
	const cityLine = [company.city, company.pincode].filter(Boolean).join(" - ");
	return [
		company.addressLine1,
		company.addressLine2,
		cityLine
	].filter((line) => Boolean(line && line.trim()));
}
function PartyAddressBlock({ title, name, address, gstin, pan, stateCode, phone, email }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-semibold uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold",
				children: ["M/s ", name]
			}),
			address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-line",
				children: address
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "italic text-neutral-600",
				children: "Address not recorded"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"GSTIN/UIN: ",
				gstin ?? "Unregistered",
				pan ? ` · PAN: ${pan}` : ""
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["State: ", stateLabel(stateCode) || stateCode] }),
			phone || email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [phone, email].filter(Boolean).join(" · ") }) : null
		]
	});
}
function VoucherDocumentPaper({ document, printId = "voucher-print-root", className }) {
	const { company, party, isInterState } = document;
	const cols = isInterState ? 12 : 14;
	const addressLines = companyAddressLines(company);
	const shipAddress = party.shippingAddress || party.billingAddress || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-[210mm] bg-white p-2 text-black print:p-0", className),
		id: printId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			className: "w-full border-collapse border border-black text-[11px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cell,
					colSpan: cols,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [company.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								alt: "",
								className: "size-12 shrink-0 object-contain",
								src: company.logoUrl
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold uppercase",
										children: company.legalName
									}),
									company.tradeName && company.tradeName !== company.legalName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px]",
										children: company.tradeName
									}) : null,
									addressLines.length > 0 ? addressLines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, line)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "italic text-neutral-600",
										children: "Company address not recorded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"GSTIN/UIN: ",
										company.gstin ?? "Unregistered",
										company.pan ? ` · PAN: ${company.pan}` : ""
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"State:",
										" ",
										stateLabel(company.stateCode) || company.stateCode
									] }),
									company.contactPhone || company.contactEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [company.contactPhone, company.contactEmail].filter(Boolean).join(" · ") }) : null
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-bold uppercase tracking-wide",
								children: document.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] font-medium",
								children: document.copyLabel
							})]
						})]
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Invoice No."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						colSpan: 2,
						children: document.documentNumber
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Dated"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						colSpan: isInterState ? 2 : 3,
						children: formatIndianDate(document.documentDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Due Date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						colSpan: isInterState ? 5 : 6,
						children: formatIndianDate(document.dueDate || document.documentDate)
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Place of Supply"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						colSpan: isInterState ? 2 : 3,
						children: document.placeOfSupplyLabel || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Mode/Terms of Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						colSpan: isInterState ? 8 : 9,
						children: document.paymentMode ? document.paymentMode === "cash" ? "Cash" : "Credit" : "—"
					})
				] }),
				(document.poReference || document.challanRef || document.transportMode || document.vehicleNo || document.lrNumber) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: headCell,
					children: "References"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cell,
					colSpan: cols - 1,
					children: [
						document.poReference ? `PO/Ref: ${document.poReference}` : null,
						document.challanRef ? `Challan: ${document.challanRef}` : null,
						document.transportMode ? `Transport: ${document.transportMode}` : null,
						document.vehicleNo ? `Vehicle: ${document.vehicleNo}` : null,
						document.lrNumber ? `LR/AWB: ${document.lrNumber}` : null
					].filter(Boolean).join(" · ")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cell,
					colSpan: Math.floor(cols / 2),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyAddressBlock, {
						address: party.billingAddress,
						email: party.contactEmail,
						gstin: party.gstin,
						name: party.name,
						pan: party.pan,
						phone: party.contactPhone,
						stateCode: party.stateCode,
						title: document.partyLabel
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cell,
					colSpan: cols - Math.floor(cols / 2),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyAddressBlock, {
						address: shipAddress,
						email: party.contactEmail,
						gstin: party.gstin,
						name: party.name,
						pan: party.pan,
						phone: party.contactPhone,
						stateCode: party.stateCode,
						title: "Shipped to"
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Sr"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						colSpan: 2,
						children: "Description of Goods"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "HSN/SAC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "Qty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: headCell,
						children: "Unit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "Rate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "Disc"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "Taxable"
					}),
					isInterState ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "IGST %"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "IGST Amt"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn(headCell, "text-right"),
							children: "CGST %"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn(headCell, "text-right"),
							children: "CGST Amt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn(headCell, "text-right"),
							children: "SGST %"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn(headCell, "text-right"),
							children: "SGST Amt"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(headCell, "text-right"),
						children: "Amount"
					})
				] }),
				document.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(cell, "text-center"),
						children: line.serial
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						colSpan: 2,
						children: line.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn(cell, "font-mono"),
						children: line.hsnCode || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: numCell,
						children: line.quantity
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cell,
						children: line.unit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: numCell,
						children: formatInr(line.rate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: numCell,
						children: Number(line.discountAmount) > 0 ? formatInr(line.discountAmount) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: numCell,
						children: formatInr(line.taxableAmount)
					}),
					isInterState ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: numCell,
						children: [line.igstRate, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: numCell,
						children: formatInr(line.igstAmount)
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: numCell,
							children: [line.cgstRate, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: numCell,
							children: formatInr(line.cgstAmount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: numCell,
							children: [line.sgstRate, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: numCell,
							children: formatInr(line.sgstAmount)
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: numCell,
						children: formatInr(line.lineTotal)
					})
				] }, line.serial)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cell,
							colSpan: isInterState ? 8 : 8,
							children: "Total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: numCell,
							children: formatInr(document.taxableAmount)
						}),
						isInterState ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: cell }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: numCell,
							children: formatInr(document.totalIgst)
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: cell }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: numCell,
								children: formatInr(document.totalCgst)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: cell }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: numCell,
								children: formatInr(document.totalSgst)
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: numCell,
							children: formatInr(document.totalAmount)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: cell,
					colSpan: isInterState ? 6 : 7,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-[10px] font-semibold uppercase",
							children: "HSN/SAC Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full border-collapse border border-black text-[10px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: headCell,
									children: "HSN/SAC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn(headCell, "text-right"),
									children: "Taxable Value"
								}),
								isInterState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn(headCell, "text-right"),
									children: "IGST"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn(headCell, "text-right"),
									children: "CGST"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn(headCell, "text-right"),
									children: "SGST"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn(headCell, "text-right"),
									children: "Total Tax"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: document.hsnSummary.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cell,
									children: row.hsnCode
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: numCell,
									children: formatInr(row.taxableAmount)
								}),
								isInterState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: numCell,
									children: formatInr(row.igstAmount)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: numCell,
									children: formatInr(row.cgstAmount)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: numCell,
									children: formatInr(row.sgstAmount)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: numCell,
									children: formatInr(row.totalTax)
								})
							] }, row.hsnCode)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["Amount Chargeable (in words):", " "]
							}), document.amountInWords]
						}),
						document.narration ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Narration: "
							}), document.narration]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cell,
					colSpan: cols - (isInterState ? 6 : 7),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "w-full text-[11px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "Taxable Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.taxableAmount)
							})] }),
							isInterState ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "IGST"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.totalIgst)
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "CGST"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.totalCgst)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "SGST"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.totalSgst)
							})] })] }),
							Number(document.freight) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "Freight"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.freight)
							})] }) : null,
							Number(document.packing) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "Packing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.packing)
							})] }) : null,
							Number(document.billDiscount) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "Bill Discount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: ["-", formatInr(document.billDiscount)]
							})] }) : null,
							Number(document.roundOff) !== 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "Round Off"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.roundOff)
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-black font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pt-1",
									children: "Grand Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pt-1 text-right tabular-nums",
									children: formatInr(document.totalAmount)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5",
								children: "Outstanding"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-0.5 text-right tabular-nums",
								children: formatInr(document.outstandingAmount)
							})] })
						] })
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: cell,
					colSpan: isInterState ? 6 : 7,
					children: [
						company.bankName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-semibold uppercase",
								children: "Company's Bank Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Bank: ", company.bankName] }),
							company.bankAccountNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["A/c No.: ", company.bankAccountNumber] }) : null,
							company.bankIfsc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["IFSC: ", company.bankIfsc] }) : null
						] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-line text-[10px]",
							children: company.invoiceTerms?.trim() || "Goods once sold will not be taken back. Interest @18% p.a. on overdue bills. Subject to local jurisdiction. Whether tax is payable on reverse charge - No."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[10px]",
							children: ["Reverse Charge: ", document.reverseCharge ? "Yes" : "No"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: cn(cell, "align-bottom text-right"),
					colSpan: cols - (isInterState ? 6 : 7),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold",
						children: ["For ", company.legalName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 border-t border-black pt-1",
						children: company.authorizedSignatory ? `${company.authorizedSignatory} · Authorised Signatory` : "Authorised Signatory"
					})]
				})] })
			] })
		})
	});
}
//#endregion
//#region src/features/documents/components/voucher-print-toolbar.tsx
function VoucherPrintToolbar({ fullPageHref, pdfHref, onPrint, className }) {
	function handlePrint() {
		if (onPrint) {
			onPrint();
			return;
		}
		window.print();
	}
	function handleDownloadPdf() {
		const popup = window.open(pdfHref, "_blank", "noopener,noreferrer");
		if (!popup) return;
		popup.addEventListener("load", () => {
			popup.focus();
			popup.print();
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-wrap items-center gap-2 print:hidden ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: handlePrint,
				type: "button",
				variant: "default",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { "data-icon": "inline-start" }), "Print"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: handleDownloadPdf,
				type: "button",
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { "data-icon": "inline-start" }), "Download PDF"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				type: "button",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: fullPageHref,
					rel: "noreferrer",
					target: "_blank",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { "data-icon": "inline-start" }), "Open full page"]
				})
			})
		]
	});
}
//#endregion
export { VoucherDocumentPaper as n, Printer as r, VoucherPrintToolbar as t };
