import { ExcelStateComponent } from '../../core/ExcelStateComponent.js';
import { createToolbar } from './toolbar.tamplate.js';
import { $ } from './../../core/Dom';
import { defualtStyles } from '../../constants.js';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options,
        });
    }

    prepare() {
        this.initState(defualtStyles);
    }

    get template() {
        return createToolbar(this.state);
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles);
    }

    onClick(e) {
        const $target = $(e.target);
        $target.addClass('active');
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            this.$emit('toolbar:applyStyle', value);

            const key = Object.keys(value)[0];
            this.setState({ [key]: value[key] });
        }
    }

    toHTML() {
        return this.template;
    }
}
