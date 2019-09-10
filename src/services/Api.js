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
}
