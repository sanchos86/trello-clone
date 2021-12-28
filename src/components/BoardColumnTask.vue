<template>
  <div
      class="task"
      :draggable="true"
      @dragover.prevent
      @click="goToTask"
      @dragstart="$emit('dragstart', $event)"
      @drop.prevent.stop="$emit('drop', $event)"
  >
    <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
    <p v-if="task.description" class="w-full flex-shrink-0 mt-1 text-sm">{{ task.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'BoardColumnTask',

  props: {
    task: {
      type: Object,
      required: true
    }
  },

  methods: {
    goToTask() {
      this.$router.push({name: 'task', params: {id: this.task.id}});
    },
  }
};
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline cursor-pointer;
}
</style>
