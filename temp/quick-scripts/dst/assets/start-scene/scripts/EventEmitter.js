
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/EventEmitter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEV2ZW50RW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxLQUFLO0FBQ0w7SUFHSSxLQUFLO0lBQ0w7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsS0FBSztJQUNFLDJCQUFJLEdBQVgsVUFBWSxTQUFpQjtRQUFFLGNBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qiw2QkFBd0I7O1FBQ25ELElBQU0sU0FBUyxHQUFxQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU87UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQU0sUUFBUSxHQUFtQixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxPQUFPLFFBQVEsQ0FBQyxRQUFRLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzVELFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLElBQUksUUFBUSxDQUFDLE1BQU07b0JBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0M7U0FDSjtJQUNMLENBQUM7SUFFRCxLQUFLO0lBQ0UseUJBQUUsR0FBVCxVQUFVLFNBQWlCLEVBQUUsUUFBc0IsRUFBRSxNQUFjO1FBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ1QsMkJBQUksR0FBWCxVQUFZLFNBQWlCLEVBQUUsUUFBc0IsRUFBRSxNQUFjO1FBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELEtBQUs7SUFDRSwwQkFBRyxHQUFWLFVBQVcsU0FBaUIsRUFBRSxRQUFzQixFQUFFLE1BQWU7UUFDakUsSUFBTSxTQUFTLEdBQXFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQUUsT0FBTztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO2dCQUN0RSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsT0FBTzthQUNWO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ1QsNEJBQUssR0FBWixVQUFhLFNBQWlCO1FBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDO0lBRUQsS0FBSztJQUNHLG1DQUFZLEdBQXBCLFVBQXFCLFNBQWlCLEVBQUUsUUFBc0IsRUFBRSxNQUFjLEVBQUUsTUFBdUI7UUFBdkIsdUJBQUEsRUFBQSxjQUF1QjtRQUNuRyxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtZQUFFLE9BQU87UUFDbkksSUFBTSxTQUFTLEdBQXFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xFLEtBQXVCLFVBQVMsRUFBVCx1QkFBUyxFQUFULHVCQUFTLEVBQVQsSUFBUyxFQUFFO1lBQTdCLElBQU0sUUFBUSxrQkFBQTtZQUNmLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDLFdBQVc7Z0JBQ2hFLE9BQU87YUFDVjtTQUNKO1FBQ0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTdEQSxBQTZEQyxJQUFBO0FBN0RZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQEBcclxuaW50ZXJmYWNlIElFdmVudExpc3RlbmVyIHtcclxuICAgIGNhbGxiYWNrOiBDYWxsYmFja1R5cGU7XHJcbiAgICB0YXJnZXQ6IG9iamVjdDtcclxuICAgIGlzT25jZTogYm9vbGVhbjtcclxufVxyXG5cclxuLy8gQEBcclxudHlwZSBFdmVudEFyZ3NUeXBlID0gbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG9iamVjdDtcclxuZXhwb3J0IHR5cGUgQ2FsbGJhY2tUeXBlID0gKC4uLmFyZ3M6IEV2ZW50QXJnc1R5cGVbXSkgPT4gdm9pZDtcclxuXHJcbi8vIEBAXHJcbmV4cG9ydCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZXZlbnRzOiBSZWNvcmQ8c3RyaW5nLCBJRXZlbnRMaXN0ZW5lcltdPjtcclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgZW1pdChldmVudE5hbWU6IHN0cmluZywgLi4uYXJnczogRXZlbnRBcmdzVHlwZVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzOiBJRXZlbnRMaXN0ZW5lcltdID0gdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV07XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3RlbmVycykpIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyOiBJRXZlbnRMaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIGxpc3RlbmVyLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suYXBwbHkobGlzdGVuZXIudGFyZ2V0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5pc09uY2UpIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrVHlwZSwgdGFyZ2V0OiBvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hZGRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAIChub3QgdXNlZClcclxuICAgIHB1YmxpYyBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGJhY2tUeXBlLCB0YXJnZXQ6IG9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FkZExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIHRhcmdldCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFja1R5cGUsIHRhcmdldD86IG9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyczogSUV2ZW50TGlzdGVuZXJbXSA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXJzW2ldLnRhcmdldCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAIChub3QgdXNlZClcclxuICAgIHB1YmxpYyBjb3VudChldmVudE5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwcml2YXRlIF9hZGRMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrVHlwZSwgdGFyZ2V0OiBvYmplY3QsIGlzT25jZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFldmVudE5hbWUgfHwgdHlwZW9mIGV2ZW50TmFtZSAhPT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIiB8fCAhdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnM6IElFdmVudExpc3RlbmVyW10gPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnRhcmdldCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvIG5vdCByZWdpc3RlciBsaXN0ZW5lcnMgcmVwZWF0ZWRseVwiKTsgLy8g5LiN6KaB6YeN5aSN5rOo5YaM55uR5ZCsXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdGVuZXJzLnVuc2hpZnQoeyBjYWxsYmFjaywgdGFyZ2V0LCBpc09uY2UgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gPSBsaXN0ZW5lcnM7XHJcbiAgICB9XHJcbn1cclxuIl19