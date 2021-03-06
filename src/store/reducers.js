import { combineReducers } from 'redux';
import topStories from '../containers/TopStories/store/reducer';
import topAsks from '../containers/TopAsks/store/reducers';
import user from '../containers/User/store/reducer';
import topShows from '../containers/TopShows/store/reducer';
// Add more reducers e,g Top Asks, User, Story

const rootReducer = combineReducers({
  topStories,
  topAsks,
  user,
  topShows
});

export default rootReducer;
