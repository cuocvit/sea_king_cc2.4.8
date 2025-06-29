import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName } from '../../start-scene/scripts/Constants';
import { ItemConfig } from '../../common/configs/item';
import { FightPropItemData } from '../../start-scene/scripts/FightTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class FightPropItem extends NodePoolItem {
  @property(cc.Sprite)
  private prop_spr: cc.Sprite | null = null;

  @property(cc.Label)
  private num_lbl: cc.Label | null = null;

  private _data: FightPropItemData;

  public get data(): FightPropItemData {
    return this._data;
  }

  public set data(value: FightPropItemData) {
    this._data = value;
    this.update_view();
  }

  private update_view(): void {
    const itemData = gm.config.get_row_data("ItemConfigData", this._data.id.toString()) as ItemConfig;
    if (itemData) {
      if (itemData.anim_name == "") {
        Utils.async_set_sprite_frame(this.prop_spr, BundleName.MAP, "res/" + this._data.id);
        gm.pool.put_children(this.prop_spr.node);
      } else {
        this.prop_spr.spriteFrame = null;
        gm.pool.put_children(this.prop_spr.node);
        gm.pool.async_get(BundleName.MAP, "prefabs/item/" + itemData.anim_name, NodePoolItem, (item) => {
          if (this.prop_spr.node.childrenCount == 0) {
            this.prop_spr.node.addChild(item.node);
            const animation = item.getComponent(cc.Animation);
            if (animation) animation.play();
          }
        });
      }
      if (gm.data.fight_temp_data.is_debug) {
        this.num_lbl.node.active = true;
        this.num_lbl.string = this._data.num.toString();
      } else {
        this.num_lbl.node.active = false;
      }
    }
  }

  public reset(): void {
    if (this.prop_spr) this.prop_spr.spriteFrame = null;
    if (this.num_lbl) this.num_lbl.string = "";
  }
}

export { FightPropItem };