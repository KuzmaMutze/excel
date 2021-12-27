import { storage } from '../utils/storage';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    currentText: '',
};

export const initialState = storage('excal-state') ? storage('excal-state') : defaultState;
