import { gm } from '../../start-scene/scripts/GameManager';
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { MailInboxItemData } from '../../start-scene/scripts/MailTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class MailInboxItem extends ListViewItem {
  @property(cc.Button)
  private open_btn: cc.Button = null;

  @property(cc.Sprite)
  private icon_spr: cc.Sprite = null;

  @property(cc.Label)
  private title_lbl: cc.Label = null;

  @property(cc.Label)
  private content_lbl: cc.Label = null;

  @property(cc.Node)
  private unread_node: cc.Node = null;

  @property(cc.Node)
  private read_node: cc.Node = null;

  public _data: MailInboxItemData;

  public get data(): MailInboxItemData {
    return this._data;
  }

  public set data(value: MailInboxItemData) {
    this._data = value;
    this.update_view();
  }

  public update_view(): void {
    this.title_lbl.string = this._data.mail_title;
    this.content_lbl.string = this._data.mail_text;
    this.unread_node.active = this._data.op_status == 0;
    this.read_node.active = this._data.op_status == 1;
    Utils.async_set_sprite_frame(this.icon_spr, BundleName.MAIL, "res/icon_" + this._data.mail_type);
  }

  public reset(): void {
    this.title_lbl.string = "";
    this.content_lbl.string = "";
    this.unread_node.active = false;
    this.read_node.active = false;
    this.icon_spr.spriteFrame = null;
  }

  private editor_on_button_click_handler(event: cc.Event): void {
    if (event.target == this.open_btn.node) {
      if (0 == this._data.op_status) {
        const serverData = gm.data.server_data
        const requestData = {
          uid: serverData.uid,
          token: serverData.token,
          mail_id: this._data.mail_id,
          op_status: 1,
          reward_status: 0
        };

        serverData.op_player_email((response) => {
          if (0 == response.ResultCode) {
            this._data.op_status = 1;
            this.update_view();
            gm.ui.set_module_args(gm.const.MailDetails.key, {
              data: this._data
            });
            gm.ui.async_show_module(gm.const.MailDetails);
          }
        }, requestData)

      } else {
        gm.ui.set_module_args(gm.const.MailDetails.key, {
          data: this._data
        });
        gm.ui.async_show_module(gm.const.MailDetails);
      }
    }
  }
}
