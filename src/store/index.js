import Vue from 'vue';
import Vuex from 'vuex';

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
        currentXlsxCsvContents: [],
        columnOrders: [],
        isRootArray: false,
        numberOfElements: 0
      }
    ],
    selectedTabIndex: 0,
    currentTabContents: {}
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
    ADD_TAB (state) {
      state.xlsxCsvTabs.push(tabData);
    },
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
    addTab (context) {
      context.commit('ADD_TAB');
    },
  }
});
