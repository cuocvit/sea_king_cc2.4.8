
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/special_build/scripts/StoreDaily.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3BlY2lhbF9idWlsZFxcc2NyaXB0c1xcU3RvcmVEYWlseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELCtEQUFnRTtBQUNoRSxxRUFBMkQ7QUFDM0QsaUVBQStFO0FBSXpFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlCLDhCQUFZO0lBQXJDO1FBQUEscUVBd05DO1FBdE5XLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixvQkFBYyxHQUFhLElBQUksQ0FBQzs7SUE4TDVDLENBQUM7SUEzTEcsc0JBQVcsNEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBb0M7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUxBO0lBT00sZ0NBQVcsR0FBbEI7UUFBQSxpQkErRUM7UUE5RUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMs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TUFBTSxDQUFDOytDQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNnQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNnQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNpQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNxQjtJQTFCdEMsVUFBVTtRQURmLE9BQU87T0FDRixVQUFVLENBd05mO0lBQUQsaUJBQUM7Q0F4TkQsQUF3TkMsQ0F4TndCLDJCQUFZLEdBd05wQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBSZXdhcmRJZEVudW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNob3BDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9zaG9wJztcclxuaW1wb3J0IHsgSGVyb0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2hlcm8nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFN0b3JlRGFpbHkgZXh0ZW5kcyBMaXN0Vmlld0l0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYnRuX2FkZDogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBidG5fZnJlZTogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX3NvbGQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgcHJpY2VfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBjb3VudF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBpY29uX3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBjb3N0X3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdmxfc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgaXRlbV9jb3VudF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgX2RhdGE6IHsgaWQ6IG51bWJlcjsgaW5kZXg6IG51bWJlciB9O1xyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IHsgaWQ6IG51bWJlcjsgaW5kZXg6IG51bWJlciB9IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IHsgaWQ6IG51bWJlcjsgaW5kZXg6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMC4xICogdGhpcy5fZGF0YS5pbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2hvcENvbmZpZ0RhdGFcIiwgdGhpcy5fZGF0YS5pZC50b1N0cmluZygpKSBhcyBTaG9wQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuaXRlbV9jb3VudF9sYmwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAocm93RGF0YS5pdGVtX251bSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtX2NvdW50X2xibC5zdHJpbmcgPSBcInhcIiArIHJvd0RhdGEuaXRlbV9udW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbURhdGE6IEhlcm9Db25maWc7XHJcbiAgICAgICAgaWYgKHJvd0RhdGEuaXRlbV9pZCA+IDMwMDAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIHJvd0RhdGEuaXRlbV9pZC50b1N0cmluZygpKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLmx2bF9zcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubHZsX3Nwcml0ZSwgQnVuZGxlTmFtZS5TUEVDSUFMX0JVSUxELCBcInJlcy9cIiArIGl0ZW1EYXRhLmx2KTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmljb25fc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBpdGVtRGF0YS5pY29uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJJdGVtQ29uZmlnRGF0YVwiLCByb3dEYXRhLml0ZW1faWQudG9TdHJpbmcoKSkgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmljb25fc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBpdGVtRGF0YS5pY29uKTtcclxuICAgICAgICAgICAgdGhpcy5sdmxfc3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gZ20uZGF0YS5zdG9yZV9kYXRhLmdldFN0b3JlQ291bnQocm93RGF0YS5zaG9wX2lkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMjAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gZ20uZGF0YS5zdG9yZV9kYXRhLmdldERhaWx5U3RvcmVDb3VudChyb3dEYXRhLnNob3BfaWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocm93RGF0YS5zaG9wX3R5cGUgPCAzMDApIHtcclxuICAgICAgICAgICAgY291bnQgPSBnbS5kYXRhLnN0b3JlX2RhdGEuZ2V0VmlkZW9TdG9yZUNvdW50KHJvd0RhdGEuc2hvcF9pZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyb3dEYXRhLnNob3BfdHlwZSA8IDQwMCkge1xyXG4gICAgICAgICAgICBjb3VudCA9IGdtLmRhdGEuc3RvcmVfZGF0YS5nZXREaW1vbmRTdG9yZUNvdW50KHJvd0RhdGEuc2hvcF9pZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvdW50X2xibC5zdHJpbmcgPSByb3dEYXRhLmxpbWl0X251bSAtIGNvdW50ICsgXCIvXCIgKyByb3dEYXRhLmxpbWl0X251bTtcclxuICAgICAgICBpZiAoY291bnQgPj0gcm93RGF0YS5saW1pdF9udW0pIHtcclxuICAgICAgICAgICAgdGhpcy5idG5fc29sZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FkZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocm93RGF0YS5tb25leV90eXBlID4gMCAmJiByb3dEYXRhLm1vbmV5X3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfYnV0dG9uX3Nob3dcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkX3R5cGU6IFwi5r+A5Yqx6KeG6aKRXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcml0X2lkOiBcIjk0NjExNDExNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkX3Bvc2l0aW9uOiBcIuWVhuW6l1/ojrflvpfpgZPlhbdcIixcclxuICAgICAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbl90eXBlOiBcIuWVhuW6l1wiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3NvbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChyb3dEYXRhLm1vbmV5X3R5cGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9mcmVlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9hZGQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmljZV9sYmwuc3RyaW5nID0gcm93RGF0YS5wcmljZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3N0X3Nwcml0ZS5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUuaGVpZ2h0ID0gNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUud2lkdGggPSA1MDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfbGJsLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2xibC5ub2RlLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiNGRkRBNThcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2xibC5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiM3RDI3MTNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEubW9uZXlfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfbGJsLnN0cmluZyA9IFwiTWnhu4VuIHBow61cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUuY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiIzI1M0Q0NVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUud2lkdGggPSA0MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUuaGVpZ2h0ID0gMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9sYmwubm9kZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjMUMzRjAwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfbGJsLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfbGJsLm5vZGUucG9zaXRpb24gPW5ldyAgY2MuVmVjMyg1LDgsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9sYmwuZm9udFNpemUgPSAyNztcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuY29zdF9zcHJpdGUsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay92aWRlb19cIiArIHJvd0RhdGEubW9uZXlfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5jb3N0X3Nwcml0ZSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgcm93RGF0YS5tb25leV90eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5fYWRkLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhdGNoQWRTdWNjKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2MjUpO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDYyNik7XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzEyX0JVWV9TVUNDRVNTKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2hvcENvbmZpZ0RhdGFcIiwgdGhpcy5fZGF0YS5pZC50b1N0cmluZygpKSBhcyBTaG9wQ29uZmlnO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdtLmRhdGEuc3RvcmVfZGF0YS52aWRlb19zdG9yZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEuc2hvcF9pZCA9PT0gZ20uZGF0YS5zdG9yZV9kYXRhLnZpZGVvX3N0b3JlX2FycmF5W2ldLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkSXRlbShyb3dEYXRhLml0ZW1faWQsIHJvd0RhdGEuaXRlbV9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuc3RvcmVfZGF0YS51cGRhdGVWaWRlb1N0b3JlKHJvd0RhdGEuc2hvcF9pZCwgMSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5zdG9yZV9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkTGlzdDogW3Jvd0RhdGEuaXRlbV9pZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bUxpc3Q6IFtyb3dEYXRhLml0ZW1fbnVtXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGljaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SXNIYXZlU3BlY2VDZWxsSUQoKSkge1xyXG4gICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlNob3BDb25maWdEYXRhXCIsIHRoaXMuX2RhdGEuaWQudG9TdHJpbmcoKSkgYXMgU2hvcENvbmZpZztcclxuICAgICAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IGdtLmRhdGEuc3RvcmVfZGF0YS5nZXRTdG9yZUNvdW50KHJvd0RhdGEuc2hvcF9pZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocm93RGF0YS5zaG9wX3R5cGUgPCAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ID0gZ20uZGF0YS5zdG9yZV9kYXRhLmdldERhaWx5U3RvcmVDb3VudChyb3dEYXRhLnNob3BfaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IGdtLmRhdGEuc3RvcmVfZGF0YS5nZXRWaWRlb1N0b3JlQ291bnQocm93RGF0YS5zaG9wX2lkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dEYXRhLnNob3BfdHlwZSA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgY291bnQgPSBnbS5kYXRhLnN0b3JlX2RhdGEuZ2V0RGltb25kU3RvcmVDb3VudChyb3dEYXRhLnNob3BfaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY291bnQgPj0gcm93RGF0YS5saW1pdF9udW0pIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiU+G6o24gcGjhuqltIMSRw6MgYsOhbiBo4bq/dC4gQuG6oW4gY8OzIHRo4buDIG11YSBs4bqhaSBzYXUga2hpIGzDoG0gbeG7m2kuXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEubW9uZXlfdHlwZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93RGF0YS5tb25leV90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA1MjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDUyNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfYnV0dG9uX2NsaWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkX3R5cGU6IFwi5r+A5Yqx6KeG6aKRXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXRfaWQ6IFwiOTQ2MTE0MTE0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbjogXCLllYblupdf6I635b6X6YGT5YW3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbl90eXBlOiBcIuWVhuW6l1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnNob3dfdmlkZW9fYWQodGhpcy53YXRjaEFkU3VjYywgdGhpcywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRfcG9zaXRpb246IFwi5ZWG5bqXX+iOt+W+l+mBk+WFt1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRfcG9zaXRpb25fdHlwZTogXCLllYblupdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TWVydHJhaWxJRENvdW50KHJvd0RhdGEubW9uZXlfdHlwZSkgPCByb3dEYXRhLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiVuG6rXQgbGnhu4d1IGtow7RuZyDEkeG7p1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5kZWxDZWxsSXRlbShyb3dEYXRhLm1vbmV5X3R5cGUsIHJvd0RhdGEucHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3dEYXRhLm1vbmV5X3R5cGUgPT09IFJld2FyZElkRW51bS5XT09EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzEzX1dPT0RfQlVZX0lURU0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93RGF0YS5tb25leV90eXBlID09PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xNF9ESUFNT05EX0JVWV9JVEVNKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xNl9CVVlfSVRFTSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnN0b3JlX2RhdGEuaXNGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcInJlZnJlc2hfcmVkX3RpcHNfc3RhbGxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRJdGVtKHJvd0RhdGEuaXRlbV9pZCwgcm93RGF0YS5pdGVtX251bSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRMaXN0OiBbcm93RGF0YS5pdGVtX2lkXSxcclxuICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiBbcm93RGF0YS5pdGVtX251bV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5zdG9yZV9kYXRhLnVwZGF0ZVN0b3JlKHJvd0RhdGEuc2hvcF9pZCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0RhdGEuc2hvcF90eXBlIDwgMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5zdG9yZV9kYXRhLnVwZGF0ZURhaWx5U3RvcmUocm93RGF0YS5zaG9wX2lkLCAxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93RGF0YS5zaG9wX3R5cGUgPCAzMDAgfHwgcm93RGF0YS5zaG9wX3R5cGUgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnN0b3JlX2RhdGEudXBkYXRlRGlhbW9uZFN0b3JlKHJvd0RhdGEuc2hvcF9pZCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X2F1dG9fbWVyZ2VfbWVzc2FnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==