import { Page } from '@core/Page';
import { Excel } from '@/components/Excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/Formula/Formula';
import { Table } from '@/components/Table/Table';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { normilizeInitialState } from './../redux/initialState';
import { rootReducer } from './../redux/rootReducer';
import { createStore } from '@core/store/createStore';
import { LocalStorageClient } from '../utils/LocalStorageClient';
import { StateProcessor } from '../utils/StateProcessor';

export class ExcelPage extends Page {
    constructor(param) {
        super(param);

        this.storeSub = null;
        this.processor = new StateProcessor(new LocalStorageClient(this.params));
    }

    async getRoot() {
        const state = await this.processor.get();
        const store = createStore(rootReducer, normilizeInitialState(state));

        this.storeSub = store.subscribe(this.processor.listen);

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
        this.storeSub.unsubscribe();
    }
}
