
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/special_build/scripts/StoreItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea7827PqRFEKZ+lJiuXRFKM', 'StoreItem');
// special_build/scripts/StoreItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreItem = /** @class */ (function (_super) {
    __extends(StoreItem, _super);
    function StoreItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_add = null;
        _this.btn_free = null;
        _this.btn_sold = null;
        _this.price_lbl = null;
        _this.count_lbl = null;
        _this.icon_sprite = null;
        _this.cost_sprite = null;
        _this.lvl_sprite = null;
        _this.item_count_lbl = null;
        return _this;
    }
    Object.defineProperty(StoreItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    StoreItem.prototype.update_view = function () {
        var _this = this;
        this.node.active = false;
        this.scheduleOnce(function () {
            _this.node.active = true;
        }, 0.1 * this._data.index);
        var rowData = GameManager_1.gm.config.get_row_data("ShopConfigData", this._data.id.toString());
        this.item_count_lbl.string = "";
        if (rowData.item_num > 1) {
            this.item_count_lbl.string = "x" + rowData.item_num;
        }
        if (rowData.item_id > 30000) {
            var itemData = GameManager_1.gm.config.get_row_data("HeroConfigData", rowData.item_id.toString());
            this.lvl_sprite.node.active = true;
            Utils_1.Utils.async_set_sprite_frame(this.lvl_sprite, Constants_1.BundleName.SPECIAL_BUILD, "res/" + itemData.lv);
            Utils_1.Utils.async_set_sprite_frame(this.icon_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + itemData.icon);
        }
        else {
            var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", rowData.item_id.toString());
            Utils_1.Utils.async_set_sprite_frame(this.icon_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + itemConfig.icon);
            this.lvl_sprite.node.active = false;
        }
        var storeCount = rowData.shop_type < 100 ? GameManager_1.gm.data.store_data.getStoreCount(rowData.shop_id) : GameManager_1.gm.data.store_data.getDailyStoreCount(rowData.shop_id);
        this.count_lbl.string = rowData.limit_num - storeCount + "/" + rowData.limit_num;
        if (storeCount >= rowData.limit_num) {
            this.btn_sold.active = true;
            this.btn_free.node.active = false;
            this.btn_add.node.active = false;
        }
        else {
            this.btn_sold.active = false;
            if (rowData.money_type > 0) {
                this.btn_free.node.active = false;
                this.btn_add.node.active = true;
                this.price_lbl.string = rowData.price.toString();
                var moneyConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", rowData.money_type.toString());
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + moneyConfig.icon);
            }
            else {
                this.btn_free.node.active = true;
                this.btn_add.node.active = false;
            }
        }
    };
    StoreItem.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
    };
    StoreItem.prototype.onClick = function () {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            var rowData = GameManager_1.gm.config.get_row_data("ShopConfigData", this._data.id.toString());
            var storeCount = rowData.shop_type < 100 ? GameManager_1.gm.data.store_data.getStoreCount(rowData.shop_id) : GameManager_1.gm.data.store_data.getDailyStoreCount(rowData.shop_id);
            if (storeCount >= rowData.limit_num) {
                GameManager_1.gm.ui.show_notice("Sản phẩm đã bán hết. Bạn có thể mua lại sau khi làm mới.");
            }
            else {
                var moneyType = "";
                var audioEffectId1 = 0;
                var audioEffectId2 = 0;
                if (rowData.money_type > 0) {
                    if (GameManager_1.gm.data.mapCell_data.getMertrailIDCount(rowData.money_type) < rowData.price) {
                        GameManager_1.gm.ui.show_notice("Vật liệu không đủ!!!");
                        return;
                    }
                    GameManager_1.gm.data.mapCell_data.delCellItem(rowData.money_type, rowData.price);
                    switch (rowData.money_type) {
                        case Constants_1.RewardIdEnum.WOOD:
                            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_13_WOOD_BUY_ITEM);
                            moneyType = "木材";
                            audioEffectId1 = 10815;
                            audioEffectId2 = 10816;
                            break;
                        case Constants_1.RewardIdEnum.GOLD:
                            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_16_BUY_ITEM);
                            moneyType = "金币";
                            audioEffectId1 = 10813;
                            audioEffectId2 = 10814;
                            break;
                        case Constants_1.RewardIdEnum.IRON:
                            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_16_BUY_ITEM);
                            moneyType = "铁矿";
                            audioEffectId1 = 10817;
                            audioEffectId2 = 10818;
                            break;
                        case Constants_1.RewardIdEnum.DIAMOND:
                            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_14_DIAMOND_BUY_ITEM);
                            moneyType = "钻石";
                            audioEffectId1 = 10811;
                            audioEffectId2 = 10812;
                            break;
                        default:
                            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_16_BUY_ITEM);
                            break;
                    }
                }
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(rowData.item_id);
                if (itemConfig) {
                    GameManager_1.gm.channel.report_event("store_buy_item", {
                        event_desc: "货摊购买道具",
                        money: moneyType,
                        item_index: this._data.index,
                        item_name: itemConfig.name,
                        desc: cc.js.formatStr("货摊购买道具%s", itemConfig.name)
                    });
                    if (audioEffectId1 > 0) {
                        NetUtils_1.ReportData.instance.report_once_point(audioEffectId1);
                    }
                    if (audioEffectId2 > 0) {
                        NetUtils_1.ReportData.instance.report_point(audioEffectId2);
                    }
                }
                GameManager_1.gm.data.mapCell_data.addItem(rowData.item_id, rowData.item_num);
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                    idList: [rowData.item_id],
                    numList: [rowData.item_num]
                });
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                if (rowData.shop_type < 100) {
                    GameManager_1.gm.data.store_data.updateStore(rowData.shop_id, 1);
                }
                else {
                    GameManager_1.gm.data.store_data.updateDailyStore(rowData.shop_id, 1);
                }
                this.update_view();
            }
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    __decorate([
        property(cc.Button)
    ], StoreItem.prototype, "btn_add", void 0);
    __decorate([
        property(cc.Button)
    ], StoreItem.prototype, "btn_free", void 0);
    __decorate([
        property(cc.Node)
    ], StoreItem.prototype, "btn_sold", void 0);
    __decorate([
        property(cc.Label)
    ], StoreItem.prototype, "price_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], StoreItem.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoreItem.prototype, "icon_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoreItem.prototype, "cost_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoreItem.prototype, "lvl_sprite", void 0);
    __decorate([
        property(cc.Label)
    ], StoreItem.prototype, "item_count_lbl", void 0);
    StoreItem = __decorate([
        ccclass
    ], StoreItem);
    return StoreItem;
}(ListViewItem_1.ListViewItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3BlY2lhbF9idWlsZFxcc2NyaXB0c1xcU3RvcmVJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUErRTtBQUMvRSxxRUFBMkQ7QUFDM0QsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCwrREFBZ0U7QUFLMUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0IsNkJBQVk7SUFBcEM7UUFBQSxxRUEyS0M7UUF6S1csYUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDOztJQWlKNUMsQ0FBQztJQTdJRyxzQkFBVywyQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFvQztZQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSwrQkFBVyxHQUFsQjtRQUFBLGlCQTRDQztRQTNDRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxL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QyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDaUI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDcUI7SUExQnRDLFNBQVM7UUFEZCxPQUFPO09BQ0YsU0FBUyxDQTJLZDtJQUFELGdCQUFDO0NBM0tELEFBMktDLENBM0t1QiwyQkFBWSxHQTJLbkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdW5kbGVOYW1lLCBSZXdhcmRJZEVudW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBTaG9wQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3Mvc2hvcCc7XHJcbmltcG9ydCB7IEl0ZW1Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9pdGVtJztcclxuaW1wb3J0IHsgSGVyb0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2hlcm8nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFN0b3JlSXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBidG5fYWRkOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJ0bl9mcmVlOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5fc29sZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBwcmljZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGNvdW50X2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGljb25fc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGNvc3Rfc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGx2bF9zcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBpdGVtX2NvdW50X2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBfZGF0YTogeyBpZDogbnVtYmVyLCBpbmRleDogbnVtYmVyIH07XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IHsgaWQ6IG51bWJlciwgaW5kZXg6IG51bWJlciB9IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IHsgaWQ6IG51bWJlciwgaW5kZXg6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMC4xICogdGhpcy5fZGF0YS5pbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2hvcENvbmZpZ0RhdGFcIiwgdGhpcy5fZGF0YS5pZC50b1N0cmluZygpKSBhcyBTaG9wQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuaXRlbV9jb3VudF9sYmwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAocm93RGF0YS5pdGVtX251bSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtX2NvdW50X2xibC5zdHJpbmcgPSBcInhcIiArIHJvd0RhdGEuaXRlbV9udW07XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHJvd0RhdGEuaXRlbV9pZCA+IDMwMDAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIHJvd0RhdGEuaXRlbV9pZC50b1N0cmluZygpKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLmx2bF9zcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubHZsX3Nwcml0ZSwgQnVuZGxlTmFtZS5TUEVDSUFMX0JVSUxELCBcInJlcy9cIiArIGl0ZW1EYXRhLmx2KTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmljb25fc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBpdGVtRGF0YS5pY29uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIHJvd0RhdGEuaXRlbV9pZC50b1N0cmluZygpKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaWNvbl9zcHJpdGUsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGl0ZW1Db25maWcuaWNvbik7XHJcbiAgICAgICAgICAgIHRoaXMubHZsX3Nwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RvcmVDb3VudCA9IHJvd0RhdGEuc2hvcF90eXBlIDwgMTAwID8gZ20uZGF0YS5zdG9yZV9kYXRhLmdldFN0b3JlQ291bnQocm93RGF0YS5zaG9wX2lkKSA6IGdtLmRhdGEuc3RvcmVfZGF0YS5nZXREYWlseVN0b3JlQ291bnQocm93RGF0YS5zaG9wX2lkKTtcclxuICAgICAgICB0aGlzLmNvdW50X2xibC5zdHJpbmcgPSByb3dEYXRhLmxpbWl0X251bSAtIHN0b3JlQ291bnQgKyBcIi9cIiArIHJvd0RhdGEubGltaXRfbnVtO1xyXG5cclxuICAgICAgICBpZiAoc3RvcmVDb3VudCA+PSByb3dEYXRhLmxpbWl0X251bSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9zb2xkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5fYWRkLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idG5fc29sZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHJvd0RhdGEubW9uZXlfdHlwZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX2FkZC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2xibC5zdHJpbmcgPSByb3dEYXRhLnByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb25leUNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJJdGVtQ29uZmlnRGF0YVwiLCByb3dEYXRhLm1vbmV5X3R5cGUudG9TdHJpbmcoKSkgYXMgSXRlbUNvbmZpZztcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5jb3N0X3Nwcml0ZSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgbW9uZXlDb25maWcuaWNvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9mcmVlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX2FkZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc0hhdmVTcGVjZUNlbGxJRCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2hvcENvbmZpZ0RhdGFcIiwgdGhpcy5fZGF0YS5pZC50b1N0cmluZygpKSBhcyBTaG9wQ29uZmlnO1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yZUNvdW50ID0gcm93RGF0YS5zaG9wX3R5cGUgPCAxMDAgPyBnbS5kYXRhLnN0b3JlX2RhdGEuZ2V0U3RvcmVDb3VudChyb3dEYXRhLnNob3BfaWQpIDogZ20uZGF0YS5zdG9yZV9kYXRhLmdldERhaWx5U3RvcmVDb3VudChyb3dEYXRhLnNob3BfaWQpO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmVDb3VudCA+PSByb3dEYXRhLmxpbWl0X251bSkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJT4bqjbiBwaOG6qW0gxJHDoyBiw6FuIGjhur90LiBC4bqhbiBjw7MgdGjhu4MgbXVhIGzhuqFpIHNhdSBraGkgbMOgbSBt4bubaS5cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uZXlUeXBlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCBhdWRpb0VmZmVjdElkMSA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXVkaW9FZmZlY3RJZDIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyb3dEYXRhLm1vbmV5X3R5cGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldE1lcnRyYWlsSURDb3VudChyb3dEYXRhLm1vbmV5X3R5cGUpIDwgcm93RGF0YS5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlbhuq10IGxp4buHdSBraMO0bmcgxJHhu6chISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuZGVsQ2VsbEl0ZW0ocm93RGF0YS5tb25leV90eXBlLCByb3dEYXRhLnByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvd0RhdGEubW9uZXlfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJld2FyZElkRW51bS5XT09EOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTNfV09PRF9CVVlfSVRFTSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25leVR5cGUgPSBcIuacqOadkFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW9FZmZlY3RJZDEgPSAxMDgxNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvRWZmZWN0SWQyID0gMTA4MTY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZXdhcmRJZEVudW0uR09MRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzE2X0JVWV9JVEVNKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbmV5VHlwZSA9IFwi6YeR5biBXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpb0VmZmVjdElkMSA9IDEwODEzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW9FZmZlY3RJZDIgPSAxMDgxNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJld2FyZElkRW51bS5JUk9OOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTZfQlVZX0lURU0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uZXlUeXBlID0gXCLpk4Hnn79cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvRWZmZWN0SWQxID0gMTA4MTc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpb0VmZmVjdElkMiA9IDEwODE4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmV3YXJkSWRFbnVtLkRJQU1PTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xNF9ESUFNT05EX0JVWV9JVEVNKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbmV5VHlwZSA9IFwi6ZK755+zXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpb0VmZmVjdElkMSA9IDEwODExO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW9FZmZlY3RJZDIgPSAxMDgxMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTZfQlVZX0lURU0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHJvd0RhdGEuaXRlbV9pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwic3RvcmVfYnV5X2l0ZW1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIui0p+aRiui0reS5sOmBk+WFt1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25leTogbW9uZXlUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtX2luZGV4OiB0aGlzLl9kYXRhLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtX25hbWU6IGl0ZW1Db25maWcubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwi6LSn5pGK6LSt5Lmw6YGT5YW3JXNcIiwgaXRlbUNvbmZpZy5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdWRpb0VmZmVjdElkMSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludChhdWRpb0VmZmVjdElkMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdWRpb0VmZmVjdElkMiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoYXVkaW9FZmZlY3RJZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRJdGVtKHJvd0RhdGEuaXRlbV9pZCwgcm93RGF0YS5pdGVtX251bSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRMaXN0OiBbcm93RGF0YS5pdGVtX2lkXSxcclxuICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiBbcm93RGF0YS5pdGVtX251bV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5zdG9yZV9kYXRhLnVwZGF0ZVN0b3JlKHJvd0RhdGEuc2hvcF9pZCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuc3RvcmVfZGF0YS51cGRhdGVEYWlseVN0b3JlKHJvd0RhdGEuc2hvcF9pZCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X2F1dG9fbWVyZ2VfbWVzc2FnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==