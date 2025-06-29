
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BuildIconItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76c96Z2j4pLHJttgw5+tG75', 'BuildIconItem');
// start-scene/scripts/BuildIconItem.ts

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
var Utils_1 = require("./Utils");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuildIconItem = /** @class */ (function (_super) {
    __extends(BuildIconItem, _super);
    function BuildIconItem() {
        var _this = _super.call(this) || this;
        _this.itemImg = null;
        _this.lockSpr = [];
        _this.lblLvl = null;
        _this.buildStateIcon = null;
        _this.productNode = null;
        _this.fullImg = [];
        _this.tanhao = null;
        _this.clickNode = null;
        _this.upgradeNode = null;
        _this.upgradeNodeSpr = null;
        _this.upgradeNodeBar = null;
        _this.upgradeBarLbl = null;
        _this.fullNode = null;
        _this._isMove = false;
        _this._parent = null;
        _this._itemData = null;
        _this._buildData = null;
        _this._buildCfg = null;
        _this._beginTime = 0;
        _this._endTime = 0;
        _this._timeContiner = 0;
        _this._curTimer = 0;
        _this.moveItemType = 0;
        _this.lastNum = 0;
        _this.fullTime = 0;
        return _this;
    }
    // *
    BuildIconItem.prototype.initData = function (itemData) {
        var _this = this;
        this._itemData = itemData;
        this._buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this._itemData.itemID);
        if (this._buildCfg) {
            this.itemImg.node.x = this._buildCfg.xoffset;
            this.itemImg.node.y = this._buildCfg.offset;
            this._buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._buildCfg.buildType);
            this.lblLvl.string = "";
            this.buildStateIcon.node.active = false;
            this.productNode.active = false;
            if (this._buildData) {
                this.lblLvl.string = "" + this._buildData.buildLvl;
                if ("" == this._buildCfg.anim_name) {
                    var path = "res/build/" + this._buildCfg.model;
                    Utils_1.Utils.async_set_sprite_frame(this.itemImg, Constants_1.BundleName.MAP, path);
                    GameManager_1.gm.pool.put_children(this.itemImg.node);
                }
                else {
                    this.itemImg.spriteFrame = null;
                    GameManager_1.gm.pool.put_children(this.itemImg.node);
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/" + this._buildCfg.anim_name, NodePoolItem_1.NodePoolItem, function (t) {
                        if (0 == _this.itemImg.node.childrenCount) {
                            _this.itemImg.node.addChild(t.node);
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
            if (this._buildCfg.buildType == Constants_1.BuildTypeEnum.STALL_TYPE) {
                this.setStallRed();
            }
            this.refreshUpgradeIcon();
        }
    };
    // *
    BuildIconItem.prototype.onEnable = function () {
        var _a;
        GameManager_1.gm.ui.on("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.on("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.on("item_move_hide_upgrade", this.hideUpgrade, this);
        GameManager_1.gm.ui.on("build_metarail_change", this.refreshUpgrade, this);
        GameManager_1.gm.ui.on("build_show_stateIcon", this.refreshUpgradeIcon, this);
        if (this._buildCfg.buildType == Constants_1.BuildTypeEnum.STALL_TYPE) {
            GameManager_1.gm.ui.on("refresh_red_tips_stall", this.setStallRed, this);
            this.setStallRed();
        }
        else if (((_a = this._buildCfg) === null || _a === void 0 ? void 0 : _a.buildType) == Constants_1.BuildTypeEnum.TOWER_TYPE) {
            GameManager_1.gm.ui.on("build_show_towerBuff", this.showDefenseIcon, this);
            this.showDefenseIcon();
        }
        this.clickNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.clickNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.upgradeNode.active = false;
        this.fullNode.active = false;
    };
    // *
    BuildIconItem.prototype.showDefenseIcon = function () {
        var _this = this;
        var _a, _b, _c;
        if (((_a = this._buildCfg) === null || _a === void 0 ? void 0 : _a.buildType) != Constants_1.BuildTypeEnum.TOWER_TYPE)
            return;
        if (GameManager_1.gm.data.mapCell_data.getIsHeroTowerBuff()) {
            if (this.itemImg.node.childrenCount > 0 && ((_b = this.itemImg) === null || _b === void 0 ? void 0 : _b.node.getChildByName("passive_skill_3"))) {
                return;
            }
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/passive_skill_3", NodePoolItem_1.NodePoolItem, function (data) {
                var _a;
                if (!data)
                    return;
                if (((_a = _this.itemImg) === null || _a === void 0 ? void 0 : _a.node.childrenCount) == 0) {
                    data.node.scale = 0.6;
                    _this.itemImg.node.addChild(data.node);
                }
            });
        }
        else if (this.itemImg.node.childrenCount > 0 && ((_c = this.itemImg) === null || _c === void 0 ? void 0 : _c.node.getChildByName("passive_skill_3"))) {
            for (var i = 0; i < this.itemImg.node.childrenCount; i++) {
                if (this.itemImg.node.children[i].name == "passive_skill_3") {
                    GameManager_1.gm.pool.put(this.itemImg.node.children[i]);
                    break;
                }
            }
        }
    };
    // *
    BuildIconItem.prototype.showProductNode = function () {
        var _a, _b;
        if (((_b = (_a = this._buildData) === null || _a === void 0 ? void 0 : _a.productData) === null || _b === void 0 ? void 0 : _b.productID) == 11006)
            return;
        var productData = this._buildData.productData;
        var currentTime = Math.floor(Date.now() / 1000);
        var productConfig = {
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
            var config = productConfig[productData.productID];
            this.productNode.children[1].children[1].getComponent(cc.Sprite).spriteFrame = config.spriteFrame;
            this.productNode.children[1].getComponent(cc.Animation).play();
        }
        else {
            if (currentTime >= this._buildData.productData.beginTime + this._buildData.productData.productCd || productData.curNum > 0) {
                this.productNode.active = true;
                this.productNode.children[0].active = true;
                this.productNode.children[1].active = false;
                var config = productConfig[productData.productID];
                this.productNode.children[0].getComponent(cc.Animation).play(config.animation);
            }
            this._beginTime = productData.beginTime;
            this._endTime = productData.fullTime;
            this._curTimer = currentTime;
        }
    };
    BuildIconItem.prototype.update = function (deltaTime) {
        if (this._beginTime == 0 && this._endTime == 0)
            return;
        this._timeContiner += deltaTime;
        if (this._timeContiner < 1)
            return;
        this._timeContiner--;
        this._curTimer++;
        if (this._curTimer >= this._buildData.productData.fullTime) {
            this._curTimer = 0;
            this.showProductNode();
        }
        if (this._curTimer === this._beginTime + this._buildData.productData.productCd) {
            this.showProductNode();
        }
    };
    BuildIconItem.prototype.on_move_item_move = function (event, itemType, itemID) {
        if (!GameManager_1.gm.data.mapCell_data.isGuide && itemType == Constants_1.ItemTypeEnum.ITEM_TYPE && !this.upgradeNode.active) {
            this.fullNode.active = false;
            this.upgradeNode.active = false;
            this.upgradeNodeBar.stopAllActions();
            if (2 == this._buildData.buildState) {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig) {
                    for (var o in this._buildData.metrailData) {
                        if (itemConfig.type == parseInt(o)) {
                            if (1 <= this._buildData.metrailData[o].cur / this._buildData.metrailData[o].max) {
                                this.fullNode.active = true;
                            }
                            else {
                                this.upgradeNode.active = true;
                            }
                            this.buildStateIcon.node.active = false;
                            this.moveItemType = itemConfig.type;
                            var metrailConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this._buildData.metrailData[o].id);
                            if (metrailConfig) {
                                Utils_1.Utils.async_set_sprite_frame(this.upgradeNodeSpr, Constants_1.BundleName.MAP, "res/" + metrailConfig.icon);
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
    };
    BuildIconItem.prototype.on_move_item_hide = function (event, itemType) {
        if (this._buildData || 2 == this._buildData.buildState) {
            if (this._buildCfg.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                if (0 == itemType) {
                    return;
                }
                if (this.node._hitTest(event)) {
                    GameManager_1.gm.data.mapCell_data.changeCellData(itemType, this._buildData.cellID);
                    if (GameManager_1.gm.data.mapCell_data.isGuide) {
                        return;
                    }
                    GameManager_1.gm.ui.emit("item_children_refresh", itemType);
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
    };
    BuildIconItem.prototype.refreshUpgrade = function (buildID) {
        var _this = this;
        var _a, _b, _c;
        if (!this.upgradeNode.active || buildID != ((_a = this._buildCfg) === null || _a === void 0 ? void 0 : _a.buildID))
            return;
        for (var key in (_b = this._buildData) === null || _b === void 0 ? void 0 : _b.metrailData) {
            if (this.moveItemType == parseInt(key)) {
                var currentAmount = GameManager_1.gm.data.mapCell_data.buildData[this._buildCfg.buildType].metrailData[key].cur;
                if (this.lastNum == currentAmount) {
                    this.upgradeNode.active = false;
                    this.buildStateIcon.node.active = true;
                }
                else {
                    GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_165_PUT_PROP_INTO_BUILDING);
                    this.upgradeBarLbl.string = currentAmount + "/" + this._buildData.metrailData[key].max;
                    var scale = currentAmount / this._buildData.metrailData[key].max;
                    (_c = this.upgradeNodeBar) === null || _c === void 0 ? void 0 : _c.runAction(cc.sequence(cc.scaleTo(0.3, scale, 1), cc.delayTime(0.55), cc.callFunc(function () {
                        _this.upgradeNode.active = false;
                        _this.refreshUpgradeIcon();
                    })));
                }
                return;
            }
        }
        this.upgradeNode.active = false;
        this.refreshUpgradeIcon();
    };
    BuildIconItem.prototype.refreshUpgradeIcon = function (show) {
        var _a, _b;
        if (show === void 0) { show = true; }
        this.buildStateIcon.node.active = false;
        this.fullNode.active = false;
        if (!this._buildCfg)
            return;
        if (this._buildData.buildLvl > 0) {
            if (this._buildCfg.buildType == Constants_1.BuildTypeEnum.TOWER_TYPE) {
                if (GameManager_1.gm.data.config_data.getBuildCfgByID(this._buildCfg.buildID + 1)) {
                    this.buildStateIcon.node.active = true;
                }
            }
            else {
                if (this._buildCfg.lock == GameManager_1.gm.data.mapCell_data.role_build_lock_num) {
                    var canUpgrade = true;
                    for (var i = 0; i < this._buildCfg.consume.length; i++) {
                        if (this._buildData.metrailData[this._buildCfg.consume[i]] < this._buildCfg.num[i]) {
                            canUpgrade = false;
                            break;
                        }
                    }
                    this.buildStateIcon.node.active = true;
                    this.buildStateIcon.spriteFrame = canUpgrade ? this.lockSpr[1] : this.lockSpr[0];
                    return;
                }
                var towerData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE);
                if (this._buildData.buildLvl < towerData.buildLvl && GameManager_1.gm.data.config_data.getBuildCfgByID(this._buildCfg.buildID + 1)) {
                    this.buildStateIcon.node.active = true;
                }
            }
        }
        else if (((_a = this._buildData) === null || _a === void 0 ? void 0 : _a.buildLvl) === 0 && GameManager_1.gm.data.mapCell_data.role_map_data[this._buildCfg.activeCellID]) {
            var towerData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(this._buildCfg.buildType);
            if (((_b = this._buildData) === null || _b === void 0 ? void 0 : _b.buildType) === Constants_1.BuildTypeEnum.TOWER_TYPE && towerData.buildState === 2) {
                this.buildStateIcon.node.active = true;
            }
        }
    };
    BuildIconItem.prototype.hideUpgrade = function () {
        if (this.fullNode.active) {
            this.fullNode.active = false;
            this.buildStateIcon.node.active = true;
            return;
        }
        if (this.upgradeNode.active) {
            this.upgradeNode.active = false;
            this.buildStateIcon.node.active = true;
        }
    };
    BuildIconItem.prototype.setStallRed = function () {
        this.tanhao.active = this._buildData && this._buildData.buildLvl && GameManager_1.gm.data.store_data.isFree;
    };
    BuildIconItem.prototype.onTouchStart = function () {
        this._isMove = false;
        if (this._buildCfg.buildType != Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE &&
            this._buildCfg.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE &&
            1 != GameManager_1.gm.data.fight_temp_data.open_battle_panel_state) {
            if (!GameManager_1.gm.data.mapCell_data.isGuide) {
                this._buildData.buildLvl;
            }
        }
    };
    BuildIconItem.prototype.onTouchMove = function (event) {
        if (this._buildCfg.buildType != Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE &&
            this._buildCfg.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE &&
            1 != GameManager_1.gm.data.fight_temp_data.open_battle_panel_state) {
            if (!(GameManager_1.gm.data.mapCell_data.isGuide || this._buildData.buildLvl < 1)) {
                this._isMove = true;
                if (0 < this.node.opacity) {
                    this.node.opacity = 0;
                }
                GameManager_1.gm.ui.emit("item_move", event.getLocation(), this._itemData.itemType, this._itemData.itemID);
            }
        }
    };
    BuildIconItem.prototype.playScaleAnim = function () {
        this.node.stopAllActions();
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.4, 0.75), cc.scaleTo(0.4, 0.95))));
    };
    BuildIconItem.prototype.stopScaleAnim = function () {
        this.node.stopAllActions();
        this.node.scale = 1;
    };
    BuildIconItem.prototype.onTouchEnd = function () {
        if (this._buildData.buildLvl < 1 || this._buildCfg.buildType != Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
            this.node.opacity = 255;
            GameManager_1.gm.ui.mapMainUI.hideMoveBuildItemNode();
            this.onClickBuild();
        }
    };
    BuildIconItem.prototype.onTouchCancel = function (event) {
        if (this._buildCfg.buildType != Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE &&
            this._buildCfg.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE &&
            1 != GameManager_1.gm.data.fight_temp_data.open_battle_panel_state) {
            if (!(GameManager_1.gm.data.mapCell_data.isGuide || this._buildData.buildLvl < 1)) {
                this.node.opacity = 255;
                GameManager_1.gm.ui.mapMainUI.hideMoveBuildItemNode();
                GameManager_1.gm.ui.emit("item_move_end", event.getLocation(), this._itemData.cellID);
            }
        }
    };
    BuildIconItem.prototype.onClickBuild = function () {
        var _a;
        if (this._buildCfg.buildLv <= 0 || GameManager_1.gm.data.mapCell_data.isGuide)
            return;
        var buildActions = (_a = {},
            _a[Constants_1.BuildTypeEnum.BARRACKS_TYPE] = function () { return GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BARRACKS_LIST); },
            _a[Constants_1.BuildTypeEnum.STALL_TYPE] = function () { return GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Store); },
            _a[Constants_1.BuildTypeEnum.GARRISION_TYPE] = function () { return GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.DEFENSE); },
            _a);
        var action = buildActions[this._buildCfg.buildType];
        if (action) {
            action();
        }
        else {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BUILDINFO.key, this._buildCfg.buildID);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BUILDINFO);
        }
    };
    BuildIconItem.prototype.onClickShip = function (event, shipID) {
        var id = parseInt(shipID);
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, id);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
    };
    BuildIconItem.prototype.onClickItem = function () {
        this._buildCfg.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE && GameManager_1.gm.data.mapCell_data.role_compose_total_times < 9 ||
            GameManager_1.gm.ui.mapMainUI.showBuildUpgrade(this._buildData.buildID, this._buildData.cellID);
    };
    BuildIconItem.prototype.onClickCoin = function () {
        GameManager_1.gm.data.mapCell_data.getBuildProduct(this._buildCfg.buildType);
        this.showProductNode();
        if (11002 == this._buildData.productData.productID) {
            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.productNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
        }
    };
    BuildIconItem.prototype.onDisable = function () {
        var _a, _b, _c;
        (_a = this.clickNode) === null || _a === void 0 ? void 0 : _a.targetOff(this);
        GameManager_1.gm.ui.off("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.off("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.off("item_move_hide_upgrade", this.hideUpgrade, this);
        GameManager_1.gm.ui.off("build_metarail_change", this.refreshUpgrade, this);
        GameManager_1.gm.ui.off("build_show_stateIcon", this.refreshUpgradeIcon, this);
        if (((_b = this._buildCfg) === null || _b === void 0 ? void 0 : _b.buildType) == Constants_1.BuildTypeEnum.STALL_TYPE) {
            GameManager_1.gm.ui.off("refresh_red_tips_stall", this.setStallRed, this);
        }
        else if (((_c = this._buildCfg) === null || _c === void 0 ? void 0 : _c.buildType) == Constants_1.BuildTypeEnum.TOWER_TYPE) {
            GameManager_1.gm.ui.off("build_show_towerBuff", this.showDefenseIcon, this);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BuildIconItem.prototype, "itemImg", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BuildIconItem.prototype, "lockSpr", void 0);
    __decorate([
        property(cc.Label)
    ], BuildIconItem.prototype, "lblLvl", void 0);
    __decorate([
        property(cc.Sprite)
    ], BuildIconItem.prototype, "buildStateIcon", void 0);
    __decorate([
        property(cc.Node)
    ], BuildIconItem.prototype, "productNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BuildIconItem.prototype, "fullImg", void 0);
    __decorate([
        property(cc.Node)
    ], BuildIconItem.prototype, "tanhao", void 0);
    __decorate([
        property(cc.Node)
    ], BuildIconItem.prototype, "clickNode", void 0);
    __decorate([
        property(cc.Node)
    ], BuildIconItem.prototype, "upgradeNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], BuildIconItem.prototype, "upgradeNodeSpr", void 0);
    __decorate([
        property(cc.Node)
    ], BuildIconItem.prototype, "upgradeNodeBar", void 0);
    __decorate([
        property(cc.Label)
    ], BuildIconItem.prototype, "upgradeBarLbl", void 0);
    __decorate([
        property(cc.Node)
    ], BuildIconItem.prototype, "fullNode", void 0);
    BuildIconItem = __decorate([
        ccclass
    ], BuildIconItem);
    return BuildIconItem;
}(cc.Component));
exports.default = BuildIconItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJ1aWxkSWNvbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFFOUMseUNBQW9GO0FBRzlFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBc0RuRDtRQUFBLFlBQ0ksaUJBQU8sU0EwQlY7UUF6QkcsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLFVBQVUsR0FB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IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBNYXBJdGVtRGF0YVZPLCBCdWlsZERhdGEgfSBmcm9tIFwiLi9NYXBDZWxsQ2ZnRGF0YVwiXHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUsIEJ1aWxkVHlwZUVudW0sIEl0ZW1UeXBlRW51bSwgUmV3YXJkSWRFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBCdWlsZCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9idWlsZFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1aWxkSWNvbkl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHB1YmxpYyBpdGVtSW1nOiBjYy5TcHJpdGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBsb2NrU3ByOiBjYy5TcHJpdGVGcmFtZVtdIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibEx2bDogY2MuTGFiZWwgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwdWJsaWMgYnVpbGRTdGF0ZUljb246IGNjLlNwcml0ZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgcHJvZHVjdE5vZGU6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBmdWxsSW1nOiBjYy5TcHJpdGVGcmFtZVtdIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdGFuaGFvOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2xpY2tOb2RlOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdXBncmFkZU5vZGU6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHVwZ3JhZGVOb2RlU3ByOiBjYy5TcHJpdGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB1cGdyYWRlTm9kZUJhcjogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSB1cGdyYWRlQmFyTGJsOiBjYy5MYWJlbCB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGZ1bGxOb2RlOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9pc01vdmU6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9wYXJlbnQ6IG9iamVjdDtcclxuICAgIHByaXZhdGUgX2l0ZW1EYXRhOiBNYXBJdGVtRGF0YVZPO1xyXG4gICAgcHJpdmF0ZSBfYnVpbGREYXRhOiBCdWlsZERhdGE7XHJcbiAgICBwcml2YXRlIF9idWlsZENmZzogQnVpbGQ7XHJcbiAgICBwcml2YXRlIF9iZWdpblRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2VuZFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3RpbWVDb250aW5lcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY3VyVGltZXI6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIG1vdmVJdGVtVHlwZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsYXN0TnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGZ1bGxUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLml0ZW1JbWcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9ja1NwciA9IFtdO1xyXG4gICAgICAgIHRoaXMubGJsTHZsID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2R1Y3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZ1bGxJbWcgPSBbXTtcclxuICAgICAgICB0aGlzLnRhbmhhbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudXBncmFkZU5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudXBncmFkZU5vZGVTcHIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudXBncmFkZU5vZGVCYXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudXBncmFkZUJhckxibCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5mdWxsTm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faXNNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pdGVtRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYnVpbGREYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9idWlsZENmZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYmVnaW5UaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9lbmRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lQ29udGluZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuX2N1clRpbWVyID0gMDtcclxuICAgICAgICB0aGlzLm1vdmVJdGVtVHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0TnVtID0gMDtcclxuICAgICAgICB0aGlzLmZ1bGxUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAqXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoaXRlbURhdGE6IE1hcEl0ZW1EYXRhVk8pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pdGVtRGF0YSA9IGl0ZW1EYXRhO1xyXG4gICAgICAgIHRoaXMuX2J1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5faXRlbURhdGEuaXRlbUlEKTtcclxuICAgICAgICBpZiAodGhpcy5fYnVpbGRDZmcpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtSW1nLm5vZGUueCA9IHRoaXMuX2J1aWxkQ2ZnLnhvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUltZy5ub2RlLnkgPSB0aGlzLl9idWlsZENmZy5vZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZSh0aGlzLl9idWlsZENmZy5idWlsZFR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLmxibEx2bC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnVpbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibEx2bC5zdHJpbmcgPSBcIlwiICsgdGhpcy5fYnVpbGREYXRhLmJ1aWxkTHZsO1xyXG4gICAgICAgICAgICAgICAgaWYgKFwiXCIgPT0gdGhpcy5fYnVpbGRDZmcuYW5pbV9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwicmVzL2J1aWxkL1wiICsgdGhpcy5fYnVpbGRDZmcubW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLml0ZW1JbWcsIEJ1bmRsZU5hbWUuTUFQLCBwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLml0ZW1JbWcubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbUltZy5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5pdGVtSW1nLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuTUFQLCBcInByZWZhYnMvXCIgKyB0aGlzLl9idWlsZENmZy5hbmltX25hbWUsIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy5pdGVtSW1nLm5vZGUuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtSW1nLm5vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJzdGF5XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWdpblRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVpbGREYXRhLnByb2R1Y3REYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGFuaGFvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhbmhhby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uU1RBTExfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFsbFJlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFVwZ3JhZGVJY29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vICpcclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vbihcIml0ZW1fbW92ZVwiLCB0aGlzLm9uX21vdmVfaXRlbV9tb3ZlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcIml0ZW1fbW92ZV9lbmRcIiwgdGhpcy5vbl9tb3ZlX2l0ZW1faGlkZSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub24oXCJpdGVtX21vdmVfaGlkZV91cGdyYWRlXCIsIHRoaXMuaGlkZVVwZ3JhZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIHRoaXMucmVmcmVzaFVwZ3JhZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiYnVpbGRfc2hvd19zdGF0ZUljb25cIiwgdGhpcy5yZWZyZXNoVXBncmFkZUljb24sIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uU1RBTExfVFlQRSkge1xyXG4gICAgICAgICAgICBnbS51aS5vbihcInJlZnJlc2hfcmVkX3RpcHNfc3RhbGxcIiwgdGhpcy5zZXRTdGFsbFJlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhbGxSZWQoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9idWlsZENmZz8uYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRSkge1xyXG4gICAgICAgICAgICBnbS51aS5vbihcImJ1aWxkX3Nob3dfdG93ZXJCdWZmXCIsIHRoaXMuc2hvd0RlZmVuc2VJY29uLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGVmZW5zZUljb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnVsbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gKlxyXG4gICAgcHJpdmF0ZSBzaG93RGVmZW5zZUljb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnPy5idWlsZFR5cGUgIT0gQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldElzSGVyb1Rvd2VyQnVmZigpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLml0ZW1JbWcubm9kZS5jaGlsZHJlbkNvdW50ID4gMCAmJiB0aGlzLml0ZW1JbWc/Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwYXNzaXZlX3NraWxsXzNcIikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL3Bhc3NpdmVfc2tpbGxfM1wiLCBOb2RlUG9vbEl0ZW0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1JbWc/Lm5vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlLnNjYWxlID0gMC42O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbUltZy5ub2RlLmFkZENoaWxkKGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pdGVtSW1nLm5vZGUuY2hpbGRyZW5Db3VudCA+IDAgJiYgdGhpcy5pdGVtSW1nPy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFzc2l2ZV9za2lsbF8zXCIpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtSW1nLm5vZGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtSW1nLm5vZGUuY2hpbGRyZW5baV0ubmFtZSA9PSBcInBhc3NpdmVfc2tpbGxfM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQodGhpcy5pdGVtSW1nLm5vZGUuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vICpcclxuICAgIHByaXZhdGUgc2hvd1Byb2R1Y3ROb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9idWlsZERhdGE/LnByb2R1Y3REYXRhPy5wcm9kdWN0SUQgPT0gMTEwMDYpIHJldHVybjtcclxuICAgICAgICBjb25zdCBwcm9kdWN0RGF0YSA9IHRoaXMuX2J1aWxkRGF0YS5wcm9kdWN0RGF0YTtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RDb25maWcgPSB7XHJcbiAgICAgICAgICAgIDExMDAyOiB7IGFuaW1hdGlvbjogXCJzdXBwbGllc19nb2xkXCIsIHNwcml0ZUZyYW1lOiB0aGlzLmZ1bGxJbWdbMF0gfSxcclxuICAgICAgICAgICAgMTYwMDE6IHsgYW5pbWF0aW9uOiBcInN1cHBsaWVzX3dvb2RcIiwgc3ByaXRlRnJhbWU6IHRoaXMuZnVsbEltZ1sxXSB9LFxyXG4gICAgICAgICAgICAxNzAwMTogeyBhbmltYXRpb246IFwic3VwcGxpZXNfbWluZXJhbFwiLCBzcHJpdGVGcmFtZTogdGhpcy5mdWxsSW1nWzJdIH0sXHJcbiAgICAgICAgICAgIDIyMDAxOiB7IGFuaW1hdGlvbjogXCJzdXBwbGllc19odW5cIiwgc3ByaXRlRnJhbWU6IHRoaXMuZnVsbEltZ1szXSB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IHByb2R1Y3REYXRhLmZ1bGxUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlZ2luVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHByb2R1Y3RDb25maWdbcHJvZHVjdERhdGEucHJvZHVjdElEXTtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0Tm9kZS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGNvbmZpZy5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0Tm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IHRoaXMuX2J1aWxkRGF0YS5wcm9kdWN0RGF0YS5iZWdpblRpbWUgKyB0aGlzLl9idWlsZERhdGEucHJvZHVjdERhdGEucHJvZHVjdENkIHx8IHByb2R1Y3REYXRhLmN1ck51bSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSBwcm9kdWN0Q29uZmlnW3Byb2R1Y3REYXRhLnByb2R1Y3RJRF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3ROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoY29uZmlnLmFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYmVnaW5UaW1lID0gcHJvZHVjdERhdGEuYmVnaW5UaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRUaW1lID0gcHJvZHVjdERhdGEuZnVsbFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clRpbWVyID0gY3VycmVudFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYmVnaW5UaW1lID09IDAgJiYgdGhpcy5fZW5kVGltZSA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fdGltZUNvbnRpbmVyICs9IGRlbHRhVGltZTtcclxuICAgICAgICBpZiAodGhpcy5fdGltZUNvbnRpbmVyIDwgMSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3RpbWVDb250aW5lci0tO1xyXG4gICAgICAgIHRoaXMuX2N1clRpbWVyKys7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1clRpbWVyID49IHRoaXMuX2J1aWxkRGF0YS5wcm9kdWN0RGF0YS5mdWxsVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJUaW1lciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3ROb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJUaW1lciA9PT0gdGhpcy5fYmVnaW5UaW1lICsgdGhpcy5fYnVpbGREYXRhLnByb2R1Y3REYXRhLnByb2R1Y3RDZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0Tm9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX21vdmVfaXRlbV9tb3ZlKGV2ZW50OiBjYy5WZWMyLCBpdGVtVHlwZTogSXRlbVR5cGVFbnVtLCBpdGVtSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSAmJiBpdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmICF0aGlzLnVwZ3JhZGVOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVOb2RlQmFyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGlmICgyID09IHRoaXMuX2J1aWxkRGF0YS5idWlsZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvIGluIHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZy50eXBlID09IHBhcnNlSW50KG8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA8PSB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbb10uY3VyIC8gdGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhW29dLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0ZUljb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1UeXBlID0gaXRlbUNvbmZpZy50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldHJhaWxDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtvXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0cmFpbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy51cGdyYWRlTm9kZVNwciwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL1wiICsgbWV0cmFpbENvbmZpZy5pY29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZUJhckxibC5zdHJpbmcgPSB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbb10uY3VyICsgXCIvXCIgKyB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbb10ubWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlTm9kZUJhci5zY2FsZVggPSB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbb10uY3VyIC8gdGhpcy5fYnVpbGREYXRhLm1ldHJhaWxEYXRhW29dLm1heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE51bSA9IHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtvXS5jdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlSXRlbVR5cGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fbW92ZV9pdGVtX2hpZGUoZXZlbnQ6IGNjLlZlYzIsIGl0ZW1UeXBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVpbGREYXRhIHx8IDIgPT0gdGhpcy5fYnVpbGREYXRhLmJ1aWxkU3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSBpdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLl9oaXRUZXN0KGV2ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmNoYW5nZUNlbGxEYXRhKGl0ZW1UeXBlLCB0aGlzLl9idWlsZERhdGEuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgaXRlbVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5mdWxsTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVcGdyYWRlSWNvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy51cGdyYWRlTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgwID09IGl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB2b2lkIHRoaXMucmVmcmVzaFVwZ3JhZGVJY29uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUuX2hpdFRlc3QoZXZlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB2b2lkIHRoaXMucmVmcmVzaFVwZ3JhZGVJY29uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYSBpbiB0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlSXRlbVR5cGUgPT0gcGFyc2VJbnQoYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVcGdyYWRlSWNvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFVwZ3JhZGUoYnVpbGRJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVwZ3JhZGVOb2RlLmFjdGl2ZSB8fCBidWlsZElEICE9IHRoaXMuX2J1aWxkQ2ZnPy5idWlsZElEKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fYnVpbGREYXRhPy5tZXRyYWlsRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZlSXRlbVR5cGUgPT0gcGFyc2VJbnQoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEFtb3VudCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVt0aGlzLl9idWlsZENmZy5idWlsZFR5cGVdLm1ldHJhaWxEYXRhW2tleV0uY3VyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdE51bSA9PSBjdXJyZW50QW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTY1X1BVVF9QUk9QX0lOVE9fQlVJTERJTkcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZUJhckxibC5zdHJpbmcgPSBgJHtjdXJyZW50QW1vdW50fS8ke3RoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtrZXldLm1heH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gY3VycmVudEFtb3VudCAvIHRoaXMuX2J1aWxkRGF0YS5tZXRyYWlsRGF0YVtrZXldLm1heDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVOb2RlQmFyPy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIHNjYWxlLCAxKSwgY2MuZGVsYXlUaW1lKDAuNTUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVwZ3JhZGVJY29uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZ3JhZGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVwZ3JhZGVJY29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoVXBncmFkZUljb24oc2hvdzogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mdWxsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1aWxkQ2ZnKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1aWxkRGF0YS5idWlsZEx2bCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRCh0aGlzLl9idWlsZENmZy5idWlsZElEICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWlsZENmZy5sb2NrID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfYnVpbGRfbG9ja19udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FuVXBncmFkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9idWlsZENmZy5jb25zdW1lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWlsZERhdGEubWV0cmFpbERhdGFbdGhpcy5fYnVpbGRDZmcuY29uc3VtZVtpXV0gPCB0aGlzLl9idWlsZENmZy5udW1baV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhblVwZ3JhZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0ZUljb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0ZUljb24uc3ByaXRlRnJhbWUgPSBjYW5VcGdyYWRlID8gdGhpcy5sb2NrU3ByWzFdIDogdGhpcy5sb2NrU3ByWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvd2VyRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1aWxkRGF0YS5idWlsZEx2bCA8IHRvd2VyRGF0YS5idWlsZEx2bCAmJiBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRCh0aGlzLl9idWlsZENmZy5idWlsZElEICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYnVpbGREYXRhPy5idWlsZEx2bCA9PT0gMCAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW3RoaXMuX2J1aWxkQ2ZnLmFjdGl2ZUNlbGxJRF0pIHtcclxuICAgICAgICAgICAgY29uc3QgdG93ZXJEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkVHlwZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWlsZERhdGE/LmJ1aWxkVHlwZSA9PT0gQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFICYmIHRvd2VyRGF0YS5idWlsZFN0YXRlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVVcGdyYWRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZ1bGxOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdGVJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy51cGdyYWRlTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFN0YXRlSWNvbi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3RhbGxSZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YW5oYW8uYWN0aXZlID0gdGhpcy5fYnVpbGREYXRhICYmIHRoaXMuX2J1aWxkRGF0YS5idWlsZEx2bCAmJiBnbS5kYXRhLnN0b3JlX2RhdGEuaXNGcmVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub3VjaFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9idWlsZENmZy5idWlsZFR5cGUgIT0gQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9idWlsZENmZy5idWlsZFR5cGUgIT0gQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFICYmXHJcbiAgICAgICAgICAgIDEgIT0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEub3Blbl9iYXR0bGVfcGFuZWxfc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZERhdGEuYnVpbGRMdmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoTW92ZShldmVudDogY2MuVG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRSAmJlxyXG4gICAgICAgICAgICAxICE9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm9wZW5fYmF0dGxlX3BhbmVsX3N0YXRlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIShnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlIHx8IHRoaXMuX2J1aWxkRGF0YS5idWlsZEx2bCA8IDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc01vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKDAgPCB0aGlzLm5vZGUub3BhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX21vdmVcIiwgZXZlbnQuZ2V0TG9jYXRpb24oKSwgdGhpcy5faXRlbURhdGEuaXRlbVR5cGUsIHRoaXMuX2l0ZW1EYXRhLml0ZW1JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlTY2FsZUFuaW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC40LCAwLjc1KSwgY2Muc2NhbGVUbygwLjQsIDAuOTUpKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wU2NhbGVBbmltKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9idWlsZERhdGEuYnVpbGRMdmwgPCAxIHx8IHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkVHlwZSAhPSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuaGlkZU1vdmVCdWlsZEl0ZW1Ob2RlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGlja0J1aWxkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub3VjaENhbmNlbChldmVudDogY2MuVG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUgJiZcclxuICAgICAgICAgICAgdGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRSAmJlxyXG4gICAgICAgICAgICAxICE9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm9wZW5fYmF0dGxlX3BhbmVsX3N0YXRlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIShnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlIHx8IHRoaXMuX2J1aWxkRGF0YS5idWlsZEx2bCA8IDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5oaWRlTW92ZUJ1aWxkSXRlbU5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX21vdmVfZW5kXCIsIGV2ZW50LmdldExvY2F0aW9uKCksIHRoaXMuX2l0ZW1EYXRhLmNlbGxJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQnVpbGQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkTHYgPD0gMCB8fCBnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYnVpbGRBY3Rpb25zID0ge1xyXG4gICAgICAgICAgICBbQnVpbGRUeXBlRW51bS5CQVJSQUNLU19UWVBFXTogKCkgPT4gZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuQkFSUkFDS1NfTElTVCksXHJcbiAgICAgICAgICAgIFtCdWlsZFR5cGVFbnVtLlNUQUxMX1RZUEVdOiAoKSA9PiBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5TdG9yZSksXHJcbiAgICAgICAgICAgIFtCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFXTogKCkgPT4gZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuREVGRU5TRSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBhY3Rpb24gPSBidWlsZEFjdGlvbnNbdGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlXTtcclxuICAgICAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5CVUlMRElORk8ua2V5LCB0aGlzLl9idWlsZENmZy5idWlsZElEKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuQlVJTERJTkZPKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2tTaGlwKGV2ZW50OiBjYy5Ub3VjaCwgc2hpcElEOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHNoaXBJRCk7XHJcbiAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdPQkFUVExFLmtleSwgaWQpO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdPQkFUVExFKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbGlja0l0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUgJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzIDwgOSB8fFxyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuc2hvd0J1aWxkVXBncmFkZSh0aGlzLl9idWlsZERhdGEuYnVpbGRJRCwgdGhpcy5fYnVpbGREYXRhLmNlbGxJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2tDb2luKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkUHJvZHVjdCh0aGlzLl9idWlsZENmZy5idWlsZFR5cGUpO1xyXG4gICAgICAgIHRoaXMuc2hvd1Byb2R1Y3ROb2RlKCk7XHJcbiAgICAgICAgaWYgKDExMDAyID09IHRoaXMuX2J1aWxkRGF0YS5wcm9kdWN0RGF0YS5wcm9kdWN0SUQpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uR09MRCwgdGhpcy5wcm9kdWN0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGU/LnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJpdGVtX21vdmVcIiwgdGhpcy5vbl9tb3ZlX2l0ZW1fbW92ZSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiaXRlbV9tb3ZlX2VuZFwiLCB0aGlzLm9uX21vdmVfaXRlbV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJpdGVtX21vdmVfaGlkZV91cGdyYWRlXCIsIHRoaXMuaGlkZVVwZ3JhZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hVcGdyYWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJidWlsZF9zaG93X3N0YXRlSWNvblwiLCB0aGlzLnJlZnJlc2hVcGdyYWRlSWNvbiwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnPy5idWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5TVEFMTF9UWVBFKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLm9mZihcInJlZnJlc2hfcmVkX3RpcHNfc3RhbGxcIiwgdGhpcy5zZXRTdGFsbFJlZCwgdGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9idWlsZENmZz8uYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRSkge1xyXG4gICAgICAgICAgICBnbS51aS5vZmYoXCJidWlsZF9zaG93X3Rvd2VyQnVmZlwiLCB0aGlzLnNob3dEZWZlbnNlSWNvbiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==