import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const tabData = {
  selectedFileName: '',
  xlsxCsvSheets: {},
  selectedSheet: '',
  currentXlsxCsvContents: [],
  stagedColumn: [],
  columnOrders: [],
  isRootArray: false,
  numberOfElements: 0
};

export default new Vuex.Store({
  state: {
    xlsxCsvTabs: [
      {
        selectedFileName: '',
        xlsxCsvSheets: {},
        selectedSheet: '',
        currentXlsxCsvContents: [],
        stagedColumn: [],
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
      return state.currentTabContents;
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
    ADD_TAB (state) {
      state.xlsxCsvTabs.push(tabData);
    }
  },
  actions: {
    setCurrentTabContents (context, selectedTabIndex) {
      context.commit('SET_CURRENT_TAB_CONTENTS', selectedTabIndex)
    },
    addTab (context) {
      context.commit('ADD_TAB');
    }
  }
});
