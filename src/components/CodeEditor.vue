<template>
  <CodeEditor
    width="100%"
    font_size="10px"
    :language_selector="false"
    :hide_header="true"
    :height="height"
    v-model="inputedCode"
    :read_only="readOnly"
  />
</template>

<script>
import CodeEditor from 'simple-code-editor';
export default {
  components: {
    CodeEditor
  },
  props: {
    value: {
      type: [String]
    },
    height: {
      type: String,
      default: '600px'
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    inputedCode: {
      get () {
        return this.value;
      },
      set (inputedValue) {
        this.$emit('input', inputedValue);
      }
    }
  }
}
</script>