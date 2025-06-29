// +-+
import { gm } from './GameManager';
import { TempData } from './TempData';
import { ListView } from './ListView';
import { GameModule } from './GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class FightOfflineOp extends GameModule {
    @property(cc.Label)
    private lblCoin: cc.Label | null = null;

    @property(ListView)
    private itemList: ListView | null = null;

    @property(ListView)
    private heroList: ListView | null = null;

    protected onEnable(): void {
        this.lblCoin.string = "-0";
        this.update_view();
    }

    private update_view(): void {
        this.heroList.setData(TempData.localHeroList);
        this.itemList.setData(TempData.localHeroList);
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.FIGHTOFFLINEOP);
    }

    protected onDisable(): void {
        this.heroList.reset();
        this.itemList.reset();
    }
}

export default FightOfflineOp;