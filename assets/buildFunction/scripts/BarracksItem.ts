import { HeroConfig } from '../../common/configs/hero';
import { StarConfig } from '../../common/configs/star';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { Utils } from '../../start-scene/scripts/Utils';

const { ccclass, property } = cc._decorator;

@ccclass
export class BarracksItem extends cc.Component {
    @property(cc.Node)
    private shade_node: cc.Node = null;

    @property(cc.Node)
    private lock_node: cc.Node = null;

    @property(cc.Label)
    private unlock_level_lbl: cc.Label = null;

    @property(cc.Node)
    private unlock_node: cc.Node = null;

    @property(cc.Sprite)
    private hero_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private left_item_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private right_item_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private hero_color_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private hero_profession_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private hero_profession2_sprite: cc.Sprite = null;

    @property(cc.Label)
    private hero_name_lbl: cc.Label = null;

    @property(cc.Node)
    private heroStarNode: cc.Node = null;

    @property(cc.Node)
    private heroAtrrNode: cc.Node = null;

    @property(cc.Node)
    private upstarNode: cc.Node = null;

    @property(cc.Node)
    private btnUpstarNode: cc.Node = null;

    @property(cc.Sprite)
    private needHeroIcon: cc.Sprite = null;

    @property(cc.Sprite)
    private needHeroIconBg: cc.Sprite = null;

    @property(cc.Label)
    private needLbl: cc.Label = null;

    @property([cc.SpriteFrame])
    private sprList: cc.SpriteFrame[] = [];

    private _data: HeroConfig;
    private _isCenter: boolean;
    private _curIndex: number;

    private constructor() {
        super();
        this._data = null;
        this._isCenter = false;
        this._curIndex = 0;
    }

