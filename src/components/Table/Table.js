import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './resizeHandler.js';
import { TableSelection } from './TableSelection';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions.js';
import { $ } from '@core/Dom';
import { defualtStyles } from '../../constants';
import { applyStyle, changeStyles, changeText, tableResize } from '../../redux/rootReducer';
import { parse } from '../../core/parse';

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
            this.selection.current.attr('data-value', text).text(parse(text));
            this.updateTextInStore(text);
        });

        this.$sub('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value);
            this.$dispatch(
                applyStyle({
                    value,
                    ids: this.selection.selectedIds,
                }),
            );
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

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(tableResize(data));
        } catch (e) {
            console.error(e);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
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

    updateTextInStore(text) {
        this.$dispatch(
            changeText({
                id: this.selection.current.id(),
                value: text,
            }),
        );
    }

    onInput(event) {
        const text = $(event.target).text();
        $(event.target).attr('data-value', text);

        this.updateTextInStore(text);
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);

        const styles = $cell.getStyles(Object.keys(defualtStyles));
        this.$dispatch(changeStyles(styles));
    }

    destroy() {
        super.destroy();
    }

    toHTML() {
        return createTable(undefined, this.store.getState());
    }
}
