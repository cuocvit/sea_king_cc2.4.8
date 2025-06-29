"use strict";
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