//
import { gm } from "./GameManager";
import { NodePoolItem } from "./NodePoolItem";
import { MainData } from "./MainData";

const { ccclass, property } = cc._decorator;

@ccclass
class AddDesktopEntry extends NodePoolItem {
    @property(cc.Button)
    private add_desktop_btn: cc.Button = null;

    @property(cc.Node)
    private red_point_node: cc.Node = null;

    // @
    public  onEnable(): void {
        gm.data.event_emitter.on(MainData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    }

    // @
    public onDisable(): void {
        gm.data.event_emitter.off(MainData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    // @
    private  update_view(): void {
        this.node.active = !gm.data.main_data.is_receive_shortcut_reward;
        this.red_point_node.active = !gm.data.main_data.is_receive_shortcut_reward;
    }

    // @
    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target === this.add_desktop_btn.node) {
            gm.ui.show_panel(gm.const.AddDesktop);
        }
    }
}

export { AddDesktopEntry };
