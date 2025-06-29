"use strict";
cc._RF.push(module, '1df8bvUSwRBkaDoqzbPkacr', 'Event');
// start-scene/scripts/Event.ts

"use strict";
// +-+
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(type0, param0) {
        if (param0 === void 0) { param0 = null; }
        this._type = type0;
        this._param = param0;
    }
    Object.defineProperty(Event.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "param", {
        get: function () {
            return this._param;
        },
        enumerable: false,
        configurable: true
    });
    Event.CONNECT = "connect";
    Event.DATA = "data";
    Event.CLOSE = "close";
    Event.ERROR = "error";
    return Event;
}());
exports.Event = Event;

cc._RF.pop();