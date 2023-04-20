<template>
  <div class="xlsx-csv-option-area">
    <div class="form-inline">
      <button
        class="btn btn-primary mb-2 font-weight-bold"
        @click="executeConversion()"
        :disabled="!isValueAndKeySelected"
      >
        Execute conversion
      </button>
      <span
        v-if="!isValueAndKeySelected"
        class="value-and-key-not-selected-error text-danger"
      >
        At least one key and one value should be selected.
      </span>
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
          onKeydown="return false"
        >
      </div>
    </div>
    <div class="form-inline">
      <div class="form-group mb-2" v-if="currentContents">
        <span class="spaces-form-text">
          Selected sheet:
        </span>
        <select
          class="form-control selected-sheet-form"
          @change="$store.dispatch('setErrorRows', [])"
          v-model="selectedSheet"
        >
          <template v-for="(sheet, index) in currentContents.sheetNames">
            <option :key="`sheet_${index}`">{{ sheet }}</option>
          </template>
        </select>
        <span class="sheet-info">
          Number of rows: {{ currentContents.currentXlsxCsvContents.length }}
        </span>
        <span class="sheet-info">
          Number of trashed rows: {{ currentContents.trashedRows.length }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import xlsxToJson from '@/lib/json-wizard/xlsx-to-json';
export default {
  computed: {
    isRootArray: {
      get () {
        return this.$store.getters['getCurrentTabContents']?.isRootArray;
      },
      set (status) {
        this.$store.dispatch('setRootArrayStatus', status);
      }
    },
    numberOfElements: {
      get () {
        return this.$store.getters['getCurrentTabContents']?.numberOfElements;
      },
      set (num) {
        this.$store.dispatch('setNumberOfArrayElements', num);
      }
    },
    currentContents () {
      return this.$store.getters['getCurrentTabContents'];
    },
    selectedSheet: {
      get () {
        return this.currentContents?.selectedSheet;
      },
      set (selectedSheet) {
        this.$store.dispatch('setSelectedSheet', selectedSheet);
      }
    },
    isValueAndKeySelected () {
      const currentContents = this.$store.getters['getCurrentTabContents'];
      return currentContents?.columnOrders.length > 1;
    }
  },
  methods: {
    currentXlsxCsv () {
      const currentTabContents = this.$store.getters['getCurrentTabContents'];
      let columnOrder = currentTabContents?.columnOrders.slice();
      const valueIndex = columnOrder.shift();
      const parentKeys = columnOrder.reverse();
      return {
        parentKeys,
        valueIndex,
        contents: currentTabContents.currentXlsxCsvContents,
        excludes: currentTabContents.trashedRows,
        isArray: currentTabContents.isRootArray,
        numberOfElements: currentTabContents.numberOfElements,
      };
    },
    executeConversion () {
      try {
        this.$store.dispatch('setErrorRows', []);
        const props = this.currentXlsxCsv();
        const generatedJson = xlsxToJson(props);
        this.$store.dispatch('setGeneratedJson', generatedJson);
      } catch (error) {
        console.error(error);
        this.$store.dispatch('setErrorRows', error.body);
      }
    },
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
.value-and-key-not-selected-error {
  margin-left: 10px;
}
</style>