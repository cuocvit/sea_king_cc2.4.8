"use strict";
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