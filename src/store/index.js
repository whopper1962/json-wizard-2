import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import test from '@/assets/test.json';
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

const defaultTabData = {
  id: "",
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
  isExecutable: false,
  isError: false,
  errorData: [],
  logs: [],
  isExecuted: false,
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
        id: "",
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
        isExecutable: false,
        isError: false,
        errorData: [],
        logs: [],
        isExecuted: false,
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
    getExternalTabInfo(state) {
      return function (externalTabColumnInfo) {
        if (!externalTabColumnInfo) return [];
        const xlsxObj = externalTabColumnInfo.map((info) => {
          return formatExternalContents(state, info);
        });
        const toGenerate = xlsxToGenerate(xlsxObj);
        return {
          locationInfo: externalTabColumnInfo,
          xlsxObj,
          toGenerate,
        };
      };
    },
    getTabInfoById(state) {
      return function (id) {
        return state.xlsxCsvTabs.find((tab) => tab.id === id);
      };
    },
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
      const currentTab = state.xlsxCsvTabs[state.selectedTabIndex];
      return currentTab.errorData;
    },
    getLogs(state) {
      const current = state.xlsxCsvTabs[state.selectedTabIndex];
      return current.logs;
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
      currentTabContents.isExecutable = false;
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
      state.xlsxCsvTabs[state.selectedTabIndex].isExecuted = false;
    },
    MODIFY_COLUMN_ORDER(state, columnOrders) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (!currentTabContents) return;
      currentTabContents.columnOrders = columnOrders;
      currentTabContents.isExecuted = false;
      currentTabContents.isExecutable = columnOrders.length > 1;
    },
    SET_GENERATED_JSON(state, json) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.isError = false;
      currentTabContents.isExecuted = true;
      state.generatedJson = {
        sourceIndex: state.selectedTabIndex,
        isSourceDeleted: false,
        json,
      };
    },
    ADD_TAB(state) {
      const awesomeFiles = state.xlsxCsvTabs
        .filter((tab) => {
          const name = tab.tabName
            ?.toLocaleLowerCase()
            .replaceAll(" ", "")
            ?.substring(0, 11);
          return name.length === 11 && name === "awesomefile";
        })
        .map((tab) => tab.tabName)
        .filter((name) => name.length > 11);
      const identifiers = [];
      for (const file of awesomeFiles) {
        identifiers.push(Number(file.substring(11)));
      }
      const sortedIdentifiers = identifiers.sort((a, b) => a - b);
      const maximumIdentifier =
        sortedIdentifiers.length > 0 ? Number(sortedIdentifiers.pop()) : 0;
      const uuid = uuidv4();
      const clonedDefaultData = {
        ...defaultTabData,
        id: uuid,
        tabName: `AwesomeFile${maximumIdentifier + 1}`,
        xlsxCsvSheets: { ...defaultTabData.xlsxCsvSheets },
        sheetNames: [...defaultTabData.sheetNames],
        currentXlsxCsvContents: { ...defaultTabData.currentXlsxCsvContents },
        columnOrders: [...defaultTabData.columnOrders],
        trashedRows: [...defaultTabData.trashedRows],
        externalTabColumnInfo: [...defaultTabData.externalTabColumnInfo],
      };
      const clonedTabData = { ...clonedDefaultData };
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
      currentTabContents.isExecutable = false;
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
    ALL_TRASH(state) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      if (
        currentTabContents.trashedRows.length ===
        currentTabContents.currentXlsxCsvContents.length
      )
        return;
      for (const [
        index,
      ] of currentTabContents.currentXlsxCsvContents.entries()) {
        if (
          currentTabContents.trashedRows.some(
            (trashedIndex) => trashedIndex === index
          )
        )
          continue;
        currentTabContents.trashedRows.push(index);
      }
    },
    ALL_UNTRASH(state) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.trashedRows = [];
    },
    MODIFY_TAB_NAME_BY_INDEX(state, args) {
      const tabNames = state.xlsxCsvTabs
        .map((tab, index) => {
          if (index !== args.index) {
            return tab.tabName;
          }
        })
        .filter(Boolean);
      if (
        tabNames.some(
          (name) => name?.toLowerCase() === args.name?.toLowerCase()
        )
      )
        throw new Error();
      let targetTab = state.xlsxCsvTabs[args.index];
      targetTab.tabName = args.name;
    },
    DELETE_TAB(state, index) {
      state.xlsxCsvTabs.splice(index, 1);
      // if (index === state.generatedJson.sourceIndex) {
      //   state.generatedJson.isSourceDeleted = true;
      // }
    },
    SET_ERROR_ROWS(state, rows) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.isError = true;
      currentTabContents.errorData = rows;
    },
    SET_EXTERNAL_FILE_COLUMN(state, info) {
      const currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.externalTabColumnInfo.push(info);
    },
    SELECT_OTHER_FILE(state) {
      let currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.fileInputed = false;
      currentTabContents.selectedFileName = "";
      currentTabContents.xlsxCsvSheets = {};
      currentTabContents.sheetNames = [];
      currentTabContents.selectedSheet = "";
      currentTabContents.currentXlsxCsvContents = {};
      currentTabContents.columnOrders = [];
      currentTabContents.trashedRows = [];
      currentTabContents.isRootArray = false;
      currentTabContents.isExecutable = false;
      currentTabContents.isError = false;
      currentTabContents.errorData = [];
      currentTabContents.logs = [];
      currentTabContents.numberOfElements = 1;
      currentTabContents.externalTabColumnInfo = [];
    },
    REMOVE_EX_TAB_INFO(state, rowIndex) {
      let currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      let currentExTabInfo = currentTabContents.externalTabColumnInfo;
      const foundIndex = currentExTabInfo.findIndex(
        (loopInfo) => loopInfo.rowIndex === rowIndex
      );
      currentExTabInfo.splice(foundIndex, 1);
    },
    REMOVE_COLUMN_FROM_ORDER(state, columnIndex) {
      let currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      let currentColumnOrder = currentTabContents.columnOrders;
      const foundIndex = currentColumnOrder.findIndex(
        (column) => column === columnIndex
      );
      currentColumnOrder.splice(foundIndex, 1);
    },
    ADD_LOG(state, log) {
      let currentTabContents = state.xlsxCsvTabs[state.selectedTabIndex];
      currentTabContents.logs.push(log);
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
    allTrash(context) {
      context.commit("ALL_TRASH");
    },
    allUntrash(context) {
      context.commit("ALL_UNTRASH");
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
    selectOtherFile(context) {
      context.commit("SELECT_OTHER_FILE");
    },
    removeExTabInfo(context, rowIndex) {
      context.commit("REMOVE_EX_TAB_INFO", rowIndex);
    },
    removeColumnFromOrder(context, columnIndex) {
      context.commit("REMOVE_COLUMN_FROM_ORDER", columnIndex);
    },
    addLog(context, log) {
      context.commit("ADD_LOG", log);
    },
  },
});

