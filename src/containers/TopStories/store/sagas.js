import {takeLatest, call, put} from 'redux-saga/effects';
import {getTopStoryIdsSuccess, getTopStoryIdsFailure, GET_TOP_STORY_IDS_REQUEST} from './actions';

import Api from '../../../services/Api';

export default function* topStoriesWatcher() {
  yield takeLatest(GET_TOP_STORY_IDS_REQUEST, getTopStoryIds);
}

export function* getTopStoryIds() {
  try {
    const response = yield call(Api.fetchTopStoryIds);

    yield put(getTopStoryIdsSuccess(response.data));
  } catch(error) {
    yield put(getTopStoryIdsFailure(error));
  }
}
