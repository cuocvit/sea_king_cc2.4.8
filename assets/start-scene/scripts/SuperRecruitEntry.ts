// *-*
import { gm } from "./GameManager";
import { NodePoolItem } from "./NodePoolItem";

const { ccclass, property } = cc._decorator;

@ccclass
export class SuperRecruitEntry extends NodePoolItem {
    @property(cc.Button)
    private super_recruit_btn: cc.Button | null = null;

    @property(cc.Node)
    private red_point_node: cc.Node | null = null;

    private _is_show_red: boolean = true;

    protected onEnable(): void {
        this.update_view();
    }

    protected onDisable(): void {
        // Add any necessary cleanup logic here
    }

    private update_view(): void {
        this.red_point_node.active = this._is_show_red;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.super_recruit_btn.node) {
            gm.ui.show_panel(gm.const.SuperRecruit);
            if (this._is_show_red) {
                this._is_show_red = false;
                this.update_view();
            }
        }
    }
}
