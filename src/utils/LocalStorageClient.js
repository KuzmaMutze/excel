import { storage } from '@/utils/storage';

function storageName(param) {
    return 'excel:' + param;
}

export class LocalStorageClient {
    constructor(name) {
        this.name = storageName(name);
    }

    save(state) {
        storage(this.name, state);
        return new Promise.resolve();
    }

    get() {
        return new Promise((resolve) => {
            const state = storage(this.name);

            setTimeout(() => {
                resolve(state);
            }, 2000);
        });
    }
}