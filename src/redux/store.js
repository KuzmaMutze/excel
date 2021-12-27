import { initialState } from './initialState';
import { rootReducer } from './rootReducer';
import { createStore } from './../core/createStore';

export const store = createStore(rootReducer, initialState);
