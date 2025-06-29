// *-*
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { roleBarrelItemVO } from './MapCellCfgData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class WaterBarrelItem extends NodePoolItem {
  @property(cc.Sprite)
  private barrelSpr: cc.Sprite | null = null;

  private _curBarrelData: roleBarrelItemVO;
  private _curIndex: number;

  constructor() {
    super();
    this._curIndex = 0;
    this._curBarrelData = {} as roleBarrelItemVO;
  }

  public initData(curBarrelData: roleBarrelItemVO, curIndex: number): void {
    this._curBarrelData = curBarrelData;
    this.node.position = this._curBarrelData.itemPos;
    this._curIndex = curIndex;
  }

  protected onEnable(): void {
    Utils.async_set_sprite_frame(this.barrelSpr, BundleName.MAP, "res/barrel/" + this._curBarrelData.itemID),
      this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, (t, e) => {
        if ("case_open" == e.name) {
          this.node.getComponent(cc.Button).interactable = true;
          this.node.getComponent(cc.Animation).play("case_normal");

        } else if ("case_close" == e.name) {
          gm.data.mapCell_data.addBarrelInMap(this._curBarrelData.itemID);
          gm.pool.put(this.node);
          if (gm.data.mapCell_data.isGuide) {
            gm.ui.mapMainUI.checkHandAnimDelay();
          }
        }
      }, this);

    for (let index = 0; index < this.node.childrenCount; index++) {
      this.node.children[index].opacity = 0;
    }

    this.scheduleOnce(() => {
      this.node.getComponent(cc.Animation).play("case_open");
    }, .3 * this._curIndex);
  }

  private onClickOpen(): void {
    if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
      gm.audio.play_effect(gm.const.AUDIO_10_JIANMUTONG);
      for (let index = 0; index < gm.data.mapCell_data.waterBarrelList.length; index++) {
        if (gm.data.mapCell_data.waterBarrelList[index].itemIndex == this._curBarrelData.itemIndex) {
          gm.data.mapCell_data.waterBarrelList.splice(index, 1);
          gm.data.mapCell_data.async_write_data();
        }
      }
      gm.ui.mapMainUI.handAnim.active = false,
        this.node.getComponent(cc.Button).interactable = false,
        this.node.getComponent(cc.Animation).play("case_close")
    } else {
      gm.ui.show_auto_merge_message();
    }
  }

  protected onDisable(): void {
    this.node.getComponent(cc.Animation).targetOff(this);
  }
}