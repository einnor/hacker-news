import {
  GET_TOP_ASK_ID_REQUEST,
  GET_TOP_ASK_ID_SUCCESS,
  GET_TOP_ASK_ID_FAILURE
} from './actions';

const initialState = {
  ids: [],
  isLoading: true,
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
    default:
      return initialState;
  }
};
export default topAsks;
