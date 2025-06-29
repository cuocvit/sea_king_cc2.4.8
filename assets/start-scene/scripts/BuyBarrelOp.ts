// +-+
import { gm } from './GameManager';
import { SetItemNumEnum } from './Constants';
import { ReportData } from './NetUtils';

const { ccclass, property } = cc._decorator;

@ccclass
class BuyBarrelPanel extends cc.Component {
    @property([cc.Label])
    private barrelNumList: cc.Label[] = [];

    @property([cc.Label])
    private coinNumList: cc.Label[] = [];

    private _barrelNumList: { barrelNum: number; coin: number }[] = [
        { barrelNum: 40, coin: 33 },
        { barrelNum: 70, coin: 66 },
        { barrelNum: 110, coin: 99 }
    ];

    protected onEnable(): void {
        for (let t = 0; t < this._barrelNumList.length; t++) {
            this.barrelNumList[t].string = this._barrelNumList[t].barrelNum.toString();
            if (t != 0) {
                this.coinNumList[t].string = this._barrelNumList[t].coin.toString();
            }
        }
    }

    private onClickBuy(event: cc.Event, index: string): void {
        const number: number = parseInt(index);
        if (number != 0) {
            if (gm.data.mapCell_data.roleCoinData.diamondNum < this._barrelNumList[number].coin) {
                gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
                gm.ui.show_panel(gm.const.GETCOINOP);
            } else {
                gm.data.mapCell_data.diamond_buy_barrel_times++;
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, this._barrelNumList[number].coin);
                gm.data.mapCell_data.addBarrelNum(this._barrelNumList[number].barrelNum);
                this.onClosePanel();
                if (number == 1) {
                    ReportData.instance.report_point(10303);
                    ReportData.instance.report_once_point(10304);
                } else if (number == 2) {
                    ReportData.instance.report_point(10305);
                    ReportData.instance.report_once_point(10306);
                }
                gm.channel.report_event("diamond_buy_barrel", {
                    event_desc: "钻石购买木桶",
                    buy_count: gm.data.mapCell_data.diamond_buy_barrel_times,
                    task_desc: cc.js.formatStr("购买木桶%d次", gm.data.mapCell_data.diamond_buy_barrel_times)
                });
            }
        } else {
            this.onClickWatchAd();
        }
    }

    private onClickWatchAd(): void {
        gm.channel.show_video_ad(this.watchAdCb, this);
    }

    private watchAdCb(): void {
        gm.data.mapCell_data.watch_ad_buy_barrel_times++;
        gm.data.mapCell_data.addBarrelNum(this._barrelNumList[0].barrelNum);
        this.onClosePanel();
        ReportData.instance.report_point(10301);
        ReportData.instance.report_once_point(10302);
        gm.channel.report_event("video_buy_barrel", {
            event_desc: "看视频购买木桶",
            buy_count: gm.data.mapCell_data.watch_ad_buy_barrel_times,
            task_desc: cc.js.formatStr("购买木桶%d次", gm.data.mapCell_data.watch_ad_buy_barrel_times)
        });
    }

    private onClosePanel(): void {
        gm.ui.async_hide_module(gm.const.BUYBARRELOP);
    }
}

export default BuyBarrelPanel;