function formatExternalContents(state, xlsxObj) {
  const referingTabContent = state.xlsxCsvTabs.find(
    (tab) => tab.id === xlsxObj.referingTabId
  );
  const rootXlsxObj = generateJsonGeneratorProps(referingTabContent);
  const res = formatExternalContentsRecursively(state, referingTabContent, [
    rootXlsxObj,
  ]);
  const isValid = checkRecursiveXlsxObjValidation(res);
  console.log("isValid:", isValid);
  // TODO: throw error if invalid
  return res;
}

function checkRecursiveXlsxObjValidation(xlsxObj) {
  for (const obj of xlsxObj) {
    if (!obj.isExecutable) return false;
  }
  return true;
}

function xlsxToGenerate(obj) {
  let xlsxToGenerate = [];
  for (const num of obj) {
    for (const hello of num) {
      if (xlsxToGenerate.find((obj) => obj.id === hello.id)) continue;
      xlsxToGenerate.push(hello);
    }
  }
  return xlsxToGenerate;
}

function formatExternalContentsRecursively(state, contents, stack = []) {
  for (const content of contents.externalTabColumnInfo) {
    const referingTabContent = state.xlsxCsvTabs.find(
      (tab) => tab.id === content.referingTabId
    );
    const xlsxObj = generateJsonGeneratorProps(referingTabContent);
    stack.push(xlsxObj);
    if (referingTabContent.externalTabColumnInfo.length > 0) {
      formatExternalContentsRecursively(state, referingTabContent, stack);
    }
  }
  return stack;
}

function generateJsonGeneratorProps(info) {
  const currentTabContents = info;
  const externalTabs = info.externalTabColumnInfo;
  let columnOrder = currentTabContents?.columnOrders.slice();
  const valueIndex = columnOrder.shift();
  const parentKeys = columnOrder.reverse();
  return {
    isExecutable: currentTabContents.isExecutable,
    id: currentTabContents.id,
    parentKeys,
    valueIndex,
    contents: currentTabContents.currentXlsxCsvContents,
    excludes: currentTabContents.trashedRows,
    isArray: currentTabContents.isRootArray,
    numberOfElements: currentTabContents.numberOfElements,
    externalTabs,
  };
}
