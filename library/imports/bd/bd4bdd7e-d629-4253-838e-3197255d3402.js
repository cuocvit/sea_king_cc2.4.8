"use strict";
cc._RF.push(module, 'bd4bd1+1ilCU4OOMZclXTQC', 'RecordData');
// start-scene/scripts/RecordData.ts

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
exports.RecordData = exports.WarehouseItemData = void 0;
var StorageBase_1 = require("./StorageBase");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
// @
var WarehouseItemData = /** @class */ (function () {
    function WarehouseItemData() {
        this.id = 0;
        this.value = 0;
    }
    return WarehouseItemData;
}());
exports.WarehouseItemData = WarehouseItemData;
// @
var RecordData = /** @class */ (function (_super) {
    __extends(RecordData, _super);
    // @
    function RecordData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "RecordData";
        _this.share_record_count = 0;
        _this.left_push_share_count = 0;
        _this.reward_array = [];
        _this.record_state = 0;
        _this.record_type = 0;
        _this.record_timestamp = 0;
        _this.is_init = false;
        return _this;
    }
    //
    RecordData.prototype.async_read_data = function (callback) {
        var self = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (self.is_init) {
                for (var i = 0; i < self.reward_array.length; i++) {
                    Object.setPrototypeOf(self.reward_array[i], WarehouseItemData.prototype);
                }
                Object.setPrototypeOf(self.reward_data, WarehouseItemData.prototype);
            }
            else {
                self.reward_data = new WarehouseItemData();
                self.reward_data.id = Constants_1.RewardIdEnum.GOLD;
                self.reward_data.value = 100;
                //
                self.push_share_reward_data = new WarehouseItemData();
                self.push_share_reward_data.id = Constants_1.RewardIdEnum.DIAMOND;
                self.push_share_reward_data.value = 100;
                self.share_record_count = 0;
                self.left_push_share_count = GameManager_1.gm.const.MAX_PUSH_SHARE_COUNT;
                self.is_init = true;
                self.async_write_data();
            }
            self.record_state = 0;
            self.record_timestamp = 0;
            self.record_type = 0;
            if (callback)
                callback(data);
        });
    };
    // @
    RecordData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(RecordData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    RecordData.EVENT_DATA_CHANGE = "record_data_change";
    RecordData.RECORD_STATE_CHANGE = "record_state_change";
    RecordData.AUTO_END_RECORD_TIME = 20;
    RecordData.MIN_RECORD_TIME = 5;
    return RecordData;
}(StorageBase_1.StorageBase));
exports.RecordData = RecordData;

cc._RF.pop();