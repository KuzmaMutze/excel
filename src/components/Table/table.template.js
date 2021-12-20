const CODES = {
	A: 65,
	Z: 90
}

function createRow(contentData, contentInfo = "") {
	const resizer = `<div class="row-resize" data-resize="row"></div>`
	
	return `
		<div class="row" data-type='resizable' data-row=${contentInfo}>
			<div class="row-info">
				${contentInfo}
				${contentInfo && resizer}
			</div>
			<div class="row-data" data-row=${contentInfo}>
				${contentData}
			</div>
		</div>
	`
}

function createCol(col, index) {
	return `
		<div class="column" data-type="resizable" data-col=${index}>
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createCell(cell, index) {
	return `
		<div class="cell" contenteditable data-col="${index}">${cell}</div>
	`
}

export function createTable(rowsCount = 30) {
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