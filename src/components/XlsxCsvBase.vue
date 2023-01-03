<template>
  <div class="card xlsx-csv-card">
    <div class="card-header card-header-title">
      XLSX / CSV
    </div>
    <div class="card-body">
      <div class="execute-conversion-button-wrapper">
        <button
          class="btn btn-primary font-weight-bold"
          @click="executeConversion()"
        >
          Execute conversion
        </button>
      </div>
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
            >
              ({{ index + 1 }}) xlsx-test-file.xlsx
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- Main xlsx csv area -->
    <div class="current-tab container-fluid">
      <div class="row" v-if="!xlsxCsvInputed">
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
      <div v-else>
        <SourceFileForm/>
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
      xlsxCsvList: [{}],
      selectedXlsxCsv: {},
      selectedXlsxCsvIndex: 0,
      xlsxCsvInputed: false
    };
  },
  computed: {
    isCurrentTab () {
      return function (index) {
        return this.selectedXlsxCsvIndex === index;
      };
    },
    currentXlsxCsvTab: {
      get () {
        return this.$store.getters['getCurrentTabContents'].columnOrders;
      },
      set (orders) {
        this.$store.dispatch('modifyCurrentXlsxCsvColumnOrder', orders);
      }
    }
  },
  methods: {
    onClickTab (index) {
      this.selectedXlsxCsvIndex = index;
    },
    executeConversion () {
      console.error('executeConversion');
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
</style>