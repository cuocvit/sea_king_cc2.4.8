
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GetCoinOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdldENvaW5PcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLHlDQUEyRDtBQUMzRCxtREFBa0Q7QUFDbEQsdUNBQXdDO0FBR2xDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdCLDZCQUFZO0lBQXBDO1FBQUEscUVBK0ZDO1FBN0ZXLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxhQUFPLEdBQW9CLElBQUksQ0FBQztRQUVoQyxZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQU8sR0FBVyxHQUFHLENBQUM7UUFDdEIsY0FBUSxHQUFXLEtBQUssQ0FBQztRQUN6QixhQUFPLEdBQVcsQ0FBQyxDQUFDOztJQStFaEMsQ0FBQztJQTdFYSw0QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQzlCLENBQUMsQ0FBQywwQkFBMEI7WUFDNUIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMs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LENBQUM7K0NBQ3NCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ3lCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ3NCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ3FCO0lBWHRDLFNBQVM7UUFEZCxPQUFPO09BQ0YsU0FBUyxDQStGZDtJQUFELGdCQUFDO0NBL0ZELEFBK0ZDLENBL0Z1QixFQUFFLENBQUMsU0FBUyxHQStGbkM7QUFFRCxrQkFBZSxTQUFTLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTZXRJdGVtTnVtRW51bSwgUmV3YXJkSWRFbnVtIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEJBTk5FUl9BRF9UWVBFIH0gZnJvbSBcIi4vQ2hhbm5lbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gXCIuL05ldFV0aWxzXCI7XHJcbmltcG9ydCB7IFNpZ25FbnRyeSB9IGZyb20gXCIuL1NpZ25FbnRyeVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEdldENvaW5PcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY29pbk5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZGlhbW9uZE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHRpdGxlTGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgY29pbkxibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9pc0dlbTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZ2VtTnVtOiBudW1iZXIgPSAzOTk7XHJcbiAgICBwcml2YXRlIF9jb2luTnVtOiBudW1iZXIgPSAxMDAwMDtcclxuICAgIHByaXZhdGUgX2N1ck51bTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNHZW0gPSAhIWdtLnVpLmdldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRDT0lOT1Aua2V5KTtcclxuICAgICAgICB0aGlzLl9jdXJOdW0gPSB0aGlzLl9pc0dlbSA/IHRoaXMuX2dlbU51bSA6IHRoaXMuX2NvaW5OdW07XHJcbiAgICAgICAgdGhpcy50aXRsZUxibC5zdHJpbmcgPSB0aGlzLl9pc0dlbVxyXG4gICAgICAgICAgICA/IFwixq91IMSRw6NpIEtpbSBDxrDGoW5nIGtoaSBtdWFcIlxyXG4gICAgICAgICAgICA6IFwixq91IMSRw6NpIFbDoG5nIGtoaSBtdWFcIjtcclxuICAgICAgICB0aGlzLmNvaW5Ob2RlLmFjdGl2ZSA9ICF0aGlzLl9pc0dlbTtcclxuICAgICAgICB0aGlzLmRpYW1vbmROb2RlLmFjdGl2ZSA9IHRoaXMuX2lzR2VtO1xyXG4gICAgICAgIHRoaXMuY29pbkxibC5zdHJpbmcgPSB0aGlzLl9jdXJOdW0udG9TdHJpbmcoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2J1dHRvbl9zaG93XCIsIHtcclxuICAgICAgICAgICAgYWRfdHlwZTogXCLmv4DlirHop4bpopFcIixcclxuICAgICAgICAgICAgcml0X2lkOiBcIjk0NjExNDExNFwiLFxyXG4gICAgICAgICAgICBhZF9wb3NpdGlvbjogXCLpgZPlhbdfXCIgKyAodGhpcy5faXNHZW0gPyBcIumSu+efs+S4jei2s++8gVwiIDogXCLph5HluIHkuI3otrPvvIFcIiksXHJcbiAgICAgICAgICAgIGFkX3Bvc2l0aW9uX3R5cGU6IFwi6YGT5YW3XCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1dhdGNoQUQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX2lzR2VtKSB7XHJcbiAgICAgICAgLy8gICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA1MjEpO1xyXG4gICAgICAgIC8vICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDUyMik7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDUyMyk7XHJcbiAgICAgICAgLy8gICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNTI0KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9idXR0b25fY2xpY2tcIiwge1xyXG4gICAgICAgIC8vICAgICBhZF90eXBlOiBcIua/gOWKseinhumikVwiLFxyXG4gICAgICAgIC8vICAgICByaXRfaWQ6IFwiOTQ2MTE0MTE0XCIsXHJcbiAgICAgICAgLy8gICAgIGFkX3Bvc2l0aW9uOiBcIumBk+WFt19cIiArICh0aGlzLl9pc0dlbSA/IFwi6ZK755+z5LiN6Laz77yBXCIgOiBcIumHkeW4geS4jei2s++8gVwiKSxcclxuICAgICAgICAvLyAgICAgYWRfcG9zaXRpb25fdHlwZTogXCLpgZPlhbdcIlxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLndhdGNoQWRTdWNjLCB0aGlzLCB7XHJcbiAgICAgICAgLy8gICAgIGFkX3Bvc2l0aW9uOiBcIumBk+WFt19cIiArICh0aGlzLl9pc0dlbSA/IFwi6ZK755+z5LiN6Laz77yBXCIgOiBcIumHkeW4geS4jei2s++8gVwiKSxcclxuICAgICAgICAvLyAgICAgYWRfcG9zaXRpb25fdHlwZTogXCLpgZPlhbdcIlxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnV5R2VtKCkge1xyXG4gICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQnV5KTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2VQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2F0Y2hBZFN1Y2MoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzR2VtKSB7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2MjEpO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDYyMik7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFxyXG4gICAgICAgICAgICAgICAgU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ck51bVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFxyXG4gICAgICAgICAgICAgICAgUmV3YXJkSWRFbnVtLkRJQU1PTkQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjIzKTtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MjQpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihcclxuICAgICAgICAgICAgICAgIFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJOdW1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShcclxuICAgICAgICAgICAgICAgIFJld2FyZElkRW51bS5HT0xELFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25DbG9zZVBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlUGFuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2V0Q29pbk9wO1xyXG4iXX0=