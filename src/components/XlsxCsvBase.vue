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
            @contextmenu.prevent="$refs.ctxMenu.open($event, {index})"
          >
            <div
              class="nav-link link-cursor"
              :class="{
                'active': isCurrentTab(index)
              }"
              aria-current="page"
              @click="onClickTab(index)"
            >
              Select source file
            </div>
          </li>
        </template>
        <li class="nav-item">
          <button
            class="btn new-tab-button"
            @click="addNewTab()"
          >
            Add file
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
          @click="deleteTab()"
        >
          Delete Tab
        </li>
      </ContextMenu>
    </div>
    <!-- Main xlsx csv area -->
    <div class="current-tab container-fluid">
      <div class="row" v-if="xlsxCsvInputed">
        <div class="col-9">
          <XlsxCsvOptions/>
          <XlsxCsvTable/>
        </div>
        <div class="col-3">
          <XlsxCsvColumnSelector
            v-model="currentXlsxCsvTab"
          />
          <XlsxCsvExternalFilesInfo/>
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
import ContextMenu from 'vue-context-menu'

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
    };
  },
  computed: {
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
      set (orders) {
        this.$store.dispatch('modifyCurrentXlsxCsvColumnOrder', orders);
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
    deleteTab () {
      this.$store.dispatch('deleteTab', this.ctxOpendTabIndex);
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
  font-size: 18px;
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
  height: 450px;
  display: table;
  width: 100%;
}
.source-file-form-contents {
  display: table-cell;
  vertical-align: middle;
}
.new-tab-button {
  margin-left: 10px;
  background-color: rgb(218, 218, 218);
}
.delete-file {
  margin-top: 2px;
  margin-left: 51px !important;
}
.context-menu-item {
  cursor: pointer;
  margin-left: 10px;
}
</style>