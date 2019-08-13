"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachCascadeChoices = exports.flattenInlineCascadeChoices = void 0;

var _lodash = require("lodash");

/*
 * Retrun new array
 * Not mutates original choices
 */
var flattenInlineCascadeChoices = function flattenInlineCascadeChoices(choices, endLevel) {
  var results = [];

  var traverse = function traverse(choices, path, level, str) {
    (0, _lodash.forEach)(choices, function (choice, index) {
      var cStr = !(0, _lodash.isUndefined)(str) ? str + '-' + choice.name : choice.name;
      var cLevel = !(0, _lodash.isUndefined)(level) ? level : 1;
      var cPath = !(0, _lodash.isUndefined)(path) ? "".concat(path, ".subChoices[").concat(index, "]") : "[".concat(index, "]");

      if (!(0, _lodash.isEmpty)(choice.subChoices) && ((0, _lodash.isUndefined)(endLevel) || !(0, _lodash.isUndefined)(endLevel) && cLevel < endLevel)) {
        cLevel++;
        return traverse(choice.subChoices, cPath, cLevel, cStr);
      }

      results.push({
        name: cStr,
        choice: (0, _lodash.cloneDeep)(choice),
        path: cPath
      });
    });
  };

  traverse(choices);
  return results;
};
/*
 * For each choice
 */


exports.flattenInlineCascadeChoices = flattenInlineCascadeChoices;

var forEachCascadeChoices = function forEachCascadeChoices(choices, cb) {
  var startLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var endLevel = arguments.length > 3 ? arguments[3] : undefined;
  (0, _lodash.forEach)(choices, function (choice, index) {
    cb(choice, startLevel, index);

    if (!(0, _lodash.isEmpty)(choice.subChoices)) {
      if (endLevel && startLevel >= endLevel) {
        return;
      }

      forEachCascadeChoices(choice.subChoices, cb, startLevel + 1, endLevel);
    }
  });
};

exports.forEachCascadeChoices = forEachCascadeChoices;
//# sourceMappingURL=index.js.map
