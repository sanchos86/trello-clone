import Vue from 'vue'
import Vuex from 'vuex';

import defaultBoard from '../default-board';

let board
try {
  board = JSON.parse(localStorage.getItem('board'));
} catch (e) {
}

if (!board) {
  board = defaultBoard;
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
