"use strict";
cc._RF.push(module, '3dc411wXYpG+qtgsPVNEfEl', 'GetMertrailOp');
// start-scene/scripts/GetMertrailOp.ts

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
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameObject_1 = require("./GameObject");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetMertrailOp = /** @class */ (function (_super) {
    __extends(GetMertrailOp, _super);
    function GetMertrailOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTitle = null;
        _this.itemImgL = null;
        _this.itemImgAd = null;
        _this.lblNum = null;
        return _this;
    }
    GetMertrailOp.prototype.onEnable = function () {
        this.args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GET_MERTRAIL_OP.key);
        var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.args.itemID);
        if (itemConfig) {
            Utils_1.Utils.async_set_sprite_frame(this.itemImgL, Constants_1.BundleName.COMMON, "res/handbook/" + itemConfig.icon);
            this.itemImgL.node.scale = 1.5;
            this.lblNum.string = "x" + this.args.itemNum;
            Utils_1.Utils.async_set_sprite_frame(this.itemImgAd, Constants_1.BundleName.COMMON, "res/handbook/" + itemConfig.icon);
            this.lblTitle.string = "Nhận " + itemConfig.name;
        }
    };
    GetMertrailOp.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GET_MERTRAIL_OP);
    };
    GetMertrailOp.prototype.onClickShowStore = function () {
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Store);
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GET_MERTRAIL_OP);
    };
    GetMertrailOp.prototype.onClickFight = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, 1);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GET_MERTRAIL_OP);
    };
    GetMertrailOp.prototype.onClickWatchAdCb = function () {
        GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
    };
    GetMertrailOp.prototype.watchAdCb = function () {
        NetUtils_1.ReportData.instance.report_once_point(10637);
        NetUtils_1.ReportData.instance.report_point(10638);
        GameManager_1.gm.data.mapCell_data.addItem(this.args.itemID, this.args.itemNum);
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
            idList: [this.args.itemID],
            numList: [this.args.itemNum]
        });
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
        GameManager_1.gm.data.mapCell_data.onekeyGetAllMertrail(this.args.buildType, this.args.buildItemID);
        GameManager_1.gm.ui.emit("update_build_upgrade");
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GET_MERTRAIL_OP);
    };
    __decorate([
        property(cc.Label)
    ], GetMertrailOp.prototype, "lblTitle", void 0);
    __decorate([
        property(cc.Sprite)
    ], GetMertrailOp.prototype, "itemImgL", void 0);
    __decorate([
        property(cc.Sprite)
    ], GetMertrailOp.prototype, "itemImgAd", void 0);
    __decorate([
        property(cc.Label)
    ], GetMertrailOp.prototype, "lblNum", void 0);
    GetMertrailOp = __decorate([
        ccclass
    ], GetMertrailOp);
    return GetMertrailOp;
}(GameObject_1.GameObject));
exports.default = GetMertrailOp;

cc._RF.pop();