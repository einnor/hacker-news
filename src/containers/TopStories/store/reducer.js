import {
  GET_TOP_STORY_IDS_REQUEST,
  GET_TOP_STORY_IDS_SUCESS,
  GET_TOP_STORY_IDS_FAILURE,

  GET_TOP_STORY_ITEMS_REQUEST,
  GET_TOP_STORY_ITEMS_SUCESS,
  GET_TOP_STORY_ITEMS_FAILURE,
} from './actions';

export const initialState = {
  ids: [],
  items: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
};

export default function topStories(state = initialState, action) {
  switch (action.type) {
    // IDS
    case GET_TOP_STORY_IDS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_TOP_STORY_IDS_SUCESS:
      return {
        ...state,
        ids: action.payload.ids,
        isLoading: false,
        error: null
      }
    case GET_TOP_STORY_IDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }

      // ITEMS
      case GET_TOP_STORY_ITEMS_REQUEST:
        return {
          ...state,
          isLoadingMore: true
        };
      case GET_TOP_STORY_ITEMS_SUCESS:
        return {
          ...state,
          items: action.payload.items,
          isLoadingMore: false,
          error: null
        }
      case GET_TOP_STORY_ITEMS_FAILURE:
        return {
          ...state,
          isLoadingMore: false,
          error: action.payload.error
        }
      default:
        return state;
  }
}
