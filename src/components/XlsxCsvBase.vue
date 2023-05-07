<template>
  <div class="card xlsx-csv-card">
    <div class="card-header card-header-title">
      SOURCE
    </div>
    <div class="card-body">
      <ul class="nav nav-tabs">
        <template v-for="(xlsxCsc, index) in xlsxCsvList">
          <li
            class="nav-item"
            :key="`xlsx_csv_${index}`"
          >
            <div
              class="nav-link link-cursor tab-item"
              v-if="isChangingTabName(index)"
              :class="{
                'active': isCurrentTab(index)
              }"
              aria-current="page"
            >
              <input
                type="text"
                class="tab-name-form"
                :class="{
                  'invalid-name': invalidTabName
                }"
                :placeholder="invalidTabName ? 'Invalid tab name' : ''"
                v-model="tabName"
                v-focus
                v-click-outside="clickOutside"
                @keydown.enter.prevent="submitTabName()"
              >
            </div>
            <div
              class="nav-link link-cursor tab-item"
              v-else
              :class="{
                'active': isCurrentTab(index)
              }"
              aria-current="page"
              @contextmenu.prevent="$refs.ctxMenu.open($event, {index})"
              @dblclick="changeTabName(index)"
              @click="onClickTab(index)"
            >
              {{ xlsxCsc.tabName }}
            </div>
          </li>
        </template>
        <li class="nav-item">
          <button
            class="btn new-tab-button"
            @click="addNewTab()"
          >
            Add source file
          </button>
        </li>
      </ul>
      <ContextMenu
        id="context-menu"
        @ctx-open="onCtxOpen"
        ref="ctxMenu"
        class="hello"
      >
        <li
          class="context-menu-item"
          @click="changeTabName()"
        >
          <span class="ctx-title">Change tab name</span>
        </li>
        <li
          class="context-menu-item"
          @click="deleteTab()"
        >
          <span class="ctx-title">Delete tab</span>
        </li>
      </ContextMenu>
    </div>
    <!-- Main xlsx csv area -->
    <div class="current-tab container-fluid">
      <div class="row" v-if="xlsxCsvInputed">
        <div class="col-9">
          <XlsxCsvOptions/>
          <XlsxCsvTable
            :mouseOveredColumn="mouseOveredColumn"
          />
        </div>
        <div class="col-3">
          <XlsxCsvColumnSelector
            v-model="currentXlsxCsvTab"
            @updateHighlightedColumn="updateHighlightedColumn"
          />
          <XlsxCsvExternalFilesInfo/>
          <div class="select-other-file-button-wrapper">
            <button
              class="btn btn-secondary mb-2 font-weight-bold select-other-file-button"
              @click="selectOtherFile()"
            >
              Select other file
            </button>
          </div>
        </div>
      </div>
      <div class="source-file-form-wrapper" v-else>
        <div class="source-file-form-contents">
          <SourceFileForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XlsxCsvTable from '@/components/XlsxCsvTable.vue';
import XlsxCsvColumnSelector from '@/components/XlsxCsvColumnSelector.vue';
import XlsxCsvOptions from '@/components/XlsxCsvOptions.vue';
import XlsxCsvExternalFilesInfo from '@/components/XlsxCsvExternalFilesInfo.vue';
import SourceFileForm from '@/components/SourceFileForm.vue';
import ContextMenu from 'vue-context-menu';

