import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import { getTopAskIds, getToAskItems } from './sagas';
import Api from '../../../services/Api';

describe('Top Asks - Sagas', () => {
  const error = {
    error: 'An incoming error',
    message: 'Heads up',
    status: 500
  };

  //IDS
  describe('Ids', () => {
    const action = {
      type: actions.GET_TOP_ASK_ID_REQUEST
    };
    it('should handle successfully fetching top ask ids', () => {
      const response = {
        data: [1, 2, 3, 4]
      };
      return expectSaga(getTopAskIds, action)
        .provide([[matchers.call(Api.fetchStoryIds, 'askstories'), response]])
        .put(actions.getTopAskIdSuccess(response.data))
        .run();
    });

    it('should handle unsuccessfully fetching top ask ids', () => {
      return expectSaga(getTopAskIds, action)
        .provide([
          [
            matchers.call(Api.fetchStoryIds, 'askstories'),
            Promise.reject(error)
          ]
        ])
        .put(actions.getTopAskIdFailure(error))
        .run();
    });
  });

  //ITEMS
  describe('Items', () => {
    const ids = [2];
    const action = {
      type: actions.GET_TOP_ASK_ITEMS_REQUEST,
      payload: { ids }
    };

    const response = [
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

    it('should successfully fetch top ask items', () => {
      expectSaga(getToAskItems, action)
        .provide([[matchers.call(Api.fetchStoryItems, ids), response]])
        .put(actions.getTopAskItemsSuccess(response))
        .run();
    });

    it('should unsuccessfully fetch top ask items', () => {
      expectSaga(getToAskItems, action)
        .provide([
          [matchers.call(Api.fetchStoryItems, ids), Promise.reject(error)]
        ])
        .put(actions.getTopAskItemsFailure(error))
        .run();
    });
  });
});
