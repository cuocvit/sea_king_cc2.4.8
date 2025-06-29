// +-+
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { NodePoolItem } from './NodePoolItem';
import { BANNER_AD_TYPE } from './ChannelManager';

const { ccclass, property } = cc._decorator;

@ccclass
class ItemComponent extends cc.Component {
    @property(cc.Label)
    private lblNum: cc.Label | null = null;

    @property(cc.Sprite)
    private itemImg: cc.Sprite | null = null;

    private itemID: number = 22001;
    private itemNum: number = 15;

    protected onEnable(): void {
        const itemConfig = gm.data.config_data.getItemCfgByID(this.itemID);
        if (itemConfig) {
            this.itemImg.node.active = true;
            if (itemConfig.anim_name == "") {
                Utils.async_set_sprite_frame(this.itemImg, BundleName.MAP, "res/" + itemConfig.icon);
                gm.pool.put_children(this.itemImg.node);
            } else {
                this.itemImg.spriteFrame = null;
                gm.pool.put_children(this.itemImg.node);
                (BundleName.MAP, "prefabs/item/" + itemConfig.anim_name, NodePoolItem, (nodePoolItem: cc.Component | null) => {
                    if (!nodePoolItem) return;
                    if (this.itemImg?.node.childrenCount == 0) {
                        nodePoolItem.node.scale = 3;
                        this.itemImg.node.addChild(nodePoolItem.node);
                        const animation = nodePoolItem.getComponent(cc.Animation);
                        if (animation) {
                            animation.play();
                        }
                    }
                });
            }
            this.lblNum.string = "x" + this.itemNum;
            gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
        }
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.GETPOSEIDONOP);
    }

    private onClickDoubleItem(): void {
        gm.channel.show_video_ad(this.getDoubleCb, this);
    }

    private getDoubleCb(): void {
        gm.data.mapCell_data.splitItemNum(this.itemNum, 22008, 1);
        gm.data.mapCell_data.async_write_data();
        gm.ui.async_hide_module(gm.const.GETPOSEIDONOP);
        gm.ui.emit("update_soul_num");
    }
}

export default ItemComponent;