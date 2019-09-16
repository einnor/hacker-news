import * as actions from './actions';

describe('Top Asks - Actions', () => {
  let error;

  beforeAll(() => {
    error = {
      error: 'Here is an error',
      message: 'Some error about failure',
      status: 500
    };
  });

  //IDS
  describe('IDS', () => {
    it('should get top asks ids', () => {
      const expectedAction = {
        type: actions.GET_TOP_ASK_ID_REQUEST
      };
      const actionCreator = actions.getTopAskIdRequest();
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const ids = [1, 2, 3];
      const expectedAction = {
        type: actions.GET_TOP_ASK_ID_SUCCESS,
        payload: { ids }
      };
      const actionCreator = actions.getTopAskIdSuccess(ids);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_TOP_ASK_ID_FAILURE,
        payload: { error }
      };
      const actionCreator = actions.getTopAskIdFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });

  //ITEMS
  describe('items', () => {
    it('should get top ask items', () => {
      const ids = [1, 2, 3];
      const expectedAction = {
        type: actions.GET_TOP_ASK_ITEMS_REQUEST,
        payload: { ids }
      };
      const actionCreator = actions.getTopAskItemsRequest(ids);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const items = [
        {
          by: 'bookofjoe',
          descendants: 19,
          id: 20786880,
          kids: [
            20797976,
            20798008,
            20798404,
            20797657,
            20798236,
            20797928,
            20797970,
            20797889,
            20797735
          ],
          score: 46,
          time: 1566651509,
          title: 'I love my paper dictionary (2017)',
          type: 'story',
          url:
            'https://austinkleon.com/2017/08/17/why-i-love-my-paper-dictionary/'
        }
      ];

      const expectedAction = {
        type: actions.GET_TOP_ASK_ITEMS_SUCCESS,
        payload: { items }
      };
      const actionCreator = actions.getTopAskItemsSuccess(items);
      expect(actionCreator).toEqual(expectedAction);
    });
    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_TOP_ASK_ITEMS_FAILURE,
        payload: { error }
      };
      const actionCreator = actions.getTopAskItemsFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });
});
