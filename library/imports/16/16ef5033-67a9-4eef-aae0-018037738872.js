"use strict";
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