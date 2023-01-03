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
    <div class="current-tab container-fluid">
      <div class="row">
        <div class="col-9">
          <XlsxCsvOptions/>
          <XlsxCsvTable/>
        </div>
        <div class="col-3">
          <XlsxCsvColumnSelector
            v-model="currentXlsxCsv.columnOrder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XlsxCsvTable from '@/components/XlsxCsvTable.vue';
import XlsxCsvColumnSelector from '@/components/XlsxCsvColumnSelector.vue';
import XlsxCsvOptions from '@/components/XlsxCsvOptions.vue';

export default {
  components: {
    XlsxCsvTable,
    XlsxCsvColumnSelector,
    XlsxCsvOptions
  },
  data () {
    return {
      xlsxCsvList: [{}],
      currentXlsxCsv: {
        columnOrder: [
          {
            name: 'Column1'
          },
          {
            name: 'Column2'
          },
          {
            name: 'Column3'
          }
        ]
      },
      selectedXlsxCsv: {},
      selectedXlsxCsvIndex: 0
    };
  },
  computed: {
    isCurrentTab () {
      return function (index) {
        return this.selectedXlsxCsvIndex === index;
      };
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