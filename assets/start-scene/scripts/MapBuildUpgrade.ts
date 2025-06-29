// +-+
import { Utils } from './Utils';
import { BundleName, RewardIdEnum, SetItemNumEnum, BuildTypeEnum } from './Constants';
import { gm } from './GameManager';
import { ReportData } from './NetUtils';
import { Build } from '../../common/configs/build';
import { BuildData } from './MapCellCfgData';
const { ccclass, property } = cc._decorator;

@ccclass
export class MapBuildUpgrade extends cc.Component {
    @property(cc.Label)
    private lblName: cc.Label | null = null;

    @property(cc.Label)
    private lblNextLvl: cc.Label | null = null;

    @property([cc.Node])
    private meterialNode: cc.Node[] = [];

    @property(cc.Label)
    private lblBuildName: cc.Label | null = null;

    @property(cc.Label)
    private lblCoin: cc.Label | null = null;

    @property([cc.SpriteFrame])
    private btnSprList: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    private btnSpr: cc.Sprite | null = null;

    private _curBuildCfg: Build | null = null;
    private _buildData: BuildData | null = null;
    private _matraEnough: boolean = true;
    private _tempList: number[] = [];

    public initData(buildId: number, cellID?: number): void {
        this._curBuildCfg = gm.data.config_data.getBuildCfgByID(buildId);
        this._buildData = gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
    }

    protected onEnable(): void {
        gm.ui.on("coin_change", this.refreshCoin, this);
        gm.ui.on("build_metarail_change", this.refreshPanel, this);
        gm.ui.on("update_build_upgrade", this.updateUpgrade, this);
        this.refreshPanel();
        gm.audio.play_effect(gm.const.AUDIO_4_UPGRADE_OPEN);
    }

    private updateUpgrade(): void {
        this.refreshPanel();
    }

    private refreshCoin(): void {
        this.lblCoin.string = this._buildData?.upNeedCoin.toString();
        this.lblCoin.node.color = cc.Color.RED;
        if (gm.data.mapCell_data.roleCoinData.coinNum >= this._buildData.upNeedCoin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    }

    private refreshPanel(): void {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curBuildCfg) {
            this._buildData = gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
            if (this._buildData) {
                this.lblName.string = this._curBuildCfg.buildName;
                this.lblNextLvl.string = "（Nâng lên cấp " + (this._curBuildCfg.buildLv + 1) + ")";

                for (let index = 0; index < this.meterialNode.length; index++) {
                    this.meterialNode[index].active = false;
                }

                let index = 0;
                for (const key in this._buildData.metrailData) {
                    this.meterialNode[index].active = true;
                    this.meterialNode[index].children[1].getComponent(cc.Label).string = this._buildData.metrailData[key].cur + "/" + this._buildData.metrailData[key].max;
                    const itemConfig = gm.data.config_data.getItemCfgByID(this._buildData.metrailData[key].id);
                    if (itemConfig) {
                        Utils.async_set_sprite_frame(this.meterialNode[index].children[0].getComponent(cc.Sprite), BundleName.MAP, "res/" + itemConfig.icon);
                        this._tempList.push(parseInt(key));
                        if (this._buildData.metrailData[key].cur >= this._buildData.metrailData[key].max) {
                            (this.meterialNode[index].children[2].active = !1,
                                this.meterialNode[index].children[3].active = !0,
                                this.meterialNode[index].color = cc.Color.BLACK.fromHEX("#86cbB4e"))
                        } else {
                            this._matraEnough = false
                            this.meterialNode[index].color = cc.Color.WHITE;
                            this.meterialNode[index].children[2].active = true;
                            this.meterialNode[index].children[3].active = false;
                            this.meterialNode[index].children[2].children[0].width = this._buildData.metrailData[key].cur / this._buildData.metrailData[key].max * 108;

                            const coinNum = gm.data.mapCell_data.getCoinNum(parseInt(key), this._buildData.metrailData[key].id);
                            this.meterialNode[index].children[2].children[1].active = coinNum;
                            this.meterialNode[index].children[2].children[2].active = !coinNum;
                        }
                        index++;
                    }
                }
                this.btnSpr.spriteFrame = this._matraEnough ? this.btnSprList[1] : this.btnSprList[0];
                this.refreshCoin()
            }
        }
    }

    private onClickClose(): void {
        this.node.active = false;
    }

    private onClickAddMetrail(event: cc.Event, index: string): void {
        const idx = parseInt(index);
        gm.data.mapCell_data.onekeyGetAllMertrail(this._curBuildCfg.buildType, this._tempList[idx]);
        this.refreshPanel();
    }

