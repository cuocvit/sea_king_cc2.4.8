"use strict";
cc._RF.push(module, '7404fSLvQdA4KI33B6bQXun', 'GoBattleItem');
// start-scene/scripts/GoBattleItem.ts

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
exports.GoBattleItem = void 0;
// +-+
var ListViewItem_1 = require("./ListViewItem");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var TempData_1 = require("./TempData");
var GameManager_1 = require("./GameManager");
var MapCellCfgData_1 = require("./MapCellCfgData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoBattleItem = /** @class */ (function (_super) {
    __extends(GoBattleItem, _super);
    function GoBattleItem() {
        var _this = _super.call(this) || this;
        _this.heroColorSpr = null;
        _this.heroSpr = null;
        _this.HeroNumLbl = null;
        _this.heroLvlSpr = null;
        _this.isSuperHero = null;
        _this.heroHp = null;
        _this.heroHpBar = null;
        return _this;
    }
    Object.defineProperty(GoBattleItem.prototype, "data", {
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
    GoBattleItem.prototype.update_view = function () {
        var _a;
        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this._data.heroID);
        if (heroConfig) {
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.heroID);
            Utils_1.Utils.async_set_sprite_frame(this.heroLvlSpr, Constants_1.BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
            this.isSuperHero.active = heroConfig && heroConfig.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE;
            this.HeroNumLbl.string = this._data.heroNum.toString();
            this.heroHp.active = false;
            if ((_a = this.isSuperHero) === null || _a === void 0 ? void 0 : _a.active) {
                this.heroHp.active = true;
                this.heroHpBar.scaleX = Math.min(this._data.heroHp[0] / heroConfig.hp, 1);
            }
        }
    };
    GoBattleItem.prototype.onClickAddHeroTobattle = function () {
        if (TempData_1.TempData.getDefenseType() != 2) {
            if (GameManager_1.gm.data.fight_temp_data.get_battle_hero_is_space()) {
                var heroID = this._data.heroID;
                var cellID = this._data.cellID[0];
                var roleItem = new MapCellCfgData_1.roleGoBattleItemVO();
                roleItem.cellID = cellID;
                var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
                if (heroConfig) {
                    roleItem.itemID = heroConfig.heroid;
                    roleItem.itemType = heroConfig.occupation;
                    roleItem.hp = heroConfig.hp;
                    roleItem.maxHp = heroConfig.hp;
                    if (heroConfig.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                        if (GameManager_1.gm.data.fight_temp_data.getFightSuperHeroNum() >= 1) {
                            GameManager_1.gm.ui.show_notice("Chỉ có một siêu anh hùng có thể tham gia trận chiến!!");
                            return;
                        }
                        var superHeroData = GameManager_1.gm.data.mapCell_data.getSuperHeroData(heroConfig.heroid, cellID);
                        if (superHeroData) {
                            roleItem.hp = superHeroData.hp;
                            roleItem.maxHp = superHeroData.maxHp;
                        }
                    }
                    GameManager_1.gm.data.fight_temp_data.battle_hero_array.push(roleItem);
                }
                TempData_1.TempData.removeHeroByID(heroID);
                GameManager_1.gm.ui.emit("refreshHeroBattle");
                if (GameManager_1.gm.data.mapCell_data.isGuide) {
                    GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                        guideid: GameManager_1.gm.data.fight_temp_data.battle_hero_array.length + 10,
                        guidedesc: cc.js.formatStr("%d.上阵英雄", GameManager_1.gm.data.fight_temp_data.battle_hero_array.length + 10)
                    });
                    GameManager_1.gm.ui.mapMainUI.checkGuideIsShow();
                }
                GameManager_1.gm.ui.emit("refreshBattleHero");
            }
        }
        else if (GameManager_1.gm.data.fight_temp_data.get_defense_hero_is_space()) {
            var heroID = this._data.heroID;
            var cellID = this._data.cellID[0];
            var defenseItem = new MapCellCfgData_1.DefenseHeroItemVO();
            defenseItem.cellID = cellID;
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
            if (heroConfig) {
                if (heroConfig.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE && GameManager_1.gm.data.mapCell_data.getDefenseSuperNum() >= 1) {
                    GameManager_1.gm.ui.show_notice("Chỉ có một siêu anh hùng có thể tham gia trận chiến!!");
                    return;
                }
                defenseItem.cellID = this._data.cellID[0];
                defenseItem.heroid = heroID;
                defenseItem.heroUID = this._data.heroUID[0];
                GameManager_1.gm.data.mapCell_data.addDefenseDataByID(defenseItem);
            }
            TempData_1.TempData.removeHeroByID(heroID);
            GameManager_1.gm.ui.emit("refreshHeroBattle");
            GameManager_1.gm.ui.emit("refreshBattleHero");
            GameManager_1.gm.data.mapCell_data.async_write_data();
        }
    };
    GoBattleItem.prototype.reset = function () {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
        this.HeroNumLbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], GoBattleItem.prototype, "heroColorSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleItem.prototype, "heroSpr", void 0);
    __decorate([
        property(cc.Label)
    ], GoBattleItem.prototype, "HeroNumLbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleItem.prototype, "heroLvlSpr", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleItem.prototype, "isSuperHero", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleItem.prototype, "heroHp", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleItem.prototype, "heroHpBar", void 0);
    GoBattleItem = __decorate([
        ccclass
    ], GoBattleItem);
    return GoBattleItem;
}(ListViewItem_1.ListViewItem));
exports.GoBattleItem = GoBattleItem;

cc._RF.pop();