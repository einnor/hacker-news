import * as actions from './actions';

describe('Top shows - Actions', () => {
  const ids = [1, 2, 3];
  const error = {
    error: 'Here is an error',
    message: 'An error about failure',
    status: 500
  };
  //IDS
  describe('Ids', () => {
    it('should fetch top show ids', () => {
      const expectedAction = {
        type: actions.GET_TOP_SHOW_IDS_REQUEST
      };

      const actionCreator = actions.getTopShowIdsRequest();
      expect(actionCreator).toEqual(expectedAction);
    });
    it('should return payload on success', () => {
      const expectedAction = {
        type: actions.GET_TOP_SHOW_IDS_SUCCESS,
        payload: { ids }
      };

      const actionCreator = actions.getTopShowIdsSuccess(ids);
      expect(actionCreator).toEqual(expectedAction);
    });
    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_TOP_SHOW_IDS_FAILURE,
        payload: { error }
      };

      const actionCreator = actions.getTopShowIdsFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });
  //ITEMS
  describe('Items', () => {
    it('should fetch top show items', () => {
      const expectedAction = {
        type: actions.GET_TOP_SHOW_ITEMS_REQUEST,
        payload: { ids }
      };

      const actionCreator = actions.getTopShowItemsRequest(ids);
      expect(actionCreator).toEqual(expectedAction);
    });
    it('should successfully fetch top show items', () => {
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
        type: actions.GET_TOP_SHOW_ITEMS_SUCCESS,
        payload: { items }
      };

      const actionCreator = actions.getTopShowItemsSuccess(items);
      expect(actionCreator).toEqual(expectedAction);
    });
    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_TOP_SHOW_ITEMS_FAILURE,
        payload: { error }
      };

      const actionCreator = actions.getTopShowItemsFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });
});
