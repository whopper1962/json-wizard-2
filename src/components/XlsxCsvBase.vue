<template>
  <div class="card xlsx-csv-card">
    <div class="card-header card-header-title">
      SOURCE
    </div>
    <div class="card-body">
      <ul class="nav nav-tabs">
        <template v-for="(xlsxCsc, index) in xlsxCsvList">
          <li class="nav-item" :key="`xlsx_csv_${index}`">
            <div
              class="nav-link link-cursor"
              :class="{
                'active': isCurrentTab(index)
              }"
              aria-current="page"
              @click="onClickTab(index)"
              @dblclick="onDoubleClickTab(index)"
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


export default {
  components: {
    XlsxCsvTable,
    XlsxCsvColumnSelector,
    XlsxCsvExternalFilesInfo,
    XlsxCsvOptions,
    SourceFileForm
  },
  data () {
    return {
      selectedXlsxCsv: {},
      selectedXlsxCsvIndex: 0,
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
    onClickTab (index) {
      this.selectedTab = index;
    },
    addNewTab () {
      this.$store.dispatch('addTab');
    },
    onDoubleClickTab () {
      console.error('Double')
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
</style>