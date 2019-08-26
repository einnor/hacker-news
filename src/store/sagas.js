import { all } from 'redux-saga/effects';
import topStoriesWatcher from '../containers/TopStories/store/sagas';
import topAsksWatcher from '../containers/TopAsks/store/sagas';
// Other import for top asks, user, story

export default function* rootSaga() {
  yield all([
    topStoriesWatcher(),
    topAsksWatcher()
    // other watchers
  ]);
}