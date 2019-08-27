//Action types
export const GET_TOP_ASK_ID_REQUEST = 'GET_TOP_ASK_ID_REQUEST';
export const GET_TOP_ASK_ID_SUCCESS = 'GET_TOP_ASK_ID_SUCCESS';
export const GET_TOP_ASK_ID_FAILURE = 'GET_TOP_ASK_ID_FAILURE';

export const GET_TOP_ASK_ITEMS_REQUEST = 'GET_TOP_ASK_ITEMS_REQUEST';
export const GET_TOP_ASK_ITEMS_SUCCESS = 'GET_TOP_ASK_ITEMS_SUCCESS';
export const GET_TOP_ASK_ITEMS_FAILURE = 'GET_TOP_ASK_ITEMS_FAILURE';
//Actions
//IDS
export const getTopAskIdRequest = () => {
  return {
    type: GET_TOP_ASK_ID_REQUEST
  };
};
export const getTopAskIdSuccess = (ids) => {
  return {
    type: GET_TOP_ASK_ID_SUCCESS,
    payload: { ids }
  };
};

export const getTopAskIdFailure = (error) => {
  return {
    type: GET_TOP_ASK_ID_FAILURE,
    payload: { error }
  };
};

//ITEMS
export const getTopAskItemsRequest = (ids) => {
  return {
    type: GET_TOP_ASK_ITEMS_REQUEST,
    payload: { ids }
  };
};
export const getTopAskItemsSuccess = (items) => {
  return {
    type: GET_TOP_ASK_ITEMS_SUCCESS,
    payload: { items }
  };
};

export const getTopAskItemsFailure = (error) => {
  return {
    type: GET_TOP_ASK_ITEMS_FAILURE,
    payload: { error }
  };
};
