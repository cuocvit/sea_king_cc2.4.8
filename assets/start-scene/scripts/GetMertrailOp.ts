// +-+
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { GameObject } from './GameObject';
import { ReportData } from './NetUtils';
import { ModuleAgrs } from './UIManager';

const { ccclass, property } = cc._decorator;

@ccclass
class GetMertrailOp extends GameObject {
    @property(cc.Label)
    private lblTitle: cc.Label | null = null;

    @property(cc.Sprite)
    private itemImgL: cc.Sprite | null = null;

    @property(cc.Sprite)
    private itemImgAd: cc.Sprite | null = null;

    @property(cc.Label)
    private lblNum: cc.Label | null = null;

    private args: ModuleAgrs;

    protected onEnable(): void {
        this.args = gm.ui.get_module_args(gm.const.GET_MERTRAIL_OP.key) as ModuleAgrs;
        const itemConfig = gm.data.config_data.getItemCfgByID(this.args.itemID);
        if (itemConfig) {
            Utils.async_set_sprite_frame(this.itemImgL, BundleName.COMMON, "res/handbook/" + itemConfig.icon);
            this.itemImgL.node.scale = 1.5;
            this.lblNum.string = "x" + this.args.itemNum;
            Utils.async_set_sprite_frame(this.itemImgAd, BundleName.COMMON, "res/handbook/" + itemConfig.icon);
            this.lblTitle.string = "Nhận " + itemConfig.name;
        }
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.GET_MERTRAIL_OP);
    }

    private onClickShowStore(): void {
        gm.ui.async_show_module(gm.const.Store);
        gm.ui.async_hide_module(gm.const.GET_MERTRAIL_OP);
    }

    private onClickFight(): void {
        gm.ui.set_module_args(gm.const.GOBATTLE.key, 1);
        gm.ui.async_show_module(gm.const.GOBATTLE);
        gm.ui.async_hide_module(gm.const.GET_MERTRAIL_OP);
    }

    private onClickWatchAdCb(): void {
        gm.channel.show_video_ad(this.watchAdCb, this);
    }

    private watchAdCb(): void {
        ReportData.instance.report_once_point(10637);
        ReportData.instance.report_point(10638);
        gm.data.mapCell_data.addItem(this.args.itemID, this.args.itemNum);
        gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
            idList: [this.args.itemID],
            numList: [this.args.itemNum]
        });
        gm.ui.async_show_module(gm.const.GETREWARDOP);
        gm.data.mapCell_data.onekeyGetAllMertrail(this.args.buildType, this.args.buildItemID);
        gm.ui.emit("update_build_upgrade");
        gm.ui.async_hide_module(gm.const.GET_MERTRAIL_OP);
    }
}

export default GetMertrailOp;