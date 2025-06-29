"use strict";
cc._RF.push(module, 'e0b46e9Cn5Pn5JwALimAOhy', 'SignData');
// start-scene/scripts/SignData.ts

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
exports.SignBuyItemData = exports.SignItemData = exports.SignData = void 0;
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
//
var SignData = /** @class */ (function (_super) {
    __extends(SignData, _super);
    // @
    function SignData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "SignData"; // StorageBase
        _this.sign_day = 0;
        _this.sign_state = 0;
        _this.create_time = 0;
        _this.next_day_time = 0;
        _this.sign_data_array = [];
        _this.sign_buy_data_array = [];
        return _this;
    }
    // @, !!!type
    SignData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (_this.is_init) {
                for (var i = 0; i < _this.sign_data_array.length; i++) {
                    Object.setPrototypeOf(_this.sign_data_array[i], SignItemData.prototype);
                }
                for (var i = 0; i < _this.sign_buy_data_array.length; i++) {
                    Object.setPrototypeOf(_this.sign_buy_data_array[i], SignBuyItemData.prototype);
                }
            }
            else {
                _this.sign_day = 0;
                _this.sign_state = 0;
                var date = new Date();
                var timestamp = Math.floor(date.getTime() / 1000);
                _this.create_time = timestamp - (timestamp - 60 * date.getTimezoneOffset()) % 86400;
                _this.next_day_time = _this.create_time + 86400;
                //
                for (var i = 0; i < SignData.SIGN_LOOP_DAY; i++) {
                    var signItem = new SignItemData();
                    signItem.array_index = i;
                    signItem.day = (_this.sign_day + i + 1) % SignData.MAX_DAY_COUNT;
                    signItem.state = i === 0 ? 1 : 0;
                    var rowData = GameManager_1.gm.config.get_row_data("SignConfigData", signItem.day.toString());
                    if (rowData) {
                        signItem.reward_array = rowData.reward_array;
                    }
                    _this.sign_data_array.push(signItem);
                }
                //
                for (var i = 0; i < SignData.MAX_BUY_COUNT; i++) {
                    var signBuyItem = new SignBuyItemData();
                    signBuyItem.array_index = i;
                    signBuyItem.state = 1;
                    var rowData = GameManager_1.gm.config.get_row_data("SignConfigData", (_this.sign_day + 1).toString());
                    if (rowData) {
                        signBuyItem.reward_data = rowData.other_reward_array[i];
                    }
                    _this.sign_buy_data_array.push(signBuyItem);
                }
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    }; // end: async_read_data
    // @
    SignData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(SignData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    SignData.EVENT_DATA_CHANGE = "sign_data_change";
    SignData.MAX_DAY_COUNT = 30;
    SignData.SIGN_LOOP_DAY = 7;
    SignData.MAX_BUY_COUNT = 3;
    return SignData;
}(StorageBase_1.StorageBase));
exports.SignData = SignData;
// @, !!! reward_array: any[]
var SignItemData = /** @class */ (function () {
    function SignItemData() {
        this.array_index = -1;
        this.day = 0;
        this.state = 0;
        this.reward_array = [];
    }
    return SignItemData;
}());
exports.SignItemData = SignItemData;
// @ , !! reward_data: any
var SignBuyItemData = /** @class */ (function () {
    function SignBuyItemData() {
        this.array_index = -1;
        this.state = 0;
    }
    return SignBuyItemData;
}());
exports.SignBuyItemData = SignBuyItemData;

cc._RF.pop();