<template>
  <div class="user-manual-wrapper">
    <div class="manual-title">{{ $t('manual.convertXlsxToJson.title') }}</div>
    <div class="manual-content">
      <div v-html="parseMarkDown(manualContent)"/>
    </div>
  </div>
</template>

<script>
import source from "./covnert-xlsx-to-json.md"
import { marked } from 'marked';
export default {
  data () {
    return {
      manualContent: ''
    };
  },
  created () {
    this.manualContent = source;
  },
  computed: {
    parseMarkDown () {
      return function (source) {
        return marked(source);
      }
    }
  },
}
</script>

<style scoped>
.manual-title {
  font-size: 28px;
  font-weight: bold;
  border-bottom: solid black;
}
.user-manual-wrapper {
  padding: 30px;
  text-align: left;
}
.manual-content {
  margin-top: 20px;
}
</style>