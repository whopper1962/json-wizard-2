// const JsonGenerator = require("./json-generator");

module.exports = class JsonGeneratorRecusive {
  constructor(xlsxObj) {
    // console.error('JsonGeneratorRecusive:', xlsxObj);
    // xlsxContentStack:
    this.xlsxContentStack = [];
    this.xlsxObj = xlsxObj;
  }
  checkIfEveryXlsxInfoConvertable() {
    console.error("Check");
    // TODO: if (!this.xlsxObj.isExecutable) throw new Error();
    // const jsonGenerator = new JsonGenerator({ ...this.xlsxObj });
    this.xlsxContentStack.push(this.xlsxObj);
    this.checkData(this.xlsxObj);
    console.error("this.xlsxContentStack", this.xlsxContentStack);
    // const isValid = this.checkData(this.xlsxObj);
    // try {
    //   return true;
    // } catch {
    //   return false;
    // }
  }
  checkData(xlsxObj) {
    // TODO: if (!xlsxObj.isExecutable) return false;
    for (const externalContent of xlsxObj.externalTabs) {
      const currentContent = externalContent.contents;
      // TODO: if (!currentContent.isExecutable) return false;
      this.xlsxContentStack.push(generateJsonGeneratorProps(externalContent.contents));
      if (currentContent.externalTabColumnInfo.length > 0) {
        this.checkData(currentContent);
      }
    }
    return true;
  }
};

function generateJsonGeneratorProps(info) {
  const currentTabContents = info;
  const externalTabs = [];
  let columnOrder = currentTabContents?.columnOrders.slice();
  const valueIndex = columnOrder.shift();
  const parentKeys = columnOrder.reverse();
  return {
    parentKeys,
    valueIndex,
    contents: currentTabContents.currentXlsxCsvContents,
    excludes: currentTabContents.trashedRows,
    isArray: currentTabContents.isRootArray,
    numberOfElements: currentTabContents.numberOfElements,
    externalTabs
  };
}
