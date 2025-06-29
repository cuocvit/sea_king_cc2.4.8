import { BundleName, RewardIdEnum, SetItemNumEnum } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import SceneBookLogic from './SceneBookLogic';
import { BookConfig } from '../../common/configs/books';

const { ccclass, property } = cc._decorator;

interface IconData {
    sIconPath: string;
    iScale: number;
}

@ccclass
class SceneItemDetailView extends GameModule {
    @property(cc.Node)
    private btn_left: cc.Node | null = null;

    @property(cc.Node)
    private btn_right: cc.Node | null = null;

    @property(cc.Sprite)
    private big_icon: cc.Sprite | null = null;

    @property(cc.Node)
    private list_lvs: cc.Node | null = null;

    @property(cc.Label)
    private lab_name: cc.Label | null = null;

    private tItemId: number[] | null;
    private bIsSwitching: boolean;
    private iCurIndex: number;
    private readonly tLvNums: number[];

    private constructor() {
        super();
        this.tItemId = null;
        this.bIsSwitching = false;
        this.iCurIndex = 0;
        this.tLvNums = [1, 3, 7, 15, 31, 63, 128, 260];
    }

    protected onLoad(): void { }

    protected onEnable(): void {
        this.iCurIndex = 0;
        this.tItemId = gm.ui.get_module_args(gm.const.BOOK_ITEM_DETAIL.key) as number[];

        this.refreshBtnArrow();
        const bookConfig = gm.config.get_row_data("BookConfigData", this.tItemId[0].toString()) as BookConfig;
        const iconData = this.getIconData(bookConfig);

        if (this.big_icon) {
            this.big_icon.node.scale = iconData.iScale;
            Utils.async_set_sprite_frame(this.big_icon, BundleName.COMMON, iconData.sIconPath);
        }

        const isUnlocked = this.checkIsUnlock(this.tItemId[0]);
        if (this.lab_name) {
            this.lab_name.string = isUnlocked ? bookConfig.name : "";
        }

        if (this.big_icon) {
            this.big_icon.node.opacity = isUnlocked ? 255 : 171;
            this.big_icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
        }

        this.refreshLvList();
    }

    private switchIndex(direction: number): void {
        if (direction !== 0) {
            this.iCurIndex += direction;
            const bookConfig = gm.config.get_row_data("BookConfigData", this.tItemId[this.iCurIndex].toString()) as BookConfig;
            const targetX = direction > 0 ? 0 : 720;
            const resetX = direction > 0 ? 720 : 0;

            this.bIsSwitching = true;

            const isUnlocked = this.checkIsUnlock(this.tItemId[this.iCurIndex]);
            if (this.lab_name) {
                this.lab_name.string = isUnlocked ? bookConfig.name : "";
            }

            cc.tween(this.big_icon.node).to(0.1, { x: targetX }).call(() => {
                if (this.big_icon) {
                    this.big_icon.node.opacity = 0;
                    this.big_icon.node.x = resetX;

                    const iconData = this.getIconData(bookConfig);

                    Utils.async_set_sprite_frame(this.big_icon, BundleName.COMMON, iconData.sIconPath, () => {
                        if (this.big_icon) {
                            this.big_icon.node.scale = iconData.iScale;
                            this.big_icon.node.opacity = isUnlocked ? 255 : 171;
                            this.big_icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
                        }
                    }, this);

                    cc.tween(this.big_icon.node).to(0.1, { x: 0 }).call(() => {
                        this.refreshLvList();
                        this.refreshBtnArrow();
                        this.bIsSwitching = false;
                    }).start();
                }
            }).start();
        } else {
            this.refreshLvList();
        }
    }

    private getIconData(bookConfig: BookConfig): IconData {
        let iconPath = "res/handbook/" + bookConfig.icon;
        let scale = 2;

        if (bookConfig.is_big_icon == 1) {
            iconPath = "res/handbookBig/" + bookConfig.icon;
            scale = 1;
        }

        return { sIconPath: iconPath, iScale: scale };
    }

    private refreshLvList(): void {
        const levelCount = this.list_lvs?.childrenCount || 0;
        for (let index = 0; index < levelCount; index++) {
            const levelCell = this.list_lvs?.children[index];
            if (levelCell) {
                this.refreshOneLvCell(levelCell, index);
            }
        }
    }

