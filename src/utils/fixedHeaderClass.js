export function styleHeaderRowsHandler(contentInfo) {
    if (!contentInfo) {
        return 'header-rows';
    }

    if (contentInfo === 1) {
        return 'header-rows-mt';
    }

    return '';
}
