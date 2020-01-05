import { createStore, applyMiddleware, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { MakeStoreOptions } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { MintState, defaultState } from './types';
import reducer from './reducers';

const makeConfiguredStore = (reducer: Reducer, initialState: MintState = defaultState) =>
  createStore(reducer, initialState, applyMiddleware(thunk));

export const initStore = (initialState: MintState, { isServer, req, debug, storeKey }: MakeStoreOptions) => {
  if (isServer) {
    return makeConfiguredStore(reducer, initialState);
  }
  const persistConfig = {
    key: 'mint',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store: Store & { __persistor?: any } = makeConfiguredStore(persistedReducer, initialState);

  store.__persistor = persistStore(store);

  return store;
};
