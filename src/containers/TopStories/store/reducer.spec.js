import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Top Stories - Reducer', () => {
  let state;
  const ids = [1, 2, 3];
  const error = {
    error: 'Error coming through',
    message: 'Heads up, this is failing',
    status: 500
  };

  // IDS
  describe('IDS', () => {
    beforeEach(() => {
      state = { ...initialState };
    });

    it('should handle action to fetch top story ids', () => {
      const action = {
        type: actions.GET_TOP_STORY_IDS_REQUEST
      };

      const store = reducer(state, action);
      expect(store.isLoading).toEqual(true);
    });

    it('should handle successfully fetching top story ids', () => {
      const action = {
        type: actions.GET_TOP_STORY_IDS_SUCESS,
        payload: { ids }
      };

      const store = reducer(state, action);
      expect(store.isLoading).toEqual(false);
      expect(store.ids).toEqual(ids);
      expect(store.error).toBeNull();
    });

    it('should handle unsuccessfully fetching top story ids', () => {
      const action = {
        type: actions.GET_TOP_STORY_IDS_FAILURE,
        payload: { error }
      };

      const store = reducer(state, action);
      expect(store.isLoading).toEqual(false);
      expect(store.error).toEqual(error);
    });
  });

  // ITEMS
  describe('ITEMS', () => {
    beforeEach(() => {
      state = { ...initialState };
    });

    it('should handle action to fetch top story items', () => {
      const action = {
        type: actions.GET_TOP_STORY_ITEMS_REQUEST,
        payload: { ids }
      };

      const store = reducer(state, action);
      expect(store.isLoadingMore).toEqual(true);
    });

    it('should handle successfully fetching top story items', () => {
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
      const action = {
        type: actions.GET_TOP_STORY_ITEMS_SUCESS,
        payload: { items }
      };

      const store = reducer(state, action);
      expect(store.isLoadingMore).toEqual(false);
      expect(store.items).toEqual(items);
      expect(store.error).toBeNull();
    });

    it('should handle unsuccessfully fetching top story items', () => {
      const action = {
        type: actions.GET_TOP_STORY_ITEMS_FAILURE,
        payload: { error }
      };

      const store = reducer(state, action);
      expect(store.isLoadingMore).toEqual(false);
      expect(store.error).toEqual(error);
    });
  });
});
