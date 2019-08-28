import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import {getTopStoryIds, getTopStoryItems} from './sagas';
import Api from '../../../services/Api';


describe('Top Stories - Sagas', () => {

  const error = {
    error: 'An incoming error',
    message: 'Heads up',
    status: 500
  };

  // IDS
  describe('IDS', () => {

    const action = {
      type: actions.GET_TOP_STORY_IDS_REQUEST
    };

    it('should handle successfully fetching top story ids', () => {
      const response = {data: [1, 2, 3]};
      return expectSaga(getTopStoryIds, action)
        .provide([
          [matchers.call(Api.fetchTopStoryIds), response]
        ])
        .put(actions.getTopStoryIdsSuccess(response.data))
        .run();
    });

    it('should handle unsuccessfully fetching top story ids', () => {
      return expectSaga(getTopStoryIds, action)
        .provide([
          [matchers.call(Api.fetchTopStoryIds), Promise.reject(error)]
        ])
        .put(actions.getTopStoryIdsFailure(error))
        .run();
    })
  });

  // ITEMS
  describe('Items', () => {

    const ids = [1];
    const action = {
      type: actions.GET_TOP_STORY_ITEMS_REQUEST,
      payload: {ids}
    };

    it('should handle successfully fetching top story items', () => {
      const response = [
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

      return expectSaga(getTopStoryItems, action)
        .provide([
          [matchers.call(Api.fetchTopStoryItems, ids), response]
        ])
        .put(actions.getTopStoryItemsSuccess(response))
        .run();
    });

    it('should handle unsuccessfully fetching top story items', () => {
      return expectSaga(getTopStoryItems, action)
        .provide([
          [matchers.call(Api.fetchTopStoryItems, ids), Promise.reject(error)]
        ])
        .put(actions.getTopStoryItemsFailure(error))
        .run();
    })
  })
});