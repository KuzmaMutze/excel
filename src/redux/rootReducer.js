export const TABLE_RESIZE = 'TABLE_RESIZE';
export const CHANGE_TEXT = 'CHANGE_TEXT';

export function rootReducer(state, action) {
    let prevState;
    let field;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState';
            prevState = state[field] || {};
            prevState[action.data.id] = action.data.value;

            return {
                ...state,
                [field]: prevState,
            };
        case CHANGE_TEXT:
            prevState = state['dataState'] || {};
            prevState[action.data.id] = action.data.text;
            return {
                ...state,
                currentText: action.data.text,
                dataState: prevState,
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
