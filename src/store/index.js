import Vue from 'vue';
import Vuex from 'vuex';

import defaultBoard, { Task, Column } from '@/default-board';
import saveStatePlugin from '@/store/plugins/saveStatePlugin';

let board;

try {
  board = JSON.parse(localStorage.getItem('board'));
} catch (e) {
}

if (!board) {
  board = defaultBoard;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board,
  },
  getters: {
    getTasks(state) {
      return state.board.columns.reduce((acc, currValue) => {
        acc.push(...currValue.tasks);
        return acc;
      }, []);
    },
    getTasksById(state, getters) {
      const tasks = getters.getTasks;
      return tasks.reduce((acc, currValue) => {
        acc[currValue.id] = currValue;
        return acc;
      }, {});
    },
    getTaskById(state, getters) {
      return (id) => {
        return getters.getTasksById[id];
      };
    }
  },
  mutations: {
    ADD_TASK(state, { columnId, taskName }) {
      state.board.columns.forEach((column) => {
        if (column.id === columnId) {
          column.tasks.push(new Task(taskName));
        }
      });
    },

    UPDATE_TASK(state, { task, taskName, taskDescription }) {
      task.name = taskName;
      task.description = taskDescription;
    },

    MOVE_TASK(state, { fromColumnId, toColumnId, fromTaskIndex, toTaskIndex }) {
      const fromColumn = state.board.columns.find(el => el.id === fromColumnId);
      const toColumn = state.board.columns.find(el => el.id === toColumnId);
      const taskToMove = fromColumn.tasks.splice(fromTaskIndex, 1)[0];
      const toTaskIndexFinal = Number.isInteger(toTaskIndex) ? toTaskIndex : toColumn.tasks.length;
      toColumn.tasks.splice(toTaskIndexFinal, 0, taskToMove);
    },

    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const fromColumn = state.board.columns.find((el, index) => index === fromColumnIndex);
      const toColumn = state.board.columns.find((el, index) => index === toColumnIndex);
      state.board.columns.forEach((el, index) => {
        if (index === fromColumnIndex) {
          state.board.columns.splice(fromColumnIndex, 1, toColumn);
        } else if (index === toColumnIndex) {
          state.board.columns.splice(toColumnIndex, 1, fromColumn);
        }
      });
    },

    ADD_COLUMN(state, columnName) {
      state.board.columns.push(new Column(columnName));
    },

    UPDATE_COLUMN_NAME(state, { columnId, newColumnName }) {
      state.board.columns.forEach((column) => {
        if (column.id === columnId) {
          column.name = newColumnName;
        }
      })
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [saveStatePlugin]
})
