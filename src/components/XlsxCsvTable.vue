<template>
  <div class="xlsx-csv-table-main">
    <template v-if="isExecuted">
      <div class="xlsx-csv-table-outer">
        <table>
          <thead>
            <tr>
              <th>cell_01-01</th>
              <th>cell_01-02</th>
              <th>cell_01-03</th>
              <th>cell_01-04</th>
              <th>cell_01-05</th>
              <th>cell_01-06</th>
              <th>cell_01-07</th>
              <th>cell_01-08</th>
              <th>cell_01-09</th>
              <th>cell_01-10</th>
            </tr>
            <tr>
              <th>cell_02-01</th>
              <th>cell_02-02</th>
              <th>cell_02-03</th>
              <th>cell_02-04</th>
              <th>cell_02-05</th>
              <th>cell_02-06</th>
              <th>cell_02-07</th>
              <th>cell_02-08</th>
              <th>cell_02-09</th>
              <th>cell_02-10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
              <td>cell_03-07</td>
              <td>cell_03-08</td>
              <td>cell_03-09</td>
              <td>cell_03-10</td>
            </tr>
            <tr>
              <td>cell_03-01</td>
              <td>cell_03-02</td>
              <td>cell_03-03</td>
              <td>cell_03-04</td>
              <td>cell_03-05</td>
              <td>cell_03-06</td>
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
/* .xlsx-csv-table-content {
} */
.btn-area {
  align-content: left;
}
.xlsx-csv-table-outer {
  max-width: 480px;
  max-height: 240px;
  overflow: scroll;
}
table {
  border-collapse: collapse;
}
table th,
table td {
  max-width: 6rem;
  min-width: 6rem;
  padding: 0.5rem;
  max-height: 2rem;
  min-height: 2rem;
  font-size: 0.85rem;
  line-height: 1rem;
  text-align: center;
}
table thead th {
  background-color: rgb(244, 109, 154);
}
table tbody tr td:nth-child(1) {
  background-color: rgb(145, 201, 250);
}
table thead tr th:nth-child(1),
table tbody tr th:nth-child(1),
table thead tr td:nth-child(1),
table tbody tr td:nth-child(1),
table thead tr th:nth-child(2),
table tbody tr th:nth-child(2) {
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
}
table thead tr th:nth-child(1),
table tbody tr th:nth-child(1),
table thead tr td:nth-child(1),
table tbody tr td:nth-child(1) {
  left: 0;
}
/* table thead tr th:nth-child(2), */
table tbody tr th:nth-child(2),
table thead tr td:nth-child(2),
table tbody tr td:nth-child(2) {
  left: 6rem;
}
table thead tr:nth-child(1) th,
table thead tr:nth-child(2) th {
  position: sticky;
  position: -webkit-sticky;
  z-index: 2;
}
table thead tr:nth-child(1) th {
  top: 0;
}
table thead tr:nth-child(2) th {
  top: 2rem;
}
/* table thead tr th:nth-child(2), */
table thead tr th:nth-child(1) {
  z-index: 3;
}
</style>
