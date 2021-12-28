<template>
  <div class="task-view">
    <form class="flex flex-col flex-grow px-4" @submit.prevent="updateTask">
      <div class="w-full mb-2">
        <label for="name">Task name:</label>
        <input
            v-model="form.name"
            type="text"
            class="w-full bg-transparent border-gray-400 border outline-none rounded p-2"
            id="name"
        >
      </div>
      <div class="w-full mb-2">
        <label for="description">Task description:</label>
        <textarea
            v-model="form.description"
            class="w-full bg-transparent border-gray-400 border outline-none rounded p-2"
            cols="30"
            rows="10"
            id="description"
        ></textarea>
      </div>
      <div class="w-full text-right">
        <base-button type="submit">Update task</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Task',

  data() {
    return {
      form: {
        name: '',
        description: ''
      }
    };
  },

  computed: {
    ...mapGetters([
        'getTaskById'
    ]),
    task() {
      return this.getTaskById(this.$route.params.id);
    },
    isFormValid() {
      const { form: { name, description } } = this;
      return name?.length > 2 && description?.length > 2;
    }
  },

  methods: {
    updateTask() {
      if (this.isFormValid) {
        const { task, form: { description, name } } = this;
        this.$store.commit('UPDATE_TASK', {
          task,
          taskName: name,
          taskDescription: description
        });
        this.close();
      }
    },

    close() {
      this.$router.push({ name: 'board' });
    }
  },

  watch: {
    task: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue === undefined && newValue) {
          this.form.name = newValue.name;
          this.form.description = newValue.description;
        }
      }
    }
  }
};
</script>

<style scoped>
.task-view {
  @apply relative flex flex-row bg-white inset-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>