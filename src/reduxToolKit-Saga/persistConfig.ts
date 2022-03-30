import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';

const authPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'auth',
  storage,
};

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'counter',
  storage,
};

export default {
  counter: persistReducer(counterPersistConfig, counterSlice),
  login: persistReducer(authPersistConfig, loginSlice),
};
