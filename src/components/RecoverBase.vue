<template>
  <button class="btn btn-success" @click="onClickRecover()">
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
      console.error('Recover');
    }
  },
}
</script>

<style scoped>
.share-button {
  margin-right: 10px;
}
</style>