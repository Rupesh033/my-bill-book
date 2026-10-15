//#region src/features/app-shell/data/india-masters.ts
/** Shared India GST / BUSY-style master lists for create forms. */
var indianStates = [
	{
		code: "01",
		name: "Jammu and Kashmir"
	},
	{
		code: "02",
		name: "Himachal Pradesh"
	},
	{
		code: "03",
		name: "Punjab"
	},
	{
		code: "04",
		name: "Chandigarh"
	},
	{
		code: "05",
		name: "Uttarakhand"
	},
	{
		code: "06",
		name: "Haryana"
	},
	{
		code: "07",
		name: "Delhi"
	},
	{
		code: "08",
		name: "Rajasthan"
	},
	{
		code: "09",
		name: "Uttar Pradesh"
	},
	{
		code: "10",
		name: "Bihar"
	},
	{
		code: "11",
		name: "Sikkim"
	},
	{
		code: "12",
		name: "Arunachal Pradesh"
	},
	{
		code: "13",
		name: "Nagaland"
	},
	{
		code: "14",
		name: "Manipur"
	},
	{
		code: "15",
		name: "Mizoram"
	},
	{
		code: "16",
		name: "Tripura"
	},
	{
		code: "17",
		name: "Meghalaya"
	},
	{
		code: "18",
		name: "Assam"
	},
	{
		code: "19",
		name: "West Bengal"
	},
	{
		code: "20",
		name: "Jharkhand"
	},
	{
		code: "21",
		name: "Odisha"
	},
	{
		code: "22",
		name: "Chhattisgarh"
	},
	{
		code: "23",
		name: "Madhya Pradesh"
	},
	{
		code: "24",
		name: "Gujarat"
	},
	{
		code: "27",
		name: "Maharashtra"
	},
	{
		code: "29",
		name: "Karnataka"
	},
	{
		code: "32",
		name: "Kerala"
	},
	{
		code: "33",
		name: "Tamil Nadu"
	},
	{
		code: "36",
		name: "Telangana"
	},
	{
		code: "37",
		name: "Andhra Pradesh"
	}
];
var gstRateOptions = [
	"0.00",
	"5.00",
	"12.00",
	"18.00",
	"28.00"
];
var itemGroups = [
	"Fabrics",
	"Yarn",
	"Finished goods",
	"Packaging",
	"Services",
	"General"
];
var unitOptions = [
	{
		label: "Meter",
		uqc: "MTR"
	},
	{
		label: "Nos",
		uqc: "NOS"
	},
	{
		label: "Kilogram",
		uqc: "KGS"
	},
	{
		label: "Piece",
		uqc: "PCS"
	},
	{
		label: "Box",
		uqc: "BOX"
	},
	{
		label: "Set",
		uqc: "SET"
	},
	{
		label: "Thaan",
		uqc: "MTR"
	},
	{
		label: "Job",
		uqc: "NOS"
	}
];
var paymentTermsOptions = [
	{
		days: 0,
		label: "Immediate / Cash"
	},
	{
		days: 7,
		label: "7 days"
	},
	{
		days: 15,
		label: "15 days"
	},
	{
		days: 30,
		label: "30 days"
	},
	{
		days: 45,
		label: "45 days"
	},
	{
		days: 60,
		label: "60 days"
	}
];
var salesSeriesOptions = [
	"INV",
	"TAX",
	"RET"
];
var purchaseSeriesOptions = [
	"PUR",
	"EXP",
	"IMP"
];
function stateLabel(code) {
	const match = indianStates.find((state) => state.code === code);
	return match ? `${match.name} (${match.code})` : code;
}
function uqcForUnit(unitLabel) {
	return unitOptions.find((unit) => unit.label === unitLabel)?.uqc ?? "NOS";
}
//#endregion
export { purchaseSeriesOptions as a, unitOptions as c, paymentTermsOptions as i, uqcForUnit as l, indianStates as n, salesSeriesOptions as o, itemGroups as r, stateLabel as s, gstRateOptions as t };
