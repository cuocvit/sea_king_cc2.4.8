
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/StorageBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af85eE5Yp1Gw7OfnewlQqPT', 'StorageBase');
// start-scene/scripts/StorageBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBase = void 0;
// @
var StorageManager_1 = require("./StorageManager");
// @
var StorageBase = /** @class */ (function () {
    // @
    function StorageBase() {
        this.PREFIX = "P2_";
        this.STORAGE_KEY = "STORAGE_KEY";
        this.is_init = false;
    }
    // @
    // _instance = new this() [không sử dụng new StorageBase()], tạo một instance của class con đang gọi hàm get_instance()
    StorageBase.get_instance = function () {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    };
    // @
    StorageBase.prototype.async_read_data = function (callback) {
        var _this = this;
        StorageManager_1.StorageManager.instance.async_read_data(this.PREFIX + this.STORAGE_KEY, function (data) {
            Object.assign(_this, data);
            // cc.log("StorageBase->async_read_data->success:", this.STORAGE_KEY, data, this);
            if (typeof callback === "function")
                callback(data);
        });
    };
    // @
    StorageBase.prototype.async_write_data = function (callback) {
        // cc.log("StorageBase->async_write_data:", this.STORAGE_KEY);
        StorageManager_1.StorageManager.instance.async_write_data(this.PREFIX + this.STORAGE_KEY, this, callback);
    };
    // @
    StorageBase.prototype.async_delete_data = function (callback) {
        StorageManager_1.StorageManager.instance.async_delete_data(this.PREFIX + this.STORAGE_KEY, callback);
    };
    StorageBase._instance = null;
    return StorageBase;
}());
exports.StorageBase = StorageBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN0b3JhZ2VCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUk7QUFDSixtREFBa0Q7QUFFbEQsSUFBSTtBQUNKO0lBT0ksSUFBSTtJQUNKO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUk7SUFDSix1SEFBdUg7SUFDekcsd0JBQVksR0FBMUI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFPLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUk7SUFDTSxxQ0FBZSxHQUF6QixVQUE2QixRQUE0QjtRQUF6RCxpQkFNQztRQUxHLCtCQUFjLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxJQUFPO1lBQy9FLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFCLGtGQUFrRjtZQUNsRixJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVU7Z0JBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7SUFDTSxzQ0FBZ0IsR0FBMUIsVUFBMkIsUUFBcUI7UUFDNUMsOERBQThEO1FBQzlELCtCQUFjLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVELElBQUk7SUFDRyx1Q0FBaUIsR0FBeEIsVUFBeUIsUUFBcUI7UUFDMUMsK0JBQWMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUF4Q2MscUJBQVMsR0FBUSxJQUFJLENBQUM7SUF5Q3pDLGtCQUFDO0NBMUNELEFBMENDLElBQUE7QUExQ1ksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAXHJcbmltcG9ydCB7IFN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSAnLi9TdG9yYWdlTWFuYWdlcic7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlQmFzZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IGFueSA9IG51bGw7XHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgUFJFRklYOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgU1RPUkFHRV9LRVk6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBpc19pbml0OiBib29sZWFuO1xyXG5cclxuICAgIC8vIEBcclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLlBSRUZJWCA9IFwiUDJfXCI7XHJcbiAgICAgICAgdGhpcy5TVE9SQUdFX0tFWSA9IFwiU1RPUkFHRV9LRVlcIjtcclxuICAgICAgICB0aGlzLmlzX2luaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICAvLyBfaW5zdGFuY2UgPSBuZXcgdGhpcygpIFtraMO0bmcgc+G7rSBk4bulbmcgbmV3IFN0b3JhZ2VCYXNlKCldLCB04bqhbyBt4buZdCBpbnN0YW5jZSBj4bunYSBjbGFzcyBjb24gxJFhbmcgZ+G7jWkgaMOgbSBnZXRfaW5zdGFuY2UoKVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfaW5zdGFuY2U8VD4oKTogVCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByb3RlY3RlZCBhc3luY19yZWFkX2RhdGE8VD4oY2FsbGJhY2s/OiAoZGF0YTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIFN0b3JhZ2VNYW5hZ2VyLmluc3RhbmNlLmFzeW5jX3JlYWRfZGF0YTxUPih0aGlzLlBSRUZJWCArIHRoaXMuU1RPUkFHRV9LRVksIChkYXRhOiBUKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIlN0b3JhZ2VCYXNlLT5hc3luY19yZWFkX2RhdGEtPnN1Y2Nlc3M6XCIsIHRoaXMuU1RPUkFHRV9LRVksIGRhdGEsIHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByb3RlY3RlZCBhc3luY193cml0ZV9kYXRhKGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIlN0b3JhZ2VCYXNlLT5hc3luY193cml0ZV9kYXRhOlwiLCB0aGlzLlNUT1JBR0VfS0VZKTtcclxuICAgICAgICBTdG9yYWdlTWFuYWdlci5pbnN0YW5jZS5hc3luY193cml0ZV9kYXRhKHRoaXMuUFJFRklYICsgdGhpcy5TVE9SQUdFX0tFWSwgdGhpcywgY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhc3luY19kZWxldGVfZGF0YShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBTdG9yYWdlTWFuYWdlci5pbnN0YW5jZS5hc3luY19kZWxldGVfZGF0YSh0aGlzLlBSRUZJWCArIHRoaXMuU1RPUkFHRV9LRVksIGNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG4iXX0=