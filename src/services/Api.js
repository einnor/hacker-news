
import axios from '../plugins/axios';
export default class Api {
  static fetchTopStoryIds = async () => {
    const response = await axios.get('topstories.json');
    return response;
  }
};
