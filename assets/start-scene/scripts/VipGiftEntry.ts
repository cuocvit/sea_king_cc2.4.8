// *-*
import { gm } from "./GameManager";
import { NodePoolItem } from "./NodePoolItem"

const { ccclass, property } = cc._decorator;

@ccclass
export class VipGiftEntry extends NodePoolItem {
    @property(cc.Button)
    private entry_btn: cc.Button | null = null;

    @property(cc.Node)
    private extend_node: cc.Node | null = null;

    protected onEnable(): void {
        if (this.node.parent) {
            this.node.parent.active = true;
        }
    }

    protected onDisable(): void {
        // Add any necessary cleanup logic here
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.node) {
            gm.ui.show_panel(gm.const.VIPGIFT);
        }
    }
}