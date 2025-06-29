"use strict";
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