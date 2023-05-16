<template>
  <div class="xlsx-csv-option-area">
    <div class="form-inline">
      <button
        class="btn btn-primary mb-2 font-weight-bold root-array-button"
        @click="executeConversion()"
        :disabled="!currentContents.isExecutable"
      >
        {{ $t("app.executeConversion") }}
        <font-awesome-icon :icon="['fas', 'wand-sparkles']" />
      </button>
      <span
        v-if="!currentContents.isExecutable"
        class="value-and-key-not-selected-error text-danger"
      >
        {{ $t("app.unexecutableMsg") }}
      </span>
    </div>
    <div class="form-inline">
      <button
        class="btn btn-success mb-2 root-array-button font-weight-bold"
        @click="isRootArray = !isRootArray"
      >
        {{ $t("app.convertAsArray") }} {{ isRootArray ? "ON" : "OFF" }}
      </button>
      <div class="form-group mx-sm-3 mb-2" v-show="isRootArray">
        <span class="spaces-form-text">
          ▶{{ $t("app.numberOfElements") }}:
        </span>
        <input
          type="number"
          class="form-control"
          placeholder="Number of elements"
          min="0"
          v-model="numberOfElements"
          onKeydown="return false"
        />
      </div>
    </div>
    <div class="form-inline">
      <div class="form-group mb-2" v-if="currentContents">
        <span class="spaces-form-text">{{ $t("app.selectedSheet") }}: </span>
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
          {{ $t("app.numberOfRows") }}:
          {{ currentContents.currentXlsxCsvContents.length }}
        </span>
        <span class="sheet-info">
          {{ $t("app.numberOfTrashedRows") }}:
          {{ currentContents.trashedRows.length }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import xlsxToJson from "@/lib/json-wizard/xlsx-to-json";
export default {
  computed: {
    isRootArray: {
      get() {
        return this.$store.getters["getCurrentTabContents"]?.isRootArray;
      },
      set(status) {
        this.$store.dispatch("setRootArrayStatus", status);
      },
    },
    numberOfElements: {
      get() {
        return this.$store.getters["getCurrentTabContents"]?.numberOfElements;
      },
      set(num) {
        this.$store.dispatch("setNumberOfArrayElements", num);
      },
    },
    currentContents() {
      return this.$store.getters["getCurrentTabContents"];
    },
    selectedSheet: {
      get() {
        return this.currentContents?.selectedSheet;
      },
      set(selectedSheet) {
        this.$store.dispatch("setSelectedSheet", selectedSheet);
      },
    },
  },
  methods: {
    currentXlsxCsv() {
      const currentTabContents = this.$store.getters["getCurrentTabContents"];
      const externalTabsInfo = this.$store.getters.getExternalTabInfo(
        currentTabContents.externalTabColumnInfo
      );
      const externalTabs = externalTabsInfo.xlsxObj;
      const xlsxToGenerate = externalTabsInfo.toGenerate;
      const locationInfo = externalTabsInfo.locationInfo;
      let columnOrder = currentTabContents?.columnOrders.slice();
      const valueIndex = columnOrder.shift();
      const parentKeys = columnOrder.reverse();
      return {
        id: currentTabContents.id,
        parentKeys,
        valueIndex,
        contents: currentTabContents.currentXlsxCsvContents,
        excludes: currentTabContents.trashedRows,
        isArray: currentTabContents.isRootArray,
        numberOfElements: currentTabContents.numberOfElements,
        externalTabs,
        xlsxToGenerate,
        locationInfo,
      };
    },
    executeConversion() {
      Number.prototype.padLeft = function (base, chr) {
        var len = String(base || 10).length - String(this).length + 1;
        return len > 0 ? new Array(len).join(chr || "0") + this : this;
      };
      const d = new Date();
      const datetime =
        [
          (d.getMonth() + 1).padLeft(),
          d.getDate().padLeft(),
          d.getFullYear(),
        ].join("/") +
        " " +
        [
          d.getHours().padLeft(),
          d.getMinutes().padLeft(),
          d.getSeconds().padLeft(),
        ].join(":");
      try {
        this.$store.dispatch("setErrorRows", []);
        const props = this.currentXlsxCsv();
        const generatedJson = xlsxToJson(props);
        this.$store.dispatch("setGeneratedJson", generatedJson);
        this.$toasted.show(this.$t("app.convertedSuccesssfully"), {
          type: "success",
        });
        this.$store.dispatch("addLog", {
          logtype: "success",
          message: "success",
          details: [],
          datetime,
        });
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } catch (error) {
        console.error(error);
        this.$store.dispatch("setErrorRows", error.body);
        this.$toasted.show(this.$t("app.conversionError"), {
          type: "error",
        });
        this.$store.dispatch("addLog", {
          logtype: "error",
          message: "keyDuplicationError",
          details: [
            {
              row: 1,
              column: 1,
            },
            {
              row: 1,
              column: 2,
            },
            {
              row: 1,
              column: 3,
            }
          ],
          datetime,
        });
      }
    },
  },
};
</script>

<style scoped>
.xlsx-csv-option-area {
  margin-left: 5px;
  /* padding-bottom: 5px; */
}
.spaces-form-text {
  margin-right: 5px;
  font-size: 12px;
}
.root-array-button {
  width: 217px;
  min-width: fit-content;
}
.selected-sheet-form {
  width: 150px !important;
  cursor: pointer;
}
.sheet-info {
  margin-left: 15px;
  font-size: 12px;
}
.value-and-key-not-selected-error {
  margin-left: 10px;
}
</style>
