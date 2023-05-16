<template>
  <div class="json-to-source-wrapper">
    <div class="json-input-area">
      <form id="file-upload-form" @submit="jsonInputed">
        <input
          type="file"
          id="file-upload"
          @input="jsonInputed"
          accept=".json"
        />
        <label for="file-upload" id="file-drag">
          Drag a JSON file into this area<br />
          OR<br />
          <span id="file-upload-btn" class="btn btn-secondary upload-button"
            >Select a file</span
          >
        </label>
        <progress id="file-progress" value="0"><span>0</span>%</progress>

        <output for="file-upload" id="messages"></output>
      </form>
    </div>
    <div class="json-editor-area">
      <JsonEditor height="100%" :readOnly="false" v-model="json" />
    </div>
  </div>
</template>

<script>
import JsonEditor from "@/components/CodeEditor.vue";
import jsonToXlsx from "@/lib/json-wizard/json-to-xlsx";
export default {
  components: {
    JsonEditor,
  },
  data() {
    return {
      json: "",
      isInputed: false,
      isInvalidJson: false,
      csvFileName: "",
      encodedUri: "",
      jsonObj: {},
    };
  },
  computed() {},
  methods: {
    execConversion() {},
    async jsonInputed(event) {
      console.error(event);
      console.error("Hello");
      this.isInvalidJson = true;
      this.csvFileName = "";
      this.encodedUri = "";
      const fileContents = event.target.files ? event.target.files[0] : null;
      console.error(fileContents);
      if (!fileContents) return;
      try {
        const json = await this.readJson(fileContents);
        this.jsonObj = jsonToXlsx(json);
        console.error(this.jsonObj);
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
          resolve(json);
        };
      });
    },
  },
};
</script>

<style scoped>
.json-to-source-wrapper {
  padding: 20px;
}
.json-input-area {
  /* border: solid rgb(98, 98, 98); */
  border-radius: 14px;
  height: 200px;
  margin-bottom: 10px;
}
.json-editor-area {
  /* border: solid rgb(98, 98, 98);
  border-radius: 10px; */
  width: 100%;
  height: 700px;
}

body {
  font-family: sans-serif;
}

.button {
  background: #005f95;
  border: none;
  border-radius: 3px;
  color: white;
  display: inline-block;
  font-size: 19px;
  font-weight: bolder;
  letter-spacing: 0.02em;
  padding: 10px 20px;
  text-align: center;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
}

/* .btn:hover {
  background: #4499c9;
} */

.btn:active {
  background: #49ade5;
}

input[type="file"] {
  display: none;
}

#file-drag {
  border: 2px dashed #555;
  height: 100%;
  border-radius: 7px;
  color: #555;
  cursor: pointer;
  display: block;
  font-weight: bold;
  padding-top: 5em;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}

#file-drag:hover {
  background: #ddd;
}

#file-drag:hover,
#file-drag.hover {
  border-color: #3070a5;
  border-style: solid;
  box-shadow: inset 0 3px 4px #888;
  color: #3070a5;
}

#file-progress {
  display: none;
  margin: 1em auto;
  width: 100%;
}

/* #file-upload-btn {
  margin: auto;
} */

/* #file-upload-btn:hover {
  background: #4499c9;
} */

#file-upload-form {
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: bold;
}

progress {
  appearance: none;
  background: #eee;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  height: 30px;
}

progress[value]::-webkit-progress-value {
  background: -webkit-linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.2) 33%,
      rgba(0, 0, 0, 0.2) 66%,
      transparent 66%
    ),
    -webkit-linear-gradient(right, #005f95, #07294d);
  background: linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.2) 33%,
      rgba(0, 0, 0, 0.2) 66%,
      transparent 66%
    ),
    linear-gradient(right, #005f95, #07294d);
  background-size: 60px 30px, 100% 100%, 100% 100%;
  border-radius: 3px;
}

progress[value]::-moz-progress-bar {
  background: -moz-linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.2) 33%,
      rgba(0, 0, 0, 0.2) 66%,
      transparent 66%
    ),
    -moz-linear-gradient(right, #005f95, #07294d);
  background: linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.2) 33%,
      rgba(0, 0, 0, 0.2) 66%,
      transparent 66%
    ),
    linear-gradient(right, #005f95, #07294d);
  background-size: 60px 30px, 100% 100%, 100% 100%;
  border-radius: 3px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.upload-button {
  height: 30px;
  font-size: 12px;
  width: 217px;
  font-weight: bold;
}
</style>
