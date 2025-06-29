// +-+
import { Utils } from './Utils';
import { RewardIdEnum, BundleName, SetItemNumEnum } from './Constants';
import { TempData } from './TempData';
import { gm } from './GameManager';
import { DefenseHeroItemVO, roleGoBattleItemVO } from './MapCellCfgData';
import { ReportData } from './NetUtils';

const { ccclass, property } = cc._decorator;

@ccclass
class GoBattleBuyItem extends cc.Component {
    @property(cc.Sprite)
    private heroColorSpr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private heroSpr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private heroLvlSpr: cc.Sprite | null = null;

    @property(cc.Label)
    private price_lbl: cc.Label | null = null;

    @property(cc.Sprite)
    private cost_sprite: cc.Sprite | null = null;

    private heroID: number = 0;
    private heroDiam: number = 0;

    public initdata(heroID: number, heroDiam: number): void {
        this.heroID = heroID;
        this.heroDiam = heroDiam;
        const heroConfig = gm.data.config_data.getHeroCfgByID(this.heroID);
        if (heroConfig) {
            Utils.async_set_sprite_frame(this.heroColorSpr, BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils.async_set_sprite_frame(this.heroSpr, BundleName.COMMON, "res/handbook/" + this.heroID);
            Utils.async_set_sprite_frame(this.heroLvlSpr, BundleName.BOOK, "res/icon_lv" + heroConfig.lv);
            this.price_lbl.string = this.heroDiam.toString();
            this.cost_sprite.node.color = cc.Color.WHITE;
            this.price_lbl.node.getComponent(cc.LabelOutline).enabled = true;
            this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#FFDA58");
            this.price_lbl.node.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#7D2713");
            this.cost_sprite.node.height = 50;
            this.cost_sprite.node.width = 50;

            if (this.heroDiam == 0) {
                this.price_lbl.string = "Miễn phí";
                this.cost_sprite.node.color = cc.Color.BLACK.fromHEX("#253D45");
                this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#1C3F00");
                this.price_lbl.node.getComponent(cc.LabelOutline).enabled = false;
                Utils.async_set_sprite_frame(this.cost_sprite, BundleName.COMMON, "res/handbook/video_1");
                this.cost_sprite.node.width = 55;
                this.cost_sprite.node.height = 40;
            } else if (this.heroDiam > 200) {
                Utils.async_set_sprite_frame(this.cost_sprite, BundleName.COMMON, "res/handbook/" + RewardIdEnum.GOLD);
            } else {
                Utils.async_set_sprite_frame(this.cost_sprite, BundleName.COMMON, "res/handbook/" + RewardIdEnum.DIAMOND);
            }
        }
    }

    private onClickAddHeroTobattle(): void {
        if (gm.data.fight_temp_data.get_battle_hero_is_space()) {
            if (this.heroDiam == 0) {
                gm.channel.show_video_ad(this.addHero, this);
            } else if (this.heroDiam > 200) {
                if (gm.data.mapCell_data.roleCoinData.coinNum < this.heroDiam) {
                    gm.ui.set_module_args(gm.const.GETCOINOP.key, false);
                    gm.ui.show_panel(gm.const.GETCOINOP);
                    return;
                }
                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.REDUCE_ITEM_TYPE, this.heroDiam);
                this.addHero();
            } else {
                if (gm.data.mapCell_data.roleCoinData.diamondNum < this.heroDiam) {
                    gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
                    gm.ui.show_panel(gm.const.GETCOINOP);
                    return;
                }
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, this.heroDiam);
                this.addHero();
            }
        } else {
            gm.ui.show_notice("Bạn không có đủ ô trống, vui lòng dọn dẹp chúng trước");
        }
    }

    private addHero(): void {
        let spaceIndex: number;

        if (TempData.getDefenseType() != 2) {
            spaceIndex = gm.data.mapCell_data.getRoleSpceListShift();
            const heroID = this.heroID;
            gm.data.mapCell_data.addItem(heroID, 1, spaceIndex);
            const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
            const roleGoBattleItem = new roleGoBattleItemVO();
            roleGoBattleItem.cellID = spaceIndex;

            if (heroConfig) {
                roleGoBattleItem.itemID = heroConfig.heroid;
                roleGoBattleItem.itemType = heroConfig.occupation;
                roleGoBattleItem.hp = heroConfig.hp;
                roleGoBattleItem.maxHp = heroConfig.hp;
                gm.data.fight_temp_data.battle_hero_array.push(roleGoBattleItem);
            }

            switch (this.heroID) {
                case 34003:
                    ReportData.instance.report_once_point(10900);
                    ReportData.instance.report_point(10901);
                    break;
                case 35003:
                    ReportData.instance.report_once_point(10902);
                    ReportData.instance.report_point(10903);
                    break;
                case 37003:
                    ReportData.instance.report_once_point(10904);
                    ReportData.instance.report_point(10905);
                    break;
                case 38003:
                    ReportData.instance.report_once_point(10906);
                    ReportData.instance.report_point(10907);
                    break;
                case 39003:
                    ReportData.instance.report_once_point(10908);
                    ReportData.instance.report_point(10909);
                    break;
            }

            gm.ui.emit("refreshHeroBattle");
            gm.ui.emit("refreshBattleHero");

        } else if (gm.data.fight_temp_data.get_defense_hero_is_space()) {
            spaceIndex = gm.data.mapCell_data.getRoleSpceListShift();
            const heroID = this.heroID;
            gm.data.mapCell_data.addItem(heroID, 1, spaceIndex);
            const roleData = gm.data.mapCell_data.role_map_data[spaceIndex];

            if (roleData.itemID > 30000) {
                const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
                if (heroConfig) {
                    const defenseHeroItem = new DefenseHeroItemVO();
                    defenseHeroItem.cellID = spaceIndex;
                    defenseHeroItem.heroid = heroID;
                    defenseHeroItem.heroUID = roleData.heroUID;
                    gm.data.mapCell_data.addDefenseDataByID(defenseHeroItem);
                }
                gm.ui.emit("refreshHeroBattle");
                gm.ui.emit("refreshBattleHero");
                gm.data.mapCell_data.async_write_data();
            }
        }
    }

    private reset(): void {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
    }

}

export { GoBattleBuyItem };