"use strict";
cc._RF.push(module, '492b52uPftJaZvzIcxnSDb6', 'Item');
// buy/scripts/Item.ts

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
exports.Item = void 0;
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.day_lbl = null;
        _this.reward_spr_array = [];
        _this.reward_lbl_array = [];
        _this.receive_btn = null;
        _this.video_receive_btn = null;
        _this.item = null;
        _this.lbl_price = null;
        return _this;
    }
    Object.defineProperty(Item.prototype, "data", {
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
    Item.prototype.update_view = function () {
        var data = this._data;
        this.day_lbl.string = cc.js.formatStr("Khuyến Mãi");
        for (var i = 0; i < data.reward_array.length; i++) {
            console.log(data.reward_array);
            Utils_1.Utils.async_set_sprite_frame(this.reward_spr_array[i], Constants_1.BundleName.MAP, "res/" + data.reward_array[i].reward_id);
            this.reward_lbl_array[i].string =
                data.reward_array[i].reward_num.toString();
        }
        if (data.reward_itemId == 11002 &&
            data.reward_array[1].reward_id == 11002) {
            Utils_1.Utils.async_set_sprite_frame(this.item, Constants_1.BundleName.MAP, "res/rewardIcon/" + data.reward_itemId);
            this.lbl_price.string = data.reward_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
            this.item.node.scale = 0.7;
        }
        else {
            Utils_1.Utils.async_set_sprite_frame(this.item, Constants_1.BundleName.Buy, "" + 2);
            this.item.node.scale = 1;
            this.lbl_price.string = data.reward_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        }
        this.receive_btn.interactable = true;
    };
    Item.prototype.reset = function () { };
    Item.prototype.vnpay = function () {
        var data = this.data;
        console.log(this.encryptNumber(12345) + " so tien : " + data.reward_price);
        window.open("http://localhost:8080/SeverTuanAnh/vnpay_index/" +
            this.encryptNumber(data.reward_price), "_blank");
        localStorage.setItem("reward_price", JSON.stringify(data));
    };
    Item.prototype.encryptNumber = function (number) {
        var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var numStr = number.toString();
        var encrypted = "";
        var key = "KEY";
        var keyLength = key.length;
        for (var i = 0; i < numStr.length; i++) {
            var digit = parseInt(numStr[i]);
            var keyChar = key[i % keyLength]; // Lặp key nếu quá ngắn
            var keyShift = ALPHABET.indexOf(keyChar.toUpperCase()); // Chuyển đổi ký tự key thành số
            if (keyShift === -1) {
                throw new Error("Key ch\u1EE9a k\u00FD t\u1EF1 kh\u00F4ng h\u1EE3p l\u1EC7: " + keyChar);
            }
            var shiftedValue = (digit + keyShift) % 26;
            encrypted += ALPHABET[shiftedValue];
        }
        return encrypted;
    };
    Item.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        var target = event.target;
        if (target == this.receive_btn.node) {
            // this.get_reward(1);
            this.vnpay();
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
    Item.prototype.get_reward = function (multiplier) {
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
    ], Item.prototype, "day_lbl", void 0);
    __decorate([
        property([cc.Sprite])
    ], Item.prototype, "reward_spr_array", void 0);
    __decorate([
        property([cc.Label])
    ], Item.prototype, "reward_lbl_array", void 0);
    __decorate([
        property(cc.Button)
    ], Item.prototype, "receive_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Item.prototype, "video_receive_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], Item.prototype, "item", void 0);
    __decorate([
        property(cc.Label)
    ], Item.prototype, "lbl_price", void 0);
    Item = __decorate([
        ccclass
    ], Item);
    return Item;
}(ListViewItem_1.ListViewItem));
exports.Item = Item;

cc._RF.pop();