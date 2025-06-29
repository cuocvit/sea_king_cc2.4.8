
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BuildUpgrade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJ1aWxkVXBncmFkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04saUNBQWdDO0FBQ2hDLHlDQUFzRjtBQUN0Riw2Q0FBbUM7QUFDbkMsdUNBQXdDO0FBR2xDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJCLGdDQUFZO0lBQXZDO1FBQUEscUVBOEtDO1FBNUtXLGFBQU8sR0FBcUIsSUFBSSxDQUFDO1FBR2pDLGtCQUFZLEdBQW9CLElBQUksQ0FBQztRQUdyQyxjQUFRLEdBQWMsRUFBRSxDQUFDO1FBR3pCLGVBQVMsR0FBYyxFQUFFLENBQUM7UUFFMUIsa0JBQVksR0FBaUIsSUFBSSxDQUFDO1FBQ2xDLFlBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsYUFBTyxHQUFhLEVBQUUsQ0FBQzs7SUErSm5DLENBQUM7SUE3SlcsK0JBQVEsR0FBaEIsVUFBaUIsT0FBZTtRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVTLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQy9ELElBQU0sV0FBVyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsSUFBSSxXQUFXLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxl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RSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUNwRCxPQUFPO3FCQUNWO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUEzS0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDcUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDMEI7SUFHN0M7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7a0RBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7bURBQ2M7SUFYaEMsWUFBWTtRQURqQixPQUFPO09BQ0YsWUFBWSxDQThLakI7SUFBRCxtQkFBQztDQTlLRCxBQThLQyxDQTlLMEIsRUFBRSxDQUFDLFNBQVMsR0E4S3RDO0FBRUQsa0JBQWUsWUFBWSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEJ1aWxkVHlwZUVudW0sIFJld2FyZElkRW51bSwgQnVuZGxlTmFtZSwgU2V0SXRlbU51bUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgQnVpbGQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvYnVpbGRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBCdWlsZFVwZ3JhZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaXRlbUltZzogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxCdWlsZE5hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgYXR0ck5vZGU6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBwcml2YXRlIHBob3RvTGlzdDogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VyQnVpbGRDZmc6IEJ1aWxkIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGlkTGlzdDogbnVtYmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgbnVtTGlzdDogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhKGJ1aWxkSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2N1ckJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQoYnVpbGRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiYnVpbGRVcGdyYWRlX29wZW5cIik7XHJcbiAgICAgICAgY29uc3QgYnVpbGRDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChnbS5jb25zdC5vcGVuQnVpbGRJRCk7XHJcbiAgICAgICAgaWYgKGJ1aWxkQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQoYnVpbGRDb25maWcubmV4dEJ1aWxkSUQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyQnVpbGRDZmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsUGF0aCA9IFwicmVzL2J1aWxkL1wiICsgdGhpcy5fY3VyQnVpbGRDZmcubW9kZWw7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaXRlbUltZywgQnVuZGxlTmFtZS5NQVAsIG1vZGVsUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibEJ1aWxkTmFtZS5zdHJpbmcgPSB0aGlzLl9jdXJCdWlsZENmZy5idWlsZE5hbWUgKyBcIiAgTHYuXCIgKyB0aGlzLl9jdXJCdWlsZENmZy5idWlsZEx2O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmF0dHJOb2RlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMF0uYWN0aXZlID0gMCA8IHRoaXMuX2N1ckJ1aWxkQ2ZnLmhwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiU2luaCBt4bqhbmdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMF0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLl9jdXJCdWlsZENmZy5ocCArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuYXR0ck5vZGVbMF0uY2hpbGRyZW5bNF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9hdHRySWNvbi9QZXJrX0hQXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsxXS5hY3RpdmUgPSAwIDwgdGhpcy5fY3VyQnVpbGRDZmcuYXR0YWNrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGjDsm5nIHRo4bunXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzFdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fY3VyQnVpbGRDZmcuYXR0YWNrICsgXCJcIjtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5hdHRyTm9kZVsxXS5jaGlsZHJlbls0XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2F0dHJJY29uL1BlcmtfRGVmZW5zZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMl0uYWN0aXZlID0gMCA8IHRoaXMuX2N1ckJ1aWxkQ2ZnLmRlZmVuc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzJdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJU4bqlbiBjw7RuZ1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsyXS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuX2N1ckJ1aWxkQ2ZnLmRlZmVuc2UgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmF0dHJOb2RlWzJdLmNoaWxkcmVuWzRdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvYXR0ckljb24vUGVya19BdHRhY2tlcnNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gYnVpbGRDb25maWcucmV3YXJkIGFzIG51bWJlcltdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW1vdW50ID0gYnVpbGRDb25maWcuYW1vdW50IGFzIG51bWJlcltdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waG90b0xpc3RbMF0ueCA9IHJld2FyZC5sZW5ndGggPD0gMSA/IDAgOiAtODA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucGhvdG9MaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWRMaXN0ID0gcmV3YXJkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtTGlzdCA9IGFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBob3RvTGlzdFtpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJld2FyZC5sZW5ndGggPiBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBob3RvTGlzdFtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDNlNCA8IHJld2FyZFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHJld2FyZFtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucGhvdG9MaXN0W2luZGV4XS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2NvbG9yX1wiICsgaGVyb0NvbmZpZy5sdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnBob3RvTGlzdFtpbmRleF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGhlcm9Db25maWcuaWNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChyZXdhcmRbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnBob3RvTGlzdFtpbmRleF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9jb2xvcl9cIiArICgwID09IGhlcm9Db25maWcubHYgPyAxIDogaGVyb0NvbmZpZy5sdikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxMTAwMiA9PSBoZXJvQ29uZmlnLmlkIHx8IDExMDAzID09IGhlcm9Db25maWcuaWQgfHwgMTEwMDYgPT0gaGVyb0NvbmZpZy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucGhvdG9MaXN0W2luZGV4XS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL3Jld2FyZEljb24vXCIgKyBoZXJvQ29uZmlnLmljb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5waG90b0xpc3RbaW5kZXhdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBoZXJvQ29uZmlnLmljb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGhvdG9MaXN0W2luZGV4XS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYnVpbGRDb25maWcuYW1vdW50W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJidWlsZFVwZ3JhZGVfY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5nZXRSZXdhcmQoKTtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5CVUlMRF9VUEdSQURFKTtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQnVpbGRDZmcgJiYgdGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uQkFSUkFDS1NfVFlQRSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5CQVJSQUNLU19MSVNUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1dhdGNoQWQoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKHRoaXMud2F0Y2hBZENiLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhdGNoQWRDYigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJ1aWxkVXBncmFkZV9jbG9zZVwiKTtcclxuICAgICAgICB0aGlzLmdldFJld2FyZCgxMCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9jdXJCdWlsZENmZ1wiLCB0aGlzLl9jdXJCdWlsZENmZyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckJ1aWxkQ2ZnKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwiYnVpbGRpbmdfdXBncmFkZV92aWRlb19yZWNlaXZlXCIsIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi5bu6562R5Y2H57qn6KeG6aKR6aKG5Y+W5aWW5YqxXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIiVz5bu6562R5Y2H57qn5YiwTHYuJWTop4bpopHpooblj5blpZblirFcIixcclxuICAgICAgICAgICAgICAgIGJ1aWxkaW5nX25hbWU6IHRoaXMuX2N1ckJ1aWxkQ2ZnLmJ1aWxkTmFtZSxcclxuICAgICAgICAgICAgICAgIGxldmVsOiB0aGlzLl9jdXJCdWlsZENmZy5idWlsZEx2XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODYxKTtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA4NjIpO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5CVUlMRF9VUEdSQURFKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1ckJ1aWxkQ2ZnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLkJBUlJBQ0tTX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkJBUlJBQ0tTX0xJU1QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJld2FyZChtdWx0aXBsaWVyOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGdvbGRBbW91bnQgPSAwO1xyXG4gICAgICAgIGxldCBkaWFtb25kQW1vdW50ID0gMDtcclxuICAgICAgICBsZXQgYmFycmVsQW1vdW50ID0gMDtcclxuICAgICAgICBjb25zdCByZXdhcmRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5pZExpc3QubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaWRMaXN0W25dID09IFJld2FyZElkRW51bS5HT0xEKSB7XHJcbiAgICAgICAgICAgICAgICBnb2xkQW1vdW50ICs9IHRoaXMubnVtTGlzdFtuXSAqIG11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KHRoaXMuaWRMaXN0W25dLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWRMaXN0W25dID09IFJld2FyZElkRW51bS5ESUFNT05EKSB7XHJcbiAgICAgICAgICAgICAgICBkaWFtb25kQW1vdW50ICs9IHRoaXMubnVtTGlzdFtuXSAqIG11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KHRoaXMuaWRMaXN0W25dLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWRMaXN0W25dID09IFJld2FyZElkRW51bS5CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgIGJhcnJlbEFtb3VudCArPSB0aGlzLm51bUxpc3Rbbl0gKiBtdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseSh0aGlzLmlkTGlzdFtuXSwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pLCBiYXJyZWxBbW91bnQsIGdtLnVpLm1hcE1haW5VSS5iYXJyZWxOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgdGhpcy5udW1MaXN0W25dICogbXVsdGlwbGllcjsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkcy5wdXNoKHRoaXMuaWRMaXN0W25dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmFycmVsQW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRCYXJyZWxOdW0oYmFycmVsQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdvbGRBbW91bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIGdvbGRBbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlhbW9uZEFtb3VudCA+IDApIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgZGlhbW9uZEFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXdhcmRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkV2FyZUhvdXNlTGlzdChyZXdhcmRzKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQnVpbGRDZmcpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dEJ1aWxkQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5fY3VyQnVpbGRDZmcubmV4dEJ1aWxkSUQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uQkFSUkFDS1NfVFlQRSAmJiBuZXh0QnVpbGRDb25maWcgJiYgbmV4dEJ1aWxkQ29uZmlnLnJhdGUubGVuZ3RoID49IDApIHtcclxuICAgICAgICAgICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HZXRSZWVsLmtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR2V0UmVlbCk7XHJcbiAgICAgICAgICAgICAgICB9LCAwLjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1ckJ1aWxkQ2ZnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZSBpbiBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRMdiA9PSBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbZV0ubHZsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5VTkxPQ0tBUkVBQ0xPVURPUC5rZXksIHBhcnNlSW50KGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuVU5MT0NLQVJFQUNMT1VET1ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWlsZFVwZ3JhZGU7Il19