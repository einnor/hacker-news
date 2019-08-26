//Action types
export const GET_TOP_ASK_ID_REQUEST = 'GET_TOP_ASK_ID_REQUEST';
export const GET_TOP_ASK_ID_SUCCESS = 'GET_TOP_ASK_ID_SUCCESS';
export const GET_TOP_ASK_ID_FAILURE = 'GET_TOP_ASK_ID_FAILURE';

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
    error: { error }
  };
};
