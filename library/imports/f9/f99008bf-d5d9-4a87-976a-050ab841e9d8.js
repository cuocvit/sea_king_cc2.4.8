"use strict";
cc._RF.push(module, 'f9900i/1dlKh5dqBQq4QenY', 'MvcEventDispatcher');
// start-scene/scripts/MvcEventDispatcher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcEventDispatcher = void 0;
//
var EventDispatcher_1 = require("./EventDispatcher");
var MvcEventDispatcher = (function () {
    var _DISPATCHERS_DIC = {};
    var dispatchEvent = function (eventName, event) {
        if (eventName) {
            this.getInstance(eventName).dispatchEvent(event);
        }
        else {
            for (var key in _DISPATCHERS_DIC) {
                _DISPATCHERS_DIC[key].dispatchEvent(event);
            }
        }
    };
    var getInstance = function (key) {
        if (_DISPATCHERS_DIC[key] == null) {
            _DISPATCHERS_DIC[key] = new EventDispatcher_1.EventDispatcher();
        }
        return _DISPATCHERS_DIC[key];
    };
    return {
        dispatchEvent: dispatchEvent,
        getInstance: getInstance,
        _DISPATCHERS_DIC: _DISPATCHERS_DIC
    };
})();
exports.MvcEventDispatcher = MvcEventDispatcher;

cc._RF.pop();