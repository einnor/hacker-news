import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getTopStoryIdsSuccess,
  getTopStoryIdsFailure,
  GET_TOP_STORY_IDS_REQUEST,
  getTopStoryItemsSuccess,
  getTopStoryItemsFailure,
  GET_TOP_STORY_ITEMS_REQUEST,
  getTopStoryItemsRequest
} from './actions';

import Api from '../../../services/Api';

export default function* topStoriesWatcher() {
  yield takeLatest(GET_TOP_STORY_IDS_REQUEST, getTopStoryIds);
  yield takeLatest(GET_TOP_STORY_ITEMS_REQUEST, getTopStoryItems);
}

export function* getTopStoryIds() {
  try {
    const response = yield call(Api.fetchTopStoryIds);

    yield put(getTopStoryIdsSuccess(response.data));

    // Get the first 10 items the first time this saga is called
    yield put(getTopStoryItemsRequest(response.data.slice(0, 10)));
  } catch (error) {
    yield put(getTopStoryIdsFailure(error));
  }
}

export function* getTopStoryItems(action) {
  try {
    const { ids } = action.payload;
    const response = yield call(Api.fetchTopStoryItems, ids);

    yield put(getTopStoryItemsSuccess(response));
  } catch (error) {
    yield put(getTopStoryItemsFailure(error));
  }
}
