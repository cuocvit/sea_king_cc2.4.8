//
import { SpecialEnum } from './Constants';
import { gm } from './GameManager';

const { ccclass, property } = cc._decorator;

@ccclass
class SpritiItem extends cc.Component {
    @property(cc.Label)
    private lblTips: cc.Label | null = null;

    @property(cc.Node)
    private lockNode: cc.Node | null = null;

    private funCellID: number = 223;

    protected onLoad(): void {
        this.node.getComponent(sp.Skeleton).setCompleteListener(() => {
            if ("tree unlocking" == this.node.getComponent(sp.Skeleton).animation) {
                this.node.getComponent(sp.Skeleton).clearTracks();
                this.node.getComponent(sp.Skeleton).animation = null;
                this.node.getComponent(sp.Skeleton).setAnimation(0, "tree fly long", true);
            }
        })
    }

    protected onEnable(): void {
        gm.ui.on("play_spriti_fly", this.playFly, this);
        gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.initSpiritNode()
    }

    private openSpecialFun(num: number): void {
        if (num == this.funCellID) {
            this.initSpiritNode();
        }
    }

    private initSpiritNode(): void {
        let specialConfig = gm.data.config_data.getSpecialByID(SpecialEnum.SPIRIT_TYPE);
        if (specialConfig) {
            if (gm.data.mapCell_data.role_map_data[specialConfig.unlock]) {
                const special = gm.data.mapCell_data.specialList[SpecialEnum.SPIRIT_TYPE];
                if (1 == special.state) {
                    this.lblTips.string = "Rơi vào bẫy của con rồng lửa độc ác, bạn cần có sức mạnh của linh hồn biển để mở khóa!";
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "tree binding", true);
                    this.lockNode.active = true;
                } else if (2 == special.state) {
                    this.lockNode.active = false;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "tree fly long", true);
                    this.node.stopAllActions();
                    const tips = ["Tôi cũng có thể truyền sức mạnh của Poseidon để giúp bạn!",
                        "Càng nhiều linh hồn biển, sức mạnh của Poseidon càng mạnh!",
                        "Linh hồn biển có thể được lấy từ Bàn thờ Poseidon và khi anh hùng chết!"];
                    this.node.stopAllActions();
                    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(5),
                        cc.callFunc(() => {
                            const randomTipIndex = Math.floor(Math.random() * tips.length);
                            this.lblTips.string = tips[randomTipIndex]
                        }))))
                }
            } else {
                this.lblTips.string = "Để mở khóa, bạn cần kết nối hòn đảo với đất liền!";
                this.node.getComponent(sp.Skeleton).setAnimation(0, "tree binding", true);
                this.lockNode.active = true;
            }
        }
    }

    private playFly(): void {
        this.node.getComponent(sp.Skeleton).setAnimation(0, "tree unlocking", false);
    }

    protected onDisable(): void {
        this.node.stopAllActions();
        gm.ui.off("play_spriti_fly", this.playFly, this);
        gm.ui.off("open_special_fun", this.openSpecialFun, this);
    }

    private onClick(): void {
        var specialConfig = gm.data.config_data.getSpecialByID(SpecialEnum.SPIRIT_TYPE);
        if (!(specialConfig && !gm.data.mapCell_data.role_map_data[specialConfig.unlock])) {
            gm.ui.mapMainUI.handAnim.active = false;
            const special = gm.data.mapCell_data.specialList[SpecialEnum.SPIRIT_TYPE];
            if (1 == special.state) {
                gm.ui.mapMainUI.showSpiritLock();
            } else if (2 == special.state) {
                gm.ui.async_show_module(gm.const.POSEIDON);
            }
        }
    }
}

export default SpritiItem;