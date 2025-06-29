import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName } from '../../start-scene/scripts/Constants';
import { Utils } from '../../start-scene/scripts/Utils';
import { DecorateConfig } from '../../common/configs/decorate';
import { FightDecorationItemData } from '../../start-scene/scripts/FightTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class FightDecorationItem extends NodePoolItem {
  @property(cc.Node)
  private decoration_node: cc.Node | null = null;

  @property(cc.Sprite)
  private decoration_spr: cc.Sprite | null = null;

  private _data: FightDecorationItemData;

  public get data(): FightDecorationItemData {
    return this._data;
  }

  public set data(value: FightDecorationItemData) {
    this._data = value;
    this.update_view();
  }

  public update_view(): void {
    if (this._data) {
      this.decoration_node.x = this._data.plant_x_offset;
      this.decoration_node.y = this._data.plant_y_offset - 48;
      const decorationConfig = gm.config.get_row_data("DecorateConfigData", this._data.decoration_id + "") as DecorateConfig;
      if (decorationConfig) {
        if (decorationConfig.animID !== "") {
          if (this.decoration_node.childrenCount == 0) {
            gm.pool.async_get(BundleName.MAP, decorationConfig.animID, NodePoolItem, (nodeItem) => {
              if (this.decoration_node.childrenCount == 0) {
                this.decoration_node.addChild(nodeItem.node);
              }
            });
          }
        } else {
          Utils.async_set_sprite_frame(this.decoration_spr, BundleName.TEST, "res/" + decorationConfig.imgID);
        }
      }
    }
  }

  public reset(): void {
    this.decoration_spr.spriteFrame = null;
    gm.pool.put_children(this.decoration_node);
  }

  public unuse(): void {
    super.unuse();
    this.reset();
  }
}

export { FightDecorationItem };