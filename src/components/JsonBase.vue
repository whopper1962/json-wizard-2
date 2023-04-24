<template>
  <div class="card json-card">
    <div class="card-header card-header-title">
      JSON
    </div>
    <div class="card-body">
      <div class="form-inline option-button-wrapper">
        <span class="sourc-placeholder">Source:</span>
        <span class="source-name">{{ sourceIndex }}</span>
      </div>
      <div class="form-inline option-button-wrapper">
        <button
          class="btn btn-secondary"
          @click="copyToClipboard()"
          :disabled="invalidJsonFormat"
        >
          Copy to Clipboard
        </button>
        <div class="form-group mx-sm-3">
          <span class="spaces-form-text">
            Number of spaces:
          </span>
          <input
            type="number"
            class="form-control"
            placeholder="Number of spaces"
            min="1"
            max="10"
            v-model="numberOfSpaces"
            :disabled="invalidJsonFormat"
            onKeyDown="return false"
          >
        </div>
        <span
          class="invalid-json-format-error text-danger"
          v-if="invalidJsonFormat"
        >
          Invalid JSON format!
        </span>
      </div>
      <JsonEditor
        v-model="inputedJson"
      />
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/CodeEditor.vue';
export default {
  components: {
    JsonEditor
  },
  data () {
    return {
      inputedJson: '',
      sourceIndex: '',
      invalidJsonFormat: false,
      numberOfSpaces: 4
    };
  },
  created () {
    this.inputedJson = this.generatedJson;
    this.sourceIndex = this.sourceInStore.tabName;
  },
  watch: {
    inputedJson (inputed) {
      try {
        this.invalidJsonFormat = false;
        JSON.parse(inputed);
      } catch {
        this.invalidJsonFormat = true;
      }
    },
    generatedJson (json) {
      this.inputedJson = json; 
    },
    sourceInStore: {
      handler (source) {
        this.sourceIndex = source.tabName;
      },
      deep: true
    }
  },
  computed: {
    generatedJson () {
      const json = this.$store.getters['getGeneratedJson'].json;
      return JSON.stringify(json, null, Number(this.numberOfSpaces));
    },
    sourceInStore () {
      return this.$store.getters.getSpecificIndexSourceInfo(this.sourceIndexInStore);
    },
    sourceIndexInStore() {
      return this.$store.getters['getGeneratedJson'].sourceIndex;
    },
  },
  methods: {
    copyToClipboard () {
      const jsonToCopy = JSON.stringify(
        JSON.parse(this.inputedJson),
        null,
        Number(this.numberOfSpaces)
      );
      navigator.clipboard.writeText(jsonToCopy)
      .then(() => {
        console.log("Copied!");
      })
      .catch((error) => {
        console.error(error);
      });
    },
  }
}
</script>

<style scoped>
.card-header-title {
  font-family: 'Trattatello';
  font-size: 15px;
  font-weight: bold;
}
.json-card {
  align-content: left;
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
}
.error-msg-area {
  margin-bottom: 10px;
}
.source-name {
  font-weight: bold;
}
.sourc-placeholder {
  font-size: 10px;
  margin-right: 5px;
}
/* .source-tab-area {
  margin-bottom: 5px;
} */
</style>