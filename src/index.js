import '@/scss/index.scss';

import { Excel } from '@/components/Excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/Formula/Formula';
import { Table } from '@/components/Table/Table';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { storage } from './utils/storage';
import { store } from './redux/store';

store.subscribe((state) => {
    console.log(state);
    storage('excal-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store,
});

excel.render();
