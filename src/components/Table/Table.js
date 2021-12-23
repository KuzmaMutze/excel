import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './resizeHandler.js';
import { TableSelection } from './TableSelection';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions.js';
import { $ } from '@core/Dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        });
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');

        this.selectCell($cell);

        this.$sub('formula:input', (text) => {
            this.selection.current.text(text);
            console.log('Table from formula', text);
        });

        this.$sub('formula:focus', () => {
            this.selection.current.focus();
        });
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'ArrowDown'];
        const { key } = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        }

        if (isCell(event)) {
            const $cell = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix($cell, this.selection.current).map((id) =>
                    this.$root.find(`[data-id="${id}"]`),
                );
                this.selection.selectGroup($cells);
            } else {
                this.selectCell($cell);
            }
        }
    }

    onInput(event) {
        this.$dispatch('table:input', $(event.target));
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$dispatch('table:select', $cell);
    }

    destroy() {
        super.destroy();
    }

    toHTML() {
        return createTable();
    }
}
