export const GET_TOP_SHOW_IDS_REQUEST = 'GET_TOP_SHOW_IDS_REQUEST';
export const GET_TOP_SHOW_IDS_SUCCESS = 'GET_TOP_SHOW_IDS_SUCCESS';
export const GET_TOP_SHOW_IDS_FAILURE = 'GET_TOP_SHOW_IDS_FAILURE';

export const GET_TOP_SHOW_ITEMS_REQUEST = 'GET_TOP_SHOW_ITEMS_REQUEST';
export const GET_TOP_SHOW_ITEMS_SUCCESS = 'GET_TOP_SHOW_ITEMS_SUCCESS';
export const GET_TOP_SHOW_ITEMS_FAILURE = 'GET_TOP_SHOW_ITEMS_FAILURE';

export const getTopShowIdsRequest = () => {
  return {
    type: GET_TOP_SHOW_IDS_REQUEST
  };
};

export const getTopShowIdsSuccess = (ids) => {
  return {
    type: GET_TOP_SHOW_IDS_SUCCESS,
    payload: { ids }
  };
};

export const getTopShowIdsFailure = (error) => {
  return {
    type: GET_TOP_SHOW_IDS_FAILURE,
    payload: { error }
  };
};

//ITEMS
export const getTopShowItemsRequest = (ids) => {
  return {
    type: GET_TOP_SHOW_ITEMS_REQUEST,
    payload: { ids }
  };
};

export const getTopShowItemsSuccess = (items) => {
  return {
    type: GET_TOP_SHOW_ITEMS_SUCCESS,
    payload: { items }
  };
};

export const getTopShowItemsFailure = (error) => {
  return {
    type: GET_TOP_SHOW_ITEMS_FAILURE,
    payload: { error }
  };
};
