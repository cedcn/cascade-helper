"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.generateRandomString = void 0;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var generateRandomString = function generateRandomString() {
  var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var str = Math.random().toString(36).substr(2, 7);
  return str + '-' + level + '-' + index;
};

exports.generateRandomString = generateRandomString;

var generateCascade = function generateCascade(level, index) {
  return {
    name: "".concat(level, ".").concat(index),
    value: generateRandomString(level, index)
  };
};

var CascadeHelper =
/*#__PURE__*/
function () {
  function CascadeHelper() {
    var subKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'children';
    var valueKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

    _classCallCheck(this, CascadeHelper);

    _defineProperty(this, "subKey", void 0);

    _defineProperty(this, "valueKey", void 0);

    this.subKey = subKey;
    this.valueKey = valueKey;
  }

  _createClass(CascadeHelper, [{
    key: "flatten",
    value: function flatten(cascades) {
      var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var itemSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';
      var endLevel = arguments.length > 3 ? arguments[3] : undefined;
      var results = [];
      var subKey = this.subKey;

      var traverse = function traverse(cascades) {
        var strs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path = arguments.length > 2 ? arguments[2] : undefined;
        var level = arguments.length > 3 ? arguments[3] : undefined;
        (0, _lodash.forEach)(cascades, function (cascade, index) {
          var cStrs = {};
          (0, _lodash.forEach)(labels, function (label) {
            cStrs[label] = !(0, _lodash.isUndefined)(strs[label]) ? strs[label] + itemSeparator + cascade[label] : cascade[label];
          });
          var cLevel = !(0, _lodash.isUndefined)(level) ? level : 0;
          var cPath = !(0, _lodash.isUndefined)(path) ? "".concat(path, ".").concat(subKey, "[").concat(index, "]") : "[".concat(index, "]");

          if (!(0, _lodash.isEmpty)(cascade[subKey]) && ((0, _lodash.isUndefined)(endLevel) || !(0, _lodash.isUndefined)(endLevel) && cLevel < endLevel)) {
            cLevel++;
            return traverse(cascade[subKey], cStrs, cPath, cLevel);
          }

          results.push({
            strs: cStrs,
            cascade: (0, _lodash.cloneDeep)(cascade),
            path: cPath
          });
        });
      };

      traverse(cascades);
      return results;
    }
    /*
     * Fill cascade
     */

  }, {
    key: "cascadesFill",
    value: function cascadesFill() {
      var cascades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var geterateFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : generateCascade;
      var startLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var endLevel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var subKey = this.subKey;

      var newCascades = _defineProperty({}, subKey, (0, _lodash.cloneDeep)(cascades));

      if (startLevel > endLevel) {
        return newCascades[subKey];
      }

      var setInit = function setInit(level, cascade) {
        if ((0, _lodash.isUndefined)(cascade[subKey])) {
          cascade[subKey] = [];
        }

        if ((0, _lodash.isEmpty)(cascade[subKey])) {
          (0, _lodash.times)(count, function (xIndex) {
            if ((0, _lodash.isUndefined)(cascade[subKey][xIndex])) {
              cascade[subKey][xIndex] = geterateFunc(level, xIndex);
            }
          });
        }

        (0, _lodash.forEach)(cascade[subKey], function (item) {
          if (level < endLevel) {
            setInit(level + 1, item);
          }
        });
      };

      setInit(startLevel, newCascades);
      return newCascades[subKey];
    }
    /*
     * For each cascade
     */

  }, {
    key: "cascadesForEach",
    value: function cascadesForEach(cascades, cb) {
      var _this = this;

      var startLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var endLevel = arguments.length > 3 ? arguments[3] : undefined;
      var subKey = this.subKey;
      (0, _lodash.forEach)(cascades, function (cascade, index) {
        cb(cascade, startLevel, index);

        if (!(0, _lodash.isEmpty)(cascade[subKey])) {
          if (endLevel && startLevel >= endLevel) {
            return;
          }

          _this.cascadesForEach(cascade[subKey], cb, startLevel + 1, endLevel);
        }
      });
    }
    /*
     * Get init values
     * Get the first value of cascades by default
     */

  }, {
    key: "initValues",
    value: function initValues(cascades, levels) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var subKey = this.subKey,
          valueKey = this.valueKey;
      return (0, _lodash.reduce)((0, _lodash.times)(levels), function (acc, _curr, level) {
        acc["level".concat(level)] = (0, _lodash.get)(cascades, "[".concat(index, "]") + (0, _lodash.times)(level, function () {
          return "".concat(subKey, "[").concat(index, "]");
        }).join('.') + valueKey);
        return acc;
      }, {});
    }
    /*
     * Get the specified level cascades by current values
     */

  }, {
    key: "getLevelCascades",
    value: function getLevelCascades(cascades, values, level) {
      var path = '';
      var subKey = this.subKey,
          valueKey = this.valueKey;

      if (level <= 0) {
        return {
          cascades: cascades || [],
          path: path,
          parent: null
        };
      }

      var prevLevel = level - 1;

      if (values && (0, _lodash.isEmpty)(values["level".concat(prevLevel)])) {
        return {
          cascades: [],
          path: path,
          parent: null
        };
      }

      var querySubCascades = function querySubCascades(startLevel, endLevel, subCascades) {
        var targetValue = values && values["level".concat(startLevel)];
        var current = (0, _lodash.find)(subCascades, function (cascade) {
          return (0, _lodash.get)(cascade, valueKey) === targetValue;
        });
        var currentIndex = (0, _lodash.indexOf)(subCascades, current);
        path += "[".concat(currentIndex, "].").concat(subKey);

        if (!current) {
          return {
            subCascades: [],
            parent: null
          };
        }

        if (startLevel >= endLevel) {
          return {
            subCascades: current[subKey] || [],
            parent: {
              cascade: current,
              index: currentIndex,
              level: startLevel
            }
          };
        }

        return querySubCascades(startLevel + 1, endLevel, current[subKey] || []);
      };

      var _querySubCascades = querySubCascades(0, prevLevel, cascades),
          subCascades = _querySubCascades.subCascades,
          parent = _querySubCascades.parent;

      return {
        cascades: subCascades,
        path: path,
        parent: parent
      };
    }
    /*
     * To structure cascades by text
     */

  }, {
    key: "parse",
    value: function parse(str, cb) {
      var itemSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';
      var levelSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '\n';
      var subKey = this.subKey,
          valueKey = this.valueKey;

      var parseLabels = function parseLabels(tArr) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var result = (0, _lodash.reduce)(tArr, function (acc, curr) {
          if (!acc[curr[0]]) {
            acc[curr[0]] = [];
          }

          var newCurr = (0, _lodash.filter)(curr, function (item) {
            return item !== curr[0];
          });

          if (newCurr.length > 0) {
            acc[curr[0]] = [].concat(_toConsumableArray(acc[curr[0]]), [newCurr]);
          }

          return acc;
        }, {});
        var cLevel = level;
        var index = 0;
        level++;
        return (0, _lodash.map)(result, function (item, key) {
          var cascade;

          if ((0, _lodash.isEmpty)(item)) {
            cascade = _objectSpread({}, cb(key, valueKey, cLevel, index));
          } else {
            cascade = _objectSpread(_defineProperty({}, subKey, parseLabels(item, level)), cb(key, valueKey, cLevel, index));
          }

          index++;
          return cascade;
        });
      };

      var trimedStr = (0, _lodash.trim)(str);

      if ((0, _lodash.isEmpty)(trimedStr)) {
        return [];
      }

      var arr = trimedStr.split(levelSeparator);
      var tArr = (0, _lodash.map)(arr, function (item) {
        return item.split(itemSeparator);
      });
      return parseLabels(tArr);
    }
    /*
     * Serialize string to cascades
     */

  }, {
    key: "stringify",
    value: function stringify(cascades, label) {
      var itemSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';
      var levelSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '\n';
      var endLevel = arguments.length > 4 ? arguments[4] : undefined;
      var results = this.flatten(cascades, [label], itemSeparator, endLevel);
      return (0, _lodash.map)(results, function (item) {
        return item.strs[label];
      }).join(levelSeparator);
    }
  }]);

  return CascadeHelper;
}();

var _default = CascadeHelper;
exports["default"] = _default;
//# sourceMappingURL=index.js.map