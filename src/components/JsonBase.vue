<template>
  <div>
    <div class="form-inline option-button-wrapper">
    </div>
    <div class="form-inline option-button-wrapper">
      <button
        class="btn btn-secondary copy-button"
        @click="copyToClipboard()"
        :disabled="invalidJsonFormat"
      >
        Copy to Clipboard
        <font-awesome-icon :icon="['far', 'clipboard']" class="copy-icon" />
      </button>
      <div class="form-group mx-sm-3">
        <span class="spaces-form-text"> Number of spaces: </span>
        <input
          type="number"
          class="form-control"
          placeholder="Number of spaces"
          min="1"
          max="10"
          v-model="numberOfSpaces"
          :disabled="invalidJsonFormat"
          onKeyDown="return false"
        />
        <span class="sourc-placeholder">Source Tab:</span>
        <span class="source-name">
          {{ isSourceDeleted ? "Source deleted" : sourceIndex }}
        </span>
      </div>
      <span
        class="invalid-json-format-error text-danger"
        v-if="invalidJsonFormat"
      >
        Invalid JSON format!
      </span>
    </div>
    <JsonEditor v-model="inputedJson" />
  </div>
</template>

<script>
import JsonEditor from "@/components/CodeEditor.vue";
export default {
  components: {
    JsonEditor,
  },
  data() {
    return {
      inputedJson: "",
      sourceIndex: "",
      invalidJsonFormat: false,
      isSourceDeleted: false,
      numberOfSpaces: 4,
    };
  },
  created() {
    this.inputedJson = this.generatedJson;
    this.sourceIndex = this.sourceInStore.tabName;
  },
  watch: {
    inputedJson(inputed) {
      try {
        this.invalidJsonFormat = false;
        JSON.parse(inputed);
      } catch {
        this.invalidJsonFormat = true;
      }
    },
    generatedJson(json) {
      this.inputedJson = json;
    },
    sourceInStore: {
      handler(source) {
        this.sourceIndex = source.tabName;
        this.isSourceDeleted = source.isSourceDeleted;
      },
      deep: true,
    },
  },
  computed: {
    generatedJson() {
      const json = this.$store.getters["getGeneratedJson"].json;
      return JSON.stringify(json, null, Number(this.numberOfSpaces));
    },
    sourceInStore() {
      return this.$store.getters.getSpecificIndexSourceInfo(
        this.sourceIndexInStore
      );
    },
    sourceIndexInStore() {
      return this.$store.getters["getGeneratedJson"].sourceIndex;
    },
  },
  methods: {
    copyToClipboard() {
      const jsonToCopy = JSON.stringify(
        JSON.parse(this.inputedJson),
        null,
        Number(this.numberOfSpaces)
      );
      navigator.clipboard
        .writeText(jsonToCopy)
        .then(() => {
          console.log("Copied!");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.card-header-title {
  font-family: "Trattatello";
  background-color: #b3b3b3;
  font-size: 15px;
  font-weight: bold;
}
.json-card {
  align-content: left;
  border: #b3b3b3 solid;
}
.option-button-wrapper {
  text-align: left;
  margin-bottom: 10px;
}
.invalid-json-format-error {
  margin-left: 15px;
}
.format-json-spaces-area {
  display: inline-block;
}
.spaces-form-text {
  margin-right: 5px;
  font-size: 12px;
}
.error-msg-area {
  margin-bottom: 10px;
}
.source-name {
  font-weight: bold;
  font-size: 13px;
}
.sourc-placeholder {
  font-size: 10px;
  margin-right: 5px;
  margin-left: 10px;
  font-size: 12px;
}
/* .source-tab-area {
  margin-bottom: 5px;
} */
.copy-button {
  width: 217px;
  font-weight: bold;
}
/* .copy-icon {
  height: 1.3rem;
} */
</style>
