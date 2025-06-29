// +-+
import { NodePoolItem } from './NodePoolItem';
import { ItemTypeEnum, BundleName } from './Constants';
import { gm } from './GameManager';
import { Utils } from './Utils';

const { ccclass, property } = cc._decorator;

@ccclass
export class ItemFly extends NodePoolItem {
    private _start_pos: cc.Vec3 = new cc.Vec3(0, 0);
    private _target_pos: cc.Vec3 = new cc.Vec3(-300, 500);

    protected onEnable(): void {
        this.node.zIndex = gm.const.MAX_CELL_NUM + 4;
        this.do_node_anim();
    }

    public init_fly_anim(itemId: number, startPos: cc.Vec3, targetPos: cc.Vec3 | null = null): void {
        const itemType = 3e4 < itemId ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
        if (itemType == ItemTypeEnum.HERO_TYPE) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(itemId)
            if (heroConfig) {
                gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + heroConfig.heroid, NodePoolItem, (t) => {
                    console.log("hero node", this.node.childrenCount);
                    if (0 == this.node.childrenCount) {
                        this.node.addChild(t.node);
                        t.node.x = 0;
                        t.node.y = -15;
                        if (t.getComponent(sp.Skeleton)) {
                            t.getComponent(sp.Skeleton).setSkin("front");
                            t.getComponent(sp.Skeleton).setAnimation(0, "stay", true);
                        }
                    } else {
                        gm.pool.put(t.node);
                    }
                });
            }
        } else if (!(itemType != ItemTypeEnum.ITEM_TYPE)) {
            const itemConfig = gm.data.config_data.getItemCfgByID(itemId)
            if (itemConfig) {
                Utils.async_set_sprite_frame(this.node.getComponent(cc.Sprite), BundleName.MAP, "res/" + itemConfig.icon);
            }
        }

        this._start_pos = gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(startPos);
        this._target_pos = gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(targetPos)
    }

    private do_node_anim(): void {
        this.node.active = true;
        this.node.setPosition(cc.v2(this._start_pos.x, this._start_pos.y));
        this.node.scale = gm.ui.mapMainUI.mapContent.scale;

        const moveAction = cc.moveTo(.3, this._target_pos.x, this._target_pos.y);
        this.node.runAction(cc.sequence(moveAction, cc.callFunc(() => {
            gm.pool.put_children(this.node);
            gm.pool.put(this.node);
        })))
    }
}