import * as actions from './actions';
import { initialState } from './reducer';
import reducer from './reducer';

describe('Top shows- reducer', () => {
  const ids = [2, 3, 4];
  const error = {
    error: 'Error coming through',
    message: 'Heads up, this is failing',
    status: 500
  };
  let state;
  beforeEach(() => {
    state = { ...initialState };
  });
  //IDS
  describe('Ids', () => {
    it('should handle action to fetch top show ids', () => {
      const action = {
        type: actions.GET_TOP_SHOW_IDS_REQUEST
      };
      const store = reducer(state, action);
      expect(store.isLoading).toEqual(true);
    });

    it('should handle action to successfully fetch top show ids', () => {
      const action = {
        type: actions.GET_TOP_SHOW_IDS_SUCCESS,
        payload: { ids }
      };
      const store = reducer(state, action);
      expect(store.ids).toEqual(ids);
      expect(store.isLoading).toEqual(false);
      expect(store.error).toBeNull();
    });

    it('should have unsuccessfully fetching top show ids', () => {
      const action = {
        type: actions.GET_TOP_SHOW_IDS_FAILURE,
        payload: { error }
      };
      const store = reducer(state, action);
      expect(store.error).toEqual(error);
      expect(store.isLoading).toEqual(false);
    });
  });
  //ITEMS
  describe('items', () => {
    it('should handle action to fetch top show items', () => {
      const action = {
        type: actions.GET_TOP_SHOW_ITEMS_REQUEST,
        payload: { ids }
      };
      const store = reducer(state, action);
      expect(store.isLoadingMore).toEqual(true);
    });
    it('should handle action to successfully fetch top show items', () => {
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
        type: actions.GET_TOP_SHOW_ITEMS_SUCCESS,
        payload: { items }
      };
      const store = reducer(state, action);
      expect(store.items).toEqual(items);
      expect(store.isLoadingMore).toEqual(false);
      expect(store.error).toBeNull();
    });
    it('should return error on failure', () => {
      const action = {
        type: actions.GET_TOP_SHOW_ITEMS_FAILURE,
        payload: { error }
      };
      const store = reducer(state, action);
      expect(store.isLoadingMore).toEqual(false);
      expect(store.error).toEqual(error);
    });
  });
});
