import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer, { SessionState } from './reducers';

export const initStore = (initialState: SessionState = {}) => {
    return createStore(reducer, initialState, applyMiddleware(thunk));
};
