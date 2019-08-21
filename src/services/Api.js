
import axios from '../plugins/axios';

const idToPromise = id => axios.get(`item/${id}.json`);

export default class Api {
  static fetchTopStoryIds = async () => {
    const response = await axios.get('topstories.json');
    return response;
  }

  static fetchTopStoryItems = async (ids) => {
    const topStoriesPromises = ids.map(idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    return topStoriesResponses.map(res => res.data);
  }
};
