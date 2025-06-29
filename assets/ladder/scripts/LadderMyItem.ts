import { LadderLVConfig } from '../../common/configs/ladder_lv';
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';

const { ccclass, property } = cc._decorator;

@ccclass
class LadderMyItem extends ListViewItem {
    @property(cc.Sprite)
    private bg_spr: cc.Sprite | null = null;

    @property(cc.Node)
    private star_bg_node: cc.Node | null = null;

    @property(cc.Sprite)
    private lv_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private name_lbl: cc.Label | null = null;

    @property(cc.Label)
    private next_lv_star_lbl: cc.Label | null = null;

    public get data(): LadderLVConfig {
        return this._data;
    }

    public set data(value: LadderLVConfig) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void { }

    public reset(): void {
        if (this.bg_spr) this.bg_spr.spriteFrame = null;
        if (this.lv_spr) this.lv_spr.spriteFrame = null;
        if (this.next_lv_star_lbl) this.next_lv_star_lbl.string = "";
        if (this.name_lbl) this.name_lbl.string = "";
    }
}