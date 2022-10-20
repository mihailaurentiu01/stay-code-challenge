import { defineStore } from 'pinia';

import Api from '../services/Api';

export default defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {
    async get() {
      try {
        const res = await Api.getUsers();

        if (res.status === 200) {
          this.users = res.data;
        }

        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async delete(id) {
      try {
        const res = await Api.deleteUser(id);

        if (res.status === 200) {
          this.deleteFromDataSource(id);
        }

        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async add(data) {
      try {
        const res = await Api.addUser(data);
        if (res.status === 201) {
          this.addToDataSource(res.data);
        }

        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    deleteFromDataSource(id) {
      this.users = this.users.filter((user) => user.id !== id);
    },
    addToDataSource(data) {
      this.users = this.users.concat(data);
    },
  },
});
