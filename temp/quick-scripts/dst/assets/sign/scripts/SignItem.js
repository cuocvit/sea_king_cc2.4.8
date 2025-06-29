
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/sign/scripts/SignItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c531L4MV9E+b7Bs9gtc+0B', 'SignItem');
// sign/scripts/SignItem.ts

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
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignItem = /** @class */ (function (_super) {
    __extends(SignItem, _super);
    function SignItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.day_lbl = null;
        _this.reward_spr_array = [];
        _this.reward_lbl_array = [];
        _this.receive_btn = null;
        _this.video_receive_btn = null;
        return _this;
    }
    Object.defineProperty(SignItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    SignItem.prototype.update_view = function () {
        var data = this._data;
        this.day_lbl.string = cc.js.formatStr("Ngày thứ %d", data.day);
        for (var i = 0; i < data.reward_array.length; i++) {
            Utils_1.Utils.async_set_sprite_frame(this.reward_spr_array[i], Constants_1.BundleName.MAP, "res/" + data.reward_array[i].reward_id);
            this.reward_lbl_array[i].string =
                data.reward_array[i].reward_num.toString();
            console.log("res/" + data.reward_array[i].reward_id);
        }
        this.receive_btn.node.active = data.state == 0 || data.state == 1;
        Utils_1.Utils.set_sprite_state(this.receive_btn.node, data.state == 0 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        this.receive_btn.interactable = data.state == 1;
        this.video_receive_btn.node.active = data.state == 2 || data.state == 3;
        Utils_1.Utils.set_sprite_state(this.video_receive_btn.node, data.state == 3 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        this.video_receive_btn.interactable = data.state == 2;
        if (this.video_receive_btn.node.active) {
            GameManager_1.gm.channel.report_event("ohayoo_game_button_show", {
                ad_type: "激励视频",
                rit_id: "946114114",
                ad_position: "签到_三倍奖励",
                ad_position_type: "签到",
            });
        }
    };
    SignItem.prototype.reset = function () { };
    SignItem.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        var target = event.target;
        if (target == this.receive_btn.node) {
            this.get_reward(1);
        }
        else if (target == this.video_receive_btn.node) {
            NetUtils_1.ReportData.instance.report_once_point(10527);
            NetUtils_1.ReportData.instance.report_point(10528);
            GameManager_1.gm.channel.report_event("ohayoo_game_button_click", {
                ad_type: "激励视频",
                rit_id: "946114114",
                ad_position: "签到_三倍奖励",
                ad_position_type: "签到",
            });
            GameManager_1.gm.channel.show_video_ad(function () {
                NetUtils_1.ReportData.instance.report_once_point(10627);
                NetUtils_1.ReportData.instance.report_point(10628);
                _this.get_reward(3);
            }, this, {
                ad_position: "签到_三倍奖励",
                ad_position_type: "签到",
            });
        }
    };
    SignItem.prototype.get_reward = function (multiplier) {
        NetUtils_1.ReportData.instance.report_once_point(10833);
        var data = this._data;
        var rewardIds = [];
        var rewardNums = [];
        for (var i = 0; i < data.reward_array.length; i++) {
            var reward = data.reward_array[i];
            rewardIds.push(reward.reward_id);
            rewardNums.push(reward.reward_num * multiplier);
            if (reward.reward_id >= 23001 && reward.reward_id <= 23099) {
                GameManager_1.gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
            }
            else if (reward.reward_id == Constants_1.RewardIdEnum.GOLD) {
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num * multiplier);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (reward.reward_id == Constants_1.RewardIdEnum.DIAMOND) {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num * multiplier);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (reward.reward_id == Constants_1.RewardIdEnum.BARREL) {
                GameManager_1.gm.data.mapCell_data.addBarrelNum(reward.reward_num * multiplier);
            }
            else {
                var itemIds = [];
                for (var j = 0; j < reward.reward_num * multiplier; j++) {
                    itemIds.push(reward.reward_id);
                }
                GameManager_1.gm.data.mapCell_data.addWareHouseList(itemIds);
            }
        }
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
            idList: rewardIds,
            numList: rewardNums,
        });
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
        data.state = multiplier == 1 ? 2 : 3;
        GameManager_1.gm.data.sign_data.sign_state = data.state;
        GameManager_1.gm.data.sign_data.async_write_data();
    };
    __decorate([
        property(cc.Label)
    ], SignItem.prototype, "day_lbl", void 0);
    __decorate([
        property([cc.Sprite])
    ], SignItem.prototype, "reward_spr_array", void 0);
    __decorate([
        property([cc.Label])
    ], SignItem.prototype, "reward_lbl_array", void 0);
    __decorate([
        property(cc.Button)
    ], SignItem.prototype, "receive_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SignItem.prototype, "video_receive_btn", void 0);
    SignItem = __decorate([
        ccclass
    ], SignItem);
    return SignItem;
}(ListViewItem_1.ListViewItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2lnblxcc2NyaXB0c1xcU2lnbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCwrREFBZ0U7QUFDaEUscUVBQTJEO0FBQzNELGlFQUk2QztBQUd2QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qiw0QkFBWTtJQUFuQztRQUFBLHFFQWtKQztRQWhKVyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLHNCQUFnQixHQUFnQixFQUFFLENBQUM7UUFHbkMsc0JBQWdCLEdBQWUsRUFBRSxDQUFDO1FBR2xDLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLHVCQUFpQixHQUFjLElBQUksQ0FBQzs7SUFvSWhELENBQUM7SUFoSUcsc0JBQVcsMEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBbUI7WUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUxBO0lBT00sOEJBQVcsR0FBbEI7UUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLGFBQUssQ0FBQyxzQkFBc0IsQ0FDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUN4QixzQkFBVSxDQUFDLEdBQUcsRUFDZCxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQzFDLENBQUM7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNsRSxhQUFLLENBQUMsZ0JBQWdCLENBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUNyQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2xFLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN4RSxhQUFLLENBQUMsZ0JBQWdCLENBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQzNCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFB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aWV3SXRlbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3SXRlbVwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tIFwiLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlsc1wiO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBSZXdhcmRJZEVudW0sXHJcbiAgICBTZXRJdGVtTnVtRW51bSxcclxuICAgIEJ1bmRsZU5hbWUsXHJcbn0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFNpZ25JdGVtRGF0YSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1NpZ25EYXRhXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgU2lnbkl0ZW0gZXh0ZW5kcyBMaXN0Vmlld0l0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBkYXlfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfc3ByX2FycmF5OiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfbGJsX2FycmF5OiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVjZWl2ZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgdmlkZW9fcmVjZWl2ZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIF9kYXRhOiBTaWduSXRlbURhdGE7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IFNpZ25JdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBTaWduSXRlbURhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB0aGlzLmRheV9sYmwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiTmfDoHkgdGjhu6kgJWRcIiwgZGF0YS5kYXkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5yZXdhcmRfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX3Nwcl9hcnJheVtpXSxcclxuICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICAgICAgXCJyZXMvXCIgKyBkYXRhLnJld2FyZF9hcnJheVtpXS5yZXdhcmRfaWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGJsX2FycmF5W2ldLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJld2FyZF9hcnJheVtpXS5yZXdhcmRfbnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzL1wiICsgZGF0YS5yZXdhcmRfYXJyYXlbaV0ucmV3YXJkX2lkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlX2J0bi5ub2RlLmFjdGl2ZSA9IGRhdGEuc3RhdGUgPT0gMCB8fCBkYXRhLnN0YXRlID09IDE7XHJcbiAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZShcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlX2J0bi5ub2RlLFxyXG4gICAgICAgICAgICBkYXRhLnN0YXRlID09IDAgPyBjYy5TcHJpdGUuU3RhdGUuR1JBWSA6IGNjLlNwcml0ZS5TdGF0ZS5OT1JNQUxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZV9idG4uaW50ZXJhY3RhYmxlID0gZGF0YS5zdGF0ZSA9PSAxO1xyXG4gICAgICAgIHRoaXMudmlkZW9fcmVjZWl2ZV9idG4ubm9kZS5hY3RpdmUgPSBkYXRhLnN0YXRlID09IDIgfHwgZGF0YS5zdGF0ZSA9PSAzO1xyXG4gICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUoXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9fcmVjZWl2ZV9idG4ubm9kZSxcclxuICAgICAgICAgICAgZGF0YS5zdGF0ZSA9PSAzID8gY2MuU3ByaXRlLlN0YXRlLkdSQVkgOiBjYy5TcHJpdGUuU3RhdGUuTk9STUFMXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnZpZGVvX3JlY2VpdmVfYnRuLmludGVyYWN0YWJsZSA9IGRhdGEuc3RhdGUgPT0gMjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9fcmVjZWl2ZV9idG4ubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9idXR0b25fc2hvd1wiLCB7XHJcbiAgICAgICAgICAgICAgICBhZF90eXBlOiBcIua/gOWKseinhumikVwiLFxyXG4gICAgICAgICAgICAgICAgcml0X2lkOiBcIjk0NjExNDExNFwiLFxyXG4gICAgICAgICAgICAgICAgYWRfcG9zaXRpb246IFwi562+5YiwX+S4ieWAjeWlluWKsVwiLFxyXG4gICAgICAgICAgICAgICAgYWRfcG9zaXRpb25fdHlwZTogXCLnrb7liLBcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHt9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gdGhpcy5yZWNlaXZlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0X3Jld2FyZCgxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSB0aGlzLnZpZGVvX3JlY2VpdmVfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDUyNyk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNTI4KTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9idXR0b25fY2xpY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgYWRfdHlwZTogXCLmv4DlirHop4bpopFcIixcclxuICAgICAgICAgICAgICAgIHJpdF9pZDogXCI5NDYxMTQxMTRcIixcclxuICAgICAgICAgICAgICAgIGFkX3Bvc2l0aW9uOiBcIuetvuWIsF/kuInlgI3lpZblirFcIixcclxuICAgICAgICAgICAgICAgIGFkX3Bvc2l0aW9uX3R5cGU6IFwi562+5YiwXCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnNob3dfdmlkZW9fYWQoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYyNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MjgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3Jld2FyZCgzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkX3Bvc2l0aW9uOiBcIuetvuWIsF/kuInlgI3lpZblirFcIixcclxuICAgICAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbl90eXBlOiBcIuetvuWIsFwiLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldF9yZXdhcmQobXVsdGlwbGllcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgzMyk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgY29uc3QgcmV3YXJkSWRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHJld2FyZE51bXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5yZXdhcmRfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gZGF0YS5yZXdhcmRfYXJyYXlbaV07XHJcbiAgICAgICAgICAgIHJld2FyZElkcy5wdXNoKHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICByZXdhcmROdW1zLnB1c2gocmV3YXJkLnJld2FyZF9udW0gKiBtdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXdhcmQucmV3YXJkX2lkID49IDIzMDAxICYmIHJld2FyZC5yZXdhcmRfaWQgPD0gMjMwOTkpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJlZWxVbmxjb2tIZXJvKHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC5yZXdhcmRfaWQgPT0gUmV3YXJkSWRFbnVtLkdPTEQpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkLnJld2FyZF9udW0gKiBtdWx0aXBsaWVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShcclxuICAgICAgICAgICAgICAgICAgICBSZXdhcmRJZEVudW0uR09MRCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTylcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkLnJld2FyZF9pZCA9PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFxyXG4gICAgICAgICAgICAgICAgICAgIFJld2FyZElkRW51bS5ESUFNT05ELFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmQucmV3YXJkX2lkID09IFJld2FyZElkRW51bS5CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JZHMucHVzaChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QoaXRlbUlkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHtcclxuICAgICAgICAgICAgaWRMaXN0OiByZXdhcmRJZHMsXHJcbiAgICAgICAgICAgIG51bUxpc3Q6IHJld2FyZE51bXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgIGRhdGEuc3RhdGUgPSBtdWx0aXBsaWVyID09IDEgPyAyIDogMztcclxuICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5zaWduX3N0YXRlID0gZGF0YS5zdGF0ZTtcclxuICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcbn1cclxuIl19