    private onClickVideoAddMetrail(event: cc.Event, index: string): void {
        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            const selectedIndex = parseInt(index);
            this._buildData = gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
            if (this._buildData) {
                let materialIndex = 0;
                for (const materialKey in this._buildData.metrailData) {
                    if (materialIndex == selectedIndex) {
                        const materialID = this._buildData.metrailData[materialKey].id;
                        let itemAmount: number;
                        if (materialID == RewardIdEnum.WOOD) {
                            itemAmount = 108;
                        } else if (materialID == RewardIdEnum.IRON) {
                            itemAmount = 78;
                        } else {
                            itemAmount = this._buildData.metrailData[materialKey].max - this._buildData.metrailData[materialKey].cur;
                        }

                        ReportData.instance.report_once_point(10537);
                        ReportData.instance.report_point(10538);
                        gm.channel.show_video_ad(() => {
                            ReportData.instance.report_once_point(10637);
                            ReportData.instance.report_point(10638);
                            gm.data.mapCell_data.addItem(materialID, itemAmount);
                            gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                                idList: [materialID],
                                numList: [itemAmount]
                            });
                            gm.ui.async_show_module(gm.const.GETREWARDOP);
                            gm.data.mapCell_data.onekeyGetAllMertrail(this._curBuildCfg.buildType, this._tempList[selectedIndex]);
                            this.refreshPanel()
                        }, this);
                        break
                    }
                    materialIndex++
                }
            }
        } else {
            gm.ui.show_auto_merge_message();
        }
    }

    private onClickUpgrade(): void {
        if (this._matraEnough && gm.data.mapCell_data.roleCoinData.coinNum < this._buildData.upNeedCoin) {
            gm.ui.set_module_args(gm.const.GETCOINOP.key, false);
            gm.ui.async_show_module(gm.const.GETCOINOP);
            return;
        }

        if (this._matraEnough) {
            gm.audio.play_effect(gm.const.AUDIO_6_JIANZUSHEGNJI);
            this.scheduleOnce(() => {
                gm.audio.play_effect(gm.const.AUDIO_7_BUILDING_UPGRADING)
            }, 0.5);

            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.REDUCE_ITEM_TYPE, this._buildData.upNeedCoin);
            gm.ui.mapMainUI.playBuildUpgradeAnim(this._buildData.buildID);
            gm.data.mapCell_data.upgradeBuild(this._buildData.buildID);
            this.node.active = false;
            const newBuildData = gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
            if (newBuildData) {
                if (1 == newBuildData.buildLvl) {
                    if (!gm.data.mapCell_data.isGuide) {
                        gm.const.openBuildID = this._curBuildCfg.buildID;
                        const buildData = gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
                        if (buildData) {
                            const buildConfig = gm.data.config_data.getBuildCfgByID(buildData.buildID);
                            if (buildConfig) {
                                if (buildConfig.buildType == BuildTypeEnum.BARRACKS_TYPE) {
                                    gm.ui.show_panel(gm.const.BARRACKS_LIST);
                                    gm.ui.set_module_args(gm.const.GUIDE_SHOW_TIPS_OP.key, 2);
                                    gm.ui.show_panel(gm.const.GUIDE_SHOW_TIPS_OP);

                                } else if (buildConfig.buildType == BuildTypeEnum.STALL_TYPE) {
                                    gm.ui.show_panel(gm.const.Store);

                                } else if (buildConfig.buildType == BuildTypeEnum.GARRISION_TYPE) {
                                    gm.ui.show_panel(gm.const.DEFENSE);
                                    gm.ui.set_module_args(gm.const.GUIDE_SHOW_TIPS_OP.key, 3);
                                    gm.ui.show_panel(gm.const.GUIDE_SHOW_TIPS_OP);

                                } else if (buildConfig.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                    gm.ui.show_panel(gm.const.GOBATTLE);

                                } else if (0 < buildConfig.buildLv) {
                                    if (buildConfig.buildType == BuildTypeEnum.WHARFTAX_TYPE) {
                                        gm.ui.set_module_args(gm.const.GUIDE_SHOW_TIPS_OP.key, 1);
                                        gm.ui.show_panel(gm.const.GUIDE_SHOW_TIPS_OP);
                                    } else if (buildConfig.buildType == BuildTypeEnum.PRIVATEHOUSING_TYPE) {
                                        gm.ui.set_module_args(gm.const.GUIDE_SHOW_TIPS_OP.key, 4);

                                        gm.ui.show_panel(gm.const.GUIDE_SHOW_TIPS_OP);
                                    }
                                    gm.ui.set_module_args(gm.const.BUILDINFO.key, buildConfig.buildID);
                                    gm.ui.show_panel(gm.const.BUILDINFO);
                                }
                            }
                        }
                    }
                    gm.ui.emit("build_upgrade");
                    gm.ui.emit("build_show_stateIcon", true);

                } else if (1 < newBuildData.buildLvl && !gm.data.mapCell_data.isGuide) {
                    gm.const.openBuildID = this._curBuildCfg.buildID;
                    const buildData = gm.data.mapCell_data.getBuildDataByType(this._curBuildCfg.buildType);
                    if (buildData) {
                        const buildConfig = gm.data.config_data.getBuildCfgByID(buildData.buildID);
                        if (buildConfig) {
                            if (!(buildConfig.buildType == BuildTypeEnum.BARRACKS_TYPE || buildConfig.buildType == BuildTypeEnum.STALL_TYPE)) {
                                if (buildConfig.buildType == BuildTypeEnum.GARRISION_TYPE) {
                                    gm.ui.show_panel(gm.const.DEFENSE);
                                } else if (buildConfig.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                    gm.ui.show_panel(gm.const.GOBATTLE);
                                } else if (0 < buildConfig.buildLv) {
                                    gm.ui.set_module_args(gm.const.BUILDINFO.key, buildConfig.buildID);
                                    gm.ui.show_panel(gm.const.BUILDINFO);
                                }
                            }
                        }
                    }
                    gm.ui.show_panel(gm.const.BUILD_UPGRADE);
                    gm.ui.emit("build_upgrade");
                    gm.ui.emit("build_show_stateIcon", true);
                }
            }
        }
    }

    protected onDisable(): void {
        gm.ui.off("coin_change", this.refreshCoin, this);
        gm.ui.off("build_metarail_change", this.refreshPanel, this);
        gm.ui.off("update_build_upgrade", this.updateUpgrade, this);
        gm.audio.play_effect(gm.const.AUDIO_3_UPGRADE_CLOSE);
        gm.ui.mapMainUI.setMapUiShow(true);
        gm.ui.emit("build_show_stateIcon", true);
    }
}
