// *-*
import { GameModule } from './GameModule';
import { gm } from './GameManager';
import { SpecialEnum } from './Constants';
import { TaskConditionType } from './TaskData';
import { ReportData } from './NetUtils';

const { ccclass, property } = cc._decorator;

@ccclass
export class TortoiseTreasure extends GameModule {
    @property(cc.Label)
    private tipLbl: cc.Label | null = null;

    @property(cc.Node)
    private lockNode: cc.Node | null = null;

    private funCellID: number = 235;

    protected onEnable(): void {
        gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.node.getComponent(sp.Skeleton).setAnimation(0, "stay2", true);
        this.initTortoise();
    }

    private openSpecialFun(eventID: number): void {
        if (eventID === this.funCellID) {
            gm.data.task_data.update_task_progress(TaskConditionType.UNLOCK_TURTLE);
            gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "神龟")
            });
            ReportData.instance.report_once_point(10601);
            this.initTortoise();
        }
    }

    private initTortoise(): void {
        this.lockNode.active = false;
        let randomTipIndex: number;
        const specialData = gm.data.config_data.getSpecialByID(SpecialEnum.TORTOISE_TYPE);
        if (specialData) {
            const roleData = gm.data.mapCell_data.role_map_data[specialData.unlock];
            if (roleData && roleData.itemState === 2) {
                const tips: string[] = [
                    "Đây toàn là bảo vật đấy, ai dùng rồi mới biết giá trị của nó!",
                    "Kho báu ở đây đều là của ta, muốn cướp à? Không có cửa đâu!",
                    "Ta chỉ còn chút tài sản này thôi, hãy xem xét mà cho hợp lý.",
                    "Cái gì?! Hết tiền à?! Đừng làm phiền ta nghỉ ngơi!"
                ];
                randomTipIndex = Math.floor(Math.random() * tips.length);
                this.tipLbl.string = tips[randomTipIndex];
                this.node.stopAllActions();
                this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(8), cc.callFunc(() => {
                    randomTipIndex = Math.floor(Math.random() * tips.length);
                    this.tipLbl.string = tips[randomTipIndex];
                }))));
            } else {
                this.tipLbl.string = "解锁需打通岛屿的陆地连接！";
                this.lockNode.active = true;
            }
        }
    }

    protected onDisable(): void {
        gm.ui.off("open_special_fun", this.openSpecialFun, this);
        this.node.stopAllActions();
    }

    private onClickTurtleExchange(): void {
        const specialData = gm.data.config_data.getSpecialByID(SpecialEnum.TORTOISE_TYPE);
        if (!(specialData && !gm.data.mapCell_data.role_map_data[specialData.unlock])) {
            gm.ui.mapMainUI.handAnim.active = false;
            gm.ui.show_panel(gm.const.SuperRecruit);
        }
    }
}