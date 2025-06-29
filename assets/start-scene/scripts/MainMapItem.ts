// @
import { Utils } from './Utils';
import { BundleName, BuildTypeEnum, PropTypeEnum, ItemTypeEnum } from './Constants';
import { gm } from './GameManager';
import PropItem from './PropItem'; // js
import BuildIconItem from './BuildIconItem'; // js
import { NodePoolItem } from './NodePoolItem';
import { DecorateConfig } from '../../common/configs/decorate';
import { MapCell } from '../../common/configs/mapcell';

const { ccclass, property } = cc._decorator;

//
@ccclass
export default class MainMapItem extends NodePoolItem {
    @property(cc.Node)
    private landNode: cc.Node = null;

    @property(cc.Node)
    private treeNode: cc.Node = null;

    @property(cc.Label)
    private itemNum: cc.Label = null;

    @property(cc.Node)
    private bg: cc.Node = null;

    @property(cc.Node)
    public itemNode: cc.Node = null;

    @property(cc.Node)
    public mapBuildNode: cc.Node = null;

    @property(cc.Node)
    private lockImgNode: cc.Node = null;

    @property(cc.Label)
    private lblIndex: cc.Label = null;

    @property(cc.Node)
    private waterNode: cc.Node = null;

    @property(cc.Node)
    public touchNode: cc.Node = null;

    @property(cc.Node)
    private waveNode: cc.Node = null;

    @property(cc.ParticleSystem)
    private shuihua1: cc.ParticleSystem = null;

    @property(cc.ParticleSystem)
    private shuihua2: cc.ParticleSystem = null;

    // private
    private readonly _colorList: cc.Color[];
    private _mapItemCfg: MapCell;
    private _mapType: number;
    private _mapIndex: number;
    private _curIndex: number;
    private _isNextCell: boolean;
    private _spine: sp.Skeleton;

    // @
    constructor() {
        super();
        this._colorList = [
            cc.Color.WHITE, cc.Color.GREEN,
            cc.Color.ORANGE, cc.Color.YELLOW,
            cc.Color.RED, cc.Color.BLUE,
            cc.Color.BLACK, cc.Color.GRAY
        ];
        this._mapItemCfg = null;
        this._mapType = 1;
        this._mapIndex = 1;
        this._curIndex = 0;
        this._isNextCell = false;
        this._spine = null;
    }

