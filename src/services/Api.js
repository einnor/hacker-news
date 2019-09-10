import axios from '../plugins/axios';

const idToPromise = (id) => axios.get(`item/${id}.json`);

export default class Api {
  static fetchStoryIds = async (type) => {
    const response = await axios.get(`${type}.json`);
    return response;
  };

  static fetchStoryItems = async (ids) => {
    const storiesPromises = ids.map(idToPromise);
    const storiesResponses = await Promise.all(storiesPromises);
    return storiesResponses.map((res) => res.data);
  };

  static fetchUserDetails = async (by) => {
    const response = await axios.get(`/user/${by}.json`);
    return response;
  };

  static fetchTopAsksItems = async (ids) => {
    const topAsksPromises = ids.map(idToPromise);
    const topAsksResponses = await Promise.all(topAsksPromises);
    return topAsksResponses.map((res) => res.data);
  };

  static fetchTopShowsIds = async () => {
    const response = await axios.get(`/showstories.json`);
    return response;
  };

  static fetchTopShowsItems = async (ids) => {
    const topShowPromises = ids.map(idToPromise);
    const topShowsRepsonses = await Promise.all(topShowPromises);
    return topShowsRepsonses;
  };
}
