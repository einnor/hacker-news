import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getTopAskIdFailure,
  getTopAskIdSuccess,
  GET_TOP_ASK_ID_REQUEST,
  getTopAskItemsSuccess,
  getTopAskItemsFailure,
  GET_TOP_ASK_ITEMS_REQUEST,
  getTopAskItemsRequest
} from './actions';

import Api from '../../../services/Api';

export default function* topAsksWatcher() {
  yield takeLatest(GET_TOP_ASK_ID_REQUEST, getTopAskIds);
  yield takeLatest(GET_TOP_ASK_ITEMS_REQUEST, getToAskItems);
}

export function* getTopAskIds() {
  try {
    const response = yield call(Api.fetchTopAskIds);
    yield put(getTopAskIdSuccess(response.data));

    // Get the first 10 items the first time this saga is called
    yield put(getTopAskItemsRequest(response.data.slice(0, 10)));
  } catch (error) {
    yield put(getTopAskIdFailure(error));
  }
}

export function* getToAskItems(action) {
  try {
    const { ids } = action.payload;
    const response = yield call(Api.fetchTopAsksItems, ids);
    yield put(getTopAskItemsSuccess(response));
  } catch (error) {
    yield put(getTopAskItemsFailure(error));
  }
}
