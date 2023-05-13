<template>
  <div class="container-width">
    <ShareBase />
    <XlsxCsvBase />
    <JsonBase />
  </div>
</template>

<script>
import ShareBase from "@/components/Share/ShareBase.vue";
import XlsxCsvBase from "@/components/XlsxCsvBase.vue";
import JsonBase from "@/components/JsonBase.vue";

export default {
  components: {
    ShareBase,
    XlsxCsvBase,
    JsonBase,
  },
  created() {
    window.scrollTo({ top: 0 });
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.container-width {
  width: 100%;
  padding: 20px;
  background-color: rgb(187, 187, 187);
}
</style>
