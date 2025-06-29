
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MainMapItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1haW5NYXBJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUk7QUFDSixpQ0FBZ0M7QUFDaEMseUNBQW9GO0FBQ3BGLDZDQUFtQztBQUNuQyx1Q0FBa0MsQ0FBQyxLQUFLO0FBQ3hDLGlEQUE0QyxDQUFDLEtBQUs7QUFDbEQsK0NBQThDO0FBSXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLEVBQUU7QUFFRjtJQUF5QywrQkFBWTtJQWlEakQsSUFBSTtJQUNKO1FBQUEsWUFDSSxpQkFBTyxTQWFWO1FBOURPLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFHcEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGNBQVEsR0FBc0IsSUFBSSxDQUFDO1FBR25DLGNBQVEsR0FBc0IsSUFBSSxDQUFDO1FBY3ZDLEtBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDOUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVB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QUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUMxSSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDNUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdEcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUMs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QyxJQUFJLENBQUM7cURBQ2tCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2tCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDZ0I7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUM7aURBQ2U7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQztpREFDZTtJQXRDMUIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQW9mL0I7SUFBRCxrQkFBQztDQXBmRCxBQW9mQyxDQXBmd0MsMkJBQVksR0FvZnBEO2tCQXBmb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgQnVpbGRUeXBlRW51bSwgUHJvcFR5cGVFbnVtLCBJdGVtVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCBQcm9wSXRlbSBmcm9tICcuL1Byb3BJdGVtJzsgLy8ganNcclxuaW1wb3J0IEJ1aWxkSWNvbkl0ZW0gZnJvbSAnLi9CdWlsZEljb25JdGVtJzsgLy8ganNcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBEZWNvcmF0ZUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2RlY29yYXRlJztcclxuaW1wb3J0IHsgTWFwQ2VsbCB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL21hcGNlbGwnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8vXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5NYXBJdGVtIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsYW5kTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHRyZWVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGl0ZW1OdW06IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmc6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIGl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBtYXBCdWlsZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsb2NrSW1nTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxJbmRleDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB3YXRlck5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIHRvdWNoTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHdhdmVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUGFydGljbGVTeXN0ZW0pXHJcbiAgICBwcml2YXRlIHNodWlodWExOiBjYy5QYXJ0aWNsZVN5c3RlbSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlBhcnRpY2xlU3lzdGVtKVxyXG4gICAgcHJpdmF0ZSBzaHVpaHVhMjogY2MuUGFydGljbGVTeXN0ZW0gPSBudWxsO1xyXG5cclxuICAgIC8vIHByaXZhdGVcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbG9yTGlzdDogY2MuQ29sb3JbXTtcclxuICAgIHByaXZhdGUgX21hcEl0ZW1DZmc6IE1hcENlbGw7XHJcbiAgICBwcml2YXRlIF9tYXBUeXBlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXBJbmRleDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY3VySW5kZXg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2lzTmV4dENlbGw6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9zcGluZTogc3AuU2tlbGV0b247XHJcblxyXG4gICAgLy8gQFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9jb2xvckxpc3QgPSBbXHJcbiAgICAgICAgICAgIGNjLkNvbG9yLldISVRFLCBjYy5Db2xvci5HUkVFTixcclxuICAgICAgICAgICAgY2MuQ29sb3IuT1JBTkdFLCBjYy5Db2xvci5ZRUxMT1csXHJcbiAgICAgICAgICAgIGNjLkNvbG9yLlJFRCwgY2MuQ29sb3IuQkxVRSxcclxuICAgICAgICAgICAgY2MuQ29sb3IuQkxBQ0ssIGNjLkNvbG9yLkdSQVlcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW1DZmcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX21hcFR5cGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX21hcEluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLl9jdXJJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5faXNOZXh0Q2VsbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwaW5lID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBALCAhISEgdHlwZVxyXG4gICAgcHVibGljIGluaXREYXRhKGl0ZW06IE1hcENlbGwsIG51bWJlcjAxOiBudW1iZXIsIG51bWJlcjAyOiBudW1iZXIsIGlzVHJ1ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNOZXh0Q2VsbCA9IGlzVHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXBJdGVtQ2ZnID0gaXRlbTtcclxuICAgICAgICB0aGlzLl9tYXBUeXBlID0gbnVtYmVyMDE7XHJcbiAgICAgICAgdGhpcy5fbWFwSW5kZXggPSBudW1iZXIwMjtcclxuICAgICAgICB0aGlzLmxibEluZGV4LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5pdGVtTnVtLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLm5hbWUgPSB0aGlzLl9tYXBJdGVtQ2ZnLmNlbGxJRCArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy53YXRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvMjAwM1wiKTtcclxuXHJcbiAgICAgICAgaWYgKDIzID09IHRoaXMuX21hcEl0ZW1DZmcubGFuZEltZ0lEKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy53YXRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMveWliYW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRyZWVOb2RlLmFjdGl2ZSA9IDAgPCB0aGlzLl9tYXBJdGVtQ2ZnLnBsYW50SUQ7XHJcbiAgICAgICAgaWYgKHRoaXMudHJlZU5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJEZWNvcmF0ZUNvbmZpZ0RhdGFcIiwgdGhpcy5fbWFwSXRlbUNmZy5wbGFudElEICsgXCJcIikgYXMgRGVjb3JhdGVDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZU5vZGUueCA9IHRoaXMuX21hcEl0ZW1DZmcucGxhbnRYT2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLnkgPSB0aGlzLl9tYXBJdGVtQ2ZnLnBsYW50WU9mZnNldDtcclxuICAgICAgICAgICAgdGhpcy50cmVlTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMudHJlZU5vZGUpO1xyXG4gICAgICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPSByb3cuYW5pbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy50cmVlTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuTUFQLCByb3cuYW5pbUlELCBOb2RlUG9vbEl0ZW0sICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLnRyZWVOb2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmFkZENoaWxkKHQubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMudHJlZU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvXCIgKyByb3cuaW1nSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2F2ZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbGxEaXJlQ2VsbCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0Q2FsbERpcmVDZWxsSUQodGhpcy5fbWFwSXRlbUNmZy5jZWxsSUQpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjYWxsRGlyZUNlbGwubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICgxID09IGluZGV4IHx8IDIgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgtMSA9PSBjYWxsRGlyZUNlbGxbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbY2FsbERpcmVDZWxsW2luZGV4XV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKDE5OCA9PSB0aGlzLl9tYXBJdGVtQ2ZnLmNlbGxJRCkge1xyXG4gICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLml0ZW1Ob2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5tYXBCdWlsZE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgIH0gLy8gZW5kOiBpbml0RGF0YVxyXG5cclxuICAgIC8vIEAgISEhIChMSUZFLUNZQ0xFIENBTExCQUNLUylcclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoMTg2ID09IHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNsaWNrQnVpbGQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKDEgPT0gdGhpcy5fbWFwVHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSA9IHRoaXMuX21hcEl0ZW1DZmcubGFuZFlPZmZzZXQ7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLlRFU1QsIFwicmVzL1wiICsgdGhpcy5fbWFwSXRlbUNmZy5sYW5kSW1nSUQpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dJdGVtTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxEaXJlQ2VsbCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0Q2FsbERpcmVDZWxsSUQodGhpcy5fbWFwSXRlbUNmZy5jZWxsSUQpO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndhdGVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjYWxsRGlyZUNlbGwubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoMSA9PSBpbmRleCB8fCAyID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0xID09IGNhbGxEaXJlQ2VsbFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW2NhbGxEaXJlQ2VsbFtpbmRleF1dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F2ZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoMTk4ID09IHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhdGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoMyA9PSB0aGlzLl9tYXBUeXBlKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLlRFU1QsIFwicmVzL3dhdGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSA9IC0yNDtcclxuICAgICAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMud2F2ZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5vcm1hbFVwQW5pbSgpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKDQgPT0gdGhpcy5fbWFwVHlwZSkge1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5URVNULCBcInJlcy93YXRlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLnkgPSAtMjQ7XHJcbiAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlDb21wb3NlVW5kZXJXYXRlckFuaW0oKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgyID09IHRoaXMuX21hcFR5cGUpIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvd2F0ZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS55ID0gLTI0O1xyXG4gICAgICAgICAgICB0aGlzLndhdGVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy53YXZlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93TG9ja0ltZ05vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGVuZDogb25FbmFibGVcclxuXHJcbiAgICAvLyBAICEhIVxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQnVpbGQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgfHwgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRV0gJiYgMCA8IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEVdLmJ1aWxkTHZsKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5CVUlMRElORk8ua2V5LCBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFXS5idWlsZElEKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuQlVJTERJTkZPKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAhISEhXHJcbiAgICBwdWJsaWMgc2V0QnVpbGRJbWdPcGFjaXR5KG9wYWNpdHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICgwIDwgdGhpcy5tYXBCdWlsZE5vZGUuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcEJ1aWxkTm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoQnVpbGRJY29uSXRlbSkuaXRlbUltZy5ub2RlLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAICEhIVxyXG4gICAgcHVibGljIHBsYXlTY2FsZUFuaW0oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwQnVpbGROb2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQnVpbGROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChCdWlsZEljb25JdGVtKS5wbGF5U2NhbGVBbmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEAgISEhXHJcbiAgICBwcml2YXRlIHN0b3BTY2FsZUFuaW0oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwQnVpbGROb2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQnVpbGROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChCdWlsZEljb25JdGVtKS5zdG9wU2NhbGVBbmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEAgISEhXHJcbiAgICBwdWJsaWMgZGVsSXRlbU5vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbU5vZGUuY2hpbGRyZW5Db3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAICEhIVxyXG4gICAgcHVibGljIHJlZnJlc2hJdGVtKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9ja0ltZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgcm9sZU1hcCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbdGhpcy5fbWFwSXRlbUNmZy5jZWxsSURdO1xyXG5cclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SXNVbmxvY2sodGhpcy5fbWFwSXRlbUNmZy5jZWxsSUQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgaWYgKHJvbGVNYXAgJiYgMCA8IHJvbGVNYXAuaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYWluTWFwID0gZ20udWkubWFwTWFpblVJO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1haW5NYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMiA9PSByb2xlTWFwLml0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCB0aGlzLm1hcEJ1aWxkTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEJ1aWxkTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBCdWlsZE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KEJ1aWxkSWNvbkl0ZW0pLmluaXREYXRhKHJvbGVNYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFudGlhdGUgPSBjYy5pbnN0YW50aWF0ZShtYWluTWFwLmJ1aWxkSXRlbVByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlLmdldENvbXBvbmVudChCdWlsZEljb25JdGVtKS5pbml0RGF0YShyb2xlTWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQnVpbGROb2RlLmFkZENoaWxkKGluc3RhbnRpYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQnVpbGROb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDwgdGhpcy5pdGVtTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1Ob2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChQcm9wSXRlbSkuaW5pdERhdGEocm9sZU1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW50aWF0ZSA9IGNjLmluc3RhbnRpYXRlKG1haW5NYXAucHJvcEl0ZW1QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGUuZ2V0Q29tcG9uZW50KFByb3BJdGVtKS5pbml0RGF0YShyb2xlTWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUuYWRkQ2hpbGQoaW5zdGFudGlhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBCdWlsZE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgIGlmICgyMjMgPT0gdGhpcy5fbWFwSXRlbUNmZy5jZWxsSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLmxhbmROb2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5NQVAsIFwicHJlZmFicy90cmVlXCIsIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRoaXMubGFuZE5vZGUuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZE5vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5ub2RlLnkgPSAtMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMjM1ID09IHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy5sYW5kTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuTUFQLCBcInByZWZhYnMvZ3VpXCIsIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRoaXMubGFuZE5vZGUuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZE5vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuc2NhbGUgPSAuNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUueCA9IC0xNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUueSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUgPSB0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0QW5pbWF0aW9uKDAsIFwic3RheTJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMTQzID09IHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEICYmIDAgPT0gdGhpcy5sYW5kTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5NQVAsIFwicHJlZmFicy9kb25na3VcIiwgTm9kZVBvb2xJdGVtLCAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLmxhbmROb2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZE5vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQubm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUueSA9IDM1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvY2tJbWdOb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBlbmQ6IHJlZnJlc2hJdGVtXHJcblxyXG4gICAgLy8gQCB0eXBlISEhIVxyXG4gICAgcHJpdmF0ZSBwbGF5Tm9ybWFsVXBBbmltKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd0xvY2tJbWdOb2RlKCk7XHJcbiAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YXZlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSA9IC02NTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLlRFU1QsIFwicmVzL3dhdGVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoLjA1KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvd2F0ZXJcIik7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKC4zICogdGhpcy5fbWFwSW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKC4xKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyguMjgsIGNjLnYyKDAsIDkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5URVNULCBcInJlcy9cIiArIHRoaXMuX21hcEl0ZW1DZmcubGFuZEltZ0lEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNodWlodWExLnJlc2V0U3lzdGVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaHVpaHVhMi5yZXNldFN5c3RlbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0ltZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwVHlwZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyguMywgY2MudjIoMCwgdGhpcy5fbWFwSXRlbUNmZy5sYW5kWU9mZnNldCkpLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uT3V0KCkpKSlcclxuICAgIH0gLy8gZW5kOiBwbGF5Tm9ybWFsVXBBbmltXHJcblxyXG4gICAgLy8gQCB0eXBlISEhIVxyXG4gICAgcHJpdmF0ZSBwbGF5Q29tcG9zZVVuZGVyV2F0ZXJBbmltKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd0xvY2tJbWdOb2RlKCk7XHJcbiAgICAgICAgdGhpcy53YXRlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YXZlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSA9IC02NTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fODhfR0VaSVNIRU5HKTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5URVNULCBcInJlcy93YXRlclwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSguMSksIGNjLmRlbGF5VGltZSguMiAqIHRoaXMuX21hcEluZGV4KSwgY2MuZmFkZUluKC4wNSksIGNjLm1vdmVUbyguMSwgY2MudjIoMCwgOSkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2F2ZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja0ltZ05vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrSW1nTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZU5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9KSwgY2MubW92ZVRvKC4yNSwgY2MudjIoMCwgNjkpKS5lYXNpbmcoY2MuZWFzZVF1YWRyYXRpY0FjdGlvbk91dCgpKSwgY2MubW92ZVRvKC4yOCwgY2MudjIoMCwgNzcpKSwgY2MubW92ZVRvKC4xMywgY2MudjIoMCwgLTEpKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tJbWdOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEUuZnJvbUhFWChcIiMwMEYwRkZcIik7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja0ltZ05vZGUub3BhY2l0eSA9IDEwMDtcclxuICAgICAgICAgICAgdGhpcy50cmVlTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFLmZyb21IRVgoXCIjMDBGMEZGXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLm9wYWNpdHkgPSAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pLCBjYy5tb3ZlVG8oLjEzLCBjYy52MigwLCAtMjEpKSwgY2MubW92ZVRvKC4xNCwgY2MudjIoMCwgMjEpKSwgY2MubW92ZVRvKC4xNiwgY2MudjIoMCwgNikpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2F0ZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pLCBjYy5tb3ZlVG8oLjI2LCBjYy52MigwLCAtMzApKSkpXHJcbiAgICB9IC8vIGVuZDogcGxheUNvbXBvc2VVbmRlcldhdGVyQW5pbVxyXG5cclxuICAgIC8vIEAgdHlwZSEhISFcclxuICAgIHB1YmxpYyBwbGF5VW5sb2NrVXBBbmltKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW0oKTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbyguMSwgY2MudjIoMCwgOSkpLCBjYy5mYWRlT3V0KC4wNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvXCIgKyB0aGlzLl9tYXBJdGVtQ2ZnLmxhbmRJbWdJRCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLndhdGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZU5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgdGhpcy5fbWFwVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2h1aWh1YTEucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICAgICAgdGhpcy5zaHVpaHVhMi5yZXNldFN5c3RlbSgpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oLjEsIGNjLnYyKDAsIDY5KSkuZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSksXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyguNCwgY2MudjIoMCwgNzcpKSwgY2MubW92ZVRvKC4yLCBjYy52MigwLCAtMSkpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oLjI1LCBjYy52MigwLCAyMSkpLCBjYy5tb3ZlVG8oLjI1LCBjYy52MigwLCAwKSksXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyguMjUsIGNjLnYyKC4xLCB0aGlzLl9tYXBJdGVtQ2ZnLmxhbmRZT2Zmc2V0KSkpKVxyXG4gICAgfSAvLyBlbmQ6IHBsYXlVbmxvY2tVcEFuaW1cclxuXHJcbiAgICAvLyBAIHR5cGUhISEhXHJcbiAgICBwdWJsaWMgc2hvd0l0ZW1Ob2RlKGlzUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2NrSW1nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hJdGVtKCk7XHJcbiAgICAgICAgY29uc3Qgcm9sZU1hcCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbdGhpcy5fbWFwSXRlbUNmZy5jZWxsSURdO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc1VubG9jayh0aGlzLl9tYXBJdGVtQ2ZnLmNlbGxJRCkpIHtcclxuICAgICAgICAgICAgaWYgKHJvbGVNYXAgJiYgMCA8IHJvbGVNYXAuaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20udWkubWFwTWFpblVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gcm9sZU1hcC5pdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEJ1aWxkTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBCdWlsZE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gLy8gZW5kOiBzaG93SXRlbU5vZGVcclxuXHJcbiAgICAvLyBAIHR5cGUhISEhXHJcbiAgICBwcml2YXRlIHNob3dMb2NrSW1nTm9kZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvY2tJbWdOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEUuZnJvbUhFWChcIiMwMEYwRkZcIik7XHJcbiAgICAgICAgdGhpcy5sb2NrSW1nTm9kZS5vcGFjaXR5ID0gMTUwO1xyXG5cclxuICAgICAgICBjb25zdCBtYXBDZWxsID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRNYXBDZWxsQ2ZnQnlJRCh0aGlzLl9tYXBJdGVtQ2ZnLmNlbGxJRCk7XHJcbiAgICAgICAgaWYgKG1hcENlbGwgJiYgMCA8IG1hcENlbGwuaXRlbVR5cGUgJiYgMCA8IG1hcENlbGwuaXRlbUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja0ltZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKDEgPT0gbWFwQ2VsbC5pdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQobWFwQ2VsbC5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tJbWdOb2RlLnggPSBpdGVtQ2ZnLnhvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrSW1nTm9kZS55ID0gaXRlbUNmZy5vZmZzZXQgKyA0ODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IG1hcENlbGwuaXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQobWFwQ2VsbC5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrSW1nTm9kZS54ID0gYnVpbGRDZmcueG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tJbWdOb2RlLnkgPSBidWlsZENmZy5vZmZzZXQgKyA0ODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja0ltZ05vZGUueCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tJbWdOb2RlLnkgPSA0ODtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKDIgPT0gbWFwQ2VsbC5pdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmxvY2tJbWdOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvYnVpbGQvXCIgKyBtYXBDZWxsLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tJbWdOb2RlLnNjYWxlID0gLjY2NjY2NjdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1JRCA9IDM2MDAxID09IG1hcENlbGwuaXRlbUlEID8gMTgwMTAgOiBtYXBDZWxsLml0ZW1JRDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKGl0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5sb2NrSW1nTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL1wiICsgaXRlbUNmZy5pY29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja0ltZ05vZGUuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBlbmQ6IHNob3dMb2NrSW1nTm9kZVxyXG5cclxuICAgIC8vIEAgdHlwZSEhISFcclxuICAgIHB1YmxpYyBwbGF5U2FtZUl0ZW1BbmltRW5kKGV2ZW50OiBjYy5WZWMyLCBpdGVtSWQ6IG51bWJlciA9IDApOiBib29sZWFuIHwgdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgcm9sZU1hcCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbdGhpcy5fbWFwSXRlbUNmZy5jZWxsSURdO1xyXG4gICAgICAgIGlmIChyb2xlTWFwKSB7XHJcbiAgICAgICAgICAgIGlmIChyb2xlTWFwLmNlbGxJRCA9PSBpdGVtSWQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcEl0ZW1DZmcuaXRlbVR5cGUgPT0gUHJvcFR5cGVFbnVtLkJBUlJJTF9UWVBFKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmIHJvbGVNYXAuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkJVSUxEX1RZUEUpIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgwICE9IGl0ZW1JZCAmJiB0aGlzLnRvdWNoTm9kZS5faGl0VGVzdChldmVudCkgJiYgIWdtLnVpLm1hcE1haW5VSS5iYXJyZWxOb2RlLl9oaXRUZXN0KGV2ZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoMTg2ID09IHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmNoYW5nZUNlbGxEYXRhKGl0ZW1JZCwgMTk5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBpdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGVNYXAgJiYgMTEwMDYgIT0gcm9sZU1hcC5pdGVtSUQgJiYgaXRlbUlkICE9IHJvbGVNYXAuY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5jaGFuZ2VDZWxsRGF0YShpdGVtSWQsIHRoaXMuX21hcEl0ZW1DZmcuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIGlmICgwIDwgdGhpcy5pdGVtTm9kZS5jaGlsZHJlbkNvdW50ICYmIHRoaXMuaXRlbU5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFByb3BJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFByb3BJdGVtKS5uZXdJdGVtTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgfHwgcm9sZU1hcC5pdGVtVHlwZSAhPSBJdGVtVHlwZUVudW0uQlVJTERfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgaXRlbUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dJdGVtTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gLy8gZW5kOiBwbGF5U2FtZUl0ZW1BbmltRW5kXHJcblxyXG4gICAgLy8gQCAoTElGRS1DWUNMRSBDQUxMQkFDS1MpXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXBJdGVtQ2ZnLmNlbGxJRCA9PSAxODYpIHtcclxuICAgICAgICAgICAgdGhpcy50b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNsaWNrQnVpbGQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3VySW5kZXgrKztcclxuICAgICAgICBpZiAodGhpcy5fY3VySW5kZXggPj0gdGhpcy5fY29sb3JMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmcuY29sb3IgPSB0aGlzLl9jb2xvckxpc3RbdGhpcy5fY3VySW5kZXhdO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==