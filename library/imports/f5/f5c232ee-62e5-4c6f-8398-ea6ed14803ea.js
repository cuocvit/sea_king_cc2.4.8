"use strict";
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