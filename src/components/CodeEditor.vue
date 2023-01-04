<template>
  <CodeEditor
    width="100%"
    font_size="14px"
    :language_selector="false"
    :hide_header="true"
    height="450px"
    v-model="inputedCode"
    :read_only="true"
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