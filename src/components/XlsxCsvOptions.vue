<template>
  <div class="xlsx-csv-option-area">
    <div class="form-inline">
      <button
        class="btn btn-success mb-2 root-array-button"
        @click="isRootArray = !isRootArray"
      >
        Set as array: <span class="font-weight-bold">
          {{ isRootArray ? 'ON' : 'OFF' }}
        </span>
      </button>
      <div class="form-group mx-sm-3 mb-2" v-show="isRootArray">
        <span class="spaces-form-text">
          ▶Number of elements:
        </span>
        <input
          type="number"
          class="form-control"
          placeholder="Number of elements"
          min="0"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRootArray: false
    };
  }
}
</script>

<style scoped>
.xlsx-csv-option-area {
  margin-left: 5px;
  padding-bottom: 5px;
}
.spaces-form-text {
  margin-right: 5px;
}
.root-array-button {
  text-align: left;
  width: 150px;
}
</style>