import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import test from '@/assets/test.json';

Vue.use(Vuex);

const tabData = {
  tabName: 'Awesome file',
  fileName: '',
  fileInputed: false,
  selectedFileName: '',
  xlsxCsvSheets: {},
  sheetNames: [],
  selectedSheet: '',
  currentXlsxCsvContents: {},
  columnOrders: [],
  trashedRows: [],
  isRootArray: false,
  numberOfElements: 1
};

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: localStorage
    })
  ],
  state: {
    xlsxCsvTabs: [
      {
        tabName: 'Awesome file',
        fileName: '',
        fileInputed: false,
        selectedFileName: '',
        xlsxCsvSheets: {},
        sheetNames: [],
        selectedSheet: '',
        currentXlsxCsvContents: [],
        columnOrders: [],
        trashedRows: [],
        isRootArray: false,
        numberOfElements: 1
      }
    ],
    selectedTabIndex: 0,
    currentTabContents: {},
    generatedJson: {},
    errorRows: []
  },
  getters: {
    getCurrentTabContents (state) {
      return state.xlsxCsvTabs[state.selectedTabIndex];
    },
    getCurrentTabIndex (state) {
      return state.selectedTabIndex;
    },
    getXlsxCsvTabs (state) {
      return state.xlsxCsvTabs;
    },
    getSelectedTabIndex (state) {
      return state.selectedTabIndex;
    },
    getGeneratedJson (state) {
      return state.generatedJson;
    },
    getTabNameByIndex: (state) => (index) => {
      console.error(index);
      return state.xlsxCsvTabs[index].tabName;
    },
    getContentsByIndex: (state) => (index) => {
      return state.xlsxCsvTabs[index];
    },
    getErrorRows (state) {
      return state.errorRows;
    }
  },
  mutations: {
    SET_CURRENT_TAB_CONTENTS (state, selectedTabIndex) {
      state.currentTabContents = state.xlsxCsvTabs[selectedTabIndex];
      state.selectedTabIndex = selectedTabIndex;
    },
    ADD_SOURCE_DATA (state, data) {
      const { sheetNames, xlsxContents } = data;
      let currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.fileInputed = true;
      currentTabContents.sheetNames = sheetNames;
      currentTabContents.xlsxCsvSheets = xlsxContents;
      currentTabContents.selectedSheet = sheetNames[0];
      currentTabContents.currentXlsxCsvContents = xlsxContents[sheetNames[0]];
    },
    SET_TAB_INDEX (state, index) {
      state.selectedTabIndex = index;
    },
    MODIFY_CURRENT_XLSX_CSV_COLUMN_ORDER (state, orders) {
      state.xlsxCsvTabs[state.selectedTabIndex].columnOrders = orders;
    },
    MODIFY_COLUMN_ORDER (state, columnOrders) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.columnOrders = columnOrders;
    },
    SET_GENERATED_JSON (state, json) {
      state.generatedJson = json;
    },
    ADD_TAB (state) {
      let clonedTabData = {...tabData};
      state.xlsxCsvTabs.push(clonedTabData);
    },
    SET_ROOT_ARRAY_STATUS (state, status) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.isRootArray = status;
    },
    SET_NUMBER_OF_ARRAY_ELEMENTS (state, num) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.numberOfElements = num;
    },
    SET_SELECTED_SHEET (state, sheetName) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.selectedSheet = sheetName;
      currentTabContents.currentXlsxCsvContents = currentTabContents.xlsxCsvSheets[sheetName];
      currentTabContents.columnOrders = [];
      currentTabContents.trashedRows = [];
      currentTabContents.isRootArray = false;
      currentTabContents.numberOfElements = 1;
    },
    MODIFY_TRASHED_ROWS (state, index) {
      const currentTrashedRows = state.xlsxCsvTabs[state.selectedTabIndex].trashedRows;
      if (!currentTrashedRows) return;
      if (currentTrashedRows.includes(index)) {
        const foundIndex = currentTrashedRows.indexOf(index);
        currentTrashedRows.splice(foundIndex, 1);
      } else {
        currentTrashedRows.push(index);
      }
    },
    MODIFY_TAB_NAME_BY_INDEX (state, args) {
      let targetTab = state.xlsxCsvTabs[args.index];
      targetTab.tabName = args.name;
    },
    DELETE_TAB (state, index) {
      state.xlsxCsvTabs.splice(index, 1);
    },
    SET_ERROR_ROWS (state, rows) {
      state.errorRows = rows;
    }
  },
  actions: {
    setCurrentTabContents (context, selectedTabIndex) {
      context.commit('SET_CURRENT_TAB_CONTENTS', selectedTabIndex)
    },
    setTabIndex (context, index) {
      context.commit('SET_TAB_INDEX', index);
    },
    addSourceData (context, data) {
      context.commit('ADD_SOURCE_DATA', data);
    },
    modifyCurrentXlsxCsvColumnOrder (context, orders) {
      context.commit('MODIFY_CURRENT_XLSX_CSV_COLUMN_ORDER', orders);
    },
    modifyColumnOrder (context, columnOrders) {
      context.commit('MODIFY_COLUMN_ORDER', columnOrders);
    },
    setGeneratedJson (context, json) {
      context.commit('SET_GENERATED_JSON', json);
    },
    setRootArrayStatus (context, status) {
      context.commit('SET_ROOT_ARRAY_STATUS', status);
    },
    setNumberOfArrayElements (context, num) {
      context.commit('SET_NUMBER_OF_ARRAY_ELEMENTS', num);
    },
    setSelectedSheet (context, sheetName) {
      context.commit('SET_SELECTED_SHEET', sheetName);
    },
    modifyTrashedRows (context, index) {
      context.commit('MODIFY_TRASHED_ROWS', index);
    },
    modifyTabNameByIndex (context, index) {
      context.commit('MODIFY_TAB_NAME_BY_INDEX', index);
    },
    addTab (context) {
      context.commit('ADD_TAB');
    },
    deleteTab (context, args) {
      context.commit('DELETE_TAB', args);
    },
    setErrorRows (context, rows) {
      context.commit('SET_ERROR_ROWS', rows);
    }
  }
});
