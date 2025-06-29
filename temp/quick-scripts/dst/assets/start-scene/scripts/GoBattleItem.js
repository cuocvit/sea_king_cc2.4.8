
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GoBattleItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdvQmF0dGxlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLCtDQUE4QztBQUM5QyxpQ0FBZ0M7QUFDaEMseUNBQXVEO0FBQ3ZELHVDQUFzQztBQUN0Qyw2Q0FBbUM7QUFDbkMsbURBQXlFO0FBRW5FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBWTVDO0lBQWtDLGdDQUFZO0lBc0IxQztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQXRCTyxrQkFBWSxHQUFxQixJQUFJLENBQUM7UUFHdEMsYUFBTyxHQUFxQixJQUFJLENBQUM7UUFHakMsZ0JBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGdCQUFVLEdBQXFCLElBQUksQ0FBQztRQUdwQyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsWUFBTSxHQUFtQixJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFtQixJQUFJLENBQUM7O0lBSXpDLENBQUM7SUFHRCxzQkFBVyw4QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFlO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FMQTtJQU9NLGtDQUFXLEdBQWxCOztRQUNJLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxJQUFJLFVBQVUsRUFBRTtZQUNaLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLFlBQVksR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakcsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkcsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsc0JBQVUsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLHdCQUFZLENBQUMsZUFBZSxDQUFDO1lBQzdGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMzQixVQUFJLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0U7U0FDSjtJQUNMLENBQUM7SUFFTyw2Q0FBc0IsR0FBOUI7UUFDSSxJQUFJLG1CQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHdCQUF3QixFQUFFLEVBQUU7Z0JBQ3BELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxtQ0FBa0IsRUFBRSxDQUFDO2dCQUMxQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDekIsSUFBTSxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxVQUFVLEVBQUU7b0JBQ1osUUFBUSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO29CQUNwQyxRQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7b0JBQzFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDNUIsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUMvQixJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksd0JBQVksQ0FBQyxlQUFlLEVBQUU7d0JBQ3RELElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxFQUFFOzRCQUNyRCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsdURBQXVELENBQUMsQ0FBQzs0QkFDM0UsT0FBTzt5QkFDVjt3QkFDRCxJQUFNLGFBQWEsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDdkYsSUFBSSxhQUFhLEVBQUU7NEJBQ2YsUUFBUSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDOzRCQUMvQixRQUFRLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7eUJBQ3hDO3FCQUNKO29CQUNELGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzVEO2dCQUNELG1CQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO29CQUM5QixnQkFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUU7d0JBQ3pDLE9BQU8sRUFBRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEVBQUU7d0JBQzlELFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7cUJBQy9GLENBQUMsQ0FBQztvQkFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDdEM7Z0JBQ0QsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDbkM7U0FDSjthQUFNLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixFQUFFLEVBQUU7WUFDNUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBTSxXQUFXLEdBQUcsSUFBSSxrQ0FBaUIsRUFBRSxDQUFDO1lBQzVDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzVCLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLHdCQUFZLENBQUMsZUFBZSxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDeEcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7b0JBQzNFLE9BQU87aUJBQ1Y7Z0JBQ0QsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQzVCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN4RDtZQUNELG1CQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hDLGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVNLDRCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBbEhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQzBCO0lBRzlDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ3FCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ3dCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3dCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ3lCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ29CO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ3VCO0lBcEJoQyxZQUFZO1FBRHhCLE9BQU87T0FDSyxZQUFZLENBcUh4QjtJQUFELG1CQUFDO0NBckhELEFBcUhDLENBckhpQywyQkFBWSxHQXFIN0M7QUFySFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgTGlzdFZpZXdJdGVtIH0gZnJvbSAnLi9MaXN0Vmlld0l0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBIZXJvVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IHJvbGVHb0JhdHRsZUl0ZW1WTywgRGVmZW5zZUhlcm9JdGVtVk8gfSBmcm9tICcuL01hcENlbGxDZmdEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5pbnRlcmZhY2UgVHlwZURhdGEge1xyXG4gICAgaGVyb0lEOiBudW1iZXI7XHJcbiAgICBoZXJvTnVtOiBudW1iZXI7XHJcbiAgICBoZXJvVUlEOiBudW1iZXJbXTtcclxuICAgIGhlcm9IcDogbnVtYmVyO1xyXG4gICAgaGVyb190eXBlOiBudW1iZXI7XHJcbiAgICBjZWxsSUQ6IG51bWJlcltdO1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgR29CYXR0bGVJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGhlcm9Db2xvclNwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb1NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBIZXJvTnVtTGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGhlcm9MdmxTcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBpc1N1cGVySGVybzogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBoZXJvSHA6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaGVyb0hwQmFyOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IFR5cGVEYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IFR5cGVEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5fZGF0YS5oZXJvSUQpO1xyXG4gICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvQ29sb3JTcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9jb2xvcl9cIiArIGhlcm9Db25maWcubHYpO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb1NwciwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgdGhpcy5fZGF0YS5oZXJvSUQpO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb0x2bFNwciwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL2hlcm8vaGVyb1Bob3RvXCIgKyBoZXJvQ29uZmlnLmx2KTtcclxuICAgICAgICAgICAgdGhpcy5pc1N1cGVySGVyby5hY3RpdmUgPSBoZXJvQ29uZmlnICYmIGhlcm9Db25maWcuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEU7XHJcbiAgICAgICAgICAgIHRoaXMuSGVyb051bUxibC5zdHJpbmcgPSB0aGlzLl9kYXRhLmhlcm9OdW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvSHAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3VwZXJIZXJvPy5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb0hwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9IcEJhci5zY2FsZVggPSBNYXRoLm1pbih0aGlzLl9kYXRhLmhlcm9IcFswXSAvIGhlcm9Db25maWcuaHAsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0FkZEhlcm9Ub2JhdHRsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoVGVtcERhdGEuZ2V0RGVmZW5zZVR5cGUoKSAhPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfYmF0dGxlX2hlcm9faXNfc3BhY2UoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0lEID0gdGhpcy5fZGF0YS5oZXJvSUQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsSUQgPSB0aGlzLl9kYXRhLmNlbGxJRFswXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvbGVJdGVtID0gbmV3IHJvbGVHb0JhdHRsZUl0ZW1WTygpO1xyXG4gICAgICAgICAgICAgICAgcm9sZUl0ZW0uY2VsbElEID0gY2VsbElEO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaGVyb0lEKTtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZUl0ZW0uaXRlbUlEID0gaGVyb0NvbmZpZy5oZXJvaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZUl0ZW0uaXRlbVR5cGUgPSBoZXJvQ29uZmlnLm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZUl0ZW0uaHAgPSBoZXJvQ29uZmlnLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGVJdGVtLm1heEhwID0gaGVyb0NvbmZpZy5ocDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0NvbmZpZy5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0RmlnaHRTdXBlckhlcm9OdW0oKSA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkNo4buJIGPDsyBt4buZdCBzacOqdSBhbmggaMO5bmcgY8OzIHRo4buDIHRoYW0gZ2lhIHRy4bqtbiBjaGnhur9uISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwZXJIZXJvRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFN1cGVySGVyb0RhdGEoaGVyb0NvbmZpZy5oZXJvaWQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdXBlckhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlSXRlbS5ocCA9IHN1cGVySGVyb0RhdGEuaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlSXRlbS5tYXhIcCA9IHN1cGVySGVyb0RhdGEubWF4SHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXkucHVzaChyb2xlSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBUZW1wRGF0YS5yZW1vdmVIZXJvQnlJRChoZXJvSUQpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuZW1pdChcInJlZnJlc2hIZXJvQmF0dGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZGVpZDogZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXkubGVuZ3RoICsgMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogY2MuanMuZm9ybWF0U3RyKFwiJWQu5LiK6Zi16Iux6ZuEXCIsIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5Lmxlbmd0aCArIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5jaGVja0d1aWRlSXNTaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaEJhdHRsZUhlcm9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9kZWZlbnNlX2hlcm9faXNfc3BhY2UoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvSUQgPSB0aGlzLl9kYXRhLmhlcm9JRDtcclxuICAgICAgICAgICAgY29uc3QgY2VsbElEID0gdGhpcy5fZGF0YS5jZWxsSURbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VJdGVtID0gbmV3IERlZmVuc2VIZXJvSXRlbVZPKCk7XHJcbiAgICAgICAgICAgIGRlZmVuc2VJdGVtLmNlbGxJRCA9IGNlbGxJRDtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaGVyb0lEKTtcclxuICAgICAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFICYmIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldERlZmVuc2VTdXBlck51bSgpID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkNo4buJIGPDsyBt4buZdCBzacOqdSBhbmggaMO5bmcgY8OzIHRo4buDIHRoYW0gZ2lhIHRy4bqtbiBjaGnhur9uISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZW5zZUl0ZW0uY2VsbElEID0gdGhpcy5fZGF0YS5jZWxsSURbMF07XHJcbiAgICAgICAgICAgICAgICBkZWZlbnNlSXRlbS5oZXJvaWQgPSBoZXJvSUQ7XHJcbiAgICAgICAgICAgICAgICBkZWZlbnNlSXRlbS5oZXJvVUlEID0gdGhpcy5fZGF0YS5oZXJvVUlEWzBdO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkRGVmZW5zZURhdGFCeUlEKGRlZmVuc2VJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUZW1wRGF0YS5yZW1vdmVIZXJvQnlJRChoZXJvSUQpO1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaEhlcm9CYXR0bGVcIik7XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJyZWZyZXNoQmF0dGxlSGVyb1wiKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvU3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhlcm9MdmxTcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSGVyb051bUxibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG59Il19