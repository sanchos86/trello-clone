<template>
  <button class="button" :class="typeClasses">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    color: {
      type: String
    }
  },
  computed: {
    typeClasses () {
      switch (this.color) {
        case 'danger':
          return 'bg-red-600'
        default:
          return 'bg-green-600'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.button {
  @apply inline-flex px-4 py-2 text-white font-bold rounded items-center;
}
</style>