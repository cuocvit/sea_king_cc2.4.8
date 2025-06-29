"use strict";
cc._RF.push(module, '678ab89WUVAEIhxEjMbrg2g', 'LuckyWheelData');
// start-scene/scripts/LuckyWheelData.ts

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
exports.LuckyWheelData = void 0;
//
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
// @
var LuckyWheelData = /** @class */ (function (_super) {
    __extends(LuckyWheelData, _super);
    // @
    function LuckyWheelData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "LuckyWheelData";
        _this.left_lucky_wheel_free_count = 0;
        _this.left_lucky_wheel_video_count = 0;
        _this.free_timestamp = 0;
        _this.last_reward_index = 0;
        _this.is_init = false;
        return _this;
    }
    // @
    LuckyWheelData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.is_init = true;
                _this.left_lucky_wheel_free_count = GameManager_1.gm.const.MAX_LUCKY_WHEEL_FREE_COUNT;
                _this.left_lucky_wheel_video_count = GameManager_1.gm.const.MAX_LUCKY_WHEEL_VIDEO_COUNT;
                _this.free_timestamp = Date.now();
                _this.last_reward_index = 0;
                _this.async_write_data();
            }
            else {
                if (_this.free_timestamp === null || _this.free_timestamp === undefined) {
                    _this.free_timestamp = Date.now();
                }
            }
            if (callback)
                callback(data);
        });
    };
    // @
    LuckyWheelData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(LuckyWheelData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    LuckyWheelData.EVENT_DATA_CHANGE = "hero_data_change";
    return LuckyWheelData;
}(StorageBase_1.StorageBase));
exports.LuckyWheelData = LuckyWheelData;

cc._RF.pop();