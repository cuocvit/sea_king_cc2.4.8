import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName } from '../../start-scene/scripts/Constants';
import { ItemConfig } from '../../common/configs/item';

const { ccclass, property } = cc._decorator;

@ccclass
class MailDetailsRewardItem extends ListViewItem {
    @property(cc.Sprite)
    private color_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private reward_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private num_lbl: cc.Label | null = null;

    @property(cc.Node)
    private mask_node: cc.Node | null = null;

    @property(cc.Node)
    private right_node: cc.Node | null = null;

    public get data(): { reward_id: number; reward_num: number } | null {
        return this._data;
    }

    public set data(value: { reward_id: number; reward_num: number } | null) {
        this._data = value;
        this.update_view();
    }

    public set select(value: boolean) {
        this._select = value;
        if (this.mask_node && this.right_node) {
            this.mask_node.active = this.right_node.active = value;
        }
    }

    public update_view(): void {
        const rowData = gm.config.get_row_data("ItemConfigData", this._data.reward_id.toString()) as ItemConfig;
        if (rowData) {
            Utils.async_set_sprite_frame(this.color_spr, BundleName.COMMON, "res/color_" + rowData.color);
            Utils.async_set_sprite_frame(this.reward_spr, BundleName.LADDER, "res/" + rowData.icon);
        }

        this.num_lbl.string = this._data.reward_num + "";
    }

    public reset(): void {
        this.reward_spr.spriteFrame = null;
        this.num_lbl.string = "";
    }
}