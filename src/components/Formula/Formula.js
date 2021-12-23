import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/Dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
        });
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');
        super.$sub('table:select', ($next) => {
            const text = $next.text();

            this.$formula.text(text);
        });

        super.$sub('table:input', ($cell) => {
            const text = $cell.text();

            this.$formula.text(text);
        });
    }

    onInput(event) {
        this.$dispatch('formula:input', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        const { key } = event;

        if (keys.includes(key)) {
            event.preventDefault();
            this.$dispatch('formula:focus');
        }
    }

    toHTML() {
        return `
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`;
    }
}
