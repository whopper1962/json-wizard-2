const JsonGenerator = require('@/lib/json-wizard/xlsx-to-json/json-generator');

module.exports = function (xlsxObj) {
  const jsonGenerator = new JsonGenerator({...xlsxObj});
  if (jsonGenerator.externalTabs.length > 0) {
    return generateMultipleJson(jsonGenerator);
  }
  return generateJson(jsonGenerator);
};

// multiple conversion
// refering external tabs
function generateMultipleJson (jsonGenerator) {
  console.error('External:', jsonGenerator.externalTabs);
  // TODO: check validation: is every tabs convertable?
  return generateJson(jsonGenerator);
}

// single conversion
function generateJson (jsonGenerator) {
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
}