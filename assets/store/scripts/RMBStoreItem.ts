// file này không duodcj import ở đâu
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName, RewardIdEnum, SetItemNumEnum } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { MallConfig } from '../../common/configs/mall';

const { ccclass, property } = cc._decorator;

@ccclass
class RMBStoreItem extends NodePoolItem {
    @property(cc.Sprite)
   private rewardSpr: cc.Sprite = null;

    @property(cc.Node)
    private rewardNode1: cc.Node = null;

    @property(cc.Node)
    private rewardNode2: cc.Node = null;

    @property(cc.Node)
    private  btnDiam: cc.Node = null;

    @property(cc.Node)
    private  btnAd: cc.Node = null;

    @property(cc.Node)
    private btnRMB: cc.Node = null;

    private _data: MallConfig;

  public  get data(): MallConfig {
        return this._data;
    }

  public  set data(value: MallConfig) {
        this._data = value;
        this.update_view();
    }

    private update_view(): void {
        const itemData = this._data;
        Utils.async_set_sprite_frame(this.rewardSpr, BundleName.STORE, "res/" + itemData.show_img);
        this.rewardSpr.node.x = -16;
        Utils.async_set_sprite_frame(this.rewardNode1.getComponent(cc.Sprite), BundleName.MAP, "res/" + itemData.item_id);
        this.rewardNode1.children[0].getComponent(cc.Label).string = itemData.item_num + "";
        this.rewardNode2.active = 0 < itemData.item_id1;

        if (this.rewardNode2.active) {
            Utils.async_set_sprite_frame(this.rewardNode2.getComponent(cc.Sprite), BundleName.MAP, "res/" + itemData.item_id1);
            this.rewardNode1.children[0].getComponent(cc.Label).string = itemData.item_num1 + "";
            this.rewardSpr.node.x = 73;
        }

        this.btnRMB.active = 1 == this.data.money_type;
        this.btnRMB.children[0].getComponent(cc.Label).string = "￥" + itemData.price;
        this.btnDiam.active = 1 != this.data.money_type && 2 != this.data.money_type;
        this.btnDiam.children[0].getComponent(cc.Label).string = "" + itemData.price;
        this.btnAd.active = 2 == this.data.money_type;
    }

    private onClickRmb(): void {
        this.get_reward();
    }

    private get_reward(): void {
        const itemIds = [this.data.item_id, this.data.item_id1];
        const itemNums = [this.data.item_num, this.data.item_num1];

        for (let index = 0; index < itemIds.length; index++) {
            if (!(itemIds[index] <= 0)) {
                if (11006 == itemIds[index]) {
                    gm.data.mapCell_data.addBarrelNum(itemNums[index]);
                    gm.ui.show_coin_fly(RewardIdEnum.BARREL, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (11003 == itemIds[index]) {
                    gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, itemNums[index]);
                    gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO))
                }
            }
        }
    }

    private onClickAd(): void {
        gm.channel.show_video_ad(this.get_reward.bind(this));
    }

    private onClickDiam(): void {
        if (gm.data.mapCell_data.roleCoinData.diamondNum < this.data.price) {
            gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
            gm.ui.async_show_module(gm.const.GETCOINOP);
            return;
        }

        gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, this.data.price);
        this.get_reward();
    }
}

export default RMBStoreItem;