"use strict";
cc._RF.push(module, 'bfae6SGx69Iv6eH7KMjgjQs', 'TurtleExchangeItem');
// start-scene/scripts/TurtleExchangeItem.ts

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
exports.TurtleExchangeItem = void 0;
// *-*
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var ListViewItem_1 = require("./ListViewItem");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TurtleExchangeItem = /** @class */ (function (_super) {
    __extends(TurtleExchangeItem, _super);
    function TurtleExchangeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exchange_light_sf = null;
        _this.exchange_dark_sf = null;
        _this.bg_node = null;
        _this.exchange_btn = null;
        _this.exchange_spr = null;
        _this.prop_spr = null;
        _this.prop_lbl = null;
        _this.exchange_prop_spr = null;
        _this.exchange_prop_lbl = null;
        return _this;
    }
    Object.defineProperty(TurtleExchangeItem.prototype, "data", {
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
    TurtleExchangeItem.prototype.update_view = function () {
        var data = this._data;
        this.bg_node.color = 0 < data.state ? GameManager_1.gm.const.TURTLE_EXCHANGE_COLOR_LIGHT : GameManager_1.gm.const.TURTLE_EXCHANGE_COLOR_DART;
        this.exchange_btn.interactable = 0 < data.state;
        this.exchange_spr.spriteFrame = 0 < data.state ? this.exchange_light_sf : this.exchange_dark_sf;
        Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.MAP, "res/" + t.prop_id);
        Utils_1.Utils.async_set_sprite_frame(this.exchange_prop_spr, Constants_1.BundleName.MAP, "res/" + t.exchange_prop_id);
        this.prop_lbl.string = data.prop_num + "";
        this.exchange_prop_lbl.string = data.exchange_prop_num + "";
    };
    TurtleExchangeItem.prototype.reset = function () {
        this.prop_spr.spriteFrame = null;
    };
    TurtleExchangeItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.exchange_btn.node) {
            var mapCellData = GameManager_1.gm.data.mapCell_data;
            var data = this._data;
            var turtleExchangeData = GameManager_1.gm.data.turtle_exchange_data;
            if (turtleExchangeData.left_refresh_count <= 0) {
                GameManager_1.gm.ui.show_notice("Không đủ thời gian đổi thưởng, vui lòng mua thêm");
            }
            else {
                if (mapCellData.getIsHaveSpeceCellID()) {
                    if (0 < data.exchange_prop_id && 0 < data.exchange_prop_num) {
                        if (data.exchange_prop_id == Constants_1.RewardIdEnum.GOLD_BARREL || data.exchange_prop_id == Constants_1.RewardIdEnum.SILVER_BARREL) {
                            if (1 == data.exchange_prop_num) {
                                var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", data.prop_id.toString());
                                if (itemConfig.type == Constants_1.PropTypeEnum.COIN_TYPE) {
                                    if (data.exchange_prop_id == Constants_1.RewardIdEnum.GOLD_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10615);
                                        NetUtils_1.ReportData.instance.report_point(10616);
                                    }
                                    else if (data.exchange_prop_id == Constants_1.RewardIdEnum.SILVER_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10611);
                                        NetUtils_1.ReportData.instance.report_point(10612);
                                    }
                                }
                                else if (itemConfig.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE) {
                                    if (data.exchange_prop_id == Constants_1.RewardIdEnum.GOLD_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10617);
                                        NetUtils_1.ReportData.instance.report_point(10618);
                                    }
                                    else if (data.exchange_prop_id == Constants_1.RewardIdEnum.SILVER_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10613);
                                        NetUtils_1.ReportData.instance.report_point(10614);
                                    }
                                }
                                mapCellData.delCellItem(data.prop_id, data.prop_num);
                                mapCellData.addBarrelInMap(data.exchange_prop_id);
                                turtleExchangeData.left_refresh_count--;
                                turtleExchangeData.async_write_data();
                            }
                        }
                        else {
                            cc.error("超出需求的奖励");
                        }
                    }
                    else {
                        GameManager_1.gm.ui.show_auto_merge_message();
                    }
                }
            }
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], TurtleExchangeItem.prototype, "exchange_light_sf", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], TurtleExchangeItem.prototype, "exchange_dark_sf", void 0);
    __decorate([
        property(cc.Node)
    ], TurtleExchangeItem.prototype, "bg_node", void 0);
    __decorate([
        property(cc.Button)
    ], TurtleExchangeItem.prototype, "exchange_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], TurtleExchangeItem.prototype, "exchange_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], TurtleExchangeItem.prototype, "prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchangeItem.prototype, "prop_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], TurtleExchangeItem.prototype, "exchange_prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchangeItem.prototype, "exchange_prop_lbl", void 0);
    TurtleExchangeItem = __decorate([
        ccclass
    ], TurtleExchangeItem);
    return TurtleExchangeItem;
}(ListViewItem_1.ListViewItem));
exports.TurtleExchangeItem = TurtleExchangeItem;

cc._RF.pop();