import createSagaMiddleware from '@redux-saga/core';
import { persistStore } from 'redux-persist';
import { combineReducers, configureStore, Reducer, Store } from '@reduxjs/toolkit';

import rootSaga from './rootSaga';
import persistConfig from './persistConfig';
import CounterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  counter: CounterSlice,
  login: loginSlice,
});

export const store: Store = configureStore({
  reducer: combineReducers(persistConfig) as Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
