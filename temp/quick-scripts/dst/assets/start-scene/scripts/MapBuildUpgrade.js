
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MapBuildUpgrade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6dd10MQS9pOG6URr41DSjaG', 'MapBuildUpgrade');
// start-scene/scripts/MapBuildUpgrade.ts

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
exports.MapBuildUpgrade = void 0;
// +-+
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapBuildUpgrade = /** @class */ (function (_super) {
    __extends(MapBuildUpgrade, _super);
    function MapBuildUpgrade() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblName = null;
        _this.lblNextLvl = null;
        _this.meterialNode = [];
        _this.lblBuildName = null;
        _this.lblCoin = null;
        _this.btnSprList = [];
        _this.btnSpr = null;
        _this._curBuildCfg = null;
        _this._buildData = null;
        _this._matraEnough = true;
        _this._tempList = [];
        return _this;
    }
    MapBuildUpgrade.prototype.initData = function (buildId, cellID) {
        this._curBuildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(buildId);
        this._buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
    };
    MapBuildUpgrade.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("coin_change", this.refreshCoin, this);
        GameManager_1.gm.ui.on("build_metarail_change", this.refreshPanel, this);
        GameManager_1.gm.ui.on("update_build_upgrade", this.updateUpgrade, this);
        this.refreshPanel();
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_4_UPGRADE_OPEN);
    };
    MapBuildUpgrade.prototype.updateUpgrade = function () {
        this.refreshPanel();
    };
    MapBuildUpgrade.prototype.refreshCoin = function () {
        var _a;
        this.lblCoin.string = (_a = this._buildData) === null || _a === void 0 ? void 0 : _a.upNeedCoin.toString();
        this.lblCoin.node.color = cc.Color.RED;
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum >= this._buildData.upNeedCoin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    };
    MapBuildUpgrade.prototype.refreshPanel = function () {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curBuildCfg) {
            this._buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
            if (this._buildData) {
                this.lblName.string = this._curBuildCfg.buildName;
                this.lblNextLvl.string = "（Nâng lên cấp " + (this._curBuildCfg.buildLv + 1) + ")";
                for (var index_1 = 0; index_1 < this.meterialNode.length; index_1++) {
                    this.meterialNode[index_1].active = false;
                }
                var index = 0;
                for (var key in this._buildData.metrailData) {
                    this.meterialNode[index].active = true;
                    this.meterialNode[index].children[1].getComponent(cc.Label).string = this._buildData.metrailData[key].cur + "/" + this._buildData.metrailData[key].max;
                    var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this._buildData.metrailData[key].id);
                    if (itemConfig) {
                        Utils_1.Utils.async_set_sprite_frame(this.meterialNode[index].children[0].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemConfig.icon);
                        this._tempList.push(parseInt(key));
                        if (this._buildData.metrailData[key].cur >= this._buildData.metrailData[key].max) {
                            (this.meterialNode[index].children[2].active = !1,
                                this.meterialNode[index].children[3].active = !0,
                                this.meterialNode[index].color = cc.Color.BLACK.fromHEX("#86cbB4e"));
                        }
                        else {
                            this._matraEnough = false;
                            this.meterialNode[index].color = cc.Color.WHITE;
                            this.meterialNode[index].children[2].active = true;
                            this.meterialNode[index].children[3].active = false;
                            this.meterialNode[index].children[2].children[0].width = this._buildData.metrailData[key].cur / this._buildData.metrailData[key].max * 108;
                            var coinNum = GameManager_1.gm.data.mapCell_data.getCoinNum(parseInt(key), this._buildData.metrailData[key].id);
                            this.meterialNode[index].children[2].children[1].active = coinNum;
                            this.meterialNode[index].children[2].children[2].active = !coinNum;
                        }
                        index++;
                    }
                }
                this.btnSpr.spriteFrame = this._matraEnough ? this.btnSprList[1] : this.btnSprList[0];
                this.refreshCoin();
            }
        }
    };
    MapBuildUpgrade.prototype.onClickClose = function () {
        this.node.active = false;
    };
    MapBuildUpgrade.prototype.onClickAddMetrail = function (event, index) {
        var idx = parseInt(index);
        GameManager_1.gm.data.mapCell_data.onekeyGetAllMertrail(this._curBuildCfg.buildType, this._tempList[idx]);
        this.refreshPanel();
    };
    MapBuildUpgrade.prototype.onClickVideoAddMetrail = function (event, index) {
        var _this = this;
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            var selectedIndex_1 = parseInt(index);
            this._buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
            if (this._buildData) {
                var materialIndex = 0;
                var _loop_1 = function (materialKey) {
                    if (materialIndex == selectedIndex_1) {
                        var materialID_1 = this_1._buildData.metrailData[materialKey].id;
                        var itemAmount_1;
                        if (materialID_1 == Constants_1.RewardIdEnum.WOOD) {
                            itemAmount_1 = 108;
                        }
                        else if (materialID_1 == Constants_1.RewardIdEnum.IRON) {
                            itemAmount_1 = 78;
                        }
                        else {
                            itemAmount_1 = this_1._buildData.metrailData[materialKey].max - this_1._buildData.metrailData[materialKey].cur;
                        }
                        NetUtils_1.ReportData.instance.report_once_point(10537);
                        NetUtils_1.ReportData.instance.report_point(10538);
                        GameManager_1.gm.channel.show_video_ad(function () {
                            NetUtils_1.ReportData.instance.report_once_point(10637);
                            NetUtils_1.ReportData.instance.report_point(10638);
                            GameManager_1.gm.data.mapCell_data.addItem(materialID_1, itemAmount_1);
                            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                                idList: [materialID_1],
                                numList: [itemAmount_1]
                            });
                            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                            GameManager_1.gm.data.mapCell_data.onekeyGetAllMertrail(_this._curBuildCfg.buildType, _this._tempList[selectedIndex_1]);
                            _this.refreshPanel();
                        }, this_1);
                        return "break";
                    }
                    materialIndex++;
                };
                var this_1 = this;
                for (var materialKey in this._buildData.metrailData) {
                    var state_1 = _loop_1(materialKey);
                    if (state_1 === "break")
                        break;
                }
            }
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    MapBuildUpgrade.prototype.onClickUpgrade = function () {
        if (this._matraEnough && GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this._buildData.upNeedCoin) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
            return;
        }
        if (this._matraEnough) {
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_6_JIANZUSHEGNJI);
            this.scheduleOnce(function () {
                GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_7_BUILDING_UPGRADING);
            }, 0.5);
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this._buildData.upNeedCoin);
            GameManager_1.gm.ui.mapMainUI.playBuildUpgradeAnim(this._buildData.buildID);
            GameManager_1.gm.data.mapCell_data.upgradeBuild(this._buildData.buildID);
            this.node.active = false;
            var newBuildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
            if (newBuildData) {
                if (1 == newBuildData.buildLvl) {
                    if (!GameManager_1.gm.data.mapCell_data.isGuide) {
                        GameManager_1.gm.const.openBuildID = this._curBuildCfg.buildID;
                        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
                        if (buildData) {
                            var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
                            if (buildConfig) {
                                if (buildConfig.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BARRACKS_LIST);
                                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP.key, 2);
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP);
                                }
                                else if (buildConfig.buildType == Constants_1.BuildTypeEnum.STALL_TYPE) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Store);
                                }
                                else if (buildConfig.buildType == Constants_1.BuildTypeEnum.GARRISION_TYPE) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.DEFENSE);
                                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP.key, 3);
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP);
                                }
                                else if (buildConfig.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GOBATTLE);
                                }
                                else if (0 < buildConfig.buildLv) {
                                    if (buildConfig.buildType == Constants_1.BuildTypeEnum.WHARFTAX_TYPE) {
                                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP.key, 1);
                                        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP);
                                    }
                                    else if (buildConfig.buildType == Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE) {
                                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP.key, 4);
                                        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP);
                                    }
                                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BUILDINFO.key, buildConfig.buildID);
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BUILDINFO);
                                }
                            }
                        }
                    }
                    GameManager_1.gm.ui.emit("build_upgrade");
                    GameManager_1.gm.ui.emit("build_show_stateIcon", true);
                }
                else if (1 < newBuildData.buildLvl && !GameManager_1.gm.data.mapCell_data.isGuide) {
                    GameManager_1.gm.const.openBuildID = this._curBuildCfg.buildID;
                    var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
                    if (buildData) {
                        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
                        if (buildConfig) {
                            if (!(buildConfig.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE || buildConfig.buildType == Constants_1.BuildTypeEnum.STALL_TYPE)) {
                                if (buildConfig.buildType == Constants_1.BuildTypeEnum.GARRISION_TYPE) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.DEFENSE);
                                }
                                else if (buildConfig.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GOBATTLE);
                                }
                                else if (0 < buildConfig.buildLv) {
                                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BUILDINFO.key, buildConfig.buildID);
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BUILDINFO);
                                }
                            }
                        }
                    }
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BUILD_UPGRADE);
                    GameManager_1.gm.ui.emit("build_upgrade");
                    GameManager_1.gm.ui.emit("build_show_stateIcon", true);
                }
            }
        }
    };
    MapBuildUpgrade.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("coin_change", this.refreshCoin, this);
        GameManager_1.gm.ui.off("build_metarail_change", this.refreshPanel, this);
        GameManager_1.gm.ui.off("update_build_upgrade", this.updateUpgrade, this);
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_3_UPGRADE_CLOSE);
        GameManager_1.gm.ui.mapMainUI.setMapUiShow(true);
        GameManager_1.gm.ui.emit("build_show_stateIcon", true);
    };
    __decorate([
        property(cc.Label)
    ], MapBuildUpgrade.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], MapBuildUpgrade.prototype, "lblNextLvl", void 0);
    __decorate([
        property([cc.Node])
    ], MapBuildUpgrade.prototype, "meterialNode", void 0);
    __decorate([
        property(cc.Label)
    ], MapBuildUpgrade.prototype, "lblBuildName", void 0);
    __decorate([
        property(cc.Label)
    ], MapBuildUpgrade.prototype, "lblCoin", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], MapBuildUpgrade.prototype, "btnSprList", void 0);
    __decorate([
        property(cc.Sprite)
    ], MapBuildUpgrade.prototype, "btnSpr", void 0);
    MapBuildUpgrade = __decorate([
        ccclass
    ], MapBuildUpgrade);
    return MapBuildUpgrade;
}(cc.Component));
exports.MapBuildUpgrade = MapBuildUpgrade;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1hcEJ1aWxkVXBncmFkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLGlDQUFnQztBQUNoQyx5Q0FBc0Y7QUFDdEYsNkNBQW1DO0FBQ25DLHVDQUF3QztBQUdsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQyxtQ0FBWTtJQUFqRDtRQUFBLHFFQW1QQztRQWpQVyxhQUFPLEdBQW9CLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFvQixJQUFJLENBQUM7UUFHbkMsa0JBQVksR0FBYyxFQUFFLENBQUM7UUFHN0Isa0JBQVksR0FBb0IsSUFBSSxDQUFDO1FBR3JDLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGdCQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUdsQyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUVoQyxrQkFBWSxHQUFpQixJQUFJLENBQUM7UUFDbEMsZ0JBQVUsR0FBcUIsSUFBSSxDQUFDO1FBQ3BDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGVBQVMsR0FBYSxFQUFFLENBQUM7O0lBME5yQyxDQUFDO0lBeE5VLGtDQUFRLEdBQWYsVUFBZ0IsT0FBZSxFQUFFLE1BQWU7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVTLGtDQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELGdCQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELGdCQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sdUNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLHFDQUFXLEdBQW5COztRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxTQUFHLElBQUksQ0FBQyxVQUFVLDBDQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDdkMsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVPLHNDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkYsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBRWxGLEtBQUssSUFBSSxPQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFLLEVBQUUsRUFBRTtvQkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUMzQztnQkFFRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2QsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDdkosSUFBTSxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDM0YsSUFBSSxVQUFVLEVBQUU7d0JBQ1osYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsc0JBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDckksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTs0QkFDOUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dDQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dDQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTt5QkFDM0U7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7NEJBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzRCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzRCQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzRCQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOzRCQUUzSSxJQUFNLE9BQU8sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDcEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7NEJBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUM7eUJBQ3RFO3dCQUNELEtBQUssRUFBRSxDQUFDO3FCQUNYO2lCQUNKO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTthQUNyQjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHNDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFTywyQ0FBaUIsR0FBekIsVUFBMEIsS0FBZSxFQUFFLEtBQWE7UUFDcEQsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxnREFBc0IsR0FBOUIsVUFBK0IsS0FBZSxFQUFFLEtBQWE7UUFBN0QsaUJBd0NDO1FBdkNHLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLEVBQUU7WUFDN0MsSUFBTSxlQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkYsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7d0NBQ1gsV0FBVztvQkFDbEIsSUFBSSxhQUFhLElBQUksZUFBYSxFQUFFO3dCQUNoQyxJQUFNLFlBQVUsR0FBRyxPQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUMvRCxJQUFJLFlBQWtCLENBQUM7d0JBQ3ZCLElBQUksWUFBVSxJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFOzRCQUNqQyxZQUFVLEdBQUcsR0FBRyxDQUFDO3lCQUNwQjs2QkFBTSxJQUFJLFlBQVUsSUFBSSx3QkFBWSxDQUFDLElBQUksRUFBRTs0QkFDeEMsWUFBVSxHQUFHLEVBQUUsQ0FBQzt5QkFDbkI7NkJBQU07NEJBQ0gsWUFBVSxHQUFHLE9BQUssVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQzt5QkFDNUc7d0JBRUQscUJBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzdDLHFCQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEMsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDOzRCQUNyQixxQkFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDN0MscUJBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUN4QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVUsRUFBRSxZQUFVLENBQUMsQ0FBQzs0QkFDckQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0NBQzVDLE1BQU0sRUFBRSxDQUFDLFlBQVUsQ0FBQztnQ0FDcEIsT0FBTyxFQUFFLENBQUMsWUFBVSxDQUFDOzZCQUN4QixDQUFDLENBQUM7NEJBQ0gsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQzlDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLGVBQWEsQ0FBQyxDQUFDLENBQUM7NEJBQ3RHLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTt3QkFDdkIsQ0FBQyxTQUFPLENBQUM7O3FCQUVaO29CQUNELGFBQWEsRUFBRSxDQUFBOzs7Z0JBNUJuQixLQUFLLElBQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVzswQ0FBMUMsV0FBVzs7O2lCQTZCckI7YUFDSjtTQUNKO2FBQU07WUFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVPLHdDQUFjLEdBQXRCO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQzdGLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JELGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1lBQzdELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVSLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsMEJBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pHLGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBTSxZQUFZLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUYsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7d0JBQy9CLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzt3QkFDakQsSUFBTSxTQUFTLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZGLElBQUksU0FBUyxFQUFFOzRCQUNYLElBQU0sV0FBVyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMzRSxJQUFJLFdBQVcsRUFBRTtnQ0FDYixJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUkseUJBQWEsQ0FBQyxhQUFhLEVBQUU7b0NBQ3RELGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztvQ0FDekMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDMUQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUNBRWpEO3FDQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSx5QkFBYSxDQUFDLFVBQVUsRUFBRTtvQ0FDMUQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lDQUVwQztxQ0FBTSxJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUkseUJBQWEsQ0FBQyxjQUFjLEVBQUU7b0NBQzlELGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDbkMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDMUQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUNBRWpEO3FDQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSx5QkFBYSxDQUFDLGlCQUFpQixFQUFFO29DQUNqRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7aUNBRXZDO3FDQUFNLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUU7b0NBQ2hDLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSx5QkFBYSxDQUFDLGFBQWEsRUFBRTt3Q0FDdEQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3Q0FDMUQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUNBQ2pEO3lDQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSx5QkFBYSxDQUFDLG1CQUFtQixFQUFFO3dDQUNuRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dDQUUxRCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztxQ0FDakQ7b0NBQ0QsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNuRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7aUNBQ3hDOzZCQUNKO3lCQUNKO3FCQUNKO29CQUNELGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDNUIsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUU1QztxQkFBTSxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxJQUFJLENBQUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtvQkFDbkUsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO29CQUNqRCxJQUFNLFNBQVMsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxTQUFTLEVBQUU7d0JBQ1gsSUFBTSxXQUFXLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzNFLElBQUksV0FBVyxFQUFFOzRCQUNiLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUkseUJBQWEsQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSx5QkFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dDQUM5RyxJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUkseUJBQWEsQ0FBQyxjQUFjLEVBQUU7b0NBQ3ZELGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQ0FDdEM7cUNBQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxJQUFJLHlCQUFhLENBQUMsaUJBQWlCLEVBQUU7b0NBQ2pFLGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztpQ0FDdkM7cUNBQU0sSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRTtvQ0FDaEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNuRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7aUNBQ3hDOzZCQUNKO3lCQUNKO3FCQUNKO29CQUNELGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDekMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM1QixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzVDO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFUyxtQ0FBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNyRCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLGdCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBaFBEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ3FCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ3dCO0lBRzNDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3lEQUNpQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUMwQjtJQUc3QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNxQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt1REFDZTtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNvQjtJQXBCL0IsZUFBZTtRQUQzQixPQUFPO09BQ0ssZUFBZSxDQW1QM0I7SUFBRCxzQkFBQztDQW5QRCxBQW1QQyxDQW5Qb0MsRUFBRSxDQUFDLFNBQVMsR0FtUGhEO0FBblBZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUsIFJld2FyZElkRW51bSwgU2V0SXRlbU51bUVudW0sIEJ1aWxkVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgQnVpbGQgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9idWlsZCc7XHJcbmltcG9ydCB7IEJ1aWxkRGF0YSB9IGZyb20gJy4vTWFwQ2VsbENmZ0RhdGEnO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIE1hcEJ1aWxkVXBncmFkZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibE5hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxOZXh0THZsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBwcml2YXRlIG1ldGVyaWFsTm9kZTogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxCdWlsZE5hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxDb2luOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBidG5TcHJMaXN0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgYnRuU3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJCdWlsZENmZzogQnVpbGQgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J1aWxkRGF0YTogQnVpbGREYXRhIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tYXRyYUVub3VnaDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIF90ZW1wTGlzdDogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoYnVpbGRJZDogbnVtYmVyLCBjZWxsSUQ/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jdXJCdWlsZENmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKGJ1aWxkSWQpO1xyXG4gICAgICAgIHRoaXMuX2J1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZSh0aGlzLl9jdXJCdWlsZENmZy5idWlsZFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vbihcImNvaW5fY2hhbmdlXCIsIHRoaXMucmVmcmVzaENvaW4sIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIHRoaXMucmVmcmVzaFBhbmVsLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInVwZGF0ZV9idWlsZF91cGdyYWRlXCIsIHRoaXMudXBkYXRlVXBncmFkZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT180X1VQR1JBREVfT1BFTik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVVcGdyYWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ29pbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxibENvaW4uc3RyaW5nID0gdGhpcy5fYnVpbGREYXRhPy51cE5lZWRDb2luLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5sYmxDb2luLm5vZGUuY29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVDb2luRGF0YS5jb2luTnVtID49IHRoaXMuX2J1aWxkRGF0YS51cE5lZWRDb2luKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbi5ub2RlLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiNGRkQ1M0NcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hdHJhRW5vdWdoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90ZW1wTGlzdCA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJCdWlsZENmZykge1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1aWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYmxOYW1lLnN0cmluZyA9IHRoaXMuX2N1ckJ1aWxkQ2ZnLmJ1aWxkTmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGJsTmV4dEx2bC5zdHJpbmcgPSBcIu+8iE7Dom5nIGzDqm4gY+G6pXAgXCIgKyAodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRMdiArIDEpICsgXCIpXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubWV0ZXJpYWxOb2RlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhW2tleV0uY3VyICsgXCIvXCIgKyB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFba2V5XS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhW2tleV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvXCIgKyBpdGVtQ29uZmlnLmljb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZW1wTGlzdC5wdXNoKHBhcnNlSW50KGtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhW2tleV0uY3VyID49IHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtrZXldLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblsyXS5hY3RpdmUgPSAhMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVtpbmRleF0uY2hpbGRyZW5bM10uYWN0aXZlID0gITAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiM4NmNiQjRlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0cmFFbm91Z2ggPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVtpbmRleF0uY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblszXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblsyXS5jaGlsZHJlblswXS53aWR0aCA9IHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtrZXldLmN1ciAvIHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtrZXldLm1heCAqIDEwODtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2luTnVtID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0Q29pbk51bShwYXJzZUludChrZXkpLCB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFba2V5XS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVtpbmRleF0uY2hpbGRyZW5bMl0uY2hpbGRyZW5bMV0uYWN0aXZlID0gY29pbk51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblsyXS5jaGlsZHJlblsyXS5hY3RpdmUgPSAhY29pbk51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuU3ByLnNwcml0ZUZyYW1lID0gdGhpcy5fbWF0cmFFbm91Z2ggPyB0aGlzLmJ0blNwckxpc3RbMV0gOiB0aGlzLmJ0blNwckxpc3RbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb2luKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQWRkTWV0cmFpbChldmVudDogY2MuRXZlbnQsIGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpZHggPSBwYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub25la2V5R2V0QWxsTWVydHJhaWwodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlLCB0aGlzLl90ZW1wTGlzdFtpZHhdKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1ZpZGVvQWRkTWV0cmFpbChldmVudDogY2MuRXZlbnQsIGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SXNIYXZlU3BlY2VDZWxsSUQoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gcGFyc2VJbnQoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1aWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGVyaWFsSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtYXRlcmlhbEtleSBpbiB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxJbmRleCA9PSBzZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSUQgPSB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbbWF0ZXJpYWxLZXldLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbUFtb3VudDogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxJRCA9PSBSZXdhcmRJZEVudW0uV09PRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUFtb3VudCA9IDEwODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbElEID09IFJld2FyZElkRW51bS5JUk9OKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQW1vdW50ID0gNzg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQW1vdW50ID0gdGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhW21hdGVyaWFsS2V5XS5tYXggLSB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbbWF0ZXJpYWxLZXldLmN1cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDUzNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNTM4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2MzcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MzgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkSXRlbShtYXRlcmlhbElELCBpdGVtQW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZExpc3Q6IFttYXRlcmlhbElEXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiBbaXRlbUFtb3VudF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub25la2V5R2V0QWxsTWVydHJhaWwodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlLCB0aGlzLl90ZW1wTGlzdFtzZWxlY3RlZEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEluZGV4KytcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfYXV0b19tZXJnZV9tZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1VwZ3JhZGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hdHJhRW5vdWdoICYmIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVDb2luRGF0YS5jb2luTnVtIDwgdGhpcy5fYnVpbGREYXRhLnVwTmVlZENvaW4pIHtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIGZhbHNlKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hdHJhRW5vdWdoKSB7XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzZfSklBTlpVU0hFR05KSSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzdfQlVJTERJTkdfVVBHUkFESU5HKVxyXG4gICAgICAgICAgICB9LCAwLjUpO1xyXG5cclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uUkVEVUNFX0lURU1fVFlQRSwgdGhpcy5fYnVpbGREYXRhLnVwTmVlZENvaW4pO1xyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkucGxheUJ1aWxkVXBncmFkZUFuaW0odGhpcy5fYnVpbGREYXRhLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS51cGdyYWRlQnVpbGQodGhpcy5fYnVpbGREYXRhLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0J1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZSh0aGlzLl9jdXJCdWlsZENmZy5idWlsZFR5cGUpO1xyXG4gICAgICAgICAgICBpZiAobmV3QnVpbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoMSA9PSBuZXdCdWlsZERhdGEuYnVpbGRMdmwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uY29uc3Qub3BlbkJ1aWxkSUQgPSB0aGlzLl9jdXJCdWlsZENmZy5idWlsZElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGRDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZERhdGEuYnVpbGRJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDb25maWcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uQkFSUkFDS1NfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkJBUlJBQ0tTX0xJU1QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR1VJREVfU0hPV19USVBTX09QLmtleSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR1VJREVfU0hPV19USVBTX09QKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChidWlsZENvbmZpZy5idWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5TVEFMTF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuU3RvcmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuREVGRU5TRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HVUlERV9TSE9XX1RJUFNfT1Aua2V5LCAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HVUlERV9TSE9XX1RJUFNfT1ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR09CQVRUTEUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDAgPCBidWlsZENvbmZpZy5idWlsZEx2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZENvbmZpZy5idWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR1VJREVfU0hPV19USVBTX09QLmtleSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkdVSURFX1NIT1dfVElQU19PUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnVpbGRDb25maWcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uUFJJVkFURUhPVVNJTkdfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdVSURFX1NIT1dfVElQU19PUC5rZXksIDQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR1VJREVfU0hPV19USVBTX09QKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuQlVJTERJTkZPLmtleSwgYnVpbGRDb25maWcuYnVpbGRJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQlVJTERJTkZPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX3VwZ3JhZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX3Nob3dfc3RhdGVJY29uXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMSA8IG5ld0J1aWxkRGF0YS5idWlsZEx2bCAmJiAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmNvbnN0Lm9wZW5CdWlsZElEID0gdGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRJRDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUodGhpcy5fY3VyQnVpbGRDZmcuYnVpbGRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQoYnVpbGREYXRhLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLkJBUlJBQ0tTX1RZUEUgfHwgYnVpbGRDb25maWcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uU1RBTExfVFlQRSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDb25maWcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5ERUZFTlNFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR09CQVRUTEUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMCA8IGJ1aWxkQ29uZmlnLmJ1aWxkTHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkJVSUxESU5GTy5rZXksIGJ1aWxkQ29uZmlnLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkJVSUxESU5GTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQlVJTERfVVBHUkFERSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX3VwZ3JhZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX3Nob3dfc3RhdGVJY29uXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiY29pbl9jaGFuZ2VcIiwgdGhpcy5yZWZyZXNoQ29pbiwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIHRoaXMucmVmcmVzaFBhbmVsLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJ1cGRhdGVfYnVpbGRfdXBncmFkZVwiLCB0aGlzLnVwZGF0ZVVwZ3JhZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzNfVVBHUkFERV9DTE9TRSk7XHJcbiAgICAgICAgZ20udWkubWFwTWFpblVJLnNldE1hcFVpU2hvdyh0cnVlKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfc2hvd19zdGF0ZUljb25cIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19