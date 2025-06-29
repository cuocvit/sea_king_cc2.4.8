// +-+
import { SettingsData } from './SettingsData';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class SettingsEntry extends NodePoolItem {
    @property(cc.Button)
    private settings_btn: cc.Button | null = null;

    @property(cc.Node)
    private red_point_node: cc.Node | null = null;

    protected onEnable(): void {
        gm.data.event_emitter.on(SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    private update_view(): void {
        this.red_point_node.active = gm.data.server_data.free_rename === 0;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target === this.settings_btn?.node) {
            gm.ui.show_panel(gm.const.Settings);
        }
    }
}