<template>
  <div class="xlsx-csv-table-main">
    <template v-if="isExecuted">
      <div class="xlsx-csv-table-outer">
        <table class="xlsx-csv-table-content">
          <thead>
            <tr>
              <th></th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th>Add to keys</th>
              <th class="border-right">Add to keys</th>
            </tr>
            <tr>
              <th></th>
              <th>
                Set as value
              </th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th>Set as value</th>
              <th class="border-right">Set as value</th>
            </tr>
            <tr>
              <th class="border-bottom"></th>
              <th>Column1</th>
              <th>Column2</th>
              <th>Column3</th>
              <th>Column4</th>
              <th>Column5</th>
              <th>Column6</th>
              <th>Column7</th>
              <th>Column8</th>
              <th>Column9</th>
              <th>Column10</th>
              <th>Column11</th>
              <th>Column12</th>
              <th>Column1</th>
              <th>Column2</th>
              <th>Column3</th>
              <th>Column4</th>
              <th>Column5</th>
              <th>Column6</th>
              <th>Column7</th>
              <th>Column8</th>
              <th>Column9</th>
              <th>Column10</th>
              <th>Column11</th>
              <th>Column12</th>
              <th>Column12</th>
              <th class="border-right">cell_02-10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
              <th class="border-bottom">
                <button
                  class="garbage-button"
                  @click="onClickGarbageButton(0)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </th>
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
    onClickGarbageButton (index) {
      console.error(index);
    },
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
  margin-left: 5px;
}
.btn-area {
  align-content: left;
}
.xlsx-csv-table-outer {
  max-width: 100%;
  max-height: 450px;
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
.garbage-button {
  width: 100%;
  appearance: button;
  background-color: #969ba7;
  border: 1px solid #969ba7;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Graphik,-apple-system,system-ui,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  font-size: 14px;
  line-height: 1.15;
  overflow: visible;
  padding: 3px;
  height: 100%;
  position: relative;
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
  background-color: #848893;
  border-color: #848893;
}

.garbage-button:active {
  background-color: #969ba7;
  border-color: #969ba7;
}
</style>
