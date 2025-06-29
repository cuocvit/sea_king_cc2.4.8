// +-+
import { NodePoolItem } from './NodePoolItem';
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName } from './Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class FlyNoticeItem extends NodePoolItem {
    @property(cc.Sprite)
    private item_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private value_lbl: cc.Label | null = null;

    public set_data(key: string, num: number): void {
        Utils.async_set_sprite_frame(this.item_spr, BundleName.COMMON, "res/item/" + key);
        this.value_lbl.string = (num > 0 ? "+" : "") + Utils.numFormat(num, 2);
        this.node.runAction(cc.sequence(cc.moveTo(1, this.node.x, this.node.y + 60), cc.callFunc(function () {
            gm.pool.put(this.node);
        })));
    }

    public unuse(): void {
        super.unuse();
        this.value_lbl.string = "";
        this.node.stopAllActions();
    }
}

export { FlyNoticeItem };