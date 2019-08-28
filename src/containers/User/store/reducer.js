import {
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE
} from './actions';

export const initialState = {
  created: null,
  id: null,
  karma: null,
  submitted: [],
  isLoading: false,
  error: null
};

export default function topStories(state = initialState, action) {
  switch (action.type) {
    // User Details
    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload.userDetails,
        isLoading: false,
        error: null
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
