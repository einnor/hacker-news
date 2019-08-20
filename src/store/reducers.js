import {combineReducers} from 'redux';
import topStories from '../containers/TopStories/store/reducer';
// Add more reducers e,g Top Asks, User, Story

const rootReducer = combineReducers({
  topStories,
  //topAsks
  //user
});

export default rootReducer;