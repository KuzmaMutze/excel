import { $ } from '@core/Dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest("[data-type='resizable']");
    const cords = $parent.getCords();

    const cells = $root.findAll(`[data-col='${$parent.data.col}']`);

    $resizer.css({
        opacity: 1,
    });

    if (event.target.dataset.resize === 'col') {
        event.target.classList.add('col-resize__active');
    } else {
        event.target.classList.add('row-resize__active');
    }

    document.onmousemove = (e) => {
        if (event.target.dataset.resize === 'col') {
            const delta = e.pageX - cords.right;

            $resizer.css({
                right: -delta - 3 + 'px',
            });
        } else {
            const delta = e.pageY - cords.bottom;

            $resizer.css({
                bottom: -delta - 3 + 'px',
            });
        }
    };

    document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (event.target.dataset.resize === 'col') {
            const delta = e.pageX - cords.right;
            const value = cords.width + delta;

            event.target.classList.remove('col-resize__active');
            $resizer.css({
                opacity: 0,
                right: '-2px',
            });

            cells.forEach((cell) => (cell.style.width = value + 'px'));
        } else {
            const delta = e.pageY - cords.bottom;
            const value = cords.height + delta;

            event.target.classList.remove('row-resize__active');
            $resizer.css({
                opacity: 0,
                bottom: '-2px',
            });
            $parent.css({ height: value + 'px' });
        }
    };
}
