
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/UnLockAreaCloud.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3426Lgh3NKJ7jM41JPdJZP', 'UnLockAreaCloud');
// start-scene/scripts/UnLockAreaCloud.ts

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
// *-*
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var ChannelManager_1 = require("./ChannelManager");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UnLockAreaCloud = /** @class */ (function (_super) {
    __extends(UnLockAreaCloud, _super);
    function UnLockAreaCloud() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblName = null;
        _this.lblDesc = null;
        _this.lblDiamond = null;
        _this.btnNode = null;
        _this._curType = 0;
        return _this;
    }
    UnLockAreaCloud.prototype.onEnable = function () {
        this._curType = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.UNLOCKAREACLOUDOP.key);
        var buildLvl = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE).buildLvl;
        this.btnNode.active = buildLvl >= GameManager_1.gm.const.localCloudAreaList[this._curType].lvl;
        this.lblName.string = GameManager_1.gm.const.localCloudAreaList[this._curType].name;
        this.lblDesc.string = "Thành phố chính cấp " + GameManager_1.gm.const.localCloudAreaList[this._curType].lvl + " sẽ mở khóa.\n" + GameManager_1.gm.const.localCloudAreaList[this._curType].desc;
        this.lblDiamond.string = GameManager_1.gm.const.localCloudAreaList[this._curType].diamond.toString();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    UnLockAreaCloud.prototype.onClickWatchAd = function () {
        GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
    };
    UnLockAreaCloud.prototype.watchAdCb = function () {
        var lvl = GameManager_1.gm.const.localCloudAreaList[this._curType].lvl;
        GameManager_1.gm.data.mapCell_data.unlockSpecialArea(this._curType);
        GameManager_1.gm.data.mapCell_data.openNewAreaByID(this._curType);
        GameManager_1.gm.data.mapCell_data.unlockNewAreaID(this._curType, false);
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.UNLOCKAREACLOUDOP);
        GameManager_1.gm.ui.emit("unlock_cloud_refresh", this._curType);
        GameManager_1.gm.ui.emit("unLockNewArea");
        GameManager_1.gm.channel.report_event("unlock_area", {
            event_desc: "解锁区域",
            desc: "%d级区域%s人数",
            lv: lvl,
            unlock_type: "视频解锁"
        });
        NetUtils_1.ReportData.instance.report_once_point(GameManager_1.gm.const.localCloudAreaList[this._curType].reportNum);
    };
    UnLockAreaCloud.prototype.onClickDiamond = function () {
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum >= GameManager_1.gm.const.localCloudAreaList[this._curType].diamond) {
            var lvl = GameManager_1.gm.const.localCloudAreaList[this._curType].lvl;
            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, GameManager_1.gm.const.localCloudAreaList[this._curType].diamond);
            GameManager_1.gm.data.mapCell_data.unlockSpecialArea(this._curType);
            GameManager_1.gm.data.mapCell_data.openNewAreaByID(this._curType);
            GameManager_1.gm.data.mapCell_data.unlockNewAreaID(this._curType, false);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.UNLOCKAREACLOUDOP);
            GameManager_1.gm.ui.emit("unlock_cloud_refresh", this._curType);
            GameManager_1.gm.ui.emit("unLockNewArea");
            GameManager_1.gm.channel.report_event("unlock_area", {
                event_desc: "解锁区域",
                desc: "%d级区域%s人数",
                lv: lvl,
                unlock_type: "钻石解锁"
            });
            NetUtils_1.ReportData.instance.report_once_point(GameManager_1.gm.const.localCloudAreaList[this._curType].reportNum + 1);
        }
        else {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
        }
    };
    UnLockAreaCloud.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.UNLOCKAREACLOUDOP);
        var mapIndex = GameManager_1.gm.const.localCloudAreaList[this._curType].mapIndex;
        GameManager_1.gm.ui.mapMainUI.playUnLockMainTowerMoveMap(mapIndex.toString());
    };
    UnLockAreaCloud.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    __decorate([
        property(cc.Label)
    ], UnLockAreaCloud.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], UnLockAreaCloud.prototype, "lblDesc", void 0);
    __decorate([
        property(cc.Label)
    ], UnLockAreaCloud.prototype, "lblDiamond", void 0);
    __decorate([
        property(cc.Node)
    ], UnLockAreaCloud.prototype, "btnNode", void 0);
    UnLockAreaCloud = __decorate([
        ccclass
    ], UnLockAreaCloud);
    return UnLockAreaCloud;
}(cc.Component));
exports.default = UnLockAreaCloud;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFVuTG9ja0FyZWFDbG91ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLHlDQUE0RDtBQUM1RCxtREFBa0Q7QUFDbEQsdUNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThCLG1DQUFZO0lBQTFDO1FBQUEscUVBOEVDO1FBNUVXLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGdCQUFVLEdBQW9CLElBQUksQ0FBQztRQUduQyxhQUFPLEdBQW1CLElBQUksQ0FBQztRQUUvQixjQUFRLEdBQVcsQ0FBQyxDQUFDOztJQWlFakMsQ0FBQztJQS9EYSxrQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBVyxDQUFDO1FBQ2hGLElBQU0sUUFBUSxHQUFXLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNwRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLElBQUksZ0JBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3RFLElBQUks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QUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDN0UsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFUyxtQ0FBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUEzRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDd0I7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDcUI7SUFYckMsZUFBZTtRQURwQixPQUFPO09BQ0YsZUFBZSxDQThFcEI7SUFBRCxzQkFBQztDQTlFRCxBQThFQyxDQTlFNkIsRUFBRSxDQUFDLFNBQVMsR0E4RXpDO0FBRUQsa0JBQWUsZUFBZSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKi0qXHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFNldEl0ZW1OdW1FbnVtLCBCdWlsZFR5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBCQU5ORVJfQURfVFlQRSB9IGZyb20gJy4vQ2hhbm5lbE1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi9OZXRVdGlscyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgVW5Mb2NrQXJlYUNsb3VkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsTmFtZTogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibERlc2M6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxEaWFtb25kOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5Ob2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VyVHlwZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3VyVHlwZSA9IGdtLnVpLmdldF9tb2R1bGVfYXJncyhnbS5jb25zdC5VTkxPQ0tBUkVBQ0xPVURPUC5rZXkpIGFzIG51bWJlcjtcclxuICAgICAgICBjb25zdCBidWlsZEx2bDogbnVtYmVyID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRSkuYnVpbGRMdmw7XHJcbiAgICAgICAgdGhpcy5idG5Ob2RlLmFjdGl2ZSA9IGJ1aWxkTHZsID49IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5sdmw7XHJcbiAgICAgICAgdGhpcy5sYmxOYW1lLnN0cmluZyA9IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5uYW1lO1xyXG4gICAgICAgIHRoaXMubGJsRGVzYy5zdHJpbmcgPSBcIlRow6BuaCBwaOG7kSBjaMOtbmggY+G6pXAgXCIgKyBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbdGhpcy5fY3VyVHlwZV0ubHZsICsgXCIgc+G6vSBt4bufIGtow7NhLlxcblwiICsgZ20uY29uc3QubG9jYWxDbG91ZEFyZWFMaXN0W3RoaXMuX2N1clR5cGVdLmRlc2M7XHJcbiAgICAgICAgdGhpcy5sYmxEaWFtb25kLnN0cmluZyA9IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5kaWFtb25kLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1dhdGNoQWQoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKHRoaXMud2F0Y2hBZENiLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhdGNoQWRDYigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsdmw6IG51bWJlciA9IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5sdmw7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEudW5sb2NrU3BlY2lhbEFyZWEodGhpcy5fY3VyVHlwZSk7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub3Blbk5ld0FyZWFCeUlEKHRoaXMuX2N1clR5cGUpO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnVubG9ja05ld0FyZWFJRCh0aGlzLl9jdXJUeXBlLCBmYWxzZSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuVU5MT0NLQVJFQUNMT1VET1ApO1xyXG4gICAgICAgIGdtLnVpLmVtaXQoXCJ1bmxvY2tfY2xvdWRfcmVmcmVzaFwiLCB0aGlzLl9jdXJUeXBlKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwidW5Mb2NrTmV3QXJlYVwiKTtcclxuICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcInVubG9ja19hcmVhXCIsIHtcclxuICAgICAgICAgICAgZXZlbnRfZGVzYzogXCLop6PplIHljLrln59cIixcclxuICAgICAgICAgICAgZGVzYzogXCIlZOe6p+WMuuWfnyVz5Lq65pWwXCIsXHJcbiAgICAgICAgICAgIGx2OiBsdmwsXHJcbiAgICAgICAgICAgIHVubG9ja190eXBlOiBcIuinhumikeino+mUgVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludChnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbdGhpcy5fY3VyVHlwZV0ucmVwb3J0TnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tEaWFtb25kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuZGlhbW9uZE51bSA+PSBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbdGhpcy5fY3VyVHlwZV0uZGlhbW9uZCkge1xyXG4gICAgICAgICAgICBjb25zdCBsdmw6IG51bWJlciA9IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5sdmw7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLlJFRFVDRV9JVEVNX1RZUEUsIGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5kaWFtb25kKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEudW5sb2NrU3BlY2lhbEFyZWEodGhpcy5fY3VyVHlwZSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLm9wZW5OZXdBcmVhQnlJRCh0aGlzLl9jdXJUeXBlKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEudW5sb2NrTmV3QXJlYUlEKHRoaXMuX2N1clR5cGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuVU5MT0NLQVJFQUNMT1VET1ApO1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwidW5sb2NrX2Nsb3VkX3JlZnJlc2hcIiwgdGhpcy5fY3VyVHlwZSk7XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJ1bkxvY2tOZXdBcmVhXCIpO1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcInVubG9ja19hcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi6Kej6ZSB5Yy65Z+fXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIiVk57qn5Yy65Z+fJXPkurrmlbBcIixcclxuICAgICAgICAgICAgICAgIGx2OiBsdmwsXHJcbiAgICAgICAgICAgICAgICB1bmxvY2tfdHlwZTogXCLpkrvnn7Pop6PplIFcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludChnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbdGhpcy5fY3VyVHlwZV0ucmVwb3J0TnVtICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIHRydWUpO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRDT0lOT1ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5VTkxPQ0tBUkVBQ0xPVURPUCk7XHJcbiAgICAgICAgY29uc3QgbWFwSW5kZXg6IG51bWJlciA9IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLl9jdXJUeXBlXS5tYXBJbmRleDtcclxuICAgICAgICBnbS51aS5tYXBNYWluVUkucGxheVVuTG9ja01haW5Ub3dlck1vdmVNYXAobWFwSW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVuTG9ja0FyZWFDbG91ZDsiXX0=