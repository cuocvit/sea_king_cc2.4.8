"use strict";
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