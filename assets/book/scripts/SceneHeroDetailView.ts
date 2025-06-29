import { GameModule } from '../../start-scene/scripts/GameModule';
import { Constants, BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Utils } from '../../start-scene/scripts/Utils';
import SceneBookLogic from './SceneBookLogic';
import { BookConfig } from '../../common/configs/books';
import { HeroConfig } from '../../common/configs/hero';
const { ccclass, property } = cc._decorator;

@ccclass
class SceneHeroDetailView extends GameModule {
    @property(cc.Node)
    private btn_left: cc.Node = null;

    @property(cc.Node)
    private btn_right: cc.Node = null;

    @property(cc.Node)
    private node_root: cc.Node = null;

    @property({ type: [cc.Node] })
    private pos_heros: cc.Node[] = [];

    @property(cc.Sprite)
    private icon: cc.Sprite = null;

    @property({ type: [cc.Node] })
    private dots: cc.Node[] = [];

    @property({ type: [cc.Node] })
    private lvs: cc.Node[] = [];

    @property(cc.Label)
    private lab_name: cc.Label = null;

    @property(cc.Label)
    private lab_defense: cc.Label = null;

    @property(cc.Label)
    private lab_attack: cc.Label = null;

    @property(cc.Label)
    private lab_hp: cc.Label = null;

    @property(cc.Label)
    private lab_range: cc.Label = null;

    @property(cc.Label)
    private lab_speed: cc.Label = null;

    @property(cc.RichText)
    private lab_defense_star: cc.RichText = null;

    @property(cc.RichText)
    private lab_attack_star: cc.RichText = null;

    @property(cc.RichText)
    private lab_hp_star: cc.RichText = null;

    @property({ type: [cc.Sprite] })
    private icon_occupations: cc.Sprite[] = [];

    private BG_COLOR: cc.Color[];
    private tItemId: number[];
    private tHeros: NodePoolItem[];
    private bIsSwitching: boolean;
    private iCurIndex: number;
    private colorDotBlack: cc.Color;
    private tOccupationIds: { [key: number]: number[] } | null;
    private bIsIcon: boolean;
    private sSkin: string | null;
    private sAni: string | null;

    private constructor() {
        super();
        this.BG_COLOR = [new cc.Color(91, 209, 97, 255), new cc.Color(23, 203, 254, 255), new cc.Color(251, 192, 0, 255), new cc.Color(195, 90, 252, 252)]
        this.tItemId = null;
        this.tHeros = [];
        this.bIsSwitching = false;
        this.iCurIndex = 0;
        this.colorDotBlack = new cc.Color(9, 66, 85, 255);
        this.tOccupationIds = null;
        this.bIsIcon = false;
        this.sSkin = null;
        this.sAni = null;
    }

    protected onLoad(): void { }

    protected onEnable(): void {
        this.recyleHeros();
        if (this.tOccupationIds == null) {
            this.tOccupationIds = {};
            this.tOccupationIds[1] = [1];
            this.tOccupationIds[2] = [2];
            this.tOccupationIds[3] = [3];
            this.tOccupationIds[4] = [1, 3];
            this.tOccupationIds[5] = [2, 3];
        }
        this.iCurIndex = 0;
        this.icon.node.x = 0;
        this.icon.spriteFrame = null;
        this.tItemId = gm.ui.get_module_args(Constants._instance.BOOK_HERO_DETAIL.key) as number[];
        this.loadHero();
        this.refreshBtnArrow();
        this.refreshAttr();
    }

