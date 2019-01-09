"use strict";

var _enzyme = _interopRequireDefault(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _jsdom = require("jsdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme.default.configure({
  adapter: new _enzymeAdapterReact.default()
});

const documentHTML = '<!doctype html><html><body><div id="app"></div></body></html>';
const {
  window
} = new _jsdom.JSDOM(documentHTML);
global.fetch = jest.fn();
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};