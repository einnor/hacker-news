import {
  GET_TOP_ASK_ID_REQUEST,
  GET_TOP_ASK_ID_SUCCESS,
  GET_TOP_ASK_ID_FAILURE,
  GET_TOP_ASK_ITEMS_REQUEST,
  GET_TOP_ASK_ITEMS_SUCCESS,
  GET_TOP_ASK_ITEMS_FAILURE
} from './actions';

const initialState = {
  ids: [],
  items: [],
  isLoading: true,
  isLoadingMore: true,
  error: null
};
const topAsks = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_ASK_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_TOP_ASK_ID_SUCCESS:
      return {
        ...state,
        ids: action.payload.ids,
        isLoading: false,
        error: null
      };
    case GET_TOP_ASK_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    //ITEMS
    case GET_TOP_ASK_ITEMS_REQUEST:
      return {
        ...state,
        isLoadingMore: true
      };
    case GET_TOP_ASK_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        isLoadingMore: false,
        error: null
      };
    case GET_TOP_ASK_ITEMS_FAILURE:
      return {
        ...state,
        isLoadingMore: false,
        error: action.payload.error
      };
    default:
      return initialState;
  }
};
export default topAsks;
