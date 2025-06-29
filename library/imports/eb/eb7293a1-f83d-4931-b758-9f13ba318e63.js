"use strict";
cc._RF.push(module, 'eb729Oh+D1JMbdYnxO6MY5j', 'GetCoinOp');
// start-scene/scripts/GetCoinOp.ts

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
var Constants_1 = require("./Constants");
var ChannelManager_1 = require("./ChannelManager");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetCoinOp = /** @class */ (function (_super) {
    __extends(GetCoinOp, _super);
    function GetCoinOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinNode = null;
        _this.diamondNode = null;
        _this.titleLbl = null;
        _this.coinLbl = null;
        _this._isGem = false;
        _this._gemNum = 399;
        _this._coinNum = 10000;
        _this._curNum = 0;
        return _this;
    }
    GetCoinOp.prototype.onEnable = function () {
        this._isGem = !!GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GETCOINOP.key);
        this._curNum = this._isGem ? this._gemNum : this._coinNum;
        this.titleLbl.string = this._isGem
            ? "Ưu đãi Kim Cương khi mua"
            : "Ưu đãi Vàng khi mua";
        this.coinNode.active = !this._isGem;
        this.diamondNode.active = this._isGem;
        this.coinLbl.string = this._curNum.toString();
        GameManager_1.gm.channel.report_event("ohayoo_game_button_show", {
            ad_type: "激励视频",
            rit_id: "946114114",
            ad_position: "道具_" + (this._isGem ? "钻石不足！" : "金币不足！"),
            ad_position_type: "道具",
        });
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    GetCoinOp.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    GetCoinOp.prototype.onClickWatchAD = function () {
        // if (this._isGem) {
        //     ReportData.instance.report_once_point(10521);
        //     ReportData.instance.report_point(10522);
        // } else {
        //     ReportData.instance.report_once_point(10523);
        //     ReportData.instance.report_point(10524);
        // }
        // gm.channel.report_event("ohayoo_game_button_click", {
        //     ad_type: "激励视频",
        //     rit_id: "946114114",
        //     ad_position: "道具_" + (this._isGem ? "钻石不足！" : "金币不足！"),
        //     ad_position_type: "道具"
        // });
        // gm.channel.show_video_ad(this.watchAdSucc, this, {
        //     ad_position: "道具_" + (this._isGem ? "钻石不足！" : "金币不足！"),
        //     ad_position_type: "道具"
        // });
    };
    GetCoinOp.prototype.buyGem = function () {
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Buy);
        this.onClosePanel();
    };
    GetCoinOp.prototype.watchAdSucc = function () {
        if (this._isGem) {
            NetUtils_1.ReportData.instance.report_once_point(10621);
            NetUtils_1.ReportData.instance.report_point(10622);
            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this._curNum);
            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
        }
        else {
            NetUtils_1.ReportData.instance.report_once_point(10623);
            NetUtils_1.ReportData.instance.report_point(10624);
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this._curNum);
            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
        }
        this.onClosePanel();
    };
    GetCoinOp.prototype.onClosePanel = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETCOINOP);
    };
    __decorate([
        property(cc.Node)
    ], GetCoinOp.prototype, "coinNode", void 0);
    __decorate([
        property(cc.Node)
    ], GetCoinOp.prototype, "diamondNode", void 0);
    __decorate([
        property(cc.Label)
    ], GetCoinOp.prototype, "titleLbl", void 0);
    __decorate([
        property(cc.Label)
    ], GetCoinOp.prototype, "coinLbl", void 0);
    GetCoinOp = __decorate([
        ccclass
    ], GetCoinOp);
    return GetCoinOp;
}(cc.Component));
exports.default = GetCoinOp;

cc._RF.pop();