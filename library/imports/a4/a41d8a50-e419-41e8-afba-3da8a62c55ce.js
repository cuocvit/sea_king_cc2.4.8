"use strict";
cc._RF.push(module, 'a41d8pQ5BlB6K+6PaimLFXO', 'StoreData');
// start-scene/scripts/StoreData.ts

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
exports.StoreData = exports.StoreItemData = void 0;
var StorageBase_1 = require("./StorageBase");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
// @
var StoreItemData = /** @class */ (function () {
    function StoreItemData() {
        this.id = 0;
        this.count = 0;
        this.video_count = 0;
        this.index = 0;
    }
    return StoreItemData;
}());
exports.StoreItemData = StoreItemData;
// @
var StoreData = /** @class */ (function (_super) {
    __extends(StoreData, _super);
    function StoreData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //
        _this.STORAGE_KEY = "StoreData";
        _this.refresh_time = 0;
        _this.store_array = [];
        _this.daily_store_array = [];
        _this.video_store_array = [];
        _this.diamond_store_array = [];
        _this.isFree = true;
        return _this;
    }
    // @
    StoreData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (_this.is_init) {
                for (var i = 0; i < _this.store_array.length; i++) {
                    Object.setPrototypeOf(_this.store_array[i], StoreItemData.prototype);
                }
                for (var i = 0; i < _this.daily_store_array.length; i++) {
                    Object.setPrototypeOf(_this.daily_store_array[i], StoreItemData.prototype);
                }
                for (var i = 0; i < _this.video_store_array.length; i++) {
                    Object.setPrototypeOf(_this.video_store_array[i], StoreItemData.prototype);
                }
                for (var i = 0; i < _this.diamond_store_array.length; i++) {
                    Object.setPrototypeOf(_this.diamond_store_array[i], StoreItemData.prototype);
                }
                if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE] &&
                    GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE].buildLvl > 0 &&
                    _this.refresh_time <= Math.floor(Date.now() / 1000)) {
                    _this.refresh_store();
                }
            }
            else {
                _this.is_init = true;
            }
            callback && callback(data);
        });
    };
    // @
    StoreData.prototype.updateStore = function (id, count) {
        for (var i = 0; i < this.store_array.length; i++) {
            if (id === this.store_array[i].id) {
                this.store_array[i].count++;
                return;
            }
        }
        var item = new StoreItemData();
        item.id = id;
        item.count = count;
        this.store_array.push(item);
        this.async_write_data();
    };
    // @
    StoreData.prototype.updateDailyStore = function (id, count) {
        for (var i = 0; i < this.daily_store_array.length; i++) {
            if (id === this.daily_store_array[i].id) {
                this.daily_store_array[i].count++;
                return;
            }
        }
        var item = new StoreItemData();
        item.id = id;
        item.count = count;
        this.daily_store_array.push(item);
        this.async_write_data();
    };
    // @
    StoreData.prototype.updateVideoStore = function (id, count, videoCount) {
        for (var i = 0; i < this.video_store_array.length; i++) {
            if (id === this.video_store_array[i].id) {
                this.video_store_array[i].count += count;
                this.video_store_array[i].video_count = videoCount === 0 ? 0 : this.video_store_array[i].video_count + videoCount;
                return;
            }
        }
        var item = new StoreItemData();
        item.id = id;
        item.count = count;
        item.video_count = videoCount;
        this.video_store_array.push(item);
        this.async_write_data();
    };
    // @
    StoreData.prototype.updateDiamondStore = function (id, count) {
        for (var i = 0; i < this.diamond_store_array.length; i++) {
            if (id === this.diamond_store_array[i].id) {
                this.diamond_store_array[i].count++;
                return;
            }
        }
        var item = new StoreItemData();
        item.id = id;
        item.count = count;
        this.diamond_store_array.push(item);
        this.async_write_data();
    };
    // @
    StoreData.prototype.getStoreCount = function (id) {
        for (var i = 0; i < this.store_array.length; i++) {
            if (id === this.store_array[i].id) {
                return this.store_array[i].count;
            }
        }
        return 0;
    };
    // @
    StoreData.prototype.getDailyStoreCount = function (id) {
        for (var i = 0; i < this.daily_store_array.length; i++) {
            if (id === this.daily_store_array[i].id) {
                return this.daily_store_array[i].count;
            }
        }
        return 0;
    };
    // @
    StoreData.prototype.getVideoStoreCount = function (id) {
        for (var i = 0; i < this.video_store_array.length; i++) {
            if (id === this.video_store_array[i].id) {
                return this.video_store_array[i].count;
            }
        }
        return 0;
    };
    // @
    StoreData.prototype.getVideoCount = function (id) {
        for (var i = 0; i < this.video_store_array.length; i++) {
            if (id === this.video_store_array[i].id) {
                return this.video_store_array[i].video_count;
            }
        }
        return 0;
    };
    // @
    StoreData.prototype.getDimondStoreCount = function (id) {
        for (var i = 0; i < this.diamond_store_array.length; i++) {
            if (id === this.diamond_store_array[i].id) {
                return this.diamond_store_array[i].count;
            }
        }
        return 0;
    };
    // @ !!! any
    StoreData.prototype.refreshStoreId = function (data, shopType) {
        var ids = [];
        for (var i = 0; i < data.length; ++i) {
            if (data[i].shop_type === shopType) {
                if (!ids.includes(data[i].shop_id))
                    ids.push(data[i].shop_id);
            }
        }
        return ids;
    };
    // @
    StoreData.prototype.refresh_store = function () {
        this.isFree = true;
        GameManager_1.gm.ui.emit("refresh_red_tips_stall");
        this.refresh_time = Math.floor(Date.now() / 1000) + GameManager_1.gm.const.STORE_REFRESH_TIME;
        this.store_array.splice(0, this.store_array.length);
        this.daily_store_array.splice(0, this.daily_store_array.length);
        this.video_store_array.splice(0, this.video_store_array.length);
        this.diamond_store_array.splice(0, this.diamond_store_array.length);
        //
        var towerData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.TOWER_TYPE];
        var availableItems = [];
        var shopConfig = GameManager_1.gm.config.get_config_data("ShopConfigData");
        for (var key in shopConfig.data) {
            var item = shopConfig.data[key];
            if (item.lv === towerData.buildLvl) {
                availableItems.push(item);
            }
        }
        //
        var randHalf = Math.random() < 0.5;
        var randIdsType1 = this.refreshStoreId(availableItems, randHalf ? 1 : 2);
        var randIdsType2 = this.refreshStoreId(availableItems, randHalf ? 2 : 1);
        //
        var item01 = new StoreItemData();
        item01.id = randIdsType1[Math.floor(Math.random() * randIdsType1.length)],
            item01.count = 0;
        item01.index = 0;
        this.store_array.push(item01);
        //
        var item02 = new StoreItemData();
        item02.id = randIdsType2[Math.floor(Math.random() * randIdsType2.length)];
        item02.count = 0;
        item02.index = 1;
        this.store_array.push(item02);
        //
        for (var i = 3; i <= 6; ++i) {
            var ids = this.refreshStoreId(availableItems, i);
            if (ids.length > 0) {
                var newItem = new StoreItemData();
                newItem.id = ids[Math.floor(Math.random() * ids.length)];
                newItem.count = 0;
                newItem.index = i - 1;
                this.store_array.push(newItem);
            }
        }
        //
        var specialIds = this.refreshStoreId(availableItems, 101);
        var dailyItem = new StoreItemData();
        dailyItem.id = specialIds[Math.floor(Math.random() * specialIds.length)];
        dailyItem.count = 0;
        dailyItem.index = 0;
        this.daily_store_array.push(dailyItem);
        //
        var uniqueTypes = [];
        for (var i = 0; i < availableItems.length; ++i) {
            if (availableItems[i].shop_type > 150 && availableItems[i].shop_type < 200) {
                if (!uniqueTypes.includes(availableItems[i].shop_type)) {
                    uniqueTypes.push(availableItems[i].shop_type);
                }
            }
        }
        var selectedTypes = [];
        for (var i = 0; i < 3; ++i) {
            var randomIndex = Math.floor(Math.random() * uniqueTypes.length);
            selectedTypes.push(uniqueTypes[randomIndex]);
            uniqueTypes.splice(randomIndex, 1);
        }
        //
        for (var i = 0; i < 3; ++i) {
            var ids = this.refreshStoreId(availableItems, selectedTypes[i]);
            var newItem = new StoreItemData();
            newItem.id = ids[Math.floor(Math.random() * ids.length)];
            newItem.count = 0;
            newItem.index = i + 1;
            this.daily_store_array.push(newItem);
        }
        //
        for (var i = 200; i <= 203; ++i) {
            var ids = this.refreshStoreId(availableItems, i);
            var newItem = new StoreItemData();
            newItem.id = ids[Math.floor(Math.random() * ids.length)];
            newItem.count = 0;
            newItem.index = i - 200;
            this.video_store_array.push(newItem);
        }
        //
        for (var i = 300; i <= 303; ++i) {
            var ids = this.refreshStoreId(availableItems, i);
            var newItem = new StoreItemData();
            newItem.id = ids[Math.floor(Math.random() * ids.length)];
            newItem.count = 0;
            newItem.index = i - 300;
            this.diamond_store_array.push(newItem);
        }
        //
        this.async_write_data();
    }; // end: refresh_store
    // @
    StoreData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(StoreData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    StoreData.EVENT_DATA_CHANGE = "store_data_change";
    StoreData.STORE_STATE_CHANGE = "store_state_change";
    return StoreData;
}(StorageBase_1.StorageBase));
exports.StoreData = StoreData;

cc._RF.pop();