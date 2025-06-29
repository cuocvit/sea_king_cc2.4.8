import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class MailLogRewardItem extends ListViewItem {
  @property(cc.Sprite)
  private item_spr: cc.Sprite | null = null;

  @property(cc.Label)
  private num_lbl: cc.Label | null = null;

  public get data(): { id: string; num: number } {
    return this._data;
  }

  public set data(value: { id: string; num: number }) {
    this._data = value;
    this.update_view();
  }

  public update_view(): void {
    Utils.async_set_sprite_frame(this.item_spr, BundleName.COMMON, "res/handbook/" + this._data.id);
    this.num_lbl.string = "x" + this._data.num;
  }

  public reset(): void {
    this.item_spr.spriteFrame = null;
    this.num_lbl.string = "";
  }
}
