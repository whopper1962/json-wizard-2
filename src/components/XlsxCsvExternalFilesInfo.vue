<template>
  <div class="xlsx-csv-external-files-info-main card">
    <div class="card-header title">{{ $t("app.referingOtherTab") }}</div>
    <div class="card-body">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <th>{{ $t("app.valueAt") }}</th>
            <th>{{ $t("app.externalTab") }}</th>
            <th></th>
          </thead>
          <tbody>
            <tr
              v-for="(info, index) in currentExternalFileInfo"
              :key="`info_${index}`"
            >
              <td>{{ info.rowIndex + 1 }}</td>
              <td>{{ tabName(info.referingTabId) || "" }}</td>
              <td>
                <font-awesome-icon
                  :icon="['far', 'circle-xmark']"
                  class="xmark-icon"
                  @click="remove(info)"
                />
              </td>
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
      const row =
        this.$store.getters["getCurrentTabContents"].externalTabColumnInfo;
      const ordered = row.sort((a, b) => a.rowIndex - b.rowIndex);
      return ordered;
    },
    tabName() {
      return function (id) {
        return this.$store.getters.getTabInfoById(id)?.tabName;
      };
    },
  },
  methods: {
    remove(info) {
      this.$store.dispatch("removeExTabInfo", info.rowIndex);
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 12px;
}
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
.xmark-icon {
  height: 1.6rem;
  cursor: pointer;
}
</style>
