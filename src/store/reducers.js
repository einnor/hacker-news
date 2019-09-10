import { combineReducers } from 'redux';
import topStories from '../containers/TopStories/store/reducer';
import topAsks from '../containers/TopAsks/store/reducers';
<<<<<<< HEAD
import user from '../containers/User/store/reducer';
=======
import topShows from '../containers/TopShows/store/reducer';
>>>>>>> implement show page
// Add more reducers e,g Top Asks, User, Story

const rootReducer = combineReducers({
  topStories,
  topAsks,
<<<<<<< HEAD
  user
=======
  topShows
>>>>>>> implement show page
});

export default rootReducer;
