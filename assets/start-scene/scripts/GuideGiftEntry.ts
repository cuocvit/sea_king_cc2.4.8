// +-+
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
class GuideGiftEntry extends NodePoolItem {
    @property(cc.Button)
    private Gift_btn: cc.Button | null = null;

    @property(cc.Node)
    private red_point_node: cc.Node | null = null;

    @property(cc.Label)
    private time_lbl: cc.Label | null = null;

    private endTime: number = 0;
    private timeContainer: number = 0;


    protected onEnable(): void {
        gm.ui.on("guideGiftChange", this.update_view, this);
        this.update_view();
        this.time_lbl.string = "";
    }

    protected update(): void { }

    protected onDisable(): void {
        gm.ui.off("guideGiftChange", this.update_view, this);
    }

    private update_view(): void {
        if (gm.data.mapCell_data.guideGift.guideIsGet) {
            if (this.node.parent) {
                this.node.parent.active = false;
            }
            gm.pool.put(this.node);
            return;
        }
        this.red_point_node.active = true;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.Gift_btn?.node) {
            gm.ui.show_panel(gm.const.GUIDEGIFT);
        }
    }
}

export { GuideGiftEntry };