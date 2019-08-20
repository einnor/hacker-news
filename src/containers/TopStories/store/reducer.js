import {GET_TOP_STORY_IDS_REQUEST, GET_TOP_STORY_IDS_SUCESS, GET_TOP_STORY_IDS_FAILURE} from './actions';

const initialState = {
  ids: [],
  items: [],
  isLoading: false,
  error: null,
};

export default function topStories(state = initialState, action) {
  switch (action.type) {
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
      default:
        return state;
  }
}
