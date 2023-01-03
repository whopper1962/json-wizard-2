function checkJsonFormat (file) {
  console.error('CHECK JSON FORMAT!');
  console.log(file);
}

function checkXlsxFormat (file) {
  console.error('CHECK XLSX FORMAT!');
  console.log(file);
  return true;
}

module.exports = {
  checkJsonFormat,
  checkXlsxFormat
};