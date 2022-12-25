<template>
  <div>
    <XlsxCsvBase/>
    <JsonBase/>
  </div>
</template>

<script>
import XlsxCsvBase from '@/components/XlsxCsvBase.vue';
import JsonBase from '@/components/JsonBase.vue';

export default {
  components: {
    XlsxCsvBase,
    JsonBase
  },
  data () {
    return {};
  }
}
</script>
