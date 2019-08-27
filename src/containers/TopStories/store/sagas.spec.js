import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import {getTopStoryIds} from './sagas';
import Api from '../../../services/Api';


describe('Top Stories - Sagas', () => {

  // IDS
  describe('IDS', () => {
    it('should handle successfully fetching top story ids', () => {
      const response = {data: [1, 2, 3]};

      const action = {
        type: actions.GET_TOP_STORY_IDS_REQUEST
      };

      return expectSaga(getTopStoryIds, action)
        .provide([
          [matchers.call(Api.fetchTopStoryIds), response]
        ])
        .put(actions.getTopStoryIdsSuccess(response.data))
        .run();
    });

    it('should handle unsuccessfully fetching top story ids', () => {
      const error = {
        error: 'An incoming error',
        message: 'Heads up',
        status: 500
      };

      const action = {
        type: actions.GET_TOP_STORY_IDS_REQUEST
      };

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
   // TODO
  })
});