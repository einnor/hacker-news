import * as actions from './actions';

describe('Top Stories - Actions', () => {

  // IDS
  describe('IDS', () => {
    it('should get top story ids', () => {
      const expectedAction = {
        type: actions.GET_TOP_STORY_IDS_REQUEST
      };

      const actionCreator = actions.getTopStoryIdsRequest();
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const ids = [1, 2, 3];
      const expectedAction = {
        type: actions.GET_TOP_STORY_IDS_SUCESS,
        payload: {ids}
      };

      const actionCreator = actions.getTopStoryIdsSuccess(ids);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const error = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500
      };
      const expectedAction = {
        type: actions.GET_TOP_STORY_IDS_FAILURE,
        payload: {error}
      };

      const actionCreator = actions.getTopStoryIdsFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });

  // ITEMS
  describe('Items', () => {
    it('should get top story items', () => {
      const ids = [1, 2, 3];
      const expectedAction = {
        type: actions.GET_TOP_STORY_ITEMS_REQUEST,
        payload: {ids}
      };

      const actionCreator = actions.getTopStoryItemsRequest(ids);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const items = [
        {
          by: "bookofjoe",
          descendants: 19,
          id: 20786880,
          kids: [20797976, 20798008, 20798404, 20797657, 20798236, 20797928, 20797970, 20797889, 20797735],
          score: 46,
          time: 1566651509,
          title: "I love my paper dictionary (2017)",
          type: "story",
          url: "https://austinkleon.com/2017/08/17/why-i-love-my-paper-dictionary/"
        }
      ];
      const expectedAction = {
        type: actions.GET_TOP_STORY_ITEMS_SUCESS,
        payload: {items}
      };

      const actionCreator = actions.getTopStoryItemsSuccess(items);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const error = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500
      };
      const expectedAction = {
        type: actions.GET_TOP_STORY_ITEMS_FAILURE,
        payload: {error}
      };

      const actionCreator = actions.getTopStoryItemsFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  })
});