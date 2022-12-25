<template>
  <div class="xlsx-csv-table-main">
    <template v-if="isExecuted">
      <div class="xlsx-csv-table-outer">
        <table class="xlsx-csv-table-content">
          <thead>
            <tr>
              <th></th>
              <th>cell_01-02</th>
              <th>cell_01-03</th>
              <th>cell_01-04</th>
              <th>cell_01-05</th>
              <th>cell_01-06</th>
              <th>cell_01-07</th>
              <th>cell_01-08</th>
              <th>cell_01-09</th>
              <th>cell_01-06</th>
              <th>cell_01-07</th>
              <th>cell_01-08</th>
              <th>cell_01-09</th>
              <th class="border-right">cell_01-10</th>
            </tr>
            <tr>
              <th></th>
              <th>cell_02-02</th>
              <th>cell_02-03</th>
              <th>cell_02-04</th>
              <th>cell_02-05</th>
              <th>cell_02-06</th>
              <th>cell_02-07</th>
              <th>cell_02-08</th>
              <th>cell_02-09</th>
              <th>cell_01-06</th>
              <th>cell_01-07</th>
              <th>cell_01-08</th>
              <th>cell_01-09</th>
              <th class="border-right">cell_02-10</th>
            </tr>
            <tr>
              <th class="border-bottom"></th>
              <th>cell_02-02</th>
              <th>cell_02-03</th>
              <th>cell_02-04</th>
              <th>cell_02-05</th>
              <th>cell_02-06</th>
              <th>cell_02-07</th>
              <th>cell_02-08</th>
              <th>cell_02-09</th>
              <th>cell_01-06</th>
              <th>cell_01-07</th>
              <th>cell_01-08</th>
              <th>cell_01-09</th>
              <th class="border-right">cell_02-10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <th class="border-bottom">cell_03-01</th>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>
      <input
        type="file"
        class="form-control-file"
        accept=".xls,.xlsx,.csv"
        @change="fileInputed"
      />
      <div class="btn-area">
        <button
          class="btn btn-primary"
          :disabled="!isFileSelected"
          @click="execConversion()"
        >
          Read
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFileSelected: false,
      isExecuted: true,
      fileName: "",
    };
  },
  computed: {},
  methods: {
    async fileInputed(event) {
      this.isFileSelected = false;
      const fileContents = event.target.files ? event.target.files[0] : null;
      if (!fileContents) return;
      this.isFileSelected = true;
      // this.sourceFileName = fileContents.name;
      // const inputedFileExtension = this.sourceFileName.split('.').pop();
      // if (inputedFileExtension === 'csv') {
      //   this.readCsv(event.target.files[0]);
      // } else {
      //   this.readXlsx(fileContents);
      // }
    },
    async execConversion() {
      this.isExecuted = true;
    },
  },
};
</script>

<style scoped>
.xlsx-csv-table-main {
  margin: 0px 20px;
}
.btn-area {
  align-content: left;
}
.xlsx-csv-table-outer {
  max-width: 100%;
  max-height: 500px;
  overflow: scroll;
}
.xlsx-csv-table-content th,
.xlsx-csv-table-content td {
  max-width: 6rem;
  min-width: 6rem;
  padding: 0.5rem;
  max-height: 2rem;
  min-height: 2rem;
  font-size: 0.85rem;
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
  top: 2rem;
}
.xlsx-csv-table-content thead tr:nth-child(3) th {
  top: 4rem;
}
.xlsx-csv-table-content thead tr th:nth-child(1) {
  z-index: 3;
}
</style>
