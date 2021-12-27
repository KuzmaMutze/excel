export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.clear();
        this.group.push($el);
        this.current = $el;
        $el.focus().addClass(TableSelection.className);
    }

    selectGroup(group) {
        this.clear();
        this.group = group;

        this.group.forEach(($cell) => $cell.addClass(TableSelection.className));
    }

    applyStyle(style) {
        this.group.forEach(($el) => $el.css(style));
    }

    clear() {
        this.group.forEach(($cell) => $cell.removeClass(TableSelection.className));
    }
}
