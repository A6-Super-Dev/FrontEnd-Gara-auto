import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';
import { increment, incrementSaga, incrementSagaSuccess } from './CounterSlice';

function* increaseSaga(action: PayloadAction<number>) {
  console.log(`action.payload from increaseSaga`);
  yield put(incrementSaga());
  yield put(incrementSagaSuccess(action.payload));
}

export default function* CounterSaga() {
  console.log(`CounterSaga`);
  yield all([takeLatest(increment.toString(), increaseSaga)]);
}
