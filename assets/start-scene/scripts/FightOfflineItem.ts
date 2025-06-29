// +-+
import { ListViewItem } from './ListViewItem';
import { Utils } from './Utils';
import { BundleName, HeroTypeEnum } from './Constants';
import { gm } from './GameManager';

const { ccclass, property } = cc._decorator;

interface TypeData {
    itemID: number;
    heroNum: number;
}

@ccclass
class FightOfflineItem extends ListViewItem {
    @property(cc.Sprite)
    private heroColorSpr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private heroSpr: cc.Sprite | null = null;

    @property(cc.Label)
    private HeroNumLbl: cc.Label | null = null;

    @property(cc.Sprite)
    private heroLvlSpr: cc.Sprite | null = null;

    @property(cc.Node)
    private isSuperHero: cc.Node | null = null;

    constructor() {
        super();
    }

   public get data(): TypeData {
        return this._data;
    }

    public set data(value: TypeData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        this.isSuperHero.active = false;
        this.heroLvlSpr.spriteFrame = null;

        if (this._data.itemID > 30000) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(this._data.itemID);
            if (!heroConfig) return;

            Utils.async_set_sprite_frame(this.heroColorSpr, BundleName.COMMON, `res/color_${heroConfig.lv}`);
            Utils.async_set_sprite_frame(this.heroSpr, BundleName.COMMON, `res/handbook/${this._data.itemID}`);
            Utils.async_set_sprite_frame(this.heroLvlSpr, BundleName.MAP, `res/hero/heroPhoto${heroConfig.lv}`);

            this.isSuperHero.active = heroConfig && heroConfig.hero_type === HeroTypeEnum.SUPER_HERO_TYPE;
            this.HeroNumLbl.string = this._data.heroNum.toString();
        } else {
            const itemConfig = gm.data.config_data.getItemCfgByID(this._data.itemID);
            if (!itemConfig) return;

            Utils.async_set_sprite_frame(this.heroColorSpr, BundleName.COMMON, `res/color_${itemConfig.lv}`);
            Utils.async_set_sprite_frame(this.heroSpr, BundleName.COMMON, `res/handbook/${this._data.itemID}`);
        }

        this.HeroNumLbl.string = `x${this.data.heroNum}`;
    }

    public reset(): void {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
        this.HeroNumLbl.string = "";
    }
}

export { FightOfflineItem }