import { ListView } from '../../start-scene/scripts/ListView';
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { LadderRankRewardItemData } from '../../start-scene/scripts/LadderTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class LadderRankRewardItem extends ListViewItem {
    @property(cc.Sprite)
    private rank_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private rank_lbl: cc.Label | null = null;

    @property(ListView)
    private reward_list: ListView | null = null;

    public get data(): LadderRankRewardItemData {
        return this._data;
    }

    public set data(value: LadderRankRewardItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        gm.data.ladder_data;
        if (this._data.rank_a == this._data.rank_b && 1 == this._data.rank_a) {
            this.rank_spr.node.active = true;
            this.rank_lbl.node.active = false;
            c.Utils.async_set_sprite_frame(this.rank_spr, BundleName.LADDER, "res/rank_" + this._data.rank_a);
        } else {
            this.rank_spr.node.active = false;
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank_a + "-" + this._data.rank_b;
        }
        this.reward_list.setData(this._data.reward_array);

        for (let index = 0; index < this._data.reward_array.length; index++) {
            const item = this.reward_list.getItem(index);
            if (item) {
                item.select = false;
            }
        }
    }

    public reset(): void {
        this.reward_list.reset();
    }
}