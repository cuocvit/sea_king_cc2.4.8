import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { MailLogItemData } from '../../start-scene/scripts/MailTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class MailLogNotice extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button = null;

    @property(cc.Button)
    private fail_ok_btn: cc.Button = null;

    @property(cc.Button)
    private success_ok_btn: cc.Button = null;

    @property(cc.Button)
    private revenge_btn: cc.Button = null;

    @property(cc.Label)
    private enemy_name_lbl: cc.Label = null;

    @property(cc.Label)
    private enemy_star_lbl: cc.Label = null;

    @property(ListView)
    private mail_hero_list: ListView = null;

    @property(ListView)
    private mail_log_reward_list: ListView = null;

    @property(cc.Label)
    private star_lbl: cc.Label = null;

    @property(cc.Label)
    private star_change_lbl: cc.Label = null;

    @property(cc.Node)
    private success_node: cc.Node = null;

    @property(cc.Node)
    private fail_node: cc.Node = null;

    private _data: MailLogItemData;

    protected onEnable(): void {
        gm.data.get_player_fight_log_data("1", () => {
            this._data = gm.data.mail_temp_data.mail_defense_log_data_array[0];
            this.update_view();
        });
    }

    protected onDisable(): void { }

    public update_view(): void {
        const data = this._data;
        if (data) {
            this.enemy_name_lbl.string = data.target_nickname;
            this.enemy_star_lbl.string = Math.max(0, data.target_change_star + data.target_star) + "";
            this.star_lbl.string = Math.max(0, data.star + data.change_star) + "";
            this.star_change_lbl.string = (0 < data.change_star ? "+" : "") + data.change_star;
            if ("1" == data.op_type) {
                if (1 == data.op_result) {
                    this.success_node.active = true;
                    this.fail_node.active = false;
                    this.mail_log_reward_list.node.active = false;
                    this.revenge_btn.node.active = false;
                    this.success_ok_btn.node.active = true;
                    this.fail_ok_btn.node.active = false;
                } else {
                    this.success_node.active = false;
                    this.fail_node.active = true;
                    this.mail_log_reward_list.node.active = true;
                    this.mail_log_reward_list.setData(data.op_loss_reward);
                    this.revenge_btn.node.active = true;
                    this.success_ok_btn.node.active = false;
                    this.fail_ok_btn.node.active = true;
                }
            }
            this.mail_hero_list.setData(data.target_op_battle);
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        let data;
        if (event.target == this.close_btn.node ||
            event.target == this.anywhere_close_btn.node ||
            event.target == this.fail_ok_btn.node ||
            event.target == this.success_ok_btn.node) {
            gm.ui.async_hide_module(gm.const.MailLogNotice);

        } else if (event.target != this.revenge_btn.node || (data = this._data) && "" != data.target_uid) {
            gm.data.get_rob_record(data.target_uid, () => {
                gm.ui.mapMainUI.revenge(data.target_uid);
                gm.ui.async_hide_module(gm.const.MailLogNotice);
            })
        }
    }
}