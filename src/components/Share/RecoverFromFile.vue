<template>
  <button class="btn btn-success recover-button" @click="onClickRecover()">
    Recover from data
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
  margin-right: 10px;
  width: 180px;
  font-weight: bold;
}
</style>