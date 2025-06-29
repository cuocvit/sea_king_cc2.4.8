"use strict";
cc._RF.push(module, 'be1334pQohMwr5cv639Fw17', 'BuyBarrelOp');
// start-scene/scripts/BuyBarrelOp.ts

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
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuyBarrelPanel = /** @class */ (function (_super) {
    __extends(BuyBarrelPanel, _super);
    function BuyBarrelPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barrelNumList = [];
        _this.coinNumList = [];
        _this._barrelNumList = [
            { barrelNum: 40, coin: 33 },
            { barrelNum: 70, coin: 66 },
            { barrelNum: 110, coin: 99 }
        ];
        return _this;
    }
    BuyBarrelPanel.prototype.onEnable = function () {
        for (var t = 0; t < this._barrelNumList.length; t++) {
            this.barrelNumList[t].string = this._barrelNumList[t].barrelNum.toString();
            if (t != 0) {
                this.coinNumList[t].string = this._barrelNumList[t].coin.toString();
            }
        }
    };
    BuyBarrelPanel.prototype.onClickBuy = function (event, index) {
        var number = parseInt(index);
        if (number != 0) {
            if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < this._barrelNumList[number].coin) {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
            }
            else {
                GameManager_1.gm.data.mapCell_data.diamond_buy_barrel_times++;
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this._barrelNumList[number].coin);
                GameManager_1.gm.data.mapCell_data.addBarrelNum(this._barrelNumList[number].barrelNum);
                this.onClosePanel();
                if (number == 1) {
                    NetUtils_1.ReportData.instance.report_point(10303);
                    NetUtils_1.ReportData.instance.report_once_point(10304);
                }
                else if (number == 2) {
                    NetUtils_1.ReportData.instance.report_point(10305);
                    NetUtils_1.ReportData.instance.report_once_point(10306);
                }
                GameManager_1.gm.channel.report_event("diamond_buy_barrel", {
                    event_desc: "钻石购买木桶",
                    buy_count: GameManager_1.gm.data.mapCell_data.diamond_buy_barrel_times,
                    task_desc: cc.js.formatStr("购买木桶%d次", GameManager_1.gm.data.mapCell_data.diamond_buy_barrel_times)
                });
            }
        }
        else {
            this.onClickWatchAd();
        }
    };
    BuyBarrelPanel.prototype.onClickWatchAd = function () {
        GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
    };
    BuyBarrelPanel.prototype.watchAdCb = function () {
        GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times++;
        GameManager_1.gm.data.mapCell_data.addBarrelNum(this._barrelNumList[0].barrelNum);
        this.onClosePanel();
        NetUtils_1.ReportData.instance.report_point(10301);
        NetUtils_1.ReportData.instance.report_once_point(10302);
        GameManager_1.gm.channel.report_event("video_buy_barrel", {
            event_desc: "看视频购买木桶",
            buy_count: GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times,
            task_desc: cc.js.formatStr("购买木桶%d次", GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times)
        });
    };
    BuyBarrelPanel.prototype.onClosePanel = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BUYBARRELOP);
    };
    __decorate([
        property([cc.Label])
    ], BuyBarrelPanel.prototype, "barrelNumList", void 0);
    __decorate([
        property([cc.Label])
    ], BuyBarrelPanel.prototype, "coinNumList", void 0);
    BuyBarrelPanel = __decorate([
        ccclass
    ], BuyBarrelPanel);
    return BuyBarrelPanel;
}(cc.Component));
exports.default = BuyBarrelPanel;

cc._RF.pop();