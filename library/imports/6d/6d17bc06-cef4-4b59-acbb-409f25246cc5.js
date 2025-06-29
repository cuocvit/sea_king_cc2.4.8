"use strict";
cc._RF.push(module, '6d17bwGzvRLWay7QJ8lJGzF', 'MainMapItem');
// start-scene/scripts/MainMapItem.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var PropItem_1 = require("./PropItem"); // js
var BuildIconItem_1 = require("./BuildIconItem"); // js
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//
var MainMapItem = /** @class */ (function (_super) {
    __extends(MainMapItem, _super);
    // @
    function MainMapItem() {
        var _this = _super.call(this) || this;
        _this.landNode = null;
        _this.treeNode = null;
        _this.itemNum = null;
        _this.bg = null;
        _this.itemNode = null;
        _this.mapBuildNode = null;
        _this.lockImgNode = null;
        _this.lblIndex = null;
        _this.waterNode = null;
        _this.touchNode = null;
        _this.waveNode = null;
        _this.shuihua1 = null;
        _this.shuihua2 = null;
        _this._colorList = [
            cc.Color.WHITE, cc.Color.GREEN,
            cc.Color.ORANGE, cc.Color.YELLOW,
            cc.Color.RED, cc.Color.BLUE,
            cc.Color.BLACK, cc.Color.GRAY
        ];
        _this._mapItemCfg = null;
        _this._mapType = 1;
        _this._mapIndex = 1;
        _this._curIndex = 0;
        _this._isNextCell = false;
        _this._spine = null;
        return _this;
    }
    // @, !!! type
    MainMapItem.prototype.initData = function (item, number01, number02, isTrue) {
        var _this = this;
        if (isTrue === void 0) { isTrue = false; }
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
        Utils_1.Utils.async_set_sprite_frame(this.waterNode.getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/2003");
        if (23 == this._mapItemCfg.landImgID) {
            Utils_1.Utils.async_set_sprite_frame(this.waterNode.getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/yiban");
        }
        this.treeNode.active = 0 < this._mapItemCfg.plantID;
        if (this.treeNode.active) {
            var row = GameManager_1.gm.config.get_row_data("DecorateConfigData", this._mapItemCfg.plantID + "");
            this.treeNode.x = this._mapItemCfg.plantXOffset;
            this.treeNode.y = this._mapItemCfg.plantYOffset;
            this.treeNode.getComponent(cc.Sprite).spriteFrame = null;
            GameManager_1.gm.pool.put_children(this.treeNode);
            if (row) {
                if ("" != row.animID) {
                    if (0 == this.treeNode.childrenCount) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, row.animID, NodePoolItem_1.NodePoolItem, function (t) {
                            if (0 == _this.treeNode.childrenCount) {
                                _this.treeNode.addChild(t.node);
                            }
                        });
                    }
                }
                else {
                    Utils_1.Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/" + row.imgID);
                }
            }
        }
        this.waveNode.active = false;
        this.waterNode.active = false;
        var callDireCell = GameManager_1.gm.data.config_data.getCallDireCellID(this._mapItemCfg.cellID);
        for (var index = 0; index < callDireCell.length; index++) {
            if (1 == index || 2 == index) {
                if (-1 == callDireCell[index]) {
                    this.waveNode.active = true;
                    this.waterNode.active = true;
                    break;
                }
                if (!GameManager_1.gm.data.mapCell_data.role_map_data[callDireCell[index]]) {
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
    }; // end: initData
    // @ !!! (LIFE-CYCLE CALLBACKS)
    MainMapItem.prototype.onEnable = function () {
        if (186 == this._mapItemCfg.cellID) {
            this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onClickBuild, this);
        }
        if (1 == this._mapType) {
            this.node.children[0].y = this._mapItemCfg.landYOffset;
            Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/" + this._mapItemCfg.landImgID);
            this.showItemNode(true);
            var callDireCell = GameManager_1.gm.data.config_data.getCallDireCellID(this._mapItemCfg.cellID);
            this.waveNode.active = false;
            this.waterNode.active = false;
            for (var index = 0; index < callDireCell.length; index++) {
                if (1 == index || 2 == index) {
                    if (-1 == callDireCell[index]) {
                        this.waveNode.active = true;
                        this.waterNode.active = true;
                        break;
                    }
                    if (!GameManager_1.gm.data.mapCell_data.role_map_data[callDireCell[index]]) {
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
        }
        else if (3 == this._mapType) {
            Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/water");
            this.node.children[0].y = -24;
            this.waterNode.active = false;
            this.waveNode.active = false;
            this.playNormalUpAnim();
        }
        else if (4 == this._mapType) {
            Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/water");
            this.node.children[0].y = -24;
            this.waterNode.active = false;
            this.waveNode.active = false;
            this.playComposeUnderWaterAnim();
        }
        else if (2 == this._mapType) {
            Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/water");
            this.node.children[0].y = -24;
            this.waterNode.active = false;
            this.waveNode.active = false;
            this.showLockImgNode();
        }
    }; // end: onEnable
    // @ !!!
    MainMapItem.prototype.onClickBuild = function () {
        if (GameManager_1.gm.data.mapCell_data.isGuide || GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE] && 0 < GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE].buildLvl) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BUILDINFO.key, GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE].buildID);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BUILDINFO);
        }
    };
    // @ !!!!
    MainMapItem.prototype.setBuildImgOpacity = function (opacity) {
        if (0 < this.mapBuildNode.childrenCount) {
            this.mapBuildNode.children[0].getComponent(BuildIconItem_1.default).itemImg.node.opacity = opacity;
        }
    };
    // @ !!!
    MainMapItem.prototype.playScaleAnim = function () {
        if (this.mapBuildNode.childrenCount > 0) {
            this.mapBuildNode.children[0].getComponent(BuildIconItem_1.default).playScaleAnim();
        }
    };
    // @ !!!
    MainMapItem.prototype.stopScaleAnim = function () {
        if (this.mapBuildNode.childrenCount > 0) {
            this.mapBuildNode.children[0].getComponent(BuildIconItem_1.default).stopScaleAnim();
        }
    };
    // @ !!!
    MainMapItem.prototype.delItemNode = function () {
        if (this.itemNode.childrenCount > 0) {
            this.itemNode.removeAllChildren();
        }
    };
    // @ !!!
    MainMapItem.prototype.refreshItem = function () {
        var _this = this;
        this.lockImgNode.active = false;
        var roleMap = GameManager_1.gm.data.mapCell_data.role_map_data[this._mapItemCfg.cellID];
        if (GameManager_1.gm.data.mapCell_data.getIsUnlock(this._mapItemCfg.cellID)) {
            this.node.children[0].color = cc.Color.WHITE;
            this.node.opacity = 255;
            if (roleMap && 0 < roleMap.itemID) {
                var mainMap = GameManager_1.gm.ui.mapMainUI;
                if (mainMap) {
                    if (2 == roleMap.itemType) {
                        this.itemNode.removeAllChildren();
                        if (0 < this.mapBuildNode.childrenCount) {
                            this.mapBuildNode.opacity = 255;
                            this.mapBuildNode.children[0].getComponent(BuildIconItem_1.default).initData(roleMap);
                        }
                        else {
                            var instantiate = cc.instantiate(mainMap.buildItemPrefab);
                            instantiate.getComponent(BuildIconItem_1.default).initData(roleMap);
                            this.mapBuildNode.addChild(instantiate);
                        }
                    }
                    else {
                        this.mapBuildNode.removeAllChildren();
                        if (0 < this.itemNode.childrenCount) {
                            this.itemNode.children[0].getComponent(PropItem_1.default).initData(roleMap);
                        }
                        else {
                            var instantiate = cc.instantiate(mainMap.propItemPrefab);
                            instantiate.getComponent(PropItem_1.default).initData(roleMap);
                            this.itemNode.addChild(instantiate);
                        }
                    }
                }
            }
            else {
                this.itemNode.removeAllChildren();
                this.mapBuildNode.removeAllChildren();
                if (223 == this._mapItemCfg.cellID) {
                    if (0 == this.landNode.childrenCount) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/tree", NodePoolItem_1.NodePoolItem, function (t) {
                            if (0 == _this.landNode.childrenCount) {
                                _this.landNode.addChild(t.node);
                                t.node.x = 0;
                                t.node.y = -15;
                            }
                        });
                    }
                }
                else if (235 == this._mapItemCfg.cellID) {
                    if (0 == this.landNode.childrenCount) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/gui", NodePoolItem_1.NodePoolItem, function (t) {
                            if (0 == _this.landNode.childrenCount) {
                                _this.landNode.addChild(t.node);
                                t.node.scale = .5;
                                t.node.x = -15;
                                t.node.y = 0;
                                _this._spine = t.getComponent(sp.Skeleton);
                                _this._spine.setAnimation(0, "stay2", true);
                            }
                        });
                    }
                }
                else if (143 == this._mapItemCfg.cellID && 0 == this.landNode.childrenCount) {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/dongku", NodePoolItem_1.NodePoolItem, function (t) {
                        if (0 == _this.landNode.childrenCount) {
                            _this.landNode.addChild(t.node);
                            t.node.scale = 1;
                            t.node.x = 0;
                            t.node.y = 35;
                        }
                    });
                }
            }
        }
        else {
            this.showLockImgNode();
        }
    }; // end: refreshItem
    // @ type!!!!
    MainMapItem.prototype.playNormalUpAnim = function () {
        var _this = this;
        this.showLockImgNode();
        this.waterNode.active = false;
        this.waveNode.active = false;
        this.node.children[0].y = -65;
        this.node.children[0].opacity = 0;
        Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/water");
        this.node.children[0].runAction(cc.sequence(cc.delayTime(.05), cc.callFunc(function () {
            Utils_1.Utils.async_set_sprite_frame(_this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/water");
        }), cc.delayTime(.3 * this._mapIndex), cc.fadeIn(.1), cc.moveTo(.28, cc.v2(0, 9)), cc.callFunc(function () {
            Utils_1.Utils.async_set_sprite_frame(_this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/" + _this._mapItemCfg.landImgID);
            _this.shuihua1.resetSystem();
            _this.shuihua2.resetSystem();
            _this.waterNode.active = true;
            _this.waveNode.active = true;
            _this.lockImgNode.active = false;
            _this.treeNode.color = cc.Color.WHITE;
            _this.treeNode.opacity = 255;
            _this.refreshItem();
            _this._mapType = 1;
        }), cc.moveTo(.3, cc.v2(0, this._mapItemCfg.landYOffset)).easing(cc.easeQuadraticActionOut())));
    }; // end: playNormalUpAnim
    // @ type!!!!
    MainMapItem.prototype.playComposeUnderWaterAnim = function () {
        var _this = this;
        this.showLockImgNode();
        this.waterNode.active = false;
        this.waveNode.active = false;
        this.node.children[0].y = -65;
        this.node.children[0].opacity = 0;
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_88_GEZISHENG);
        this.node.children[0].getComponent(cc.Sprite).spriteFrame = null;
        Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/water");
        this.node.children[0].runAction(cc.sequence(cc.delayTime(.1), cc.delayTime(.2 * this._mapIndex), cc.fadeIn(.05), cc.moveTo(.1, cc.v2(0, 9)), cc.callFunc(function () {
            _this.waterNode.active = true;
            _this.waveNode.active = true;
            _this.node.children[0].opacity = 255;
            _this.lockImgNode.color = cc.Color.WHITE;
            _this.lockImgNode.opacity = 255;
            _this.treeNode.color = cc.Color.WHITE;
            _this.treeNode.opacity = 255;
        }), cc.moveTo(.25, cc.v2(0, 69)).easing(cc.easeQuadraticActionOut()), cc.moveTo(.28, cc.v2(0, 77)), cc.moveTo(.13, cc.v2(0, -1)), cc.callFunc(function () {
            _this.lockImgNode.color = cc.Color.WHITE.fromHEX("#00F0FF");
            _this.lockImgNode.opacity = 100;
            _this.treeNode.color = cc.Color.WHITE.fromHEX("#00F0FF");
            _this.treeNode.opacity = 100;
            _this.waterNode.active = false;
            _this.waveNode.active = false;
        }), cc.moveTo(.13, cc.v2(0, -21)), cc.moveTo(.14, cc.v2(0, 21)), cc.moveTo(.16, cc.v2(0, 6)), cc.callFunc(function () {
            _this.waterNode.active = false;
            _this.waveNode.active = false;
        }), cc.moveTo(.26, cc.v2(0, -30))));
    }; // end: playComposeUnderWaterAnim
    // @ type!!!!
    MainMapItem.prototype.playUnlockUpAnim = function () {
        var _this = this;
        this.refreshItem();
        this.node.children[0].runAction(cc.sequence(cc.moveTo(.1, cc.v2(0, 9)), cc.fadeOut(.05), cc.callFunc(function () {
            Utils_1.Utils.async_set_sprite_frame(_this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/" + _this._mapItemCfg.landImgID),
                _this.waterNode.active = true;
            _this.waveNode.active = true;
            _this.node.children[0].opacity = 255;
            _this.treeNode.color = cc.Color.WHITE;
            _this.treeNode.opacity = 255;
            _this._mapType = 1;
            _this.shuihua1.resetSystem();
            _this.shuihua2.resetSystem();
        }), cc.moveTo(.1, cc.v2(0, 69)).easing(cc.easeQuadraticActionOut()), cc.moveTo(.4, cc.v2(0, 77)), cc.moveTo(.2, cc.v2(0, -1)), cc.moveTo(.25, cc.v2(0, 21)), cc.moveTo(.25, cc.v2(0, 0)), cc.moveTo(.25, cc.v2(.1, this._mapItemCfg.landYOffset))));
    }; // end: playUnlockUpAnim
    // @ type!!!!
    MainMapItem.prototype.showItemNode = function (isRefresh) {
        if (isRefresh === void 0) { isRefresh = false; }
        this.lockImgNode.active = false;
        this.refreshItem();
        var roleMap = GameManager_1.gm.data.mapCell_data.role_map_data[this._mapItemCfg.cellID];
        if (GameManager_1.gm.data.mapCell_data.getIsUnlock(this._mapItemCfg.cellID)) {
            if (roleMap && 0 < roleMap.itemID) {
                if (GameManager_1.gm.ui.mapMainUI) {
                    if (2 == roleMap.itemType) {
                        this.mapBuildNode.opacity = 255;
                    }
                    else {
                        this.node.opacity = 255;
                    }
                }
            }
            else {
                this.node.opacity = 255;
                this.itemNode.removeAllChildren();
                this.mapBuildNode.removeAllChildren();
            }
        }
    }; // end: showItemNode
    // @ type!!!!
    MainMapItem.prototype.showLockImgNode = function () {
        this.lockImgNode.color = cc.Color.WHITE.fromHEX("#00F0FF");
        this.lockImgNode.opacity = 150;
        var mapCell = GameManager_1.gm.data.config_data.getMapCellCfgByID(this._mapItemCfg.cellID);
        if (mapCell && 0 < mapCell.itemType && 0 < mapCell.itemID) {
            this.lockImgNode.active = true;
            if (1 == mapCell.itemType) {
                var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(mapCell.itemID);
                if (itemCfg) {
                    this.lockImgNode.x = itemCfg.xoffset;
                    this.lockImgNode.y = itemCfg.offset + 48;
                }
            }
            else if (2 == mapCell.itemType) {
                var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(mapCell.itemID);
                if (buildCfg) {
                    this.lockImgNode.x = buildCfg.xoffset;
                    this.lockImgNode.y = buildCfg.offset + 48;
                }
            }
            else {
                this.lockImgNode.x = 0;
                this.lockImgNode.y = 48;
            }
            if (2 == mapCell.itemType) {
                Utils_1.Utils.async_set_sprite_frame(this.lockImgNode.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/build/" + mapCell.itemID);
                this.lockImgNode.scale = .6666667;
            }
            else {
                var itemID = 36001 == mapCell.itemID ? 18010 : mapCell.itemID;
                var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                if (itemCfg) {
                    Utils_1.Utils.async_set_sprite_frame(this.lockImgNode.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemCfg.icon);
                }
                this.lockImgNode.scale = 1;
            }
        }
    }; // end: showLockImgNode
    // @ type!!!!
    MainMapItem.prototype.playSameItemAnimEnd = function (event, itemId) {
        if (itemId === void 0) { itemId = 0; }
        var roleMap = GameManager_1.gm.data.mapCell_data.role_map_data[this._mapItemCfg.cellID];
        if (roleMap) {
            if (roleMap.cellID == itemId)
                return;
            if (this._mapItemCfg.itemType == Constants_1.PropTypeEnum.BARRIL_TYPE)
                return;
            if (GameManager_1.gm.data.mapCell_data.isGuide && roleMap.itemType == Constants_1.ItemTypeEnum.BUILD_TYPE)
                return;
        }
        if (0 != itemId && this.touchNode._hitTest(event) && !GameManager_1.gm.ui.mapMainUI.barrelNode._hitTest(event)) {
            if (186 == this._mapItemCfg.cellID) {
                if (GameManager_1.gm.data.mapCell_data.isGuide) {
                    return undefined;
                }
                else {
                    GameManager_1.gm.data.mapCell_data.changeCellData(itemId, 199);
                    if (!GameManager_1.gm.data.mapCell_data.isGuide) {
                        GameManager_1.gm.ui.emit("item_children_refresh", itemId);
                    }
                    return;
                }
            }
            else if (roleMap && 11006 != roleMap.itemID && itemId != roleMap.cellID) {
                GameManager_1.gm.data.mapCell_data.changeCellData(itemId, this._mapItemCfg.cellID);
                if (0 < this.itemNode.childrenCount && this.itemNode.children[0].getComponent(PropItem_1.default)) {
                    this.itemNode.children[0].getComponent(PropItem_1.default).newItemNode.active = false;
                }
                if (!GameManager_1.gm.data.mapCell_data.isGuide || roleMap.itemType != Constants_1.ItemTypeEnum.BUILD_TYPE) {
                    GameManager_1.gm.ui.emit("item_children_refresh", itemId);
                    this.showItemNode();
                    return true;
                }
                else {
                    return undefined;
                }
            }
        }
    }; // end: playSameItemAnimEnd
    // @ (LIFE-CYCLE CALLBACKS)
    MainMapItem.prototype.onDisable = function () {
        if (this._mapItemCfg.cellID == 186) {
            this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onClickBuild, this);
        }
    };
    // @
    MainMapItem.prototype.onClick = function () {
        this._curIndex++;
        if (this._curIndex >= this._colorList.length) {
            this._curIndex = 0;
        }
        this.bg.color = this._colorList[this._curIndex];
    };
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "landNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "treeNode", void 0);
    __decorate([
        property(cc.Label)
    ], MainMapItem.prototype, "itemNum", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "itemNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "mapBuildNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "lockImgNode", void 0);
    __decorate([
        property(cc.Label)
    ], MainMapItem.prototype, "lblIndex", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "waterNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "touchNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapItem.prototype, "waveNode", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], MainMapItem.prototype, "shuihua1", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], MainMapItem.prototype, "shuihua2", void 0);
    MainMapItem = __decorate([
        ccclass
    ], MainMapItem);
    return MainMapItem;
}(NodePoolItem_1.NodePoolItem));
exports.default = MainMapItem;

cc._RF.pop();