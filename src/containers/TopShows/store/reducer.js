import {
  GET_TOP_SHOW_IDS_REQUEST,
  GET_TOP_SHOW_IDS_SUCCESS,
  GET_TOP_SHOW_IDS_FAILURE,
  GET_TOP_SHOW_ITEMS_REQUEST,
  GET_TOP_SHOW_ITEMS_SUCCESS,
  GET_TOP_SHOW_ITEMS_FAILURE
} from './actions';

export const initialState = {
  ids: [],
  isLoading: false,
  item: [],
  isLoadingMore: false,
  error: null
};
const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_SHOW_IDS_REQUEST:
      return { ...state, isLoading: true };

    case GET_TOP_SHOW_IDS_SUCCESS:
      return {
        ...state,
        ids: action.payload.ids,
        isLoading: false,
        error: null
      };

    case GET_TOP_SHOW_IDS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };

    // ITEMS
    case GET_TOP_SHOW_ITEMS_REQUEST:
      return {
        ...state,
        isLoadingMore: true
      };
    case GET_TOP_SHOW_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        isLoadingMore: false,
        error: null
      };
    case GET_TOP_SHOW_ITEMS_FAILURE:
      return {
        ...state,
        isLoadingMore: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default showReducer;
