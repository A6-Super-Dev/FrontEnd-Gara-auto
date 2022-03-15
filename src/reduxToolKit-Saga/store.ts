import createSagaMiddleware from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import rootSaga from './rootsaga';
import { persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import persistConfig from './persistConfig';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: combineReducers(persistConfig),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
