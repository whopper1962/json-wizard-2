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
      this.$emit('openModal');
    }
  },
}
</script>

<style scoped>
.share-button {
  width: 180px;
  font-weight: bold;
}
</style>