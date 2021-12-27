const CODES = {
    A: 65,
    Z: 90,
};

function getWidthStyle(state, index) {
    if (state[index]) {
        return `style='width: ${state[index] + 'px'};'`;
    }

    return '';
}

function getHeightStyle(state, index) {
    if (state[index]) {
        return `style='height: ${state[index] + 'px'};'`;
    }

    return '';
}

function createRow(contentData, contentInfo = '', state = {}) {
    const resizer = `<div class="row-resize" data-resize="row"></div>`;
    const style = getHeightStyle(state, contentInfo);
    return `
		<div ${style} class="row" data-type='resizable' data-row=${contentInfo}>
			<div class="row-info">
				${contentInfo}
				${contentInfo && resizer}
			</div>
			<div class="row-data" data-row=${contentInfo}>
				${contentData}
			</div>
		</div>
	`;
}

function createCol(col, index, style) {
    return `
		<div ${style} class="column" data-type="resizable" data-col=${index}>
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createCell({ dataState, colState }, row) {
    return function (_, i) {
        const style = getWidthStyle(colState, i);
        const id = `${row}:${i}`;
        const value = dataState[id] || '';

        return `
			<div class="cell" ${style} contenteditable data-col=${i} data-id=${id}>
                ${value}
            </div>
		`;
    };
}

export function withWidthFrom(state) {
    return function (col, i) {
        const style = getWidthStyle(state.colState, i);
        return createCol(col, i, style);
    };
}

export function createTable(rowsCount = 30, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map((_, i) => String.fromCharCode(CODES.A + i))
        .map(withWidthFrom(state))
        .join('');

    rows.push(createRow(cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill('').map(createCell(state, row)).join('');

        rows.push(createRow(cells, row + 1, state.rowState));
    }

    return rows.join('');
}
