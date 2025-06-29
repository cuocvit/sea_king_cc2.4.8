import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { Utils } from '../../start-scene/scripts/Utils';
import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';

const { ccclass, property } = cc._decorator;

@ccclass
export class Mail extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button = null;

    @property([cc.Toggle])
    private tab_tog_array: cc.Toggle[] = [];

    @property(ListView)
    private mail_log_list: ListView = null;

    @property(cc.Node)
    private inbox_node: cc.Node = null;

    @property(ListView)
    private mail_inbox_list: ListView = null;

    @property(cc.Button)
    private delete_all_btn: cc.Button = null;

    @property(cc.Button)
    private receive_all_btn: cc.Button = null;

    private _tab_index: number = -1;

    protected onEnable(): void {
        if (this._tab_index == -1) {
            this._tab_index = 0;
            const currentToggle = this.tab_tog_array[this._tab_index];

            if (!currentToggle.isChecked) {
                currentToggle.check();
                currentToggle.isChecked = true;
            }

            this.editor_on_toggle_change_handler(currentToggle);
            gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);

            if (gm.data.server_data.mail_red_point) {
                gm.data.server_data.mail_red_point = false;
            }

            this.node.active = false;
        }
    }

    protected onDisable(): void {
        this.mail_log_list.reset();
        this.mail_inbox_list.reset();
        this._tab_index = -1;
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        const target = event.target;
        if (target == this.close_btn.node || target == this.anywhere_close_btn.node) {
            gm.ui.async_hide_module(gm.const.Mail);
        } else if (target == this.delete_all_btn.node) {
            if (gm.data.mail_temp_data.mail_inbox_data_array.length > 0) {
                this.delete_all_btn.interactable = false;
                Utils.set_sprite_state(this.delete_all_btn.node, cc.Sprite.State.GRAY);
                this.receive_all_btn.interactable = false;
                Utils.set_sprite_state(this.receive_all_btn.node, cc.Sprite.State.GRAY);
                this.delete_all_mail(() => {
                    this.update_mail_inbox_view();
                });
            }

        } else if (target == this.receive_all_btn.node) {
            if (gm.data.mail_temp_data.mail_inbox_data_array.length > 0) {
                this.delete_all_btn.interactable = false;
                Utils.set_sprite_state(this.delete_all_btn.node, cc.Sprite.State.GRAY);
                this.receive_all_btn.interactable = false;
                Utils.set_sprite_state(this.receive_all_btn.node, cc.Sprite.State.GRAY);
                this.receive_all_mail(() => {
                    this.update_mail_inbox_view();
                });
            }
        }
    }

    private delete_all_mail(callback: () => void): void {
        const mailList = gm.data.mail_temp_data.mail_inbox_data_array;
        if (0 < mailList.length) {
            const mail = mailList.pop();
            if (1 == mail.mail_type && 0 != mail.reward_status) {
                const server = gm.data.server_data;
                const data = {
                    uid: server.uid,
                    token: server.token,
                    mail_id: mail.mail_id,
                    op_status: 2,
                    reward_status: 0
                };
                server.op_player_email((t) => {
                    t.ResultCode;
                    this.delete_all_mail(callback);
                }, data);
            } else {
                this.delete_all_mail(callback);
            }
        } else {
            callback();
        }

    }

    private receive_all_mail(callback: () => void): void {
        const mailList = gm.data.mail_temp_data.mail_inbox_data_array;

        if (mailList.length > 0) {
            const mail = mailList.pop();

            if (mail.mail_type == 1 && mail.reward_status == 0) {
                const mailData = {
                    uid: gm.data.server_data.uid,
                    token: gm.data.server_data.token,
                    mail_id: mail.mail_id,
                    op_status: 0,
                    reward_status: 1,
                };

                gm.data.server_data.op_player_email(() => {
                    this.receive_all_mail(callback);
                }, mailData);
            } else {
                this.receive_all_mail(callback);
            }
        } else {
            callback();
        }
    }

    private editor_on_toggle_change_handler(toggle: cc.Toggle): void {
        this._tab_index = this.tab_tog_array.indexOf(toggle);
        this.mail_log_list.node.active = false;
        this.inbox_node.active = false;
        if (this._tab_index === 0 || this._tab_index === 1) {
            this.mail_log_list.node.active = true;
            this.update_mail_log_view();
        } else if (this._tab_index === 2) {
            this.inbox_node.active = true;
            this.update_mail_inbox_view();
        }
    }

    private update_mail_log_view(): void {
        const index = this._tab_index == 0 ? "1" : "2";
        gm.data.get_player_fight_log_data(index, () => {
            this.mail_log_list.setData(this._tab_index == 0 ? gm.data.mail_temp_data.mail_defense_log_data_array : gm.data.mail_temp_data.mail_attack_log_data_array);
            this.mail_log_list.scrollToTop();
        });
    }

    private update_mail_inbox_view(): void {
        gm.data.get_player_email_data(() => {
            this.mail_inbox_list.setData(gm.data.mail_temp_data.mail_inbox_data_array);
            this.delete_all_btn.interactable = gm.data.mail_temp_data.mail_inbox_data_array.length > 0;
            Utils.set_sprite_state(this.delete_all_btn.node, this.delete_all_btn.interactable ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
            this.receive_all_btn.interactable = gm.data.mail_temp_data.mail_inbox_data_array.length > 0;
            Utils.set_sprite_state(this.receive_all_btn.node, this.receive_all_btn.interactable ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
        });
    }
}