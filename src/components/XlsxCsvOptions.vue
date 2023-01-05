<template>
  <div class="xlsx-csv-option-area">
    <div class="form-inline">
      <div class="form-group mb-2">
        <span class="spaces-form-text">
          Selected sheet:
        </span>
        <select
          class="form-control selected-sheet-form"
          v-model="selectedSheet"
        >
          <option>testsheet</option>
        </select>
        <span class="sheet-info">
          Number of rows: {{ numberOfRows }}
        </span>
        <span class="sheet-info">
          Number of trashed rows: {{ numberOfTrashedRows }}
        </span>
      </div>
    </div>
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
          v-model="numberOfElements"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedSheet: ''
    };
  },
  computed: {
    isRootArray: {
      get () {
        return this.$store.getters['getCurrentTabContents'].isRootArray;
      },
      set (status) {
        this.$store.dispatch('setRootArrayStatus', status);
      }
    },
    numberOfElements: {
      get () {
        return this.$store.getters['getCurrentTabContents'].numberOfElements;
      },
      set (num) {
        this.$store.dispatch('setNumberOfArrayElements', num);
      }
    },
    numberOfRows () {
      const currentContents = this.$store.getters['getCurrentTabContents'];
      return currentContents.currentXlsxCsvContents.length;
    },
    numberOfTrashedRows () {
      const currentContents = this.$store.getters['getCurrentTabContents'];
      return currentContents.trashedRows.length;
    }
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
.selected-sheet-form {
  width: 150px !important;
}
.sheet-info {
  margin-left: 15px;
}
</style>