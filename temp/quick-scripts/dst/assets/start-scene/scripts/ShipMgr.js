
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ShipMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f2dbBi+fxHBLgVnoITrYls', 'ShipMgr');
// start-scene/scripts/ShipMgr.ts

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
// +-+
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var TempData_1 = require("./TempData");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShipMgr = /** @class */ (function (_super) {
    __extends(ShipMgr, _super);
    function ShipMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.caseNode = null;
        _this.normalBattle = null;
        _this.rewardBattle = null;
        _this.btnShip = null;
        return _this;
    }
    ShipMgr.prototype.onLoad = function () {
        GameManager_1.gm.ui.on("ship_goods_change", this.refreshItem, this);
        GameManager_1.gm.ui.on("ship_play_anim", this.shipPlayAnim, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimFinishCb, this);
    };
    ShipMgr.prototype.onEnable = function () {
        this.btnShip.interactable = true;
        this.normalBattle.getComponent(cc.Button).interactable = true;
        this.rewardBattle.getComponent(cc.Button).interactable = true;
        this.refreshItem();
        if (!(this.node.getComponent(cc.Animation).getAnimationState("ship_out").isPlaying ||
            this.node.getComponent(cc.Animation).getAnimationState("ship_in").isPlaying)) {
            this.node.getComponent(cc.Animation).play("ship_normal");
        }
    };
    ShipMgr.prototype.playAnimFinishCb = function (animation, event) {
        this.btnShip.interactable = true;
        this.normalBattle.getComponent(cc.Button).interactable = true;
        this.rewardBattle.getComponent(cc.Button).interactable = true;
        if ("ship_out" == event.name) {
            this.shipOutFight();
        }
        else if ("ship_in" == event.name) {
            this.shipInGetGoods();
        }
    };
    ShipMgr.prototype.shipOutFight = function () {
        var mapType = TempData_1.TempData.map_type;
        cc.log(mapType + "          mapType");
        if (1 == mapType) {
            GameManager_1.gm.data.fight_temp_data.match_fight();
        }
        else if (2 == mapType) {
            if (GameManager_1.gm.data.fight_temp_data.match_caves_map()) {
                GameManager_1.gm.ui.show_fight();
            }
            else {
                GameManager_1.gm.ui.show_notice("Đã đạt cấp độ cao nhất, hãy chờ cấp độ tiếp theo!");
            }
        }
        else if (3 == mapType) {
            GameManager_1.gm.data.fight_temp_data.match_happy_map();
            GameManager_1.gm.ui.show_fight();
        }
    };
    ShipMgr.prototype.shipInGetGoods = function () {
        var tempHeroArray = GameManager_1.gm.data.fight_temp_data.battle_hero_array;
        var deathHeroDataArray = GameManager_1.gm.data.fight_temp_data.fight_result_data.death_hero_data_array;
        var aliveHeroDataArray = GameManager_1.gm.data.fight_temp_data.fight_result_data.alive_hero_data_array;
        deathHeroDataArray.length;
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            var towerData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE);
            if (towerData && 2 <= towerData.buildLvl && GameManager_1.gm.data.fight_data.fight_count % 2 == 0) {
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.SuperRecruit);
            }
        }
        if (2 < GameManager_1.gm.data.fight_data.fight_count && GameManager_1.gm.data.fight_data.fight_count % 3 == 1 && !GameManager_1.gm.data.mapCell_data.guideGift.guideIsGet) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDEGIFT);
        }
        if (GameManager_1.gm.data.server_data.has_new_defense_log) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.MailLogNotice);
            GameManager_1.gm.data.server_data.has_new_defense_log = false;
            GameManager_1.gm.data.server_data.mail_red_point = false;
        }
        for (var heroIndex = 0; heroIndex < tempHeroArray.length; heroIndex++) {
            GameManager_1.gm.ui.emit("set_item_battle_hero_operty", tempHeroArray[heroIndex].cellID, true);
            if (0 < deathHeroDataArray.length) {
                for (var deadHeroIndex = deathHeroDataArray.length - 1; 0 <= deadHeroIndex; deadHeroIndex--) {
                    if (deathHeroDataArray[deadHeroIndex].id == tempHeroArray[heroIndex].itemID) {
                        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(deathHeroDataArray[deadHeroIndex].id);
                        if (heroConfig) {
                            if (heroConfig.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                                GameManager_1.gm.data.mapCell_data.addSuperHeroData(tempHeroArray[heroIndex].itemID, tempHeroArray[heroIndex].cellID, 0);
                                GameManager_1.gm.ui.emit("item_children_refresh", tempHeroArray[heroIndex].cellID);
                                deathHeroDataArray.splice(deadHeroIndex, 1);
                                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [tempHeroArray[heroIndex].itemID, tempHeroArray[heroIndex].cellID, false]);
                                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
                            }
                            else {
                                GameManager_1.gm.data.mapCell_data.delCellItemByCellID(tempHeroArray[heroIndex].cellID);
                                GameManager_1.gm.ui.emit("item_children_refresh", tempHeroArray[heroIndex].cellID), deathHeroDataArray.splice(deadHeroIndex, 1);
                            }
                            break;
                        }
                    }
                }
            }
        }
        for (var aliveHeroIndex = 0; aliveHeroIndex < aliveHeroDataArray.length; aliveHeroIndex++) {
            var aliveHero = aliveHeroDataArray[aliveHeroIndex];
            if (aliveHero && aliveHero.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                for (var battleHeroIndex = 0; battleHeroIndex < tempHeroArray.length; battleHeroIndex++) {
                    var battleHero = tempHeroArray[battleHeroIndex];
                    if (aliveHero.id == battleHero.itemID) {
                        GameManager_1.gm.data.mapCell_data.addSuperHeroData(battleHero.itemID, battleHero.cellID, aliveHero.hp);
                        GameManager_1.gm.ui.emit("item_children_refresh", battleHero.cellID);
                        break;
                    }
                }
            }
        }
        GameManager_1.gm.data.fight_temp_data.get_all_result_data();
        this.refreshItem();
        this.node.getComponent(cc.Animation).play("ship_normal");
    };
    ShipMgr.prototype.refreshItem = function () {
        var _a;
        this.caseNode.active = false;
        this.rewardBattle.active = false;
        this.normalBattle.active = false;
        if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE] && GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].buildLvl > 0) {
            this.caseNode.active = GameManager_1.gm.data.mapCell_data._warehouseList.length > 0;
            if (!GameManager_1.gm.data.mapCell_data.isGuide && GameManager_1.gm.data.mapCell_data.isFirstBattle) {
                this.rewardBattle.active = true;
            }
            else {
                this.normalBattle.active = true;
            }
            if ((_a = this.caseNode) === null || _a === void 0 ? void 0 : _a.active) {
                Utils_1.Utils.set_sprite_state(this.normalBattle, cc.Sprite.State.GRAY);
            }
            else {
                Utils_1.Utils.set_sprite_state(this.normalBattle, cc.Sprite.State.NORMAL);
            }
        }
    };
    ShipMgr.prototype.onClickShip = function () {
        var _a;
        if (GameManager_1.gm.data.mapCell_data.isGuide && GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID != 13) {
            return;
        }
        if ((_a = this.caseNode) === null || _a === void 0 ? void 0 : _a.active) {
            GameManager_1.gm.ui.show_notice("Hãy dỡ hàng trên tàu trước khi chiến đấu!");
        }
        else if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE] && GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].buildLvl > 0) {
            if (GameManager_1.gm.data.mapCell_data.isGuide) {
                GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                    guideid: 10,
                    guidedesc: cc.js.formatStr("10.Nhấp vào nút Đột kích trên tàu")
                });
                GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
            }
            var t = !GameManager_1.gm.data.mapCell_data.isGuide && GameManager_1.gm.data.mapCell_data.isFirstBattle ? 3 : 1;
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, t);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
        }
    };
    ShipMgr.prototype.revenge = function (targetUid) {
        var _a;
        if ((_a = this.caseNode) === null || _a === void 0 ? void 0 : _a.active) {
            GameManager_1.gm.ui.show_notice("Hãy dỡ hàng trên tàu trước khi chiến đấu!");
        }
        else if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE] && GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].buildLvl > 0) {
            GameManager_1.gm.data.mail_temp_data.target_uid = targetUid;
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, 1);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
        }
    };
    ShipMgr.prototype.shipPlayAnim = function (animType) {
        if (animType == 1) {
            this.btnShip.interactable = false;
            this.normalBattle.getComponent(cc.Button).interactable = false;
            this.rewardBattle.getComponent(cc.Button).interactable = false;
            this.node.getComponent(cc.Animation).play("ship_out");
        }
        else if (animType == 2) {
            this.btnShip.interactable = false;
            this.normalBattle.getComponent(cc.Button).interactable = false;
            this.rewardBattle.getComponent(cc.Button).interactable = false;
            this.node.getComponent(cc.Animation).play("ship_in");
        }
    };
    ShipMgr.prototype.onDestroy = function () {
        GameManager_1.gm.ui.off("ship_goods_change", this.refreshItem, this);
        GameManager_1.gm.ui.off("ship_play_anim", this.shipPlayAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimFinishCb, this);
    };
    __decorate([
        property(cc.Node)
    ], ShipMgr.prototype, "caseNode", void 0);
    __decorate([
        property(cc.Node)
    ], ShipMgr.prototype, "normalBattle", void 0);
    __decorate([
        property(cc.Node)
    ], ShipMgr.prototype, "rewardBattle", void 0);
    __decorate([
        property(cc.Button)
    ], ShipMgr.prototype, "btnShip", void 0);
    ShipMgr = __decorate([
        ccclass
    ], ShipMgr);
    return ShipMgr;
}(NodePoolItem_1.NodePoolItem));
exports.default = ShipMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNoaXBNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLHlDQUEwRDtBQUMxRCw2Q0FBbUM7QUFDbkMsaUNBQWdDO0FBQ2hDLHVDQUFzQztBQUN0QywrQ0FBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0IsMkJBQVk7SUFBbEM7UUFBQSxxRUFtTUM7UUFqTVcsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsa0JBQVksR0FBbUIsSUFBSSxDQUFDO1FBR3BDLGtCQUFZLEdBQW1CLElBQUksQ0FBQztRQUdwQyxhQUFPLEdBQXFCLElBQUksQ0FBQzs7SUF3TDdDLENBQUM7SUF0TGEsd0JBQU0sR0FBaEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVTLDBCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUztZQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFTyxrQ0FBZ0IsR0FBeEIsVUFBeUIsU0FBaUIsRUFBRSxLQUF1QjtRQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDOUQsSUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7YUFBTSxJQUFJLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFTyw4QkFBWSxHQUFwQjtRQUNJLElBQU0sT0FBTyxHQUFHLG1CQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ2QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ3JCLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUMzQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUN0QjtpQkFBTTtnQkFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsbURBQW1ELENBQUMsQ0FBQzthQUMxRTtTQUNKO2FBQU0sSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ3JCLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMxQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFTyxnQ0FBYyxHQUF0QjtRQUNJLElBQU0sYUFBYSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRSxJQUFNLGtCQUFrQixHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzRixJQUFNLGtCQUFrQixHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztRQUUzRixrQkFBa0IsQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBTSxTQUFTLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLHlCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEYsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqRixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0M7U0FDSjtRQUVELElBQUksQ0FBQyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDN0gsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUU7WUFDekMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3pDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDaEQsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFFRCxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUNuRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksYUFBYSxFQUFFLGFBQWEsRUFBRSxFQUFFO29CQUN6RixJQUFJLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFO3dCQUN6RSxJQUFNLFVBQVUsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RixJQUFJLFVBQVUsRUFBRTs0QkFDWixJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksd0JBQVksQ0FBQyxlQUFlLEVBQUU7Z0NBQ3RELGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQzNHLGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3JFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQzVDLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQzNILGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZCQUVoRDtpQ0FBTTtnQ0FDSCxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUMxRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQ3JIOzRCQUNELE1BQU07eUJBQ1Q7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsS0FBSyxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUUsY0FBYyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRTtZQUN2RixJQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRCxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLHdCQUFZLENBQUMsZUFBZSxFQUFFO2dCQUNsRSxLQUFLLElBQUksZUFBZSxHQUFHLENBQUMsRUFBRSxlQUFlLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRTtvQkFDckYsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLFNBQVMsQ0FBQyxFQUFFLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTt3QkFDbkMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQzFGLGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3ZELE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLDZCQUFXLEdBQWxCOztRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWpDLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyx5QkFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyx5QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNqSixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtnQkFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNuQztZQUVELFVBQUksSUFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSxFQUFFO2dCQUN2QixhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCxhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRTtTQUNKO0lBQ0wsQ0FBQztJQUVNLDZCQUFXLEdBQWxCOztRQUNJLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7WUFDaEYsT0FBTztTQUNWO1FBQ0QsVUFBSSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxNQUFNLEVBQUU7WUFDdkIsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDbEU7YUFBTSxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDeEosSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO2dCQUM5QixnQkFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3pDLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDbEUsQ0FBQyxDQUFDO2dCQUNILGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsSUFBTSxDQUFDLEdBQVcsQ0FBQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlGLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hELGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVNLHlCQUFPLEdBQWQsVUFBZSxTQUFpQjs7UUFDNUIsVUFBSSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxNQUFNLEVBQUU7WUFDdkIsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDbEU7YUFBTSxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDeEosZ0JBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDOUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBRU8sOEJBQVksR0FBcEIsVUFBcUIsUUFBZ0I7UUFDakMsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekQ7YUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRVMsMkJBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0csQ0FBQztJQWhNRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNzQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUMwQjtJQUc1QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUMwQjtJQUc1QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNxQjtJQVh2QyxPQUFPO1FBRFosT0FBTztPQUNGLE9BQU8sQ0FtTVo7SUFBRCxjQUFDO0NBbk1ELEFBbU1DLENBbk1xQiwyQkFBWSxHQW1NakM7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSwgSGVyb1R5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gJy4vVGVtcERhdGEnO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgU2hpcE1nciBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2FzZU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbm9ybWFsQmF0dGxlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJld2FyZEJhdHRsZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJ0blNoaXA6IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub24oXCJzaGlwX2dvb2RzX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hJdGVtLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInNoaXBfcGxheV9hbmltXCIsIHRoaXMuc2hpcFBsYXlBbmltLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgdGhpcy5wbGF5QW5pbUZpbmlzaENiLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idG5TaGlwLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxCYXR0bGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJld2FyZEJhdHRsZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW0oKTtcclxuICAgICAgICBpZiAoISh0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikuZ2V0QW5pbWF0aW9uU3RhdGUoXCJzaGlwX291dFwiKS5pc1BsYXlpbmcgfHxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldEFuaW1hdGlvblN0YXRlKFwic2hpcF9pblwiKS5pc1BsYXlpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwic2hpcF9ub3JtYWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheUFuaW1GaW5pc2hDYihhbmltYXRpb246IHN0cmluZywgZXZlbnQ6IHsgbmFtZTogc3RyaW5nIH0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ0blNoaXAuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vcm1hbEJhdHRsZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmV3YXJkQmF0dGxlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKFwic2hpcF9vdXRcIiA9PSBldmVudC5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcE91dEZpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcInNoaXBfaW5cIiA9PSBldmVudC5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcEluR2V0R29vZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaGlwT3V0RmlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWFwVHlwZSA9IFRlbXBEYXRhLm1hcF90eXBlO1xyXG4gICAgICAgIGNjLmxvZyhtYXBUeXBlICsgXCIgICAgICAgICAgbWFwVHlwZVwiKTtcclxuICAgICAgICBpZiAoMSA9PSBtYXBUeXBlKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1hdGNoX2ZpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgyID09IG1hcFR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1hdGNoX2NhdmVzX21hcCgpKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2ZpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIsSQw6MgxJHhuqF0IGPhuqVwIMSR4buZIGNhbyBuaOG6pXQsIGjDo3kgY2jhu50gY+G6pXAgxJHhu5kgdGnhur9wIHRoZW8hXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICgzID09IG1hcFR5cGUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWF0Y2hfaGFwcHlfbWFwKCk7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfZmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaGlwSW5HZXRHb29kcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0ZW1wSGVyb0FycmF5ID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXk7XHJcbiAgICAgICAgY29uc3QgZGVhdGhIZXJvRGF0YUFycmF5ID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZmlnaHRfcmVzdWx0X2RhdGEuZGVhdGhfaGVyb19kYXRhX2FycmF5O1xyXG4gICAgICAgIGNvbnN0IGFsaXZlSGVyb0RhdGFBcnJheSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmZpZ2h0X3Jlc3VsdF9kYXRhLmFsaXZlX2hlcm9fZGF0YV9hcnJheTtcclxuXHJcbiAgICAgICAgZGVhdGhIZXJvRGF0YUFycmF5Lmxlbmd0aDtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdG93ZXJEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRSk7XHJcbiAgICAgICAgICAgIGlmICh0b3dlckRhdGEgJiYgMiA8PSB0b3dlckRhdGEuYnVpbGRMdmwgJiYgZ20uZGF0YS5maWdodF9kYXRhLmZpZ2h0X2NvdW50ICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LlN1cGVyUmVjcnVpdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgyIDwgZ20uZGF0YS5maWdodF9kYXRhLmZpZ2h0X2NvdW50ICYmIGdtLmRhdGEuZmlnaHRfZGF0YS5maWdodF9jb3VudCAlIDMgPT0gMSAmJiAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ3VpZGVHaWZ0Lmd1aWRlSXNHZXQpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HVUlERUdJRlQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdtLmRhdGEuc2VydmVyX2RhdGEuaGFzX25ld19kZWZlbnNlX2xvZykge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0Lk1haWxMb2dOb3RpY2UpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnNlcnZlcl9kYXRhLmhhc19uZXdfZGVmZW5zZV9sb2cgPSBmYWxzZTtcclxuICAgICAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5tYWlsX3JlZF9wb2ludCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb0luZGV4ID0gMDsgaGVyb0luZGV4IDwgdGVtcEhlcm9BcnJheS5sZW5ndGg7IGhlcm9JbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJzZXRfaXRlbV9iYXR0bGVfaGVyb19vcGVydHlcIiwgdGVtcEhlcm9BcnJheVtoZXJvSW5kZXhdLmNlbGxJRCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICgwIDwgZGVhdGhIZXJvRGF0YUFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZGVhZEhlcm9JbmRleCA9IGRlYXRoSGVyb0RhdGFBcnJheS5sZW5ndGggLSAxOyAwIDw9IGRlYWRIZXJvSW5kZXg7IGRlYWRIZXJvSW5kZXgtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWF0aEhlcm9EYXRhQXJyYXlbZGVhZEhlcm9JbmRleF0uaWQgPT0gdGVtcEhlcm9BcnJheVtoZXJvSW5kZXhdLml0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChkZWF0aEhlcm9EYXRhQXJyYXlbZGVhZEhlcm9JbmRleF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9Db25maWcuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRTdXBlckhlcm9EYXRhKHRlbXBIZXJvQXJyYXlbaGVyb0luZGV4XS5pdGVtSUQsIHRlbXBIZXJvQXJyYXlbaGVyb0luZGV4XS5jZWxsSUQsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgdGVtcEhlcm9BcnJheVtoZXJvSW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVhdGhIZXJvRGF0YUFycmF5LnNwbGljZShkZWFkSGVyb0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuU1VQRVJIRVJPT1Aua2V5LCBbdGVtcEhlcm9BcnJheVtoZXJvSW5kZXhdLml0ZW1JRCwgdGVtcEhlcm9BcnJheVtoZXJvSW5kZXhdLmNlbGxJRCwgZmFsc2VdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5TVVBFUkhFUk9PUClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbENlbGxJdGVtQnlDZWxsSUQodGVtcEhlcm9BcnJheVtoZXJvSW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCB0ZW1wSGVyb0FycmF5W2hlcm9JbmRleF0uY2VsbElEKSwgZGVhdGhIZXJvRGF0YUFycmF5LnNwbGljZShkZWFkSGVyb0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBhbGl2ZUhlcm9JbmRleCA9IDA7IGFsaXZlSGVyb0luZGV4IDwgYWxpdmVIZXJvRGF0YUFycmF5Lmxlbmd0aDsgYWxpdmVIZXJvSW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBhbGl2ZUhlcm8gPSBhbGl2ZUhlcm9EYXRhQXJyYXlbYWxpdmVIZXJvSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoYWxpdmVIZXJvICYmIGFsaXZlSGVyby5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYmF0dGxlSGVyb0luZGV4ID0gMDsgYmF0dGxlSGVyb0luZGV4IDwgdGVtcEhlcm9BcnJheS5sZW5ndGg7IGJhdHRsZUhlcm9JbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmF0dGxlSGVybyA9IHRlbXBIZXJvQXJyYXlbYmF0dGxlSGVyb0luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxpdmVIZXJvLmlkID09IGJhdHRsZUhlcm8uaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFN1cGVySGVyb0RhdGEoYmF0dGxlSGVyby5pdGVtSUQsIGJhdHRsZUhlcm8uY2VsbElELCBhbGl2ZUhlcm8uaHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGJhdHRsZUhlcm8uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfYWxsX3Jlc3VsdF9kYXRhKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSXRlbSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwic2hpcF9ub3JtYWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hJdGVtKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FzZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRCYXR0bGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxCYXR0bGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRV0gJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEVdLmJ1aWxkTHZsID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VOb2RlLmFjdGl2ZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLl93YXJlaG91c2VMaXN0Lmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIGlmICghZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0ZpcnN0QmF0dGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZEJhdHRsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxCYXR0bGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FzZU5vZGU/LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZSh0aGlzLm5vcm1hbEJhdHRsZSwgY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZSh0aGlzLm5vcm1hbEJhdHRsZSwgY2MuU3ByaXRlLlN0YXRlLk5PUk1BTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2tTaGlwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmd1aWRlSUQgIT0gMTMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jYXNlTm9kZT8uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiSMOjeSBk4buhIGjDoG5nIHRyw6puIHTDoHUgdHLGsOG7m2Mga2hpIGNoaeG6v24gxJHhuqV1IVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXSAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRV0uYnVpbGRMdmwgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBndWlkZWlkOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBndWlkZWRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIjEwLk5o4bqlcCB2w6BvIG7DunQgxJDhu5l0IGvDrWNoIHRyw6puIHTDoHVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrSGFuZEFuaW1EZWxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHQ6IG51bWJlciA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzRmlyc3RCYXR0bGUgPyAzIDogMTtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdPQkFUVExFLmtleSwgdCk7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdPQkFUVExFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJldmVuZ2UodGFyZ2V0VWlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jYXNlTm9kZT8uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiSMOjeSBk4buhIGjDoG5nIHRyw6puIHTDoHUgdHLGsOG7m2Mga2hpIGNoaeG6v24gxJHhuqV1IVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXSAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRV0uYnVpbGRMdmwgPiAwKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFpbF90ZW1wX2RhdGEudGFyZ2V0X3VpZCA9IHRhcmdldFVpZDtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdPQkFUVExFLmtleSwgMSk7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdPQkFUVExFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaGlwUGxheUFuaW0oYW5pbVR5cGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChhbmltVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU2hpcC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxCYXR0bGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkQmF0dGxlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcInNoaXBfb3V0XCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5pbVR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNoaXAuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9ybWFsQmF0dGxlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZEJhdHRsZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJzaGlwX2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm9mZihcInNoaXBfZ29vZHNfY2hhbmdlXCIsIHRoaXMucmVmcmVzaEl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcInNoaXBfcGxheV9hbmltXCIsIHRoaXMuc2hpcFBsYXlBbmltLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub2ZmKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsIHRoaXMucGxheUFuaW1GaW5pc2hDYiwgdGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXBNZ3I7XHJcbiJdfQ==