    private refreshOneLvCell(cellNode: cc.Node, index: number): void {
        const itemId = this.tItemId[index];
        cellNode.active = itemId != null;

        if (itemId != null) {
            const bookConfig = gm.config.get_row_data("BookConfigData", itemId.toString()) as BookConfig;
            const arrowIcon = this.getChild(cellNode, "icon_arrow_min")
            const selectionIndicator = this.getChild(cellNode, "select");
            const newIndicator = this.getChild(cellNode, "new");
            const numLabel = this.getChildComp(cellNode, "lab_num", cc.Label);
            const nameLabel = this.getChildComp(cellNode, "lab_name", cc.Label);
            const iconSprite = this.getChildComp(cellNode, "icon", cc.Sprite);

            if (iconSprite) {
                iconSprite.node.scale = 0.75;
                Utils.async_set_sprite_frame(iconSprite, BundleName.COMMON, "res/handbook/" + bookConfig.icon);
            }

            if (selectionIndicator) {
                selectionIndicator.active = this.iCurIndex == index;
            }

            if (arrowIcon) {
                arrowIcon.active = index > 0 && index !== 4;
            }

            if (numLabel) {
                numLabel.node.active = false;
            }
            if (nameLabel) {
                nameLabel.string = "";
            }

            const isUnlocked = this.checkIsUnlock(itemId);
            if (iconSprite) {
                iconSprite.node.opacity = isUnlocked ? 255 : 171;
                iconSprite.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
            }

            const hasReward = isUnlocked && gm.data.mapCell_data.checkBookItemHaveUnlockReward(itemId);
            if (newIndicator) {
                newIndicator.active = hasReward;
            }

            if (isUnlocked) {
                if (numLabel && bookConfig.sub_type == SceneBookLogic.SUB_TYPE_MATERIAL_NORMAL) {
                    numLabel.node.active = true;
                    numLabel.string = "X" + this.tLvNums[index];
                }
                if (nameLabel) {
                    nameLabel.string = bookConfig.name;
                }
            }

            if (hasReward) {
                const rewardIcon = this.getChildComp(newIndicator, "reward_icon", cc.Sprite);
                if (rewardIcon) {
                    rewardIcon.node.scale = 0.45;
                    Utils.async_set_sprite_frame(rewardIcon, BundleName.COMMON, "res/handbook/" + bookConfig.reward);
                }
            }
        }
    }

    private checkIsUnlock(key: number): boolean {
        return gm.data.mapCell_data.checkBookItemIsUnlock(key);
    }

    private gainReward(index: number): void {
        const itemId = this.tItemId[index];

        if (gm.data.mapCell_data.checkBookItemHaveUnlockReward(itemId)) {
            const itemConfig = gm.data.config_data.getItemCfgByID(itemId);

            if (itemConfig) {
                gm.channel.report_event("receive_handbook_reward", {
                    event_desc: "领取图鉴奖励",
                    desc: "领取图鉴奖励" + itemConfig.name
                });
                ReportData.instance.report_once_point(10831);
                ReportData.instance.report_point(10832);
            }

            const rewardData = gm.config.get_row_data("BookConfigData", itemId.toString()) as BookConfig;

            if (rewardData.reward == 11003) {
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, rewardData.num);
                gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            } else if (rewardData.reward == 11002) {
                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, rewardData.num);
                gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }

            gm.data.mapCell_data.setBookItemGainUnlockReward(itemId);
            gm.ui.get_module(gm.const.BOOK).getLogic().refreshRed();
        }
    }

    private refreshBtnArrow(): void {
        this.btn_left.active = this.tItemId[this.iCurIndex - 1] != null;
        this.btn_right.active = this.tItemId[this.iCurIndex + 1] != null;
    }

    editor_on_button_click_handler(button: cc.Event, event: string | null = null): void {
        switch (button.target.name) {
            case "btn_close":
                gm.ui.async_hide_module(gm.const.BOOK_ITEM_DETAIL);
                break;
            case "btn_arrow_L":
                if (this.bIsSwitching) return;
                this.switchIndex(-1);
                break;
            case "btn_arrow_R":
                if (this.bIsSwitching) return;
                this.switchIndex(1);
                break;
            case "btn_lv":
                let levelIndex = 0;
                const totalLevels = this.list_lvs?.childrenCount || 0;

                for (let i = 0; i < totalLevels; i++) {
                    if (this.list_lvs?.children[i].uuid == button.target.parent.uuid) {
                        levelIndex = i;
                    }
                }

                const levelDifference = levelIndex - this.iCurIndex;
                this.gainReward(levelIndex);
                this.switchIndex(levelDifference);

                console.log("btn_lv iLvIndex:" + levelIndex);

                const bookModule = gm.ui.get_module(gm.const.BOOK);
                if (bookModule) {
                    bookModule.getLogic().refreshCurTab();
                }
                break;
        }
    }

    protected onDisable(): void {
        this.tItemId = null;
    }

    private getChildComp<T>(parentNode: cc.Node, childName: string, componentType: { new(): T }): T | null {
        const childNode = this.getChild(parentNode, childName);
        return childNode ? childNode.getComponent(componentType) : null;
    }

    private getChild(parentNode: cc.Node, childPath: string): cc.Node | null {
        const names = childPath.split("/");
        let currentNode: cc.Node | null = parentNode;

        for (let i = 0; i < names.length; i++) {
            if (currentNode == null) {
                cc.error("Utils getChild childPath: " + childPath + " index: " + (i - 1) + " name: " + names[i - 1]);
                return null;
            }
            currentNode = currentNode.getChildByName(names[i]);
        }
        return currentNode;
    }
}
