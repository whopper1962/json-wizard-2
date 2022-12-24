<template>
  <div>
    <XlsxCsvTable/>
    <JsonTable/>
  </div>
</template>

<script>
import XlsxCsvTable from '@/components/XlsxCsvTable.vue';
import JsonTable from '@/components/JsonTable.vue';

export default {
  components: {
    XlsxCsvTable,
    JsonTable
  },
  data () {
    return {};
  }
}
</script>
