//
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
class StoreEntry extends NodePoolItem {

    protected onEnable(): void {
        if (this.node.parent) {
            this.node.parent.active = true;
        }
        this.node.x = 0;
        this.node.y = 0;
    }

    protected onDisable(): void {
        // No implementation needed
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.node) {
            gm.ui.show_panel(gm.const.RMBSTORE);
        }
    }
}

export { StoreEntry };