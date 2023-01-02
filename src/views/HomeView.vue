<template>
  <!-- <div class="container container-width">
    <div class="row">
      <div class="col-6">
        <XlsxCsvBase/>
      </div>
      <div class="col-6">
        <JsonBase/>
      </div>
    </div>
  </div> -->
  <div>
    <XlsxCsvBase/>
    <JsonBase/>
  </div>
  <!-- <div class="row">
    <div class="col-6">.col-6</div>
    <div class="col-6">.col-6</div>
  </div> -->
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

<style scoped>
.container-width {
  width: 100%;
}
</style>