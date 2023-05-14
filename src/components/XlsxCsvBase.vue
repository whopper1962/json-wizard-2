<template>
  <div class="xlsx-csv-card">
    <ul class="tabs">
      <template v-for="(xlsxCsc, index) in xlsxCsvList">
        <li :class="{ current: isCurrentTab(index) }" :key="`tab_${index}`">
          <div v-if="isChangingTabName(index)">
            <input
              type="text"
              class="tab-name-form"
              :class="{
                'invalid-name': invalidTabName,
              }"
              :placeholder="invalidTabName ? 'Invalid tab name' : ''"
              v-model="tabName"
              v-focus
              v-click-outside="clickOutside"
              @keydown.enter.prevent="submitTabName()"
            />
          </div>
          <div
            v-else
            @contextmenu.prevent="$refs.ctxMenu.open($event, { index })"
            @dblclick="changeTabName(index)"
            @click="onClickTab(index)"
          >
            {{ xlsxCsc.tabName }}
          </div>
        </li>
      </template>
      <li>
        <div @click="addNewTab()">
          {{ $t("app.addSourceFile") }}
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
      </li>
    </ul>
    <ContextMenu
      id="context-menu"
      @ctx-open="onCtxOpen"
      ref="ctxMenu"
      class="hello"
    >
      <li class="context-menu-item" @click="changeTabName()">
        <span class="ctx-title">Change tab name</span>
      </li>
      <li class="context-menu-item" @click="deleteTab()">
        <span class="ctx-title">Delete tab</span>
      </li>
    </ContextMenu>
    <!-- Main xlsx csv area -->
    <div class="current-tab container-fluid">
      <div class="row" v-if="xlsxCsvInputed">
        <div class="col-9 pad-0">
          <XlsxCsvOptions />
          <XlsxCsvTable :mouseOveredColumn="mouseOveredColumn" />
        </div>
        <div class="col-3 pad-0">
          <XlsxCsvColumnSelector
            v-model="currentXlsxCsvTab"
            @updateHighlightedColumn="updateHighlightedColumn"
          />
          <XlsxCsvExternalFilesInfo />
          <div class="select-other-file-button-wrapper">
            <button
              class="btn btn-secondary mb-2 font-weight-bold select-other-file-button"
              @click="selectOtherFile()"
            >
              Select other file
              <font-awesome-icon :icon="['fas', 'rotate-left']" />
            </button>
          </div>
        </div>
      </div>
      <div class="source-file-form-wrapper" v-else>
        <div class="source-file-form-contents">
          <SourceFileForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XlsxCsvTable from "@/components/XlsxCsvTable.vue";
import XlsxCsvColumnSelector from "@/components/XlsxCsvColumnSelector.vue";
import XlsxCsvOptions from "@/components/XlsxCsvOptions.vue";
import XlsxCsvExternalFilesInfo from "@/components/XlsxCsvExternalFilesInfo.vue";
import SourceFileForm from "@/components/SourceFileForm.vue";
import ContextMenu from "vue-context-menu";

export default {
  components: {
    XlsxCsvTable,
    XlsxCsvColumnSelector,
    XlsxCsvExternalFilesInfo,
    XlsxCsvOptions,
    ContextMenu,
    SourceFileForm,
  },
  data() {
    return {
      selectedXlsxCsv: {},
      selectedXlsxCsvIndex: 0,
      ctxOpendTabIndex: 0,
      changingTabNameIndex: null,
      invalidTabName: false,
      tabName: "",
      mouseOveredColumn: null,
    };
  },
  watch: {
    tabName() {
      this.invalidTabName = false;
    },
  },
  computed: {
    isChangingTabName() {
      return function (index) {
        return this.changingTabNameIndex === index;
      };
    },
    isCurrentTab() {
      return function (index) {
        return this.selectedTab === index;
      };
    },
    xlsxCsvInputed() {
      return this.$store.getters["getCurrentTabContents"]?.fileInputed;
    },
    xlsxCsvList() {
      return this.$store.getters["getXlsxCsvTabs"];
    },
    currentXlsxCsvTab: {
      get() {
        return this.$store.getters["getCurrentTabContents"]?.columnOrders;
      },
      set(ordersInfo) {
        this.$store.dispatch("modifyCurrentXlsxCsvColumnOrder", ordersInfo);
      },
    },
    selectedTab: {
      get() {
        return this.$store.getters["getSelectedTabIndex"];
      },
      set(index) {
        this.$store.dispatch("setTabIndex", index);
      },
    },
    isValueAndKeySelected() {
      const currentContents = this.$store.getters["getCurrentTabContents"];
      return currentContents?.columnOrders.length > 1;
    },
  },
  methods: {
    onCtxOpen(locals) {
      this.ctxOpendTabIndex = locals.index;
    },
    onClickTab(index) {
      this.selectedTab = index;
    },
    addNewTab() {
      this.$store.dispatch("addTab");
    },
    onDoubleClickTab() {
      console.error("Double");
    },
    updateHighlightedColumn(column) {
      this.mouseOveredColumn = column;
    },
    deleteTab() {
      this.$store.dispatch("deleteTab", this.ctxOpendTabIndex);
    },
    selectOtherFile() {
      this.$store.dispatch("selectOtherFile");
    },
    changeTabName(index = null) {
      if (index !== null) this.ctxOpendTabIndex = index;
      const currentTabName = this.$store.getters.getContentsByIndex(
        this.ctxOpendTabIndex
      );
      this.tabName = currentTabName.tabName.slice();
      this.changingTabNameIndex = this.ctxOpendTabIndex;
    },
    submitTabName() {
      try {
        if (this.tabName.length === 0) {
          this.invalidTabName = true;
          return;
        }
        this.$store.dispatch("modifyTabNameByIndex", {
          index: this.changingTabNameIndex,
          name: this.tabName.trim(),
        });
        this.changingTabNameIndex = null;
      } catch (_) {
        alert(`"${this.tabName}" already used as other tab name.`);
      }
    },
    clickOutside() {
      this.changingTabNameIndex = null;
    },
  },
};
</script>

