import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUserDetailsSuccess,
  getUserDetailsFailure,
  GET_USER_DETAILS_REQUEST,
} from './actions';

import Api from '../../../services/Api';

export default function* usersWatcher() {
  yield takeLatest(GET_USER_DETAILS_REQUEST, getUserDetails);
}

export function* getUserDetails(action) {
  try {
    const {by} = action.payload;
    const response = yield call(Api.fetchUserDetails, by);

    yield put(getUserDetailsSuccess(response.data));
  } catch (error) {
    yield put(getUserDetailsFailure(error));
  }
}

