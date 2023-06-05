<template>
  <div class="json-to-source-wrapper">
    <div class="row form-area-container">
      <div class="json-input-area col-sm-8">
        <div class="drag-n-drop-area" @dragover.prevent @drop.prevent="dragFile">
          <div class="form-wrapper">
            <input type="file" @change="uploadFile" />
          </div>
        </div>
      </div>
      <div class="json-input-area col-sm-4">
        <button
          class="btn btn-primary execute-button"
          @click="execDownload()"
          :disabled="isInvalidJson"
        >
          Download
        </button>
      </div>
    </div>
    <div class="json-editor-area">
      <JsonEditor height="100%" :readOnly="false" v-model="json" />
    </div>
  </div>
</template>

<script>
import JsonEditor from "@/components/CodeEditor.vue";
import jsonToXlsx from "@/lib/json-wizard/json-to-xlsx";
import writeXlsxFile from "write-excel-file";
export default {
  components: {
    JsonEditor,
  },
  data() {
    return {
      isInvalidJson: true,
      jsonObj: {},
      encodedUri: "",
      csvFileName: "",
      sourceFileName: "",
      downloadFileType: "xlsx",
      inputedJson: "",
      isInputJsonMode: false,
      isArrayRoot: false,
      numberOfElements: 1,
      json: "",
      isInputed: false,
    };
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      this.jsonInputed(file);
    },
    dragFile(e) {
      const file = e.dataTransfer.files[0];
      this.jsonInputed(file);
    },
    execDownload() {
      try {
        if (this.downloadFileType === "xlsx") {
          this.createXlsx();
        } else {
          let csvContent = "data:text/csv;charset=utf-8,";
          this.jsonObj.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
          });
          this.encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", this.encodedUri);
          link.setAttribute(
            "download",
            this.csvFileName.length > 0
              ? `${this.csvFileName}.csv`
              : "json-wizard.csv"
          );
          document.body.appendChild(link);
          link.click();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async createXlsx() {
      let xlsxColumns = [];
      for (const row of this.jsonObj) {
        let column = [];
        for (const elem of row) {
          column.push({
            value: elem,
          });
        }
        xlsxColumns.push(column);
      }
      writeXlsxFile(xlsxColumns, {
        fileName:
          this.csvFileName.length > 0
            ? `${this.csvFileName}.xlsx`
            : "json-wizard.xlsx",
      });
    },
    async jsonInputed(fileContents) {
      if (!fileContents) return;
      try {
        const json = await this.readJson(fileContents);
        this.jsonObj = jsonToXlsx(json);
        this.isInvalidJson = false;
        this.isInputed = true;
      } catch (error) {
        console.error(error);
        this.isInvalidJson = true;
        this.csvFileName = "";
        this.encodedUri = "";
        this.isInvalidJson = true;
      }
    },
    async readJson(fileContents) {
      return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsText(fileContents);
        fileReader.onload = (e) => {
          const json = JSON.parse(e.target.result);
          this.json = JSON.stringify(json, null, 4);
          resolve(json);
        };
      });
    },
  },
};
</script>

<style scoped>
.form-area-container {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
.form-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.execute-button-area {
  height: 100%;
  border: none !important;
}
.json-to-source-wrapper {
  padding: 20px;
  background-color: rgb(187, 187, 187);
}
.json-input-area {
  border-radius: 14px;
  height: 150px;
  margin-bottom: 10px;
}
.json-editor-area {
  width: 100%;
  height: 700px;
}
.drag-n-drop-area {
  height: 100%;
  border-radius: 15px;
  padding: 20px;
  font-family: arial;
  outline: dashed 3px black;
  position: relative;
}
.no-border {
  outline: none !important;
}
.execute-button {
  width: 180px;
}
</style>
