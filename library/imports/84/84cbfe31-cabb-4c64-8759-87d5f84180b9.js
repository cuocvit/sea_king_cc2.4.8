"use strict";
cc._RF.push(module, '84cbf4xyrtMZIdZh9X4QYC5', 'TurtleExchangeData');
// start-scene/scripts/TurtleExchangeData.ts

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
exports.TurtleExchangeData = exports.TurtleExchangeItemData = void 0;
var StorageBase_1 = require("./StorageBase");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
// @
var TurtleExchangeItemData = /** @class */ (function () {
    function TurtleExchangeItemData() {
        this.prop_id = 0;
        this.prop_num = 0;
        this.exchange_prop_id = Constants_1.RewardIdEnum.GOLD_BARREL;
        this.exchange_prop_num = 1;
        this.state = 0;
    }
    return TurtleExchangeItemData;
}());
exports.TurtleExchangeItemData = TurtleExchangeItemData;
// @
var TurtleExchangeData = /** @class */ (function (_super) {
    __extends(TurtleExchangeData, _super);
    // @
    function TurtleExchangeData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "TurtleExchangeData";
        _this.left_refresh_count = 0;
        return _this;
    }
    // @
    TurtleExchangeData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.left_refresh_count = GameManager_1.gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT;
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    };
    // @
    TurtleExchangeData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(TurtleExchangeData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    TurtleExchangeData.prototype.get_turtle_exchange_data_array = function () {
        var exchangeDataArray = TurtleExchangeData.turtle_exchange_data_array;
        if (exchangeDataArray.length === 0) {
            for (var i = 0; i < GameManager_1.gm.const.TURTLE_EXCHANGE_ITEM_DATA_ARRAY.length; i++) {
                var itemData = GameManager_1.gm.const.TURTLE_EXCHANGE_ITEM_DATA_ARRAY[i];
                var newItem = new TurtleExchangeItemData();
                newItem.prop_id = itemData.prop_id;
                newItem.prop_num = itemData.prop_num;
                newItem.exchange_prop_id = itemData.exchange_prop_id;
                newItem.exchange_prop_num = itemData.exchange_prop_num;
                exchangeDataArray.push(newItem);
            }
        }
        for (var i = 0; i < exchangeDataArray.length; i++) {
            var item = exchangeDataArray[i];
            item.state = GameManager_1.gm.data.mapCell_data.getMertrailIDCount(item.prop_id) >= item.prop_num ? 1 : 0;
        }
        return exchangeDataArray;
    };
    TurtleExchangeData.EVENT_DATA_CHANGE = "turtle_exchange_data_change";
    TurtleExchangeData.turtle_exchange_data_array = [];
    return TurtleExchangeData;
}(StorageBase_1.StorageBase));
exports.TurtleExchangeData = TurtleExchangeData;

cc._RF.pop();