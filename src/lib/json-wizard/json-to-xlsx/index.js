let jsonObj = [];
let keyPathLengths = [];
let keyLength = 0;

module.exports = function (json) {
  jsonObj = [];
  keyPathLengths = [];
  keyLength = 0;
  try {
    getJsonDepth(json);
    readElementsRecursively(json);
    return jsonObj;
  } catch (error) {
    throw new Error(error);
  }
};

function getJsonDepth (json = [], ) {
  for (const element in json) {
    if (typeof json[element] === 'object') {
      keyLength++;
      keyPathLengths.push(keyLength);
    } else {
      if (element === Object.keys(json)[Object.keys(json).length - 1]) {
        keyLength--;
      }
    }
  }
}

function readElementsRecursively (json = [], keys = []) {
  for (const element in json) {
    if (typeof json[element] === 'object') {
      keys.push(element);
      readElementsRecursively(json[element], keys);
    } else {
      const currentKeysNValue = [json[element], element, ...keys];
      jsonObj.push(currentKeysNValue);
    }
    if (element === Object.keys(json)[Object.keys(json).length - 1]) {
      keys.pop();
    }
  }
}
