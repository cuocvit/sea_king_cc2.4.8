"use strict";
cc._RF.push(module, '30b28gQFndLy6SUApAArX6r', 'FightOfflineItem');
// start-scene/scripts/FightOfflineItem.ts

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
exports.FightOfflineItem = void 0;
// +-+
var ListViewItem_1 = require("./ListViewItem");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightOfflineItem = /** @class */ (function (_super) {
    __extends(FightOfflineItem, _super);
    function FightOfflineItem() {
        var _this = _super.call(this) || this;
        _this.heroColorSpr = null;
        _this.heroSpr = null;
        _this.HeroNumLbl = null;
        _this.heroLvlSpr = null;
        _this.isSuperHero = null;
        return _this;
    }
    Object.defineProperty(FightOfflineItem.prototype, "data", {
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
    FightOfflineItem.prototype.update_view = function () {
        this.isSuperHero.active = false;
        this.heroLvlSpr.spriteFrame = null;
        if (this._data.itemID > 30000) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this._data.itemID);
            if (!heroConfig)
                return;
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.itemID);
            Utils_1.Utils.async_set_sprite_frame(this.heroLvlSpr, Constants_1.BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
            this.isSuperHero.active = heroConfig && heroConfig.hero_type === Constants_1.HeroTypeEnum.SUPER_HERO_TYPE;
            this.HeroNumLbl.string = this._data.heroNum.toString();
        }
        else {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this._data.itemID);
            if (!itemConfig)
                return;
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + itemConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.itemID);
        }
        this.HeroNumLbl.string = "x" + this.data.heroNum;
    };
    FightOfflineItem.prototype.reset = function () {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
        this.HeroNumLbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightOfflineItem.prototype, "heroColorSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightOfflineItem.prototype, "heroSpr", void 0);
    __decorate([
        property(cc.Label)
    ], FightOfflineItem.prototype, "HeroNumLbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightOfflineItem.prototype, "heroLvlSpr", void 0);
    __decorate([
        property(cc.Node)
    ], FightOfflineItem.prototype, "isSuperHero", void 0);
    FightOfflineItem = __decorate([
        ccclass
    ], FightOfflineItem);
    return FightOfflineItem;
}(ListViewItem_1.ListViewItem));
exports.FightOfflineItem = FightOfflineItem;

cc._RF.pop();