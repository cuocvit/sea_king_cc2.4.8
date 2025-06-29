
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/buy/scripts/Item.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYnV5XFxzY3JpcHRzXFxJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELCtEQUFnRTtBQUNoRSxxRUFBMkQ7QUFDM0QsaUVBSTZDO0FBSXZDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLHdCQUFZO0lBQXRDO1FBQUEscUVBaU1DO1FBL0xXLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsc0JBQWdCLEdBQWdCLEVBQUUsQ0FBQztRQUduQyxzQkFBZ0IsR0FBZSxFQUFFLENBQUM7UUFHbEMsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsdUJBQWlCLEdBQWMsSUFBSSxDQUFDO1FBR3BDLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFhLElBQUksQ0FBQzs7SUE2S3ZDLENBQUM7SUF6S0csc0JBQVcsc0JBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBa0I7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUxBO0lBT00sMEJBQVcsR0FBbEI7UUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXBELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMs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QkFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3SXRlbVwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tIFwiLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlsc1wiO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBSZXdhcmRJZEVudW0sXHJcbiAgICBTZXRJdGVtTnVtRW51bSxcclxuICAgIEJ1bmRsZU5hbWUsXHJcbn0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFNpZ25JdGVtRGF0YSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1NpZ25EYXRhXCI7XHJcbmltcG9ydCB7IEJ1eUl0ZW1EYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgZGF5X2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlXSlcclxuICAgIHByaXZhdGUgcmV3YXJkX3Nwcl9hcnJheTogY2MuU3ByaXRlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLkxhYmVsXSlcclxuICAgIHByaXZhdGUgcmV3YXJkX2xibF9hcnJheTogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHJlY2VpdmVfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHZpZGVvX3JlY2VpdmVfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGl0ZW06IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxfcHJpY2U6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgX2RhdGE6IEJ1eUl0ZW1EYXRhO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBCdXlJdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBCdXlJdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIHRoaXMuZGF5X2xibC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCJLaHV54bq/biBNw6NpXCIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucmV3YXJkX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEucmV3YXJkX2FycmF5KTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX3Nwcl9hcnJheVtpXSxcclxuICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICAgICAgXCJyZXMvXCIgKyBkYXRhLnJld2FyZF9hcnJheVtpXS5yZXdhcmRfaWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGJsX2FycmF5W2ldLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJld2FyZF9hcnJheVtpXS5yZXdhcmRfbnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGRhdGEucmV3YXJkX2l0ZW1JZCA9PSAxMTAwMiAmJlxyXG4gICAgICAgICAgICBkYXRhLnJld2FyZF9hcnJheVsxXS5yZXdhcmRfaWQgPT0gMTEwMDJcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICAgICAgXCJyZXMvcmV3YXJkSWNvbi9cIiArIGRhdGEucmV3YXJkX2l0ZW1JZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmxibF9wcmljZS5zdHJpbmcgPSBkYXRhLnJld2FyZF9wcmljZS50b0xvY2FsZVN0cmluZyhcInZpLVZOXCIsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogXCJWTkRcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbS5ub2RlLnNjYWxlID0gMC43O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5pdGVtLCBCdW5kbGVOYW1lLkJ1eSwgXCJcIiArIDIpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW0ubm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubGJsX3ByaWNlLnN0cmluZyA9IGRhdGEucmV3YXJkX3ByaWNlLnRvTG9jYWxlU3RyaW5nKFwidmktVk5cIiwge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwiY3VycmVuY3lcIixcclxuICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIlZORFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlX2J0bi5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHt9XHJcblxyXG4gICAgcHJpdmF0ZSB2bnBheSgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICB0aGlzLmVuY3J5cHROdW1iZXIoMTIzNDUpICsgXCIgc28gdGllbiA6IFwiICsgZGF0YS5yZXdhcmRfcHJpY2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKFxyXG4gICAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9TZXZlclR1YW5Bbmgvdm5wYXlfaW5kZXgvXCIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmNyeXB0TnVtYmVyKGRhdGEucmV3YXJkX3ByaWNlKSxcclxuICAgICAgICAgICAgXCJfYmxhbmtcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJyZXdhcmRfcHJpY2VcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5jcnlwdE51bWJlcihudW1iZXI6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgQUxQSEFCRVQgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgICAgICAgbGV0IG51bVN0ciA9IG51bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBlbmNyeXB0ZWQgPSBcIlwiO1xyXG4gICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gXCJLRVlcIjtcclxuICAgICAgICBsZXQga2V5TGVuZ3RoID0ga2V5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1TdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRpZ2l0ID0gcGFyc2VJbnQobnVtU3RyW2ldKTtcclxuICAgICAgICAgICAgbGV0IGtleUNoYXIgPSBrZXlbaSAlIGtleUxlbmd0aF07IC8vIEzhurdwIGtleSBu4bq/dSBxdcOhIG5n4bqvblxyXG4gICAgICAgICAgICBsZXQga2V5U2hpZnQgPSBBTFBIQUJFVC5pbmRleE9mKGtleUNoYXIudG9VcHBlckNhc2UoKSk7IC8vIENodXnhu4NuIMSR4buVaSBrw70gdOG7sSBrZXkgdGjDoG5oIHPhu5FcclxuXHJcbiAgICAgICAgICAgIGlmIChrZXlTaGlmdCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5IGNo4bupYSBrw70gdOG7sSBraMO0bmcgaOG7o3AgbOG7hzogJHtrZXlDaGFyfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc2hpZnRlZFZhbHVlID0gKGRpZ2l0ICsga2V5U2hpZnQpICUgMjY7XHJcbiAgICAgICAgICAgIGVuY3J5cHRlZCArPSBBTFBIQUJFVFtzaGlmdGVkVmFsdWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSB0aGlzLnJlY2VpdmVfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5nZXRfcmV3YXJkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLnZucGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gdGhpcy52aWRlb19yZWNlaXZlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA1MjcpO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDUyOCk7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfYnV0dG9uX2NsaWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIGFkX3R5cGU6IFwi5r+A5Yqx6KeG6aKRXCIsXHJcbiAgICAgICAgICAgICAgICByaXRfaWQ6IFwiOTQ2MTE0MTE0XCIsXHJcbiAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbjogXCLnrb7liLBf5LiJ5YCN5aWW5YqxXCIsXHJcbiAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbl90eXBlOiBcIuetvuWIsFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2MjcpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjI4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldF9yZXdhcmQoMyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZF9wb3NpdGlvbjogXCLnrb7liLBf5LiJ5YCN5aWW5YqxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRfcG9zaXRpb25fdHlwZTogXCLnrb7liLBcIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9yZXdhcmQobXVsdGlwbGllcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgzMyk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgY29uc3QgcmV3YXJkSWRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHJld2FyZE51bXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5yZXdhcmRfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gZGF0YS5yZXdhcmRfYXJyYXlbaV07XHJcbiAgICAgICAgICAgIHJld2FyZElkcy5wdXNoKHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICByZXdhcmROdW1zLnB1c2gocmV3YXJkLnJld2FyZF9udW0gKiBtdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXdhcmQucmV3YXJkX2lkID49IDIzMDAxICYmIHJld2FyZC5yZXdhcmRfaWQgPD0gMjMwOTkpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJlZWxVbmxjb2tIZXJvKHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC5yZXdhcmRfaWQgPT0gUmV3YXJkSWRFbnVtLkdPTEQpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkLnJld2FyZF9udW0gKiBtdWx0aXBsaWVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShcclxuICAgICAgICAgICAgICAgICAgICBSZXdhcmRJZEVudW0uR09MRCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTylcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkLnJld2FyZF9pZCA9PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFxyXG4gICAgICAgICAgICAgICAgICAgIFJld2FyZElkRW51bS5ESUFNT05ELFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmQucmV3YXJkX2lkID09IFJld2FyZElkRW51bS5CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JZHMucHVzaChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QoaXRlbUlkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHtcclxuICAgICAgICAgICAgaWRMaXN0OiByZXdhcmRJZHMsXHJcbiAgICAgICAgICAgIG51bUxpc3Q6IHJld2FyZE51bXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgIGRhdGEuc3RhdGUgPSBtdWx0aXBsaWVyID09IDEgPyAyIDogMztcclxuICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5zaWduX3N0YXRlID0gZGF0YS5zdGF0ZTtcclxuICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcbn1cclxuIl19