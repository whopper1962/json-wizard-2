module.exports = class JsonGeneratorRecusive {
  constructor (xlsxObj) {
    // xlsxContentStack: 
    this.xlsxContentStack = [];
    this.xlsxObj = xlsxObj;
  }
  checkIfEveryXlsxInfoConvertable () {
    checkIfEveryXlsxInfoConvertable(this.xlsxObj);
    // try {
    //   return true;
    // } catch {
    //   return false;
    // }
  }
};

function checkIfEveryXlsxInfoConvertable (xlsxObj) {
  if (xlsxObj.isExecutable) return false;
  // for (const obj of xlsxObj) {
  //   if (obj) {}
  // }
}