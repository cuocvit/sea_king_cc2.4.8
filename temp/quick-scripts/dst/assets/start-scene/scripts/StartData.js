
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/StartData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4dc2eIuFMxOzbv+zBG4QyMp', 'StartData');
// start-scene/scripts/StartData.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartData = void 0;
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
var StartData = /** @class */ (function (_super) {
    __extends(StartData, _super);
    function StartData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "StartData";
        _this.user_subscribe_message_stat = 0;
        return _this;
    }
    StartData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.is_init = true;
                _this.async_write_data();
            }
            if (typeof callback === "function")
                callback(data);
        });
    };
    StartData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(StartData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    StartData.EVENT_DATA_CHANGE = "start_data_change";
    StartData.BUILDING_UPGRADE = "building_upgrade";
    return StartData;
}(StorageBase_1.StorageBase));
exports.StartData = StartData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN0YXJ0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1DO0FBQ25DLDZDQUE0QztBQUU1QztJQUErQiw2QkFBVztJQU10QztRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQywyQkFBMkIsR0FBRyxDQUFDLENBQUM7O0lBQ3pDLENBQUM7SUFDTSxtQ0FBZSxHQUF0QixVQUEwQixRQUE0QjtRQUF0RCxpQkFRQztRQVBHLGlCQUFNLGVBQWUsWUFBQyxVQUFDLElBQU87WUFDMUIsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVO2dCQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxvQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBcUI7UUFDekMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4RCxpQkFBTSxnQkFBZ0IsWUFBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBdkJzQiwyQkFBaUIsR0FBVyxtQkFBbUIsQ0FBQztJQUNoRCwwQkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztJQXVCekUsZ0JBQUM7Q0F6QkQsQUF5QkMsQ0F6QjhCLHlCQUFXLEdBeUJ6QztBQXpCWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUJhc2UgfSBmcm9tIFwiLi9TdG9yYWdlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXJ0RGF0YSBleHRlbmRzIFN0b3JhZ2VCYXNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVZFTlRfREFUQV9DSEFOR0U6IHN0cmluZyA9IFwic3RhcnRfZGF0YV9jaGFuZ2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQlVJTERJTkdfVVBHUkFERTogc3RyaW5nID0gXCJidWlsZGluZ191cGdyYWRlXCI7XHJcblxyXG4gICAgcHVibGljIHVzZXJfc3Vic2NyaWJlX21lc3NhZ2Vfc3RhdDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5TVE9SQUdFX0tFWSA9IFwiU3RhcnREYXRhXCI7XHJcbiAgICAgICAgdGhpcy51c2VyX3N1YnNjcmliZV9tZXNzYWdlX3N0YXQgPSAwO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBhc3luY19yZWFkX2RhdGE8VD4oY2FsbGJhY2s/OiAoZGF0YTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3JlYWRfZGF0YSgoZGF0YTogVCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNfaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoU3RhcnREYXRhLkVWRU5UX0RBVEFfQ0hBTkdFKTtcclxuICAgICAgICBzdXBlci5hc3luY193cml0ZV9kYXRhKGNhbGxiYWNrKTtcclxuICAgIH1cclxufSJdfQ==