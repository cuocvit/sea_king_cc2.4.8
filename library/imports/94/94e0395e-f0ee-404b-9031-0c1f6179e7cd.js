"use strict";
cc._RF.push(module, '94e03le8O5AS5AxDB9heefN', 'StoreDaily');
// special_build/scripts/StoreDaily.ts

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
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreDaily = /** @class */ (function (_super) {
    __extends(StoreDaily, _super);
    function StoreDaily() {
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
    Object.defineProperty(StoreDaily.prototype, "data", {
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
    StoreDaily.prototype.update_view = function () {
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
        var itemData;
        if (rowData.item_id > 30000) {
            itemData = GameManager_1.gm.config.get_row_data("HeroConfigData", rowData.item_id.toString());
            this.lvl_sprite.node.active = true;
            Utils_1.Utils.async_set_sprite_frame(this.lvl_sprite, Constants_1.BundleName.SPECIAL_BUILD, "res/" + itemData.lv);
            Utils_1.Utils.async_set_sprite_frame(this.icon_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + itemData.icon);
        }
        else {
            itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", rowData.item_id.toString());
            Utils_1.Utils.async_set_sprite_frame(this.icon_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + itemData.icon);
            this.lvl_sprite.node.active = false;
        }
        var count = 0;
        if (rowData.shop_type < 100) {
            count = GameManager_1.gm.data.store_data.getStoreCount(rowData.shop_id);
        }
        else if (rowData.shop_type < 200) {
            count = GameManager_1.gm.data.store_data.getDailyStoreCount(rowData.shop_id);
        }
        else if (rowData.shop_type < 300) {
            count = GameManager_1.gm.data.store_data.getVideoStoreCount(rowData.shop_id);
        }
        else if (rowData.shop_type < 400) {
            count = GameManager_1.gm.data.store_data.getDimondStoreCount(rowData.shop_id);
        }
        this.count_lbl.string = rowData.limit_num - count + "/" + rowData.limit_num;
        if (count >= rowData.limit_num) {
            this.btn_sold.active = true;
            this.btn_free.node.active = false;
            this.btn_add.node.active = false;
            if (rowData.money_type > 0 && rowData.money_type === 1) {
                GameManager_1.gm.channel.report_event("ohayoo_game_button_show", {
                    ad_type: "激励视频",
                    rit_id: "946114114",
                    ad_position: "商店_获得道具",
                    ad_position_type: "商店"
                });
            }
        }
        else {
            this.btn_sold.active = false;
            if (rowData.money_type > 0) {
                this.btn_free.node.active = false;
                this.btn_add.node.active = true;
                this.price_lbl.string = rowData.price.toString();
                this.cost_sprite.node.color = cc.Color.WHITE;
                this.cost_sprite.node.height = 50;
                this.cost_sprite.node.width = 50;
                this.price_lbl.node.getComponent(cc.LabelOutline).enabled = true;
                this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#FFDA58");
                this.price_lbl.node.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#7D2713");
                if (rowData.money_type === 1) {
                    this.price_lbl.string = "Miễn phí";
                    this.cost_sprite.node.color = cc.Color.BLACK.fromHEX("#253D45");
                    this.cost_sprite.node.width = 40;
                    this.cost_sprite.node.height = 30;
                    this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#1C3F00");
                    this.price_lbl.node.getComponent(cc.LabelOutline).enabled = false;
                    this.price_lbl.node.position = new cc.Vec3(5, 8, 0);
                    this.price_lbl.fontSize = 27;
                    Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/video_" + rowData.money_type);
                }
                else {
                    Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + rowData.money_type);
                }
            }
            else {
                this.btn_free.node.active = true;
                this.btn_add.node.active = false;
            }
        }
    };
    StoreDaily.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
    };
    StoreDaily.prototype.watchAdSucc = function () {
        if (this._data) {
            NetUtils_1.ReportData.instance.report_once_point(10625);
            NetUtils_1.ReportData.instance.report_point(10626);
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_12_BUY_SUCCESS);
            var rowData = GameManager_1.gm.config.get_row_data("ShopConfigData", this._data.id.toString());
            for (var i = 0; i < GameManager_1.gm.data.store_data.video_store_array.length; i++) {
                if (rowData.shop_id === GameManager_1.gm.data.store_data.video_store_array[i].id) {
                    GameManager_1.gm.data.mapCell_data.addItem(rowData.item_id, rowData.item_num);
                    GameManager_1.gm.data.store_data.updateVideoStore(rowData.shop_id, 1, 0);
                    GameManager_1.gm.data.store_data.async_write_data();
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                        idList: [rowData.item_id],
                        numList: [rowData.item_num]
                    });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                    break;
                }
            }
            this.update_view();
        }
    };
    StoreDaily.prototype.onClick = function () {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            var rowData = GameManager_1.gm.config.get_row_data("ShopConfigData", this._data.id.toString());
            var count = 0;
            if (rowData.shop_type < 100) {
                count = GameManager_1.gm.data.store_data.getStoreCount(rowData.shop_id);
            }
            else if (rowData.shop_type < 200) {
                count = GameManager_1.gm.data.store_data.getDailyStoreCount(rowData.shop_id);
            }
            else if (rowData.shop_type < 300) {
                count = GameManager_1.gm.data.store_data.getVideoStoreCount(rowData.shop_id);
            }
            else if (rowData.shop_type < 400) {
                count = GameManager_1.gm.data.store_data.getDimondStoreCount(rowData.shop_id);
            }
            if (count >= rowData.limit_num) {
                GameManager_1.gm.ui.show_notice("Sản phẩm đã bán hết. Bạn có thể mua lại sau khi làm mới.");
            }
            else {
                if (rowData.money_type > 0) {
                    if (rowData.money_type === 1) {
                        NetUtils_1.ReportData.instance.report_once_point(10525);
                        NetUtils_1.ReportData.instance.report_point(10526);
                        GameManager_1.gm.channel.report_event("ohayoo_game_button_click", {
                            ad_type: "激励视频",
                            rit_id: "946114114",
                            ad_position: "商店_获得道具",
                            ad_position_type: "商店"
                        });
                        GameManager_1.gm.channel.show_video_ad(this.watchAdSucc, this, {
                            ad_position: "商店_获得道具",
                            ad_position_type: "商店"
                        });
                        return;
                    }
                    if (GameManager_1.gm.data.mapCell_data.getMertrailIDCount(rowData.money_type) < rowData.price) {
                        GameManager_1.gm.ui.show_notice("Vật liệu không đủ");
                        return;
                    }
                    GameManager_1.gm.data.mapCell_data.delCellItem(rowData.money_type, rowData.price);
                    if (rowData.money_type === Constants_1.RewardIdEnum.WOOD) {
                        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_13_WOOD_BUY_ITEM);
                    }
                    else if (rowData.money_type === Constants_1.RewardIdEnum.DIAMOND) {
                        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_14_DIAMOND_BUY_ITEM);
                    }
                    else {
                        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_16_BUY_ITEM);
                    }
                }
                else {
                    GameManager_1.gm.data.store_data.isFree = false;
                    GameManager_1.gm.ui.emit("refresh_red_tips_stall");
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
                else if (rowData.shop_type < 200) {
                    GameManager_1.gm.data.store_data.updateDailyStore(rowData.shop_id, 1);
                }
                else if (rowData.shop_type < 300 || rowData.shop_type < 400) {
                    GameManager_1.gm.data.store_data.updateDiamondStore(rowData.shop_id, 1);
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
    ], StoreDaily.prototype, "btn_add", void 0);
    __decorate([
        property(cc.Button)
    ], StoreDaily.prototype, "btn_free", void 0);
    __decorate([
        property(cc.Node)
    ], StoreDaily.prototype, "btn_sold", void 0);
    __decorate([
        property(cc.Label)
    ], StoreDaily.prototype, "price_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], StoreDaily.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoreDaily.prototype, "icon_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoreDaily.prototype, "cost_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoreDaily.prototype, "lvl_sprite", void 0);
    __decorate([
        property(cc.Label)
    ], StoreDaily.prototype, "item_count_lbl", void 0);
    StoreDaily = __decorate([
        ccclass
    ], StoreDaily);
    return StoreDaily;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();