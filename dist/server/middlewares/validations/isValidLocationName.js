"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isValidName = (field, value) => {
  const regex = /^[a-zA-Z\s*]{2,}$/;

  if (regex.test(value)) {
    return true;
  }

  return `${value} is not a valid ${field}. Only alphabets are allowed`;
};

var _default = isValidName;
exports.default = _default;