    // @, !!! type
    public initData(item: MapCell, number01: number, number02: number, isTrue: boolean = false): void {
        this._isNextCell = isTrue;
        this._mapItemCfg = item;
        this._mapType = number01;
        this._mapIndex = number02;
        this.lblIndex.string = "";
        this.itemNum.string = "";
        this.waterNode.active = true;
        this.waveNode.active = true;
        this.node.name = this._mapItemCfg.cellID + "";
        this.node.zIndex = this._mapItemCfg.cellID;
        Utils.async_set_sprite_frame(this.waterNode.getComponent(cc.Sprite), BundleName.TEST, "res/2003");

        if (23 == this._mapItemCfg.landImgID) {
            Utils.async_set_sprite_frame(this.waterNode.getComponent(cc.Sprite), BundleName.TEST, "res/yiban");
        }

        this.treeNode.active = 0 < this._mapItemCfg.plantID;
        if (this.treeNode.active) {
            const row = gm.config.get_row_data("DecorateConfigData", this._mapItemCfg.plantID + "") as DecorateConfig;
            this.treeNode.x = this._mapItemCfg.plantXOffset;
            this.treeNode.y = this._mapItemCfg.plantYOffset;
            this.treeNode.getComponent(cc.Sprite).spriteFrame = null;
            gm.pool.put_children(this.treeNode);
            if (row) {
                if ("" != row.animID) {
                    if (0 == this.treeNode.childrenCount) {
                        gm.pool.async_get(BundleName.MAP, row.animID, NodePoolItem, (t) => {
                            if (0 == this.treeNode.childrenCount) {
                                this.treeNode.addChild(t.node);
                            }
                        })
                    }
                } else {
                    Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), BundleName.TEST, "res/" + row.imgID);
                }
            }
        }
        this.waveNode.active = false;
        this.waterNode.active = false;

        const callDireCell = gm.data.config_data.getCallDireCellID(this._mapItemCfg.cellID);
        for (let index = 0; index < callDireCell.length; index++) {
            if (1 == index || 2 == index) {
                if (-1 == callDireCell[index]) {
                    this.waveNode.active = true;
                    this.waterNode.active = true;
                    break;
                }
                if (!gm.data.mapCell_data.role_map_data[callDireCell[index]]) {
                    this.waveNode.active = true;
                    this.waterNode.active = true;
                    break;
                }
            }
        }

        if (198 == this._mapItemCfg.cellID) {
            this.waveNode.active = true;
            this.waterNode.active = true;
        }

        this.itemNode.removeAllChildren();
        this.mapBuildNode.removeAllChildren();
    } // end: initData

    // @ !!! (LIFE-CYCLE CALLBACKS)
    protected onEnable(): void {
        if (186 == this._mapItemCfg.cellID) {
            this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onClickBuild, this);
        }

        if (1 == this._mapType) {
            this.node.children[0].y = this._mapItemCfg.landYOffset;
            Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/" + this._mapItemCfg.landImgID);
            this.showItemNode(true);

            const callDireCell = gm.data.config_data.getCallDireCellID(this._mapItemCfg.cellID);
            this.waveNode.active = false;
            this.waterNode.active = false;

            for (let index = 0; index < callDireCell.length; index++) {
                if (1 == index || 2 == index) {
                    if (-1 == callDireCell[index]) {
                        this.waveNode.active = true;
                        this.waterNode.active = true;
                        break;
                    }
                    if (!gm.data.mapCell_data.role_map_data[callDireCell[index]]) {
                        this.waveNode.active = true;
                        this.waterNode.active = true;
                        break;
                    }
                }
            }

            if (198 == this._mapItemCfg.cellID) {
                this.waveNode.active = true;
                this.waterNode.active = true;
            }

        } else if (3 == this._mapType) {
            Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/water");
            this.node.children[0].y = -24;
            this.waterNode.active = false;
            this.waveNode.active = false;
            this.playNormalUpAnim();

        } else if (4 == this._mapType) {
            Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/water");
            this.node.children[0].y = -24;
            this.waterNode.active = false;
            this.waveNode.active = false;
            this.playComposeUnderWaterAnim();

        } else if (2 == this._mapType) {
            Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/water");
            this.node.children[0].y = -24;
            this.waterNode.active = false;
            this.waveNode.active = false;
            this.showLockImgNode();
        }
    } // end: onEnable

    // @ !!!
    private onClickBuild(): void {
        if (gm.data.mapCell_data.isGuide || gm.data.mapCell_data.buildData[BuildTypeEnum.WHARFTAX_TYPE] && 0 < gm.data.mapCell_data.buildData[BuildTypeEnum.WHARFTAX_TYPE].buildLvl) {
            gm.ui.set_module_args(gm.const.BUILDINFO.key, gm.data.mapCell_data.buildData[BuildTypeEnum.WHARFTAX_TYPE].buildID);
            gm.ui.async_show_module(gm.const.BUILDINFO);
        }
    }

    // @ !!!!
    public setBuildImgOpacity(opacity: number): void {
        if (0 < this.mapBuildNode.childrenCount) {
            this.mapBuildNode.children[0].getComponent(BuildIconItem).itemImg.node.opacity = opacity;
        }
    }

    // @ !!!
    public playScaleAnim(): void {
        if (this.mapBuildNode.childrenCount > 0) {
            this.mapBuildNode.children[0].getComponent(BuildIconItem).playScaleAnim();
        }
    }

    // @ !!!
    private stopScaleAnim(): void {
        if (this.mapBuildNode.childrenCount > 0) {
            this.mapBuildNode.children[0].getComponent(BuildIconItem).stopScaleAnim();
        }
    }

    // @ !!!
    public delItemNode(): void {
        if (this.itemNode.childrenCount > 0) {
            this.itemNode.removeAllChildren();
        }
    }

    // @ !!!
    public refreshItem(): void {
        this.lockImgNode.active = false;
        const roleMap = gm.data.mapCell_data.role_map_data[this._mapItemCfg.cellID];

        if (gm.data.mapCell_data.getIsUnlock(this._mapItemCfg.cellID)) {
            this.node.children[0].color = cc.Color.WHITE;
            this.node.opacity = 255;
            if (roleMap && 0 < roleMap.itemID) {
                const mainMap = gm.ui.mapMainUI;
                if (mainMap) {
                    if (2 == roleMap.itemType) {
                        this.itemNode.removeAllChildren();
                        if (0 < this.mapBuildNode.childrenCount) {
                            this.mapBuildNode.opacity = 255;
                            this.mapBuildNode.children[0].getComponent(BuildIconItem).initData(roleMap);
                        } else {
                            const instantiate = cc.instantiate(mainMap.buildItemPrefab)
                            instantiate.getComponent(BuildIconItem).initData(roleMap);
                            this.mapBuildNode.addChild(instantiate);
                        }
                    } else {
                        this.mapBuildNode.removeAllChildren();
                        if (0 < this.itemNode.childrenCount) {
                            this.itemNode.children[0].getComponent(PropItem).initData(roleMap);
                        } else {
                            const instantiate = cc.instantiate(mainMap.propItemPrefab);
                            instantiate.getComponent(PropItem).initData(roleMap);
                            this.itemNode.addChild(instantiate);
                        }
                    }
                }
            } else {
                this.itemNode.removeAllChildren();
                this.mapBuildNode.removeAllChildren();
                if (223 == this._mapItemCfg.cellID) {
                    if (0 == this.landNode.childrenCount) {
                        gm.pool.async_get(BundleName.MAP, "prefabs/tree", NodePoolItem, (t) => {
                            if (0 == this.landNode.childrenCount) {
                                this.landNode.addChild(t.node);
                                t.node.x = 0;
                                t.node.y = -15;
                            }
                        });
                    }
                } else if (235 == this._mapItemCfg.cellID) {
                    if (0 == this.landNode.childrenCount) {
                        gm.pool.async_get(BundleName.MAP, "prefabs/gui", NodePoolItem, (t) => {
                            if (0 == this.landNode.childrenCount) {
                                this.landNode.addChild(t.node);
                                t.node.scale = .5;
                                t.node.x = -15;
                                t.node.y = 0;
                                this._spine = t.getComponent(sp.Skeleton);
                                this._spine.setAnimation(0, "stay2", true);
                            }
                        });
                    }
                } else if (143 == this._mapItemCfg.cellID && 0 == this.landNode.childrenCount) {
                    gm.pool.async_get(BundleName.MAP, "prefabs/dongku", NodePoolItem, (t) => {
                        if (0 == this.landNode.childrenCount) {
                            this.landNode.addChild(t.node);
                            t.node.scale = 1;
                            t.node.x = 0;
                            t.node.y = 35;
                        }
                    })
                }
            }
        } else {
            this.showLockImgNode();
        }
    } // end: refreshItem

    // @ type!!!!
    private playNormalUpAnim(): void {
        this.showLockImgNode();
        this.waterNode.active = false;
        this.waveNode.active = false;
        this.node.children[0].y = -65;
        this.node.children[0].opacity = 0;

        Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/water");

        this.node.children[0].runAction(
            cc.sequence(cc.delayTime(.05), cc.callFunc(() => {
                Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/water");
            }),
                cc.delayTime(.3 * this._mapIndex),
                cc.fadeIn(.1),
                cc.moveTo(.28, cc.v2(0, 9)),
                cc.callFunc(() => {
                    Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/" + this._mapItemCfg.landImgID);
                    this.shuihua1.resetSystem();
                    this.shuihua2.resetSystem();
                    this.waterNode.active = true;
                    this.waveNode.active = true;
                    this.lockImgNode.active = false;
                    this.treeNode.color = cc.Color.WHITE;
                    this.treeNode.opacity = 255;
                    this.refreshItem();
                    this._mapType = 1;
                }),
                cc.moveTo(.3, cc.v2(0, this._mapItemCfg.landYOffset)).easing(cc.easeQuadraticActionOut())))
    } // end: playNormalUpAnim

    // @ type!!!!
    private playComposeUnderWaterAnim(): void {
        this.showLockImgNode();
        this.waterNode.active = false;
        this.waveNode.active = false;
        this.node.children[0].y = -65;
        this.node.children[0].opacity = 0;
        gm.audio.play_effect(gm.const.AUDIO_88_GEZISHENG);
        this.node.children[0].getComponent(cc.Sprite).spriteFrame = null;

        Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/water");
        this.node.children[0].runAction(cc.sequence(cc.delayTime(.1), cc.delayTime(.2 * this._mapIndex), cc.fadeIn(.05), cc.moveTo(.1, cc.v2(0, 9)), cc.callFunc(() => {
            this.waterNode.active = true;
            this.waveNode.active = true;
            this.node.children[0].opacity = 255;
            this.lockImgNode.color = cc.Color.WHITE;
            this.lockImgNode.opacity = 255;
            this.treeNode.color = cc.Color.WHITE;
            this.treeNode.opacity = 255;
        }), cc.moveTo(.25, cc.v2(0, 69)).easing(cc.easeQuadraticActionOut()), cc.moveTo(.28, cc.v2(0, 77)), cc.moveTo(.13, cc.v2(0, -1)), cc.callFunc(() => {
            this.lockImgNode.color = cc.Color.WHITE.fromHEX("#00F0FF");
            this.lockImgNode.opacity = 100;
            this.treeNode.color = cc.Color.WHITE.fromHEX("#00F0FF");
            this.treeNode.opacity = 100;
            this.waterNode.active = false;
            this.waveNode.active = false;
        }), cc.moveTo(.13, cc.v2(0, -21)), cc.moveTo(.14, cc.v2(0, 21)), cc.moveTo(.16, cc.v2(0, 6)), cc.callFunc(() => {
            this.waterNode.active = false;
            this.waveNode.active = false;
        }), cc.moveTo(.26, cc.v2(0, -30))))
    } // end: playComposeUnderWaterAnim

    // @ type!!!!
    public playUnlockUpAnim(): void {
        this.refreshItem();
        this.node.children[0].runAction(cc.sequence(cc.moveTo(.1, cc.v2(0, 9)), cc.fadeOut(.05), cc.callFunc(() => {
            Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), BundleName.TEST, "res/" + this._mapItemCfg.landImgID),
                this.waterNode.active = true;
            this.waveNode.active = true;
            this.node.children[0].opacity = 255;
            this.treeNode.color = cc.Color.WHITE;
            this.treeNode.opacity = 255;
            this._mapType = 1;
            this.shuihua1.resetSystem();
            this.shuihua2.resetSystem();
        }),
            cc.moveTo(.1, cc.v2(0, 69)).easing(cc.easeQuadraticActionOut()),
            cc.moveTo(.4, cc.v2(0, 77)), cc.moveTo(.2, cc.v2(0, -1)),
            cc.moveTo(.25, cc.v2(0, 21)), cc.moveTo(.25, cc.v2(0, 0)),
            cc.moveTo(.25, cc.v2(.1, this._mapItemCfg.landYOffset))))
    } // end: playUnlockUpAnim

    // @ type!!!!
    public showItemNode(isRefresh: boolean = false): void {
        this.lockImgNode.active = false;
        this.refreshItem();
        const roleMap = gm.data.mapCell_data.role_map_data[this._mapItemCfg.cellID];
        if (gm.data.mapCell_data.getIsUnlock(this._mapItemCfg.cellID)) {
            if (roleMap && 0 < roleMap.itemID) {
                if (gm.ui.mapMainUI) {
                    if (2 == roleMap.itemType) {
                        this.mapBuildNode.opacity = 255;
                    } else {
                        this.node.opacity = 255;
                    }
                }
            } else {
                this.node.opacity = 255;
                this.itemNode.removeAllChildren();
                this.mapBuildNode.removeAllChildren();
            }
        }
    } // end: showItemNode

    // @ type!!!!
    private showLockImgNode(): void {
        this.lockImgNode.color = cc.Color.WHITE.fromHEX("#00F0FF");
        this.lockImgNode.opacity = 150;

        const mapCell = gm.data.config_data.getMapCellCfgByID(this._mapItemCfg.cellID);
        if (mapCell && 0 < mapCell.itemType && 0 < mapCell.itemID) {
            this.lockImgNode.active = true;
            if (1 == mapCell.itemType) {
                const itemCfg = gm.data.config_data.getItemCfgByID(mapCell.itemID);
                if (itemCfg) {
                    this.lockImgNode.x = itemCfg.xoffset;
                    this.lockImgNode.y = itemCfg.offset + 48;
                }
            } else if (2 == mapCell.itemType) {
                const buildCfg = gm.data.config_data.getBuildCfgByID(mapCell.itemID);
                if (buildCfg) {
                    this.lockImgNode.x = buildCfg.xoffset;
                    this.lockImgNode.y = buildCfg.offset + 48;
                }
            } else {
                this.lockImgNode.x = 0;
                this.lockImgNode.y = 48;
            }

            if (2 == mapCell.itemType) {
                Utils.async_set_sprite_frame(this.lockImgNode.getComponent(cc.Sprite), BundleName.MAP, "res/build/" + mapCell.itemID);
                this.lockImgNode.scale = .6666667
            } else {
                const itemID = 36001 == mapCell.itemID ? 18010 : mapCell.itemID;
                const itemCfg = gm.data.config_data.getItemCfgByID(itemID);
                if (itemCfg) {
                    Utils.async_set_sprite_frame(this.lockImgNode.getComponent(cc.Sprite), BundleName.MAP, "res/" + itemCfg.icon);
                }
                this.lockImgNode.scale = 1;
            }
        }
    } // end: showLockImgNode

    // @ type!!!!
    public playSameItemAnimEnd(event: cc.Vec2, itemId: number = 0): boolean | void {
        const roleMap = gm.data.mapCell_data.role_map_data[this._mapItemCfg.cellID];
        if (roleMap) {
            if (roleMap.cellID == itemId) return;
            if (this._mapItemCfg.itemType == PropTypeEnum.BARRIL_TYPE) return;
            if (gm.data.mapCell_data.isGuide && roleMap.itemType == ItemTypeEnum.BUILD_TYPE) return;
        }

        if (0 != itemId && this.touchNode._hitTest(event) && !gm.ui.mapMainUI.barrelNode._hitTest(event)) {
            if (186 == this._mapItemCfg.cellID) {
                if (gm.data.mapCell_data.isGuide) {
                    return undefined;
                } else {
                    gm.data.mapCell_data.changeCellData(itemId, 199);
                    if (!gm.data.mapCell_data.isGuide) {
                        gm.ui.emit("item_children_refresh", itemId);
                    }
                    return;
                }

            } else if (roleMap && 11006 != roleMap.itemID && itemId != roleMap.cellID) {
                gm.data.mapCell_data.changeCellData(itemId, this._mapItemCfg.cellID);
                if (0 < this.itemNode.childrenCount && this.itemNode.children[0].getComponent(PropItem)) {
                    this.itemNode.children[0].getComponent(PropItem).newItemNode.active = false;
                }

                if (!gm.data.mapCell_data.isGuide || roleMap.itemType != ItemTypeEnum.BUILD_TYPE) {
                    gm.ui.emit("item_children_refresh", itemId);
                    this.showItemNode();
                    return true;

                } else {
                    return undefined;
                }
            }
        }
    } // end: playSameItemAnimEnd

    // @ (LIFE-CYCLE CALLBACKS)
    protected onDisable(): void {
        if (this._mapItemCfg.cellID == 186) {
            this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onClickBuild, this);
        }
    }

    // @
    private onClick(): void {
        this._curIndex++;
        if (this._curIndex >= this._colorList.length) {
            this._curIndex = 0;
        }
        this.bg.color = this._colorList[this._curIndex];
    }
}
