<template>
  <div class="card json-card">
    <div class="card-header card-header-title">
      JSON
    </div>
    <div class="card-body">
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
      inputedJson: ``,
      invalidJsonFormat: false,
      numberOfSpaces: 4
    };
  },
  created () {
    this.inputedJson = this.generatedJson;
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
      return JSON.stringify(json, null, Number(this.numberOfSpaces));
    }
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
  font-size: 18px;
  font-weight: bold;
}
.json-card {
  align-content: left;
}
.option-button-wrapper {
  text-align: left;
  margin-bottom: 20px;
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
</style>