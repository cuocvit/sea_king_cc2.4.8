"use strict";
cc._RF.push(module, '5605bDkA9BJQLzz3x1RgpQs', 'LuckyWheel');
// lucky_wheel/scripts/LuckyWheel.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var TempData_1 = require("../../start-scene/scripts/TempData");
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var Timer_1 = require("../../start-scene/scripts/Timer");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LuckyWheel = /** @class */ (function (_super) {
    __extends(LuckyWheel, _super);
    function LuckyWheel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.rotate_node = null;
        _this.video_draw_btn = null;
        _this.free_draw_btn = null;
        _this.free_left_sec_lbl = null;
        _this.left_count_lbl = null;
        _this.light_node = null;
        _this._timer = null;
        return _this;
    }
    LuckyWheel.prototype.onEnable = function () {
        TempData_1.TempData.mainFunShowLucky = true;
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        this.update_view();
        this.rotate_node.rotation = 360 / GameManager_1.gm.const.LUCKY_WHEEL_REWARD_ARRAY.length * GameManager_1.gm.data.lucky_wheel_data.last_reward_index;
    };
    LuckyWheel.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        GameManager_1.gm.ui.mapMainUI.show_lucky_wheel_node_entry();
        this._timer && this._timer.stop();
    };
    LuckyWheel.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        var target = event.target;
        var luckyWheelData = GameManager_1.gm.data.lucky_wheel_data;
        if (target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.LuckyWheel);
        }
        else if (target == this.video_draw_btn.node) {
            if (luckyWheelData.left_lucky_wheel_video_count > 0) {
                NetUtils_1.ReportData.instance.report_once_point(10533);
                NetUtils_1.ReportData.instance.report_point(10534);
                GameManager_1.gm.channel.show_video_ad(function () {
                    NetUtils_1.ReportData.instance.report_once_point(10633);
                    NetUtils_1.ReportData.instance.report_point(10634);
                    _this.video_draw_btn.interactable = false;
                    _this.close_btn.interactable = false;
                    Utils_1.Utils.set_sprite_state(_this.video_draw_btn.node, cc.Sprite.State.GRAY);
                    Utils_1.Utils.set_sprite_state(_this.close_btn.node, cc.Sprite.State.GRAY);
                    _this.draw();
                }, this);
            }
            else {
                GameManager_1.gm.ui.show_notice("Không đủ lượt, hãy quay lại vào ngày mai!!!");
            }
        }
        else if (target == this.free_draw_btn.node) {
            if (luckyWheelData.left_lucky_wheel_video_count > 0) {
                this.free_draw_btn.interactable = false;
                this.close_btn.interactable = false;
                Utils_1.Utils.set_sprite_state(this.free_draw_btn.node, cc.Sprite.State.GRAY);
                Utils_1.Utils.set_sprite_state(this.close_btn.node, cc.Sprite.State.GRAY);
                this.draw();
                luckyWheelData.free_timestamp = Date.now() + GameManager_1.gm.const.FREE_DRAW_TIME_INTERVAL;
            }
            else {
                GameManager_1.gm.ui.show_notice("Không đủ lượt, hãy quay lại vào ngày mai!!!");
            }
        }
    };
    LuckyWheel.prototype.update_view = function () {
        var _this = this;
        var luckyWheelData = GameManager_1.gm.data.lucky_wheel_data;
        this.left_count_lbl.string = cc.js.formatStr("<b>Lượt quay còn lại（<color=#56ff49>%d lần</color>）</b>", luckyWheelData.left_lucky_wheel_video_count);
        if (luckyWheelData.left_lucky_wheel_free_count > 0) {
            this.video_draw_btn.node.active = false;
        }
        else if (luckyWheelData.left_lucky_wheel_video_count > 0) {
            if (Date.now() > luckyWheelData.free_timestamp) {
                this.free_draw_btn.interactable = true;
                this.free_draw_btn.node.active = true;
                this.video_draw_btn.interactable = false;
                this.video_draw_btn.node.active = false;
                this.free_left_sec_lbl.string = "";
            }
            else {
                var remainingTime = Math.ceil((luckyWheelData.free_timestamp - Date.now()) / 1000);
                if (!this._timer) {
                    this._timer = new Timer_1.Timer();
                }
                this._timer.start(function (startTime, currentTime) {
                    _this.free_left_sec_lbl.string = cc.js.formatStr("%s后免费", Utils_1.Utils.format_time(currentTime - startTime));
                    if (currentTime <= startTime) {
                        _this.update_view();
                    }
                }, 1000, remainingTime);
                this.video_draw_btn.interactable = true;
                this.video_draw_btn.node.active = true;
                Utils_1.Utils.set_sprite_state(this.video_draw_btn.node, cc.Sprite.State.NORMAL);
                this.free_draw_btn.interactable = false;
                this.free_draw_btn.node.active = false;
            }
        }
        else {
            this.video_draw_btn.interactable = false;
            this.video_draw_btn.node.active = true;
            this.free_draw_btn.interactable = false;
            this.free_draw_btn.node.active = false;
        }
        this.close_btn.interactable = true;
        Utils_1.Utils.set_sprite_state(this.close_btn.node, cc.Sprite.State.NORMAL);
    };
    LuckyWheel.prototype.random_index = function () {
        var totalWeight = 0;
        for (var _i = 0, _a = GameManager_1.gm.const.LUCKY_WHEEL_REWARD_ARRAY; _i < _a.length; _i++) {
            var reward = _a[_i];
            totalWeight += reward.weight;
        }
        var randomValue = Math.random() * totalWeight;
        var accumulatedWeight = 0;
        for (var i = 0; i < GameManager_1.gm.const.LUCKY_WHEEL_REWARD_ARRAY.length; i++) {
            accumulatedWeight += GameManager_1.gm.const.LUCKY_WHEEL_REWARD_ARRAY[i].weight;
            if (accumulatedWeight > randomValue) {
                return i;
            }
        }
        return 0;
    };
    LuckyWheel.prototype.draw = function () {
        var _this = this;
        var luckyWheelData = GameManager_1.gm.data.lucky_wheel_data;
        var rotationPerReward = 360 / GameManager_1.gm.const.LUCKY_WHEEL_REWARD_ARRAY.length;
        var randomIndex = this.random_index();
        var totalRotation = 360 - luckyWheelData.last_reward_index * rotationPerReward + 1080 + randomIndex * rotationPerReward;
        this.light_node.active = false;
        this.light_node.opacity = 255;
        this.rotate_node.rotation = luckyWheelData.last_reward_index * rotationPerReward;
        this.rotate_node.runAction(cc.sequence(cc.rotateBy(3.8, totalRotation).easing(cc.easeCubicActionOut()), cc.callFunc(function () {
            _this.light_node.active = true;
            _this.light_node.runAction(cc.sequence(cc.blink(1, 10), cc.callFunc(function () {
                _this.light_node.opacity = 255;
                var reward = GameManager_1.gm.const.LUCKY_WHEEL_REWARD_ARRAY[randomIndex];
                if (reward.type == 0) {
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.num);
                    GameManager_1.gm.ui.show_coin_fly(reward.id, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (reward.type == 1) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.num);
                    GameManager_1.gm.ui.show_coin_fly(reward.id, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (reward.type == 2) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(reward.num);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                        idList: [reward.id],
                        numList: [reward.num]
                    });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
                else if (reward.type == 3 || reward.type == 4) {
                    var itemList = [];
                    for (var i = 0; i < reward.num; i++) {
                        itemList.push(reward.id);
                    }
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                        idList: [reward.id],
                        numList: [reward.num]
                    });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                    GameManager_1.gm.data.mapCell_data.addWareHouseList(itemList);
                }
                luckyWheelData.last_reward_index = randomIndex;
                if (luckyWheelData.left_lucky_wheel_free_count > 0) {
                    luckyWheelData.left_lucky_wheel_free_count--;
                }
                else if (luckyWheelData.left_lucky_wheel_video_count > 0) {
                    luckyWheelData.left_lucky_wheel_video_count--;
                }
                luckyWheelData.async_write_data();
                _this.update_view();
            })));
        }, this)));
    };
    __decorate([
        property(cc.Button)
    ], LuckyWheel.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Node)
    ], LuckyWheel.prototype, "rotate_node", void 0);
    __decorate([
        property(cc.Button)
    ], LuckyWheel.prototype, "video_draw_btn", void 0);
    __decorate([
        property(cc.Button)
    ], LuckyWheel.prototype, "free_draw_btn", void 0);
    __decorate([
        property(cc.Label)
    ], LuckyWheel.prototype, "free_left_sec_lbl", void 0);
    __decorate([
        property(cc.RichText)
    ], LuckyWheel.prototype, "left_count_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], LuckyWheel.prototype, "light_node", void 0);
    LuckyWheel = __decorate([
        ccclass
    ], LuckyWheel);
    return LuckyWheel;
}(GameModule_1.GameModule));

cc._RF.pop();