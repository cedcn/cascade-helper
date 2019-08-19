"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.generateRandomString = void 0;

var _lodash = require("lodash");

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
    var _this = this;

    var _subKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'children';

    var _valueKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

    _classCallCheck(this, CascadeHelper);

    _defineProperty(this, "subKey", void 0);

    _defineProperty(this, "valueKey", void 0);

    _defineProperty(this, "initValues", function (cascades, levels) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var subKey = _this.subKey,
          valueKey = _this.valueKey;
      return (0, _lodash.reduce)((0, _lodash.times)(levels), function (acc, _curr, level) {
        acc["level".concat(level)] = (0, _lodash.get)(cascades, "[".concat(index, "]") + (0, _lodash.times)(level, function () {
          return "".concat(subKey, "[").concat(index, "]");
        }).join('.') + valueKey);
        return acc;
      }, {});
    });

    this.subKey = _subKey;
    this.valueKey = _valueKey;
  }

  _createClass(CascadeHelper, [{
    key: "flatten",
    value: function flatten(cascades) {
      var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var endLevel = arguments.length > 2 ? arguments[2] : undefined;
      var results = [];
      var subKey = this.subKey;

      var traverse = function traverse(cascades) {
        var strs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path = arguments.length > 2 ? arguments[2] : undefined;
        var level = arguments.length > 3 ? arguments[3] : undefined;
        (0, _lodash.forEach)(cascades, function (cascade, index) {
          var cStrs = {};
          (0, _lodash.forEach)(labels, function (label) {
            cStrs[label] = !(0, _lodash.isUndefined)(strs[label]) ? strs[label] + '-' + cascade[label] : cascade[label];
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
    key: "cascadeFill",
    value: function cascadeFill() {
      var cascades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var startLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var endLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var geterateFunc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : generateCascade;
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

        (0, _lodash.forEach)(cascade[subKey], function (choice) {
          if (level < endLevel) {
            setInit(level + 1, choice);
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
    key: "cascadeForEach",
    value: function cascadeForEach(cascades, cb) {
      var _this2 = this;

      var startLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var endLevel = arguments.length > 3 ? arguments[3] : undefined;
      var subKey = this.subKey;
      (0, _lodash.forEach)(cascades, function (cascade, index) {
        cb(cascade, startLevel, index);

        if (!(0, _lodash.isEmpty)(cascade[subKey])) {
          if (endLevel && startLevel >= endLevel) {
            return;
          }

          _this2.cascadeForEach(cascade[subKey], cb, startLevel + 1, endLevel);
        }
      });
    }
    /*
     * Get init values
     * Get the first value of cascades by default
     */

  }]);

  return CascadeHelper;
}();

var _default = CascadeHelper;
exports["default"] = _default;
//# sourceMappingURL=index.js.map