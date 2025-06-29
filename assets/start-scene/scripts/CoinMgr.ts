// +-+
const { ccclass, property } = cc._decorator;
import { gm } from "./GameManager";

@ccclass
export class CoinMgr extends cc.Component {
    @property(cc.Label)
    private coinLbl: cc.Label | null = null;

    @property(cc.Label)
    private diamondLbl: cc.Label | null = null;

    @property(cc.Node)
    private diamondAdd: cc.Node | null = null;

    @property(cc.Node)
    private coinAdd: cc.Node | null = null;

    protected onEnable(): void {
        gm.ui.on("coin_change", this.refreshCoin, this);
        this.refreshCoin();
    }

    private refreshCoin(): void {
        this.coinLbl.string = gm.data.mapCell_data.roleCoinData.coinNum.toString();
        this.diamondLbl.string = gm.data.mapCell_data.roleCoinData.diamondNum.toString();
        this.diamondAdd.active = this.coinAdd.active = !gm.data.mapCell_data.isGuide;
    }

    private onClickOpenCoin(): void {
        gm.ui.set_module_args(gm.const.GETCOINOP.key, false);
        gm.ui.show_panel(gm.const.GETCOINOP);
    }

    private onClickOpendiamond(): void {
        gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
        gm.ui.show_panel(gm.const.GETCOINOP);
    }

    protected onDisable(): void {
        gm.ui.off("coin_change", this.refreshCoin, this);
    }
}
