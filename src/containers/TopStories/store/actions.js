// Action Types
export const GET_TOP_STORY_IDS_REQUEST = 'GET_TOP_STORY_IDS_REQUEST';
export const GET_TOP_STORY_IDS_SUCESS = 'GET_TOP_STORY_IDS_SUCESS';
export const GET_TOP_STORY_IDS_FAILURE = 'GET_TOP_STORY_IDS_FAILURE';

// Actions
export function getTopStoryIdsRequest() {
  return {
    type: GET_TOP_STORY_IDS_REQUEST
  };
}

export function getTopStoryIdsSuccess(ids) {
  return {
    type: GET_TOP_STORY_IDS_SUCESS,
    payload: {ids}
  };
}

export function getTopStoryIdsFailure(error) {
  return {
    type: GET_TOP_STORY_IDS_FAILURE,
    error: {error}
  };
}