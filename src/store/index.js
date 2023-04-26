import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import test from '@/assets/test.json';

Vue.use(Vuex);

const defaultTabData = {
  tabName: "Awesome file",
  fileName: "",
  fileInputed: false,
  selectedFileName: "",
  xlsxCsvSheets: {},
  sheetNames: [],
  selectedSheet: "",
  currentXlsxCsvContents: {},
  columnOrders: [],
  trashedRows: [],
  isRootArray: false,
  numberOfElements: 1,
  externalTabColumnInfo: [],
};

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: localStorage,
    }),
  ],
  state: {
    xlsxCsvTabs: [
      {
        tabName: "Awesome file",
        fileName: "",
        fileInputed: false,
        selectedFileName: "",
        xlsxCsvSheets: {},
        sheetNames: [],
        selectedSheet: "",
        currentXlsxCsvContents: [],
        columnOrders: [],
        trashedRows: [],
        isRootArray: false,
        numberOfElements: 1,
        externalTabColumnInfo: [],
      },
    ],
    selectedTabIndex: 0,
    currentTabContents: {},
    generatedJson: {
      sourceIndex: null,
      isSourceDeleted: false,
      json: "",
    },
    errorRows: [],
  },
  getters: {
    getCurrentTabContents(state) {
      return state.xlsxCsvTabs[state.selectedTabIndex];
    },
    // getReferingTabContents (state) {
    //   const currentTab = state.xlsxCsvTabs[state.selectedTabIndex];
    //   const
    // },
    getSpecificIndexSourceInfo(state) {
      return function (index) {
        return state.xlsxCsvTabs[index];
      };
    },
    getCurrentTabIndex(state) {
      return state.selectedTabIndex;
    },
    getXlsxCsvTabs(state) {
      return state.xlsxCsvTabs;
    },
    getSelectedTabIndex(state) {
      return state.selectedTabIndex;
    },
    getGeneratedJson(state) {
      return state.generatedJson;
    },
    getTabNameByIndex: (state) => (index) => {
      return state.xlsxCsvTabs[index].tabName;
    },
    getContentsByIndex: (state) => (index) => {
      return state.xlsxCsvTabs[index];
    },
    getErrorRows(state) {
      return state.errorRows;
    },
  },
  mutations: {
    SET_CURRENT_TAB_CONTENTS(state, selectedTabIndex) {
      state.currentTabContents = state.xlsxCsvTabs[selectedTabIndex];
      state.selectedTabIndex = selectedTabIndex;
    },
    ADD_SOURCE_DATA(state, data) {
      const { sheetNames, xlsxContents } = data;
      let currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.fileInputed = true;
      currentTabContents.sheetNames = sheetNames;
      currentTabContents.xlsxCsvSheets = xlsxContents;
      currentTabContents.selectedSheet = sheetNames[0];
      currentTabContents.currentXlsxCsvContents = xlsxContents[sheetNames[0]];
    },
    SET_TAB_INDEX(state, index) {
      state.errorRows = [];
      state.selectedTabIndex = index;
    },
    MODIFY_CURRENT_XLSX_CSV_COLUMN_ORDER(state, ordersInfo) {
      if (ordersInfo.isValueChanged)
        state.xlsxCsvTabs[state.selectedTabIndex].externalTabColumnInfo = [];
      state.xlsxCsvTabs[state.selectedTabIndex].columnOrders = ordersInfo.order;
    },
    MODIFY_COLUMN_ORDER(state, columnOrders) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.columnOrders = columnOrders;
    },
    SET_GENERATED_JSON(state, json) {
      state.generatedJson = {
        sourceIndex: state.selectedTabIndex,
        isSourceDeleted: false,
        json,
      };
    },
    ADD_TAB(state) {
      const awesomeFiles = state.xlsxCsvTabs.filter((tab) => {
        const name = tab.tabName?.toLocaleLowerCase().replaceAll(' ', '')?.substring(0, 11);
        return name.length === 11 && name === 'awesomefile'
      }).map((tab) => tab.tabName).filter((name) => name.length > 11);
      const identifiers = [];
      for (const file of awesomeFiles) {
        identifiers.push(Number(file.substring(11)));
      }
      const sortedIdentifiers = identifiers.sort((a, b) => a -b);
      const maximumIdentifier = sortedIdentifiers.length > 0 ? Number(sortedIdentifiers.pop()) : 0;
      const clonedTabData = {
        ...defaultTabData,
        tabName: `AwesomeFile${maximumIdentifier + 1}`
      };
      state.xlsxCsvTabs.push(clonedTabData);
    },
    SET_ROOT_ARRAY_STATUS(state, status) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.isRootArray = status;
    },
    SET_NUMBER_OF_ARRAY_ELEMENTS(state, num) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.numberOfElements = num;
    },
    SET_SELECTED_SHEET(state, sheetName) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.selectedSheet = sheetName;
      currentTabContents.currentXlsxCsvContents =
        currentTabContents.xlsxCsvSheets[sheetName];
      currentTabContents.columnOrders = [];
      currentTabContents.trashedRows = [];
      currentTabContents.isRootArray = false;
      currentTabContents.numberOfElements = 1;
    },
    MODIFY_TRASHED_ROWS(state, index) {
      const currentTrashedRows =
        state.xlsxCsvTabs[state.selectedTabIndex].trashedRows;
      if (!currentTrashedRows) return;
      if (currentTrashedRows.includes(index)) {
        const foundIndex = currentTrashedRows.indexOf(index);
        currentTrashedRows.splice(foundIndex, 1);
      } else {
        currentTrashedRows.push(index);
      }
    },
    MODIFY_TAB_NAME_BY_INDEX(state, args) {
      const tabNames = state.xlsxCsvTabs
        .map((tab, index) => {
          if (index !== args.index) {
            return tab.tabName;
          }
        })
        .filter(Boolean);
      if (tabNames.some((name) => 
        name?.toLowerCase() === args.name?.toLowerCase())) throw new Error();
      let targetTab = state.xlsxCsvTabs[args.index];
      targetTab.tabName = args.name;
    },
    DELETE_TAB(state, index) {
      state.xlsxCsvTabs.splice(index, 1);
    },
    SET_ERROR_ROWS(state, rows) {
      state.errorRows = rows;
    },
    SET_EXTERNAL_FILE_COLUMN(state, info) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.externalTabColumnInfo.push(info);
    },
  },
  actions: {
    setCurrentTabContents(context, selectedTabIndex) {
      context.commit("SET_CURRENT_TAB_CONTENTS", selectedTabIndex);
    },
    setTabIndex(context, index) {
      context.commit("SET_TAB_INDEX", index);
    },
    addSourceData(context, data) {
      context.commit("ADD_SOURCE_DATA", data);
    },
    modifyCurrentXlsxCsvColumnOrder(context, ordersInfo) {
      context.commit("MODIFY_CURRENT_XLSX_CSV_COLUMN_ORDER", ordersInfo);
    },
    modifyColumnOrder(context, columnOrders) {
      context.commit("MODIFY_COLUMN_ORDER", columnOrders);
    },
    setGeneratedJson(context, json) {
      context.commit("SET_GENERATED_JSON", json);
    },
    setRootArrayStatus(context, status) {
      context.commit("SET_ROOT_ARRAY_STATUS", status);
    },
    setNumberOfArrayElements(context, num) {
      context.commit("SET_NUMBER_OF_ARRAY_ELEMENTS", num);
    },
    setSelectedSheet(context, sheetName) {
      context.commit("SET_SELECTED_SHEET", sheetName);
    },
    setExternalFileColumn(context, info) {
      context.commit("SET_EXTERNAL_FILE_COLUMN", info);
    },
    modifyTrashedRows(context, index) {
      context.commit("MODIFY_TRASHED_ROWS", index);
    },
    modifyTabNameByIndex(context, index) {
      context.commit("MODIFY_TAB_NAME_BY_INDEX", index);
    },
    addTab(context) {
      context.commit("ADD_TAB");
    },
    deleteTab(context, args) {
      context.commit("DELETE_TAB", args);
    },
    setErrorRows(context, rows) {
      context.commit("SET_ERROR_ROWS", rows);
    },
  },
});
