"use strict";
cc._RF.push(module, 'b7a65O85OBGE7o6ofmFDndJ', 'GetDoubleRewardOp');
// start-scene/scripts/GetDoubleRewardOp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetDoubleRewardOp = /** @class */ (function (_super) {
    __extends(GetDoubleRewardOp, _super);
    function GetDoubleRewardOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.photoList = [];
        _this.lblTitle = null;
        _this.lblbtn = null;
        _this.curType = 0;
        _this.idList = [];
        _this.numList = [];
        _this.CURTIMES = 10;
        return _this;
    }
    GetDoubleRewardOp.prototype.onEnable = function () {
        var moduleData = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GETDOUBLEOP.key);
        this.curType = moduleData.type;
        this.idList = moduleData.idList;
        this.numList = moduleData.numList;
        this.lblTitle.string = this.curType == 2 ? "Quà linh hồn" : "Quà nhận được";
        this.lblbtn.string = this.curType == 2 ? "Nhận ngay" : "Nhận gấp " + this.CURTIMES;
        this.photoList[0].x = this.idList.length <= 1 ? 0 : -80;
        for (var a = 0; a < this.photoList.length; a++) {
            this.photoList[a].active = false;
            if (this.idList.length > a) {
                this.photoList[a].active = true;
                if (this.idList[a] > 30000) {
                    var event = GameManager_1.gm.data.config_data.getHeroCfgByID(this.idList[a]);
                    if (event) {
                        Utils_1.Utils.async_set_sprite_frame(this.photoList[a].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + event.lv);
                        Utils_1.Utils.async_set_sprite_frame(this.photoList[a].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + event.icon);
                    }
                }
                else {
                    var event = GameManager_1.gm.data.config_data.getItemCfgByID(this.idList[a]);
                    if (event) {
                        Utils_1.Utils.async_set_sprite_frame(this.photoList[a].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + (event.lv == 0 ? 1 : event.lv));
                        if ([11002, 11003, 11006].includes(event.id)) {
                            Utils_1.Utils.async_set_sprite_frame(this.photoList[a].children[1].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/rewardIcon/" + event.icon);
                        }
                        else {
                            Utils_1.Utils.async_set_sprite_frame(this.photoList[a].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + event.icon);
                        }
                    }
                }
                this.photoList[a].children[2].getComponent(cc.Label).string = "x" + this.numList[a];
            }
        }
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    GetDoubleRewardOp.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    GetDoubleRewardOp.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETDOUBLEOP);
    };
    GetDoubleRewardOp.prototype.onClickDoubleItem = function () {
        GameManager_1.gm.channel.show_video_ad(this.getDoubleCb, this);
    };
    GetDoubleRewardOp.prototype.getDoubleCb = function () {
        if (this.curType == 2) {
            GameManager_1.gm.data.mapCell_data.splitItemNum(this.numList[0], 22008, 1);
            GameManager_1.gm.data.mapCell_data.async_write_data();
            GameManager_1.gm.channel.report_event("video_get_soul", {
                event_desc: "看视频注魂的人数",
                desc: "看视频注魂的人数",
                hero_id: 1
            });
            NetUtils_1.ReportData.instance.report_once_point(10891);
            NetUtils_1.ReportData.instance.report_point(10892);
        }
        else {
            var listNum = [];
            for (var e = 0; e < this.idList.length; e++) {
                if (this.idList[e] == Constants_1.RewardIdEnum.GOLD) {
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this.numList[e] * this.CURTIMES);
                    GameManager_1.gm.ui.show_coin_fly(this.idList[e], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (this.idList[e] == Constants_1.RewardIdEnum.DIAMOND) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this.numList[e] * this.CURTIMES);
                    GameManager_1.gm.ui.show_coin_fly(this.idList[e], this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (this.idList[e] == Constants_1.RewardIdEnum.BARREL) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(this.numList[e] * this.CURTIMES);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.BARREL, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), this.numList[e] * this.CURTIMES, GameManager_1.gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else {
                    var num = this.numList[e] * this.CURTIMES;
                    for (var i = 0; i < num; i++) {
                        listNum.push(this.idList[e]);
                    }
                }
            }
            if (listNum.length > 0) {
                GameManager_1.gm.data.mapCell_data.addWareHouseList(listNum);
                GameManager_1.gm.data.mapCell_data.async_write_data();
                NetUtils_1.ReportData.instance.report_once_point(10803);
                NetUtils_1.ReportData.instance.report_point(10804);
            }
        }
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETDOUBLEOP);
    };
    __decorate([
        property([cc.Node])
    ], GetDoubleRewardOp.prototype, "photoList", void 0);
    __decorate([
        property(cc.Label)
    ], GetDoubleRewardOp.prototype, "lblTitle", void 0);
    __decorate([
        property(cc.Label)
    ], GetDoubleRewardOp.prototype, "lblbtn", void 0);
    GetDoubleRewardOp = __decorate([
        ccclass
    ], GetDoubleRewardOp);
    return GetDoubleRewardOp;
}(cc.Component));
exports.default = GetDoubleRewardOp;

cc._RF.pop();