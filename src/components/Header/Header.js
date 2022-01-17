import { ExcelComponent } from '@core/ExcelComponent';
import { defualtNameTable } from '../../constants';
import { $ } from '../../core/Dom';
import { ActiveRoute } from '../../core/routers/ActiveRoute';
import { changeNameTable } from '../../redux/rootReducer';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        });
    }

    onClick(event) {
        const isDelete = $(event.target).data.value === 'delete';

        if (isDelete) {
            const decision = confirm('Вы действительно хотите удалить эту таблицу?');
            decision && localStorage.removeItem(`excel:${ActiveRoute.param}`);
        }

        ActiveRoute.navigate('');
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
				<i data-value="delete" class="material-icons">delete</i>
			</div>
	
			<div class="button">
				<i data-value="exit" class="material-icons">exit_to_app</i>
			</div>
	
			</div>
		`;
    }
}
