<template>
  <div>
    <div v-if="isError" class="error-log">
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {};
  }
};
</script>

<style scoped>
.error-log {
  color: rgb(250, 66, 66);
}
.succeed-log {
  color: rgb(121, 225, 3);
}
</style>