import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getTopAskIdFailure,
  getTopAskIdSuccess,
  GET_TOP_ASK_ID_REQUEST
} from './actions';

import Api from '../../../services/Api';

export default function* topAsksWatcher() {
  yield takeLatest(GET_TOP_ASK_ID_REQUEST, getTopAskIds);
}

export function* getTopAskIds() {
  try {
    const response = yield call(Api.fetchTopAskIds);
    console.log(response.data, 'response');
    yield put(getTopAskIdSuccess(response.data));
  } catch (error) {
    yield put(getTopAskIdFailure(error));
  }
}
