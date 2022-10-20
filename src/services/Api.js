import { API_URL } from '../js/constants';
import axios from 'axios';

export default {
  getUsers() {
    return axios.get(API_URL);
  },
  deleteUser(id) {
    return axios.delete(API_URL + '/' + id);
  },
  addUser(data) {
    return axios.post(API_URL, data);
  },
};
