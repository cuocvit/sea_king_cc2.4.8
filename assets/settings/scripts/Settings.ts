import { ChannelManager, BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { SettingsData } from '../../start-scene/scripts/SettingsData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class Settings extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button = null;

    @property(cc.Label)
    private name_lbl: cc.Label = null;

    @property(cc.Button)
    private rename_btn: cc.Button = null;

    @property(cc.Node)
    private rename_red_node: cc.Node = null;

    @property(cc.Label)
    private device_id_lbl: cc.Label = null;

    @property(cc.Label)
    private uid_lbl: cc.Label = null;

    @property(cc.Button)
    private clear_ware_house_btn: cc.Button = null;

    @property(cc.Button)
    private copy_btn: cc.Button = null;

    @property(cc.Label)
    private cp_lbl: cc.Label = null;

    @property(cc.Label)
    private version_lbl: cc.Label = null;

    @property(cc.Button)
    private user_agreement_btn: cc.Button = null;

    @property(cc.Button)
    private privacy_policy_btn: cc.Button = null;

    @property(cc.Button)
    private announcement_btn: cc.Button = null;

    protected onEnable(): void {
        gm.data.event_emitter.on(SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    public update_view(): void {
        this.name_lbl.string = gm.data.server_data.nickname || gm.data.server_data.uid;
        this.device_id_lbl.string = gm.channel.get_device_id();
        this.uid_lbl.string = gm.data.server_data.uid;
        this.cp_lbl.string = "Nhà phát triển: DEFIX NETWORK";
        this.version_lbl.string = "Phiên bản：v" + gm.channel.get_version_name() + "_" + gm.channel.get_version_code();
        this.rename_red_node.active = 0 == gm.data.server_data.free_rename;

        const channelName = gm.channel.get_channel_name();
        if (channelName == ChannelManager.TAP_TAP_GAME ||
            channelName == ChannelManager.OHAYOO_GAME ||
            channelName == ChannelManager.MOMOYU_GAME ||
            channelName == ChannelManager.KE_SHENG_GAME) {
            this.privacy_policy_btn.node.active = true;
            this.user_agreement_btn.node.active = true;
            this.copy_btn.node.active = true;
        } else {
            this.privacy_policy_btn.node.active = false;
            this.user_agreement_btn.node.active = false;
            this.copy_btn.node.active = false;
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            gm.ui.async_hide_module(gm.const.Settings);

        } else if (event.target == this.user_agreement_btn.node) {
            if (gm.channel.get_channel_name() == ChannelManager.OHAYOO_GAME) {
                cc.sys.openURL("https://zjsms.com/efCf5c3/");

            } else if (!(gm.channel.get_channel_name() != ChannelManager.TAP_TAP_GAME &&
                gm.channel.get_channel_name() != ChannelManager.MOMOYU_GAME &&
                gm.channel.get_channel_name() != ChannelManager.KE_SHENG_GAME)) {
                cc.sys.openURL("https://cdnres.qszhg.6hwan.com/sailing/remote/user_agreement.html");
            }

        } else if (event.target == this.privacy_policy_btn.node) {
            if (gm.channel.get_channel_name() == ChannelManager.OHAYOO_GAME) {
                cc.sys.openURL("https://zjsms.com/efhFTUT/");

            } else if (!(gm.channel.get_channel_name() != ChannelManager.TAP_TAP_GAME &&
                gm.channel.get_channel_name() != ChannelManager.MOMOYU_GAME &&
                gm.channel.get_channel_name() != ChannelManager.KE_SHENG_GAME)) {
                cc.sys.openURL("https://cdnres.qszhg.6hwan.com/sailing/remote/privacy_agreement.html");
            }

        } else if (event.target == this.clear_ware_house_btn.node) {
            gm.data.mapCell_data.clearWareHouseList();
            gm.ui.show_notice("Cabin đã được dọn sạch!!!");

        } else if (event.target == this.copy_btn.node) {
            const deviceID = this.device_id_lbl.string.trim();
            if ("" != deviceID) {
                gm.channel.copy_to_clipboard(deviceID);
            }

        } else if (event.target == this.rename_btn.node) {
            gm.ui.async_show_module(gm.const.Rename);

        } else if (event.target == this.announcement_btn.node) {
            gm.ui.async_show_module(gm.const.Announcement);
        }
    }
}
