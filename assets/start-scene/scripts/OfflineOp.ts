// +-+
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName, RewardIdEnum, SetItemNumEnum } from './Constants';
import { BANNER_AD_TYPE } from './ChannelManager';
import { ReportData } from './NetUtils';
import { GameModule } from './GameModule';
import { TempData } from './TempData';

const { ccclass, property } = cc._decorator;

@ccclass
class OfflineOp extends GameModule {
    @property([cc.Node])
    private photoList: cc.Node[] = [];

    @property(cc.Label)
    private lblTime: cc.Label | null = null;

    private idList: number[] = [11006, 11002, 16001, 17001];
    private numList: number[] = [1, 5, 3, 2];
    private CURTIMES: number = 5;

    protected onEnable(): void {
        const offlineTime: number = TempData.offline_time;
        const timeMultiplier: number = Math.floor(Math.min(offlineTime, 3600) / 600);

        for (let index: number = 0; index < this.numList.length; index++) {
            this.numList[index] = this.numList[index] * timeMultiplier;
        }

        this.lblTime.string = "Thời gian ngoại tuyến: " + Utils.format_time(offlineTime);
        for (let index: number = 0; index < this.photoList.length; index++) {
            this.photoList[index].active = false;
            if (this.idList.length > index) {
                this.photoList[index].active = true;
                const itemConfig = gm.data.config_data.getItemCfgByID(this.idList[index]);
                if (itemConfig) {
                    Utils.async_set_sprite_frame(this.photoList[index].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + (itemConfig.lv === 0 ? 1 : itemConfig.lv));
                    Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), BundleName.MAP, "res/rewardIcon/" + itemConfig.icon);
                }
                this.photoList[index].children[2].getComponent(cc.Label).string = "x" + this.numList[index];
            }
        }
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private onClickOneGet(): void {
        this.getDoubleCb(1);
    }

    private onClickDoubleItem(): void {
        ReportData.instance.report_once_point(10529);
        ReportData.instance.report_point(10530);
        gm.channel.show_video_ad(this.getDoubleCb, this);
    }

    private getDoubleCb(multiplier: number = 5): void {
        if (multiplier == 5) {
            ReportData.instance.report_once_point(10629);
            ReportData.instance.report_point(10630);
        }

        for (let index = 0; index < this.idList.length; index++) {
            if (this.idList[index] == RewardIdEnum.GOLD) {
                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, this.numList[index] * multiplier);
                gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO))
            } else if (this.idList[index] == RewardIdEnum.DIAMOND) {
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, this.numList[index] * multiplier);
                gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO))
            } else if (this.idList[index] == RewardIdEnum.BARREL) {
                gm.data.mapCell_data.addBarrelNum(this.numList[index] * multiplier);
                gm.ui.show_coin_fly(RewardIdEnum.BARREL, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), 0, gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
            } else if (!(16001 != this.idList[index] && 17001 != this.idList[index])) {
                const splitRewardId = 16001 == this.idList[index] ? 16008 : 17008;
                gm.data.mapCell_data.splitItemNum(this.numList[index] * multiplier, splitRewardId, 1);
            }
        }
        gm.ui.async_hide_module(gm.const.OFFLINEOP)
    }
}

export default OfflineOp;