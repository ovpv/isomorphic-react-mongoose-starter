import { put, takeEvery, call } from 'redux-saga/effects';

function* fetchHomeData({ payload }: any) {
  //   const response = yield call(apiMethod, param1, param2);
  //   yield put(updateHomeState(response));
}

export default function* () {
  yield takeEvery('HOME_FETCH_ACTION', fetchHomeData);
}
