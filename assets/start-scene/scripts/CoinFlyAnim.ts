// +-+
import { LayerType, RewardIdEnum, BundleName } from './Constants';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { Utils } from './Utils';

const { ccclass, property } = cc._decorator;

@ccclass
class CoinFlyAnim extends NodePoolItem {
    @property([cc.Sprite])
    private coin_spr_array: cc.Sprite[] = [];

    private _coin_num: number = 1;
    private _start_pos: cc.Vec3 = new cc.Vec3(0, 0);
    private _target_pos: cc.Vec3 = new cc.Vec3(-300, 500);
    private _exist_time: number = 0;

    protected onEnable(): void {
        for (let i = 0; i < this.coin_spr_array.length; i++) {
            this.coin_spr_array[i].node.active = false;
        }
        for (let i = this._exist_time = 0; i < this._coin_num; i++) {
            this.do_node_anim(this.coin_spr_array[i].node, 0.01 * i);
        }
    }

    protected update(deltaTime: number): void {
        this._exist_time += deltaTime;
        if (this._exist_time >= 5) {
            gm.pool.put(this.node);
        }
    }

    public init_fly_anim(rewardId: RewardIdEnum, startPos: cc.Vec3, targetPos?: cc.Vec3 | null, coinNum: number = 1): void {
        for (let i = 0; i < this.coin_spr_array.length; i++) {
            Utils.async_set_sprite_frame(this.coin_spr_array[i], BundleName.COMMON, "res/item/" + rewardId);
        }
        const layerNode = gm.ui.get_layer_node(LayerType.TOP);
        this._start_pos = layerNode.convertToNodeSpaceAR(startPos);
        if (targetPos) {
            this._start_pos = gm.ui.mapMainUI.node.convertToNodeSpaceAR(startPos);
            this._target_pos = gm.ui.mapMainUI.node.convertToNodeSpaceAR(targetPos);
        } else if (gm.ui.mapMainUI && gm.ui.mapMainUI.node.activeInHierarchy) {
            switch (rewardId) {
                case RewardIdEnum.DIAMOND:
                    this._target_pos = layerNode.convertToNodeSpaceAR(gm.ui.mapMainUI.diamond_icon_node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    break;
                case RewardIdEnum.GOLD:
                    this._target_pos = layerNode.convertToNodeSpaceAR(gm.ui.mapMainUI.gold_icon_node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    break;
                case RewardIdEnum.STAR:
                    this._target_pos = layerNode.convertToNodeSpaceAR(gm.ui.mapMainUI.ladder_node.convertToWorldSpaceAR(new cc.Vec3(-25, -28)));
                    break;
                case RewardIdEnum.BARREL:
                    this._target_pos = layerNode.convertToNodeSpaceAR(gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(new cc.Vec3(-25, -28)));
                    break;
            }
        }
        this._coin_num = Math.min(coinNum, this.coin_spr_array.length);
    }

    private do_node_anim(node: cc.Node, delay: number): void {
        node.active = true;
        node.setPosition(new cc.Vec2(this._start_pos.x, this._start_pos.y));
        node.scale = 1;
        const angle = 2 * Math.PI * delay * 10;
        const targetPos = new cc.Vec2(this._start_pos.x + 100 * Math.cos(angle), this._start_pos.y + 100 * Math.sin(angle) + 200);
        const moveAction = cc.moveTo(0.2 + 0.1 * Math.random(), targetPos.x, targetPos.y);
        const bezierPoints = [
            targetPos,
            new cc.Vec2((this._target_pos.x + targetPos.x) / 2 + (this._target_pos.x - targetPos.x) * (Math.random() - 0.5) / 2, (this._target_pos.y + targetPos.y) / 2),
            new cc.Vec2(this._target_pos.x, this._target_pos.y)
        ];
        const bezierAction = cc.bezierTo(0.4 + 0.3 * Math.random(), bezierPoints);
        const scaleAction = cc.sequence(cc.scaleTo(0.01, 1.2, 1.2), cc.scaleTo(0.05, 0, 0));
        node.runAction(cc.sequence(moveAction, bezierAction, scaleAction, cc.callFunc(() => {
            node.active = false;
        })));
    }
}

export { CoinFlyAnim };