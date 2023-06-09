<template>
  <div class="json-to-source-wrapper">
    <div class="row form-area-container">
      <div class="json-input-area col-sm-8">
        <div
          class="drag-n-drop-area"
          @dragover.prevent
          @drop.prevent="dragFile"
        >
          <span class="file-form-notice">
            Drop awesome JSON file here or select manually.
          </span>
          <div class="form-wrapper">
            <input type="file" @change="uploadFile" />
          </div>
        </div>
      </div>
      <div class="json-input-area col-sm-4">
        <div class="mb-3">
          <label class="form-label select-title"> Download file name </label>
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            v-model="downloadFileName"
          />
          <span class="input-group-text extension-area" id="basic-addon2">{{
            downloadFileType === "xlsx" ? ".xlsx" : ".csv"
          }}</span>
        </div>
        <div class="mb-3">
          <label class="form-label select-title"> Download file format </label>
          <select class="form-control type-select" v-model="downloadFileType">
            <option value="xlsx">XLSX</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <button
          class="btn btn-primary execute-button w-100"
          @click="execDownload()"
          :disabled="isInvalidJson"
        >
          Download
        </button>
      </div>
    </div>
    <div class="json-editor-area">
      <div class="json-editor-area-title">
        <span class="float-start">Edit JSON</span>
      </div>
      <p
        class="json-format-check-notice"
        :class="{
          'text-red': isInvalidJson,
          'text-green': !isInvalidJson,
        }"
      >
        {{ isInvalidJson ? "Invalid JSON" : "It's executable!'" }}
      </p>
      <JsonEditor height="500px" :readOnly="false" v-model="json" />
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
      downloadFileName: "json-wizard",
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
  watch: {
    json(inputed) {
      try {
        this.isInvalidJson = false;
        JSON.parse(inputed);
      } catch {
        this.isInvalidJson = true;
      }
    },
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
            this.downloadFileName.length > 0
              ? `${this.downloadFileName}.csv`
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
          this.downloadFileName.length > 0
            ? `${this.downloadFileName}.xlsx`
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
        this.downloadFileName = "";
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
  margin-top: 10px;
  width: 180px;
}
.select-title {
  float: left;
  font-size: 12px;
}
.extension-area {
  width: 30px;
}
.type-select {
  cursor: pointer;
}
.file-form-notice {
  font-size: 15px;
}
.json-editor-area-title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  border-bottom: black solid;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.json-format-check-notice {
  text-align: left;
  margin-left: 10px;
  font-size: 13px;
  font-weight: bold;
}
.text-green {
  color: rgb(0, 0, 0);
}
.text-red {
  color: red;
}
</style>
