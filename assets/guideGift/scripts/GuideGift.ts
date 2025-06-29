import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { TempData } from '../../start-scene/scripts/TempData';

const { ccclass, property } = cc._decorator;

@ccclass
class GuideGift extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private video_close_btn: cc.Button = null;

    @property(cc.Button)
    private get_btn: cc.Button = null;

    @property(cc.Node)
    private item_lbl_node: cc.Node = null;

    private readonly _itemIDList: number[];
    private readonly _itemNumList: number[];

    private constructor() {
        super();
        this._itemIDList = [18003, 35003, 36001, 37003, 18005];
        this._itemNumList = [1, 1, 1, 1, 1];
    }

    protected onEnable(): void {
        TempData.mainFunShowGuide = true;
        this.initPanel();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
        gm.ui.mapMainUI.show_guide_gift_entry();
    }

    private initPanel(): void {
        for (let t = 0; t < this._itemNumList.length; t++) {
            this.item_lbl_node.children[t].getComponent(cc.Label).string = "x" + this._itemNumList[t];
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node || event.target == this.video_close_btn.node) {
            gm.ui.async_hide_module(gm.const.GUIDEGIFT);
        } else if (event.target == this.get_btn.node) {
            ReportData.instance.report_once_point(10531);
            ReportData.instance.report_point(10532);
            gm.channel.show_video_ad(this.watch_ad_cb, this);
        }
    }

    private watch_ad_cb(): void {
        ReportData.instance.report_once_point(10631);
        ReportData.instance.report_point(10632);
        gm.data.mapCell_data.guideGift.guideIsGet = true;
        gm.data.mapCell_data.addWareHouseList(this._itemIDList);
        gm.data.mapCell_data.async_write_data();
        gm.ui.async_hide_module(gm.const.GUIDEGIFT);
        gm.ui.emit("guideGiftChange");
        gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
            idList: this._itemIDList,
            numList: this._itemNumList
        });
        gm.ui.async_show_module(gm.const.GETREWARDOP);
    }
}