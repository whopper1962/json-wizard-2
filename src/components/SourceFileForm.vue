<template>
  <div class="xlsx-csv-file-input-form-main">
    <input
      type="file"
      accept=".xls,.xlsx,.csv"
      @change="xlsxCsvFileInputed"
    >
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';

export default {
  props: {},
  data () {
    return {
      sheetNames: [],
      xlsxContents: {}
    };
  },
  methods: {
    xlsxCsvFileInputed (event) {
      const fileContents = event.target.files ? event.target.files[0] : null;
      if (!fileContents) return;
      const inputedFileExtension = fileContents.name.split('.').pop();
      if (inputedFileExtension === 'csv') {
        this.readCsv(fileContents);
      } else {
        this.readXlsx(fileContents);
      }
    },
    readCsv (fileContents) {
      console.error('CSV');
      console.error(fileContents);
    },
    async readXlsx (fileContents) {
      await this.getSheetNames(fileContents);
      await this.fetchXlsx(fileContents, this.sheetNames);
      console.error(this.xlsxContents);
    },
    getSheetNames (fileContents) {
      return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(fileContents);
        fileReader.onload = () => {
          this.arrayBuffer = fileReader.result;
          const data = new Uint8Array(this.arrayBuffer);
          const arr = new Array();
          for (let i = 0; i != data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
          }
          const bstr = arr.join('');
          const workbook = XLSX.read(bstr, { type: 'binary' });
          this.sheetNames = workbook.SheetNames;
          resolve();
        };
      });
    },
    async fetchXlsx (fileContents) {
      for (const currentSheetName of this.sheetNames) {
        await readXlsxFile(fileContents, {
          sheet: currentSheetName
        }).then((rows) => {
          this.xlsxContents = Object.assign({}, this.xlsxContents, {
            [currentSheetName]: rows
          });
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  },
}
</script>

<style scoped>
.xlsx-csv-file-input-form-main {
  height: 400px;
}
</style>