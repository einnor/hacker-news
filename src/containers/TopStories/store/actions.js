// Action Types
export const GET_TOP_STORY_IDS_REQUEST = 'GET_TOP_STORY_IDS_REQUEST';
export const GET_TOP_STORY_IDS_SUCESS = 'GET_TOP_STORY_IDS_SUCESS';
export const GET_TOP_STORY_IDS_FAILURE = 'GET_TOP_STORY_IDS_FAILURE';

export const GET_TOP_STORY_ITEMS_REQUEST = 'GET_TOP_STORY_ITEMS_REQUEST';
export const GET_TOP_STORY_ITEMS_SUCESS = 'GET_TOP_STORY_ITEMS_SUCESS';
export const GET_TOP_STORY_ITEMS_FAILURE = 'GET_TOP_STORY_ITEMS_FAILURE';

// Actions
// IDS
export function getTopStoryIdsRequest() {
  return {
    type: GET_TOP_STORY_IDS_REQUEST
  };
}

export function getTopStoryIdsSuccess(ids) {
  return {
    type: GET_TOP_STORY_IDS_SUCESS,
    payload: { ids }
  };
}

export function getTopStoryIdsFailure(error) {
  return {
    type: GET_TOP_STORY_IDS_FAILURE,
    payload: { error }
  };
}

// ITEMS
export function getTopStoryItemsRequest(ids) {
  return {
    type: GET_TOP_STORY_ITEMS_REQUEST,
    payload: { ids }
  };
}

export function getTopStoryItemsSuccess(items) {
  return {
    type: GET_TOP_STORY_ITEMS_SUCESS,
    payload: { items }
  };
}

export function getTopStoryItemsFailure(error) {
  return {
    type: GET_TOP_STORY_ITEMS_FAILURE,
    payload: { error }
  };
}
