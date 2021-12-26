<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div v-for="(column, index) in board.columns" :key="index" class="column">
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-style-none">
          <div v-for="(task, i) in column.tasks" :key="i" class="task">
            <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
            <p v-if="task.description" class="w-full flex-shrink-0 mt-1 text-sm">{{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Board',
  components: {
  },

  computed: {
    ...mapState([
      'board'
    ])
  }
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}
.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
.board {
  @apply p-4 bg-green-600 h-full overflow-auto;
}
.task-bg {
  @apply inset-0 absolute;
  background: rgba(0,0,0,0.5);
}
</style>
