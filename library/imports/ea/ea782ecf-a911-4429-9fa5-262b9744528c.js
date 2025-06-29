"use strict";
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