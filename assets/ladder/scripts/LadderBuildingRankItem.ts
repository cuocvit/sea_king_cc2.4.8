import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { ListView } from '../../start-scene/scripts/ListView';
import { LadderBuildding } from '../../common/configs/ladder_building';

const { ccclass, property } = cc._decorator;

interface LadderBuildingRankItemData {
    rank: number;
    castle_level: number;
    name: string;
    uid: string;
}

@ccclass
export class LadderBuildingRankItem extends ListViewItem {
    @property(cc.Sprite)
    private rank_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private lv_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private name_lbl: cc.Label | null = null;

    @property(cc.Label)
    private rank_lbl: cc.Label | null = null;

    @property(cc.Label)
    private building_lv_lbl: cc.Label | null = null;

    @property(ListView)
    private reward_list: ListView | null = null;

    constructor() {
        super();
    }

    public get data(): LadderBuildingRankItemData {
        return this._data;
    }

    public set data(value: LadderBuildingRankItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        if (this._data.rank <= 0) {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = "200+";
            this.rank_spr.node.active = false;
        } else if (this._data.rank > 0 && this._data.rank < 4) {
            this.rank_lbl.node.active = false;
            this.rank_spr.node.active = true;
            Utils.async_set_sprite_frame(this.rank_spr, BundleName.LADDER, "res/rank_" + this._data.rank);
        } else {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank.toString();
            this.rank_spr.node.active = false;
        }
        this.building_lv_lbl.string = this._data.castle_level.toString();
        this.name_lbl.string = this._data.name + (this._data.uid === "0" ? "." : "");

        if (this._data.rank > 0) {
            const number = gm.data.ladder_temp_data.convert_building_rank_to_lv(this._data.rank);
            const rowData = gm.config.get_row_data("LadderBuildingConfigData", number.toString()) as LadderBuildding;
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
        this.building_lv_lbl.string = "";
        this.name_lbl.string = "";
    }
}