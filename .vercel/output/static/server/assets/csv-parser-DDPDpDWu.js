//#region src/features/imports/csv-parser.ts
var InvalidCsvError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidCsvError";
	}
};
function parseLine(line) {
	const fields = [];
	let current = "";
	let insideQuotes = false;
	for (let index = 0; index < line.length; index += 1) {
		const char = line[index];
		if (insideQuotes) {
			if (char === "\"" && line[index + 1] === "\"") {
				current += "\"";
				index += 1;
			} else if (char === "\"") insideQuotes = false;
			else current += char;
			continue;
		}
		if (char === "\"") insideQuotes = true;
		else if (char === ",") {
			fields.push(current);
			current = "";
		} else current += char;
	}
	fields.push(current);
	return fields;
}
function parseDelimitedLine(line, delimiter) {
	if (delimiter === ",") return parseLine(line);
	return line.split(delimiter).map((field) => field.trim().replace(/^"|"$/g, ""));
}
function detectDelimiter(text) {
	const firstLine = text.split(/\r\n|\r|\n/).find((line) => line.trim().length > 0);
	if (!firstLine) return ",";
	return (firstLine.match(/\t/g) ?? []).length > (firstLine.match(/,/g) ?? []).length ? "	" : ",";
}
function parseDelimitedRows(text, delimiter = detectDelimiter(text)) {
	const lines = text.split(/\r\n|\r|\n/).map((line) => line.trim()).filter((line) => line.length > 0);
	if (lines.length === 0) throw new InvalidCsvError("Delimited text has no rows");
	const headers = parseDelimitedLine(lines[0], delimiter).map((header) => header.trim());
	return lines.slice(1).map((line) => {
		const values = parseDelimitedLine(line, delimiter);
		const row = {};
		headers.forEach((header, index) => {
			row[header] = values[index]?.trim() ?? "";
		});
		return row;
	});
}
function parseCsvRows(csvText) {
	return parseDelimitedRows(csvText, detectDelimiter(csvText));
}
//#endregion
export { parseDelimitedRows as n, parseCsvRows as t };