export default {
  components: {
    XlsxCsvTable,
    XlsxCsvColumnSelector,
    XlsxCsvExternalFilesInfo,
    XlsxCsvOptions,
    ContextMenu,
    SourceFileForm
  },
  data () {
    return {
      selectedXlsxCsv: {},
      selectedXlsxCsvIndex: 0,
      ctxOpendTabIndex: 0,
      changingTabNameIndex: null,
      invalidTabName: false,
      tabName: '',
      mouseOveredColumn: null
    };
  },
  watch: {
    tabName () {
      this.invalidTabName = false;
    }
  },
  computed: {
    isChangingTabName () {
      return function (index) {
        return this.changingTabNameIndex === index;
      };
    },
    isCurrentTab () {
      return function (index) {
        return this.selectedTab === index;
      };
    },
    xlsxCsvInputed () {
      return this.$store.getters['getCurrentTabContents']?.fileInputed;
    },
    xlsxCsvList () {
      return this.$store.getters['getXlsxCsvTabs'];
    },
    currentXlsxCsvTab: {
      get () {
        return this.$store.getters['getCurrentTabContents']?.columnOrders;
      },
      set (ordersInfo) {
        this.$store.dispatch('modifyCurrentXlsxCsvColumnOrder', ordersInfo);
      }
    },
    selectedTab: {
      get () {
        return this.$store.getters['getSelectedTabIndex'];
      },
      set (index) {
        this.$store.dispatch('setTabIndex', index);
      }
    },
    isValueAndKeySelected () {
      const currentContents = this.$store.getters['getCurrentTabContents'];
      return currentContents?.columnOrders.length > 1;
    }
  },
  methods: {
    onCtxOpen (locals) {
      this.ctxOpendTabIndex = locals.index;
    },
    onClickTab (index) {
      this.selectedTab = index;
    },
    addNewTab () {
      this.$store.dispatch('addTab');
    },
    onDoubleClickTab () {
      console.error('Double')
    },
    updateHighlightedColumn (column) {
      this.mouseOveredColumn = column;
    },
    deleteTab () {
      this.$store.dispatch('deleteTab', this.ctxOpendTabIndex);
    },
    selectOtherFile () {
      this.$store.dispatch('selectOtherFile');
    },
    changeTabName (index = null) {
      if (index !== null) this.ctxOpendTabIndex = index;
      const currentTabName = this.$store.getters.getContentsByIndex(this.ctxOpendTabIndex);
      this.tabName = currentTabName.tabName.slice();
      this.changingTabNameIndex = this.ctxOpendTabIndex;
    },
    submitTabName () {
      try {
        if (this.tabName.length === 0) {
          this.invalidTabName = true;
          return;
        }
        this.$store.dispatch('modifyTabNameByIndex', {
          index: this.changingTabNameIndex,
          name: this.tabName.trim()
        });
        this.changingTabNameIndex = null;
      } catch (_) {
        alert(`"${this.tabName}" already used as other tab name.`);
      }
    },
    clickOutside () {
      this.changingTabNameIndex = null;
    }
  }
}
</script>

<style scoped>
.xlsx-csv-card {
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.card-header-title {
  font-family: 'Trattatello';
  font-size: 15px;
  font-weight: bold;
}
.link-cursor {
  cursor: pointer;
}
.current-tab {
  width: 100%;
}
.execute-conversion-button-wrapper {
  text-align: left;
  margin-bottom: 20px;
}
.source-file-form-wrapper {
  height: 481px;
  display: table;
  width: 100%;
}
.source-file-form-contents {
  display: table-cell;
  vertical-align: middle;
}
.new-tab-button {
  margin-left: 10px;
  height: 95%;
  background-color: rgb(218, 218, 218);
}
.delete-file {
  margin-top: 2px;
  margin-left: 51px !important;
}
.context-menu-item {
  cursor: pointer;
  margin: 5px 10px;
}
.context-menu-item:hover {
  background-color: rgb(215, 214, 214);
}
.ctx-title {
  margin: 10px 5px;
}
.tab-item {
  width: fit-content;
  min-width: 100px;
  font-size: 12px;
  height: 30px;
}
.tab-name-form {
  height: 30px;
}
.invalid-name {
  background-color: rgb(255, 161, 161);
}
.select-other-file-button-wrapper {
  padding-top: 5px;
}
.select-other-file-button {
  width: 100%;
  height: 4%;
}
</style>