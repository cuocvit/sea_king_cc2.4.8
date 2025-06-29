import MapEditor from './MapEditor';
import { MapItemVo } from './MapItemVo';

const { ccclass, property } = cc._decorator;

@ccclass
class MapMgr extends cc.Component {
  @property(cc.EditBox)
  private edit1: cc.EditBox = null;

  @property(cc.EditBox)
  private edit2: cc.EditBox = null;

  @property(cc.Node)
  private mapNode: cc.Node = null;

  @property(cc.Node)
  private itemNode: cc.Node = null;

  @property(cc.Node)
  private bigMapNode: cc.Node = null;

  private num1: number = 0;
  private num2: number = 0;
  private _mapList: (MapItemVo | null)[] = [];

  protected onEnable(): void {
    this.bigMapNode.on(cc.Node.EventType.TOUCH_MOVE, (t) => {
      this.bigMapNode.y += t.getDelta().y;
    }, this);

    this.itemNode.removeFromParent();
    this.clearAllNode();
    this._mapList = [];

    const map = cc.sys.localStorage.getItem("mapData_sailing");
    console.log("Map: ", map);
    if (map) {
      const data = JSON.parse(map);
      this.num1 = data.row;
      this.num2 = data.col;
      this._mapList = data.mapData;

      if (!(20 < this.num1 || this.num1 <= 0 || 23 < this.num2 || this.num2 <= 0)) {
        this.mapNode.width = 50 * this.num1, this.clearAllNode();
        for (let num2 = this.bigMapNode.y = 0; num2 < this.num2; num2++) {
          for (let num1 = 0; num1 < this.num1; num1++) {
            const instant = cc.instantiate(this.itemNode);
            instant.children[0].getComponent(cc.Label).string = num2 * this.num1 + num1 + "";
            instant.color = null == data.mapData[num2 * this.num1 + num1] ? cc.Color.WHITE : cc.Color.RED;
            data.mapData[num2 * this.num1 + num1];
            this.mapNode.addChild(instant);
            this.mapNode.children[num2].targetOff(this);
          }
        }

        for (let index = 0; index < this.mapNode.childrenCount; index++) {
          ((index: number) => {
            this.mapNode.children[index].targetOff(this);
            this.mapNode.children[index].on(cc.Node.EventType.TOUCH_END, () => {
              if (this.mapNode.children[index].color.toString() == cc.Color.WHITE.toString()) {
                this.mapNode.children[index].color = cc.Color.RED;
                const mapItemVo = new MapItemVo
                mapItemVo.itemID = index;
                mapItemVo.itemIndex = 0;
                mapItemVo.itemImgIndex = 1;
                mapItemVo.itemYOffset = 9;
                mapItemVo.itemTreeId = 0;
                mapItemVo.itemTreeX = 0;
                mapItemVo.itemTreeY = 76;
                mapItemVo.isObstruct = 0;
                this._mapList[index] = mapItemVo;
              } else {
                this.mapNode.children[index].color = cc.Color.WHITE;
                this._mapList[index] = null;
              }
            }, this)
          })(index);
        }
      }
    }
  }

  protected onDisable(): void { }

  private clearAllNode(): void {
    this.mapNode.children.forEach((child) => {
      child.targetOff(this);
      child.destroy();
      child.removeFromParent();
    });

    this.mapNode.removeAllChildren();
    this.edit1.string = "0";
    this.edit2.string = "0";
  }

  private onClickNewEdit(): void {
    this.num1 = parseInt(this.edit1.string);
    this.num2 = parseInt(this.edit2.string);

    if (!(20 < this.num1 || this.num1 <= 0 || 23 < this.num2 || this.num2 <= 0)) {
      this.mapNode.width = 50 * this.num1;
      this.clearAllNode();

      for (let num2 = this.bigMapNode.y = 0; num2 < this.num2; num2++) {
        for (let num1 = 0; num1 < this.num1; num1++) {
          var o = cc.instantiate(this.itemNode);
          o.children[0].getComponent(cc.Label).string = num2 * this.num1 + num1 + "";
          o.color = cc.Color.WHITE;
          this.mapNode.addChild(o);
          this.mapNode.children[num2].targetOff(this);
          this._mapList.push(null);
        }
      }
      this.bigMapNode.on(cc.Node.EventType.TOUCH_MOVE, (t) => {
        this.bigMapNode.y += t.getDelta().y;
      }, this);

      for (let index = 0; index < this.mapNode.childrenCount; index++) {
        ((index: number) => {
          this.mapNode.children[index].on(cc.Node.EventType.TOUCH_END, () => {
            if (this.mapNode.children[index].color.toString() == cc.Color.WHITE.toString()) {
              this.mapNode.children[index].color = cc.Color.RED;
              const mapItemVo = new MapItemVo;
              mapItemVo.itemID = index;
              mapItemVo.itemIndex = 0;
              mapItemVo.itemImgIndex = 1;
              mapItemVo.itemYOffset = 9;
              mapItemVo.itemTreeId = 0;
              mapItemVo.itemTreeX = 0;
              mapItemVo.itemTreeY = 76;
              mapItemVo.isObstruct = 0;
              mapItemVo.areaID = 0;
              this._mapList[index] = mapItemVo;
            } else {
              this.mapNode.children[index].color = cc.Color.WHITE;
              this._mapList[index] = null;
            }
          }, this)
        })(index)
      }
    }
  }

  private onClickCreateMap(): void {
    let itemIndex = 0;
    for (let i = 0; i < this._mapList.length; i++) {
      if (this._mapList[i]) {
        this._mapList[i].itemIndex = itemIndex;
        itemIndex++;
      }
    }
    console.log(this._mapList);
    const mapData = { row: this.num1, col: this.num2, mapData: this._mapList };
    cc.sys.localStorage.setItem("mapData_sailing", JSON.stringify(mapData));
    this.node.parent.getChildByName("MapEdit").getComponent(MapEditor).initData(this.num1, this.num2, this._mapList);
    this.node.parent.getChildByName("MapEdit").active = true;
    this.node.active = false;
  }
}
