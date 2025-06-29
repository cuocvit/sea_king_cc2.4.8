"use strict";
cc._RF.push(module, '5dfc0lo8mBHNIM+fuwt3GRP', 'StorageManager');
// start-scene/scripts/StorageManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageManager = void 0;
// @
var encryptjs = require("../../scripts/libs/encryptjs/js1/encryptjs");
// @
var DebugInfo = /** @class */ (function () {
    function DebugInfo() {
        this.cost_time_array = [];
    }
    return DebugInfo;
}());
// @
var StorageManager = /** @class */ (function () {
    // @
    function StorageManager() {
        this._debug = true;
        this._debug_info_map = {};
        this._settings = { total_storage_size: 10485760, single_storage_size: 1048576 };
        this._encrypt_key = "3EyXvjUyd5eGLJHI9jcfTXQisawU48A9";
    }
    Object.defineProperty(StorageManager, "instance", {
        // @
        get: function () {
            return this._instance || (this._instance = new StorageManager());
        },
        enumerable: false,
        configurable: true
    });
    // @@
    StorageManager.prototype.async_read_data = function (key, callback) {
        var data = {};
        if (!key || typeof key !== "string") {
            cc.error("StorageManager->async_read_data: invalid key");
            return;
        }
        // debug1
        var debugKey = "async_read_data " + key;
        var startTime = 0;
        if (this._debug) {
            var debugInfo = this._debug_info_map[debugKey];
            if (!debugInfo) {
                this._debug_info_map[debugKey] = new DebugInfo();
            }
            startTime = Date.now();
        }
        // base
        var dataString = "{}";
        try {
            var newKey = this._debug ? key : encryptjs.base64Encode(key);
            dataString = cc.sys.localStorage.getItem(newKey);
            // dataString = null; 
            // console.error(dataString);
            if (dataString && !this._debug) {
                dataString = encryptjs.decrypt(dataString, this._encrypt_key, 256);
                cc.log("StorageManager->async_read_data->try.decryption.dataString->success:", dataString);
            }
        }
        catch (error) {
            cc.error("StorageManager->async_read_data->try.decryption.dataString->error:", error);
        }
        //
        try {
            if (dataString) {
                data = JSON.parse(dataString);
            }
        }
        catch (error) {
            cc.error("StorageManager->async_read_data->JSON.parse->error:", error);
        }
        // debug2
        if (this._debug) {
            var debugInfo = this._debug_info_map[debugKey];
            debugInfo.cost_time_array.push(Date.now() - startTime);
        }
        //
        if (typeof callback === "function")
            callback(data);
    }; // end: async_read_data
    // @@
    StorageManager.prototype.async_write_data = function (key, data, callback) {
        if (!key || typeof key !== "string") {
            cc.error("StorageManager->async_write_data: invalid key");
            return;
        }
        // debug1
        var debugKey = "async_write_data " + key;
        var startTime = 0;
        if (this._debug) {
            var debugInfo = this._debug_info_map[debugKey];
            if (!debugInfo) {
                this._debug_info_map[debugKey] = new DebugInfo();
            }
            startTime = Date.now();
        }
        // base
        var dataString = "{}";
        try {
            dataString = JSON.stringify(data);
            if (dataString && !this._debug) {
                dataString = encryptjs.encrypt(dataString, this._encrypt_key, 256);
                cc.log("StorageManager->async_write_data->try.encryption.dataString->success:", dataString);
            }
        }
        catch (error) {
            cc.error("StorageManager->async_write_data->try.encryption.dataString->error:", error);
        }
        //
        if (dataString.length > this._settings.single_storage_size && this.string_byte_length(dataString) > this._settings.single_storage_size) {
            cc.error("StorageManager->async_write_data->The length of a single key data exceeds the maximum length allowed for storage " + this._settings.single_storage_size + " bytes");
            return;
        }
        //
        try {
            var newKey = this._debug ? key : encryptjs.base64Encode(key);
            // console.log("setItem: ", dataString);
            cc.sys.localStorage.setItem(newKey, dataString);
        }
        catch (error) {
            cc.error("StorageManager->async_write_data->try.localStorage.setItem->error:", error);
        }
        // debug2
        if (this._debug) {
            var debugInfo = this._debug_info_map[debugKey];
            debugInfo.cost_time_array.push(Date.now() - startTime);
        }
        //
        if (typeof callback === "function")
            callback();
    }; // end: async_write_data
    // @@
    StorageManager.prototype.async_delete_data = function (key, callback) {
        if (!key || typeof key !== "string") {
            cc.error("StorageManager->async_delete_data: invalid key");
            return;
        }
        // debug1
        var debugKey = "async_delete_data " + key;
        var startTime = 0;
        if (this._debug) {
            var debugInfo = this._debug_info_map[debugKey];
            if (!debugInfo) {
                this._debug_info_map[debugKey] = new DebugInfo();
            }
            startTime = Date.now();
        }
        // base
        try {
            cc.sys.localStorage.removeItem(key);
        }
        catch (error) {
            cc.error("StorageManager->async_delete_data->try.localStorage.removeItem->error:", error);
        }
        // debug2
        if (this._debug) {
            var debugInfo = this._debug_info_map[debugKey];
            debugInfo.cost_time_array.push(Date.now() - startTime);
        }
        if (typeof callback === "function")
            callback();
    }; // end: async_delete_data
    // @ (not used)
    /* public async_read_remote_data(): void {
        cc.error("StorageManager->async_read_remote_data->This method has not yet been implemented");
    } */
    // @ (not used)
    /* public async_write_remote_data(): void {
        cc.error("StorageManager->async_write_remote_data->This method has not yet been implemented");
    } */
    // @ (not used)
    /* public async_delete_remote_data(): void {
        cc.error("StorageManager->async_delete_remote_data->This method has not yet been implemented");
    } */
    // @@
    StorageManager.prototype.print_debug_info = function () {
        if (!this._debug)
            return;
        for (var key in this._debug_info_map) {
            var debugInfo = this._debug_info_map[key];
            cc.log(key + " execute times:" + debugInfo.cost_time_array.length);
            cc.log(JSON.stringify(debugInfo));
        }
    };
    // @
    StorageManager.prototype.string_byte_length = function (str) {
        var strLength = typeof str === "string" ? str.length : 0;
        if (!strLength)
            return 0;
        var length = 0;
        for (var i = 0; i < strLength; i++) {
            length += str.charCodeAt(i) > 255 ? 2 : 1;
        }
        return length;
    };
    // @
    StorageManager._instance = null;
    return StorageManager;
}()); // end: StorageManager
exports.StorageManager = StorageManager;
// @
var _window = (typeof window !== "undefined") ? window : (typeof globalThis !== "undefined") ? globalThis : (typeof self !== "undefined") ? self : undefined;
if (_window)
    _window.StorageManager = StorageManager;

cc._RF.pop();