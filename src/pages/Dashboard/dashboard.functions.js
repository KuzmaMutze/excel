import { storage } from '../../utils/storage';

export function toHTML(key, i) {
    const { title, openedDate } = storage(key);
    const id = key.replace(/excel:/g, '');
    const date = new Date(openedDate).toLocaleDateString().replaceAll('/', '.');

    return `
        <li class="db__record">
            <a href="#excel/${id}">${title || `Новая таблица ${i + 1}`}</a>
            <strong>${date}</strong>
        </li>
    `;
}

// excel:123
// excel:1234567
function getAllKeys() {
    const keys = [];
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);

        if (!key.includes('excel')) {
            continue;
        }

        keys.push(key);
    }

    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if (!keys.length) {
        return '<p>Вы пока не создали ни одной таблицы</p>';
    }

    return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
    `;
}
