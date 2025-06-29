// +-+
import { Utils } from './Utils';
import { BuildTypeEnum, RewardIdEnum, BundleName, SetItemNumEnum } from './Constants';
import { gm } from './GameManager';
import { ReportData } from './NetUtils';
import { Build } from "../../common/configs/build";

const { ccclass, property } = cc._decorator;

@ccclass
class BuildUpgrade extends cc.Component {
    @property(cc.Sprite)
    private itemImg: cc.Sprite | null = null;

    @property(cc.Label)
    private lblBuildName: cc.Label | null = null;

    @property([cc.Node])
    private attrNode: cc.Node[] = [];

    @property([cc.Node])
    private photoList: cc.Node[] = [];

    private _curBuildCfg: Build | null = null;
    private idList: number[] = [];
    private numList: number[] = [];

    private initData(buildId: number): void {
        this._curBuildCfg = gm.data.config_data.getBuildCfgByID(buildId);
    }

    protected onEnable(): void {
        this.node.getComponent(cc.Animation).play("buildUpgrade_open");
        const buildConfig = gm.data.config_data.getBuildCfgByID(gm.const.openBuildID);
        if (buildConfig) {
            this._curBuildCfg = gm.data.config_data.getBuildCfgByID(buildConfig.nextBuildID);
            if (this._curBuildCfg) {
                const modelPath = "res/build/" + this._curBuildCfg.model;
                Utils.async_set_sprite_frame(this.itemImg, BundleName.MAP, modelPath);
                this.lblBuildName.string = this._curBuildCfg.buildName + "  Lv." + this._curBuildCfg.buildLv;

                for (let index = 0; index < this.attrNode.length; index++) {
                    this.attrNode[index].active = false;
                }

                this.attrNode[0].active = 0 < this._curBuildCfg.hp;
                this.attrNode[0].children[1].getComponent(cc.Label).string = "Sinh mạng";
                this.attrNode[0].children[2].getComponent(cc.Label).string = this._curBuildCfg.hp + "";
                Utils.async_set_sprite_frame(this.attrNode[0].children[4].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_HP");
                this.attrNode[1].active = 0 < this._curBuildCfg.attack;
                this.attrNode[1].children[1].getComponent(cc.Label).string = "Phòng thủ";
                this.attrNode[1].children[2].getComponent(cc.Label).string = this._curBuildCfg.attack + "";
                Utils.async_set_sprite_frame(this.attrNode[1].children[4].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_Defense");
                this.attrNode[2].active = 0 < this._curBuildCfg.defense;
                this.attrNode[2].children[1].getComponent(cc.Label).string = "Tấn công";
                this.attrNode[2].children[2].getComponent(cc.Label).string = this._curBuildCfg.defense + "";
                Utils.async_set_sprite_frame(this.attrNode[2].children[4].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_Attackers");

                const reward = buildConfig.reward as number[];
                const amount = buildConfig.amount as number[];
                this.photoList[0].x = reward.length <= 1 ? 0 : -80;

                for (let index = 0; index < this.photoList.length; index++) {
                    this.idList = reward;
                    this.numList = amount;
                    this.photoList[index].active = false;
                    if (reward.length > index) {
                        this.photoList[index].active = true;
                        if (3e4 < reward[index]) {
                            const heroConfig = gm.data.config_data.getHeroCfgByID(reward[index]);
                            if (heroConfig) {
                                Utils.async_set_sprite_frame(this.photoList[index].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + heroConfig.lv);
                                Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + heroConfig.icon);
                            }
                        } else {
                            const heroConfig = gm.data.config_data.getItemCfgByID(reward[index]);
                            if (heroConfig) {
                                Utils.async_set_sprite_frame(this.photoList[index].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + (0 == heroConfig.lv ? 1 : heroConfig.lv));
                                if (11002 == heroConfig.id || 11003 == heroConfig.id || 11006 == heroConfig.id) {
                                    Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), BundleName.MAP, "res/rewardIcon/" + heroConfig.icon);
                                } else {
                                    Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + heroConfig.icon);
                                }
                            }
                            this.photoList[index].children[2].getComponent(cc.Label).string = "x" + buildConfig.amount[index];
                        }
                    }
                }
            }
        }

    }

    private onClickClose(): void {
        this.node.getComponent(cc.Animation).play("buildUpgrade_close");
        this.getReward();
        gm.ui.async_hide_module(gm.const.BUILD_UPGRADE);
        if (this._curBuildCfg && this._curBuildCfg.buildType == BuildTypeEnum.BARRACKS_TYPE) {
            gm.ui.async_show_module(gm.const.BARRACKS_LIST);
        }

    }

    private onClickWatchAd(): void {
        gm.channel.show_video_ad(this.watchAdCb, this);
    }

    private watchAdCb(): void {
        this.node.getComponent(cc.Animation).play("buildUpgrade_close");
        this.getReward(10);
        console.log("this._curBuildCfg", this._curBuildCfg);
        if (this._curBuildCfg) {
            gm.channel.report_event("building_upgrade_video_receive", {
                event_desc: "建筑升级视频领取奖励",
                desc: "%s建筑升级到Lv.%d视频领取奖励",
                building_name: this._curBuildCfg.buildName,
                level: this._curBuildCfg.buildLv
            });
            ReportData.instance.report_once_point(10861);
            ReportData.instance.report_point(10862);
            gm.ui.async_hide_module(gm.const.BUILD_UPGRADE);
            if (this._curBuildCfg.buildType == BuildTypeEnum.BARRACKS_TYPE) {
                gm.ui.async_show_module(gm.const.BARRACKS_LIST);
            }
        }

    }

    private getReward(multiplier: number = 1): void {
        let goldAmount = 0;
        let diamondAmount = 0;
        let barrelAmount = 0;
        const rewards: number[] = [];
        for (let n = 0; n < this.idList.length; n++) {
            if (this.idList[n] == RewardIdEnum.GOLD) {
                goldAmount += this.numList[n] * multiplier;
                gm.ui.show_coin_fly(this.idList[n], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            } else if (this.idList[n] == RewardIdEnum.DIAMOND) {
                diamondAmount += this.numList[n] * multiplier;
                gm.ui.show_coin_fly(this.idList[n], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            } else if (this.idList[n] == RewardIdEnum.BARREL) {
                barrelAmount += this.numList[n] * multiplier;
                gm.ui.show_coin_fly(this.idList[n], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), barrelAmount, gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
            } else {
                for (let r = 0; r < this.numList[n] * multiplier; r++) {
                    rewards.push(this.idList[n]);
                }
            }
        }
        if (barrelAmount > 0) {
            gm.data.mapCell_data.addBarrelNum(barrelAmount);
        }
        if (goldAmount > 0) {
            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, goldAmount);
        }
        if (diamondAmount > 0) {
            gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, diamondAmount);
        }
        if (rewards.length > 0) {
            gm.data.mapCell_data.addWareHouseList(rewards);
            gm.data.mapCell_data.async_write_data();
        }

    }

    protected onDisable(): void {
        if (this._curBuildCfg) {
            const nextBuildConfig = gm.data.config_data.getBuildCfgByID(this._curBuildCfg.nextBuildID);
            if (this._curBuildCfg.buildType == BuildTypeEnum.BARRACKS_TYPE && nextBuildConfig && nextBuildConfig.rate.length >= 0) {
                cc.Canvas.instance.scheduleOnce(() => {
                    gm.ui.set_module_args(gm.const.GetReel.key, true);
                    gm.ui.async_show_module(gm.const.GetReel);
                }, 0.1);
            } else if (this._curBuildCfg.buildType == BuildTypeEnum.TOWER_TYPE) {
                for (const e in gm.const.localCloudAreaList) {
                    if (this._curBuildCfg.buildLv == gm.const.localCloudAreaList[e].lvl) {
                        gm.ui.set_module_args(gm.const.UNLOCKAREACLOUDOP.key, parseInt(e));
                        gm.ui.async_show_module(gm.const.UNLOCKAREACLOUDOP);
                        return;
                    }
                }
            }
        }
    }
}

export default BuildUpgrade;