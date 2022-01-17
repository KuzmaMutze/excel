export const TABLE_RESIZE = 'TABLE_RESIZE';
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const APPLY_STYLE = 'APPLY_STYLE';
export const CHANGE_STYLES = 'CHANGE_STYLES';
export const CHANGE_NAME_TABLE = 'CHANGE_NAME_TABLE';
export const UPDATE_DATE = 'UPDATE_DATE';

export function rootReducer(state, action) {
    let field;
    let val;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState';
            return {
                ...state,
                [field]: value(state, field, action),
            };
        case CHANGE_TEXT:
            field = 'dataState';
            return {
                ...state,
                currentText: action.data.value,
                [field]: value(state, field, action),
            };
        case CHANGE_STYLES:
            return {
                ...state,
                currentStyles: action.data,
            };
        case CHANGE_NAME_TABLE:
            return {
                ...state,
                nameTable: action.data,
            };
        case UPDATE_DATE:
            return {
                ...state,
                openedDate: new Date().toJSON(),
            };
        case APPLY_STYLE:
            field = 'stylesState';
            val = state[field] || {};
            action.data.ids.forEach((id) => {
                val[id] = { ...val[id], ...action.data.value };
            });
            return {
                ...state,
                [field]: val,
                currentStyles: { ...state.currentStyles, ...action.data.value },
            };
        default:
            return state;
    }
}

export const tableResize = (data) => ({
    type: TABLE_RESIZE,
    data,
});

export const changeText = (data) => ({
    type: CHANGE_TEXT,
    data,
});

export const applyStyle = (data) => ({
    type: APPLY_STYLE,
    data,
});

export const changeStyles = (data) => ({
    type: CHANGE_STYLES,
    data,
});

export const changeNameTable = (data) => ({
    type: CHANGE_NAME_TABLE,
    data,
});

export const updateDate = () => ({
    type: UPDATE_DATE,
});
// Helpers

function value(state, field, action) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}
