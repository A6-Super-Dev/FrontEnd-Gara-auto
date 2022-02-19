import { all } from 'redux-saga/effects';
import CounterSaga from './common/Counter/CounterSaga';

export default function* rootSaga() {
  console.log('root saga running');
  yield all([CounterSaga()]);
}
