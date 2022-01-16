export function parse(value = '') {
    if (value.startsWith('=')) {
        try {
            return eval(value.slice(1));
        } catch (error) {
            console.error(error);
            return value;
        }
    }
    return value;
}
