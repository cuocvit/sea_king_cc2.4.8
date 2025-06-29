// +-+
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
class NewHeroAnim extends cc.Component {
    @property(cc.Sprite)
    private hero_sprite: cc.Sprite | null = null;

    @property(cc.Sprite)
    private hero_color_sprite: cc.Sprite | null = null;

    @property(cc.Sprite)
    private hero_profession_sprite: cc.Sprite | null = null;

    @property(cc.Sprite)
    private hero_profession2_sprite: cc.Sprite | null = null;

    @property(cc.Sprite)
    private left_item_sprite: cc.Sprite | null = null;

    @property(cc.Sprite)
    private right_item_sprite: cc.Sprite | null = null;

    @property(cc.Label)
    private hero_name_lbl: cc.Label | null = null;

    @property(cc.Node)
    private roleNode: cc.Node | null = null;

    private _heroID: number = 0;

    protected onEnable(): void {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        if (0 < this.roleNode.childrenCount) {
            gm.pool.put_children(this.roleNode);
        }

        gm.audio.play_effect(gm.const.AUDIO_163_UNLOCK_NEW_HERO_ANIM);
        this._heroID = gm.ui.get_module_args(gm.const.NEWHEROANIM.key) as number;
        this.hero_color_sprite.node.active = this.hero_profession_sprite.node.active = this.hero_profession2_sprite.node.active = this.hero_name_lbl.node.active = true;

        const heroData = gm.config.get_row_data("HeroConfigData", this._heroID.toString()) as HeroConfig;
        if (!heroData) {
            gm.pool.put_children(this.roleNode);
            gm.ui.async_hide_module(gm.const.NEWHEROANIM);
            return;
        }

        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + heroData.heroid, NodePoolItem, (nodePoolItem) => {
            if (0 == this.roleNode.childrenCount) {
                this.roleNode.addChild(nodePoolItem.node);
                nodePoolItem.node.x = 0;
                nodePoolItem.node.y = -69;
                nodePoolItem.node.scale = 2.5;
                if (nodePoolItem.getComponent(sp.Skeleton)) {
                    nodePoolItem.getComponent(sp.Skeleton).setSkin("front");
                    nodePoolItem.getComponent(sp.Skeleton).setAnimation(0, "stay", true);
                }
            } else {
                gm.pool.put(nodePoolItem.node);
            }
        });

        Utils.async_set_sprite_frame(this.hero_color_sprite, BundleName.COMMON, "res/circleColor_" + heroData.color);
        Utils.async_set_sprite_frame(this.hero_sprite, BundleName.COMMON, "res/heroCircleImg/" + heroData.heroid);
        this.hero_name_lbl.string = heroData.name;

        if (heroData.occupation <= 6) {
            this.hero_profession_sprite.node.active = true;
            if (3 < heroData.occupation) {
                this.hero_profession2_sprite.node.active = true;
                Utils.async_set_sprite_frame(this.hero_profession_sprite, BundleName.BUILD_FUNCTION, "res/1");
                Utils.async_set_sprite_frame(this.hero_profession2_sprite, BundleName.BUILD_FUNCTION, "res/2");
            } else {
                Utils.async_set_sprite_frame(this.hero_profession_sprite, BundleName.BUILD_FUNCTION, "res/" + heroData.occupation);
                this.hero_profession2_sprite.node.active = false;
            }

        } else {
            this.hero_profession_sprite.node.active = this.hero_profession2_sprite.node.active = !1;
        }

        Utils.async_set_sprite_frame(this.left_item_sprite, BundleName.COMMON, "res/heroCircleImg/" + heroData.itemType[0]);
        Utils.async_set_sprite_frame(this.right_item_sprite, BundleName.MAP, "res/" + heroData.itemType[1]);
        this.node.getComponent(cc.Animation).play();
    }

    private playAnimEnd(event: cc.Animation.EventType, animationName: { name: string }): void {
        if ("newHero" == animationName.name) {
            gm.pool.put_children(this.roleNode);
            gm.ui.async_hide_module(gm.const.NEWHEROANIM);
        }
    }
}

export default NewHeroAnim;