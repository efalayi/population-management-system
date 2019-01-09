"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isEmpty = objectValue => {
  const objectKeys = Object.keys(objectValue);
  return objectKeys.length === 0;
};

const removeBooleanKeysFromObject = objectValue => {
  const objectKeys = Object.keys(objectValue);
  const filteredError = {};
  objectKeys.forEach(key => {
    if (typeof objectValue[key] !== 'boolean') {
      filteredError[key] = objectValue[key];
    }
  });
  return filteredError;
};

var _default = {
  isEmpty,
  removeBooleanKeysFromObject
};
exports.default = _default;