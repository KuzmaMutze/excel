class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }

        return this.$el.outerHTML.trim();
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }

        if (this.$el.tageName === 'input') {
            return this.$el.value;
        }

        return this.$el.textContent;
    }

    clear() {
        this.html('');
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    attr(name, value) {
        if (value || value === '') {
            this.$el.setAttribute(name, value);
            return this;
        }

        return this.$el.getAttribute(name);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }

        return this;
    }

    get data() {
        return this.$el.dataset;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCords() {
        return this.$el.getBoundingClientRect();
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object.keys(styles).forEach((key) => (this.$el.style[key] = styles[key]));
    }

    getStyles(styles = []) {
        return styles.reduce((res, style) => {
            res[style] = this.$el.style[style];
            return res;
        }, {});
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1],
            };
        }
        return this.data.id;
    }

    focus() {
        this.$el.focus();
        return this;
    }

    addClass(className) {
        this.$el.classList.add(className);
    }

    removeClass(className) {
        this.$el.classList.remove(className);
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tageName, classes = '') => {
    const el = document.createElement(tageName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
