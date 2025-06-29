// +-+
import { SignData } from "./SignData";
import { gm } from "./GameManager";
import { NodePoolItem } from "./NodePoolItem";

const { ccclass, property } = cc._decorator;

@ccclass
export class SignEntry extends NodePoolItem {
    @property(cc.Button)
    private sign_btn: cc.Button | null = null;

    @property(cc.Node)
    private red_point_node: cc.Node | null = null;

    protected onEnable(): void {
        gm.data.event_emitter.on(
            SignData.EVENT_DATA_CHANGE,
            this.update_view,
            this
        );
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(
            SignData.EVENT_DATA_CHANGE,
            this.update_view,
            this
        );
    }

    private update_view(): void {
        const signData = gm.data.sign_data;
        this.red_point_node.active =
            signData.sign_state < 3 ||
            signData.sign_buy_data_array[0].state < 2;
    }

    public editor_on_button_click_handler(event: cc.Event): void {
        if (event.target === this.sign_btn?.node) {
            gm.ui.show_panel(gm.const.Sign);
        }
    }
}
