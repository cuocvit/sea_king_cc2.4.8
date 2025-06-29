"use strict";
cc._RF.push(module, '0af4c3zfmVCDLJNskmkQd1T', 'SettingsData');
// start-scene/scripts/SettingsData.ts

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
exports.SettingsData = void 0;
// @
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
// @
var SettingsData = /** @class */ (function (_super) {
    __extends(SettingsData, _super);
    // @
    function SettingsData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "SettingsData"; // (extends super)
        return _this;
    }
    // @ !!!
    SettingsData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    };
    // @
    SettingsData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(SettingsData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    SettingsData.EVENT_DATA_CHANGE = "settings_data_change";
    return SettingsData;
}(StorageBase_1.StorageBase));
exports.SettingsData = SettingsData;

cc._RF.pop();