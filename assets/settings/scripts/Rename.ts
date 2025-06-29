import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { RewardIdEnum } from '../../start-scene/scripts/Constants';
import { SettingsData } from '../../start-scene/scripts/SettingsData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class Rename extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button = null;

    @property(cc.EditBox)
    private name_edit: cc.EditBox = null;

    @property(cc.RichText)
    private tip_txt: cc.RichText = null;

    @property(cc.Button)
    private ok_btn: cc.Button = null;

    @property(cc.Button)
    private random_btn: cc.Button = null;

    @property(cc.Node)
    private diamond_node: cc.Node = null;

    @property(cc.Label)
    private diamond_lbl: cc.Label = null;

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
        this.name_edit.placeholderLabel.string = gm.data.server_data.nickname;
        this.name_edit.string = "";
        this.tip_txt.node.active = 0 == gm.data.server_data.free_rename;
        this.diamond_node.active = 0 < gm.data.server_data.free_rename;
        this.diamond_lbl.string = "x" + gm.const.RENAME_DIAMOND_PRICE;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            gm.ui.async_hide_module(gm.const.Rename);

        } else if (event.target == this.ok_btn.node) {
            const nickname = this.name_edit.string.trim()
            if ("" != nickname) {
                gm.data.server_data.rename_nickname(nickname, () => {
                    if (0 == gm.data.server_data.free_rename) {
                        gm.data.server_data.nickname = nickname;
                        gm.data.server_data.free_rename = 1;
                    } else {
                        if (gm.data.mapCell_data.roleCoinData.diamondNum < 50) {
                            gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
                            gm.ui.show_panel(gm.const.GETCOINOP);
                            return;
                        }
                        gm.data.server_data.nickname = nickname;
                        gm.data.mapCell_data.delCellItem(RewardIdEnum.DIAMOND, gm.const.RENAME_DIAMOND_PRICE);
                    }
                    gm.ui.show_notice("Thay đổi tên thành công!!");
                    gm.data.settings_data.async_write_data();
                    this.update_view();
                    gm.ui.async_hide_module(gm.const.Rename);
                })
            } else {
                gm.ui.show_notice("Tên không được để trống!!");
            }
        } else if (event.target == this.random_btn.node) {
            this.name_edit.string = gm.data.server_data.random_nickname();
        }
    }
}