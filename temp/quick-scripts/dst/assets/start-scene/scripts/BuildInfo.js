
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BuildInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJ1aWxkSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04saUNBQWdDO0FBQ2hDLHlDQUFzRTtBQUN0RSw2Q0FBbUM7QUFHN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0IsNkJBQVk7SUFBcEM7UUFBQSxxRUFnTUM7UUE5TFcsa0JBQVksR0FBb0IsSUFBSSxDQUFDO1FBR3JDLGlCQUFXLEdBQW9CLElBQUksQ0FBQztRQUdwQyxjQUFRLEdBQWMsRUFBRSxDQUFDO1FBR3pCLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBRzlCLFlBQU0sR0FBb0IsSUFBSSxDQUFDO1FBRy9CLG9CQUFjLEdBQXFCLElBQUksQ0FBQztRQUd4QyxxQkFBZSxHQUFxQixFQUFFLENBQUM7UUFFdkMsZUFBUyxHQUFpQixJQUFJLENBQUM7UUFDL0IsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixvQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUFzS3RDLENBQUM7SUFwS2EsNEJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFXLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENB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LFNBQVMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBQcm9wVHlwZUVudW0sIEJ1bmRsZU5hbWUsIEJ1aWxkVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEJ1aWxkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2J1aWxkXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgQnVpbGRJbmZvIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsQnVpbGROYW1lOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsQnVpbGRMdmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgYXR0ck5vZGU6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5HZXQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibG51bTogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBwcm9kdWN0SWNvblNwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBwcml2YXRlIGJ0blNwcmZyYW1lTGlzdDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2J1aWxkQ2ZnOiBCdWlsZCB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnVpbGRJRDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3JlY2l2ZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9jdXJQcm9kdWN0TnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB0aW1lQ29udGFpbmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT184X0JVSUxESU5HX09QRU5fQ0xPU0UpO1xyXG4gICAgICAgIHRoaXMuX2J1aWxkSUQgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuQlVJTERJTkZPLmtleSkgYXMgbnVtYmVyO1xyXG4gICAgICAgIHRoaXMuX2J1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5fYnVpbGRJRCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQnVpbGROYW1lLnN0cmluZyA9IHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5sYmxCdWlsZEx2bC5zdHJpbmcgPSBcIiAgTHYuXCIgKyB0aGlzLl9idWlsZENmZy5idWlsZEx2O1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5hdHRyTm9kZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVtpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnRuR2V0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICgwIDwgdGhpcy5fYnVpbGRDZmcuY3VycmVuY3kgJiYgMiA8PSB0aGlzLl9idWlsZENmZy5yYXRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBjZmdCeUlEID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLl9idWlsZENmZy5jdXJyZW5jeSk7XHJcbiAgICAgICAgICAgIGlmIChjZmdCeUlEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXRpbHMuZm9ybWF0X3RpbWUodGhpcy5fYnVpbGRDZmcucmF0ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzBdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJT4bqjbiB4deG6pXQgXCIgKyB0aGlzLl9idWlsZENmZy5yYXRlWzBdICsgXCIgXCIgKyBjZmdCeUlELm5hbWU7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuYXR0ck5vZGVbMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9hdHRySWNvbi9QZXJrX1RpbWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzFdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIwL1wiICsgdGhpcy5fYnVpbGRDZmcuY2FwYWNpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzFdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJMxrB1IHRy4buvIHThu5FpIMSRYVwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbmN5ID0gdGhpcy5fYnVpbGRDZmcuY3VycmVuY3k7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNmZ0J5SUQudHlwZSA9PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3kgPSAxMTAwNDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2ZnQnlJRC50eXBlID09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAoY3VycmVuY3kgPSAxMTAwNSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmF0dHJOb2RlWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvYXR0ckljb24vXCIgKyBjdXJyZW5jeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzJdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fYnVpbGRDZmcuaHAgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsyXS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiU2luaCBt4bqhbmdcIjtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5hdHRyTm9kZVsyXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2F0dHJJY29uL1BlcmtfSFBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1clByb2R1Y3ROdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbdGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlXS5wcm9kdWN0RGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBwcm9kdWN0RGF0YS5mdWxsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQcm9kdWN0TnVtID0gcHJvZHVjdERhdGEuY3VyTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvZHVjdERhdGEuZnVsbFRpbWUgPiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0RGF0YS5iZWdpblRpbWUgKyBwcm9kdWN0RGF0YS5wcm9kdWN0Q2QgPiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQcm9kdWN0TnVtID0gcHJvZHVjdERhdGEuY3VyTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IHByb2R1Y3REYXRhLmJlZ2luVGltZSArIHByb2R1Y3REYXRhLnByb2R1Y3RDZCAtIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSAtIHByb2R1Y3REYXRhLmJlZ2luVGltZSkgLyBwcm9kdWN0RGF0YS5wcm9kdWN0Q2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUHJvZHVjdE51bSA9IF9udW1iZXIgKiBwcm9kdWN0RGF0YS5wcm9kdWN0TnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IHByb2R1Y3REYXRhLmJlZ2luVGltZSArIChfbnVtYmVyICsgMSkgKiBwcm9kdWN0RGF0YS5wcm9kdWN0Q2QgLSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUHJvZHVjdE51bSA9IHByb2R1Y3REYXRhLm1heE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkVHlwZSAhPSBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gMCA8IHRoaXMuX2N1clByb2R1Y3ROdW0gPyB0aGlzLmJ0blNwcmZyYW1lTGlzdFswXSA6IHRoaXMuYnRuU3ByZnJhbWVMaXN0WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IDAgPCB0aGlzLl9jdXJQcm9kdWN0TnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5wcm9kdWN0SWNvblNwciwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL1wiICsgdGhpcy5fYnVpbGRDZmcuY3VycmVuY3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLl9jdXJQcm9kdWN0TnVtICsgXCIvXCIgKyB0aGlzLl9idWlsZENmZy5jYXBhY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibG51bS5zdHJpbmcgPSBcIlwiICsgdGhpcy5fY3VyUHJvZHVjdE51bTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvbGVCYXJyZWxEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGVCYXJyZWxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gKyBcIi9cIiArIHRoaXMuX2J1aWxkQ2ZnLmNhcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDwgcm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtICYmIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMykgPCByb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSByb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgLSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gKyBcIi9cIiArIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm1heEJhcnJlbE51bTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2J1aWxkQ2ZnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMF0uYWN0aXZlID0gMCA8IHRoaXMuX2J1aWxkQ2ZnLmhwO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuYXR0ck5vZGVbMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9hdHRySWNvbi9QZXJrX0hQXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fYnVpbGRDZmcuaHAgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzBdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJTaW5oIG3huqFuZ1wiO1xyXG4gICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzFdLmFjdGl2ZSA9IDAgPCB0aGlzLl9idWlsZENmZy5hdHRhY2s7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5hdHRyTm9kZVsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2F0dHJJY29uL1BlcmtfRGVmZW5zZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuX2J1aWxkQ2ZnLmF0dGFjayArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ck5vZGVbMV0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBow7JuZyB0aOG7p1wiO1xyXG4gICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzJdLmFjdGl2ZSA9IDAgPCB0aGlzLl9idWlsZENmZy5kZWZlbnNlO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuYXR0ck5vZGVbMl0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9hdHRySWNvbi9QZXJrX0F0dGFja2Vyc1wiKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsyXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuX2J1aWxkQ2ZnLmRlZmVuc2UgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzJdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJU4bqlbiBjw7RuZ1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKDAgPCB0aGlzLl9yZWNpdmVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUNvbnRhaW5lciArPSBkdDtcclxuICAgICAgICAgICAgaWYgKDEgPD0gdGhpcy50aW1lQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMudGltZUNvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUtLTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWNpdmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQcm9kdWN0TnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbdGhpcy5fYnVpbGRDZmcuYnVpbGRUeXBlXS5wcm9kdWN0RGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2R1Y3REYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBwcm9kdWN0RGF0YS5mdWxsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clByb2R1Y3ROdW0gPSBwcm9kdWN0RGF0YS5jdXJOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb2R1Y3REYXRhLmZ1bGxUaW1lID4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0RGF0YS5iZWdpblRpbWUgKyBwcm9kdWN0RGF0YS5wcm9kdWN0Q2QgPiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clByb2R1Y3ROdW0gPSBwcm9kdWN0RGF0YS5jdXJOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSBwcm9kdWN0RGF0YS5iZWdpblRpbWUgKyBwcm9kdWN0RGF0YS5wcm9kdWN0Q2QgLSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9udW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpIC0gcHJvZHVjdERhdGEuYmVnaW5UaW1lKSAvIHByb2R1Y3REYXRhLnByb2R1Y3RDZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clByb2R1Y3ROdW0gPSBfbnVtYmVyICogcHJvZHVjdERhdGEucHJvZHVjdE51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IHByb2R1Y3REYXRhLmJlZ2luVGltZSArIChfbnVtYmVyICsgMSkgKiBwcm9kdWN0RGF0YS5wcm9kdWN0Q2QgLSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clByb2R1Y3ROdW0gPSBwcm9kdWN0RGF0YS5tYXhOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuX2N1clByb2R1Y3ROdW0gKyBcIi9cIiArIHRoaXMuX2J1aWxkQ2ZnLmNhcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxibG51bS5zdHJpbmcgPSBcIlwiICsgdGhpcy5fY3VyUHJvZHVjdE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQcm9kdWN0TnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9sZUJhcnJlbERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGVCYXJyZWxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzFdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtICsgXCIvXCIgKyB0aGlzLl9idWlsZENmZy5jYXBhY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPCByb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0gJiYgTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSA8IHJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSByb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgLSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgdGhpcy5fcmVjaXZlVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJOb2RlWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXRpbHMuZm9ybWF0X3RpbWUodGhpcy5fcmVjaXZlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFV0aWxzLmZvcm1hdF90aW1lKHRoaXMuX2J1aWxkQ2ZnLnJhdGVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyTm9kZVswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFV0aWxzLmZvcm1hdF90aW1lKHRoaXMuX3JlY2l2ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fOF9CVUlMRElOR19PUEVOX0NMT1NFKTtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5CVUlMRElORk8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0dldCgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZFByb2R1Y3QodGhpcy5fYnVpbGRDZmc/LmJ1aWxkVHlwZSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KHRoaXMuX2J1aWxkQ2ZnPy5jdXJyZW5jeSwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVt0aGlzLl9idWlsZENmZy5idWlsZFR5cGVdLmNlbGxJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHsgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWlsZEluZm87Il19