<template>
  <div class="card conversion-log-wrapper">
    <div class="card-header title">
      {{ $t("app.log") }}
      <font-awesome-icon :icon="['fas', 'cubes-stacked']" />
      <!-- <font-awesome-icon :icon="['fas', 'broom']" class="clean-logs" /> -->
    </div>
    <div class="card-body log-area" id="log-area">
      <template v-for="(log, index) in logs">
        <div
          :key="`log_${index}`"
          :class="{
            'succeed-log': log.logtype === 'success',
            'error-log': log.logtype === 'error',
          }"
        >
          <span
            >> {{ $t(`logMessage.${log.message}`) }} [{{ log.datetime }}]</span
          >
          <template v-if="log.details.length > 0">
            <ul v-for="(detail, index) in log.details" :key="`detail_${index}`">
              <li>Column:{{ detail.column }}, Row:{{ detail.row }}</li>
            </ul>
          </template>
        </div>
      </template>
      <br v-for="num of 20" :key="num" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    logs() {
      return this.$store.getters["getLogs"];
    },
    selectedTab() {
      return this.$store.getters["getSelectedTabIndex"];
    },
  },
  mounted() {
    this.toBottom();
  },
  watch: {
    logs() {
      this.toBottom();
    },
    selectedTab() {
      this.toBottom();
    },
  },
  methods: {
    toBottom() {
      document.getElementById("log-area").scrollTop = 9999999999999999999999;
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 12px;
}
.conversion-log-wrapper {
  margin-left: 5px;
}
.log-area {
  /* height: 100%; */
  min-height: 450px;
  max-height: 450px;
  overflow: scroll;
  background-color: rgb(67, 65, 65);
  border-radius: 0px 0px 3px 3px;
  color: white;
  font-family: "Menlo";
  font-size: 10px;
  text-align: left;
  font-weight: bold;
}
.succeed-log {
  color: rgb(121, 225, 3);
}
.error-log {
  color: rgb(250, 66, 66);
}
.clean-logs {
  float: right;
  border: solid rgb(105, 104, 104);
  padding: 3px;
  cursor: pointer;
  border-radius: 5px;
}
.clean-logs:hover {
  color: white;
  background-color: rgb(105, 104, 104);
}
</style>
