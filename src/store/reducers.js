import { combineReducers } from 'redux';
import topStories from '../containers/TopStories/store/reducer';
import topAsks from '../containers/TopAsks/store/reducers';
// Add more reducers e,g Top Asks, User, Story

const rootReducer = combineReducers({
  topStories,
  topAsks
});

export default rootReducer;
