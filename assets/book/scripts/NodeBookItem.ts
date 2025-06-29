import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName, RewardIdEnum, SetItemNumEnum } from '../../start-scene/scripts/Constants';
import { Utils } from '../../start-scene/scripts/Utils';
import SceneBookLogic from './SceneBookLogic';
import { BookConfig } from '../../common/configs/books';

const { ccclass, property } = cc._decorator;

@ccclass
class NodeBookItem extends NodePoolItem {
    @property(cc.Sprite)
    private icon: cc.Sprite = null;

    @property(cc.Node)
    private node_empty: cc.Node = null;

    @property(cc.Node)
    private node_root: cc.Node = null;

    @property(cc.Sprite)
    private icon_reward: cc.Sprite = null;

    @property(cc.Button)
    private btn_click: cc.Button = null;

    @property({ type: [cc.Node] })
    private color_bgs: cc.Node[] = [];

    private iItemId: number;
    private iScale: number;

    private constructor() {
        super();
        this.iItemId = 0;
        this.iScale = 0;
    }

    protected onLoad(): void { }

    protected onEnable(): void {
        this.setScale(this.iScale);
    }

    protected start(): void { }

    public init(itemId: number, interactable?: boolean): void {
        this.btn_click.interactable = (interactable !== undefined) ? interactable : true;
        if (itemId <= 0) return;
        this.iItemId = itemId;
        const logic = gm.ui.get_module(gm.const.BOOK).getLogic();
        const delayCd = logic.getDelayCd(itemId);
        const configData = gm.config.get_row_data("BookConfigData", itemId.toString()) as BookConfig;

        this.node_root.active = true;
        const isUnlock = logic.checkIsUnlock(itemId);
        const hasUnlockReward = gm.data.mapCell_data.checkBookItemHaveUnlockReward(itemId);
        let hasReward: boolean = configData.reward > 0 && isUnlock && hasUnlockReward;

        let isHeroType = false;
        if (!(isHeroType = [SceneBookLogic.SUB_TYPE_HERO, SceneBookLogic.SUB_TYPE_SUPER_HERO, SceneBookLogic.SUB_TYPE_HERO_WALL, SceneBookLogic.SUB_TYPE_DEFEND].includes(configData.sub_type)) && !hasReward) {
            const levelList = logic.getLvList(itemId);
            for (const level of levelList) {
                const bookconfig = gm.config.get_row_data("BookConfigData", level.toString()) as BookConfig;
                hasReward = 0 < bookconfig.reward;
                if (hasReward && logic.checkIsUnlock(level) && gm.data.mapCell_data.checkBookItemHaveUnlockReward(level)) {
                    break;
                }
            }
        }

        const colorIndex = isUnlock ? configData.color : 0;
        this.color_bgs.forEach((bg, index) => {
            bg.active = index == colorIndex;
        });

        Utils.async_set_sprite_frame(this.icon, BundleName.COMMON, `res/handbook/${configData.icon}`);
        this.icon.node.opacity = isUnlock ? 255 : 171;
        this.icon.node.color = isUnlock ? cc.Color.WHITE : cc.Color.BLACK;
        this.icon_reward.node.parent.active = hasReward;
        this.icon_reward.node.scale = 0.6;

        if (hasReward) {
            this.icon_reward.node.active = isHeroType;
            if (this.icon_reward.node.active) {
                Utils.async_set_sprite_frame(this.icon_reward, BundleName.COMMON, `res/handbook/${configData.reward}`);
            }
        }

        this.delayShow(delayCd);
    }

    private delayShow(delay: number): void {
        cc.Tween.stopAllByTarget(this.node_root);
        if (delay <= 0) {
            this.node_root.opacity = 255;
        } else {
            this.node_root.opacity = 0;
            cc.tween(this.node_root).delay(delay).to(0.42, { opacity: 255 }).start();
        }
    }

    private setScale(scale: number): void {
        this.iScale = scale;
        this.node.scale = this.iScale;
    }

    private checkGainReward(): boolean {
        if (!this.icon_reward.node.active) return false;

        const configData = gm.config.get_row_data("BookConfigData", this.iItemId.toString()) as BookConfig;
        if (gm.data.mapCell_data.checkBookItemHaveUnlockReward(this.iItemId)) {
            if (configData.reward == RewardIdEnum.DIAMOND) {
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, configData.num);
                gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            } else if (configData.reward == RewardIdEnum.GOLD) {
                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, configData.num);
                gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            gm.data.mapCell_data.setBookItemGainUnlockReward(this.iItemId);
            this.icon_reward.node.parent.active = false;
            this.icon_reward.node.active = false;
            gm.ui.get_module(gm.const.BOOK).getLogic().refreshRed();
            return true;
        }
        return false;
    }

    protected editor_on_button_click_handler(event: cc.Event.EventTouch, customData = null): void {
        console.log("NodeBookItem->editor_on_button_click_handler:", this.iItemId);
        if (!this.checkGainReward() && this.iItemId > 0) {
            const configData = gm.config.get_row_data("BookConfigData", this.iItemId.toString()) as BookConfig;
            const logic = gm.ui.get_module(gm.const.BOOK).getLogic();
            if ([SceneBookLogic.SUB_TYPE_HERO, SceneBookLogic.SUB_TYPE_DEFEND, SceneBookLogic.SUB_TYPE_SUPER_HERO].includes(configData.sub_type)) {
                const levelList = logic.getLvList(this.iItemId);
                gm.ui.set_module_args(gm.const.BOOK_HERO_DETAIL.key, levelList);
                gm.ui.show_panel(gm.const.BOOK_HERO_DETAIL);
            } else if (configData.sub_type == SceneBookLogic.SUB_TYPE_HERO_WALL) {
                gm.ui.set_module_args(gm.const.BOOK_HERO_DETAIL.key, [this.iItemId]);
                gm.ui.show_panel(gm.const.BOOK_HERO_DETAIL);
            } else {
                const levelList = logic.getLvList(this.iItemId);
                gm.ui.set_module_args(gm.const.BOOK_ITEM_DETAIL.key, levelList);
                gm.ui.show_panel(gm.const.BOOK_ITEM_DETAIL);
            }
        }
    }

    public reset(): void {
        cc.Tween.stopAllByTarget(this.node_root);
        this.iItemId = 0;
        this.node_root.opacity = 255;
        this.node_empty.active = true;
        this.node_root.active = false;
        this.setScale(1);
    }

    protected onDisable(): void { }
}

export default NodeBookItem;