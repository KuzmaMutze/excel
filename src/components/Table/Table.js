import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './resizeHandler.js';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown'],
        });
    }

    onClick(event) {}

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(this.$root, event);
        }
    }

    toHTML() {
        return createTable();
    }
}
