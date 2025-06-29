"use strict";
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