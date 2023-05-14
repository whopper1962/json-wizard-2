<template>
  <div class="xlsx-csv-table-main">
    <div
      class="xlsx-csv-table-outer"
      v-if="selectedSheetMaxLen > 0 && currentColumnOrder"
    >
      <table class="xlsx-csv-table-content">
        <thead>
          <tr>
            <th class="th-button-area void-area"></th>
            <th class="th-button-area void-area"></th>
            <template v-for="num of selectedSheetMaxLen">
              <th
                :key="num"
                class="th-button-area"
                :class="{
                  'border-right': num === selectedSheetMaxLen,
                }"
              >
                <button
                  v-if="currentColumnOrder.includes(num - 1)"
                  class="btn btn-secondary btn-sm th-button font-weight-bold"
                  @click="onClickStageButton(num - 1)"
                >
                  Remove from order
                </button>
                <button
                  v-else
                  class="btn btn-info btn-sm th-button font-weight-bold"
                  @click="onClickStageButton(num - 1)"
                >
                  Add to order
                </button>
              </th>
            </template>
          </tr>
          <tr>
            <th class="border-bottom void-area"></th>
            <th class="border-bottom void-area"></th>
            <template v-for="num of selectedSheetMaxLen">
              <th
                :key="num"
                class="text-center"
                :class="{
                  'border-right': num === selectedSheetMaxLen,
                }"
              >
                Column{{ num }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in currentSheet"
            :key="`row_${rowIndex}`"
            :class="{
              'error-row': errorRows.includes(rowIndex),
              'trashed-row': trashedRows.includes(rowIndex),
            }"
          >
            <th
              class="border-bottom void-area garbage-button-wrapper index-area"
            >
              {{ rowIndex + 1 }}
            </th>
            <th
              class="border-bottom void-area garbage-button-wrapper index-area"
            >
              <button
                class="garbage-button"
                @click="onClickGarbageButton(rowIndex)"
              >
                <font-awesome-icon
                  v-if="trashedRows.includes(rowIndex)"
                  icon="fa-solid fa-trash-arrow-up"
                />
                <font-awesome-icon v-else icon="fa-solid fa-trash" />
              </button>
            </th>
            <td
              v-for="(content, index) in row"
              :key="`content_${index}`"
              class="content-cell"
              :class="{
                'context-menu-opened':
                  ctxOpenedRowIndex === rowIndex &&
                  ctxOpenedContentIndex === index,
                'mouseovered-index':
                  isMouseOvered(index) &&
                  !trashedRows.includes(rowIndex) &&
                  !isReferingExternalFile(`${rowIndex}-${index}`) &
                    !errorRows.includes(rowIndex),
                'refering-external-file': isReferingExternalFile(
                  `${rowIndex}-${index}`
                ),
                'ctx-menu-enabled-cell': isValueColumn(index),
              }"
              @contextmenu.prevent="
                isValueColumn(index)
                  ? $refs.ctxMenu.open($event, { rowIndex, index })
                  : {}
              "
            >
              {{
                isReferingExternalFile(`${rowIndex}-${index}`)
                  ? `Refering: ${isReferingExternalFile(
                      `${rowIndex}-${index}`
                    )}`
                  : content
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <ContextMenu
        id="context-menu"
        @ctx-open="onCtxOpen"
        @ctx-close="onCtxClose"
        @ctx-cancel="onCtxClose"
        ref="ctxMenu"
      >
        <li class="context-menu-item" @click="referToExternalFile()">
          <span class="ctx-title">Refer to external file</span>
        </li>
      </ContextMenu>
      <Modal
        :name="`external-file-settings-modal`"
        :clickToClose="true"
        :onClickOkButton="confirmExternalFile"
        :disableOkButton="externalFile === null"
      >
        <template slot="modal-header"> External file settings </template>
        <template slot="modal-body">
          <div class="external-file-selector-area">
            <p class="modal-msg">
              Select external file(tab). Current value will be ignored.
            </p>
            <select
              class="custom-select"
              :disabled="xlsxCsvTabs.length === 0"
              v-model="externalFile"
            >
              <option selected value=""></option>
              <template v-if="xlsxCsvTabs.length > 0">
                <option
                  v-for="(tab, index) in xlsxCsvTabs"
                  :key="`tab_${index}`"
                  :value="tab.id"
                  :disabled="
                    index === currentIndex ||
                    !tab.isExecutable ||
                    isRefered(tab)
                  "
                >
                  {{ tab.name }}
                  <template v-if="index === currentIndex">
                    (You cannot refer own tab.)
                  </template>
                  <template v-else-if="isRefered(tab)">
                    (This tab refering current tab.)
                  </template>
                  <template v-else-if="!tab.isExecutable">
                    (This tab is not executable.)
                  </template>
                </option>
              </template>
            </select>
            <p v-if="xlsxCsvTabs.length === 0" class="text-danger">
              There is no external tab.
            </p>
          </div>
        </template>
      </Modal>
    </div>
    <div v-else>Selected sheet has no data</div>
  </div>
</template>

<script>
import ContextMenu from "vue-context-menu";
import Modal from "@/components/ModalTemplate.vue";

export default {
  components: {
    ContextMenu,
    Modal,
  },
  props: {
    mouseOveredColumn: {
      type: Number,
    },
  },
  data() {
    return {
      isFileSelected: false,
      isExecuted: true,
      fileName: "",
      currentXlsxCsv: {
        columnOrder: [],
        sheetNames: [],
        contents: {},
      },
      stagedNum: [],
      ctxOpenedRowIndex: null,
      ctxOpenedContentIndex: null,
      ctxOpenedRowIndexCache: null,
      ctxOpenedContentIndexCache: null,
      externalFile: "",
      // selectedSheetMaxLen: 0,
      // currentSheet: []
    };
  },
  computed: {
    externalFileSettingsModal: () => "external-file-settings-modal",
    isValueColumn() {
      return function (columnIndex) {
        return columnIndex === this.currentColumnOrder[0];
      };
    },
    xlsxCsvTabs() {
      return this.$store.getters["getXlsxCsvTabs"].map((tab) => {
        return {
          id: tab.id,
          name: tab.tabName,
          isExecutable: tab.isExecutable,
        };
      });
    },
    isRefered() {
      return function (tabInfo) {
        const tabToCheckExTabInfo = this.$store.getters.getTabInfoById(
          tabInfo.id
        ).externalTabColumnInfo;
        if (tabToCheckExTabInfo.length === 0) return false;
        const currentTab = this.$store.getters["getCurrentTabContents"];
        return tabToCheckExTabInfo.some(
          (info) => info.referingTabId === currentTab.id
        );
      };
    },
    currentIndex() {
      return this.$store.getters["getCurrentTabIndex"];
    },
    currentColumnOrder: {
      get() {
        return this.$store.getters["getCurrentTabContents"]?.columnOrders;
      },
      set(columnOrders) {
        this.$store.dispatch("modifyColumnOrder", columnOrders);
      },
    },
    isMouseOvered() {
      return function (column) {
        if (column === null || column === undefined) return;
        return this.mouseOveredColumn === column;
      };
    },
    currentSheet() {
      return this.$store.getters["getCurrentTabContents"]
        .currentXlsxCsvContents;
    },
    currentExternalFileInfo() {
      return this.$store.getters["getCurrentTabContents"].externalTabColumnInfo;
    },
    selectedSheetMaxLen() {
      const current =
        this.$store.getters["getCurrentTabContents"].currentXlsxCsvContents;
      let lengths = [];
      for (const row of current) {
        lengths.push(row.length);
      }
      return Math.max(...lengths);
    },
    trashedRows: {
      get() {
        return this.$store.getters["getCurrentTabContents"].trashedRows;
      },
    },
    errorRows: {
      get() {
        return this.$store.getters["getErrorRows"];
      },
    },
    isReferingExternalFile() {
      return function (cell) {
        const referingTab = this.currentExternalFileInfo.find((obj) => {
          return obj.cell === cell;
        });
        if (referingTab) {
          const tab = this.$store.getters.getTabInfoById(
            referingTab.referingTabId
          );
          return tab.tabName;
        }
        return false;
      };
    },
  },
  methods: {
    onCtxOpen(locals) {
      this.ctxOpenedRowIndex = locals.rowIndex;
      this.ctxOpenedContentIndex = locals.index;
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
      const table = document.getElementsByClassName("xlsx-csv-table-outer")[0];
      table.style.overflow = "hidden";
    },
    onCtxClose() {
      this.ctxOpenedContentIndexCache = this.ctxOpenedContentIndex;
      this.ctxOpenedRowIndexCache = this.ctxOpenedRowIndex;
      this.ctxOpenedRowIndex = null;
      this.ctxOpenedContentIndex = null;
      const body = document.querySelector("body");
      body.style.overflow = "scroll";
      const table = document.getElementsByClassName("xlsx-csv-table-outer")[0];
      table.style.overflow = "scroll";
    },
    referToExternalFile() {
      this.externalFile = null;
      this.$modal.show(this.externalFileSettingsModal);
    },
    confirmExternalFile() {
      this.$store.dispatch("setExternalFileColumn", {
        rowIndex: this.ctxOpenedRowIndexCache,
        columnIndex: this.ctxOpenedContentIndexCache,
        cell: `${this.ctxOpenedRowIndexCache}-${this.ctxOpenedContentIndexCache}`,
        referingTabId: this.externalFile,
      });
    },
    onClickGarbageButton(index) {
      this.$store.dispatch("modifyTrashedRows", index);
    },
    onClickStageButton(columnNum) {
      let clonedColumnOrder = this.currentColumnOrder.slice();
      if (clonedColumnOrder.includes(columnNum)) {
        const foundIndex = clonedColumnOrder.indexOf(columnNum);
        clonedColumnOrder.splice(foundIndex, 1);
      } else {
        clonedColumnOrder.push(columnNum);
      }
      this.currentColumnOrder = clonedColumnOrder;
    },
    async execConversion() {
      this.isExecuted = true;
    },
  },
};
</script>

<style scoped>
.xlsx-csv-table-main {
  margin-left: 5px;
}
.btn-area {
  align-content: left;
}
.xlsx-csv-table-outer {
  max-height: 44rem;
  min-height: 44rem;
  overflow: scroll;
}
.xlsx-csv-table-content th,
.xlsx-csv-table-content td {
  max-width: 16rem;
  min-width: 25rem;
  padding: 0.5rem;
  max-height: 2rem;
  min-height: 2rem;
  word-break: break-all;
  line-height: 1rem;
  text-align: left;
}
.xlsx-csv-table-content td {
  height: 20px;
  border: 1px solid rgb(113, 113, 113);
}
.border-bottom {
  border-bottom: 1px solid rgb(113, 113, 113) !important;
}
.xlsx-csv-table-content thead th {
  border-left: 1px solid rgb(113, 113, 113);
  background-color: rgb(148, 211, 100);
}
.xlsx-csv-table-content thead th:first-child {
  border-left: none;
  background-color: rgb(148, 211, 100);
}
.xlsx-csv-table-content thead th:nth-child(2) {
  border-left: none;
  background-color: rgb(148, 211, 100);
}
.xlsx-csv-table-content tbody tr th:nth-child(1) {
  background-color: rgb(148, 211, 100);
}
.xlsx-csv-table-content thead tr th:nth-child(1),
.xlsx-csv-table-content tbody tr th:nth-child(1),
.xlsx-csv-table-content thead tr td:nth-child(1),
.xlsx-csv-table-content tbody tr td:nth-child(1),
.xlsx-csv-table-content thead tr th:nth-child(2),
.xlsx-csv-table-content tbody tr th:nth-child(2),
.xlsx-csv-table-content thead tr th:nth-child(3),
.xlsx-csv-table-content tbody tr th:nth-child(3) {
  position: sticky;
  position: -webkit-sticky;
}
.xlsx-csv-table-content thead tr th:nth-child(2) {
  left: 4rem;
}
.xlsx-csv-table-content thead tr th:nth-child(1),
.xlsx-csv-table-content tbody tr th:nth-child(1),
.xlsx-csv-table-content thead tr td:nth-child(1),
.xlsx-csv-table-content tbody tr td:nth-child(1) {
  left: 0;
  text-align: center;
}
.xlsx-csv-table-content thead tr th:nth-child(2) {
  left: 4rem;
}
.xlsx-csv-table-content tbody tr th:nth-child(2) {
  left: 4rem;
}
.border-right {
  border-right: 1px solid rgb(113, 113, 113) !important;
  position: sticky;
}
.xlsx-csv-table-content thead tr:nth-child(1) th,
.xlsx-csv-table-content thead tr:nth-child(2) th,
.xlsx-csv-table-content thead tr:nth-child(3) th {
  position: sticky;
  position: -webkit-sticky;
  z-index: 2;
}
.xlsx-csv-table-content thead tr:nth-child(1) th {
  top: 0;
}
.xlsx-csv-table-content thead tr:nth-child(2) th {
  top: 3.9rem;
}
.xlsx-csv-table-content thead tr:nth-child(3) th {
  top: 4rem;
}
.xlsx-csv-table-content thead tr th:nth-child(1),
.xlsx-csv-table-content thead tr th:nth-child(2) {
  z-index: 3;
}
.garbage-button-wrapper {
  position: relative;
  align-content: center;
}
.garbage-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  appearance: button;
  background-color: #94d364;
  border: 1px solid #94d364;
  border-radius: 4px;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  font-family: Graphik, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  line-height: 1.15;
  overflow: visible;
  /* padding: 3px; */
  text-align: center;
  text-transform: none;
  transition: all 80ms ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.garbage-button:disabled {
  opacity: 0.5;
}

.garbage-button:focus {
  outline: 0;
}

.garbage-button:hover {
  background-color: #83ba59;
  border-color: #83ba59;
}

.garbage-button:active {
  background-color: #94d364;
  border-color: #94d364;
}
.th-button {
  width: 100%;
  height: 100%;
  font-size: 11px;
}
.th-button-area {
  height: 35px;
}
.content-cell {
  vertical-align: top;
  min-height: 30px !important;
}
.void-area {
  max-width: 4rem !important;
  min-width: 4rem !important;
}
.text-center {
  text-align: center;
}
.trashed-row {
  background-color: rgb(176, 176, 176) !important;
}
.error-row {
  background-color: rgb(255, 158, 158);
}

.ctx-menu {
  min-width: fit-content !important;
}
.ctx-title {
  margin: 10px 5px;
}
.context-menu-item {
  cursor: pointer;
  margin: 5px 10px;
  min-width: fit-content !important;
}
.context-menu-item:hover {
  background-color: rgb(215, 214, 214);
}
.context-menu-opened {
  background-color: rgb(255, 229, 79);
}
.modal-msg {
  margin-bottom: 20px;
}
.refering-external-file {
  background-color: #bbd4fa;
}
.ctx-menu-enabled-cell {
  cursor: context-menu;
}
.mouseovered-index {
  background-color: rgb(255, 255, 155);
}
.index-area {
  text-align: center;
  background-color: #94d364;
}
</style>
