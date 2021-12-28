<template>
  <div
      :draggable="true"
      @dragover.prevent
      @dragstart.self="pickupColumn($event, columnIndex)"
      @drop.prevent="moveTaskOrColumn($event, column.id, { toColumnIndex: columnIndex })"
  >
    <div class="flex items-center mb-2">
      <input
          :value="column.name"
          type="text"
          placeholder="Rename column"
          class="px-2 -mx-2 font-bold flex-grow rounded bg-transparent outline-none"
          @keyup.enter="renameColumn($event, column.id)"
      >
    </div>
    <div class="list-style-none">
      <BoardColumnTask
          v-for="(task, i) in column.tasks"
          :key="i"
          :task="task"
          @dragstart="pickupTask($event, column.id, i)"
          @drop="moveTaskOrColumn($event, column.id, { toTaskIndex: i })"
      />
    </div>
    <input
        v-model="form.taskName"
        type="text"
        class="block bg-transparent outline-none p-2 -mx-2 flex-grow"
        placeholder="+ Add new task"
        @keyup.enter="addTask"
    >
  </div>
</template>
<script>
import BoardColumnTask from '@/components/BoardColumnTask.vue';

export default {
  name: 'BoardColumn',

  components: {
    BoardColumnTask,
  },

  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      form: {
        taskName: ''
      }
    };
  },

  computed: {
    isFormValid() {
      return this.form.taskName.length > 2;
    }
  },

  methods: {
    addTask() {
      if (this.isFormValid) {
        this.$store.commit('ADD_TASK', {
          columnId: this.column.id,
          taskName: this.form.taskName
        });
        this.resetForm();
      }
    },

    resetForm() {
      this.form.taskName = '';
    },

    pickupTask(e, fromColumnId, fromTaskIndex) {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';

      e.dataTransfer.setData('type', 'task');
      e.dataTransfer.setData('from-task-index', fromTaskIndex);
      e.dataTransfer.setData('from-column-id', fromColumnId);
    },

    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';

      e.dataTransfer.setData('type', 'column');
      e.dataTransfer.setData('from-column-index', fromColumnIndex);
    },

    moveTask(e, toColumnId, toTaskIndex) {
      const fromTaskIndex = Number(e.dataTransfer.getData('from-task-index'));
      const fromColumnId = e.dataTransfer.getData('from-column-id');
      this.$store.commit(
          'MOVE_TASK',
          {fromColumnId, toColumnId, fromTaskIndex, toTaskIndex}
      );
    },

    moveTaskOrColumn(e, toColumnId, { toTaskIndex, toColumnIndex }) {
      const type = e.dataTransfer.getData('type');

      if (type === 'task') {
        this.moveTask(e, toColumnId, toTaskIndex);
      } else if (type === 'column') {
        this.moveColumn(e, toColumnIndex);
      }
    },

    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = Number(e.dataTransfer.getData('from-column-index'));
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      });
    },

    renameColumn(e, columnId) {
      const newColumnName = e.target.value;
      this.$store.commit('UPDATE_COLUMN_NAME', {
        columnId,
        newColumnName,
      });
    }
  }
};
</script>
