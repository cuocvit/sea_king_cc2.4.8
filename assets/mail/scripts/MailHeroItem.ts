import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
class MailHeroItem extends ListViewItem {
    @property(cc.Sprite)
    private color_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private hero_spr: cc.Sprite | null = null;

    public get data(): { id: number } {
        return this._data;
    }

    public set data(value: { id: number }) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        Utils.async_set_sprite_frame(this.hero_spr, BundleName.COMMON, "res/handbook/" + this._data.id);
        const heroConfigData = gm.config.get_row_data("HeroConfigData", this._data.id + "") as HeroConfig;
        if (heroConfigData) {
            Utils.async_set_sprite_frame(this.color_spr, BundleName.COMMON, "res/color_" + heroConfigData.lv);
        }
    }

    public reset(): void {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
    }
}