<template>
  <div class="xlsx-csv-external-files-info-main card">
    <div class="card-header">Cells refering to external tab</div>
    <div class="card-body">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <th>Value at...</th>
            <th>External tab</th>
          </thead>
          <tbody>
            <tr
              v-for="(info, index) in currentExternalFileInfo"
              :key="`info_${index}`"
            >
              <td>{{ info.rowIndex + 1 }}</td>
              <td>{{ tabName(info.referingTabId) || '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentExternalFileInfo() {
      return this.$store.getters["getCurrentTabContents"].externalTabColumnInfo;
    },
    tabName() {
      return function (id) {
        return this.$store.getters.getTabInfoById(id)?.tabName;
      };
    },
  },
  methods: {},
};
</script>

<style scoped>
.xlsx-csv-external-files-info-main {
  height: 47%;
}
.table-wrapper {
  height: 100%;
  overflow: scroll;
}
.table th {
  position: sticky;
  background: #f2f2f2;
  top: 0;
  left: 0;
}
.list {
  padding-left: 0;
}
.selector-style {
  height: 20px !important;
}
.list li {
  list-style: none;
}
</style>
