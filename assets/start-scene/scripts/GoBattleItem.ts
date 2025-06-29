// +-+
import { ListViewItem } from './ListViewItem';
import { Utils } from './Utils';
import { BundleName, HeroTypeEnum } from './Constants';
import { TempData } from './TempData';
import { gm } from './GameManager';
import { roleGoBattleItemVO, DefenseHeroItemVO } from './MapCellCfgData';

const { ccclass, property } = cc._decorator;

interface TypeData {
    heroID: number;
    heroNum: number;
    heroUID: number[];
    heroHp: number;
    hero_type: number;
    cellID: number[];
}

@ccclass
export class GoBattleItem extends ListViewItem {
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

    @property(cc.Node)
    private heroHp: cc.Node | null = null;

    @property(cc.Node)
    private heroHpBar: cc.Node | null = null;

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
        const heroConfig = gm.data.config_data.getHeroCfgByID(this._data.heroID);
        if (heroConfig) {
            Utils.async_set_sprite_frame(this.heroColorSpr, BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils.async_set_sprite_frame(this.heroSpr, BundleName.COMMON, "res/handbook/" + this._data.heroID);
            Utils.async_set_sprite_frame(this.heroLvlSpr, BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
            this.isSuperHero.active = heroConfig && heroConfig.hero_type == HeroTypeEnum.SUPER_HERO_TYPE;
            this.HeroNumLbl.string = this._data.heroNum.toString();
            this.heroHp.active = false;
            if (this.isSuperHero?.active) {
                this.heroHp.active = true;
                this.heroHpBar.scaleX = Math.min(this._data.heroHp[0] / heroConfig.hp, 1);
            }
        }
    }

    private onClickAddHeroTobattle(): void {
        if (TempData.getDefenseType() != 2) {
            if (gm.data.fight_temp_data.get_battle_hero_is_space()) {
                const heroID = this._data.heroID;
                const cellID = this._data.cellID[0];
                const roleItem = new roleGoBattleItemVO();
                roleItem.cellID = cellID;
                const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
                if (heroConfig) {
                    roleItem.itemID = heroConfig.heroid;
                    roleItem.itemType = heroConfig.occupation;
                    roleItem.hp = heroConfig.hp;
                    roleItem.maxHp = heroConfig.hp;
                    if (heroConfig.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                        if (gm.data.fight_temp_data.getFightSuperHeroNum() >= 1) {
                            gm.ui.show_notice("Chỉ có một siêu anh hùng có thể tham gia trận chiến!!");
                            return;
                        }
                        const superHeroData = gm.data.mapCell_data.getSuperHeroData(heroConfig.heroid, cellID);
                        if (superHeroData) {
                            roleItem.hp = superHeroData.hp;
                            roleItem.maxHp = superHeroData.maxHp;
                        }
                    }
                    gm.data.fight_temp_data.battle_hero_array.push(roleItem);
                }
                TempData.removeHeroByID(heroID);
                gm.ui.emit("refreshHeroBattle");
                if (gm.data.mapCell_data.isGuide) {
                    gm.channel.report_event("ohayoo_game_guide", {
                        guideid: gm.data.fight_temp_data.battle_hero_array.length + 10,
                        guidedesc: cc.js.formatStr("%d.上阵英雄", gm.data.fight_temp_data.battle_hero_array.length + 10)
                    });
                    gm.ui.mapMainUI.checkGuideIsShow();
                }
                gm.ui.emit("refreshBattleHero");
            }
        } else if (gm.data.fight_temp_data.get_defense_hero_is_space()) {
            const heroID = this._data.heroID;
            const cellID = this._data.cellID[0];
            const defenseItem = new DefenseHeroItemVO();
            defenseItem.cellID = cellID;
            const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
            if (heroConfig) {
                if (heroConfig.hero_type == HeroTypeEnum.SUPER_HERO_TYPE && gm.data.mapCell_data.getDefenseSuperNum() >= 1) {
                    gm.ui.show_notice("Chỉ có một siêu anh hùng có thể tham gia trận chiến!!");
                    return;
                }
                defenseItem.cellID = this._data.cellID[0];
                defenseItem.heroid = heroID;
                defenseItem.heroUID = this._data.heroUID[0];
                gm.data.mapCell_data.addDefenseDataByID(defenseItem);
            }
            TempData.removeHeroByID(heroID);
            gm.ui.emit("refreshHeroBattle");
            gm.ui.emit("refreshBattleHero");
            gm.data.mapCell_data.async_write_data();
        }
    }

    public reset(): void {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
        this.HeroNumLbl.string = "";
    }
}