    private loadHero(): void {
        const self = this;
        const bookConfig = gm.config.get_row_data("BookConfigData", this.tItemId[0].toString()) as BookConfig;

        this.sAni = bookConfig.animation;
        this.sSkin = bookConfig.skin == "default" ? null : bookConfig.skin;

        this.node_root.color = this.BG_COLOR[bookConfig.color - 1];
        this.bIsIcon = bookConfig.is_model !== 1;

        if (this.bIsIcon) {
            Utils.async_set_sprite_frame(this.icon, BundleName.COMMON, "res/handbook/" + bookConfig.icon);
            const isUnlocked = this.checkIsUnlock(bookConfig.id);
            this.icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
            this.icon.node.opacity = isUnlocked ? 255 : 171;
        } else {
            for (let index = 0; index < this.tItemId.length; index++) {
                (function (i: number) {
                    const currentItemId = self.tItemId[i];
                    const heroConfig = gm.config.get_row_data("HeroConfigData", currentItemId.toString()) as HeroConfig;

                    gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + heroConfig.heroid, NodePoolItem, (nodeItem) => {
                        self.tHeros.push(nodeItem);
                        nodeItem.node.scale = bookConfig.model_scale;
                        nodeItem.node.y = bookConfig.offset_y;

                        const isUnlocked = self.checkIsUnlock(currentItemId);
                        const spine = self.getSpine(nodeItem);
                        if (spine != null) {
                            spine.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
                        }

                        self.pos_heros[i].addChild(nodeItem.node);
                        self.refreshHeroAni();
                    });
                })(index);
            }
            this.pos_heros[0].parent.x = -339.121;
        }
    }

    private checkIsUnlock(num: number): boolean {
        return gm.data.mapCell_data.checkBookItemIsUnlock(num);
    }

    private refreshAttr(): void {
        const currentItemId = this.tItemId[this.iCurIndex];
        const heroConfig = gm.config.get_row_data("HeroConfigData", currentItemId.toString()) as HeroConfig;
        const bookConfig = gm.config.get_row_data("BookConfigData", currentItemId.toString()) as BookConfig;
        const isUnlocked = this.checkIsUnlock(currentItemId);

        this.lab_speed.node.parent.active = bookConfig.sub_type == SceneBookLogic.SUB_TYPE_HERO || bookConfig.sub_type == SceneBookLogic.SUB_TYPE_SUPER_HERO;

        this.lab_attack.string = heroConfig.attack.toString();
        this.lab_defense.string = heroConfig.defense.toString();
        this.lab_hp.string = heroConfig.hp.toString();
        this.lab_range.string = heroConfig.range.toString();
        this.lab_speed.string = heroConfig.speed.toString();
        this.lab_name.string = isUnlocked ? heroConfig.name : "";
        this.lab_defense_star.string = "";
        this.lab_attack_star.string = "";
        this.lab_hp_star.string = "";

        const starData = gm.data.hero_star_data.getHeroStarData(heroConfig.arms);
        if (starData) {
            this.lab_defense_star.string = `<b><color=#000000>（Phòng thủ +</color><color=#128400>${Math.floor(heroConfig.defense * starData.defense)}）</color>`;
            this.lab_attack_star.string = `<b><color=#000000>(Tấn công +</color><color=#128400>${Math.floor(heroConfig.attack * starData.attack)}）</color>`;
            this.lab_hp_star.string = `<b><color=#000000>（Sinh mạng +</color><color=#128400>${starData.hp}）</color>`;
        }

        this.lvs[0].parent.active = this.tItemId.length > 1;
        this.dots[0].parent.active = this.tItemId.length > 1;

        if (this.tItemId.length > 1) {
            for (let i = 0; i < this.lvs.length; i++) {
                this.lvs[i].active = i == this.iCurIndex;
            }
            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i].active = i < this.tItemId.length;
                this.dots[i].color = i == this.iCurIndex ? cc.Color.WHITE : this.colorDotBlack;
            }
        }

        const occupationIds = this.tOccupationIds[heroConfig.occupation];
        if (this.icon_occupations[0].node.parent.parent.active = occupationIds != null) {
            if (occupationIds != null) {
                for (let i = 0; i < 2; i++) {
                    const occupationIcon = this.icon_occupations[i];
                    occupationIcon.node.active = occupationIds[i] != null;
                    if (occupationIds[i] != null) {
                        Utils.async_set_sprite_frame(occupationIcon, BundleName.COMMON, "res/occupation/" + occupationIds[i]);
                    }
                }
            }
        }
    }

    private getSpine(nodePoolItem: NodePoolItem): sp.Skeleton | null {
        const skeletonComponent = nodePoolItem.getComponent(sp.Skeleton);
        return skeletonComponent == null ? nodePoolItem.getComponentInChildren(sp.Skeleton) : skeletonComponent;
    }

    private recyleHeros(): void {
        for (let heroIndex = 0; heroIndex < this.tHeros.length; heroIndex++) {
            const heroID = this.tHeros[heroIndex];
            const spineInstance = this.getSpine(heroID);

            if (spineInstance != null) {
                spineInstance.node.color = cc.Color.WHITE;
            }

            gm.pool.put(heroID.node);
        }

        this.tHeros = [];
    }

    private refreshHeroAni(): void {
        for (let heroIndex = 0; heroIndex < this.tHeros.length; heroIndex++) {
            const heroID = this.tHeros[heroIndex];
            const spineInstance = this.getSpine(heroID);

            if (spineInstance != null) {
                spineInstance.setToSetupPose();

                let animationName = "stay";
                let skinName = "front";

                if (this.sAni !== "") {
                    animationName = this.sAni;
                    skinName = this.sSkin;
                }

                if (skinName != null) {
                    spineInstance.setSkin(skinName);
                }
                spineInstance.setAnimation(0, animationName, true);
                spineInstance.animation = animationName;
            }
        }
    }

    private scrollTo(isNext: boolean): void {
        let targetX: number, resetX: number;
        const self = this;

        if (this.bIsIcon) {
            if (this.tItemId[this.iCurIndex] != null) {
                this.bIsSwitching = true;
                targetX = isNext ? this.node_root.width : -1 * this.node_root.width;
                resetX = isNext ? -1 * this.node_root.width : this.node_root.width;

                cc.tween(this.icon.node).to(0.08, { x: targetX }).call(function () {
                    self.icon.node.x = resetX;
                    const bookData = gm.config.get_row_data("BookConfigData", self.tItemId[self.iCurIndex].toString()) as BookConfig;
                    Utils.async_set_sprite_frame(self.icon, BundleName.COMMON, "res/handbook/" + bookData.icon);

                    const isUnlocked = self.checkIsUnlock(bookData.id);
                    self.icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
                    self.icon.node.opacity = isUnlocked ? 255 : 171;

                    cc.tween(self.icon.node).to(0.08, { x: 0 }).call(function () {
                        self.bIsSwitching = false;
                    }).start();
                }).start();
            }
        } else {
            const heroParentNode = this.pos_heros[0].parent;
            targetX = isNext ? this.node_root.width : -1 * this.node_root.width;
            targetX += heroParentNode.x;
            this.bIsSwitching = true;

            this.refreshHeroAni();

            cc.tween(heroParentNode).to(0.1, { x: targetX }).call(function () {
                self.bIsSwitching = false;
            }).start();
        }
    }

    private refreshBtnArrow(): void {
        this.btn_left.active = this.tItemId[this.iCurIndex - 1] != null;
        this.btn_right.active = this.tItemId[this.iCurIndex + 1] != null;
    }

    private editor_on_button_click_handler(buttonNode: cc.Event, additionalData: string | null = null): void {
        switch (buttonNode.target.name) {
            case "btn_close":
                gm.ui.async_hide_module(Constants._instance.BOOK_HERO_DETAIL);
                break;
            case "btn_arrow_L":
                if (this.bIsSwitching) return;
                this.iCurIndex--;
                this.scrollTo(true);
                this.refreshBtnArrow();
                this.refreshAttr();
                break;
            case "btn_arrow_R":
                if (this.bIsSwitching) return;
                this.iCurIndex++;
                this.scrollTo(false);
                this.refreshBtnArrow();
                this.refreshAttr();
                break;
        }
    }

    protected onDisable(): void {
        this.tItemId = null;
        this.recyleHeros();
    }
}
