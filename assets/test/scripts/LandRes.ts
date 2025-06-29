import { Utils } from "../../start-scene/scripts/Utils";
import MapEditor from "./MapEditor";

const { ccclass, property } = cc._decorator;

@ccclass
class LandRes extends cc.Component {
    @property(cc.Label)
    private lblTxt: cc.Label = null;

    @property(cc.Node)
    private landNode: cc.Node = null;

    @property(cc.Sprite)
    private landSpr: cc.Sprite = null;

    @property(cc.Node)
    private treeparentNode: cc.Node = null;

    @property(cc.Node)
    private treeNode: cc.Node = null;

    @property([cc.Prefab])
    private animNodeList: cc.Prefab[] = [];

    private _curIndex: number = 0;
    private _cb: ((index: number) => void) | null = null;
    private _cbtarget: MapEditor = null;
    private _treeAnim: number[] = [0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.3, 0.3, 0.3, 0.3];

    public initData(index: number, currentIndex: number, callback: (index: number) => void, callbackTarget?: MapEditor): void {
        this._curIndex = currentIndex;
        this._cb = callback;
        this._cbtarget = callbackTarget;
        this.landNode.active = false;
        this.treeparentNode.active = false;
        if (0 == index) {
            (this.landNode.active = !0,
                Utils.async_set_sprite_frame(this.landSpr, c.BundleName.TEST, "res/" + this._curIndex))
        } else {
            this.treeparentNode.active = true;
            this.treeNode.removeAllChildren();
            this.treeNode.getComponent(cc.Sprite).spriteFrame = null;
            if (100 < this._curIndex) {
                if (142 <= this._curIndex) {
                    if (0 == this.treeNode.childrenCount) {
                        this.treeNode.addChild(cc.instantiate(this.animNodeList[this._curIndex - 142]));
                        this.treeNode.children[0].scale = this._treeAnim[this._curIndex - 142];
                        this.treeNode.children[0].y = 143 == this._curIndex || 144 == this._curIndex || 147 == this._curIndex ? -10 : 0;

                        if (149 <= this._curIndex) {
                            this.treeNode.children[0].y = -13;
                        }
                    }
                } else {
                    Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), c.BundleName.TEST, "res/item" + this._curIndex % 100)
                }
            }
        }
        this.lblTxt.string = "" + this._curIndex;
        this.setSelectColor();
    }

    public setSelectColor(isSelect: boolean = false): void {
        this.node.color = isSelect ? cc.Color.RED : cc.Color.GRAY;
        this.lblTxt.node.color = isSelect ? cc.Color.RED : cc.Color.BLACK;
    }

    private onClick(): void {
        if (this._cb) {
            this._cb(this._curIndex >= 100 ? this._curIndex % 100 : this._curIndex);
            this.setSelectColor(true);
        }
    }
}

export default LandRes;