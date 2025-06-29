// +-+
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName, RewardIdEnum, SetItemNumEnum } from './Constants';
import { BANNER_AD_TYPE } from './ChannelManager';
import { ReportData } from './NetUtils';

const { ccclass, property } = cc._decorator;
export interface DoubleOp {
    type: number;
    idList: number[];
    numList: number[];
}


@ccclass
class GetDoubleRewardOp extends cc.Component {
    @property([cc.Node])
    private photoList: cc.Node[] = [];

    @property(cc.Label)
    private lblTitle: cc.Label | null = null;

    @property(cc.Label)
    private lblbtn: cc.Label | null = null;

    private curType: number = 0;
    private idList: number[] = [];
    private numList: number[] = [];
    private CURTIMES: number = 10;

    protected onEnable(): void {
        const moduleData = gm.ui.get_module_args(gm.const.GETDOUBLEOP.key) as DoubleOp;
        this.curType = moduleData.type;
        this.idList = moduleData.idList;
        this.numList = moduleData.numList;
        this.lblTitle.string = this.curType == 2 ? "Quà linh hồn" : "Quà nhận được";
        this.lblbtn.string = this.curType == 2 ? "Nhận ngay" : "Nhận gấp "+ this.CURTIMES;
        this.photoList[0].x = this.idList.length <= 1 ? 0 : -80;

        for (let a = 0; a < this.photoList.length; a++) {
            this.photoList[a].active = false;
            if (this.idList.length > a) {
                this.photoList[a].active = true;
                if (this.idList[a] > 30000) {
                    const event = gm.data.config_data.getHeroCfgByID(this.idList[a]);
                    if (event) {
                        Utils.async_set_sprite_frame(this.photoList[a].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + event.lv);
                        Utils.async_set_sprite_frame(this.photoList[a].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + event.icon);
                    }
                } else {
                    const event = gm.data.config_data.getItemCfgByID(this.idList[a]);
                    if (event) {
                        Utils.async_set_sprite_frame(this.photoList[a].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + (event.lv == 0 ? 1 : event.lv));
                        if ([11002, 11003, 11006].includes(event.id)) {
                            Utils.async_set_sprite_frame(this.photoList[a].children[1].getComponent(cc.Sprite), BundleName.MAP, "res/rewardIcon/" + event.icon);
                        } else {
                            Utils.async_set_sprite_frame(this.photoList[a].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + event.icon);
                        }
                    }
                }
                this.photoList[a].children[2].getComponent(cc.Label).string = "x" + this.numList[a];
            }
        }
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.GETDOUBLEOP);
    }

    private onClickDoubleItem(): void {
        gm.channel.show_video_ad(this.getDoubleCb, this);
    }

    private getDoubleCb(): void {
        if (this.curType == 2) {
            gm.data.mapCell_data.splitItemNum(this.numList[0], 22008, 1);
            gm.data.mapCell_data.async_write_data();
            gm.channel.report_event("video_get_soul", {
                event_desc: "看视频注魂的人数",
                desc: "看视频注魂的人数",
                hero_id: 1
            });
            ReportData.instance.report_once_point(10891);
            ReportData.instance.report_point(10892);
        } else {
            const listNum: number[] = [];
            for (let e = 0; e < this.idList.length; e++) {
                if (this.idList[e] == RewardIdEnum.GOLD) {
                    gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, this.numList[e] * this.CURTIMES);
                    gm.ui.show_coin_fly(this.idList[e], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (this.idList[e] == RewardIdEnum.DIAMOND) {
                    gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, this.numList[e] * this.CURTIMES);
                    gm.ui.show_coin_fly(this.idList[e], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (this.idList[e] == RewardIdEnum.BARREL) {
                    gm.data.mapCell_data.addBarrelNum(this.numList[e] * this.CURTIMES);
                    gm.ui.show_coin_fly(RewardIdEnum.BARREL, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), this.numList[e] * this.CURTIMES, gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else {
                    const num = this.numList[e] * this.CURTIMES;
                    for (let i = 0; i < num; i++) {
                        listNum.push(this.idList[e]);
                    }
                }
            }
            if (listNum.length > 0) {
                gm.data.mapCell_data.addWareHouseList(listNum);
                gm.data.mapCell_data.async_write_data();
                ReportData.instance.report_once_point(10803);
                ReportData.instance.report_point(10804);
            }
        }
        gm.ui.async_hide_module(gm.const.GETDOUBLEOP);
    }
}

export default GetDoubleRewardOp;