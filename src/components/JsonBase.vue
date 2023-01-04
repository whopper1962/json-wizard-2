<template>
  <div class="card json-card">
    <div class="card-header card-header-title">
      JSON
    </div>
    <div class="card-body">
      <div class="option-button-wrapper">
        <button
          class="btn btn-secondary"
          @click="copyToClipboard()"
          :disabled="invalidJsonFormat"
        >
          Copy to Clipboard
        </button>
        <span
          class="invalid-json-format-error text-danger"
          v-if="invalidJsonFormat"
        >
          Invalid JSON format!
        </span>
      </div>
      <div class="form-inline option-button-wrapper">
        <button
          class="btn btn-info mb-2"
          @click="formatJsonSpace()"
          :disabled="numberOfSpaces < 0 || invalidJsonFormat"
        >
          Format JSON spaces
        </button>
        <div class="form-group mx-sm-3 mb-2">
          <span class="spaces-form-text">
            Number of spaces:
          </span>
          <input
            type="number"
            class="form-control"
            placeholder="Number of spaces"
            min="0"
            v-model="numberOfSpaces"
          >
        </div>
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
      inputedJson: ``,
      invalidJsonFormat: false,
      numberOfSpaces: null
    };
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
    }
  },
  computed: {
    generatedJson () {
      const json = this.$store.getters['getGeneratedJson'];
      return JSON.stringify(json, null, 4);
    }
  },
  methods: {
    copyToClipboard () {
      const jsonToCopy = JSON.stringify(
        JSON.parse(this.inputedJson),
        null,
        4
      );
      navigator.clipboard.writeText(jsonToCopy)
      .then(() => {
        console.log("Copied!");
      })
      .catch((error) => {
        console.error(error);
      });
    },
    formatJsonSpace () {
      console.error(`Format spaces: ${this.numberOfSpaces}`);
      // let formattedJson = JSON.stringify(this.inputedJson, null, this.numberOfSpaces);
      // this.inputedJson = formattedJson;
    }
  }
}
</script>

<style scoped>
.card-header-title {
  font-family: 'Trattatello';
  font-size: 18px;
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
</style>