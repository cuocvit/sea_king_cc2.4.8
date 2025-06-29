import { gm } from './GameManager';
import { SpecialEnum } from './Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class Caves extends cc.Component {
    @property(cc.Label)
    private lblTips: cc.Label = null;

    @property(cc.Node)
    private lockNode: cc.Node = null;

    private funCellID: number = 143;

    protected onEnable(): void {
        gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.initCavesNode();
    }

    private openSpecialFun(cellID: number): void {
        if (cellID == this.funCellID) {
            this.initCavesNode();
        }
    }

    private initCavesNode(): void {
        const SpecialByID = gm.data.config_data.getSpecialByID(SpecialEnum.CAVES_TYPE);
        if (SpecialByID) {
            if (gm.data.mapCell_data.role_map_data[SpecialByID.unlock]) {
                const special = gm.data.mapCell_data.specialList[SpecialEnum.CAVES_TYPE];
                if (1 == special.state) {
                    this.lblTips.string = "Kho báu tổ tiên truyền đời! Mau lên đảo khám phá ngay!";
                    this.lockNode.active = true;
                } else if (2 == special.state) {
                    this.lockNode.active = false;
                    const tipsList = ["Chiến đấu vì sự sinh tồn, chiến đấu vì bộ lạc!", "Chúng ta là những chiến binh tự do!", "Hãy cân nhắc sức mạnh của mình trước khi cướp bóc!"];
                    this.lblTips.string = "Chiến đấu vì sự sinh tồn, chiến đấu vì bộ lạc!";
                    this.node.stopAllActions();
                    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(5), cc.callFunc(() => {
                        const randomIndex = Math.floor(Math.random() * tipsList.length);
                        this.lblTips.string = tipsList[randomIndex];
                    }))));
                }
            } else {
                this.lblTips.string = "Mở khóa yêu cầu kết nối đảo với đất liền!!!";
                this.lockNode.active = true;
            }
        }
    }

    private onClick(): void {
        const specialByID = gm.data.config_data.getSpecialByID(SpecialEnum.CAVES_TYPE);
        if (!(specialByID && !gm.data.mapCell_data.role_map_data[specialByID.unlock])) {
            gm.ui.mapMainUI.handAnim.active = false;
            gm.ui.mapMainUI.handAnim.active = false;
            const special = gm.data.mapCell_data.specialList[SpecialEnum.CAVES_TYPE];
            if (1 == special.state) {
                gm.ui.mapMainUI.showCavesLock();
            } else if (2 == special.state) {
                if (gm.data.fight_temp_data.match_caves_map()) {
                    (gm.ui.set_module_args(gm.const.GOBATTLE.key, 2),
                        gm.ui.async_show_module(gm.const.GOBATTLE))
                } else {
                    gm.ui.show_notice("Đã đạt cấp độ cao nhất, hãy chờ cấp độ tiếp theo!!!");
                }
            }
        }
    }

    protected onDisable(): void {
        gm.ui.off("open_special_fun", this.openSpecialFun, this)
    }
}

// export default Caves;