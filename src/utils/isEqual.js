export function isEqual(a, b) {
    if (typeof a === 'object' && typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}
