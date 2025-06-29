// +-+
import { gm } from "./GameManager";
import { BANNER_AD_TYPE } from "./ChannelManager";
import { GameModule } from "./GameModule";

const { ccclass, property } = cc._decorator;

@ccclass
export class AutoMergeMessage extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button | null = null;

    @property(cc.Button)
    private ok_btn: cc.Button | null = null;

    @property(cc.Button)
    private video_btn: cc.Button | null = null;

    @property(cc.Button)
    private free_btn: cc.Button | null = null;

    protected onEnable(): void {
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
        this.free_btn.node.active = false;
        this.video_btn.node.active = false;
        this.free_btn.node.active = gm.data.mapCell_data.is_first_auto_compose == 0;
        this.video_btn.node.active = !this.free_btn?.node.active;
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn?.node || event.target == this.ok_btn?.node) {
            gm.ui.async_hide_module(gm.const.AutoMergeMessage);
        } else if (event.target == this.video_btn?.node) {
            gm.channel.show_video_ad(() => {
                gm.data.event_emitter.emit("auto_merge_message");
                gm.ui.async_hide_module(gm.const.AutoMergeMessage);
            }, 1);
        } else if (event.target == this.free_btn?.node) {
            gm.data.event_emitter.emit("auto_merge_message");
            gm.ui.async_hide_module(gm.const.AutoMergeMessage);
        }
    }
}