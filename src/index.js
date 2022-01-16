import '@/scss/index.scss';

import { Excel } from '@/components/Excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/Formula/Formula';
import { Table } from '@/components/Table/Table';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { storage } from './utils/storage';
import { store } from './redux/store';
import { debounse } from './utils/debounse';

const stateListener = debounse((state) => {
    console.log(state);
    storage('excal-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store,
});

excel.render();
