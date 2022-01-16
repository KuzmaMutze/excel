import { Page } from '@core/Page';
import { Excel } from '@/components/Excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/Formula/Formula';
import { Table } from '@/components/Table/Table';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { storage } from '@/utils/storage';
import { store } from '@/redux/store';
import { debounse } from '@/utils/debounse';

export class ExcelPage extends Page {
    getRoot() {
        const stateListener = debounse((state) => {
            console.log(state);
            storage('excal-state', state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store,
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
