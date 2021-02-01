
    (function (modules) {
        function require(moduleId) {
            const module = { exports : {} };
            modules[moduleId](require, module, module.exports);
            return module.exports;
        }
        require("./example/entry.js")
    })({"./example/entry.js":
        function (require, module, exports) {
            "use strict";

var _a = _interopRequireDefault(require("/Users/evannn/Desktop/DEMO/mini-pack/example/a.js"));

var _b = require("/Users/evannn/Desktop/DEMO/mini-pack/example/b.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('I am entry');
(0, _a["default"])();
(0, _b.say)();
        }
    ,"/Users/evannn/Desktop/DEMO/mini-pack/example/a.js":
        function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.name = void 0;

function _default() {
  console.log('a: I am a');
}

var name = 'Wang';
exports.name = name;
        }
    ,"/Users/evannn/Desktop/DEMO/mini-pack/example/b.js":
        function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.say = void 0;

var _a = require("/Users/evannn/Desktop/DEMO/mini-pack/example/a.js");

var say = function say() {
  console.log('b: I am b');
};

exports.say = say;
        }
    ,"/Users/evannn/Desktop/DEMO/mini-pack/example/a.js":
        function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.name = void 0;

function _default() {
  console.log('a: I am a');
}

var name = 'Wang';
exports.name = name;
        }
    })