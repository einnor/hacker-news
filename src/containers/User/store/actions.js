// Action Types
export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE= 'GET_USER_DETAILS_FAILURE';

export const GET_USER_SUBMISSIONS_REQUEST = 'GET_USER_SUBMISSIONS_REQUEST';
export const GET_USER_SUBMISSIONS_SUCCESS = 'GET_USER_SUBMISSIONS_SUCCESS';
export const GET_USER_SUBMISSIONS_FAILURE= 'GET_USER_SUBMISSIONS_FAILURE';

// Actions
// User Details
export function getUserDetailsRequest(by) {
  return {
    type: GET_USER_DETAILS_REQUEST,
    payload: {by}
  };
}

export function getUserDetailsSuccess(userDetails) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    payload: {userDetails}
  };
}

export function getUserDetailsFailure(error) {
  return {
    type: GET_USER_DETAILS_FAILURE,
    payload: {error}
  };
}

// User Submissions
export function getUserSubmissionsRequest(ids) {
  return {
    type: GET_USER_SUBMISSIONS_REQUEST,
    payload: {ids}
  };
}

export function getUserSubmissionsSuccess(submissions) {
  return {
    type: GET_USER_SUBMISSIONS_SUCCESS,
    payload: {submissions}
  };
}

export function getUserSubmissionsFailure(error) {
  return {
    type: GET_USER_SUBMISSIONS_FAILURE,
    payload: {error}
  };
}
