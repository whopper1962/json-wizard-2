<template>
  <div>
    <ShareBase/>
    <XlsxCsvBase/>
    <JsonBase/>
  </div>
</template>

<script>
import ShareBase from '@/components/Share/ShareBase.vue';
import XlsxCsvBase from '@/components/XlsxCsvBase.vue';
import JsonBase from '@/components/JsonBase.vue';

export default {
  components: {
    ShareBase,
    XlsxCsvBase,
    JsonBase
  },
  data () {
    return {};
  }
}
</script>

<style scoped>
.container-width {
  width: 100%;
}
</style>