import { defualtStyles } from '../../constants';
import { parse } from '../../core/parse';
import { styleHeaderRowsHandler } from '../../utils/fixedHeaderClass';
import { toInlineStyles } from '../../utils/toInlineStyles';

const CODES = {
    A: 65,
    Z: 90,
};

function getWidthStyle(state, index) {
    if (state[index]) {
        return `width: ${state[index] + 'px'};`;
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
    const fixedHeaderClass = styleHeaderRowsHandler(contentInfo);
    const resizer = `<div class="row-resize" data-resize="row"></div>`;
    const style = getHeightStyle(state, contentInfo);

    return `
		<div ${style} class="row ${fixedHeaderClass}" data-type='resizable' data-row=${contentInfo}>
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
		<div style="${style}" class="column" data-type="resizable" data-col=${index}>
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createCell({ dataState, colState, stylesState }, row) {
    return function (_, i) {
        const width = getWidthStyle(colState, i);
        const id = `${row}:${i}`;
        const value = dataState[id] || '';
        const styles = toInlineStyles({
            ...defualtStyles,
            ...stylesState[id],
        });

        return `
			<div 
                class="cell"
                style="${width}
                ${styles};"
                contenteditable
                data-col=${i}
                data-id=${id}
                data-value=${value || ''}
            >
                ${parse(value)}
            </div>
		`;
    };
}

export function withWidthFrom(state) {
    return function (col, i) {
        const width = getWidthStyle(state.colState, i);
        return createCol(col, i, width);
    };
}

export function createTable(rowsCount = 50, state = {}) {
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
