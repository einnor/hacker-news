import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_TOP_SHOW_IDS_REQUEST,
  getTopShowIdsSuccess,
  getTopShowIdsFailure,
  GET_TOP_SHOW_ITEMS_REQUEST,
  getTopShowItemsRequest,
  getTopShowItemsSuccess,
  getTopShowItemsFailure
} from './actions';

import Api from '../../../services/Api';

export default function* topShowsWatcher() {
  yield takeLatest(GET_TOP_SHOW_IDS_REQUEST, getTopShowsIds);
  yield takeLatest(GET_TOP_SHOW_ITEMS_REQUEST, getTopShowsItems);
}

export function* getTopShowsIds() {
  try {
    const response = yield call(Api.fetchTopShowsIds);
    yield put(getTopShowIdsSuccess(response.data));
    // Get the first 10 items the first time this saga is called
    yield put(getTopShowItemsRequest(response.data.slice(0, 10)));
  } catch (error) {
    yield put(getTopShowIdsFailure(error));
  }
}
export function* getTopShowsItems(action) {
  try {
    const { ids } = action.payload;
    const response = yield call(Api.fetchTopShowsItems, ids);
    yield put(getTopShowItemsSuccess(response));
  } catch (error) {
    yield put(getTopShowItemsFailure(error));
  }
}
