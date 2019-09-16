import * as actions from './actions';
import { getTopShowsIds, getTopShowsItems } from './sagas';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import Api from '../../../services/Api';
import { call } from 'redux-saga/effects';

describe('Top shows - sagas', () => {
  const error = {
    error: 'An incoming error',
    message: 'Heads up',
    status: 500
  };
  //IDs
  describe('Ids', () => {
    const action = {
      type: actions.GET_TOP_SHOW_IDS_REQUEST
    };
    const response = { data: [1, 2, 3] };
    it('should handle successfully fetching top show ids', () => {
      return expectSaga(getTopShowsIds, action)
        .provide([[matchers.call(Api.fetchStoryIds, 'showstories'), response]])
        .put(actions.getTopShowIdsSuccess(response.data))
        .run();
    });

    it('should handle unsuccessfully fetching top show ids', () => {
      return expectSaga(getTopShowsIds, action)
        .provide([
          [
            matchers.call(Api.fetchStoryIds, 'showstories'),
            Promise.reject(error)
          ]
        ])
        .put(actions.getTopShowIdsFailure(error))
        .run();
    });
  });

  //ITEMS
  describe('Items', () => {
    const ids = [1, 2, 3];
    const action = {
      type: actions.GET_TOP_SHOW_ITEMS_SUCCESS,
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
    it('should hanlde fetching top show items', () => {
      return expectSaga(getTopShowsItems, action)
        .provide([[matchers.call(Api.fetchStoryItems, ids), response]])
        .put(actions.getTopShowItemsSuccess(response))
        .run();
    });

    it('should unsucessfully fetch top show items', () => {
      return expectSaga(getTopShowsItems, action)
        .provide([
          [matchers.call(Api.fetchStoryItems, ids), Promise.reject(error)]
        ])
        .put(actions.getTopShowItemsFailure(error))
        .run();
    });
  });
});
