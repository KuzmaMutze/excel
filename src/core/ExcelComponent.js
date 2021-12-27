import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.store = options.store;
        this.name = options.name || '';
        this.subscribe = options.subscribe || [];
        this.observer = options.observer;
        this.unsubscribers = [];

        this.prepare();
    }

    // setup component before init
    prepare() {}

    // return template component
    toHTML() {
        return '';
    }

    // notification listenir about event
    $emit(event, ...args) {
        this.observer.dispatch(event, ...args);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    // Here are only filds that we subscribed
    storeChanged() {}

    isWatching(key) {
        this.subscribe.includes(key);
    }

    // subscribe event
    $sub(event, fn) {
        const unsub = this.observer.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    // init component
    // add DOM listeners
    init() {
        this.initDOMListeners();
    }

    // del component
    // clear listeners
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.push((unsub) => unsub());
    }
}
