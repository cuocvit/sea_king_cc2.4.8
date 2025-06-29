import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { ListView } from '../../start-scene/scripts/ListView';
import { LadderRewardConfig } from '../../common/configs/ladder_reward';
import { LadderRankItemData } from '../../start-scene/scripts/LadderTempData';

const { ccclass, property } = cc._decorator;

@ccclass
export class LadderRankItem extends ListViewItem {
    @property(cc.Sprite)
    private rank_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private lv_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private name_lbl: cc.Label | null = null;

    @property(cc.Label)
    private rank_lbl: cc.Label | null = null;

    @property(cc.Label)
    private star_lbl: cc.Label | null = null;

    @property(ListView)
    private reward_list: ListView | null = null;

    public get data(): LadderRankItemData {
        return this._data;
    }

    public set data(value: LadderRankItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        if (this._data.rank <= 0) {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = "200+";
            this.rank_spr.node.active = false;

        } else if (0 < this._data.rank && this._data.rank < 4) {
            this.rank_lbl.node.active = false;
            this.rank_spr.node.active = true;
            Utils.async_set_sprite_frame(this.rank_spr, BundleName.LADDER, "res/rank_" + this._data.rank);

        } else {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank + "";
            this.rank_spr.node.active = false;
        }

        this.star_lbl.string = this._data.star + "";
        this.name_lbl.string = this._data.name + ("0" == this._data.uid ? "." : "");

        if (0 < this._data.rank) {
            const number = gm.data.ladder_temp_data.convert_rank_to_lv(this._data.rank);
            const rowData = gm.config.get_row_data("LadderRewardConfigData", number + "") as LadderRewardConfig;
            if (rowData) {
                Utils.async_set_sprite_frame(this.lv_spr, BundleName.LADDER, "res/" + rowData.iconId);
                this.reward_list.setData(rowData.reward_array);
            }
        } else {
            this.reward_list.reset();
        }
    }

    public reset(): void {
        this.rank_spr.spriteFrame = null;
        this.lv_spr.spriteFrame = null;
        this.star_lbl.string = "";
        this.name_lbl.string = "";
        this.reward_list.reset();
    }
}