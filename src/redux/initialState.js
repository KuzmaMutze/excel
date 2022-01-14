import { storage } from '../utils/storage';
import { defualtStyles } from './../constants';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defualtStyles,
};

const normalize = (state) => ({
    ...state,
    currentStyles: defualtStyles,
    currentText: '',
});

export const initialState = storage('excal-state')
    ? normalize(storage('excal-state'))
    : defaultState;
