
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GetDoubleRewardOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdldERvdWJsZVJld2FyZE9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiw2Q0FBbUM7QUFDbkMsaUNBQWdDO0FBQ2hDLHlDQUF1RTtBQUN2RSxtREFBa0Q7QUFDbEQsdUNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBUzVDO0lBQWdDLHFDQUFZO0lBQTVDO1FBQUEscUVBc0dDO1FBcEdXLGVBQVMsR0FBYyxFQUFFLENBQUM7UUFHMUIsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFHakMsWUFBTSxHQUFvQixJQUFJLENBQUM7UUFFL0IsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixZQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLGFBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsY0FBUSxHQUFXLEVBQUUsQ0FBQzs7SUF5RmxDLENBQUM7SUF2RmEsb0NBQVEsR0FBbEI7UUFDSSxJQUFNLFVBQVUsR0FBRyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBYSxDQUFDO1FBQy9FLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztRQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1B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LGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEMscUJBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLHFCQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQztTQUNKO1FBQ0QsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQW5HRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNvQjtJQVJyQyxpQkFBaUI7UUFEdEIsT0FBTztPQUNGLGlCQUFpQixDQXNHdEI7SUFBRCx3QkFBQztDQXRHRCxBQXNHQyxDQXRHK0IsRUFBRSxDQUFDLFNBQVMsR0FzRzNDO0FBRUQsa0JBQWUsaUJBQWlCLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgUmV3YXJkSWRFbnVtLCBTZXRJdGVtTnVtRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tICcuL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZXhwb3J0IGludGVyZmFjZSBEb3VibGVPcCB7XHJcbiAgICB0eXBlOiBudW1iZXI7XHJcbiAgICBpZExpc3Q6IG51bWJlcltdO1xyXG4gICAgbnVtTGlzdDogbnVtYmVyW107XHJcbn1cclxuXHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBHZXREb3VibGVSZXdhcmRPcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgcHJpdmF0ZSBwaG90b0xpc3Q6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsVGl0bGU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxidG46IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJUeXBlOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBpZExpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIG51bUxpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIENVUlRJTUVTOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlRGF0YSA9IGdtLnVpLmdldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRET1VCTEVPUC5rZXkpIGFzIERvdWJsZU9wO1xyXG4gICAgICAgIHRoaXMuY3VyVHlwZSA9IG1vZHVsZURhdGEudHlwZTtcclxuICAgICAgICB0aGlzLmlkTGlzdCA9IG1vZHVsZURhdGEuaWRMaXN0O1xyXG4gICAgICAgIHRoaXMubnVtTGlzdCA9IG1vZHVsZURhdGEubnVtTGlzdDtcclxuICAgICAgICB0aGlzLmxibFRpdGxlLnN0cmluZyA9IHRoaXMuY3VyVHlwZSA9PSAyID8gXCJRdcOgIGxpbmggaOG7k25cIiA6IFwiUXXDoCBuaOG6rW4gxJHGsOG7o2NcIjtcclxuICAgICAgICB0aGlzLmxibGJ0bi5zdHJpbmcgPSB0aGlzLmN1clR5cGUgPT0gMiA/IFwiTmjhuq1uIG5nYXlcIiA6IFwiTmjhuq1uIGfhuqVwIFwiKyB0aGlzLkNVUlRJTUVTO1xyXG4gICAgICAgIHRoaXMucGhvdG9MaXN0WzBdLnggPSB0aGlzLmlkTGlzdC5sZW5ndGggPD0gMSA/IDAgOiAtODA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5waG90b0xpc3QubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgdGhpcy5waG90b0xpc3RbYV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlkTGlzdC5sZW5ndGggPiBhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBob3RvTGlzdFthXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWRMaXN0W2FdID4gMzAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5pZExpc3RbYV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucGhvdG9MaXN0W2FdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvY29sb3JfXCIgKyBldmVudC5sdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5waG90b0xpc3RbYV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGV2ZW50Lmljb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuaWRMaXN0W2FdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnBob3RvTGlzdFthXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2NvbG9yX1wiICsgKGV2ZW50Lmx2ID09IDAgPyAxIDogZXZlbnQubHYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFsxMTAwMiwgMTEwMDMsIDExMDA2XS5pbmNsdWRlcyhldmVudC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5waG90b0xpc3RbYV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuTUFQLCBcInJlcy9yZXdhcmRJY29uL1wiICsgZXZlbnQuaWNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucGhvdG9MaXN0W2FdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBldmVudC5pY29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9MaXN0W2FdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyB0aGlzLm51bUxpc3RbYV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdFVERPVUJMRU9QKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tEb3VibGVJdGVtKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLmdldERvdWJsZUNiLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvdWJsZUNiKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmN1clR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zcGxpdEl0ZW1OdW0odGhpcy5udW1MaXN0WzBdLCAyMjAwOCwgMSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJ2aWRlb19nZXRfc291bFwiLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIueci+inhumikeazqOmtgueahOS6uuaVsFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnnIvop4bpopHms6jprYLnmoTkurrmlbBcIixcclxuICAgICAgICAgICAgICAgIGhlcm9faWQ6IDFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA4OTEpO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDg5Mik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdE51bTogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCB0aGlzLmlkTGlzdC5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWRMaXN0W2VdID09IFJld2FyZElkRW51bS5HT0xEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgdGhpcy5udW1MaXN0W2VdICogdGhpcy5DVVJUSU1FUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseSh0aGlzLmlkTGlzdFtlXSwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pZExpc3RbZV0gPT0gUmV3YXJkSWRFbnVtLkRJQU1PTkQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCB0aGlzLm51bUxpc3RbZV0gKiB0aGlzLkNVUlRJTUVTKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KHRoaXMuaWRMaXN0W2VdLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkTGlzdFtlXSA9PSBSZXdhcmRJZEVudW0uQkFSUkVMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkQmFycmVsTnVtKHRoaXMubnVtTGlzdFtlXSAqIHRoaXMuQ1VSVElNRVMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoUmV3YXJkSWRFbnVtLkJBUlJFTCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pLCB0aGlzLm51bUxpc3RbZV0gKiB0aGlzLkNVUlRJTUVTLCBnbS51aS5tYXBNYWluVUkuYmFycmVsTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bSA9IHRoaXMubnVtTGlzdFtlXSAqIHRoaXMuQ1VSVElNRVM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0TnVtLnB1c2godGhpcy5pZExpc3RbZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGlzdE51bS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRXYXJlSG91c2VMaXN0KGxpc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgwMyk7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDgwNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuR0VURE9VQkxFT1ApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHZXREb3VibGVSZXdhcmRPcDsiXX0=