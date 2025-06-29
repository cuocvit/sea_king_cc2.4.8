import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { FightResultPropItemData } from '../../start-scene/scripts/FightTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class FightResultPropItem extends ListViewItem {
  @property(cc.Sprite)
  private color_spr: cc.Sprite | null = null;

  @property(cc.Sprite)
  private prop_spr: cc.Sprite | null = null;

  @property(cc.Label)
  private num_lbl: cc.Label | null = null;

  constructor() {
    super();
  }

  public get data(): FightResultPropItemData | null {
    return this._data;
  }

  public set data(value: FightResultPropItemData | null) {
    this._data = value;
    this.update_view();
  }

  public update_view(): void {
    if (!this._data) return;
    Utils.async_set_sprite_frame(this.color_spr, BundleName.COMMON, "res/color_" + this._data.color);
    if (this._data.type == 1) {
      Utils.async_set_sprite_frame(this.prop_spr, BundleName.COMMON, "res/handbook/" + this._data.id);
      this.num_lbl.string = this._data.num.toString();
      this.num_lbl.node.active = true;
    } else {
      Utils.async_set_sprite_frame(this.prop_spr, BundleName.COMMON, "res/handbook/" + this._data.id);
      this.num_lbl.node.active = false;
      Utils.set_sprite_state(this.color_spr.node, cc.Sprite.State.GRAY);
      Utils.set_sprite_state(this.prop_spr.node, cc.Sprite.State.GRAY);
    }
    this.num_lbl.node.active = this._data.type == 1;
  }

  public reset(): void {
    this.prop_spr.spriteFrame = null;
    this.num_lbl.string = "";
  }
}
