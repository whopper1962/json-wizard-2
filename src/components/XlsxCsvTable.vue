<template>
  <div class="xlsx-csv-table-main">
    <div class="xlsx-csv-table-outer" v-if="selectedSheetMaxLen > 0 && currentColumnOrder">
      <table class="xlsx-csv-table-content">
        <thead>
          <tr>
            <th class="th-button-area void-area"></th>
            <template v-for="num of selectedSheetMaxLen">
              <th
                :key="num"
                class="th-button-area"
                :class="{
                  'border-right': num === selectedSheetMaxLen
                }"
              >
                <button
                  v-if="currentColumnOrder.includes(num - 1)"
                  class="btn btn-secondary btn-sm th-button font-weight-bold"
                  @click="onClickStageButton(num - 1)"
                >
                  Staged
                </button>
                <button
                  v-else
                  class="btn btn-info btn-sm th-button font-weight-bold"
                  @click="onClickStageButton(num - 1)"
                >
                  Stage
                </button>
              </th>
            </template>
          </tr>
          <tr>
            <th class="border-bottom void-area"></th>
            <template v-for="num of selectedSheetMaxLen">
              <th
                :key="num"
                class="text-center"
                :class="{
                  'border-right': num === selectedSheetMaxLen
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
            <th class="border-bottom void-area garbage-button-wrapper">
              <button
                class="garbage-button"
                @click="onClickGarbageButton(rowIndex)"
              >
                <font-awesome-icon
                  v-if="trashedRows.includes(rowIndex)"
                  icon="fa-solid fa-trash-arrow-up"
                />
                <font-awesome-icon
                  v-else
                  icon="fa-solid fa-trash"
                />
              </button>
            </th>
            <td
              v-for="(content, index) in row"
              :key="`content_${index}`"
              class="content-cell"
              :class="{
                'context-menu-opened':
                  ctxOpenedRowIndex === rowIndex && ctxOpenedContentIndex === index
              }"
              @contextmenu.prevent="$refs.ctxMenu.open($event, {rowIndex, index})"
            >
              {{ content }}
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
        <li
          class="context-menu-item"
          @click="referToExternalFile()"
        >
          <span class="ctx-title">Refer to external file</span>
        </li>
      </ContextMenu>
      <Modal :name="`external-file-settings-modal`" :clickToClose="true">
        <template slot="modal-header">
          External file settings
        </template>
        <template slot="modal-body">
          <p class="modal-msg">
            Select external file(tab). Current value will be ignored.
          </p>
          <select class="custom-select">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </template>
      </Modal>
    </div>
    <div v-else>Selected sheet has no data</div>
  </div>
</template>

<script>
import ContextMenu from 'vue-context-menu';
import Modal from '@/components/ModalTemplate.vue';

export default {
  components: {
    ContextMenu,
    Modal
  },
  data() {
    return {
      isFileSelected: false,
      isExecuted: true,
      fileName: "",
      currentXlsxCsv: {
        columnOrder: [],
        sheetNames: [],
        contents: {}
      },
      stagedNum: [],
      ctxOpenedRowIndex: null,
      ctxOpenedContentIndex: null
      // selectedSheetMaxLen: 0,
      // currentSheet: []
    };
  },
  computed: {
    externalFileSettingsModal: () => 'external-file-settings-modal',
    currentColumnOrder: {
      get () {
        return this.$store.getters['getCurrentTabContents']?.columnOrders;
      },
      set (columnOrders) {
        this.$store.dispatch('modifyColumnOrder', columnOrders);
      }
    },
    currentSheet () {
      return this.$store.getters['getCurrentTabContents'].currentXlsxCsvContents;
    },
    selectedSheetMaxLen () {
      const current = this.$store.getters['getCurrentTabContents'].currentXlsxCsvContents;
      let lengths = [];
      for (const row of current) {
        lengths.push(row.length);
      }
      return Math.max(...lengths);
    },
    trashedRows: {
      get () {
        return this.$store.getters['getCurrentTabContents'].trashedRows;
      }
    },
    errorRows: {
      get () {
        return this.$store.getters['getErrorRows'];
      }
    }
  },
  methods: {
    onCtxOpen (locals) {
      this.ctxOpenedRowIndex = locals.rowIndex;
      this.ctxOpenedContentIndex = locals.index;
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
      const table = document.getElementsByClassName('xlsx-csv-table-outer')[0];
      table.style.overflow = 'hidden';
    },
    onCtxClose () {
      this.ctxOpenedRowIndex = null;
      this.ctxOpenedContentIndex = null;
      const body = document.querySelector('body');
      body.style.overflow = 'scroll';
      const table = document.getElementsByClassName('xlsx-csv-table-outer')[0];
      table.style.overflow = 'scroll';
    },
    referToExternalFile () {
      console.error('External file');
      this.$modal.show(this.externalFileSettingsModal);
    },
    onClickGarbageButton (index) {
      this.$store.dispatch('modifyTrashedRows', index);
    },
    onClickStageButton (columnNum) {
      let clonedColumnOrder = this.currentColumnOrder.slice();
      if (clonedColumnOrder.includes(columnNum)) {
        const foundIndex = clonedColumnOrder.indexOf(columnNum);
        clonedColumnOrder.splice(foundIndex, 1);
      } else {
        clonedColumnOrder.push(columnNum)
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
  max-height: 600px;
  overflow: scroll;
}
.xlsx-csv-table-content th,
.xlsx-csv-table-content td {
  max-width: 16rem;
  min-width: 16rem;
  padding: 0.5rem;
  max-height: 2rem;
  min-height: 2rem;
  word-break : break-all;
  line-height: 1rem;
  text-align: left;
}
.xlsx-csv-table-content td {
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
  z-index: 1;
}
.xlsx-csv-table-content thead tr th:nth-child(1),
.xlsx-csv-table-content tbody tr th:nth-child(1),
.xlsx-csv-table-content thead tr td:nth-child(1),
.xlsx-csv-table-content tbody tr td:nth-child(1) {
  left: 0;
}
.xlsx-csv-table-content tbody tr th:nth-child(2),
.xlsx-csv-table-content thead tr td:nth-child(2),
.xlsx-csv-table-content tbody tr td:nth-child(2) {
  left: 6rem;
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
  top: 2.95rem;
}
.xlsx-csv-table-content thead tr:nth-child(3) th {
  top: 4rem;
}
.xlsx-csv-table-content thead tr th:nth-child(1) {
  z-index: 3;
}
.garbage-button-wrapper {
  position: relative;
  align-content: center;
}
.garbage-button {
  position:absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  appearance: button;
  background-color: #94D364;
  border: 1px solid #94D364;
  border-radius: 4px;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  font-family: Graphik,-apple-system,system-ui,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
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
  opacity: .5;
}

.garbage-button:focus {
  outline: 0;
}

.garbage-button:hover {
  background-color: #83ba59;
  border-color: #83ba59;
}

.garbage-button:active {
  background-color: #94D364;
  border-color: #94D364;
}
.th-button {
  width: 100%;
  height: 100%;
}
.th-button-area {
  height: 35px;
}
.content-cell {
  cursor: pointer;
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
</style>
