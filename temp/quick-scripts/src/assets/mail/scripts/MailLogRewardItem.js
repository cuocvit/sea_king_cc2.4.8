"use strict";
cc._RF.push(module, 'c5306fKSg5FiJyxvgsm7HKs', 'MailLogRewardItem');
// mail/scripts/MailLogRewardItem.ts

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
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailLogRewardItem = /** @class */ (function (_super) {
    __extends(MailLogRewardItem, _super);
    function MailLogRewardItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(MailLogRewardItem.prototype, "data", {
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
    MailLogRewardItem.prototype.update_view = function () {
        Utils_1.Utils.async_set_sprite_frame(this.item_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
        this.num_lbl.string = "x" + this._data.num;
    };
    MailLogRewardItem.prototype.reset = function () {
        this.item_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], MailLogRewardItem.prototype, "item_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogRewardItem.prototype, "num_lbl", void 0);
    MailLogRewardItem = __decorate([
        ccclass
    ], MailLogRewardItem);
    return MailLogRewardItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();