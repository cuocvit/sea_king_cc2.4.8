
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BuyBarrelOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJ1eUJhcnJlbE9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiw2Q0FBbUM7QUFDbkMseUNBQTZDO0FBQzdDLHVDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QixrQ0FBWTtJQUF6QztRQUFBLHFFQXVFQztRQXJFVyxtQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUcvQixpQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUU3QixvQkFBYyxHQUEwQztZQUM1RCxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUMzQixFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUMzQixFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtTQUMvQixDQUFDOztJQTRETixDQUFDO0lBMURhLGlDQUFRLEdBQWxCO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2RTtT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UyxFQUFFLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUI7WUFDekQsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUM7U0FDeEYsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHFDQUFZLEdBQXBCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQXBFRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5REFDa0I7SUFHdkM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7dURBQ2dCO0lBTG5DLGNBQWM7UUFEbkIsT0FBTztPQUNGLGNBQWMsQ0F1RW5CO0lBQUQscUJBQUM7Q0F2RUQsQUF1RUMsQ0F2RTRCLEVBQUUsQ0FBQyxTQUFTLEdBdUV4QztBQUVELGtCQUFlLGNBQWMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTZXRJdGVtTnVtRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEJ1eUJhcnJlbFBhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxyXG4gICAgcHJpdmF0ZSBiYXJyZWxOdW1MaXN0OiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5MYWJlbF0pXHJcbiAgICBwcml2YXRlIGNvaW5OdW1MaXN0OiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfYmFycmVsTnVtTGlzdDogeyBiYXJyZWxOdW06IG51bWJlcjsgY29pbjogbnVtYmVyIH1bXSA9IFtcclxuICAgICAgICB7IGJhcnJlbE51bTogNDAsIGNvaW46IDMzIH0sXHJcbiAgICAgICAgeyBiYXJyZWxOdW06IDcwLCBjb2luOiA2NiB9LFxyXG4gICAgICAgIHsgYmFycmVsTnVtOiAxMTAsIGNvaW46IDk5IH1cclxuICAgIF07XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5fYmFycmVsTnVtTGlzdC5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJlbE51bUxpc3RbdF0uc3RyaW5nID0gdGhpcy5fYmFycmVsTnVtTGlzdFt0XS5iYXJyZWxOdW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKHQgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2luTnVtTGlzdFt0XS5zdHJpbmcgPSB0aGlzLl9iYXJyZWxOdW1MaXN0W3RdLmNvaW4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tCdXkoZXZlbnQ6IGNjLkV2ZW50LCBpbmRleDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyOiBudW1iZXIgPSBwYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgaWYgKG51bWJlciAhPSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuZGlhbW9uZE51bSA8IHRoaXMuX2JhcnJlbE51bUxpc3RbbnVtYmVyXS5jb2luKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUQ09JTk9QLmtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkdFVENPSU5PUCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5kaWFtb25kX2J1eV9iYXJyZWxfdGltZXMrKztcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLlJFRFVDRV9JVEVNX1RZUEUsIHRoaXMuX2JhcnJlbE51bUxpc3RbbnVtYmVyXS5jb2luKTtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bSh0aGlzLl9iYXJyZWxOdW1MaXN0W251bWJlcl0uYmFycmVsTnVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZVBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDMwMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDMwNCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG51bWJlciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTAzMDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTAzMDYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJkaWFtb25kX2J1eV9iYXJyZWxcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi6ZK755+z6LSt5Lmw5pyo5qG2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYnV5X2NvdW50OiBnbS5kYXRhLm1hcENlbGxfZGF0YS5kaWFtb25kX2J1eV9iYXJyZWxfdGltZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFza19kZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCLotK3kubDmnKjmobYlZOasoVwiLCBnbS5kYXRhLm1hcENlbGxfZGF0YS5kaWFtb25kX2J1eV9iYXJyZWxfdGltZXMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGlja1dhdGNoQWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrV2F0Y2hBZCgpOiB2b2lkIHtcclxuICAgICAgICBnbS5jaGFubmVsLnNob3dfdmlkZW9fYWQodGhpcy53YXRjaEFkQ2IsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2F0Y2hBZENiKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLndhdGNoX2FkX2J1eV9iYXJyZWxfdGltZXMrKztcclxuICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRCYXJyZWxOdW0odGhpcy5fYmFycmVsTnVtTGlzdFswXS5iYXJyZWxOdW0pO1xyXG4gICAgICAgIHRoaXMub25DbG9zZVBhbmVsKCk7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTAzMDEpO1xyXG4gICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTAzMDIpO1xyXG4gICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwidmlkZW9fYnV5X2JhcnJlbFwiLCB7XHJcbiAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi55yL6KeG6aKR6LSt5Lmw5pyo5qG2XCIsXHJcbiAgICAgICAgICAgIGJ1eV9jb3VudDogZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0Y2hfYWRfYnV5X2JhcnJlbF90aW1lcyxcclxuICAgICAgICAgICAgdGFza19kZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCLotK3kubDmnKjmobYlZOasoVwiLCBnbS5kYXRhLm1hcENlbGxfZGF0YS53YXRjaF9hZF9idXlfYmFycmVsX3RpbWVzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZVBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkJVWUJBUlJFTE9QKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV5QmFycmVsUGFuZWw7Il19