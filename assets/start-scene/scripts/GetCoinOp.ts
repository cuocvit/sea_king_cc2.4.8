// +-+
import { gm } from "./GameManager";
import { SetItemNumEnum, RewardIdEnum } from "./Constants";
import { BANNER_AD_TYPE } from "./ChannelManager";
import { ReportData } from "./NetUtils";
import { SignEntry } from "./SignEntry";

const { ccclass, property } = cc._decorator;

@ccclass
class GetCoinOp extends cc.Component {
    @property(cc.Node)
    private coinNode: cc.Node | null = null;

    @property(cc.Node)
    private diamondNode: cc.Node | null = null;

    @property(cc.Label)
    private titleLbl: cc.Label | null = null;

    @property(cc.Label)
    private coinLbl: cc.Label | null = null;

    private _isGem: boolean = false;
    private _gemNum: number = 399;
    private _coinNum: number = 10000;
    private _curNum: number = 0;

    protected onEnable(): void {
        this._isGem = !!gm.ui.get_module_args(gm.const.GETCOINOP.key);
        this._curNum = this._isGem ? this._gemNum : this._coinNum;
        this.titleLbl.string = this._isGem
            ? "Ưu đãi Kim Cương khi mua"
            : "Ưu đãi Vàng khi mua";
        this.coinNode.active = !this._isGem;
        this.diamondNode.active = this._isGem;
        this.coinLbl.string = this._curNum.toString();
        gm.channel.report_event("ohayoo_game_button_show", {
            ad_type: "激励视频",
            rit_id: "946114114",
            ad_position: "道具_" + (this._isGem ? "钻石不足！" : "金币不足！"),
            ad_position_type: "道具",
        });
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private onClickWatchAD(): void {
        // if (this._isGem) {
        //     ReportData.instance.report_once_point(10521);
        //     ReportData.instance.report_point(10522);
        // } else {
        //     ReportData.instance.report_once_point(10523);
        //     ReportData.instance.report_point(10524);
        // }
        // gm.channel.report_event("ohayoo_game_button_click", {
        //     ad_type: "激励视频",
        //     rit_id: "946114114",
        //     ad_position: "道具_" + (this._isGem ? "钻石不足！" : "金币不足！"),
        //     ad_position_type: "道具"
        // });
        // gm.channel.show_video_ad(this.watchAdSucc, this, {
        //     ad_position: "道具_" + (this._isGem ? "钻石不足！" : "金币不足！"),
        //     ad_position_type: "道具"
        // });
    }

    private buyGem() {
        gm.ui.show_panel(gm.const.Buy);
        this.onClosePanel();
    }

    private watchAdSucc(): void {
        if (this._isGem) {
            ReportData.instance.report_once_point(10621);
            ReportData.instance.report_point(10622);
            gm.data.mapCell_data.setAddGameDiamond(
                SetItemNumEnum.ADD_ITEM_TYPE,
                this._curNum
            );
            gm.ui.show_coin_fly(
                RewardIdEnum.DIAMOND,
                this.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
            );
        } else {
            ReportData.instance.report_once_point(10623);
            ReportData.instance.report_point(10624);
            gm.data.mapCell_data.setAddGameCoin(
                SetItemNumEnum.ADD_ITEM_TYPE,
                this._curNum
            );
            gm.ui.show_coin_fly(
                RewardIdEnum.GOLD,
                this.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
            );
        }
        this.onClosePanel();
    }

    private onClosePanel(): void {
        gm.ui.async_hide_module(gm.const.GETCOINOP);
    }
}

export default GetCoinOp;
