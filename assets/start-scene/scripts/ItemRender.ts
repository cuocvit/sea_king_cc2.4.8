// +-+
import { ListViewItem } from "./ListViewItem";
const { ccclass, property } = cc._decorator;

@ccclass
export class ItemRender extends ListViewItem {
  @property(cc.Node)
  private select_node: cc.Node | null = null;

  @property(cc.Label)
  private num_lbl: cc.Label | null = null;

  constructor() {
    super();
  }

  public get data(): ItemRenderVO {
    return this._data;
  }

  public set data(value: ItemRenderVO) {
    this._data = value;
    if (value) {
      this.num_lbl.string = value.id.toString();
    }
  }

  public set select(value: boolean) {
    this._select = value;
    if (this.select_node) {
      this.select_node.active = value;
    }
  }

  public reset(): void {
    super.reset();
    this._data = null;
  }
}

export class ItemRenderVO {
  public id: number = 0;
}