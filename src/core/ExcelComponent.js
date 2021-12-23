import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
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
    $dispatch(event, ...args) {
        this.observer.dispatch(event, ...args);
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
