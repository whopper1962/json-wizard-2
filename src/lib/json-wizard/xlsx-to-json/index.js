const JsonGenerator = require("@/lib/json-wizard/xlsx-to-json/json-generator");
// const JsonGeneratorRecursive = require('@/lib/json-wizard/xlsx-to-json/json-generator-recursive');

module.exports = function (xlsxObj) {
  let generatedJson = [];
  if (xlsxObj.externalTabs.length > 0) {
    generatedJson = generateMultipleJson(xlsxObj);
    // try {
    // } catch {
    //   console.error("Error occured in json multiple generate.");
    // }
  }
  const jsonGenerator = new JsonGenerator({ ...xlsxObj, generatedJson });
  return generateJson(jsonGenerator);
};

// multiple conversion
// refering external tabs
function generateMultipleJson(xlsxObj) {
  let generatedJson = [];
  const xlsxToGenerate = xlsxObj.xlsxToGenerate;
  for (const obj of xlsxToGenerate) {
    const jsonGenerator = new JsonGenerator({ ...obj });
    generatedJson.push({
      id: obj.id,
      json: generateJson(jsonGenerator)
    });
  }
  return generatedJson;
}

// single conversion
function generateJson(jsonGenerator) {
  jsonGenerator.generate();
  jsonGenerator.checkDuplicates();
  if (jsonGenerator.isArray) {
    jsonGenerator.convertToArray();
  }
  if (jsonGenerator.nullKeys.length > 0) {
    throw {
      status: 429,
      body: jsonGenerator.nullKeys,
    };
  } else if (jsonGenerator.duplicates.length > 0) {
    throw {
      status: 428,
      body: jsonGenerator.duplicates,
    };
  }
  // console.error(jsonGenerator.generatedJson);
  if (jsonGenerator.generatedJson?.length > 0) {
    jsonGenerator.setExternalJsonToValue();
  }
  return jsonGenerator.json;
}
