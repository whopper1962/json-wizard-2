import Vue from 'vue';
import Vuex from 'vuex';
import test from '@/assets/test.json';

Vue.use(Vuex);

const tabData = {
  fileInputed: false,
  selectedFileName: '',
  xlsxCsvSheets: {},
  selectedSheet: '',
  currentXlsxCsvContents: [],
  columnOrders: [],
  isRootArray: false,
  numberOfElements: 0
};

export default new Vuex.Store({
  state: {
    xlsxCsvTabs: [
      {
        fileInputed: false,
        selectedFileName: '',
        xlsxCsvSheets: {},
        selectedSheet: '',
        currentXlsxCsvContents: test,
        columnOrders: [],
        isRootArray: false,
        numberOfElements: 1
      }
    ],
    selectedTabIndex: 0,
    currentTabContents: {},
    generatedJson: {}
  },
  getters: {
    getCurrentTabContents (state) {
      return state.xlsxCsvTabs[state.selectedTabIndex];
    },
    getXlsxCsvTabs (state) {
      return state.xlsxCsvTabs;
    },
    getSelectedTabIndex (state) {
      return state.selectedTabIndex;
    },
    getGeneratedJson (state) {
      return state.generatedJson;
    }
  },
  mutations: {
    SET_CURRENT_TAB_CONTENTS (state, selectedTabIndex) {
      state.currentTabContents = state.xlsxCsvTabs[selectedTabIndex];
      state.selectedTabIndex = selectedTabIndex;
    },
    MODIFY_CURRENT_XLSX_CSV_COLUMN_ORDER (state, orders) {
      state.xlsxCsvTabs[state.selectedTabIndex].columnOrders = orders;
    },
    MODIFY_COLUMN_ORDER (state, columnOrders) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.columnOrders = columnOrders;
    },
    SET_GENERATED_JSON (state, json) {
      state.generatedJson = json;
    },
    ADD_TAB (state) {
      state.xlsxCsvTabs.push(tabData);
    },
    SET_ROOT_ARRAY_STATUS (state, status) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.isRootArray = status;
    },
    SET_NUMBER_OF_ARRAY_ELEMENTS (state, num) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.numberOfElements = num;
    }
  },
  actions: {
    setCurrentTabContents (context, selectedTabIndex) {
      context.commit('SET_CURRENT_TAB_CONTENTS', selectedTabIndex)
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
    addTab (context) {
      context.commit('ADD_TAB');
    },
  }
});
