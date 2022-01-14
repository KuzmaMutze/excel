import { camelCaseToDash } from './camelCaseToDash';

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map((key) => camelCaseToDash(`${key}: ${styles[key]}`))
        .join(';');
}
