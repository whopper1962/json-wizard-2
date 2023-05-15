module.exports = class JsonGenerator {
  constructor({
    id,
    parentKeys,
    valueIndex,
    contents,
    excludes,
    isArray,
    numberOfElements,
    externalTabs,
    generatedJson,
    locationInfo,
  }) {
    this.id = id;
    this.generatedJson = generatedJson;
    this.parents = parentKeys;
    this.valueIndex = valueIndex;
    this.contents = contents;
    this.excludes = excludes;
    this.excludedKeyPaths = [];
    this.orderedKeys = [];
    this.nullKeys = [];
    this.duplicates = [];
    this.json = {};
    this.isArray = isArray;
    this.numberOfElements = numberOfElements;
    this.externalTabs = externalTabs;
    this.locationInfo = locationInfo || [];
    this.valuesToSetExternalObj = [];
    for (const row of this.contents) {
      const valueArr = [];
      for (const keyIndex of this.parents) {
        if (row[keyIndex] === null) {
          valueArr.push("");
          continue;
        }
        valueArr.push(row[keyIndex]);
      }
      this.orderedKeys.push(valueArr);
    }
    for (const excludeIndex of this.excludes) {
      const keyPath = this.orderedKeys[excludeIndex].join(".");
      this.excludedKeyPaths.push(keyPath);
    }
  }

  generate() {
    for (const [index, keys] of this.orderedKeys.entries()) {
      if (this.excludes.includes(index)) continue;
      let masterObj = this.json;
      let keyPath = [];
      for (const [keyIndex, currentKey] of keys.entries()) {
        keyPath.push(currentKey);
        if (keyIndex === keys.length - 1) {
          if (currentKey === "") {
            this.nullKeys.push({
              rowIndex: index,
              columnIndex: keyIndex
            });
            continue;
          }
          const locationObj = this.isToSetExternalJson(index);
          if (locationObj) {
            this.valuesToSetExternalObj.push({
              referingId: locationObj.referingTabId,
              key: keyPath.filter(Boolean).join('.')
            });
          }
          masterObj[currentKey] = this.contents[index][this.valueIndex];
        } else {
          if (currentKey === "") continue;
          if (!isKeyExists(masterObj, currentKey)) {
            masterObj[currentKey] = {};
          }
          masterObj = masterObj[currentKey];
        }
      }
    }
  }

  convertToArray() {
    const arr = [];
    const clonedJson = { ...this.json };
    for (let i = 0; i < this.numberOfElements; i++) {
      arr.push(clonedJson);
    }
    this.json = {};
    this.json = arr;
  }

  setExternalJsonToValue() {
    for (const obj of this.valuesToSetExternalObj) {
      const referedJson = this.generatedJson.find((json) => json.id === obj.referingId);
      if (!referedJson) throw new Error();
      const str = `this.json.${obj.key} = referedJson.json`;
      eval(str);
    }
  }

  checkDuplicates() {
    let duplicates = [];
    const frequency = this.orderedKeys.reduce((seen, currentItem) => {
      if (currentItem in seen) {
        seen[currentItem] = seen[currentItem] + 1;
      } else {
        seen[currentItem] = 1;
      }
      return seen;
    }, {});

    for (const key in frequency) {
      const joinedKey = key.split(",").join(".");
      if (this.excludedKeyPaths.includes(joinedKey)) continue;
      if (frequency[key] > 1) {
        duplicates.push(
          key.split(",").map((currentItem) => {
            return currentItem;
          })
        );
      }
    }

    if (duplicates.length > 0) {
      for (const duplicate of duplicates) {
        for (const [index, keys] of this.orderedKeys.entries()) {
          if (JSON.stringify(keys) !== JSON.stringify(duplicate)) continue;
          this.duplicates.push(index);
        }
      }
    } else {
      return [];
    }
  }
  isToSetExternalJson (rowIndex) {
    return this.locationInfo.find((info) => {
      return info.rowIndex === rowIndex;
    });
  }
};

function isKeyExists(object, key) {
  if (object[key] === undefined) return false;
  return true;
}
