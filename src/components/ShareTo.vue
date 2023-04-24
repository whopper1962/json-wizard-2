<template>
  <button class="btn btn-primary share-button" @click="onClickShare()">
    Share current data
  </button>
</template>

<script>
export default {
  data () {
    return {};
  },
  computed: {},
  methods: {
    onClickShare () {
      console.error('Share');
    }
  },
}
</script>

<style scoped>
.share-button {
  margin-right: 10px;
}
</style>