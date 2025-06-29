
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/PropItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5c23LuYuVMb4OY6m7RSAPq', 'PropItem');
// start-scene/scripts/PropItem.ts

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
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropItem = /** @class */ (function (_super) {
    __extends(PropItem, _super);
    // @
    function PropItem() {
        var _this = _super.call(this) || this;
        _this.itemImg = null;
        _this.roleNode = null;
        _this.bgwhite = null;
        _this.lvl = null;
        _this.diaoxiangTipsNode = null;
        _this.clickNode = null;
        _this.moveNode = null;
        _this.defenseIcon = null;
        _this.newItemNode = null;
        _this.itemCfg = null;
        _this._itemData = null;
        _this._heroCfg = null;
        _this._isShowTips = false;
        _this._isFirstMove = false;
        _this._startTime = 0;
        return _this;
    }
    //
    PropItem.prototype.initData = function (itemData) {
        var _this = this;
        this._itemData = itemData;
        this.diaoxiangTipsNode.active = false;
        this.defenseIcon.active = false;
        if (0 != this._itemData.itemID) {
            if (this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                this.itemImg.node.active = true;
                this.roleNode.active = false;
                this.itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this._itemData.itemID);
                if (this.itemCfg) {
                    this._heroCfg = null;
                    this.itemImg.node.x = this.itemCfg.xoffset;
                    this.itemImg.node.y = this.itemCfg.offset;
                    if ("" == this.itemCfg.anim_name) {
                        Utils_1.Utils.async_set_sprite_frame(this.itemImg, Constants_1.BundleName.MAP, "res/" + this.itemCfg.icon);
                        GameManager_1.gm.pool.put_children(this.itemImg.node);
                        if (this.itemCfg.type == Constants_1.PropTypeEnum.STONE_HERO_TYPE) {
                            this.diaoxiangTipsNode.active = true;
                        }
                    }
                    else {
                        this.itemImg.spriteFrame = null;
                        GameManager_1.gm.pool.put_children(this.itemImg.node);
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item/" + this.itemCfg.anim_name, NodePoolItem_1.NodePoolItem, function (nodePoolItem) {
                            if (0 == _this.itemImg.node.childrenCount) {
                                _this.itemImg.node.addChild(nodePoolItem.node);
                                var animation = nodePoolItem.getComponent(cc.Animation);
                                if (animation) {
                                    animation.play();
                                }
                            }
                        });
                    }
                }
            }
            else if (this._itemData.itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
                this._heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this._itemData.itemID);
                this.itemCfg = null;
                this.defenseIcon.active = GameManager_1.gm.data.mapCell_data.getHeroIsDefanseByCellID(this._itemData.cellID);
                this.itemImg.node.active = false;
                this.roleNode.active = true;
                if (0 < this.roleNode.childrenCount) {
                    GameManager_1.gm.pool.put_children(this.roleNode);
                }
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + this._heroCfg.heroid, NodePoolItem_1.NodePoolItem, function (nodePoolItem) {
                    if (0 == _this.roleNode.childrenCount) {
                        _this.roleNode.addChild(nodePoolItem.node);
                        nodePoolItem.node.x = 0;
                        nodePoolItem.node.y = -15;
                        if (nodePoolItem.getComponent(sp.Skeleton)) {
                            nodePoolItem.getComponent(sp.Skeleton).setSkin("front");
                            nodePoolItem.getComponent(sp.Skeleton).setAnimation(0, "stay", !0);
                            if (_this._heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                                (nodePoolItem.node.x = -20);
                            }
                        }
                        _this.roleNode.active = true;
                        if (10 == _this._heroCfg.occupation) {
                            _this.setWallImg();
                        }
                        nodePoolItem.node.color = cc.Color.WHITE;
                        var heroNode = GameManager_1.gm.data.mapCell_data.getSuperHeroData(_this._heroCfg.heroid, _this._itemData.cellID);
                        if ((_this._heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) && heroNode && 1 == heroNode.heroState) {
                            (nodePoolItem.node.color = cc.Color.GRAY);
                        }
                    }
                    else {
                        GameManager_1.gm.pool.put(nodePoolItem.node);
                    }
                });
            }
            this.roleNode.parent.x = 0;
            this.roleNode.parent.y = 0;
            this.bgwhite.active = false;
        }
        else {
            this.node.removeFromParent();
        }
    };
    PropItem.prototype.setWallImg = function () {
        var wallCellIDs = GameManager_1.gm.data.config_data.getCallDireCellID(this._itemData.cellID);
        if (0 < this.roleNode.childrenCount) {
            for (var index = 0; index < wallCellIDs.length; index++) {
                if (this.roleNode.children[0].getChildByName(GameManager_1.gm.const.WALLNAMELIST[index])) {
                    if (-1 == wallCellIDs[index]) {
                        this.roleNode.children[0].getChildByName(GameManager_1.gm.const.WALLNAMELIST[index]).active = false;
                    }
                    else {
                        this.roleNode.children[0].getChildByName(GameManager_1.gm.const.WALLNAMELIST[index]).active = GameManager_1.gm.data.mapCell_data.getCellIsWall(wallCellIDs[index]);
                    }
                }
            }
        }
    };
    PropItem.prototype.onEnable = function () {
        this.newItemNode.active = false;
        this.clickNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.openBarrelAnimEnd, this);
        this.roleNode.parent.x = 0;
        this.roleNode.parent.y = 0;
        this.moveNode.active = false;
        GameManager_1.gm.ui.on("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.on("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.on("item_not_move_end", this.on_not_move_item_hide, this);
        GameManager_1.gm.ui.on("compose_anim", this.playAddItemAnim, this);
        GameManager_1.gm.ui.on("updateWall", this.updateWall, this);
        GameManager_1.gm.ui.on("updateDefenseHero", this.updateDefenseHero, this);
        GameManager_1.gm.ui.on("set_item_battle_hero_operty", this.setBatterHeroOpacity, this);
        GameManager_1.gm.ui.on("set_new_item_alpha", this.showIsNewItem, this);
        GameManager_1.gm.ui.on("refresh_super_hero_color", this.refreshSuperHeroColor, this);
        GameManager_1.gm.ui.on("close_new_anim", this.hideNewAnim, this);
    };
    PropItem.prototype.refreshSuperHeroColor = function (cellID, itemID) {
        if (this._itemData && cellID == this._itemData.cellID && itemID == this._itemData.itemID && 0 < this.roleNode.childrenCount) {
            this.roleNode.children[0].color = cc.Color.WHITE;
        }
    };
    PropItem.prototype.showIsNewItem = function (cellID) {
        if (this._itemData && cellID == this._itemData.cellID) {
            this.newItemNode.active = true;
        }
    };
    PropItem.prototype.setBatterHeroOpacity = function (cellID, isVisible) {
        cc.log("setBatterHeroOpacity" + cellID, isVisible);
        if (this._itemData && cellID == this._itemData.cellID) {
            this.node.opacity = isVisible ? 255 : 0;
        }
    };
    PropItem.prototype.updateDefenseHero = function (cellID, isActive) {
        if (this._itemData && cellID == this._itemData.cellID) {
            this.defenseIcon.active = isActive;
        }
    };
    PropItem.prototype.updateWall = function (cellID) {
        if (this._itemData && cellID == this._itemData.cellID) {
            this.setWallImg();
        }
    };
    PropItem.prototype.on_not_move_item_hide = function (podition, cellID) {
        this.on_move_item_hide(podition, cellID);
    };
    PropItem.prototype.on_move_item_move = function (touchEvent, itemType, itemID) {
        if (this._itemData && !this._isFirstMove) {
            this._isFirstMove = true;
            this._isShowTips = false;
            this.moveNode.active = true;
            if (itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig && this.itemCfg) {
                    if (itemConfig.type == this.itemCfg.type) {
                        if (!(itemConfig.type != Constants_1.PropTypeEnum.WOOD_TYPE &&
                            itemConfig.type != Constants_1.PropTypeEnum.IRON_TYPE &&
                            itemConfig.type != Constants_1.PropTypeEnum.SHELL_MONEY_TYPE &&
                            itemConfig.type != Constants_1.PropTypeEnum.SOUL_TYPE)) {
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
                else if (itemConfig && this._heroCfg && itemConfig.type == Constants_1.PropTypeEnum.WEAPON_TYPE && this._heroCfg) {
                    for (var index = 0; index < this._heroCfg.nextNeedItem.length; index++) {
                        if (itemConfig.id == this._heroCfg.nextNeedItem[index]) {
                            this.bgwhite.active = true;
                            this.node.getComponent(cc.Animation).play("item_Tishi");
                            this._isShowTips = true;
                            return;
                        }
                    }
                }
            }
            else if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
                var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(itemID);
                if (heroConfig) {
                    for (var index = 0; index < heroConfig.nextNeedItem.length; index++) {
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
    };
    PropItem.prototype.on_move_item_hide = function (param1, pram2) {
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
    };
    PropItem.prototype.onTouchStart = function () {
        this.newItemNode.active = false;
        if (this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                1 == GameManager_1.gm.data.fight_temp_data.open_battle_panel_state ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.BARRIL_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.STONE_HERO_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.HEROGIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.GIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.PAGODAGIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE) {
            return;
        }
        this._startTime = Date.now();
    };
    PropItem.prototype.onTouchMove = function (touchEvent) {
        if (this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.BARRIL_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                1 == GameManager_1.gm.data.fight_temp_data.open_battle_panel_state ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.STONE_HERO_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.HEROGIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.GIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg && this.itemCfg.id == GameManager_1.gm.const.PAGODAGIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.HERO_TYPE &&
                this._heroCfg &&
                this._heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE &&
                0 == touchEvent.touch._startPoint.sub(touchEvent.touch._point).mag() ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.HERO_TYPE &&
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
        GameManager_1.gm.ui.emit("item_move", touchEvent.getLocation(), this._itemData.itemType, this._itemData.itemID);
    };
    PropItem.prototype.onOpenBarrel = function () {
        var _this = this;
        this.node.opacity = 255;
        this.node.getComponent(cc.Animation).play("item_TongClose");
        if (this._itemData) {
            GameManager_1.gm.data.mapCell_data.openCase(this._itemData.cellID, this._itemData.itemID);
            if (GameManager_1.gm.data.mapCell_data.isGuide) {
                if (3 == GameManager_1.gm.data.mapCell_data.role_openBarrel_Times) {
                    GameManager_1.gm.data.mapCell_data.setRoleGuideData(2, 0);
                    GameManager_1.gm.ui.mapMainUI.checkGuideIsShow();
                }
                else {
                    GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
                }
            }
        }
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.initData(GameManager_1.gm.data.mapCell_data.role_map_data[_this._itemData.cellID]);
        }, .25);
    };
    PropItem.prototype.onOpenSuperHeroCase = function () {
        var _a, _b;
        this.node.getComponent(cc.Animation).play("item_open_statue");
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_90_STATUE_BREAKING);
        this.node.opacity = 255;
        GameManager_1.gm.data.mapCell_data.openHeroGiftCase((_a = this.itemCfg) === null || _a === void 0 ? void 0 : _a.price, (_b = this._itemData) === null || _b === void 0 ? void 0 : _b.cellID);
        this.initData(GameManager_1.gm.data.mapCell_data.role_map_data[this._itemData.cellID]);
    };
    PropItem.prototype.onOpenGiftCase = function () {
        var _a, _b;
        this.node.getComponent(cc.Animation).play("item_open_statue");
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_90_STATUE_BREAKING);
        this.node.opacity = 255;
        GameManager_1.gm.data.mapCell_data.openWaterGirlCase((_a = this.itemCfg) === null || _a === void 0 ? void 0 : _a.price, (_b = this._itemData) === null || _b === void 0 ? void 0 : _b.cellID);
    };
    PropItem.prototype.onOpenPagodaCase = function () {
        this.node.getComponent(cc.Animation).play("item_open_statue");
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_90_STATUE_BREAKING);
        this.node.opacity = 255;
    };
    PropItem.prototype.onOpenHeroDescOp = function () {
        var _a, _b;
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [(_a = this._heroCfg) === null || _a === void 0 ? void 0 : _a.heroid, (_b = this._itemData) === null || _b === void 0 ? void 0 : _b.cellID]);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
    };
    PropItem.prototype.onTouchEnd = function (touchEvent) {
        if (!this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying) {
            if (this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.type == Constants_1.PropTypeEnum.BARRIL_TYPE) {
                this.onOpenBarrel();
            }
            else if (this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.id == GameManager_1.gm.const.HEROGIFTID) {
                this.onOpenSuperHeroCase();
            }
            else if (this._itemData.itemType != Constants_1.ItemTypeEnum.ITEM_TYPE || this.itemCfg || this.itemCfg.id != GameManager_1.gm.const.GIFTID && this.itemCfg.id != GameManager_1.gm.const.PAGODAGIFTID) {
                if (this._itemData.itemType == Constants_1.ItemTypeEnum.HERO_TYPE &&
                    this._heroCfg &&
                    this._heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE &&
                    Date.now() - this._startTime < 200 ||
                    this._itemData.itemType == Constants_1.ItemTypeEnum.HERO_TYPE &&
                        this._heroCfg &&
                        (11 == this._heroCfg.occupation || 12 == this._heroCfg.occupation) &&
                        Date.now() - this._startTime < 200) {
                    this.onOpenHeroDescOp();
                }
                else if (this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.type == Constants_1.PropTypeEnum.STONE_HERO_TYPE) {
                    this.onClickOpenHero();
                }
                else {
                    this.node.opacity = 255;
                    GameManager_1.gm.ui.mapMainUI.hideMoveItemNode();
                    GameManager_1.gm.ui.emit("item_move_hide_upgrade");
                    GameManager_1.gm.ui.emit("hide_barrel_ui");
                    GameManager_1.gm.ui.emit("item_not_move_end", touchEvent.getLocation(), this._itemData.cellID);
                }
            }
            else {
                this.onOpenGiftCase();
            }
        }
    };
    PropItem.prototype.onClickOpenHero = function () {
        if (this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE && this.itemCfg && this.itemCfg.type == Constants_1.PropTypeEnum.STONE_HERO_TYPE) {
            this.node.getComponent(cc.Animation).play("item_open_statue");
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_90_STATUE_BREAKING);
            this.node.opacity = 255;
            GameManager_1.gm.data.mapCell_data.openStoneHero(this._itemData.cellID, this._itemData.itemID);
            this.initData(GameManager_1.gm.data.mapCell_data.role_map_data[this._itemData.cellID]);
            return;
        }
    };
    PropItem.prototype.onTouchCancel = function (touchEvent) {
        if (this.node.getComponent(cc.Animation).getAnimationState("item_TongClose").isPlaying ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.BARRIL_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.STONE_HERO_TYPE ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.GIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.PAGODAGIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.id == GameManager_1.gm.const.HEROGIFTID ||
            this._itemData.itemType == Constants_1.ItemTypeEnum.ITEM_TYPE &&
                this.itemCfg &&
                this.itemCfg.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE) {
            return;
        }
        this.node.opacity = 255;
        GameManager_1.gm.ui.emit("item_move_end", touchEvent.getLocation(), this._itemData.cellID);
        this._isFirstMove = false;
    };
    PropItem.prototype.openBarrelAnimEnd = function () { };
    PropItem.prototype.item_move_anim = function (itemID) {
        var itemType = 3e4 < itemID ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
        var currentItemType = 3e4 < this._itemData.itemID ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
        if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
            if (2 == this._itemData.cellState) {
                this.lvl.string = "";
                var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(itemID);
                if (heroConfig) {
                    for (var index = 0; index < heroConfig.nextNeedItem.length; index++) {
                        if (0 < heroConfig.nextNeedItem[index] && this._itemData.itemID == heroConfig.nextNeedItem[index]) {
                            this.bgwhite.active = true;
                            this.node.getComponent(cc.Animation).play("item_Tishi");
                        }
                    }
                }
            }
        }
        else if (itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
            this.lvl.string = "";
            if (2 == this._itemData.cellState) {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig) {
                    if (currentItemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                        if (itemConfig.type == Constants_1.PropTypeEnum.WOOD_TYPE ||
                            itemConfig.type == Constants_1.PropTypeEnum.IRON_TYPE ||
                            itemConfig.type == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE ||
                            itemConfig.type == Constants_1.PropTypeEnum.SOUL_TYPE) {
                            this.bgwhite.active = 2 == this._itemData.cellState && itemID == this._itemData.itemID;
                            if (this.bgwhite.active) {
                                this.node.getComponent(cc.Animation).play("item_Tishi");
                            }
                            if (!this.itemCfg) {
                                this.itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this._itemData.itemID);
                            }
                            if (this.itemCfg && itemConfig.type == this.itemCfg.type) {
                                this.lvl.string = this.itemCfg.number + "";
                            }
                        }
                        else {
                            this.bgwhite.active = 2 == this._itemData.cellState &&
                                itemConfig.type != Constants_1.PropTypeEnum.WEAPON_TYPE &&
                                itemID == this._itemData.itemID &&
                                this.itemCfg && 0 < this.itemCfg.next;
                            if (this.bgwhite.active) {
                                this.node.getComponent(cc.Animation).play("item_Tishi");
                            }
                        }
                    }
                    else if (currentItemType == Constants_1.ItemTypeEnum.HERO_TYPE && itemConfig.type == Constants_1.PropTypeEnum.WEAPON_TYPE) {
                        if (!this._heroCfg) {
                            this._heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this._itemData.itemID);
                        }
                        for (var index = 0; index < this._heroCfg.nextNeedItem.length; index++)
                            if (0 < this._heroCfg.nextNeedItem[index] && this._heroCfg.nextNeedItem[index] == itemConfig.id) {
                                this.bgwhite.active = true;
                                this.node.getComponent(cc.Animation).play("item_Tishi");
                                break;
                            }
                    }
                }
            }
        }
    };
    PropItem.prototype.moveItemEndAnim = function () {
        this.node.getComponent(cc.Animation).stop();
        this.roleNode.parent.x = 0;
        this.roleNode.parent.y = 0;
        this.itemImg.node.parent.scale = 1;
        this.bgwhite.active = false;
        this.lvl.string = "";
    };
    PropItem.prototype.showAnimByMoveID = function (moveID, cellID) {
        var _a;
        var itemConfig;
        if (cellID == ((_a = this._itemData) === null || _a === void 0 ? void 0 : _a.cellID)) {
            this.node.children[0].active = false;
            this.lvl.string = "";
        }
        else {
            this.lvl.string = "";
            if (moveID > 15000 && moveID < 18000) {
                itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(moveID);
                if (itemConfig) {
                    this.lvl.string = itemConfig.lv + "";
                    this.bgwhite.active = true;
                }
            }
        }
    };
    PropItem.prototype.playAddItemAnim = function (cellID) {
        var _a;
        if (((_a = this._itemData) === null || _a === void 0 ? void 0 : _a.cellID) == cellID) {
            this.node.getComponent(cc.Animation).play("item_TongOpen");
        }
    };
    PropItem.prototype.hideAnimByMoveID = function (cellID) {
        var _a;
        this.lvl.string = "";
        this.bgwhite.active = false;
        if (cellID == ((_a = this._itemData) === null || _a === void 0 ? void 0 : _a.cellID)) {
            this.node.children[0].active = true;
        }
    };
    PropItem.prototype.hideNewAnim = function (cellID) {
        if (this._itemData && this._itemData.cellID == cellID) {
            this.newItemNode.active = false;
        }
    };
    PropItem.prototype.onDisable = function () {
        var _a, _b, _c, _d;
        GameManager_1.gm.ui.off("compose_anim", this.playAddItemAnim, this);
        (_a = this.clickNode) === null || _a === void 0 ? void 0 : _a.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        (_b = this.clickNode) === null || _b === void 0 ? void 0 : _b.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        (_c = this.clickNode) === null || _c === void 0 ? void 0 : _c.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        (_d = this.clickNode) === null || _d === void 0 ? void 0 : _d.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        GameManager_1.gm.ui.off("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.off("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.off("item_not_move_end", this.on_not_move_item_hide, this);
        GameManager_1.gm.ui.off("updateWall", this.updateWall, this);
        GameManager_1.gm.ui.off("updateDefenseHero", this.updateDefenseHero, this);
        GameManager_1.gm.ui.off("set_item_battle_hero_operty", this.setBatterHeroOpacity, this);
        GameManager_1.gm.ui.off("set_new_item_alpha", this.showIsNewItem, this);
        GameManager_1.gm.ui.off("refresh_super_hero_color", this.refreshSuperHeroColor, this);
        GameManager_1.gm.ui.off("close_new_anim", this.hideNewAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.openBarrelAnimEnd, this);
    };
    __decorate([
        property(cc.Sprite)
    ], PropItem.prototype, "itemImg", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "roleNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "bgwhite", void 0);
    __decorate([
        property(cc.Label)
    ], PropItem.prototype, "lvl", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "diaoxiangTipsNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "clickNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "moveNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "defenseIcon", void 0);
    __decorate([
        property(cc.Node)
    ], PropItem.prototype, "newItemNode", void 0);
    PropItem = __decorate([
        ccclass
    ], PropItem);
    return PropItem;
}(cc.Component));
exports.default = PropItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFByb3BJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUk7QUFDSixpQ0FBZ0M7QUFDaEMseUNBQW1GO0FBQ25GLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFLeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFvQzlDLElBQUk7SUFDSjtRQUFBLFlBQ0ksaUJBQU8sU0FPVjtRQTNDTyxhQUFPLEdBQWMsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixTQUFHLEdBQWEsSUFBSSxDQUFDO1FBR3JCLHVCQUFpQixHQUFZLElBQUksQ0FBQztRQUdsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFhL0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7O0lBQ3hCLENBQUM7SUFFRCxFQUFFO0lBQ0ssMkJBQVEsR0FBZixVQUFnQixRQUF1QjtRQUF2QyxpQkE4RUM7UUE3RUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0s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QUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRTdCLGdCQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BELGdCQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFD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QUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQTFrQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ2M7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5Q0FDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUN3QjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ2tCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ2lCO0lBMUJsQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBNmtCNUI7SUFBRCxlQUFDO0NBN2tCRCxBQTZrQkMsQ0E3a0JxQyxFQUFFLENBQUMsU0FBUyxHQTZrQmpEO2tCQTdrQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEl0ZW1UeXBlRW51bSwgUHJvcFR5cGVFbnVtLCBIZXJvVHlwZUVudW0sIEJ1bmRsZU5hbWUgfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgTWFwSXRlbURhdGFWTyB9IGZyb20gJy4vTWFwQ2VsbENmZ0RhdGEnO1xyXG5pbXBvcnQgeyBJdGVtQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbSc7XHJcbmltcG9ydCB7IEhlcm9Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9oZXJvJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBpdGVtSW1nOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByb2xlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJnd2hpdGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbHZsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGRpYW94aWFuZ1RpcHNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2xpY2tOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbW92ZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBkZWZlbnNlSWNvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbmV3SXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vIHByaXZhdGVcclxuICAgIHByaXZhdGUgaXRlbUNmZzogSXRlbUNvbmZpZztcclxuICAgIHByaXZhdGUgX2l0ZW1EYXRhOiBNYXBJdGVtRGF0YVZPO1xyXG4gICAgcHJpdmF0ZSBfaGVyb0NmZzogSGVyb0NvbmZpZztcclxuICAgIHByaXZhdGUgX2lzU2hvd1RpcHM6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9pc0ZpcnN0TW92ZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3N0YXJ0VGltZTogbnVtYmVyO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pdGVtQ2ZnID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pdGVtRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faGVyb0NmZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faXNTaG93VGlwcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzRmlyc3RNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgcHVibGljIGluaXREYXRhKGl0ZW1EYXRhOiBNYXBJdGVtRGF0YVZPKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXRlbURhdGEgPSBpdGVtRGF0YTtcclxuICAgICAgICB0aGlzLmRpYW94aWFuZ1RpcHNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVmZW5zZUljb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKDAgIT0gdGhpcy5faXRlbURhdGEuaXRlbUlEKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1JbWcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5faXRlbURhdGEuaXRlbUlEKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlcm9DZmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbUltZy5ub2RlLnggPSB0aGlzLml0ZW1DZmcueG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1JbWcubm9kZS55ID0gdGhpcy5pdGVtQ2ZnLm9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiA9PSB0aGlzLml0ZW1DZmcuYW5pbV9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5pdGVtSW1nLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvXCIgKyB0aGlzLml0ZW1DZmcuaWNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMuaXRlbUltZy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbUNmZy50eXBlID09IFByb3BUeXBlRW51bS5TVE9ORV9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhb3hpYW5nVGlwc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbUltZy5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMuaXRlbUltZy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5NQVAsIFwicHJlZmFicy9pdGVtL1wiICsgdGhpcy5pdGVtQ2ZnLmFuaW1fbmFtZSwgTm9kZVBvb2xJdGVtLCAobm9kZVBvb2xJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLml0ZW1JbWcubm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtSW1nLm5vZGUuYWRkQ2hpbGQobm9kZVBvb2xJdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGVyb0NmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5faXRlbURhdGEuaXRlbUlEKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zZUljb24uYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SGVyb0lzRGVmYW5zZUJ5Q2VsbElEKHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1JbWcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICgwIDwgdGhpcy5yb2xlTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5yb2xlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgdGhpcy5faGVyb0NmZy5oZXJvaWQsIE5vZGVQb29sSXRlbSwgKG5vZGVQb29sSXRlbSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLnJvbGVOb2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlTm9kZS5hZGRDaGlsZChub2RlUG9vbEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5ub2RlLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlUG9vbEl0ZW0ubm9kZS55ID0gLTE1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZVBvb2xJdGVtLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oXCJmcm9udFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcInN0YXlcIiwgITApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hlcm9DZmcuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobm9kZVBvb2xJdGVtLm5vZGUueCA9IC0yMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEwID09IHRoaXMuX2hlcm9DZmcub2NjdXBhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRXYWxsSW1nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVBvb2xJdGVtLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb05vZGUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRTdXBlckhlcm9EYXRhKHRoaXMuX2hlcm9DZmcuaGVyb2lkLCB0aGlzLl9pdGVtRGF0YS5jZWxsSUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy5faGVyb0NmZy5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkgJiYgaGVyb05vZGUgJiYgMSA9PSBoZXJvTm9kZS5oZXJvU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChub2RlUG9vbEl0ZW0ubm9kZS5jb2xvciA9IGNjLkNvbG9yLkdSQVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQobm9kZVBvb2xJdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJvbGVOb2RlLnBhcmVudC54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5yb2xlTm9kZS5wYXJlbnQueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFdhbGxJbWcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgd2FsbENlbGxJRHMgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldENhbGxEaXJlQ2VsbElEKHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCk7XHJcbiAgICAgICAgaWYgKDAgPCB0aGlzLnJvbGVOb2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHdhbGxDZWxsSURzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZU5vZGUuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoZ20uY29uc3QuV0FMTE5BTUVMSVNUW2luZGV4XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPT0gd2FsbENlbGxJRHNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZU5vZGUuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoZ20uY29uc3QuV0FMTE5BTUVMSVNUW2luZGV4XSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlTm9kZS5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShnbS5jb25zdC5XQUxMTkFNRUxJU1RbaW5kZXhdKS5hY3RpdmUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRDZWxsSXNXYWxsKHdhbGxDZWxsSURzW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5ld0l0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgdGhpcy5vcGVuQmFycmVsQW5pbUVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yb2xlTm9kZS5wYXJlbnQueCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xlTm9kZS5wYXJlbnQueSA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZ20udWkub24oXCJpdGVtX21vdmVcIiwgdGhpcy5vbl9tb3ZlX2l0ZW1fbW92ZSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub24oXCJpdGVtX21vdmVfZW5kXCIsIHRoaXMub25fbW92ZV9pdGVtX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaXRlbV9ub3RfbW92ZV9lbmRcIiwgdGhpcy5vbl9ub3RfbW92ZV9pdGVtX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiY29tcG9zZV9hbmltXCIsIHRoaXMucGxheUFkZEl0ZW1BbmltLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInVwZGF0ZVdhbGxcIiwgdGhpcy51cGRhdGVXYWxsLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInVwZGF0ZURlZmVuc2VIZXJvXCIsIHRoaXMudXBkYXRlRGVmZW5zZUhlcm8sIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwic2V0X2l0ZW1fYmF0dGxlX2hlcm9fb3BlcnR5XCIsIHRoaXMuc2V0QmF0dGVySGVyb09wYWNpdHksIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwic2V0X25ld19pdGVtX2FscGhhXCIsIHRoaXMuc2hvd0lzTmV3SXRlbSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub24oXCJyZWZyZXNoX3N1cGVyX2hlcm9fY29sb3JcIiwgdGhpcy5yZWZyZXNoU3VwZXJIZXJvQ29sb3IsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiY2xvc2VfbmV3X2FuaW1cIiwgdGhpcy5oaWRlTmV3QW5pbSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU3VwZXJIZXJvQ29sb3IoY2VsbElEOiBudW1iZXIsIGl0ZW1JRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhICYmIGNlbGxJRCA9PSB0aGlzLl9pdGVtRGF0YS5jZWxsSUQgJiYgaXRlbUlEID09IHRoaXMuX2l0ZW1EYXRhLml0ZW1JRCAmJiAwIDwgdGhpcy5yb2xlTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZU5vZGUuY2hpbGRyZW5bMF0uY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93SXNOZXdJdGVtKGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhICYmIGNlbGxJRCA9PSB0aGlzLl9pdGVtRGF0YS5jZWxsSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdJdGVtTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEJhdHRlckhlcm9PcGFjaXR5KGNlbGxJRDogbnVtYmVyLCBpc1Zpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjYy5sb2coXCJzZXRCYXR0ZXJIZXJvT3BhY2l0eVwiICsgY2VsbElELCBpc1Zpc2libGUpO1xyXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YSAmJiBjZWxsSUQgPT0gdGhpcy5faXRlbURhdGEuY2VsbElEKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gaXNWaXNpYmxlID8gMjU1IDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVEZWZlbnNlSGVybyhjZWxsSUQ6IG51bWJlciwgaXNBY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGEgJiYgY2VsbElEID09IHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmVuc2VJY29uLmFjdGl2ZSA9IGlzQWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVdhbGwoY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGEgJiYgY2VsbElEID09IHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdhbGxJbWcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9ub3RfbW92ZV9pdGVtX2hpZGUocG9kaXRpb246IGNjLlZlYzIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbl9tb3ZlX2l0ZW1faGlkZShwb2RpdGlvbiwgY2VsbElEKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX21vdmVfaXRlbV9tb3ZlKHRvdWNoRXZlbnQ6IGNjLlZlYzIsIGl0ZW1UeXBlOiBJdGVtVHlwZUVudW0sIGl0ZW1JRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhICYmICF0aGlzLl9pc0ZpcnN0TW92ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0ZpcnN0TW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzU2hvd1RpcHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnICYmIHRoaXMuaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnLnR5cGUgPT0gdGhpcy5pdGVtQ2ZnLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXRlbUNvbmZpZy50eXBlICE9IFByb3BUeXBlRW51bS5XT09EX1RZUEUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db25maWcudHlwZSAhPSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLnR5cGUgIT0gUHJvcFR5cGVFbnVtLlNIRUxMX01PTkVZX1RZUEUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db25maWcudHlwZSAhPSBQcm9wVHlwZUVudW0uU09VTF9UWVBFKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubHZsLnN0cmluZyA9IHRoaXMuaXRlbUNmZy5udW1iZXIgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNTaG93VGlwcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSUQgPT0gdGhpcy5pdGVtQ2ZnLmlkICYmIDAgPCB0aGlzLml0ZW1DZmcubmV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnd2hpdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJpdGVtX1Rpc2hpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1Nob3dUaXBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtQ29uZmlnICYmIHRoaXMuX2hlcm9DZmcgJiYgaXRlbUNvbmZpZy50eXBlID09IFByb3BUeXBlRW51bS5XRUFQT05fVFlQRSAmJiB0aGlzLl9oZXJvQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2hlcm9DZmcubmV4dE5lZWRJdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZy5pZCA9PSB0aGlzLl9oZXJvQ2ZnLm5leHROZWVkSXRlbVtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJpdGVtX1Rpc2hpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNTaG93VGlwcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGl0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBoZXJvQ29uZmlnLm5leHROZWVkSXRlbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhLml0ZW1JRCA9PSBoZXJvQ29uZmlnLm5leHROZWVkSXRlbVtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJpdGVtX1Rpc2hpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNTaG93VGlwcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9tb3ZlX2l0ZW1faGlkZShwYXJhbTE/OiBjYy5WZWMyLCBwcmFtMj86IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzRmlyc3RNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU2hvd1RpcHMpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNTaG93VGlwcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJnd2hpdGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubHZsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZU5vZGUucGFyZW50LnggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVOb2RlLnBhcmVudC55ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5pdGVtSW1nLm5vZGUucGFyZW50LnNjYWxlID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZXdJdGVtTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldEFuaW1hdGlvblN0YXRlKFwiaXRlbV9Ub25nQ2xvc2VcIikuaXNQbGF5aW5nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiZcclxuICAgICAgICAgICAgMSA9PSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5vcGVuX2JhdHRsZV9wYW5lbF9zdGF0ZSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uQkFSUklMX1RZUEUgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLlNUT05FX0hFUk9fVFlQRSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcuaWQgPT0gZ20uY29uc3QuSEVST0dJRlRJRCB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcuaWQgPT0gZ20uY29uc3QuR0lGVElEIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZy5pZCA9PSBnbS5jb25zdC5QQUdPREFHSUZUSUQgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLkRJQU1PTkRTX1RZUEUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hNb3ZlKHRvdWNoRXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldEFuaW1hdGlvblN0YXRlKFwiaXRlbV9Ub25nQ2xvc2VcIikuaXNQbGF5aW5nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZy50eXBlID09IFByb3BUeXBlRW51bS5CQVJSSUxfVFlQRSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIDEgPT0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEub3Blbl9iYXR0bGVfcGFuZWxfc3RhdGUgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLlNUT05FX0hFUk9fVFlQRSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcuaWQgPT0gZ20uY29uc3QuSEVST0dJRlRJRCB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcuaWQgPT0gZ20uY29uc3QuR0lGVElEIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnICYmIHRoaXMuaXRlbUNmZy5pZCA9PSBnbS5jb25zdC5QQUdPREFHSUZUSUQgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLkRJQU1PTkRTX1RZUEUgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9oZXJvQ2ZnICYmXHJcbiAgICAgICAgICAgIHRoaXMuX2hlcm9DZmcuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUgJiZcclxuICAgICAgICAgICAgMCA9PSB0b3VjaEV2ZW50LnRvdWNoLl9zdGFydFBvaW50LnN1Yih0b3VjaEV2ZW50LnRvdWNoLl9wb2ludCkubWFnKCkgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9oZXJvQ2ZnICYmXHJcbiAgICAgICAgICAgICgxMSA9PSB0aGlzLl9oZXJvQ2ZnLm9jY3VwYXRpb24gfHxcclxuICAgICAgICAgICAgICAgIDEyID09IHRoaXMuX2hlcm9DZmcub2NjdXBhdGlvbikgJiZcclxuICAgICAgICAgICAgMCA9PSB0b3VjaEV2ZW50LnRvdWNoLl9zdGFydFBvaW50LnN1Yih0b3VjaEV2ZW50LnRvdWNoLl9wb2ludCkubWFnKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKDAgPCB0aGlzLm5vZGUub3BhY2l0eSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX21vdmVcIiwgdG91Y2hFdmVudC5nZXRMb2NhdGlvbigpLCB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSwgdGhpcy5faXRlbURhdGEuaXRlbUlEKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PcGVuQmFycmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiaXRlbV9Ub25nQ2xvc2VcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLm9wZW5DYXNlKHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCwgdGhpcy5faXRlbURhdGEuaXRlbUlEKTtcclxuICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgzID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfb3BlbkJhcnJlbF9UaW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldFJvbGVHdWlkZURhdGEoMiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrR3VpZGVJc1Nob3coKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrSGFuZEFuaW1EZWxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9tYXBfZGF0YVt0aGlzLl9pdGVtRGF0YS5jZWxsSURdKVxyXG4gICAgICAgIH0sIC4yNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3BlblN1cGVySGVyb0Nhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJpdGVtX29wZW5fc3RhdHVlXCIpO1xyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzkwX1NUQVRVRV9CUkVBS0lORyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub3Blbkhlcm9HaWZ0Q2FzZSh0aGlzLml0ZW1DZmc/LnByaWNlLCB0aGlzLl9pdGVtRGF0YT8uY2VsbElEKTtcclxuICAgICAgICB0aGlzLmluaXREYXRhKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbdGhpcy5faXRlbURhdGEuY2VsbElEXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3BlbkdpZnRDYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiaXRlbV9vcGVuX3N0YXR1ZVwiKTtcclxuICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT185MF9TVEFUVUVfQlJFQUtJTkcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLm9wZW5XYXRlckdpcmxDYXNlKHRoaXMuaXRlbUNmZz8ucHJpY2UsIHRoaXMuX2l0ZW1EYXRhPy5jZWxsSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVuUGFnb2RhQ2FzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcIml0ZW1fb3Blbl9zdGF0dWVcIik7XHJcbiAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fOTBfU1RBVFVFX0JSRUFLSU5HKTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uT3Blbkhlcm9EZXNjT3AoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LlNVUEVSSEVST09QLmtleSwgW3RoaXMuX2hlcm9DZmc/Lmhlcm9pZCwgdGhpcy5faXRlbURhdGE/LmNlbGxJRF0pO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LlNVUEVSSEVST09QKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hFbmQodG91Y2hFdmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldEFuaW1hdGlvblN0YXRlKFwiaXRlbV9Ub25nQ2xvc2VcIikuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmIHRoaXMuaXRlbUNmZyAmJiB0aGlzLml0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uQkFSUklMX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25PcGVuQmFycmVsKCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiYgdGhpcy5pdGVtQ2ZnICYmIHRoaXMuaXRlbUNmZy5pZCA9PSBnbS5jb25zdC5IRVJPR0lGVElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3BlblN1cGVySGVyb0Nhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXRlbURhdGEuaXRlbVR5cGUgIT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSB8fCB0aGlzLml0ZW1DZmcgfHwgdGhpcy5pdGVtQ2ZnLmlkICE9IGdtLmNvbnN0LkdJRlRJRCAmJiB0aGlzLml0ZW1DZmcuaWQgIT0gZ20uY29uc3QuUEFHT0RBR0lGVElEKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlcm9DZmcgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZXJvQ2ZnLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFICYmXHJcbiAgICAgICAgICAgICAgICAgICAgRGF0ZS5ub3coKSAtIHRoaXMuX3N0YXJ0VGltZSA8IDIwMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZXJvQ2ZnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKDExID09IHRoaXMuX2hlcm9DZmcub2NjdXBhdGlvbiB8fCAxMiA9PSB0aGlzLl9oZXJvQ2ZnLm9jY3VwYXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgRGF0ZS5ub3coKSAtIHRoaXMuX3N0YXJ0VGltZSA8IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25PcGVuSGVyb0Rlc2NPcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSAmJiB0aGlzLml0ZW1DZmcgJiYgdGhpcy5pdGVtQ2ZnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLlNUT05FX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja09wZW5IZXJvKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuaGlkZU1vdmVJdGVtTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX21vdmVfaGlkZV91cGdyYWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJoaWRlX2JhcnJlbF91aVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9ub3RfbW92ZV9lbmRcIiwgdG91Y2hFdmVudC5nZXRMb2NhdGlvbigpLCB0aGlzLl9pdGVtRGF0YS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25PcGVuR2lmdENhc2UoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsaWNrT3Blbkhlcm8oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiYgdGhpcy5pdGVtQ2ZnICYmIHRoaXMuaXRlbUNmZy50eXBlID09IFByb3BUeXBlRW51bS5TVE9ORV9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJpdGVtX29wZW5fc3RhdHVlXCIpO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT185MF9TVEFUVUVfQlJFQUtJTkcpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub3BlblN0b25lSGVybyh0aGlzLl9pdGVtRGF0YS5jZWxsSUQsIHRoaXMuX2l0ZW1EYXRhLml0ZW1JRCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9tYXBfZGF0YVt0aGlzLl9pdGVtRGF0YS5jZWxsSURdKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hDYW5jZWwodG91Y2hFdmVudDogY2MuVG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldEFuaW1hdGlvblN0YXRlKFwiaXRlbV9Ub25nQ2xvc2VcIikuaXNQbGF5aW5nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZy50eXBlID09IFByb3BUeXBlRW51bS5CQVJSSUxfVFlQRSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uU1RPTkVfSEVST19UWVBFIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZy5pZCA9PSBnbS5jb25zdC5HSUZUSUQgfHxcclxuICAgICAgICAgICAgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnLmlkID09IGdtLmNvbnN0LlBBR09EQUdJRlRJRCB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcuaWQgPT0gZ20uY29uc3QuSEVST0dJRlRJRCB8fFxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtRGF0YS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNmZyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uRElBTU9ORFNfVFlQRSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9tb3ZlX2VuZFwiLCB0b3VjaEV2ZW50LmdldExvY2F0aW9uKCksIHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCk7XHJcbiAgICAgICAgdGhpcy5faXNGaXJzdE1vdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5CYXJyZWxBbmltRW5kKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBpdGVtX21vdmVfYW5pbShpdGVtSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1UeXBlID0gM2U0IDwgaXRlbUlEID8gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSA6IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEU7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEl0ZW1UeXBlID0gM2U0IDwgdGhpcy5faXRlbURhdGEuaXRlbUlEID8gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSA6IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEU7XHJcbiAgICAgICAgaWYgKGl0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgaWYgKDIgPT0gdGhpcy5faXRlbURhdGEuY2VsbFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmx2bC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9Db25maWcubmV4dE5lZWRJdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IGhlcm9Db25maWcubmV4dE5lZWRJdGVtW2luZGV4XSAmJiB0aGlzLl9pdGVtRGF0YS5pdGVtSUQgPT0gaGVyb0NvbmZpZy5uZXh0TmVlZEl0ZW1baW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnd2hpdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiaXRlbV9UaXNoaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICB0aGlzLmx2bC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoMiA9PSB0aGlzLl9pdGVtRGF0YS5jZWxsU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKGl0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZy50eXBlID09IFByb3BUeXBlRW51bS5XT09EX1RZUEUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLlNIRUxMX01PTkVZX1RZUEUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uU09VTF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnd2hpdGUuYWN0aXZlID0gMiA9PSB0aGlzLl9pdGVtRGF0YS5jZWxsU3RhdGUgJiYgaXRlbUlEID09IHRoaXMuX2l0ZW1EYXRhLml0ZW1JRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ3doaXRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiaXRlbV9UaXNoaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5faXRlbURhdGEuaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtQ2ZnICYmIGl0ZW1Db25maWcudHlwZSA9PSB0aGlzLml0ZW1DZmcudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubHZsLnN0cmluZyA9IHRoaXMuaXRlbUNmZy5udW1iZXIgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSAyID09IHRoaXMuX2l0ZW1EYXRhLmNlbGxTdGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db25maWcudHlwZSAhPSBQcm9wVHlwZUVudW0uV0VBUE9OX1RZUEUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtSUQgPT0gdGhpcy5faXRlbURhdGEuaXRlbUlEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtQ2ZnICYmIDAgPCB0aGlzLml0ZW1DZmcubmV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ3doaXRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiaXRlbV9UaXNoaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSEVST19UWVBFICYmIGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uV0VBUE9OX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9oZXJvQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRCh0aGlzLl9pdGVtRGF0YS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9oZXJvQ2ZnLm5leHROZWVkSXRlbS5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IHRoaXMuX2hlcm9DZmcubmV4dE5lZWRJdGVtW2luZGV4XSAmJiB0aGlzLl9oZXJvQ2ZnLm5leHROZWVkSXRlbVtpbmRleF0gPT0gaXRlbUNvbmZpZy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiaXRlbV9UaXNoaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZlSXRlbUVuZEFuaW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnJvbGVOb2RlLnBhcmVudC54ID0gMDtcclxuICAgICAgICB0aGlzLnJvbGVOb2RlLnBhcmVudC55ID0gMDtcclxuICAgICAgICB0aGlzLml0ZW1JbWcubm9kZS5wYXJlbnQuc2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmx2bC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0FuaW1CeU1vdmVJRChtb3ZlSUQ6IG51bWJlciwgY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXRlbUNvbmZpZztcclxuICAgICAgICBpZiAoY2VsbElEID09IHRoaXMuX2l0ZW1EYXRhPy5jZWxsSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmx2bC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubHZsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlSUQgPiAxNTAwMCAmJiBtb3ZlSUQgPCAxODAwMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQobW92ZUlEKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sdmwuc3RyaW5nID0gaXRlbUNvbmZpZy5sdiArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZ3doaXRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QWRkSXRlbUFuaW0oY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGE/LmNlbGxJRCA9PSBjZWxsSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJpdGVtX1RvbmdPcGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVBbmltQnlNb3ZlSUQoY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmx2bC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYmd3aGl0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoY2VsbElEID09IHRoaXMuX2l0ZW1EYXRhPy5jZWxsSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGlkZU5ld0FuaW0oY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGEgJiYgdGhpcy5faXRlbURhdGEuY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld0l0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm9mZihcImNvbXBvc2VfYW5pbVwiLCB0aGlzLnBsYXlBZGRJdGVtQW5pbSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGU/Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlPy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGU/Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGU/Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiaXRlbV9tb3ZlXCIsIHRoaXMub25fbW92ZV9pdGVtX21vdmUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcIml0ZW1fbW92ZV9lbmRcIiwgdGhpcy5vbl9tb3ZlX2l0ZW1faGlkZSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiaXRlbV9ub3RfbW92ZV9lbmRcIiwgdGhpcy5vbl9ub3RfbW92ZV9pdGVtX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcInVwZGF0ZVdhbGxcIiwgdGhpcy51cGRhdGVXYWxsLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJ1cGRhdGVEZWZlbnNlSGVyb1wiLCB0aGlzLnVwZGF0ZURlZmVuc2VIZXJvLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJzZXRfaXRlbV9iYXR0bGVfaGVyb19vcGVydHlcIiwgdGhpcy5zZXRCYXR0ZXJIZXJvT3BhY2l0eSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwic2V0X25ld19pdGVtX2FscGhhXCIsIHRoaXMuc2hvd0lzTmV3SXRlbSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwicmVmcmVzaF9zdXBlcl9oZXJvX2NvbG9yXCIsIHRoaXMucmVmcmVzaFN1cGVySGVyb0NvbG9yLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJjbG9zZV9uZXdfYW5pbVwiLCB0aGlzLmhpZGVOZXdBbmltLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub2ZmKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsIHRoaXMub3BlbkJhcnJlbEFuaW1FbmQsIHRoaXMpO1xyXG4gICAgfVxyXG59Il19