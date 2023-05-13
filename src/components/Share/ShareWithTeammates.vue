<template>
  <button class="btn btn-success share-button" @click="onClickShare()">
    Save current data
    <font-awesome-icon :icon="['fas', 'floppy-disk']" class="icon-style" />
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
  margin-right: 10px;
  width: 180px;
  font-weight: bold;
}
.icon-style {
  color: white;
}
</style>