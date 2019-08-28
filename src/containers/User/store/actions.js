// Action Types
export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE= 'GET_USER_DETAILS_FAILURE';

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
