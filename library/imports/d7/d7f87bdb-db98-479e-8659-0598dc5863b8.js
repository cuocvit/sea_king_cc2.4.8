"use strict";
cc._RF.push(module, 'd7f87vb25hHnoZZBZjcWGO4', 'BuildUpgrade');
// start-scene/scripts/BuildUpgrade.ts

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
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuildUpgrade = /** @class */ (function (_super) {
    __extends(BuildUpgrade, _super);
    function BuildUpgrade() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemImg = null;
        _this.lblBuildName = null;
        _this.attrNode = [];
        _this.photoList = [];
        _this._curBuildCfg = null;
        _this.idList = [];
        _this.numList = [];
        return _this;
    }
    BuildUpgrade.prototype.initData = function (buildId) {
        this._curBuildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(buildId);
    };
    BuildUpgrade.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).play("buildUpgrade_open");
        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(GameManager_1.gm.const.openBuildID);
        if (buildConfig) {
            this._curBuildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(buildConfig.nextBuildID);
            if (this._curBuildCfg) {
                var modelPath = "res/build/" + this._curBuildCfg.model;
                Utils_1.Utils.async_set_sprite_frame(this.itemImg, Constants_1.BundleName.MAP, modelPath);
                this.lblBuildName.string = this._curBuildCfg.buildName + "  Lv." + this._curBuildCfg.buildLv;
                for (var index = 0; index < this.attrNode.length; index++) {
                    this.attrNode[index].active = false;
                }
                this.attrNode[0].active = 0 < this._curBuildCfg.hp;
                this.attrNode[0].children[1].getComponent(cc.Label).string = "Sinh mạng";
                this.attrNode[0].children[2].getComponent(cc.Label).string = this._curBuildCfg.hp + "";
                Utils_1.Utils.async_set_sprite_frame(this.attrNode[0].children[4].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_HP");
                this.attrNode[1].active = 0 < this._curBuildCfg.attack;
                this.attrNode[1].children[1].getComponent(cc.Label).string = "Phòng thủ";
                this.attrNode[1].children[2].getComponent(cc.Label).string = this._curBuildCfg.attack + "";
                Utils_1.Utils.async_set_sprite_frame(this.attrNode[1].children[4].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_Defense");
                this.attrNode[2].active = 0 < this._curBuildCfg.defense;
                this.attrNode[2].children[1].getComponent(cc.Label).string = "Tấn công";
                this.attrNode[2].children[2].getComponent(cc.Label).string = this._curBuildCfg.defense + "";
                Utils_1.Utils.async_set_sprite_frame(this.attrNode[2].children[4].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_Attackers");
                var reward = buildConfig.reward;
                var amount = buildConfig.amount;
                this.photoList[0].x = reward.length <= 1 ? 0 : -80;
                for (var index = 0; index < this.photoList.length; index++) {
                    this.idList = reward;
                    this.numList = amount;
                    this.photoList[index].active = false;
                    if (reward.length > index) {
                        this.photoList[index].active = true;
                        if (3e4 < reward[index]) {
                            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(reward[index]);
                            if (heroConfig) {
                                Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
                                Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + heroConfig.icon);
                            }
                        }
                        else {
                            var heroConfig = GameManager_1.gm.data.config_data.getItemCfgByID(reward[index]);
                            if (heroConfig) {
                                Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + (0 == heroConfig.lv ? 1 : heroConfig.lv));
                                if (11002 == heroConfig.id || 11003 == heroConfig.id || 11006 == heroConfig.id) {
                                    Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/rewardIcon/" + heroConfig.icon);
                                }
                                else {
                                    Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + heroConfig.icon);
                                }
                            }
                            this.photoList[index].children[2].getComponent(cc.Label).string = "x" + buildConfig.amount[index];
                        }
                    }
                }
            }
        }
    };
    BuildUpgrade.prototype.onClickClose = function () {
        this.node.getComponent(cc.Animation).play("buildUpgrade_close");
        this.getReward();
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BUILD_UPGRADE);
        if (this._curBuildCfg && this._curBuildCfg.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE) {
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BARRACKS_LIST);
        }
    };
    BuildUpgrade.prototype.onClickWatchAd = function () {
        GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
    };
    BuildUpgrade.prototype.watchAdCb = function () {
        this.node.getComponent(cc.Animation).play("buildUpgrade_close");
        this.getReward(10);
        console.log("this._curBuildCfg", this._curBuildCfg);
        if (this._curBuildCfg) {
            GameManager_1.gm.channel.report_event("building_upgrade_video_receive", {
                event_desc: "建筑升级视频领取奖励",
                desc: "%s建筑升级到Lv.%d视频领取奖励",
                building_name: this._curBuildCfg.buildName,
                level: this._curBuildCfg.buildLv
            });
            NetUtils_1.ReportData.instance.report_once_point(10861);
            NetUtils_1.ReportData.instance.report_point(10862);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BUILD_UPGRADE);
            if (this._curBuildCfg.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE) {
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BARRACKS_LIST);
            }
        }
    };
    BuildUpgrade.prototype.getReward = function (multiplier) {
        if (multiplier === void 0) { multiplier = 1; }
        var goldAmount = 0;
        var diamondAmount = 0;
        var barrelAmount = 0;
        var rewards = [];
        for (var n = 0; n < this.idList.length; n++) {
            if (this.idList[n] == Constants_1.RewardIdEnum.GOLD) {
                goldAmount += this.numList[n] * multiplier;
                GameManager_1.gm.ui.show_coin_fly(this.idList[n], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (this.idList[n] == Constants_1.RewardIdEnum.DIAMOND) {
                diamondAmount += this.numList[n] * multiplier;
                GameManager_1.gm.ui.show_coin_fly(this.idList[n], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (this.idList[n] == Constants_1.RewardIdEnum.BARREL) {
                barrelAmount += this.numList[n] * multiplier;
                GameManager_1.gm.ui.show_coin_fly(this.idList[n], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), barrelAmount, GameManager_1.gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else {
                for (var r = 0; r < this.numList[n] * multiplier; r++) {
                    rewards.push(this.idList[n]);
                }
            }
        }
        if (barrelAmount > 0) {
            GameManager_1.gm.data.mapCell_data.addBarrelNum(barrelAmount);
        }
        if (goldAmount > 0) {
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, goldAmount);
        }
        if (diamondAmount > 0) {
            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, diamondAmount);
        }
        if (rewards.length > 0) {
            GameManager_1.gm.data.mapCell_data.addWareHouseList(rewards);
            GameManager_1.gm.data.mapCell_data.async_write_data();
        }
    };
    BuildUpgrade.prototype.onDisable = function () {
        if (this._curBuildCfg) {
            var nextBuildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(this._curBuildCfg.nextBuildID);
            if (this._curBuildCfg.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE && nextBuildConfig && nextBuildConfig.rate.length >= 0) {
                cc.Canvas.instance.scheduleOnce(function () {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GetReel.key, true);
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GetReel);
                }, 0.1);
            }
            else if (this._curBuildCfg.buildType == Constants_1.BuildTypeEnum.TOWER_TYPE) {
                for (var e in GameManager_1.gm.const.localCloudAreaList) {
                    if (this._curBuildCfg.buildLv == GameManager_1.gm.const.localCloudAreaList[e].lvl) {
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.UNLOCKAREACLOUDOP.key, parseInt(e));
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.UNLOCKAREACLOUDOP);
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BuildUpgrade.prototype, "itemImg", void 0);
    __decorate([
        property(cc.Label)
    ], BuildUpgrade.prototype, "lblBuildName", void 0);
    __decorate([
        property([cc.Node])
    ], BuildUpgrade.prototype, "attrNode", void 0);
    __decorate([
        property([cc.Node])
    ], BuildUpgrade.prototype, "photoList", void 0);
    BuildUpgrade = __decorate([
        ccclass
    ], BuildUpgrade);
    return BuildUpgrade;
}(cc.Component));
exports.default = BuildUpgrade;

cc._RF.pop();