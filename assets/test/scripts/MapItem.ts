import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { MapItemVo } from './MapItemVo';
import MapEditor from './MapEditor';

const { ccclass, property } = cc._decorator;

@ccclass
class MapItem extends cc.Component {
    @property(cc.Label)
    private lblTxt: cc.Label = null;

    @property(cc.Node)
    private landNode: cc.Node = null;

    @property(cc.Node)
    private treeNode: cc.Node = null;

    @property(cc.Sprite)
    private landBg: cc.Sprite = null;

    @property([cc.SpriteFrame])
    private landBgSprList: cc.SpriteFrame[] = [];

    @property([cc.Prefab])
    private animNodeList: cc.Prefab[] = [];

    private _mapEdir: MapEditor = null;
    public _mapItemData: MapItemVo = null; //
    private _startTime: number = 0;

    public initData(mapItemData: MapItemVo, mapEdir: MapEditor): void {
        this._mapItemData = mapItemData;
        this._mapEdir = mapEdir;
        this.lblTxt.string = `${this._mapItemData.itemID}`;
        Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, `res/${this._mapItemData.itemImgIndex}`);
        this.treeNode.active = this._mapItemData.itemTreeId > 0;
        this.node.children[0].y = this._mapItemData.itemYOffset;
        this.treeNode.removeAllChildren();
        this.treeNode.getComponent(cc.Sprite).spriteFrame = null;

        if (this.treeNode.active) {
            this.treeNode.x = this._mapItemData.itemTreeX;
            this.treeNode.y = this._mapItemData.itemTreeY;

            if (this._mapItemData.itemTreeId >= 42) {
                if (this.treeNode.childrenCount === 0) {
                    this.treeNode.addChild(cc.instantiate(this.animNodeList[this._mapItemData.itemTreeId - 42]));
                }
            } else {
                this._mapItemData.itemTreeY = 72;
                Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), BundleName.TEST, `res/item${this._mapItemData.itemTreeId}`);
            }
        }
    }

    public setImgListBg(index: number): void {
        this.landBg.spriteFrame = this.landBgSprList[index];
    }

    public setLandImg(index: number): void {
        this._mapItemData.itemImgIndex = index;
        Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, `res/${this._mapItemData.itemImgIndex}`);
    }

    public setTreeShowOrHide(treeId: number): void {
        this.treeNode.removeAllChildren();
        this.treeNode.getComponent(cc.Sprite).spriteFrame = null;

        if (treeId <= 0) {
            this.treeNode.active = false;
            this._mapItemData.itemTreeId = 0;
        } else {
            this._mapItemData.itemTreeId = treeId;
            this.treeNode.active = true;

            if (treeId >= 42) {
                if (this.treeNode.childrenCount === 0) {
                    this.treeNode.addChild(cc.instantiate(this.animNodeList[treeId - 42]));
                }
            } else {
                this._mapItemData.itemTreeY = 72;
                Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), BundleName.TEST, `res/item${this._mapItemData.itemTreeId}`);
            }
        }
    }

    public setIsObtrust(isObstruct: boolean, showInfo: boolean = false): void {
        this._mapItemData.isObstruct = isObstruct;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    }

    public setTreePos(x: number, y: number, showInfo: boolean = false): void {
        this._mapItemData.itemTreeX = x;
        this._mapItemData.itemTreeY = y;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    }

    private onClickHideTree(): void {
        if (this.treeNode.active) {
            this.treeNode.active = false;
            this._mapItemData.itemTreeId = 0;
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    }

    private setMapImgY(y: number, showInfo: boolean = false): void {
        this._mapItemData.itemYOffset = y;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    }

    public showMapImgY(y: number, showInfo: boolean = false): void {
        this._mapItemData.itemYOffset = y;
        this.node.children[0].y = y;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    }

    protected onEnable(): void {
        this.landNode.on(cc.Node.EventType.TOUCH_START, () => {
            this.onClick();
        }, this);

        this.landNode.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            if (this.treeNode.active) {
                this.treeNode.y += event.getDelta().y;
                this.treeNode.x += event.getDelta().x;
                this.setTreePos(this.treeNode.x, this.treeNode.y, true);
            } else {
                this.node.children[0].y += event.getDelta().y;
                this.setMapImgY(this.node.children[0].y, true);
            }
        }, this);
    }

    protected onDisable(): void {
        this.landNode.targetOff(this);
        this.node.targetOff(this);
    }

    private onClickDel(): void {
        if (this.node) {
            this.node.removeFromParent();
            this.node.destroy();
        }
    }

    private onClick(): void {
        this._mapEdir.onClickMapItem(this, this._mapItemData);
    }
}

export default MapItem;