// +-+
import { LuckyWheelData } from './LuckyWheelData';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class LuckyWheelEntry extends NodePoolItem {
    @property(cc.Button)
    private lucky_wheel_btn: cc.Button | null = null;

    @property(cc.Node)
    private red_point_node: cc.Node | null = null;

    protected onEnable(): void {
        gm.data.event_emitter.on(LuckyWheelData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(LuckyWheelData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    private update_view(): void {
        this.red_point_node.active = gm.data.lucky_wheel_data.left_lucky_wheel_video_count > 0;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.lucky_wheel_btn!.node) {
            gm.ui.show_panel(gm.const.LuckyWheel);
        }
    }
}