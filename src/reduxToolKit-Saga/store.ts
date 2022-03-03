import createSagaMiddleware from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import rootSaga from './rootsaga';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';

const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: 'auth',
  storage,
};

const counterPersistConfig = {
  key: 'counter',
  storage,
};

export const store = configureStore({
  reducer: combineReducers({
    counter: persistReducer(counterPersistConfig, counterSlice),
    login: persistReducer(authPersistConfig, loginSlice),
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
