import { gm } from '../../start-scene/scripts/GameManager';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';

const { ccclass, property } = cc._decorator;

interface FightNumItemData {
  id: number;
  num: number;
  delay: number;
}

@ccclass
class FightNumItem extends NodePoolItem {
  @property(cc.Label)
  text_lbl: cc.Label | null = null;

  private _data: FightNumItemData | null = null;

  public get data(): FightNumItemData | null {
    return this._data;
  }

  public set data(value: FightNumItemData | null) {
    this._data = value;
    this.update_view();
  }

  protected onEnable(): void {
    if (this._data) {
      cc.tween(this.node)
        .hide()
        .delay(this._data.delay)
        .show()
        .to(0.5, {
          position: cc.v3(this.node.position.x, this.node.position.y + 60),
          opacity: 255
        })
        .removeSelf()
        .start();
    }
  }

  private update_view(): void {
    if (this._data) {
      let displayText: string = this._data.num.toString();
      switch (this._data.id) {
        case 0:
          displayText = `${this._data.num}`;
          break;
        case 1:
          displayText = `暴击 ${this._data.num}`;
          break;
        case 2:
          displayText = `+${this._data.num}`;
          break;
        default:
          console.error("NumItem不存在数字类型");
      }
      this.text_lbl.node.color = NUM_COLOR_ARRAY[this._data.id];
      this.text_lbl.string = displayText;
    }
  }

  private reset(): void {
    this._data = null;
    if (this.text_lbl) {
      this.text_lbl.string = "";
    }
    cc.tween(this.node).stop();
  }

  public unuse(): void {
    super.unuse();
    this.reset();
  }
}

const NUM_COLOR_ARRAY: cc.Color[] = [
  gm.const.COLOR_RED,
  gm.const.COLOR_RED,
  cc.Color.GREEN,
  gm.const.COLOR_YELLOW
];

export { FightNumItem, FightNumItemData };