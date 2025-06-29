// +-+
import { NodePoolItem } from './NodePoolItem';
import { BundleName } from './Constants';
import { SettingsData } from './SettingsData';
import { SignData } from './SignData';
import { gm } from './GameManager';
import { SettingsEntry } from './SettingsEntry';
import { SignEntry } from './SignEntry';

const { ccclass, property } = cc._decorator;

@ccclass
export class MoreEntry extends NodePoolItem {
    @property(cc.Button)
    private entry_btn: cc.Button | null = null;

    @property(cc.Button)
    private more_btn: cc.Button | null = null;

    @property(cc.Node)
    private more_red_node: cc.Node | null = null;

    @property(cc.Node)
    private mail_node: cc.Node | null = null;

    @property(cc.Node)
    private settings_node: cc.Node | null = null;

    @property(cc.Button)
    private close_btn: cc.Button | null = null;

    @property(cc.Node)
    private extend_node: cc.Node | null = null;

    @property(cc.Node)
    private sign_node: cc.Node | null = null;

    protected onEnable(): void {
        this.extend_node.active = false;
        this.node.x = 0;
        this.node.y = 0;
        this.show_settings_entry();
        gm.data.event_emitter.on(SignData.EVENT_DATA_CHANGE, this.update_red_view, this);
        gm.data.event_emitter.on(SettingsData.EVENT_DATA_CHANGE, this.update_red_view, this);
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(SignData.EVENT_DATA_CHANGE, this.update_red_view, this);
        gm.data.event_emitter.off(SettingsData.EVENT_DATA_CHANGE, this.update_red_view, this);
    }

    private update_red_view(): void {
        const isFreeRename = gm.data.server_data.free_rename == 0;
        this.more_red_node.active = isFreeRename;
    }

    private show_settings_entry(): void {
        if (this.settings_node?.childrenCount == 0) {
            gm.pool.async_get(BundleName.SETTINGS, "prefabs/settings_entry", SettingsEntry, (item) => {
                if (!item) return;
                if (this.settings_node?.childrenCount == 0) {
                    this.settings_node.addChild(item.node);
                } else {
                    gm.pool.put(item.node);
                }
            });
        }
    }

    private show_sign_entry(): void {
        if (this.sign_node?.childrenCount == 0) {
            gm.pool.async_get(BundleName.SIGN, "prefabs/sign_entry", SignEntry, (item) => {
                if (!item) return;
                if (this.sign_node?.childrenCount == 0) {
                    this.sign_node.addChild(item.node);
                } else {
                    gm.pool.put(item.node);
                }
            });
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.entry_btn.node) {
            gm.ui.show_panel(gm.const.Ladder);
        } else if (event.target == this.more_btn?.node) {
            this.extend_node.active = !this.extend_node.active;
        } else if (event.target == this.close_btn?.node) {
            this.extend_node.active = false;
        }
    }
}