    public update_view(heroId: number, isCenter: boolean, curIndex: number): void {
        if (gm.data.mapCell_data.barracks_unlock_data[curIndex].ani_state === 0 &&
            gm.data.mapCell_data.barracks_unlock_data[curIndex].state === 1
        ) {
            gm.data.mapCell_data.barracks_unlock_data[curIndex].ani_state = 1;
            gm.data.mapCell_data.async_write_data();
            this.node.getComponent(cc.Animation).play();
        }
        this._isCenter = isCenter;
        this._curIndex = curIndex;
        const heroData = gm.config.get_row_data("HeroConfigData", heroId.toString()) as HeroConfig;
        if (!heroData) return;
        this._data = heroData;
        Utils.async_set_sprite_frame(this.left_item_sprite, BundleName.COMMON, "res/heroCircleImg/" + heroData.itemType[0]);
        Utils.async_set_sprite_frame(this.right_item_sprite, BundleName.MAP, "res/" + heroData.itemType[1]);
        this.hero_name_lbl.string = heroData.name;
        Utils.async_set_sprite_frame(this.hero_color_sprite, BundleName.COMMON, "res/circleColor_" + heroData.color);
        Utils.async_set_sprite_frame(this.hero_sprite, BundleName.COMMON, "res/heroCircleImg/" + heroData.heroid);
        this.shade_node.active = isCenter;

        if (heroData.occupation <= 6) {
            this.hero_profession_sprite.node.active = true;
            if (heroData.occupation > 3) {
                this.hero_profession2_sprite.node.active = true;
                Utils.async_set_sprite_frame(this.hero_profession_sprite, BundleName.BUILD_FUNCTION, "res/1");
                Utils.async_set_sprite_frame(this.hero_profession2_sprite, BundleName.BUILD_FUNCTION, "res/2");
            } else {
                Utils.async_set_sprite_frame(this.hero_profession_sprite, BundleName.BUILD_FUNCTION, "res/" + heroData.occupation);
                this.hero_profession2_sprite.node.active = false;
            }
        } else {
            this.hero_profession_sprite.node.active = false;
            this.hero_profession2_sprite.node.active = false;
        }

        Utils.set_sprite_state(this.left_item_sprite.node, cc.Sprite.State.NORMAL);
        Utils.set_sprite_state(this.right_item_sprite.node, cc.Sprite.State.NORMAL);

        if (gm.data.mapCell_data.barracks_unlock_data[this._curIndex].state <= 0) {
            this.lock_node.active = true;
            this.unlock_node.active = false;
            this.unlock_level_lbl.node.active = true;
            this.unlock_level_lbl.string = "LEVEL " + heroData.barracks;
            Utils.set_sprite_state(this.hero_color_sprite.node, cc.Sprite.State.GRAY);
            Utils.set_sprite_state(this.left_item_sprite.node, cc.Sprite.State.GRAY);
            Utils.set_sprite_state(this.right_item_sprite.node, cc.Sprite.State.GRAY);
        } else {
            Utils.set_sprite_state(this.hero_color_sprite.node, cc.Sprite.State.NORMAL);
            this.lock_node.active = false;
            this.unlock_node.active = true;
            this.upstarNode.active = false;
            const heroStarData = gm.data.hero_star_data.getHeroStarData(heroData.arms);
            if (heroStarData) {
                this.upstarNode.active = true;
                const nextHeroData = gm.config.get_row_data("HeroConfigData", heroStarData.nextNeedItem.toString()) as HeroConfig;
                if (nextHeroData) {
                    Utils.async_set_sprite_frame(this.needHeroIconBg, BundleName.COMMON, "res/circleColor_" + nextHeroData.color);
                    Utils.async_set_sprite_frame(this.needHeroIcon, BundleName.COMMON, "res/heroCircleImg/" + nextHeroData.icon);
                }
                for (let r = 0; r < this.heroStarNode.childrenCount; r++) {
                    this.heroStarNode.children[r].getComponent(cc.Sprite).spriteFrame = heroStarData.star > r ? this.sprList[0] : this.sprList[1];
                }
                const starHeroNum = gm.data.mapCell_data.getStarHeroNumByID(heroStarData.nextNeedItem);
                this.needLbl.string = starHeroNum + "/" + heroStarData.nextNeedNum;
                this.needLbl.node.color = starHeroNum >= heroStarData.nextNeedNum ? cc.Color.GREEN : cc.Color.RED;

                const attributeKeys = ["Perk_HP", "Perk_Attackers", "Perk_Defense", "Perk_Time"];
                const attributeNames = ["Sinh mạng", "Tấn công", "Phòng thủ", "Tốc độ"];
                const currentAttributes = [
                    100 * heroStarData.hp,
                    100 * heroStarData.attack,
                    heroStarData.defense,
                    heroStarData.speed
                ];

                let upgradedAttributes = currentAttributes;

                this.btnUpstarNode.active = heroStarData.nextNeedItem > 0 && heroStarData.nextNeedNum > 0;
                if (this.btnUpstarNode.active) {
                    const nextStarData = gm.config.get_row_data("StarConfigData", heroStarData.arms.toString(), (heroStarData.star + 1).toString()) as StarConfig;
                    if (nextStarData) {
                        upgradedAttributes = [100 * nextStarData.hp, 100 * nextStarData.attack, nextStarData.defense, nextStarData.speed];
                    }
                }
                for (let r = 0; r < this.heroAtrrNode.childrenCount; r++) {
                    const attrNode = this.heroAtrrNode.children[r];
                    if (r != 3) {
                        Utils.async_set_sprite_frame(attrNode.children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/" + attributeKeys[r]);
                        attrNode.children[1].getComponent(cc.Label).string = attributeNames[r];
                        attrNode.children[2].getComponent(cc.Label).string = upgradedAttributes[r] + "%";
                        attrNode.children[3].active = currentAttributes[r] < upgradedAttributes[r];
                    } else {
                        attrNode.active = false;
                    }
                }
            }
        }
    }

    private onClickUpgrade(): void {
        const heroStarData = gm.data.hero_star_data.getHeroStarData(this._data.arms);
        if (!heroStarData) return;
        if (gm.data.mapCell_data.getStarHeroNumByID(heroStarData.nextNeedItem) < heroStarData.nextNeedNum) {
            gm.ui.show_notice("Không đủ anh hùng!!!");
        } else {
            gm.data.mapCell_data.delStarHeroNumByID(heroStarData.nextNeedItem, heroStarData.nextNeedNum);
            gm.data.hero_star_data.upgradeHeroStar(this._data.arms);
            this.update_view(this._data.heroid, this._isCenter, this._curIndex);
        }
    }

    private onClickBook(): void {
        gm.ui.set_module_args(gm.const.BOOK_HERO_DETAIL.key, [this._data.heroid]);
        gm.ui.show_panel(gm.const.BOOK_HERO_DETAIL);
    }
}