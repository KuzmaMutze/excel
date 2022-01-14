import { ExcelComponent } from '@core/ExcelComponent';
import { defualtNameTable } from '../../constants';
import { $ } from '../../core/Dom';
import { changeNameTable } from '../../redux/rootReducer';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options,
        });
    }

    onInput(event) {
        this.$dispatch(changeNameTable(event.target.value));
    }

    toHTML() {
        const { nameTable } = this.store.getState();

        return `
			<input type="text" class="input" value="${nameTable || defualtNameTable}" />

			<div>
	
			<div class="button">
				<i class="material-icons">delete</i>
			</div>
	
			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>
	
			</div>
		`;
    }
}
