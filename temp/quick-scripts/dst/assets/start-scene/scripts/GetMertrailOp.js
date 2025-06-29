
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GetMertrailOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdldE1lcnRyYWlsT3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQyxpQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ3pDLDJDQUEwQztBQUMxQyx1Q0FBd0M7QUFHbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEIsaUNBQVU7SUFBdEM7UUFBQSxxRUEyREM7UUF6RFcsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsWUFBTSxHQUFvQixJQUFJLENBQUM7O0lBZ0QzQyxDQUFDO0lBNUNhLGdDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBZSxDQUFDO1FBQzlFLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxJQUFJLFVBQVUsRUFBRTtZQUNaLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLGVBQWUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0MsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFFTyxvQ0FBWSxHQUFwQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTyx3Q0FBZ0IsR0FBeEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU8sb0NBQVksR0FBcEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU8sd0NBQWdCLEdBQXhCO1FBQ0ksZ0JBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLGlDQUFTLEdBQWpCO1FBQ0kscUJBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MscUJBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUM1QyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUMvQixDQUFDLENBQUM7UUFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNuQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBeEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ3NCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ29CO0lBWHJDLGFBQWE7UUFEbEIsT0FBTztPQUNGLGFBQWEsQ0EyRGxCO0lBQUQsb0JBQUM7Q0EzREQsQUEyREMsQ0EzRDJCLHVCQUFVLEdBMkRyQztBQUVELGtCQUFlLGFBQWEsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSAnLi9HYW1lT2JqZWN0JztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBNb2R1bGVBZ3JzIH0gZnJvbSAnLi9VSU1hbmFnZXInO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEdldE1lcnRyYWlsT3AgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsVGl0bGU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaXRlbUltZ0w6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGl0ZW1JbWdBZDogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxOdW06IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBhcmdzOiBNb2R1bGVBZ3JzO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUX01FUlRSQUlMX09QLmtleSkgYXMgTW9kdWxlQWdycztcclxuICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLmFyZ3MuaXRlbUlEKTtcclxuICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaXRlbUltZ0wsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGl0ZW1Db25maWcuaWNvbik7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUltZ0wubm9kZS5zY2FsZSA9IDEuNTtcclxuICAgICAgICAgICAgdGhpcy5sYmxOdW0uc3RyaW5nID0gXCJ4XCIgKyB0aGlzLmFyZ3MuaXRlbU51bTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLml0ZW1JbWdBZCwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgaXRlbUNvbmZpZy5pY29uKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxUaXRsZS5zdHJpbmcgPSBcIk5o4bqtbiBcIiArIGl0ZW1Db25maWcubmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuR0VUX01FUlRSQUlMX09QKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaG93U3RvcmUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuU3RvcmUpO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdFVF9NRVJUUkFJTF9PUCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrRmlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdPQkFUVExFLmtleSwgMSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR09CQVRUTEUpO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdFVF9NRVJUUkFJTF9PUCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrV2F0Y2hBZENiKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLndhdGNoQWRDYiwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3YXRjaEFkQ2IoKTogdm9pZCB7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYzNyk7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MzgpO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEl0ZW0odGhpcy5hcmdzLml0ZW1JRCwgdGhpcy5hcmdzLml0ZW1OdW0pO1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHtcclxuICAgICAgICAgICAgaWRMaXN0OiBbdGhpcy5hcmdzLml0ZW1JRF0sXHJcbiAgICAgICAgICAgIG51bUxpc3Q6IFt0aGlzLmFyZ3MuaXRlbU51bV1cclxuICAgICAgICB9KTtcclxuICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRSRVdBUkRPUCk7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub25la2V5R2V0QWxsTWVydHJhaWwodGhpcy5hcmdzLmJ1aWxkVHlwZSwgdGhpcy5hcmdzLmJ1aWxkSXRlbUlEKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwidXBkYXRlX2J1aWxkX3VwZ3JhZGVcIik7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuR0VUX01FUlRSQUlMX09QKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2V0TWVydHJhaWxPcDsiXX0=