<template>
  <div class="board">
    <div class="flex items-start">
      <BoardColumn
          v-for="(column, index) in board.columns"
          class="column"
          :key="`${column.name}&${index}`"
          :column-index="index"
          :column="column"
      />
      <div class="column">
        <input
            v-model="newColumnName"
            type="text"
            placeholder="+ Add new column"
            class="px-2 -mx-2 flex-grow font-bold rounded bg-transparent outline-none"
            @keyup.enter="addColumn"
        >
      </div>
    </div>

    <div v-if="isTaskOpened" class="task-bg" @click.self="goToBoard">
      <router-view/>
    </div>
  </div>
</template>

<script>
import BoardColumn from '@/components/BoardColumn.vue';

export default {
  name: 'Board',

  components: {
    BoardColumn
  },

  data() {
    return {
      newColumnName: ''
    };
  },

  computed: {
    board() {
      return this.$store.state.board;
    },

    isTaskOpened() {
      return this.$route.name === 'task';
    }
  },

  methods: {
    goToBoard() {
      this.$router.push({name: 'board'});
    },

    addColumn() {
      this.$store.commit('ADD_COLUMN', this.newColumnName);
      this.newColumnName = '';
    }
  }
};
</script>

<style scoped>
.board {
  @apply p-4 bg-green-600 h-full overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}

.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
