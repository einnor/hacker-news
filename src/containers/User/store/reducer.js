import {
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,

  GET_USER_SUBMISSIONS_REQUEST,
  GET_USER_SUBMISSIONS_SUCCESS,
  GET_USER_SUBMISSIONS_FAILURE,
} from './actions';

export const initialState = {
  created: null,
  id: null,
  karma: null,
  submitted: [],
  submissions: [],
  about: null,
  isLoading: false,
  isLoadingSubmissions: false,
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

      // User submissions
      case GET_USER_SUBMISSIONS_REQUEST:
      return {
        ...state,
        isLoadingSubmissions: true
      };
    case GET_USER_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        submissions: action.payload.submissions,
        isLoadingSubmissions: false,
        error: null
      };
    case GET_USER_SUBMISSIONS_FAILURE:
      return {
        ...state,
        isLoadingSubmissions: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
