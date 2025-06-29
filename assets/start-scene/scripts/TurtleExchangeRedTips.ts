// *-*
import { gm } from './GameManager';
import { GameModule } from './GameModule';
import { BuildTypeEnum } from './Constants';

const { ccclass, property } = cc._decorator;

@ccclass
export class TurtleExchangeRedTips extends GameModule {
    @property(cc.Node)
    private redTipsNode: cc.Node | null = null;

    protected onEnable(): void {
        gm.ui.on("refresh_red_tips_stall", this.setStallRed, this);
        this.setStallRed();
    }

    private setStallRed(): void {
        this.redTipsNode.active = gm.data.mapCell_data.buildData[BuildTypeEnum.STALL_TYPE] &&
            gm.data.mapCell_data.buildData[BuildTypeEnum.STALL_TYPE].buildLvl > 0 &&
            gm.data.store_data.isFree;
    }

    protected onDisable(): void {
        gm.ui.off("refresh_red_tips_stall", this.setStallRed, this);
    }
}