import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUserDetailsSuccess,
  getUserDetailsFailure,
  GET_USER_DETAILS_REQUEST,
  getUserSubmissionsRequest,
  getUserSubmissionsSuccess,
  getUserSubmissionsFailure,
  GET_USER_SUBMISSIONS_REQUEST
} from './actions';

import Api from '../../../services/Api';

export default function* usersWatcher() {
  yield takeLatest(GET_USER_DETAILS_REQUEST, getUserDetails);
  yield takeLatest(GET_USER_SUBMISSIONS_REQUEST, getUserSubmissions);
}

export function* getUserDetails(action) {
  try {
    const { by } = action.payload;
    const response = yield call(Api.fetchUserDetails, by);

    yield put(getUserDetailsSuccess(response.data));

    // Get the first 10 submissions the first time this saga is called, is submitted is not null
    if (response.data.submitted) {
      yield put(
        getUserSubmissionsRequest(response.data.submitted.slice(0, 10))
      );
    }
  } catch (error) {
    yield put(getUserDetailsFailure(error));
  }
}

export function* getUserSubmissions(action) {
  try {
    const { ids } = action.payload;
    const response = yield call(Api.fetchStoryItems, ids);

    yield put(getUserSubmissionsSuccess(response));
  } catch (error) {
    yield put(getUserSubmissionsFailure(error));
  }
}
