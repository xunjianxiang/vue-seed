'use strict';

import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    get (state, users) {
      state.list = users;
    },
    set (state, user) {
      let _user = state.list.find(_user => {
        return _user.id === user.id;
      });
      if (!_user) return;
      _user.age = user.age;
    }
  },
  actions: {
    get (context) {
      axios.get('users').then(response => {
        context.commit('get', response.data.list);
      })
    },
    set (context, user) {
      context.commit('set', user)
    }
  }
}
