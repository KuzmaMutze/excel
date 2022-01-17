import { clone } from '../utils/clone';
import { defualtNameTable, defualtStyles } from './../constants';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    nameTable: defualtNameTable,
    currentStyles: defualtStyles,
    openedData: new Date().toJSON(),
};

const normalize = (state) => ({
    ...state,
    currentStyles: defualtStyles,
    currentText: '',
});

export function normilizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}
