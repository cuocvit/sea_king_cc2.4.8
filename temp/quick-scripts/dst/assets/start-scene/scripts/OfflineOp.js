
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/OfflineOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '16ef5AzZ6lO76rgAYA3c4hy', 'OfflineOp');
// start-scene/scripts/OfflineOp.ts

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
var ChannelManager_1 = require("./ChannelManager");
var NetUtils_1 = require("./NetUtils");
var GameModule_1 = require("./GameModule");
var TempData_1 = require("./TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OfflineOp = /** @class */ (function (_super) {
    __extends(OfflineOp, _super);
    function OfflineOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.photoList = [];
        _this.lblTime = null;
        _this.idList = [11006, 11002, 16001, 17001];
        _this.numList = [1, 5, 3, 2];
        _this.CURTIMES = 5;
        return _this;
    }
    OfflineOp.prototype.onEnable = function () {
        var offlineTime = TempData_1.TempData.offline_time;
        var timeMultiplier = Math.floor(Math.min(offlineTime, 3600) / 600);
        for (var index = 0; index < this.numList.length; index++) {
            this.numList[index] = this.numList[index] * timeMultiplier;
        }
        this.lblTime.string = "Thời gian ngoại tuyến: " + Utils_1.Utils.format_time(offlineTime);
        for (var index = 0; index < this.photoList.length; index++) {
            this.photoList[index].active = false;
            if (this.idList.length > index) {
                this.photoList[index].active = true;
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.idList[index]);
                if (itemConfig) {
                    Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + (itemConfig.lv === 0 ? 1 : itemConfig.lv));
                    Utils_1.Utils.async_set_sprite_frame(this.photoList[index].children[1].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/rewardIcon/" + itemConfig.icon);
                }
                this.photoList[index].children[2].getComponent(cc.Label).string = "x" + this.numList[index];
            }
        }
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    OfflineOp.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    OfflineOp.prototype.onClickOneGet = function () {
        this.getDoubleCb(1);
    };
    OfflineOp.prototype.onClickDoubleItem = function () {
        NetUtils_1.ReportData.instance.report_once_point(10529);
        NetUtils_1.ReportData.instance.report_point(10530);
        GameManager_1.gm.channel.show_video_ad(this.getDoubleCb, this);
    };
    OfflineOp.prototype.getDoubleCb = function (multiplier) {
        if (multiplier === void 0) { multiplier = 5; }
        if (multiplier == 5) {
            NetUtils_1.ReportData.instance.report_once_point(10629);
            NetUtils_1.ReportData.instance.report_point(10630);
        }
        for (var index = 0; index < this.idList.length; index++) {
            if (this.idList[index] == Constants_1.RewardIdEnum.GOLD) {
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this.numList[index] * multiplier);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (this.idList[index] == Constants_1.RewardIdEnum.DIAMOND) {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this.numList[index] * multiplier);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (this.idList[index] == Constants_1.RewardIdEnum.BARREL) {
                GameManager_1.gm.data.mapCell_data.addBarrelNum(this.numList[index] * multiplier);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.BARREL, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), 0, GameManager_1.gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (!(16001 != this.idList[index] && 17001 != this.idList[index])) {
                var splitRewardId = 16001 == this.idList[index] ? 16008 : 17008;
                GameManager_1.gm.data.mapCell_data.splitItemNum(this.numList[index] * multiplier, splitRewardId, 1);
            }
        }
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.OFFLINEOP);
    };
    __decorate([
        property([cc.Node])
    ], OfflineOp.prototype, "photoList", void 0);
    __decorate([
        property(cc.Label)
    ], OfflineOp.prototype, "lblTime", void 0);
    OfflineOp = __decorate([
        ccclass
    ], OfflineOp);
    return OfflineOp;
}(GameModule_1.GameModule));
exports.default = OfflineOp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE9mZmxpbmVPcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLGlDQUFnQztBQUNoQyx5Q0FBdUU7QUFDdkUsbURBQWtEO0FBQ2xELHVDQUF3QztBQUN4QywyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdCLDZCQUFVO0lBQWxDO1FBQUEscUVBd0VDO1FBdEVXLGVBQVMsR0FBYyxFQUFFLENBQUM7UUFHMUIsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFFaEMsWUFBTSxHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsYUFBTyxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsY0FBUSxHQUFXLENBQUMsQ0FBQzs7SUErRGpDLENBQUM7SUE3RGEsNEJBQVEsR0FBbEI7UUFDSSxJQUFNLFdBQVcsR0FBVyxtQkFBUSxDQUFDLFlBQVksQ0FBQztRQUNsRCxJQUFNLGNBQWMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRTdFLEtBQUssSUFBSSxLQUFLLEdBQVcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsY0FBYyxDQUFDO1NBQzlE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QUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzlKO2lCQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RFLElBQU0sYUFBYSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDbEUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekY7U0FDSjtRQUNELGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFyRUQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0RBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDcUI7SUFMdEMsU0FBUztRQURkLE9BQU87T0FDRixTQUFTLENBd0VkO0lBQUQsZ0JBQUM7Q0F4RUQsQUF3RUMsQ0F4RXVCLHVCQUFVLEdBd0VqQztBQUVELGtCQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBSZXdhcmRJZEVudW0sIFNldEl0ZW1OdW1FbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBCQU5ORVJfQURfVFlQRSB9IGZyb20gJy4vQ2hhbm5lbE1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi9OZXRVdGlscyc7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gJy4vVGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIE9mZmxpbmVPcCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgcGhvdG9MaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFRpbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBpZExpc3Q6IG51bWJlcltdID0gWzExMDA2LCAxMTAwMiwgMTYwMDEsIDE3MDAxXTtcclxuICAgIHByaXZhdGUgbnVtTGlzdDogbnVtYmVyW10gPSBbMSwgNSwgMywgMl07XHJcbiAgICBwcml2YXRlIENVUlRJTUVTOiBudW1iZXIgPSA1O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvZmZsaW5lVGltZTogbnVtYmVyID0gVGVtcERhdGEub2ZmbGluZV90aW1lO1xyXG4gICAgICAgIGNvbnN0IHRpbWVNdWx0aXBsaWVyOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgubWluKG9mZmxpbmVUaW1lLCAzNjAwKSAvIDYwMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IHRoaXMubnVtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5udW1MaXN0W2luZGV4XSA9IHRoaXMubnVtTGlzdFtpbmRleF0gKiB0aW1lTXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGJsVGltZS5zdHJpbmcgPSBcIlRo4budaSBnaWFuIG5nb+G6oWkgdHV54bq/bjogXCIgKyBVdGlscy5mb3JtYXRfdGltZShvZmZsaW5lVGltZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXg6IG51bWJlciA9IDA7IGluZGV4IDwgdGhpcy5waG90b0xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvdG9MaXN0W2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaWRMaXN0Lmxlbmd0aCA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBob3RvTGlzdFtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuaWRMaXN0W2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5waG90b0xpc3RbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvY29sb3JfXCIgKyAoaXRlbUNvbmZpZy5sdiA9PT0gMCA/IDEgOiBpdGVtQ29uZmlnLmx2KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnBob3RvTGlzdFtpbmRleF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuTUFQLCBcInJlcy9yZXdhcmRJY29uL1wiICsgaXRlbUNvbmZpZy5pY29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9MaXN0W2luZGV4XS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgdGhpcy5udW1MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnbS5jaGFubmVsLnNob3dfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrT25lR2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0RG91YmxlQ2IoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrRG91YmxlSXRlbSgpOiB2b2lkIHtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNTI5KTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDUzMCk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKHRoaXMuZ2V0RG91YmxlQ2IsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RG91YmxlQ2IobXVsdGlwbGllcjogbnVtYmVyID0gNSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChtdWx0aXBsaWVyID09IDUpIHtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYyOSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjMwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmlkTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaWRMaXN0W2luZGV4XSA9PSBSZXdhcmRJZEVudW0uR09MRCkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgdGhpcy5udW1MaXN0W2luZGV4XSAqIG11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uR09MRCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWRMaXN0W2luZGV4XSA9PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgdGhpcy5udW1MaXN0W2luZGV4XSAqIG11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uRElBTU9ORCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWRMaXN0W2luZGV4XSA9PSBSZXdhcmRJZEVudW0uQkFSUkVMKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRCYXJyZWxOdW0odGhpcy5udW1MaXN0W2luZGV4XSAqIG11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uQkFSUkVMLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksIDAsIGdtLnVpLm1hcE1haW5VSS5iYXJyZWxOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghKDE2MDAxICE9IHRoaXMuaWRMaXN0W2luZGV4XSAmJiAxNzAwMSAhPSB0aGlzLmlkTGlzdFtpbmRleF0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdFJld2FyZElkID0gMTYwMDEgPT0gdGhpcy5pZExpc3RbaW5kZXhdID8gMTYwMDggOiAxNzAwODtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNwbGl0SXRlbU51bSh0aGlzLm51bUxpc3RbaW5kZXhdICogbXVsdGlwbGllciwgc3BsaXRSZXdhcmRJZCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuT0ZGTElORU9QKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZsaW5lT3A7Il19