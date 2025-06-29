import { Utils } from './Utils';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { MapItemDataVO, BuildData } from "./MapCellCfgData"
import { BundleName, BuildTypeEnum, ItemTypeEnum, RewardIdEnum } from './Constants';
import { Build } from "../../common/configs/build";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildIconItem extends cc.Component {
    @property(cc.Sprite)
    public itemImg: cc.Sprite | null;

    @property([cc.SpriteFrame])
    private lockSpr: cc.SpriteFrame[] | null;

    @property(cc.Label)
    private lblLvl: cc.Label | null;

    @property(cc.Sprite)
    public buildStateIcon: cc.Sprite | null;

    @property(cc.Node)
    public productNode: cc.Node | null;

    @property([cc.SpriteFrame])
    private fullImg: cc.SpriteFrame[] | null;

    @property(cc.Node)
    private tanhao: cc.Node | null;

    @property(cc.Node)
    private clickNode: cc.Node | null;

    @property(cc.Node)
    private upgradeNode: cc.Node | null;

    @property(cc.Sprite)
    private upgradeNodeSpr: cc.Sprite | null;

    @property(cc.Node)
    private upgradeNodeBar: cc.Node | null;

    @property(cc.Label)
    private upgradeBarLbl: cc.Label | null;

    @property(cc.Node)
    private fullNode: cc.Node | null;

    private _isMove: boolean;
    private _parent: object;
    private _itemData: MapItemDataVO;
    private _buildData: BuildData;
    private _buildCfg: Build;
    private _beginTime: number;
    private _endTime: number;
    private _timeContiner: number;
    private _curTimer: number;

    private moveItemType: number;
    private lastNum: number;
    private fullTime: number;

    constructor() {
        super();
        this.itemImg = null;
        this.lockSpr = [];
        this.lblLvl = null;
        this.buildStateIcon = null;
        this.productNode = null;
        this.fullImg = [];
        this.tanhao = null;
        this.clickNode = null;
        this.upgradeNode = null;
        this.upgradeNodeSpr = null;
        this.upgradeNodeBar = null;
        this.upgradeBarLbl = null;
        this.fullNode = null;
        this._isMove = false;
        this._parent = null;
        this._itemData = null;
        this._buildData = null;
        this._buildCfg = null;
        this._beginTime = 0;
        this._endTime = 0;
        this._timeContiner = 0;
        this._curTimer = 0;
        this.moveItemType = 0;
        this.lastNum = 0;
        this.fullTime = 0;
    }

    // *
    public initData(itemData: MapItemDataVO): void {
        this._itemData = itemData;
        this._buildCfg = gm.data.config_data.getBuildCfgByID(this._itemData.itemID);
        if (this._buildCfg) {
            this.itemImg.node.x = this._buildCfg.xoffset;
            this.itemImg.node.y = this._buildCfg.offset;
            this._buildData = gm.data.mapCell_data.getBuildDataByType(this._buildCfg.buildType);
            this.lblLvl.string = "";
            this.buildStateIcon.node.active = false;
            this.productNode.active = false;

            if (this._buildData) {
                this.lblLvl.string = "" + this._buildData.buildLvl;
                if ("" == this._buildCfg.anim_name) {
                    const path = "res/build/" + this._buildCfg.model;
                    Utils.async_set_sprite_frame(this.itemImg, BundleName.MAP, path);
                    gm.pool.put_children(this.itemImg.node);
                } else {
                    this.itemImg.spriteFrame = null;
                    gm.pool.put_children(this.itemImg.node);
                    gm.pool.async_get(BundleName.MAP, "prefabs/" + this._buildCfg.anim_name, NodePoolItem, (t) => {
                        if (0 == this.itemImg.node.childrenCount) {
                            this.itemImg.node.addChild(t.node);
                            t.getComponent(sp.Skeleton).setAnimation(0, "stay", true);
                        }
                    });
                }
                this._beginTime = 0;
                this._endTime = 0;
                if (this._buildData.productData) {
                    this.showProductNode();
                }
            }

            if (this.tanhao) {
                this.tanhao.active = false;
            }
            if (this._buildCfg.buildType == BuildTypeEnum.STALL_TYPE) {
                this.setStallRed();
            }
            this.refreshUpgradeIcon();
        }
    }

    // *
    protected onEnable(): void {
        gm.ui.on("item_move", this.on_move_item_move, this);
        gm.ui.on("item_move_end", this.on_move_item_hide, this);
        gm.ui.on("item_move_hide_upgrade", this.hideUpgrade, this);
        gm.ui.on("build_metarail_change", this.refreshUpgrade, this);
        gm.ui.on("build_show_stateIcon", this.refreshUpgradeIcon, this);

        if (this._buildCfg.buildType == BuildTypeEnum.STALL_TYPE) {
            gm.ui.on("refresh_red_tips_stall", this.setStallRed, this);
            this.setStallRed();

        } else if (this._buildCfg?.buildType == BuildTypeEnum.TOWER_TYPE) {
            gm.ui.on("build_show_towerBuff", this.showDefenseIcon, this);
            this.showDefenseIcon();
        }

        this.clickNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.upgradeNode.active = false;
        this.fullNode.active = false;
    }

    // *
    private showDefenseIcon(): void {
        if (this._buildCfg?.buildType != BuildTypeEnum.TOWER_TYPE) return;
        if (gm.data.mapCell_data.getIsHeroTowerBuff()) {
            if (this.itemImg.node.childrenCount > 0 && this.itemImg?.node.getChildByName("passive_skill_3")) {
                return;
            }
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/passive_skill_3", NodePoolItem, (data) => {
                if (!data) return;
                if (this.itemImg?.node.childrenCount == 0) {
                    data.node.scale = 0.6;
                    this.itemImg.node.addChild(data.node);
                }
            });
        } else if (this.itemImg.node.childrenCount > 0 && this.itemImg?.node.getChildByName("passive_skill_3")) {
            for (let i = 0; i < this.itemImg.node.childrenCount; i++) {
                if (this.itemImg.node.children[i].name == "passive_skill_3") {
                    gm.pool.put(this.itemImg.node.children[i]);
                    break;
                }
            }
        }
    }

    // *
    private showProductNode(): void {
        if (this._buildData?.productData?.productID == 11006) return;
        const productData = this._buildData.productData;
        const currentTime = Math.floor(Date.now() / 1000);
        const productConfig = {
            11002: { animation: "supplies_gold", spriteFrame: this.fullImg[0] },
            16001: { animation: "supplies_wood", spriteFrame: this.fullImg[1] },
            17001: { animation: "supplies_mineral", spriteFrame: this.fullImg[2] },
            22001: { animation: "supplies_hun", spriteFrame: this.fullImg[3] },
        };
        this.productNode.active = false;

        if (currentTime >= productData.fullTime) {
            this._beginTime = 0;
            this._endTime = 0;
            this.productNode.active = true;
            this.productNode.children[0].active = false;
            this.productNode.children[1].active = true;

            const config = productConfig[productData.productID];
            this.productNode.children[1].children[1].getComponent(cc.Sprite).spriteFrame = config.spriteFrame;
            this.productNode.children[1].getComponent(cc.Animation).play();
        } else {
            if (currentTime >= this._buildData.productData.beginTime + this._buildData.productData.productCd || productData.curNum > 0) {
                this.productNode.active = true;
                this.productNode.children[0].active = true;
                this.productNode.children[1].active = false;
                const config = productConfig[productData.productID];
                this.productNode.children[0].getComponent(cc.Animation).play(config.animation);
            }
            this._beginTime = productData.beginTime;
            this._endTime = productData.fullTime;
            this._curTimer = currentTime;
        }
    }

    protected update(deltaTime: number): void {
        if (this._beginTime == 0 && this._endTime == 0) return;
        this._timeContiner += deltaTime;
        if (this._timeContiner < 1) return;
        this._timeContiner--;
        this._curTimer++;
        if (this._curTimer >= this._buildData.productData.fullTime) {
            this._curTimer = 0;
            this.showProductNode();
        }
        if (this._curTimer === this._beginTime + this._buildData.productData.productCd) {
            this.showProductNode();
        }
    }

    private on_move_item_move(event: cc.Vec2, itemType: ItemTypeEnum, itemID: number): void {
        if (!gm.data.mapCell_data.isGuide && itemType == ItemTypeEnum.ITEM_TYPE && !this.upgradeNode.active) {
            this.fullNode.active = false;
            this.upgradeNode.active = false;
            this.upgradeNodeBar.stopAllActions();
            if (2 == this._buildData.buildState) {
                const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig) {
                    for (var o in this._buildData.metrailData) {
                        if (itemConfig.type == parseInt(o)) {
                            if (1 <= this._buildData.metrailData[o].cur / this._buildData.metrailData[o].max) {
                                this.fullNode.active = true;
                            } else {
                                this.upgradeNode.active = true;
                            }

                            this.buildStateIcon.node.active = false;
                            this.moveItemType = itemConfig.type;

                            const metrailConfig = gm.data.config_data.getItemCfgByID(this._buildData.metrailData[o].id);
                            if (metrailConfig) {
                                Utils.async_set_sprite_frame(this.upgradeNodeSpr, BundleName.MAP, "res/" + metrailConfig.icon);
                            }
                            this.upgradeBarLbl.string = this._buildData.metrailData[o].cur + "/" + this._buildData.metrailData[o].max;
                            this.upgradeNodeBar.scaleX = this._buildData.metrailData[o].cur / this._buildData.metrailData[o].max;
                            this.lastNum = this._buildData.metrailData[o].cur;
                            return;
                        }
                    }
                    this.moveItemType = 0;
                }
            }
        }
    }

    private on_move_item_hide(event: cc.Vec2, itemType: number): void {
        if (this._buildData || 2 == this._buildData.buildState) {
            if (this._buildCfg.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                if (0 == itemType) {
                    return;
                }

                if (this.node._hitTest(event)) {
                    gm.data.mapCell_data.changeCellData(itemType, this._buildData.cellID);
                    if (gm.data.mapCell_data.isGuide) {
                        return;
                    }
                    gm.ui.emit("item_children_refresh", itemType);
                }
            }

            if (this.fullNode.active) {
                this.fullNode.active = false;
                this.refreshUpgradeIcon();
                return;
            }

            if (this.upgradeNode.active) {
                if (0 == itemType) {
                    this.upgradeNode.active = false;
                    void this.refreshUpgradeIcon();
                    return;
                }
                if (!this.node._hitTest(event)) {
                    this.upgradeNode.active = false;
                    void this.refreshUpgradeIcon();
                    return;
                }
                for (var a in this._buildData.metrailData) {
                    if (this.moveItemType == parseInt(a)) {
                        return;
                    }
                }
                this.upgradeNode.active = false;
                this.refreshUpgradeIcon();
            }
        }
    }

    private refreshUpgrade(buildID: number): void {
        if (!this.upgradeNode.active || buildID != this._buildCfg?.buildID) return;
        for (const key in this._buildData?.metrailData) {
            if (this.moveItemType == parseInt(key)) {
                const currentAmount = gm.data.mapCell_data.buildData[this._buildCfg.buildType].metrailData[key].cur;
                if (this.lastNum == currentAmount) {
                    this.upgradeNode.active = false;
                    this.buildStateIcon.node.active = true;
                } else {
                    gm.audio.play_effect(gm.const.AUDIO_165_PUT_PROP_INTO_BUILDING);
                    this.upgradeBarLbl.string = `${currentAmount}/${this._buildData.metrailData[key].max}`;
                    const scale = currentAmount / this._buildData.metrailData[key].max;
                    this.upgradeNodeBar?.runAction(cc.sequence(cc.scaleTo(0.3, scale, 1), cc.delayTime(0.55), cc.callFunc(() => {
                        this.upgradeNode.active = false;
                        this.refreshUpgradeIcon();
                    })));
                }
                return;
            }
        }
        this.upgradeNode.active = false;
        this.refreshUpgradeIcon();
    }

    private refreshUpgradeIcon(show: boolean = true): void {
        this.buildStateIcon.node.active = false;
        this.fullNode.active = false;
        if (!this._buildCfg) return;
        if (this._buildData.buildLvl > 0) {
            if (this._buildCfg.buildType == BuildTypeEnum.TOWER_TYPE) {
                if (gm.data.config_data.getBuildCfgByID(this._buildCfg.buildID + 1)) {
                    this.buildStateIcon.node.active = true;
                }
            } else {
                if (this._buildCfg.lock == gm.data.mapCell_data.role_build_lock_num) {
                    let canUpgrade = true;
                    for (let i = 0; i < this._buildCfg.consume.length; i++) {
                        if (this._buildData.metrailData[this._buildCfg.consume[i]] < this._buildCfg.num[i]) {
                            canUpgrade = false;
                            break;
                        }
                    }
                    this.buildStateIcon.node.active = true;
                    this.buildStateIcon.spriteFrame = canUpgrade ? this.lockSpr[1] : this.lockSpr[0];
                    return;
                }
                const towerData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE);
                if (this._buildData.buildLvl < towerData.buildLvl && gm.data.config_data.getBuildCfgByID(this._buildCfg.buildID + 1)) {
                    this.buildStateIcon.node.active = true;
                }
            }
        } else if (this._buildData?.buildLvl === 0 && gm.data.mapCell_data.role_map_data[this._buildCfg.activeCellID]) {
            const towerData = gm.data.mapCell_data.getBuildDataByType(this._buildCfg.buildType);
            if (this._buildData?.buildType === BuildTypeEnum.TOWER_TYPE && towerData.buildState === 2) {
                this.buildStateIcon.node.active = true;
            }
        }
    }

    private hideUpgrade(): void {
        if (this.fullNode.active) {
            this.fullNode.active = false;
            this.buildStateIcon.node.active = true;
            return;
        }
        if (this.upgradeNode.active) {
            this.upgradeNode.active = false;
            this.buildStateIcon.node.active = true;
        }
    }

    private setStallRed(): void {
        this.tanhao.active = this._buildData && this._buildData.buildLvl && gm.data.store_data.isFree;
    }

    private onTouchStart(): void {
        this._isMove = false;
        if (this._buildCfg.buildType != BuildTypeEnum.SEAGOINGBOAT_TYPE &&
            this._buildCfg.buildType != BuildTypeEnum.WHARFTAX_TYPE &&
            1 != gm.data.fight_temp_data.open_battle_panel_state) {
            if (!gm.data.mapCell_data.isGuide) {
                this._buildData.buildLvl;
            }
        }
    }

    private onTouchMove(event: cc.Touch): void {
        if (this._buildCfg.buildType != BuildTypeEnum.SEAGOINGBOAT_TYPE &&
            this._buildCfg.buildType != BuildTypeEnum.WHARFTAX_TYPE &&
            1 != gm.data.fight_temp_data.open_battle_panel_state) {

            if (!(gm.data.mapCell_data.isGuide || this._buildData.buildLvl < 1)) {
                this._isMove = true;
                if (0 < this.node.opacity) {
                    this.node.opacity = 0;
                }
                gm.ui.emit("item_move", event.getLocation(), this._itemData.itemType, this._itemData.itemID);
            }
        }
    }

    public playScaleAnim(): void {
        this.node.stopAllActions();
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.4, 0.75), cc.scaleTo(0.4, 0.95))));
    }

    public stopScaleAnim(): void {
        this.node.stopAllActions();
        this.node.scale = 1;
    }

    private onTouchEnd(): void {
        if (this._buildData.buildLvl < 1 || this._buildCfg.buildType != BuildTypeEnum.SEAGOINGBOAT_TYPE) {
            this.node.opacity = 255;
            gm.ui.mapMainUI.hideMoveBuildItemNode();
            this.onClickBuild();
        }
    }

    private onTouchCancel(event: cc.Touch): void {
        if (this._buildCfg.buildType != BuildTypeEnum.SEAGOINGBOAT_TYPE &&
            this._buildCfg.buildType != BuildTypeEnum.WHARFTAX_TYPE &&
            1 != gm.data.fight_temp_data.open_battle_panel_state) {

            if (!(gm.data.mapCell_data.isGuide || this._buildData.buildLvl < 1)) {
                this.node.opacity = 255;
                gm.ui.mapMainUI.hideMoveBuildItemNode();
                gm.ui.emit("item_move_end", event.getLocation(), this._itemData.cellID);
            }
        }
    }

    private onClickBuild(): void {
        if (this._buildCfg.buildLv <= 0 || gm.data.mapCell_data.isGuide) return;
        const buildActions = {
            [BuildTypeEnum.BARRACKS_TYPE]: () => gm.ui.async_show_module(gm.const.BARRACKS_LIST),
            [BuildTypeEnum.STALL_TYPE]: () => gm.ui.async_show_module(gm.const.Store),
            [BuildTypeEnum.GARRISION_TYPE]: () => gm.ui.async_show_module(gm.const.DEFENSE),
        };
        const action = buildActions[this._buildCfg.buildType];
        if (action) {
            action();
        } else {
            gm.ui.set_module_args(gm.const.BUILDINFO.key, this._buildCfg.buildID);
            gm.ui.async_show_module(gm.const.BUILDINFO);
        }
    }

    protected onClickShip(event: cc.Touch, shipID: string): void {
        const id = parseInt(shipID);
        gm.ui.set_module_args(gm.const.GOBATTLE.key, id);
        gm.ui.async_show_module(gm.const.GOBATTLE);
    }

    protected onClickItem(): void {
        this._buildCfg.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE && gm.data.mapCell_data.role_compose_total_times < 9 ||
            gm.ui.mapMainUI.showBuildUpgrade(this._buildData.buildID, this._buildData.cellID);
    }

    protected onClickCoin(): void {
        gm.data.mapCell_data.getBuildProduct(this._buildCfg.buildType);
        this.showProductNode();
        if (11002 == this._buildData.productData.productID) {
            gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.productNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
        }
    }

    protected onDisable(): void {
        this.clickNode?.targetOff(this);
        gm.ui.off("item_move", this.on_move_item_move, this);
        gm.ui.off("item_move_end", this.on_move_item_hide, this);
        gm.ui.off("item_move_hide_upgrade", this.hideUpgrade, this);
        gm.ui.off("build_metarail_change", this.refreshUpgrade, this);
        gm.ui.off("build_show_stateIcon", this.refreshUpgradeIcon, this);
        if (this._buildCfg?.buildType == BuildTypeEnum.STALL_TYPE) {
            gm.ui.off("refresh_red_tips_stall", this.setStallRed, this);
        } else if (this._buildCfg?.buildType == BuildTypeEnum.TOWER_TYPE) {
            gm.ui.off("build_show_towerBuff", this.showDefenseIcon, this);
        }
    }
}
