import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const counterPersistConfig = {
  key: 'counter',
  storage,
};

export default {
  counter: persistReducer(counterPersistConfig, counterSlice),
  login: persistReducer(authPersistConfig, loginSlice),
};
