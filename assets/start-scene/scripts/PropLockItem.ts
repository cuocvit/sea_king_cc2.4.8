// *-*
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { MapItemDataVO } from './MapCellCfgData';

const { ccclass, property } = cc._decorator;

@ccclass
class PropLockItem extends cc.Component {
    @property(cc.Sprite)
    private itemImg: cc.Sprite | null = null;

    private itemNode: cc.Node; // thêm biến này

    private _parent: cc.Node | null = null;
    private _itemData: MapItemDataVO = null;

    public initData(type: number, path: string): void {
        const resourcePath: string = type == 3 ? `res/build/${path}` : `res/${path}`;
        this.itemImg!.node.scale = type == 3 ? 0.6666667 : 1;
        Utils.async_set_sprite_frame(this.itemImg!, BundleName.TEST, resourcePath);
    }

    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Touch) => {
            this.itemNode.y += event.getDelta().y;
            this.itemNode.x += event.getDelta().x;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.zIndex;
            this.itemNode.y = 0;
            this.itemNode.x = 0;
        }, this);
    }

    protected onDisable(): void { }
}

export default PropLockItem;
