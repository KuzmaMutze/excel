import { $ } from '@core/Dom';
import { shouldResize } from './table.functions.js';

export function resizeHandler($root, event) {
    return new Promise((resolve) => {
        let value;
        const $resizer = $(event.target);
        const $parent = $resizer.closest("[data-type='resizable']");
        const cords = $parent.getCords();
        const type = shouldResize(event);

        const cells = $root.findAll(`[data-col='${$parent.data.col}']`);

        $resizer.css({
            opacity: 1,
        });

        if (type === 'col') {
            event.target.classList.add('col-resize__active');
        } else {
            event.target.classList.add('row-resize__active');
        }

        document.onmousemove = (e) => {
            if (type === 'col') {
                const delta = e.pageX - cords.right;
                value = cords.width + delta;

                $resizer.css({
                    right: -delta - 3 + 'px',
                });
            } else {
                const delta = e.pageY - cords.bottom;
                value = cords.height + delta;

                $resizer.css({
                    bottom: -delta - 3 + 'px',
                });
            }
        };

        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;

            if (type === 'col') {
                event.target.classList.remove('col-resize__active');
                $resizer.css({
                    opacity: 0,
                    right: '-2px',
                });
                cells.forEach((cell) => (cell.style.width = value + 'px'));
            } else {
                event.target.classList.remove('row-resize__active');
                $resizer.css({
                    opacity: 0,
                    bottom: '-2px',
                });
                $parent.css({ height: value + 'px' });
            }

            resolve({
                value,
                type,
                id: $parent.data[type],
            });
        };
    });
}
