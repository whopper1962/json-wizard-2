// const JsonGenerator = require("./json-generator");

module.exports = class JsonGeneratorRecusive {
  constructor(xlsxObj) {
    // console.error('JsonGeneratorRecusive:', xlsxObj);
    // xlsxContentStack:
    this.xlsxContentStack = [];
    this.xlsxObj = xlsxObj;
  }
  checkIfEveryXlsxInfoConvertable() {
    // console.error("Check");
    // TODO: if (!this.xlsxObj.isExecutable) throw new Error();
    // const jsonGenerator = new JsonGenerator({ ...this.xlsxObj });
    this.xlsxContentStack.push(this.xlsxObj);
    this.checkData(this.xlsxObj);
    // console.error("this.xlsxContentStack", this.xlsxContentStack);
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
      // TODO: if (!currentContent.isExecutable) return false;
      const formattedContent = generateJsonGeneratorProps(
        externalContent.contents
      );
      this.xlsxContentStack.push(formattedContent);
      if (formattedContent.externalTabs.length > 0) {
        this.checkData(formattedContent);
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
    externalTabs,
  };
}
