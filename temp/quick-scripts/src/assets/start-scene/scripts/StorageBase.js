"use strict";
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