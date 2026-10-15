//#region src/features/app-shell/data/voucher-demo-masters.ts
var demoParties = [
	{
		id: "party-1",
		name: "Noor Retailers",
		partyType: "customer",
		gstin: "27AABCU9603R1ZM",
		stateCode: "27",
		paymentTermsDays: 30
	},
	{
		id: "party-2",
		name: "City Brokers",
		partyType: "both",
		gstin: "27BBBCD1234E1Z5",
		stateCode: "27",
		paymentTermsDays: 7
	},
	{
		id: "party-3",
		name: "Gujarat Fab Mart",
		partyType: "customer",
		gstin: "24CCCDE5678F1Z2",
		stateCode: "24",
		paymentTermsDays: 15
	},
	{
		id: "party-4",
		name: "Textile Mills Ltd",
		partyType: "supplier",
		gstin: "24AABCU9603R1ZM",
		stateCode: "24",
		paymentTermsDays: 15
	},
	{
		id: "party-5",
		name: "Surat Yarn House",
		partyType: "supplier",
		gstin: "24DDDEF9012G1Z8",
		stateCode: "24",
		paymentTermsDays: 21
	}
];
var demoItems = [
	{
		id: "item-1",
		name: "Cotton Fabric",
		alias: "CTN-FAB",
		group: "Fabrics",
		hsnCode: "5208",
		gstRate: "5.00",
		baseUnit: "Meter",
		uqc: "MTR",
		altUnit: "Thaan",
		conversionFactor: "50",
		purchaseRate: "80.00",
		saleRate: "120.00",
		tracksInventory: true
	},
	{
		id: "item-2",
		name: "Silk Blend",
		alias: "SLK-BLD",
		group: "Fabrics",
		hsnCode: "5007",
		gstRate: "5.00",
		baseUnit: "Meter",
		uqc: "MTR",
		altUnit: "Thaan",
		conversionFactor: "40",
		purchaseRate: "220.00",
		saleRate: "310.00",
		tracksInventory: true
	},
	{
		id: "item-3",
		name: "Cutting Service",
		alias: "SVC-CUT",
		group: "Services",
		hsnCode: "9988",
		gstRate: "18.00",
		baseUnit: "Job",
		uqc: "NOS",
		altUnit: null,
		conversionFactor: null,
		purchaseRate: "0.00",
		saleRate: "500.00",
		tracksInventory: false
	}
];
var godowns = [
	"Main Godown",
	"Showroom",
	"Godown-2"
];
function formatInr(value) {
	return `₹${Number(value).toLocaleString("en-IN", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
//#endregion
export { godowns as i, demoParties as n, formatInr as r, demoItems as t };
