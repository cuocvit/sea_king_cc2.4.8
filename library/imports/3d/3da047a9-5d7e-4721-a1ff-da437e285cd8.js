"use strict";
cc._RF.push(module, '3da04epXX5HIaH/2kN+KFzY', 'MailHeroItem');
// mail/scripts/MailHeroItem.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailHeroItem = /** @class */ (function (_super) {
    __extends(MailHeroItem, _super);
    function MailHeroItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.hero_spr = null;
        return _this;
    }
    Object.defineProperty(MailHeroItem.prototype, "data", {
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
    MailHeroItem.prototype.update_view = function () {
        Utils_1.Utils.async_set_sprite_frame(this.hero_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
        var heroConfigData = GameManager_1.gm.config.get_row_data("HeroConfigData", this._data.id + "");
        if (heroConfigData) {
            Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + heroConfigData.lv);
        }
    };
    MailHeroItem.prototype.reset = function () {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
    };
    __decorate([
        property(cc.Sprite)
    ], MailHeroItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], MailHeroItem.prototype, "hero_spr", void 0);
    MailHeroItem = __decorate([
        ccclass
    ], MailHeroItem);
    return MailHeroItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();