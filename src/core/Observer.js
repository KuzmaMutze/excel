export class Observer {
    constructor() {
        this.listeners = {};
    }

    // Уведомлеяем слушателей если они есть
    dispatch(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });

        return true;
    }

    // Подписываемся на уведомления
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);

        return () => {
            this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
        };
    }
}
