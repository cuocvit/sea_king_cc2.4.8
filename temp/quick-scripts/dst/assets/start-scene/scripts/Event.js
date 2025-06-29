
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNOzs7QUFFTjtJQUlJLGVBQVksS0FBYSxFQUFFLE1BQXlCO1FBQXpCLHVCQUFBLEVBQUEsYUFBeUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELHNCQUFXLHVCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3QkFBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVjLGFBQU8sR0FBVyxTQUFTLENBQUM7SUFDN0IsVUFBSSxHQUFXLE1BQU0sQ0FBQztJQUNyQixXQUFLLEdBQVcsT0FBTyxDQUFDO0lBQ3hCLFdBQUssR0FBVyxPQUFPLENBQUM7SUFDM0MsWUFBQztDQXJCRCxBQXFCQyxJQUFBO0FBckJZLHNCQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnQge1xyXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcGFyYW06IGFueSB8IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHlwZTA6IHN0cmluZywgcGFyYW0wOiBhbnkgfCBudWxsID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlMDtcclxuICAgICAgICB0aGlzLl9wYXJhbSA9IHBhcmFtMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmFtKCk6IGFueSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBDT05ORUNUOiBzdHJpbmcgPSBcImNvbm5lY3RcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgREFUQTogc3RyaW5nID0gXCJkYXRhXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBDTE9TRTogc3RyaW5nID0gXCJjbG9zZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgRVJST1I6IHN0cmluZyA9IFwiZXJyb3JcIjtcclxufVxyXG4iXX0=