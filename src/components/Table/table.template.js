const CODES = {
	A: 65,
	Z: 90
}

function createRow(contentData, contentInfo = "") {
	return `
		<div class="row">
			<div class="row-info">${contentInfo}</div>
			<div class="row-data">${contentData}</div>
		</div>
	`
}

function createCol(col) {
	return `
		<div class="column">
			${col}
		</div>
	`
}

function createCell(cell) {
	return `
		<div class="cell" contenteditable>${cell}</div>
	`
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	
	const cols = new Array(colsCount)
		.fill("")
		.map((_, i) => String.fromCharCode(CODES.A + i))
		.map(createCol)
		.join("")

	rows.push(createRow(cols))

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill("")
			// .map((cell, index) => String.fromCharCode(CODES.A + index) + (i + 1))
			.map(createCell)
			.join("")
		
		rows.push(createRow(cells, i + 1))
	}

	return rows.join("")
}