
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/StorageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN0b3JhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUk7QUFDSixzRUFBd0U7QUFleEUsSUFBSTtBQUNKO0lBR0k7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQUVELElBQUk7QUFDSjtJQVFJLElBQUk7SUFDSjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDaEYsSUFBSSxDQUFDLFlBQVksR0FBRyxrQ0FBa0MsQ0FBQztJQUMzRCxDQUFDO0lBR0Qsc0JBQWtCLDBCQUFRO1FBRDFCLElBQUk7YUFDSjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBRUQsS0FBSztJQUNFLHdDQUFlLEdBQXRCLFVBQTBCLEdBQVcsRUFBRSxRQUE0QjtRQUMvRCxJQUFJLElBQUksR0FBRyxFQUFPLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDakMsRUFBRSxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQ3pELE9BQU87U0FDVjtRQUNELFNBQVM7UUFDVCxJQUFNLFFBQVEsR0FBVyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7UUFDbEQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQU0sU0FBUyxHQUFjLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDWixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7YUFDcEQ7WUFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FBTztRQUNQLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQztRQUM5QixJQUFJO1lBQ0EsSUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLFVBQVUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsc0JBQXNCO1lBQ3RCLDZCQUE2QjtZQUM3QixJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzVCLFVBQVUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRSxFQUFFLENBQUMsR0FBRyxDQUFDLHNFQUFzRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzlGO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0VBQW9FLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekY7UUFDRCxFQUFFO1FBQ0YsSUFBSTtZQUNBLElBQUksVUFBVSxFQUFFO2dCQUNaLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEVBQUUsQ0FBQyxLQUFLLENBQUMscURBQXFELEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUU7UUFDRCxTQUFTO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBTSxTQUFTLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RCxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxFQUFFO1FBQ0YsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVO1lBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUMsRUFBQyx1QkFBdUI7SUFFekIsS0FBSztJQUNFLHlDQUFnQixHQUF2QixVQUF3QixHQUFXLEVBQUUsSUFBWSxFQUFFLFFBQXFCO1FBQ3BFLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztZQUMxRCxPQUFPO1NBQ1Y7UUFDRCxTQUFTO1FBQ1QsSUFBTSxRQUFRLEdBQVcsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFNLFNBQVMsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2FBQ3BEO1lBQ0QsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMxQjtRQUNELE9BQU87UUFDUCxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUM7UUFDOUIsSUFBSTtZQUNBLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDNUIsVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ25FLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUVBQXVFLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDL0Y7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQyxxRUFBcUUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRjtRQUNELEVBQUU7UUFDRixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRTtZQUNwSSxFQUFFLENBQUMsS0FBSyxDQUFDLG1IQUFtSCxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDOUssT0FBTztTQUNWO1FBQ0QsRUFBRTtRQUNGLElBQUk7WUFDQSxJQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsd0NBQXdDO1lBQ3hDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbkQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0VBQW9FLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekY7UUFDRCxTQUFTO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBTSxTQUFTLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RCxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxFQUFFO1FBQ0YsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVO1lBQUUsUUFBUSxFQUFFLENBQUM7SUFDbkQsQ0FBQyxFQUFDLHdCQUF3QjtJQUUxQixLQUFLO0lBQ0UsMENBQWlCLEdBQXhCLFVBQXlCLEdBQVcsRUFBRSxRQUFxQjtRQUN2RCxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNqQyxFQUFFLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7WUFDM0QsT0FBTztTQUNWO1FBQ0QsU0FBUztRQUNULElBQU0sUUFBUSxHQUFXLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztRQUNwRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBTSxTQUFTLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzthQUNwRDtZQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPO1FBQ1AsSUFBSTtZQUNBLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQyx3RUFBd0UsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3RjtRQUNELFNBQVM7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFNLFNBQVMsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksT0FBTyxRQUFRLEtBQUssVUFBVTtZQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ25ELENBQUMsRUFBQyx5QkFBeUI7SUFFM0IsZUFBZTtJQUNmOztRQUVJO0lBRUosZUFBZTtJQUNmOztRQUVJO0lBRUosZUFBZTtJQUNmOztRQUVJO0lBRUosS0FBSztJQUNFLHlDQUFnQixHQUF2QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDekIsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BDLElBQU0sU0FBUyxHQUFjLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxJQUFJO0lBQ0ksMkNBQWtCLEdBQTFCLFVBQTJCLEdBQVc7UUFDbEMsSUFBTSxTQUFTLEdBQVcsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUM7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQXJMRCxJQUFJO0lBQ1csd0JBQVMsR0FBbUIsSUFBSSxDQUFDO0lBcUxwRCxxQkFBQztDQXZMRCxBQXVMQyxJQUFBLENBQUMsc0JBQXNCO0FBdkxYLHdDQUFjO0FBeUwzQixJQUFJO0FBQ0osSUFBTSxPQUFPLEdBQVcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUF3QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNyTSxJQUFJLE9BQU87SUFBRSxPQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBAXHJcbmltcG9ydCAqIGFzIGVuY3J5cHRqcyBmcm9tIFwiLi4vLi4vc2NyaXB0cy9saWJzL2VuY3J5cHRqcy9qczEvZW5jcnlwdGpzXCI7XHJcblxyXG4vKiBcclxuLy8gdGVzdCBlbmNyeXB0anNcclxuY29uc3QgdHh0ID0gXCJIZWxsbyBXb3JsZFwiO1xyXG5jb25zdCB0MSA9IGVuY3J5cHRqcy5iYXNlNjRFbmNvZGUodHh0KTtcclxuY29uc3QgdDIgPSBlbmNyeXB0anMuYmFzZTY0RGVjb2RlKHQxKTtcclxuY29uc29sZS5sb2coXCJlbmNyeXB0anMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiLCB0MSwgdDIpOyAqL1xyXG5cclxuLy8gQFxyXG5pbnRlcmZhY2UgSVNNU2V0dGluZ3Mge1xyXG4gICAgdG90YWxfc3RvcmFnZV9zaXplOiBudW1iZXI7XHJcbiAgICBzaW5nbGVfc3RvcmFnZV9zaXplOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIEBcclxuY2xhc3MgRGVidWdJbmZvIHtcclxuICAgIGNvc3RfdGltZV9hcnJheTogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb3N0X3RpbWVfYXJyYXkgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgU3RvcmFnZU1hbmFnZXIge1xyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTdG9yYWdlTWFuYWdlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWJ1ZzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlYnVnX2luZm9fbWFwOiBSZWNvcmQ8c3RyaW5nLCBEZWJ1Z0luZm8+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2V0dGluZ3M6IFJlYWRvbmx5PElTTVNldHRpbmdzPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2VuY3J5cHRfa2V5OiBzdHJpbmc7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZWJ1ZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZGVidWdfaW5mb19tYXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHsgdG90YWxfc3RvcmFnZV9zaXplOiAxMDQ4NTc2MCwgc2luZ2xlX3N0b3JhZ2Vfc2l6ZTogMTA0ODU3NiB9O1xyXG4gICAgICAgIHRoaXMuX2VuY3J5cHRfa2V5ID0gXCIzRXlYdmpVeWQ1ZUdMSkhJOWpjZlRYUWlzYXdVNDhBOVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IFN0b3JhZ2VNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IFN0b3JhZ2VNYW5hZ2VyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgYXN5bmNfcmVhZF9kYXRhPFQ+KGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChkYXRhOiBUKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fSBhcyBUO1xyXG4gICAgICAgIGlmICgha2V5IHx8IHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfcmVhZF9kYXRhOiBpbnZhbGlkIGtleVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkZWJ1ZzFcclxuICAgICAgICBjb25zdCBkZWJ1Z0tleTogc3RyaW5nID0gXCJhc3luY19yZWFkX2RhdGEgXCIgKyBrZXk7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlYnVnSW5mbzogRGVidWdJbmZvID0gdGhpcy5fZGVidWdfaW5mb19tYXBbZGVidWdLZXldO1xyXG4gICAgICAgICAgICBpZiAoIWRlYnVnSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWdfaW5mb19tYXBbZGVidWdLZXldID0gbmV3IERlYnVnSW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJhc2VcclxuICAgICAgICBsZXQgZGF0YVN0cmluZzogc3RyaW5nID0gXCJ7fVwiO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleTogc3RyaW5nID0gdGhpcy5fZGVidWcgPyBrZXkgOiBlbmNyeXB0anMuYmFzZTY0RW5jb2RlKGtleSk7XHJcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0obmV3S2V5KTtcclxuICAgICAgICAgICAgLy8gZGF0YVN0cmluZyA9IG51bGw7IFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGRhdGFTdHJpbmcpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVN0cmluZyAmJiAhdGhpcy5fZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFTdHJpbmcgPSBlbmNyeXB0anMuZGVjcnlwdChkYXRhU3RyaW5nLCB0aGlzLl9lbmNyeXB0X2tleSwgMjU2KTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlN0b3JhZ2VNYW5hZ2VyLT5hc3luY19yZWFkX2RhdGEtPnRyeS5kZWNyeXB0aW9uLmRhdGFTdHJpbmctPnN1Y2Nlc3M6XCIsIGRhdGFTdHJpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfcmVhZF9kYXRhLT50cnkuZGVjcnlwdGlvbi5kYXRhU3RyaW5nLT5lcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhU3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiU3RvcmFnZU1hbmFnZXItPmFzeW5jX3JlYWRfZGF0YS0+SlNPTi5wYXJzZS0+ZXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZGVidWcyXHJcbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlYnVnSW5mbzogRGVidWdJbmZvID0gdGhpcy5fZGVidWdfaW5mb19tYXBbZGVidWdLZXldO1xyXG4gICAgICAgICAgICBkZWJ1Z0luZm8uY29zdF90aW1lX2FycmF5LnB1c2goRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayhkYXRhKTtcclxuICAgIH0gLy8gZW5kOiBhc3luY19yZWFkX2RhdGFcclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIGFzeW5jX3dyaXRlX2RhdGEoa2V5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCwgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFrZXkgfHwgdHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIlN0b3JhZ2VNYW5hZ2VyLT5hc3luY193cml0ZV9kYXRhOiBpbnZhbGlkIGtleVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkZWJ1ZzFcclxuICAgICAgICBjb25zdCBkZWJ1Z0tleTogc3RyaW5nID0gXCJhc3luY193cml0ZV9kYXRhIFwiICsga2V5O1xyXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Zykge1xyXG4gICAgICAgICAgICBjb25zdCBkZWJ1Z0luZm86IERlYnVnSW5mbyA9IHRoaXMuX2RlYnVnX2luZm9fbWFwW2RlYnVnS2V5XTtcclxuICAgICAgICAgICAgaWYgKCFkZWJ1Z0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnX2luZm9fbWFwW2RlYnVnS2V5XSA9IG5ldyBEZWJ1Z0luZm8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiYXNlXHJcbiAgICAgICAgbGV0IGRhdGFTdHJpbmc6IHN0cmluZyA9IFwie31cIjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYXRhU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhU3RyaW5nICYmICF0aGlzLl9kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVN0cmluZyA9IGVuY3J5cHRqcy5lbmNyeXB0KGRhdGFTdHJpbmcsIHRoaXMuX2VuY3J5cHRfa2V5LCAyNTYpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiU3RvcmFnZU1hbmFnZXItPmFzeW5jX3dyaXRlX2RhdGEtPnRyeS5lbmNyeXB0aW9uLmRhdGFTdHJpbmctPnN1Y2Nlc3M6XCIsIGRhdGFTdHJpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfd3JpdGVfZGF0YS0+dHJ5LmVuY3J5cHRpb24uZGF0YVN0cmluZy0+ZXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAoZGF0YVN0cmluZy5sZW5ndGggPiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVfc3RvcmFnZV9zaXplICYmIHRoaXMuc3RyaW5nX2J5dGVfbGVuZ3RoKGRhdGFTdHJpbmcpID4gdGhpcy5fc2V0dGluZ3Muc2luZ2xlX3N0b3JhZ2Vfc2l6ZSkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIlN0b3JhZ2VNYW5hZ2VyLT5hc3luY193cml0ZV9kYXRhLT5UaGUgbGVuZ3RoIG9mIGEgc2luZ2xlIGtleSBkYXRhIGV4Y2VlZHMgdGhlIG1heGltdW0gbGVuZ3RoIGFsbG93ZWQgZm9yIHN0b3JhZ2UgXCIgKyB0aGlzLl9zZXR0aW5ncy5zaW5nbGVfc3RvcmFnZV9zaXplICsgXCIgYnl0ZXNcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdLZXk6IHN0cmluZyA9IHRoaXMuX2RlYnVnID8ga2V5IDogZW5jcnlwdGpzLmJhc2U2NEVuY29kZShrZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNldEl0ZW06IFwiLCBkYXRhU3RyaW5nKTtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKG5ld0tleSwgZGF0YVN0cmluZyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfd3JpdGVfZGF0YS0+dHJ5LmxvY2FsU3RvcmFnZS5zZXRJdGVtLT5lcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkZWJ1ZzJcclxuICAgICAgICBpZiAodGhpcy5fZGVidWcpIHtcclxuICAgICAgICAgICAgY29uc3QgZGVidWdJbmZvOiBEZWJ1Z0luZm8gPSB0aGlzLl9kZWJ1Z19pbmZvX21hcFtkZWJ1Z0tleV07XHJcbiAgICAgICAgICAgIGRlYnVnSW5mby5jb3N0X3RpbWVfYXJyYXkucHVzaChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrKCk7XHJcbiAgICB9IC8vIGVuZDogYXN5bmNfd3JpdGVfZGF0YVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgYXN5bmNfZGVsZXRlX2RhdGEoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgha2V5IHx8IHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfZGVsZXRlX2RhdGE6IGludmFsaWQga2V5XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRlYnVnMVxyXG4gICAgICAgIGNvbnN0IGRlYnVnS2V5OiBzdHJpbmcgPSBcImFzeW5jX2RlbGV0ZV9kYXRhIFwiICsga2V5O1xyXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Zykge1xyXG4gICAgICAgICAgICBjb25zdCBkZWJ1Z0luZm86IERlYnVnSW5mbyA9IHRoaXMuX2RlYnVnX2luZm9fbWFwW2RlYnVnS2V5XTtcclxuICAgICAgICAgICAgaWYgKCFkZWJ1Z0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnX2luZm9fbWFwW2RlYnVnS2V5XSA9IG5ldyBEZWJ1Z0luZm8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiYXNlXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfZGVsZXRlX2RhdGEtPnRyeS5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbS0+ZXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZGVidWcyXHJcbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlYnVnSW5mbzogRGVidWdJbmZvID0gdGhpcy5fZGVidWdfaW5mb19tYXBbZGVidWdLZXldO1xyXG4gICAgICAgICAgICBkZWJ1Z0luZm8uY29zdF90aW1lX2FycmF5LnB1c2goRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikgY2FsbGJhY2soKTtcclxuICAgIH0gLy8gZW5kOiBhc3luY19kZWxldGVfZGF0YVxyXG5cclxuICAgIC8vIEAgKG5vdCB1c2VkKVxyXG4gICAgLyogcHVibGljIGFzeW5jX3JlYWRfcmVtb3RlX2RhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfcmVhZF9yZW1vdGVfZGF0YS0+VGhpcyBtZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZFwiKTtcclxuICAgIH0gKi9cclxuXHJcbiAgICAvLyBAIChub3QgdXNlZClcclxuICAgIC8qIHB1YmxpYyBhc3luY193cml0ZV9yZW1vdGVfZGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBjYy5lcnJvcihcIlN0b3JhZ2VNYW5hZ2VyLT5hc3luY193cml0ZV9yZW1vdGVfZGF0YS0+VGhpcyBtZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZFwiKTtcclxuICAgIH0gKi9cclxuXHJcbiAgICAvLyBAIChub3QgdXNlZClcclxuICAgIC8qIHB1YmxpYyBhc3luY19kZWxldGVfcmVtb3RlX2RhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgY2MuZXJyb3IoXCJTdG9yYWdlTWFuYWdlci0+YXN5bmNfZGVsZXRlX3JlbW90ZV9kYXRhLT5UaGlzIG1ldGhvZCBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkXCIpO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgcHJpbnRfZGVidWdfaW5mbygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RlYnVnKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZGVidWdfaW5mb19tYXApIHtcclxuICAgICAgICAgICAgY29uc3QgZGVidWdJbmZvOiBEZWJ1Z0luZm8gPSB0aGlzLl9kZWJ1Z19pbmZvX21hcFtrZXldO1xyXG4gICAgICAgICAgICBjYy5sb2coa2V5ICsgXCIgZXhlY3V0ZSB0aW1lczpcIiArIGRlYnVnSW5mby5jb3N0X3RpbWVfYXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgY2MubG9nKEpTT04uc3RyaW5naWZ5KGRlYnVnSW5mbykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHN0cmluZ19ieXRlX2xlbmd0aChzdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3Qgc3RyTGVuZ3RoOiBudW1iZXIgPSB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiID8gc3RyLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgaWYgKCFzdHJMZW5ndGgpIHJldHVybiAwO1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZW5ndGggKz0gc3RyLmNoYXJDb2RlQXQoaSkgPiAyNTUgPyAyIDogMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgIH1cclxufSAvLyBlbmQ6IFN0b3JhZ2VNYW5hZ2VyXHJcblxyXG4vLyBAXHJcbmNvbnN0IF93aW5kb3c6IFdpbmRvdyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSA/IHdpbmRvdyA6ICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgPyBnbG9iYWxUaGlzIGFzIFdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzIDogKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSA/IHNlbGYgOiB1bmRlZmluZWQ7XHJcbmlmIChfd2luZG93KSBfd2luZG93LlN0b3JhZ2VNYW5hZ2VyID0gU3RvcmFnZU1hbmFnZXI7Il19