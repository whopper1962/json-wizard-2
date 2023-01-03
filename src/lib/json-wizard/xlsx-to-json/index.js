const JsonGenerator = require('@/lib/json-wizard/xlsx-to-json/json-generator');

module.exports = function (xlsxObj) {
  const jsonGenerator = new JsonGenerator({...xlsxObj});
  jsonGenerator.generate();
  jsonGenerator.checkDuplicates();
  if (jsonGenerator.isArray) {
    jsonGenerator.convertToArray();
  }
  if (jsonGenerator.nullKeys.length > 0) {
    throw {
      status: 429,
      body: jsonGenerator.nullKeys
    };
  } else if (jsonGenerator.duplicates.length > 0) {
    throw {
      status: 428,
      body: jsonGenerator.duplicates
    };
  }
  return jsonGenerator.json;
  // try {
  // } catch (err) {
  //   throw new Error(err);
  // }
};
