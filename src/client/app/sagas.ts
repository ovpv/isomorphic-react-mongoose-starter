import { all, fork } from 'redux-saga/effects';
import homeSaga from '../pages/home/homeSaga';

export default function* rootSaga() {
  yield all([fork(homeSaga)]);
}
