
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/StoreData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN0b3JlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLDZDQUFtQztBQUNuQyx5Q0FBNEM7QUFJNUMsSUFBSTtBQUNKO0lBQUE7UUFDSSxPQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixVQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFBRCxvQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksc0NBQWE7QUFPMUIsSUFBSTtBQUNKO0lBQStCLDZCQUFXO0lBQTFDO1FBQUEscUVBNFFDO1FBelFHLEVBQUU7UUFDSyxpQkFBVyxHQUFXLFdBQVcsQ0FBQztRQUNsQyxrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixpQkFBVyxHQUFvQixFQUFFLENBQUM7UUFDbEMsdUJBQWlCLEdBQW9CLEVBQUUsQ0FBQztRQUN4Qyx1QkFBaUIsR0FBb0IsRUFBRSxDQUFDO1FBQ3hDLHlCQUFtQixHQUFvQixFQUFFLENBQUM7UUFDMUMsWUFBTSxHQUFZLElBQUksQ0FBQzs7SUFrUWxDLENBQUM7SUFoUUcsSUFBSTtJQUNHLG1DQUFlLEdBQXRCLFVBQXVCLFFBQThCO1FBQXJELGlCQXlCQztRQXhCRyxpQkFBTSxlQUFlLFlBQUMsVUFBQyxJQUFJO1lBQ3ZCLElBQUksS0FBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3ZFO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzdFO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzdFO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9FO2dCQUNELElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyx5QkFBYSxDQUFDLFVBQVUsQ0FBQztvQkFDeEQsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyx5QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDO29CQUNyRSxLQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO29CQUNwRCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3hCO2FBQ0o7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7SUFDRywrQkFBVyxHQUFsQixVQUFtQixFQUFVLEVBQUUsS0FBYTtRQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLE9BQU87YUFDVjtTQUNKO1FBQ0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJO0lBQ0csb0NBQWdCLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxLQUFhO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEMsT0FBTzthQUNWO1NBQ0o7UUFDRCxJQUFNLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSTtJQUNHLG9DQUFnQixHQUF2QixVQUF3QixFQUFVLEVBQUUsS0FBYSxFQUFFLFVBQWtCO1FBQ2pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQ2xILE9BQU87YUFDVjtTQUNKO1FBQ0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUk7SUFDRyxzQ0FBa0IsR0FBekIsVUFBMEIsRUFBVSxFQUFFLEtBQWE7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNwQyxPQUFPO2FBQ1Y7U0FDSjtRQUNELElBQU0sSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJO0lBQ0csaUNBQWEsR0FBcEIsVUFBcUIsRUFBVTtRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDcEM7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUk7SUFDRyxzQ0FBa0IsR0FBekIsVUFBMEIsRUFBVTtRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDMUM7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUk7SUFDRyxzQ0FBa0IsR0FBekIsVUFBMEIsRUFBVTtRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDMUM7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUk7SUFDSSxpQ0FBYSxHQUFyQixVQUFzQixFQUFVO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzthQUNoRDtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsSUFBSTtJQUNHLHVDQUFtQixHQUExQixVQUEyQixFQUFVO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUM1QztTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsWUFBWTtJQUNKLGtDQUFjLEdBQXRCLFVBQXVCLElBQWtCLEVBQUUsUUFBZ0I7UUFDdkQsSUFBTSxHQUFHLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakU7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUk7SUFDRyxpQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7UUFDaEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEUsRUFBRTtRQUNGLElBQU0sU0FBUyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRSxJQUFNLGNBQWMsR0FBaUIsRUFBRSxDQUFDO1FBQ3hDLElBQU0sVUFBVSxHQUFXLGdCQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZFLEtBQUssSUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtZQUMvQixJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBZSxDQUFDO1lBQ2hELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUNoQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7UUFDRCxFQUFFO1FBQ0YsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLEVBQUU7UUFDRixJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixFQUFFO1FBQ0YsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixFQUFFO1FBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN6QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixJQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekQsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbEM7U0FDSjtRQUNELEVBQUU7UUFDRixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxJQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsRUFBRTtRQUNGLElBQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM1QyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO2dCQUN4RSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3BELFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNqRDthQUNKO1NBQ0o7UUFDRCxJQUFNLGFBQWEsR0FBYSxFQUFFLENBQUM7UUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN4QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELEVBQUU7UUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQU0sT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDcEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekQsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7UUFDRCxFQUFFO1FBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM3QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsRUFBRTtRQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDN0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNwQyxPQUFPLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQztRQUNELEVBQUU7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDLEVBQUMscUJBQXFCO0lBRXZCLElBQUk7SUFDRyxvQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBcUI7UUFDekMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4RCxpQkFBTSxnQkFBZ0IsWUFBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBMVFhLDJCQUFpQixHQUFXLG1CQUFtQixDQUFDO0lBQ2hELDRCQUFrQixHQUFXLG9CQUFvQixDQUFDO0lBMFFwRSxnQkFBQztDQTVRRCxBQTRRQyxDQTVROEIseUJBQVcsR0E0UXpDO0FBNVFZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUJhc2UgfSBmcm9tICcuL1N0b3JhZ2VCYXNlJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9Db25maWdNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2hvcENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL3Nob3AnO1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgU3RvcmVJdGVtRGF0YSB7XHJcbiAgICBpZDogbnVtYmVyID0gMDtcclxuICAgIGNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgdmlkZW9fY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBpbmRleDogbnVtYmVyID0gMDtcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgU3RvcmVEYXRhIGV4dGVuZHMgU3RvcmFnZUJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9EQVRBX0NIQU5HRTogc3RyaW5nID0gXCJzdG9yZV9kYXRhX2NoYW5nZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVE9SRV9TVEFURV9DSEFOR0U6IHN0cmluZyA9IFwic3RvcmVfc3RhdGVfY2hhbmdlXCI7XHJcbiAgICAvL1xyXG4gICAgcHVibGljIFNUT1JBR0VfS0VZOiBzdHJpbmcgPSBcIlN0b3JlRGF0YVwiO1xyXG4gICAgcHVibGljIHJlZnJlc2hfdGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdG9yZV9hcnJheTogU3RvcmVJdGVtRGF0YVtdID0gW107XHJcbiAgICBwdWJsaWMgZGFpbHlfc3RvcmVfYXJyYXk6IFN0b3JlSXRlbURhdGFbXSA9IFtdO1xyXG4gICAgcHVibGljIHZpZGVvX3N0b3JlX2FycmF5OiBTdG9yZUl0ZW1EYXRhW10gPSBbXTtcclxuICAgIHB1YmxpYyBkaWFtb25kX3N0b3JlX2FycmF5OiBTdG9yZUl0ZW1EYXRhW10gPSBbXTtcclxuICAgIHB1YmxpYyBpc0ZyZWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhc3luY19yZWFkX2RhdGEoY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfcmVhZF9kYXRhKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX2luaXQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdG9yZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLnN0b3JlX2FycmF5W2ldLCBTdG9yZUl0ZW1EYXRhLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGFpbHlfc3RvcmVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcy5kYWlseV9zdG9yZV9hcnJheVtpXSwgU3RvcmVJdGVtRGF0YS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZGVvX3N0b3JlX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMudmlkZW9fc3RvcmVfYXJyYXlbaV0sIFN0b3JlSXRlbURhdGEucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWFtb25kX3N0b3JlX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMuZGlhbW9uZF9zdG9yZV9hcnJheVtpXSwgU3RvcmVJdGVtRGF0YS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLlNUQUxMX1RZUEVdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU1RBTExfVFlQRV0uYnVpbGRMdmwgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoX3RpbWUgPD0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hfc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHVwZGF0ZVN0b3JlKGlkOiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RvcmVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLnN0b3JlX2FycmF5W2ldLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlX2FycmF5W2ldLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBTdG9yZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgaXRlbS5pZCA9IGlkO1xyXG4gICAgICAgIGl0ZW0uY291bnQgPSBjb3VudDtcclxuICAgICAgICB0aGlzLnN0b3JlX2FycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHVwZGF0ZURhaWx5U3RvcmUoaWQ6IG51bWJlciwgY291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYWlseV9zdG9yZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaWQgPT09IHRoaXMuZGFpbHlfc3RvcmVfYXJyYXlbaV0uaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFpbHlfc3RvcmVfYXJyYXlbaV0uY291bnQrKztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtID0gbmV3IFN0b3JlSXRlbURhdGEoKTtcclxuICAgICAgICBpdGVtLmlkID0gaWQ7XHJcbiAgICAgICAgaXRlbS5jb3VudCA9IGNvdW50O1xyXG4gICAgICAgIHRoaXMuZGFpbHlfc3RvcmVfYXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgdXBkYXRlVmlkZW9TdG9yZShpZDogbnVtYmVyLCBjb3VudDogbnVtYmVyLCB2aWRlb0NvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlkZW9fc3RvcmVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLnZpZGVvX3N0b3JlX2FycmF5W2ldLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX3N0b3JlX2FycmF5W2ldLmNvdW50ICs9IGNvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb19zdG9yZV9hcnJheVtpXS52aWRlb19jb3VudCA9IHZpZGVvQ291bnQgPT09IDAgPyAwIDogdGhpcy52aWRlb19zdG9yZV9hcnJheVtpXS52aWRlb19jb3VudCArIHZpZGVvQ291bnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBTdG9yZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgaXRlbS5pZCA9IGlkO1xyXG4gICAgICAgIGl0ZW0uY291bnQgPSBjb3VudDtcclxuICAgICAgICBpdGVtLnZpZGVvX2NvdW50ID0gdmlkZW9Db3VudDtcclxuICAgICAgICB0aGlzLnZpZGVvX3N0b3JlX2FycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHVwZGF0ZURpYW1vbmRTdG9yZShpZDogbnVtYmVyLCBjb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpYW1vbmRfc3RvcmVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLmRpYW1vbmRfc3RvcmVfYXJyYXlbaV0uaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbW9uZF9zdG9yZV9hcnJheVtpXS5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU3RvcmVJdGVtRGF0YSgpO1xyXG4gICAgICAgIGl0ZW0uaWQgPSBpZDtcclxuICAgICAgICBpdGVtLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX3N0b3JlX2FycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldFN0b3JlQ291bnQoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0b3JlX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gdGhpcy5zdG9yZV9hcnJheVtpXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVfYXJyYXlbaV0uY291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldERhaWx5U3RvcmVDb3VudChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGFpbHlfc3RvcmVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLmRhaWx5X3N0b3JlX2FycmF5W2ldLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYWlseV9zdG9yZV9hcnJheVtpXS5jb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0VmlkZW9TdG9yZUNvdW50KGlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aWRlb19zdG9yZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaWQgPT09IHRoaXMudmlkZW9fc3RvcmVfYXJyYXlbaV0uaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZGVvX3N0b3JlX2FycmF5W2ldLmNvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0VmlkZW9Db3VudChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlkZW9fc3RvcmVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLnZpZGVvX3N0b3JlX2FycmF5W2ldLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52aWRlb19zdG9yZV9hcnJheVtpXS52aWRlb19jb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0RGltb25kU3RvcmVDb3VudChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlhbW9uZF9zdG9yZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaWQgPT09IHRoaXMuZGlhbW9uZF9zdG9yZV9hcnJheVtpXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbW9uZF9zdG9yZV9hcnJheVtpXS5jb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAICEhISBhbnlcclxuICAgIHByaXZhdGUgcmVmcmVzaFN0b3JlSWQoZGF0YTogU2hvcENvbmZpZ1tdLCBzaG9wVHlwZTogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IGlkczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFbaV0uc2hvcF90eXBlID09PSBzaG9wVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpZHMuaW5jbHVkZXMoZGF0YVtpXS5zaG9wX2lkKSkgaWRzLnB1c2goZGF0YVtpXS5zaG9wX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyByZWZyZXNoX3N0b3JlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNGcmVlID0gdHJ1ZTtcclxuICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9yZWRfdGlwc19zdGFsbFwiKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hfdGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApICsgZ20uY29uc3QuU1RPUkVfUkVGUkVTSF9USU1FO1xyXG4gICAgICAgIHRoaXMuc3RvcmVfYXJyYXkuc3BsaWNlKDAsIHRoaXMuc3RvcmVfYXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmRhaWx5X3N0b3JlX2FycmF5LnNwbGljZSgwLCB0aGlzLmRhaWx5X3N0b3JlX2FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy52aWRlb19zdG9yZV9hcnJheS5zcGxpY2UoMCwgdGhpcy52aWRlb19zdG9yZV9hcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuZGlhbW9uZF9zdG9yZV9hcnJheS5zcGxpY2UoMCwgdGhpcy5kaWFtb25kX3N0b3JlX2FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBjb25zdCB0b3dlckRhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFXTtcclxuICAgICAgICBjb25zdCBhdmFpbGFibGVJdGVtczogU2hvcENvbmZpZ1tdID0gW107XHJcbiAgICAgICAgY29uc3Qgc2hvcENvbmZpZzogQ29uZmlnID0gZ20uY29uZmlnLmdldF9jb25maWdfZGF0YShcIlNob3BDb25maWdEYXRhXCIpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzaG9wQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNob3BDb25maWcuZGF0YVtrZXldIGFzIFNob3BDb25maWc7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmx2ID09PSB0b3dlckRhdGEuYnVpbGRMdmwpIHtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBjb25zdCByYW5kSGFsZiA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcbiAgICAgICAgY29uc3QgcmFuZElkc1R5cGUxID0gdGhpcy5yZWZyZXNoU3RvcmVJZChhdmFpbGFibGVJdGVtcywgcmFuZEhhbGYgPyAxIDogMik7XHJcbiAgICAgICAgY29uc3QgcmFuZElkc1R5cGUyID0gdGhpcy5yZWZyZXNoU3RvcmVJZChhdmFpbGFibGVJdGVtcywgcmFuZEhhbGYgPyAyIDogMSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBjb25zdCBpdGVtMDEgPSBuZXcgU3RvcmVJdGVtRGF0YSgpO1xyXG4gICAgICAgIGl0ZW0wMS5pZCA9IHJhbmRJZHNUeXBlMVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5kSWRzVHlwZTEubGVuZ3RoKV0sXHJcbiAgICAgICAgICAgIGl0ZW0wMS5jb3VudCA9IDA7XHJcbiAgICAgICAgaXRlbTAxLmluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnN0b3JlX2FycmF5LnB1c2goaXRlbTAxKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGNvbnN0IGl0ZW0wMiA9IG5ldyBTdG9yZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgaXRlbTAyLmlkID0gcmFuZElkc1R5cGUyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJhbmRJZHNUeXBlMi5sZW5ndGgpXTtcclxuICAgICAgICBpdGVtMDIuY291bnQgPSAwO1xyXG4gICAgICAgIGl0ZW0wMi5pbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5zdG9yZV9hcnJheS5wdXNoKGl0ZW0wMik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8PSA2OyArK2kpIHtcclxuICAgICAgICAgICAgY29uc3QgaWRzID0gdGhpcy5yZWZyZXNoU3RvcmVJZChhdmFpbGFibGVJdGVtcywgaSk7XHJcbiAgICAgICAgICAgIGlmIChpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IG5ldyBTdG9yZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtLmlkID0gaWRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGlkcy5sZW5ndGgpXTtcclxuICAgICAgICAgICAgICAgIG5ld0l0ZW0uY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbS5pbmRleCA9IGkgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZV9hcnJheS5wdXNoKG5ld0l0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgY29uc3Qgc3BlY2lhbElkcyA9IHRoaXMucmVmcmVzaFN0b3JlSWQoYXZhaWxhYmxlSXRlbXMsIDEwMSk7XHJcbiAgICAgICAgY29uc3QgZGFpbHlJdGVtID0gbmV3IFN0b3JlSXRlbURhdGEoKTtcclxuICAgICAgICBkYWlseUl0ZW0uaWQgPSBzcGVjaWFsSWRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNwZWNpYWxJZHMubGVuZ3RoKV07XHJcbiAgICAgICAgZGFpbHlJdGVtLmNvdW50ID0gMDtcclxuICAgICAgICBkYWlseUl0ZW0uaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuZGFpbHlfc3RvcmVfYXJyYXkucHVzaChkYWlseUl0ZW0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgY29uc3QgdW5pcXVlVHlwZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdmFpbGFibGVJdGVtcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlSXRlbXNbaV0uc2hvcF90eXBlID4gMTUwICYmIGF2YWlsYWJsZUl0ZW1zW2ldLnNob3BfdHlwZSA8IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVUeXBlcy5pbmNsdWRlcyhhdmFpbGFibGVJdGVtc1tpXS5zaG9wX3R5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlVHlwZXMucHVzaChhdmFpbGFibGVJdGVtc1tpXS5zaG9wX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVHlwZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyArK2kpIHtcclxuICAgICAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmlxdWVUeXBlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFR5cGVzLnB1c2godW5pcXVlVHlwZXNbcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICAgICAgdW5pcXVlVHlwZXMuc3BsaWNlKHJhbmRvbUluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBpZHMgPSB0aGlzLnJlZnJlc2hTdG9yZUlkKGF2YWlsYWJsZUl0ZW1zLCBzZWxlY3RlZFR5cGVzW2ldKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IG5ldyBTdG9yZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIG5ld0l0ZW0uaWQgPSBpZHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaWRzLmxlbmd0aCldO1xyXG4gICAgICAgICAgICBuZXdJdGVtLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgbmV3SXRlbS5pbmRleCA9IGkgKyAxO1xyXG4gICAgICAgICAgICB0aGlzLmRhaWx5X3N0b3JlX2FycmF5LnB1c2gobmV3SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDIwMDsgaSA8PSAyMDM7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBpZHMgPSB0aGlzLnJlZnJlc2hTdG9yZUlkKGF2YWlsYWJsZUl0ZW1zLCBpKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IG5ldyBTdG9yZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIG5ld0l0ZW0uaWQgPSBpZHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaWRzLmxlbmd0aCldO1xyXG4gICAgICAgICAgICBuZXdJdGVtLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgbmV3SXRlbS5pbmRleCA9IGkgLSAyMDA7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9fc3RvcmVfYXJyYXkucHVzaChuZXdJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBmb3IgKGxldCBpID0gMzAwOyBpIDw9IDMwMzsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkcyA9IHRoaXMucmVmcmVzaFN0b3JlSWQoYXZhaWxhYmxlSXRlbXMsIGkpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gbmV3IFN0b3JlSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgbmV3SXRlbS5pZCA9IGlkc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpZHMubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIG5ld0l0ZW0uY291bnQgPSAwO1xyXG4gICAgICAgICAgICBuZXdJdGVtLmluZGV4ID0gaSAtIDMwMDtcclxuICAgICAgICAgICAgdGhpcy5kaWFtb25kX3N0b3JlX2FycmF5LnB1c2gobmV3SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9IC8vIGVuZDogcmVmcmVzaF9zdG9yZVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhc3luY193cml0ZV9kYXRhKGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFN0b3JlRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSk7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuIl19