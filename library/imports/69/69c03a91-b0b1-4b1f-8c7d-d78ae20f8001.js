"use strict";
cc._RF.push(module, '69c03qRsLFLH4x914riD4AB', 'EventEmitter');
// start-scene/scripts/EventEmitter.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
// @@
var EventEmitter = /** @class */ (function () {
    // @@
    function EventEmitter() {
        this._events = {};
    }
    // @@
    EventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var listeners = this._events[eventName];
        if (!Array.isArray(listeners))
            return;
        for (var i = listeners.length - 1; i >= 0; i--) {
            var listener = listeners[i];
            if (typeof listener.callback === "function" && listener.target) {
                listener.callback.apply(listener.target, args);
                if (listener.isOnce)
                    listeners.splice(i, 1);
            }
        }
    };
    // @@
    EventEmitter.prototype.on = function (eventName, callback, target) {
        this._addListener(eventName, callback, target);
    };
    // @@ (not used)
    EventEmitter.prototype.once = function (eventName, callback, target) {
        this._addListener(eventName, callback, target, true);
    };
    // @@
    EventEmitter.prototype.off = function (eventName, callback, target) {
        var listeners = this._events[eventName];
        if (!Array.isArray(listeners))
            return;
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].callback === callback && listeners[i].target === target) {
                listeners.splice(i, 1);
                return;
            }
        }
    };
    // @@ (not used)
    EventEmitter.prototype.count = function (eventName) {
        return (this._events[eventName] || []).length;
    };
    // @@
    EventEmitter.prototype._addListener = function (eventName, callback, target, isOnce) {
        if (isOnce === void 0) { isOnce = false; }
        if (!eventName || typeof eventName !== "string" || typeof callback !== "function" || !target || typeof target !== "object")
            return;
        var listeners = this._events[eventName] || [];
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            if (listener.callback === callback && listener.target === target) {
                console.log("Do not register listeners repeatedly"); // 不要重复注册监听
                return;
            }
        }
        listeners.unshift({ callback: callback, target: target, isOnce: isOnce });
        this._events[eventName] = listeners;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;

cc._RF.pop();