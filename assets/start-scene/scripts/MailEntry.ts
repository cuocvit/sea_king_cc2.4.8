// +-+
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { BuildTypeEnum } from './Constants';
import { ServerData } from './ServerData';

const { ccclass, property } = cc._decorator;

@ccclass
export class MailEntry extends NodePoolItem {
    @property(cc.Button)
    private mail_btn: cc.Button | null = null;

    @property(cc.Node)
    private red_point_node: cc.Node | null = null;

    protected onEnable(): void {
        gm.data.event_emitter.on(ServerData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(ServerData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    private update_view(): void {
        if (this.red_point_node) {
            this.red_point_node.active = gm.data.server_data.mail_red_point;
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        if (!buildData || buildData.buildLvl < 1) {
            gm.ui.show_notice("Điều kiện mở Liên Minh Hải Vương: Quân đồn trú đạt cấp 1");
        } else if (event.target == this.mail_btn.node) {
            gm.ui.show_panel(gm.const.Mail);
        }
    }
}