<style scoped>
.xlsx-csv-card {
  /* margin-bottom: 20px; */
  padding-bottom: 20px;
  /* border: #b3b3b3 solid; */
  /* background-color: rgb(255, 255, 255); */
}
.pad-0 {
  padding: 0px !important;
}
.card-header-title {
  background-color: #b3b3b3;
  font-family: "Trattatello";
  font-size: 15px;
  font-weight: bold;
}
.link-cursor {
  cursor: pointer;
}
.current-tab {
  width: 100%;
  /* margin-top: 20px; */
  padding: 20px 30px 30px 30px;
  border-radius: 0px 10px 10px 10px;
  background-color: rgb(255, 255, 255);
}
.execute-conversion-button-wrapper {
  text-align: left;
  margin-bottom: 20px;
}
.source-file-form-wrapper {
  height: 481px;
  display: table;
  width: 100%;
}
.source-file-form-contents {
  display: table-cell;
  vertical-align: middle;
}
.new-tab-button {
  margin-left: 10px;
  height: 95%;
  background-color: rgb(218, 218, 218);
}
.delete-file {
  margin-top: 2px;
  margin-left: 51px !important;
}
.context-menu-item {
  cursor: pointer;
  margin: 5px 10px;
}
.context-menu-item:hover {
  background-color: rgb(215, 214, 214);
}
.ctx-title {
  margin: 10px 5px;
}
.tab-item {
  width: fit-content;
  min-width: 100px;
  font-size: 12px;
  height: 30px;
  font-weight: bold;
}
.tab-name-form {
  height: 17px;
}
.invalid-name {
  background-color: rgb(255, 161, 161);
}
.select-other-file-button-wrapper {
  padding-top: 5px;
}
.select-other-file-button {
  width: 100%;
  height: 4%;
}

.tabs {
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  font-weight: bold;
}

.tabs li {
  float: left;
  margin: 0 0.5em 0 0;
}

.tabs div {
  position: relative;
  background: #ddd;
  background-image: linear-gradient(to bottom, #fff, #ddd);
  padding: 0.7em 0.6em;
  min-width: fit-content;
  float: left;
  text-decoration: none;
  color: #444;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  border-radius: 5px 0 0 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
}

.tabs div:hover,
.tabs div:hover::after,
.tabs div:focus,
.tabs div:focus::after {
  background: #fff;
}

.tabs div:focus {
  outline: 0;
}

.tabs div::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  right: -0.5em;
  bottom: 0;
  width: 1em;
  background: #ddd;
  background-image: linear-gradient(to bottom, #fff, #ddd);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  transform: skew(10deg);
  border-radius: 0 5px 0 0;
}

.tabs .current div,
.tabs .current div::after {
  background: #fff;
  z-index: 3;
}

.content {
  background: #fff;
  padding: 2em;
  height: 220px;
  position: relative;
  z-index: 2;
  border-radius: 0 5px 5px 5px;
  box-shadow: 0 -2px 3px -2px rgba(0, 0, 0, 0.5);
}
</style>
