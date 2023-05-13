<template>
  <button class="btn btn-success recover-button" @click="onClickRecover()">
    Use saved data
    <font-awesome-icon :icon="['fas', 'download']" class="icon-style" />
  </button>
</template>

<script>
export default {
  data () {
    return {};
  },
  computed: {},
  methods: {
    onClickRecover () {
      this.$emit('openModal');
    }
  },
}
</script>

<style scoped>
.recover-button {
  width: 180px;
  font-weight: bold;
}
.icon-style {
  color: white;
}
</style>