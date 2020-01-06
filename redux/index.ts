import { createStore, applyMiddleware, Reducer, Store, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { MakeStoreOptions } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { MintState, defaultState } from './types';

import indexPageReducer from './reducers/indexPage';
import interviewPageReducer from './reducers/interviewPage';
import usageLoggingReducer from './reducers/usageLogging';

const makeConfiguredStore = (reducer: Reducer, initialState: MintState = defaultState) =>
  createStore(reducer, initialState, applyMiddleware(thunk));

export const initStore = (initialState: MintState, { isServer }: MakeStoreOptions) => {
  const rootReducers = combineReducers({
    indexPage: indexPageReducer,
    interviewPage: interviewPageReducer,
    usageLogging: usageLoggingReducer
  });

  if (isServer) {
    return makeConfiguredStore(rootReducers, initialState);
  }
  const persistConfig = {
    key: 'mint',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const store: Store & { __persistor?: any } = makeConfiguredStore(persistedReducer, initialState);

  store.__persistor = persistStore(store);

  return store;
};
