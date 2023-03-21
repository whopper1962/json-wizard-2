<template>
  <div class="xlsx-csv-external-files-info-main card">
    <div class="card-header">
      Cells refering to external file
    </div>
    <div class="card-body">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <th>Cell</th>
            <th>External file</th>
          </thead>
          <tbody>
            <tr v-for="(info, index) in currentExternalFileInfo" :key="`info_${index}`">
              <td>{{ info.cell }}</td>
              <td>{{ info.refering }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  computed: {
    currentExternalFileInfo () {
      return this.$store.getters['getCurrentTabContents'].externalTabColumnInfo;
    },
  },
  methods: {},
}
</script>

<style scoped>
.xlsx-csv-external-files-info-main {
  margin-right: 5px;
  height: 50%;
}
.table-wrapper {
  height: 100%;
  overflow: scroll;
}
.table th{
  /* position: sticky;
  background: #f2f2f2;
  top: 0;
  left: 0; */
}
.list {
  padding-left:0;
}
.list li {
  list-style:none;
}
</style>