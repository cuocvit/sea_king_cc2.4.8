// *-*
import { gm } from './GameManager';
import { SetItemNumEnum, BuildTypeEnum } from './Constants';
import { BANNER_AD_TYPE } from './ChannelManager';
import { ReportData } from './NetUtils';

const { ccclass, property } = cc._decorator;

@ccclass
class UnLockAreaCloud extends cc.Component {
    @property(cc.Label)
    private lblName: cc.Label | null = null;

    @property(cc.Label)
    private lblDesc: cc.Label | null = null;

    @property(cc.Label)
    private lblDiamond: cc.Label | null = null;

    @property(cc.Node)
    private btnNode: cc.Node | null = null;

    private _curType: number = 0;

    protected onEnable(): void {
        this._curType = gm.ui.get_module_args(gm.const.UNLOCKAREACLOUDOP.key) as number;
        const buildLvl: number = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE).buildLvl;
        this.btnNode.active = buildLvl >= gm.const.localCloudAreaList[this._curType].lvl;
        this.lblName.string = gm.const.localCloudAreaList[this._curType].name;
        this.lblDesc.string = "Thành phố chính cấp " + gm.const.localCloudAreaList[this._curType].lvl + " sẽ mở khóa.\n" + gm.const.localCloudAreaList[this._curType].desc;
        this.lblDiamond.string = gm.const.localCloudAreaList[this._curType].diamond.toString();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private onClickWatchAd(): void {
        gm.channel.show_video_ad(this.watchAdCb, this);
    }

    private watchAdCb(): void {
        const lvl: number = gm.const.localCloudAreaList[this._curType].lvl;
        gm.data.mapCell_data.unlockSpecialArea(this._curType);
        gm.data.mapCell_data.openNewAreaByID(this._curType);
        gm.data.mapCell_data.unlockNewAreaID(this._curType, false);
        gm.ui.async_hide_module(gm.const.UNLOCKAREACLOUDOP);
        gm.ui.emit("unlock_cloud_refresh", this._curType);
        gm.ui.emit("unLockNewArea");
        gm.channel.report_event("unlock_area", {
            event_desc: "解锁区域",
            desc: "%d级区域%s人数",
            lv: lvl,
            unlock_type: "视频解锁"
        });
        ReportData.instance.report_once_point(gm.const.localCloudAreaList[this._curType].reportNum);
    }

    private onClickDiamond(): void {
        if (gm.data.mapCell_data.roleCoinData.diamondNum >= gm.const.localCloudAreaList[this._curType].diamond) {
            const lvl: number = gm.const.localCloudAreaList[this._curType].lvl;
            gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, gm.const.localCloudAreaList[this._curType].diamond);
            gm.data.mapCell_data.unlockSpecialArea(this._curType);
            gm.data.mapCell_data.openNewAreaByID(this._curType);
            gm.data.mapCell_data.unlockNewAreaID(this._curType, false);
            gm.ui.async_hide_module(gm.const.UNLOCKAREACLOUDOP);
            gm.ui.emit("unlock_cloud_refresh", this._curType);
            gm.ui.emit("unLockNewArea");
            gm.channel.report_event("unlock_area", {
                event_desc: "解锁区域",
                desc: "%d级区域%s人数",
                lv: lvl,
                unlock_type: "钻石解锁"
            });
            ReportData.instance.report_once_point(gm.const.localCloudAreaList[this._curType].reportNum + 1);
        } else {
            gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
            gm.ui.async_show_module(gm.const.GETCOINOP);
        }
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.UNLOCKAREACLOUDOP);
        const mapIndex: number = gm.const.localCloudAreaList[this._curType].mapIndex;
        gm.ui.mapMainUI.playUnLockMainTowerMoveMap(mapIndex.toString());
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }
}

export default UnLockAreaCloud;