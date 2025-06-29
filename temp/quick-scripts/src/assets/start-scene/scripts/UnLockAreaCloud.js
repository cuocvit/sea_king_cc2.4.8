"use strict";
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