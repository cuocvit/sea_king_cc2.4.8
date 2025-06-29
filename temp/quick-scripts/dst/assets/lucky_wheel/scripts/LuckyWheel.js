
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/lucky_wheel/scripts/LuckyWheel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbHVja3lfd2hlZWxcXHNjcmlwdHNcXEx1Y2t5V2hlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQWtFO0FBQ2xFLGlFQUFzRTtBQUN0RSxxRUFBMkQ7QUFDM0QseURBQXdEO0FBQ3hELCtEQUFnRTtBQUNoRSwrREFBOEQ7QUFDOUQsMkVBQTBFO0FBQzFFLHlEQUF3RDtBQUVsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5Qiw4QkFBVTtJQUFuQztRQUFBLHFFQTBMQztRQXhMVyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLHVCQUFpQixHQUFhLElBQUksQ0FBQztRQUduQyxvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFHbkMsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsWUFBTSxHQUFpQixJQUFJLENBQUM7O0lBb0t4QyxDQUFDO0lBbEthLDZCQUFRLEdBQWxCO1FBQ0ksbUJBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDakMsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxnQkFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUM7SUFDNUgsQ0FBQztJQUVTLDhCQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxPQUFP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QVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUN3QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3NEQUNxQjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNpQjtJQXBCakMsVUFBVTtRQURmLE9BQU87T0FDRixVQUFVLENBMExmO0lBQUQsaUJBQUM7Q0ExTEQsQUEwTEMsQ0ExTHdCLHVCQUFVLEdBMExsQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBTZXRJdGVtTnVtRW51bSwgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05ldFV0aWxzJztcclxuaW1wb3J0IHsgVGVtcERhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1RlbXBEYXRhJztcclxuaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tIFwiLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9DaGFubmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVGltZXInO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEx1Y2t5V2hlZWwgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGNsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcm90YXRlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHZpZGVvX2RyYXdfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGZyZWVfZHJhd19idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBmcmVlX2xlZnRfc2VjX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIHByaXZhdGUgbGVmdF9jb3VudF9sYmw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbGlnaHRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZXI6IFRpbWVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIFRlbXBEYXRhLm1haW5GdW5TaG93THVja3kgPSB0cnVlO1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd19iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGVfbm9kZS5yb3RhdGlvbiA9IDM2MCAvIGdtLmNvbnN0LkxVQ0tZX1dIRUVMX1JFV0FSRF9BUlJBWS5sZW5ndGggKiBnbS5kYXRhLmx1Y2t5X3doZWVsX2RhdGEubGFzdF9yZXdhcmRfaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dfbHVja3lfd2hlZWxfbm9kZV9lbnRyeSgpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyICYmIHRoaXMuX3RpbWVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgbHVja3lXaGVlbERhdGEgPSBnbS5kYXRhLmx1Y2t5X3doZWVsX2RhdGE7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5MdWNreVdoZWVsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSB0aGlzLnZpZGVvX2RyYXdfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKGx1Y2t5V2hlZWxEYXRhLmxlZnRfbHVja3lfd2hlZWxfdmlkZW9fY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNTMzKTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNTM0KTtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYzMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MzQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fZHJhd19idG4uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZV9idG4uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZSh0aGlzLnZpZGVvX2RyYXdfYnRuLm5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXRfc3ByaXRlX3N0YXRlKHRoaXMuY2xvc2VfYnRuLm5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJLaMO0bmcgxJHhu6cgbMaw4bujdCwgaMOjeSBxdWF5IGzhuqFpIHbDoG8gbmfDoHkgbWFpISEhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gdGhpcy5mcmVlX2RyYXdfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKGx1Y2t5V2hlZWxEYXRhLmxlZnRfbHVja3lfd2hlZWxfdmlkZW9fY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVfZHJhd19idG4uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlX2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5mcmVlX2RyYXdfYnRuLm5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5jbG9zZV9idG4ubm9kZSwgY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBsdWNreVdoZWVsRGF0YS5mcmVlX3RpbWVzdGFtcCA9IERhdGUubm93KCkgKyBnbS5jb25zdC5GUkVFX0RSQVdfVElNRV9JTlRFUlZBTDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiS2jDtG5nIMSR4bunIGzGsOG7o3QsIGjDo3kgcXVheSBs4bqhaSB2w6BvIG5nw6B5IG1haSEhIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbHVja3lXaGVlbERhdGEgPSBnbS5kYXRhLmx1Y2t5X3doZWVsX2RhdGE7XHJcbiAgICAgICAgdGhpcy5sZWZ0X2NvdW50X2xibC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCI8Yj5MxrDhu6N0IHF1YXkgY8OybiBs4bqhae+8iDxjb2xvcj0jNTZmZjQ5PiVkIGzhuqduPC9jb2xvcj7vvIk8L2I+XCIsIGx1Y2t5V2hlZWxEYXRhLmxlZnRfbHVja3lfd2hlZWxfdmlkZW9fY291bnQpO1xyXG5cclxuICAgICAgICBpZiAobHVja3lXaGVlbERhdGEubGVmdF9sdWNreV93aGVlbF9mcmVlX2NvdW50ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2RyYXdfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsdWNreVdoZWVsRGF0YS5sZWZ0X2x1Y2t5X3doZWVsX3ZpZGVvX2NvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoRGF0ZS5ub3coKSA+IGx1Y2t5V2hlZWxEYXRhLmZyZWVfdGltZXN0YW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVfZHJhd19idG4uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZV9kcmF3X2J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX2RyYXdfYnRuLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb19kcmF3X2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlX2xlZnRfc2VjX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nVGltZSA9IE1hdGguY2VpbCgobHVja3lXaGVlbERhdGEuZnJlZV90aW1lc3RhbXAgLSBEYXRlLm5vdygpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90aW1lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lci5zdGFydCgoc3RhcnRUaW1lOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVfbGVmdF9zZWNfbGJsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIiVz5ZCO5YWN6LS5XCIsIFV0aWxzLmZvcm1hdF90aW1lKGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDw9IHN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCwgcmVtYWluaW5nVGltZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX2RyYXdfYnRuLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX2RyYXdfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy52aWRlb19kcmF3X2J0bi5ub2RlLCBjYy5TcHJpdGUuU3RhdGUuTk9STUFMKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZV9kcmF3X2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZV9kcmF3X2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb19kcmF3X2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb19kcmF3X2J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZV9kcmF3X2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlX2RyYXdfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xvc2VfYnRuLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZSh0aGlzLmNsb3NlX2J0bi5ub2RlLCBjYy5TcHJpdGUuU3RhdGUuTk9STUFMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbV9pbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB0b3RhbFdlaWdodCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgcmV3YXJkIG9mIGdtLmNvbnN0LkxVQ0tZX1dIRUVMX1JFV0FSRF9BUlJBWSkge1xyXG4gICAgICAgICAgICB0b3RhbFdlaWdodCArPSByZXdhcmQud2VpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCkgKiB0b3RhbFdlaWdodDtcclxuICAgICAgICBsZXQgYWNjdW11bGF0ZWRXZWlnaHQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ20uY29uc3QuTFVDS1lfV0hFRUxfUkVXQVJEX0FSUkFZLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFjY3VtdWxhdGVkV2VpZ2h0ICs9IGdtLmNvbnN0LkxVQ0tZX1dIRUVMX1JFV0FSRF9BUlJBWVtpXS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRlZFdlaWdodCA+IHJhbmRvbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbHVja3lXaGVlbERhdGEgPSBnbS5kYXRhLmx1Y2t5X3doZWVsX2RhdGE7XHJcbiAgICAgICAgY29uc3Qgcm90YXRpb25QZXJSZXdhcmQgPSAzNjAgLyBnbS5jb25zdC5MVUNLWV9XSEVFTF9SRVdBUkRfQVJSQVkubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gdGhpcy5yYW5kb21faW5kZXgoKTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gMzYwIC0gbHVja3lXaGVlbERhdGEubGFzdF9yZXdhcmRfaW5kZXggKiByb3RhdGlvblBlclJld2FyZCArIDEwODAgKyByYW5kb21JbmRleCAqIHJvdGF0aW9uUGVyUmV3YXJkO1xyXG5cclxuICAgICAgICB0aGlzLmxpZ2h0X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saWdodF9ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5yb3RhdGVfbm9kZS5yb3RhdGlvbiA9IGx1Y2t5V2hlZWxEYXRhLmxhc3RfcmV3YXJkX2luZGV4ICogcm90YXRpb25QZXJSZXdhcmQ7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRlX25vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5yb3RhdGVCeSgzLjgsIHRvdGFsUm90YXRpb24pLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlnaHRfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWdodF9ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5ibGluaygxLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0X25vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gZ20uY29uc3QuTFVDS1lfV0hFRUxfUkVXQVJEX0FSUkFZW3JhbmRvbUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJld2FyZC50eXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIHJld2FyZC5udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShyZXdhcmQuaWQsIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgcmV3YXJkLm51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KHJld2FyZC5pZCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmQudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRCYXJyZWxOdW0ocmV3YXJkLm51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRMaXN0OiBbcmV3YXJkLmlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiBbcmV3YXJkLm51bV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC50eXBlID09IDMgfHwgcmV3YXJkLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3YXJkLm51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUxpc3QucHVzaChyZXdhcmQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkTGlzdDogW3Jld2FyZC5pZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtTGlzdDogW3Jld2FyZC5udW1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QoaXRlbUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGx1Y2t5V2hlZWxEYXRhLmxhc3RfcmV3YXJkX2luZGV4ID0gcmFuZG9tSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsdWNreVdoZWVsRGF0YS5sZWZ0X2x1Y2t5X3doZWVsX2ZyZWVfY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdWNreVdoZWVsRGF0YS5sZWZ0X2x1Y2t5X3doZWVsX2ZyZWVfY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsdWNreVdoZWVsRGF0YS5sZWZ0X2x1Y2t5X3doZWVsX3ZpZGVvX2NvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHVja3lXaGVlbERhdGEubGVmdF9sdWNreV93aGVlbF92aWRlb19jb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGx1Y2t5V2hlZWxEYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICApKTtcclxuICAgIH1cclxufSJdfQ==