import axios from '../plugins/axios';

const idToPromise = (id) => axios.get(`item/${id}.json`);

export default class Api {
  static fetchTopStoryIds = async () => {
    const response = await axios.get('topstories.json');
    return response;
  };

  static fetchTopStoryItems = async (ids) => {
    const topStoriesPromises = ids.map(idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    return topStoriesResponses.map((res) => res.data);
  };

  static fetchTopAskIds = async () => {
    const response = await axios.get(`/askstories.json`);
    return response;
  };

  static fetchTopAsksItems = async (ids) => {
    const topAsksPromises = ids.map(idToPromise);
    const topAsksResponses = await Promise.all(topAsksPromises);
    return topAsksResponses.map((res) => res.data);
  };
}
