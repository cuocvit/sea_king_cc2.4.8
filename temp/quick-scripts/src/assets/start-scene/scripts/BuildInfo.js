"use strict";
cc._RF.push(module, '2a20220aBVMz6Z8nxKF5Lhd', 'BuildInfo');
// start-scene/scripts/BuildInfo.ts

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
// +-+
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuildInfo = /** @class */ (function (_super) {
    __extends(BuildInfo, _super);
    function BuildInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblBuildName = null;
        _this.lblBuildLvl = null;
        _this.attrNode = [];
        _this.btnGet = null;
        _this.lblnum = null;
        _this.productIconSpr = null;
        _this.btnSprframeList = [];
        _this._buildCfg = null;
        _this._buildID = 0;
        _this._reciveTime = 0;
        _this._curProductNum = 0;
        _this.timeContainer = 0;
        return _this;
    }
    BuildInfo.prototype.onEnable = function () {
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_8_BUILDING_OPEN_CLOSE);
        this._buildID = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.BUILDINFO.key);
        this._buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this._buildID);
        if (this._buildCfg) {
            this.lblBuildName.string = this._buildCfg.buildName;
            this.lblBuildLvl.string = "  Lv." + this._buildCfg.buildLv;
            this.refreshPanel();
        }
    };
    BuildInfo.prototype.refreshPanel = function () {
        for (var index = 0; index < this.attrNode.length; index++) {
            this.attrNode[index].active = false;
        }
        this.btnGet.active = false;
        if (0 < this._buildCfg.currency && 2 <= this._buildCfg.rate.length) {
            var cfgByID = GameManager_1.gm.data.config_data.getItemCfgByID(this._buildCfg.currency);
            if (cfgByID) {
                this.attrNode[0].active = true;
                this.attrNode[0].children[1].getComponent(cc.Label).string = Utils_1.Utils.format_time(this._buildCfg.rate[1]);
                this.attrNode[0].children[2].getComponent(cc.Label).string = "Sản xuất " + this._buildCfg.rate[0] + " " + cfgByID.name;
                Utils_1.Utils.async_set_sprite_frame(this.attrNode[0].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_Time");
                this.attrNode[1].active = true;
                this.attrNode[1].children[1].getComponent(cc.Label).string = "0/" + this._buildCfg.capacity;
                this.attrNode[1].children[2].getComponent(cc.Label).string = "Lưu trữ tối đa";
                var currency = this._buildCfg.currency;
                if (cfgByID.type == Constants_1.PropTypeEnum.WOOD_TYPE) {
                    currency = 11004;
                }
                else if (cfgByID.type == Constants_1.PropTypeEnum.IRON_TYPE) {
                    (currency = 11005);
                }
                Utils_1.Utils.async_set_sprite_frame(this.attrNode[1].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/" + currency);
                this.attrNode[2].active = true;
                this.attrNode[2].children[1].getComponent(cc.Label).string = this._buildCfg.hp + "";
                this.attrNode[2].children[2].getComponent(cc.Label).string = "Sinh mạng";
                Utils_1.Utils.async_set_sprite_frame(this.attrNode[2].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_HP");
                this._reciveTime = 0;
                this._curProductNum = 0;
                var productData = GameManager_1.gm.data.mapCell_data.buildData[this._buildCfg.buildType].productData;
                if (productData) {
                    if (0 == productData.fullTime) {
                        this._curProductNum = productData.curNum;
                    }
                    else if (productData.fullTime > Math.floor(Date.now() / 1e3)) {
                        if (productData.beginTime + productData.productCd > Math.floor(Date.now() / 1e3)) {
                            this._curProductNum = productData.curNum;
                            this._reciveTime = productData.beginTime + productData.productCd - Math.floor(Date.now() / 1e3);
                        }
                        else {
                            var _number = Math.floor((Math.floor(Date.now() / 1e3) - productData.beginTime) / productData.productCd);
                            this._curProductNum = _number * productData.productNum;
                            this._reciveTime = productData.beginTime + (_number + 1) * productData.productCd - Math.floor(Date.now() / 1e3);
                        }
                    }
                    else {
                        this._curProductNum = productData.maxNum;
                    }
                }
                if (this._buildCfg.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE) {
                    this.btnGet.active = true;
                    this.btnGet.children[0].getComponent(cc.Sprite).spriteFrame = 0 < this._curProductNum ? this.btnSprframeList[0] : this.btnSprframeList[1];
                    this.btnGet.children[0].getComponent(cc.Button).interactable = 0 < this._curProductNum;
                    Utils_1.Utils.async_set_sprite_frame(this.productIconSpr, Constants_1.BundleName.MAP, "res/" + this._buildCfg.currency);
                    this.attrNode[1].children[1].getComponent(cc.Label).string = this._curProductNum + "/" + this._buildCfg.capacity;
                    this.lblnum.string = "" + this._curProductNum;
                }
                else {
                    var roleBarrelData = GameManager_1.gm.data.mapCell_data.roleBarrelData;
                    if (roleBarrelData) {
                        this.attrNode[1].children[1].getComponent(cc.Label).string = roleBarrelData.curBarrelNum + "/" + this._buildCfg.capacity;
                        if (roleBarrelData.curBarrelNum < roleBarrelData.maxBarrelNum && Math.floor(Date.now() / 1e3) < roleBarrelData.nextFreeBarrelTime) {
                            this._reciveTime = roleBarrelData.nextFreeBarrelTime - Math.floor(Date.now() / 1e3);
                        }
                    }
                    this.attrNode[1].children[1].getComponent(cc.Label).string = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum + "/" + GameManager_1.gm.data.mapCell_data.roleBarrelData.maxBarrelNum;
                }
            }
        }
        else if (this._buildCfg.buildType == Constants_1.BuildTypeEnum.TOWER_TYPE) {
            this._reciveTime = 0;
            this.attrNode[0].active = 0 < this._buildCfg.hp;
            Utils_1.Utils.async_set_sprite_frame(this.attrNode[0].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_HP");
            this.attrNode[0].children[1].getComponent(cc.Label).string = this._buildCfg.hp + "";
            this.attrNode[0].children[2].getComponent(cc.Label).string = "Sinh mạng";
            this.attrNode[1].active = 0 < this._buildCfg.attack;
            Utils_1.Utils.async_set_sprite_frame(this.attrNode[1].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_Defense");
            this.attrNode[1].children[1].getComponent(cc.Label).string = this._buildCfg.attack + "";
            this.attrNode[1].children[2].getComponent(cc.Label).string = "Phòng thủ";
            this.attrNode[2].active = 0 < this._buildCfg.defense;
            Utils_1.Utils.async_set_sprite_frame(this.attrNode[2].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/Perk_Attackers");
            this.attrNode[2].children[1].getComponent(cc.Label).string = this._buildCfg.defense + "";
            this.attrNode[2].children[2].getComponent(cc.Label).string = "Tấn công";
        }
    };
    BuildInfo.prototype.update = function (dt) {
        if (0 < this._reciveTime) {
            this.timeContainer += dt;
            if (1 <= this.timeContainer) {
                --this.timeContainer;
                this._reciveTime--;
                if (this._reciveTime <= 0) {
                    if (this._buildCfg.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE) {
                        this._curProductNum = 0;
                        var productData = GameManager_1.gm.data.mapCell_data.buildData[this._buildCfg.buildType].productData;
                        if (productData) {
                            if (0 == productData.fullTime) {
                                this._curProductNum = productData.curNum;
                            }
                            else if (productData.fullTime > Math.floor(Date.now() / 1e3)) {
                                if (productData.beginTime + productData.productCd > Math.floor(Date.now() / 1e3)) {
                                    this._curProductNum = productData.curNum;
                                    this._reciveTime = productData.beginTime + productData.productCd - Math.floor(Date.now() / 1e3);
                                }
                                else {
                                    var _number = Math.floor((Math.floor(Date.now() / 1e3) - productData.beginTime) / productData.productCd);
                                    this._curProductNum = _number * productData.productNum;
                                    this._reciveTime = productData.beginTime + (_number + 1) * productData.productCd - Math.floor(Date.now() / 1e3);
                                }
                            }
                            else {
                                this._curProductNum = productData.maxNum;
                            }
                        }
                        this.attrNode[1].children[1].getComponent(cc.Label).string = this._curProductNum + "/" + this._buildCfg.capacity;
                        this.lblnum.string = "" + this._curProductNum;
                    }
                    else {
                        this._curProductNum = 0;
                        var roleBarrelData = GameManager_1.gm.data.mapCell_data.roleBarrelData;
                        if (roleBarrelData) {
                            this.attrNode[1].children[1].getComponent(cc.Label).string = roleBarrelData.curBarrelNum + "/" + this._buildCfg.capacity;
                            if (roleBarrelData.curBarrelNum < roleBarrelData.maxBarrelNum && Math.floor(Date.now() / 1e3) < roleBarrelData.nextFreeBarrelTime) {
                                this._reciveTime = roleBarrelData.nextFreeBarrelTime - Math.floor(Date.now() / 1e3);
                            }
                        }
                    }
                    if (0 < this._reciveTime) {
                        this.attrNode[0].children[1].getComponent(cc.Label).string = Utils_1.Utils.format_time(this._reciveTime);
                    }
                    else {
                        this.attrNode[0].children[1].getComponent(cc.Label).string = Utils_1.Utils.format_time(this._buildCfg.rate[1]);
                    }
                }
                else {
                    this.attrNode[0].children[1].getComponent(cc.Label).string = Utils_1.Utils.format_time(this._reciveTime);
                }
            }
        }
    };
    BuildInfo.prototype.onClickClose = function () {
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_8_BUILDING_OPEN_CLOSE);
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BUILDINFO);
    };
    BuildInfo.prototype.onClickGet = function () {
        var _a, _b;
        GameManager_1.gm.data.mapCell_data.getBuildProduct((_a = this._buildCfg) === null || _a === void 0 ? void 0 : _a.buildType);
        this.refreshPanel();
        GameManager_1.gm.ui.show_coin_fly((_b = this._buildCfg) === null || _b === void 0 ? void 0 : _b.currency, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
        GameManager_1.gm.ui.emit("item_children_refresh", GameManager_1.gm.data.mapCell_data.buildData[this._buildCfg.buildType].cellID);
    };
    BuildInfo.prototype.onDisable = function () { };
    __decorate([
        property(cc.Label)
    ], BuildInfo.prototype, "lblBuildName", void 0);
    __decorate([
        property(cc.Label)
    ], BuildInfo.prototype, "lblBuildLvl", void 0);
    __decorate([
        property([cc.Node])
    ], BuildInfo.prototype, "attrNode", void 0);
    __decorate([
        property(cc.Node)
    ], BuildInfo.prototype, "btnGet", void 0);
    __decorate([
        property(cc.Label)
    ], BuildInfo.prototype, "lblnum", void 0);
    __decorate([
        property(cc.Sprite)
    ], BuildInfo.prototype, "productIconSpr", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BuildInfo.prototype, "btnSprframeList", void 0);
    BuildInfo = __decorate([
        ccclass
    ], BuildInfo);
    return BuildInfo;
}(cc.Component));
exports.default = BuildInfo;

cc._RF.pop();