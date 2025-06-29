import { ListView } from '../../start-scene/scripts/ListView';
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { gm } from '../../start-scene/scripts/GameManager';
import { LadderAchievementItemData } from '../../start-scene/scripts/LadderTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class LadderAchievementItem extends ListViewItem {
    constructor() {
        super();
    }

    @property(cc.Label)
    private star_lbl: cc.Label | null = null;

    @property(ListView)
    private reward_list: ListView | null = null;

    public get data(): LadderAchievementItemData {
        return this._data;
    }

    public set data(value: LadderAchievementItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        const ladderData = gm.data.ladder_data;
        this.star_lbl.string = this._data.star + "";
        this.reward_list.setData(this._data.reward_array);

        for (let index = 0; index < this._data.reward_array.length; index++) {
            const item = this.reward_list.getItem(index);
            if (item) {
                item.select = this._data.id < ladderData.achievement_id;
            }
        }
    }

    public reset(): void {
        if (this.star_lbl) {
            this.star_lbl.string = "";
        }
        if (this.reward_list) {
            this.reward_list.reset();
        }
    }
}
