"use strict";
cc._RF.push(module, '5a3027kz0xKoaE2yHG8mVdq', 'MailDetailsRewardItem');
// mail/scripts/MailDetailsRewardItem.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailDetailsRewardItem = /** @class */ (function (_super) {
    __extends(MailDetailsRewardItem, _super);
    function MailDetailsRewardItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.reward_spr = null;
        _this.num_lbl = null;
        _this.mask_node = null;
        _this.right_node = null;
        return _this;
    }
    Object.defineProperty(MailDetailsRewardItem.prototype, "data", {
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
    Object.defineProperty(MailDetailsRewardItem.prototype, "select", {
        set: function (value) {
            this._select = value;
            if (this.mask_node && this.right_node) {
                this.mask_node.active = this.right_node.active = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    MailDetailsRewardItem.prototype.update_view = function () {
        var rowData = GameManager_1.gm.config.get_row_data("ItemConfigData", this._data.reward_id.toString());
        if (rowData) {
            Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + rowData.color);
            Utils_1.Utils.async_set_sprite_frame(this.reward_spr, Constants_1.BundleName.LADDER, "res/" + rowData.icon);
        }
        this.num_lbl.string = this._data.reward_num + "";
    };
    MailDetailsRewardItem.prototype.reset = function () {
        this.reward_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], MailDetailsRewardItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], MailDetailsRewardItem.prototype, "reward_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailDetailsRewardItem.prototype, "num_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailDetailsRewardItem.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], MailDetailsRewardItem.prototype, "right_node", void 0);
    MailDetailsRewardItem = __decorate([
        ccclass
    ], MailDetailsRewardItem);
    return MailDetailsRewardItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();