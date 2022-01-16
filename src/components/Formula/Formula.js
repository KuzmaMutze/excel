import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/Dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options,
        });
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');

        super.$sub('table:select', ($next) => {
            this.$formula.text($next.data.value);
        });
    }

    storeChanged({ currentText }) {
        this.$formula.text(currentText);
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        const { key } = event;

        if (keys.includes(key)) {
            event.preventDefault();
            this.$emit('formula:focus');
        }
    }

    toHTML() {
        return `
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`;
    }
}
