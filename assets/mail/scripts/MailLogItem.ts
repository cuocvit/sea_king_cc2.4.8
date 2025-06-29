// file này không import ở đâu
import { gm } from '../../start-scene/scripts/GameManager';
import { ListView } from '../../start-scene/scripts/ListView';
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { MailLogItemData } from '../../start-scene/scripts/MailTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class MailLogItem extends ListViewItem {
    @property(cc.Label)
    private enemy_name_lbl: cc.Label = null;

    @property(cc.Label)
    private enemy_star_lbl: cc.Label = null;

    @property(cc.Button)
    private replay_btn: cc.Button = null;

    @property(cc.Button)
    private revenge_btn: cc.Button = null;

    @property(ListView)
    private mail_hero_list: ListView = null;

    @property(ListView)
    private mail_log_reward_list: ListView = null;

    @property(cc.Label)
    private star_lbl: cc.Label = null;

    @property(cc.Label)
    private star_change_lbl: cc.Label = null;

    @property(cc.Node)
    private result_bg_node: cc.Node = null;

    @property(cc.Label)
    private result_lbl: cc.Label = null;

    @property(cc.Label)
    private reward_lbl: cc.Label = null;

    @property(cc.Node)
    private reward_bg_node: cc.Node = null;

    public _data: MailLogItemData;

    public get data(): MailLogItemData {
        return this._data;
    }

    public set data(value: MailLogItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        this.enemy_name_lbl.string = this._data.target_nickname;
        this.enemy_star_lbl.string = Math.max(0, this._data.target_change_star + this._data.target_star) + "";
        this.star_lbl.string = Math.max(0, this._data.star + this._data.change_star) + "";
        this.star_change_lbl.string = (0 < this._data.change_star ? "+" : "") + this._data.change_star;

        if ("1" == this._data.op_type) {
            if (1 == this._data.op_result) {
                this.result_lbl.string = "Bảo vệ thành công!";
                this.result_bg_node.color = cc.color().fromHEX("#9DD3EA");
                this.reward_bg_node.color = cc.color().fromHEX("#FEE693");
                this.reward_lbl.string = "Thưởng";
                this.mail_log_reward_list.node.active = false;
                this.star_change_lbl.node.color = cc.color().fromHEX("#FF0000");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = false;

            } else {
                this.result_lbl.string = "Phòng thủ thất bại!";
                this.result_bg_node.color = cc.color().fromHEX("#FF9999");
                this.reward_bg_node.color = cc.color().fromHEX("#cfdce5");
                this.reward_lbl.string = "Mất";
                this.mail_log_reward_list.node.active = false;
                this.mail_log_reward_list.setData(this._data.op_loss_reward);
                this.star_change_lbl.node.color = cc.color().fromHEX("#277E27");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = true;
            }

        } else if ("2" == this._data.op_type) {
            if (1 == this._data.op_result) {
                this.result_lbl.string = "Bạn đã thắng!";
                this.result_bg_node.color = cc.color().fromHEX("#9DD3EA");
                this.reward_bg_node.color = cc.color().fromHEX("#FEE693");
                this.reward_lbl.string = "Thưởng ";
                this.mail_log_reward_list.node.active = true;
                this.mail_log_reward_list.setData(this._data.op_reward);
                this.star_change_lbl.node.color = cc.color().fromHEX("#FF0000");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = false;
            } else {
                this.result_lbl.string = "Bạn thất bại!";
                this.result_bg_node.color = cc.color().fromHEX("#FF9999");
                this.reward_bg_node.color = cc.color().fromHEX("#cfdce5");
                this.reward_lbl.string = "Mất";
                this.mail_log_reward_list.node.active = false;
                this.star_change_lbl.node.color = cc.color().fromHEX("#277E27");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = true;
            }
        }
        this.mail_hero_list.setData(this._data.target_op_battle);
    }

    public reset(): void {
        // Reset logic here
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.replay_btn.node) {
            gm.ui.show_notice("Hãy chờ cập nhật sau!");

        } else if (event.target == this.revenge_btn.node && this._data && "" != this._data.target_uid) {
            gm.data.get_rob_record(this._data.target_uid, () => {
                gm.ui.mapMainUI.revenge(this._data.target_uid);
                gm.ui.async_hide_module(gm.const.Mail);
            })
        }
    }
}
