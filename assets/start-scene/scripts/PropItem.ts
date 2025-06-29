// @
import { Utils } from './Utils';
import { ItemTypeEnum, PropTypeEnum, HeroTypeEnum, BundleName } from './Constants';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { MapItemDataVO } from './MapCellCfgData';
import { ItemConfig } from '../../common/configs/item';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PropItem extends cc.Component {
    @property(cc.Sprite)
    private itemImg: cc.Sprite = null;

    @property(cc.Node)
    private roleNode: cc.Node = null;

    @property(cc.Node)
    private bgwhite: cc.Node = null;

    @property(cc.Label)
    private lvl: cc.Label = null;

    @property(cc.Node)
    private diaoxiangTipsNode: cc.Node = null;

    @property(cc.Node)
    private clickNode: cc.Node = null;

    @property(cc.Node)
    private moveNode: cc.Node = null;

    @property(cc.Node)
    private defenseIcon: cc.Node = null;

    @property(cc.Node)
    public newItemNode: cc.Node = null;

    // private
    private itemCfg: ItemConfig;
    private _itemData: MapItemDataVO;
    private _heroCfg: HeroConfig;
    private _isShowTips: boolean;
    private _isFirstMove: boolean;
    private _startTime: number;

    // @
    constructor() {
        super();
        this.itemCfg = null;
        this._itemData = null;
        this._heroCfg = null;
        this._isShowTips = false;
        this._isFirstMove = false;
        this._startTime = 0;
    }

    //
    public initData(itemData: MapItemDataVO): void {
        this._itemData = itemData;
        this.diaoxiangTipsNode.active = false;
        this.defenseIcon.active = false;
        if (0 != this._itemData.itemID) {
            if (this._itemData.itemType == ItemTypeEnum.ITEM_TYPE) {
                this.itemImg.node.active = true;
                this.roleNode.active = false;
                this.itemCfg = gm.data.config_data.getItemCfgByID(this._itemData.itemID) as ItemConfig;
                if (this.itemCfg) {
                    this._heroCfg = null;
                    this.itemImg.node.x = this.itemCfg.xoffset;
                    this.itemImg.node.y = this.itemCfg.offset;
                    if ("" == this.itemCfg.anim_name) {
                        Utils.async_set_sprite_frame(this.itemImg, BundleName.MAP, "res/" + this.itemCfg.icon);
                        gm.pool.put_children(this.itemImg.node);
                        if (this.itemCfg.type == PropTypeEnum.STONE_HERO_TYPE) {
                            this.diaoxiangTipsNode.active = true;
                        }
                    } else {
                        this.itemImg.spriteFrame = null;
                        gm.pool.put_children(this.itemImg.node);
                        gm.pool.async_get(BundleName.MAP, "prefabs/item/" + this.itemCfg.anim_name, NodePoolItem, (nodePoolItem) => {
                            if (0 == this.itemImg.node.childrenCount) {
                                this.itemImg.node.addChild(nodePoolItem.node);
                                const animation = nodePoolItem.getComponent(cc.Animation);
                                if (animation) {
                                    animation.play();
                                }
                            }
                        })
                    }
                }

            } else if (this._itemData.itemType == ItemTypeEnum.HERO_TYPE) {
                this._heroCfg = gm.data.config_data.getHeroCfgByID(this._itemData.itemID) as HeroConfig;
                this.itemCfg = null;
                this.defenseIcon.active = gm.data.mapCell_data.getHeroIsDefanseByCellID(this._itemData.cellID);
                this.itemImg.node.active = false;
                this.roleNode.active = true;
                if (0 < this.roleNode.childrenCount) {
                    gm.pool.put_children(this.roleNode);
                }
                gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + this._heroCfg.heroid, NodePoolItem, (nodePoolItem) => {

                    if (0 == this.roleNode.childrenCount) {
                        this.roleNode.addChild(nodePoolItem.node);
                        nodePoolItem.node.x = 0;
                        nodePoolItem.node.y = -15;
                        if (nodePoolItem.getComponent(sp.Skeleton)) {
                            nodePoolItem.getComponent(sp.Skeleton).setSkin("front");
                            nodePoolItem.getComponent(sp.Skeleton).setAnimation(0, "stay", !0);
                            if (this._heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                                (nodePoolItem.node.x = -20);
                            }
                        }

                        this.roleNode.active = true;
                        if (10 == this._heroCfg.occupation) {
                            this.setWallImg();
                        }
                        nodePoolItem.node.color = cc.Color.WHITE;
                        const heroNode = gm.data.mapCell_data.getSuperHeroData(this._heroCfg.heroid, this._itemData.cellID)
                        if ((this._heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) && heroNode && 1 == heroNode.heroState) {
                            (nodePoolItem.node.color = cc.Color.GRAY);
                        }
                    } else {
                        gm.pool.put(nodePoolItem.node);
                    }
                });
            }

            this.roleNode.parent.x = 0;
            this.roleNode.parent.y = 0;
            this.bgwhite.active = false;
        } else {
            this.node.removeFromParent();
        }
    }

    private setWallImg(): void {
        const wallCellIDs = gm.data.config_data.getCallDireCellID(this._itemData.cellID);
        if (0 < this.roleNode.childrenCount) {
            for (let index = 0; index < wallCellIDs.length; index++) {
                if (this.roleNode.children[0].getChildByName(gm.const.WALLNAMELIST[index])) {
                    if (-1 == wallCellIDs[index]) {
                        this.roleNode.children[0].getChildByName(gm.const.WALLNAMELIST[index]).active = false;
                    } else {
                        this.roleNode.children[0].getChildByName(gm.const.WALLNAMELIST[index]).active = gm.data.mapCell_data.getCellIsWall(wallCellIDs[index]);
                    }
                }
            }
        }
    }

    protected onEnable(): void {
        this.newItemNode.active = false;
        this.clickNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.openBarrelAnimEnd, this);
        this.roleNode.parent.x = 0;
        this.roleNode.parent.y = 0;
        this.moveNode.active = false;

        gm.ui.on("item_move", this.on_move_item_move, this);
        gm.ui.on("item_move_end", this.on_move_item_hide, this);
        gm.ui.on("item_not_move_end", this.on_not_move_item_hide, this);
        gm.ui.on("compose_anim", this.playAddItemAnim, this);
        gm.ui.on("updateWall", this.updateWall, this);
        gm.ui.on("updateDefenseHero", this.updateDefenseHero, this);
        gm.ui.on("set_item_battle_hero_operty", this.setBatterHeroOpacity, this);
        gm.ui.on("set_new_item_alpha", this.showIsNewItem, this);
        gm.ui.on("refresh_super_hero_color", this.refreshSuperHeroColor, this);
        gm.ui.on("close_new_anim", this.hideNewAnim, this);
    }

    private refreshSuperHeroColor(cellID: number, itemID: number): void {
        if (this._itemData && cellID == this._itemData.cellID && itemID == this._itemData.itemID && 0 < this.roleNode.childrenCount) {
            this.roleNode.children[0].color = cc.Color.WHITE;
        }
    }

    private showIsNewItem(cellID: number): void {
        if (this._itemData && cellID == this._itemData.cellID) {
            this.newItemNode.active = true;
        }
    }

    private setBatterHeroOpacity(cellID: number, isVisible: boolean): void {
        cc.log("setBatterHeroOpacity" + cellID, isVisible);
        if (this._itemData && cellID == this._itemData.cellID) {
            this.node.opacity = isVisible ? 255 : 0;
        }
    }

    private updateDefenseHero(cellID: number, isActive: boolean): void {
        if (this._itemData && cellID == this._itemData.cellID) {
            this.defenseIcon.active = isActive;
        }
    }

    private updateWall(cellID: number): void {
        if (this._itemData && cellID == this._itemData.cellID) {
            this.setWallImg();
        }
    }

    private on_not_move_item_hide(podition: cc.Vec2, cellID: number): void {
        this.on_move_item_hide(podition, cellID);
    }

    private on_move_item_move(touchEvent: cc.Vec2, itemType: ItemTypeEnum, itemID: number): void {
        if (this._itemData && !this._isFirstMove) {
            this._isFirstMove = true;
            this._isShowTips = false;
            this.moveNode.active = true;
            if (itemType == ItemTypeEnum.ITEM_TYPE) {
                const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig && this.itemCfg) {
                    if (itemConfig.type == this.itemCfg.type) {
                        if (!(itemConfig.type != PropTypeEnum.WOOD_TYPE &&
                            itemConfig.type != PropTypeEnum.IRON_TYPE &&
                            itemConfig.type != PropTypeEnum.SHELL_MONEY_TYPE &&
                            itemConfig.type != PropTypeEnum.SOUL_TYPE)) {

                            this.lvl.string = this.itemCfg.number + "";
                            this._isShowTips = true;
                        }
                    }

                    if (itemID == this.itemCfg.id && 0 < this.itemCfg.next) {
                        this.bgwhite.active = true;
                        this.node.getComponent(cc.Animation).play("item_Tishi");
                        this._isShowTips = true;
                    }
                }
                else if (itemConfig && this._heroCfg && itemConfig.type == PropTypeEnum.WEAPON_TYPE && this._heroCfg) {
                    for (let index = 0; index < this._heroCfg.nextNeedItem.length; index++) {
                        if (itemConfig.id == this._heroCfg.nextNeedItem[index]) {
                            this.bgwhite.active = true;
                            this.node.getComponent(cc.Animation).play("item_Tishi");
                            this._isShowTips = true;
                            return;
                        }
                    }
                }

            } else if (itemType == ItemTypeEnum.HERO_TYPE) {
                const heroConfig = gm.data.config_data.getHeroCfgByID(itemID);
                if (heroConfig) {
                    for (let index = 0; index < heroConfig.nextNeedItem.length; index++) {
                        if (this._itemData.itemID == heroConfig.nextNeedItem[index]) {
                            this.bgwhite.active = true;
                            this.node.getComponent(cc.Animation).play("item_Tishi");
                            this._isShowTips = true;
                            return;
                        }
                    }
                }
            }
        }
    }

    private on_move_item_hide(param1?: cc.Vec2, pram2?: number): void {
        this._isFirstMove = false;
        if (this._isShowTips) {
            this._isShowTips = false;
            this.bgwhite.active = false;
            this.lvl.string = "";
            this.node.getComponent(cc.Animation).stop();
            this.roleNode.parent.x = 0;
            this.roleNode.parent.y = 0;
            this.itemImg.node.parent.scale = 1;
        }
    }

    private onTouchStart(): void {
        this.newItemNode.active = false;
        if (this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            1 == gm.data.fight_temp_data.open_battle_panel_state ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.BARRIL_TYPE ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.STONE_HERO_TYPE ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.HEROGIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.GIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.PAGODAGIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.DIAMONDS_TYPE) {
            return;
        }

        this._startTime = Date.now();
    }

    private onTouchMove(touchEvent: cc.Event.EventTouch): void {
        if (this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.BARRIL_TYPE ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            1 == gm.data.fight_temp_data.open_battle_panel_state ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.STONE_HERO_TYPE ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.HEROGIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.GIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg && this.itemCfg.id == gm.const.PAGODAGIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.DIAMONDS_TYPE ||
            this._itemData.itemType == ItemTypeEnum.HERO_TYPE &&
            this._heroCfg &&
            this._heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE &&
            0 == touchEvent.touch._startPoint.sub(touchEvent.touch._point).mag() ||
            this._itemData.itemType == ItemTypeEnum.HERO_TYPE &&
            this._heroCfg &&
            (11 == this._heroCfg.occupation ||
                12 == this._heroCfg.occupation) &&
            0 == touchEvent.touch._startPoint.sub(touchEvent.touch._point).mag()) {
            return;
        }

        if (0 < this.node.opacity) {
            this.node.opacity = 0;
            this._isFirstMove = false;
        }
        gm.ui.emit("item_move", touchEvent.getLocation(), this._itemData.itemType, this._itemData.itemID);
    }

    public onOpenBarrel(): void {
        this.node.opacity = 255;
        this.node.getComponent(cc.Animation).play("item_TongClose");
        if (this._itemData) {
            gm.data.mapCell_data.openCase(this._itemData.cellID, this._itemData.itemID);
            if (gm.data.mapCell_data.isGuide) {
                if (3 == gm.data.mapCell_data.role_openBarrel_Times) {
                    gm.data.mapCell_data.setRoleGuideData(2, 0);
                    gm.ui.mapMainUI.checkGuideIsShow();
                } else {
                    gm.ui.mapMainUI.checkHandAnimDelay();
                }
            }
        }

        this.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            this.initData(gm.data.mapCell_data.role_map_data[this._itemData.cellID])
        }, .25);
    }

    public onOpenSuperHeroCase(): void {
        this.node.getComponent(cc.Animation).play("item_open_statue");
        gm.audio.play_effect(gm.const.AUDIO_90_STATUE_BREAKING);
        this.node.opacity = 255;
        gm.data.mapCell_data.openHeroGiftCase(this.itemCfg?.price, this._itemData?.cellID);
        this.initData(gm.data.mapCell_data.role_map_data[this._itemData.cellID]);
    }

    public onOpenGiftCase(): void {
        this.node.getComponent(cc.Animation).play("item_open_statue");
        gm.audio.play_effect(gm.const.AUDIO_90_STATUE_BREAKING);
        this.node.opacity = 255;
        gm.data.mapCell_data.openWaterGirlCase(this.itemCfg?.price, this._itemData?.cellID);
    }

    private onOpenPagodaCase(): void {
        this.node.getComponent(cc.Animation).play("item_open_statue");
        gm.audio.play_effect(gm.const.AUDIO_90_STATUE_BREAKING);
        this.node.opacity = 255;
    }

    private onOpenHeroDescOp(): void {
        gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [this._heroCfg?.heroid, this._itemData?.cellID]);
        gm.ui.async_show_module(gm.const.SUPERHEROOP);
    }

    private onTouchEnd(touchEvent: cc.Event.EventTouch): void {
        if (!this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying) {
            if (this._itemData.itemType == ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.type == PropTypeEnum.BARRIL_TYPE) {
                this.onOpenBarrel();

            } else if (this._itemData.itemType == ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.id == gm.const.HEROGIFTID) {
                this.onOpenSuperHeroCase();

            } else if (this._itemData.itemType != ItemTypeEnum.ITEM_TYPE || this.itemCfg || this.itemCfg.id != gm.const.GIFTID && this.itemCfg.id != gm.const.PAGODAGIFTID) {
                if (this._itemData.itemType == ItemTypeEnum.HERO_TYPE &&
                    this._heroCfg &&
                    this._heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE &&
                    Date.now() - this._startTime < 200 ||
                    this._itemData.itemType == ItemTypeEnum.HERO_TYPE &&
                    this._heroCfg &&
                    (11 == this._heroCfg.occupation || 12 == this._heroCfg.occupation) &&
                    Date.now() - this._startTime < 200) {
                    this.onOpenHeroDescOp();

                } else if (this._itemData.itemType == ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.type == PropTypeEnum.STONE_HERO_TYPE) {
                    this.onClickOpenHero();

                } else {
                    this.node.opacity = 255;
                    gm.ui.mapMainUI.hideMoveItemNode();
                    gm.ui.emit("item_move_hide_upgrade");
                    gm.ui.emit("hide_barrel_ui");
                    gm.ui.emit("item_not_move_end", touchEvent.getLocation(), this._itemData.cellID);
                }

            } else {
                this.onOpenGiftCase()
            }
        }
    }

    public onClickOpenHero(): void {
        if (this._itemData.itemType == ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.type == PropTypeEnum.STONE_HERO_TYPE) {
            this.node.getComponent(cc.Animation).play("item_open_statue");
            gm.audio.play_effect(gm.const.AUDIO_90_STATUE_BREAKING);
            this.node.opacity = 255;
            gm.data.mapCell_data.openStoneHero(this._itemData.cellID, this._itemData.itemID);
            this.initData(gm.data.mapCell_data.role_map_data[this._itemData.cellID]);
            return;
        }
    }

    private onTouchCancel(touchEvent: cc.Touch): void {
        if (this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.BARRIL_TYPE ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.STONE_HERO_TYPE ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.GIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.PAGODAGIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.id == gm.const.HEROGIFTID ||
            this._itemData.itemType == ItemTypeEnum.ITEM_TYPE &&
            this.itemCfg &&
            this.itemCfg.type == PropTypeEnum.DIAMONDS_TYPE) {
            return;
        }

        this.node.opacity = 255;
        gm.ui.emit("item_move_end", touchEvent.getLocation(), this._itemData.cellID);
        this._isFirstMove = false;
    }

    private openBarrelAnimEnd(): void { }

    private item_move_anim(itemID: number): void {
        const itemType = 3e4 < itemID ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
        const currentItemType = 3e4 < this._itemData.itemID ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
        if (itemType == ItemTypeEnum.HERO_TYPE) {
            if (2 == this._itemData.cellState) {
                this.lvl.string = "";
                const heroConfig = gm.data.config_data.getHeroCfgByID(itemID);
                if (heroConfig) {
                    for (let index = 0; index < heroConfig.nextNeedItem.length; index++) {
                        if (0 < heroConfig.nextNeedItem[index] && this._itemData.itemID == heroConfig.nextNeedItem[index]) {
                            this.bgwhite.active = true;
                            this.node.getComponent(cc.Animation).play("item_Tishi");
                        }
                    }
                }
            }
        } else if (itemType == ItemTypeEnum.ITEM_TYPE) {
            this.lvl.string = "";
            if (2 == this._itemData.cellState) {
                const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig) {
                    if (currentItemType == ItemTypeEnum.ITEM_TYPE) {
                        if (itemConfig.type == PropTypeEnum.WOOD_TYPE ||
                            itemConfig.type == PropTypeEnum.IRON_TYPE ||
                            itemConfig.type == PropTypeEnum.SHELL_MONEY_TYPE ||
                            itemConfig.type == PropTypeEnum.SOUL_TYPE) {
                            this.bgwhite.active = 2 == this._itemData.cellState && itemID == this._itemData.itemID;

                            if (this.bgwhite.active) {
                                this.node.getComponent(cc.Animation).play("item_Tishi");
                            }

                            if (!this.itemCfg) {
                                this.itemCfg = gm.data.config_data.getItemCfgByID(this._itemData.itemID);
                            }

                            if (this.itemCfg && itemConfig.type == this.itemCfg.type) {
                                this.lvl.string = this.itemCfg.number + "";
                            }

                        } else {
                            this.bgwhite.active = 2 == this._itemData.cellState &&
                                itemConfig.type != PropTypeEnum.WEAPON_TYPE &&
                                itemID == this._itemData.itemID &&
                                this.itemCfg && 0 < this.itemCfg.next;

                            if (this.bgwhite.active) {
                                this.node.getComponent(cc.Animation).play("item_Tishi");
                            }
                        }

                    } else if (currentItemType == ItemTypeEnum.HERO_TYPE && itemConfig.type == PropTypeEnum.WEAPON_TYPE) {
                        if (!this._heroCfg) {
                            this._heroCfg = gm.data.config_data.getHeroCfgByID(this._itemData.itemID);
                        }
                        for (let index = 0; index < this._heroCfg.nextNeedItem.length; index++)
                            if (0 < this._heroCfg.nextNeedItem[index] && this._heroCfg.nextNeedItem[index] == itemConfig.id) {
                                this.bgwhite.active = true;
                                this.node.getComponent(cc.Animation).play("item_Tishi");
                                break;
                            }
                    }
                }
            }
        }
    }

    private moveItemEndAnim(): void {
        this.node.getComponent(cc.Animation).stop();
        this.roleNode.parent.x = 0;
        this.roleNode.parent.y = 0;
        this.itemImg.node.parent.scale = 1;
        this.bgwhite.active = false;
        this.lvl.string = "";
    }

    private showAnimByMoveID(moveID: number, cellID: number): void {
        let itemConfig;
        if (cellID == this._itemData?.cellID) {
            this.node.children[0].active = false;
            this.lvl.string = "";
        } else {
            this.lvl.string = "";
            if (moveID > 15000 && moveID < 18000) {
                itemConfig = gm.data.config_data.getItemCfgByID(moveID);
                if (itemConfig) {
                    this.lvl.string = itemConfig.lv + "";
                    this.bgwhite.active = true;
                }
            }
        }
    }

    private playAddItemAnim(cellID: number): void {
        if (this._itemData?.cellID == cellID) {
            this.node.getComponent(cc.Animation).play("item_TongOpen");
        }
    }

    private hideAnimByMoveID(cellID: number): void {
        this.lvl.string = "";
        this.bgwhite.active = false;
        if (cellID == this._itemData?.cellID) {
            this.node.children[0].active = true;
        }
    }

    private hideNewAnim(cellID: number): void {
        if (this._itemData && this._itemData.cellID == cellID) {
            this.newItemNode.active = false;
        }
    }

    protected onDisable(): void {
        gm.ui.off("compose_anim", this.playAddItemAnim, this);
        this.clickNode?.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.clickNode?.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.clickNode?.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.clickNode?.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        gm.ui.off("item_move", this.on_move_item_move, this);
        gm.ui.off("item_move_end", this.on_move_item_hide, this);
        gm.ui.off("item_not_move_end", this.on_not_move_item_hide, this);
        gm.ui.off("updateWall", this.updateWall, this);
        gm.ui.off("updateDefenseHero", this.updateDefenseHero, this);
        gm.ui.off("set_item_battle_hero_operty", this.setBatterHeroOpacity, this);
        gm.ui.off("set_new_item_alpha", this.showIsNewItem, this);
        gm.ui.off("refresh_super_hero_color", this.refreshSuperHeroColor, this);
        gm.ui.off("close_new_anim", this.hideNewAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.openBarrelAnimEnd, this);
    }
}