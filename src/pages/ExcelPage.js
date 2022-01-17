import { Page } from '@core/Page';
import { Excel } from '@/components/Excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/Formula/Formula';
import { Table } from '@/components/Table/Table';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { storage } from '@/utils/storage';
import { debounse } from '@/utils/debounse';
import { normilizeInitialState } from './../redux/initialState';
import { rootReducer } from './../redux/rootReducer';
import { createStore } from '@core/createStore';

function storageName(param) {
    return 'excel:' + param;
}

export class ExcelPage extends Page {
    getRoot() {
        const state = storage(storageName(this.params));
        const store = createStore(rootReducer, normilizeInitialState(state));

        const stateListener = debounse((state) => {
            storage(storageName(this.params), state);
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
