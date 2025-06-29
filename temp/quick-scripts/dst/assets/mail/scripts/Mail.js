
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/Mail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8fed1i1LzBMFYlha46AQxKz', 'Mail');
// mail/scripts/Mail.ts

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
exports.Mail = void 0;
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var Utils_1 = require("../../start-scene/scripts/Utils");
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Mail = /** @class */ (function (_super) {
    __extends(Mail, _super);
    function Mail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.tab_tog_array = [];
        _this.mail_log_list = null;
        _this.inbox_node = null;
        _this.mail_inbox_list = null;
        _this.delete_all_btn = null;
        _this.receive_all_btn = null;
        _this._tab_index = -1;
        return _this;
    }
    Mail.prototype.onEnable = function () {
        if (this._tab_index == -1) {
            this._tab_index = 0;
            var currentToggle = this.tab_tog_array[this._tab_index];
            if (!currentToggle.isChecked) {
                currentToggle.check();
                currentToggle.isChecked = true;
            }
            this.editor_on_toggle_change_handler(currentToggle);
            GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
            if (GameManager_1.gm.data.server_data.mail_red_point) {
                GameManager_1.gm.data.server_data.mail_red_point = false;
            }
            this.node.active = false;
        }
    };
    Mail.prototype.onDisable = function () {
        this.mail_log_list.reset();
        this.mail_inbox_list.reset();
        this._tab_index = -1;
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Mail.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        var target = event.target;
        if (target == this.close_btn.node || target == this.anywhere_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Mail);
        }
        else if (target == this.delete_all_btn.node) {
            if (GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array.length > 0) {
                this.delete_all_btn.interactable = false;
                Utils_1.Utils.set_sprite_state(this.delete_all_btn.node, cc.Sprite.State.GRAY);
                this.receive_all_btn.interactable = false;
                Utils_1.Utils.set_sprite_state(this.receive_all_btn.node, cc.Sprite.State.GRAY);
                this.delete_all_mail(function () {
                    _this.update_mail_inbox_view();
                });
            }
        }
        else if (target == this.receive_all_btn.node) {
            if (GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array.length > 0) {
                this.delete_all_btn.interactable = false;
                Utils_1.Utils.set_sprite_state(this.delete_all_btn.node, cc.Sprite.State.GRAY);
                this.receive_all_btn.interactable = false;
                Utils_1.Utils.set_sprite_state(this.receive_all_btn.node, cc.Sprite.State.GRAY);
                this.receive_all_mail(function () {
                    _this.update_mail_inbox_view();
                });
            }
        }
    };
    Mail.prototype.delete_all_mail = function (callback) {
        var _this = this;
        var mailList = GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array;
        if (0 < mailList.length) {
            var mail = mailList.pop();
            if (1 == mail.mail_type && 0 != mail.reward_status) {
                var server = GameManager_1.gm.data.server_data;
                var data = {
                    uid: server.uid,
                    token: server.token,
                    mail_id: mail.mail_id,
                    op_status: 2,
                    reward_status: 0
                };
                server.op_player_email(function (t) {
                    t.ResultCode;
                    _this.delete_all_mail(callback);
                }, data);
            }
            else {
                this.delete_all_mail(callback);
            }
        }
        else {
            callback();
        }
    };
    Mail.prototype.receive_all_mail = function (callback) {
        var _this = this;
        var mailList = GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array;
        if (mailList.length > 0) {
            var mail = mailList.pop();
            if (mail.mail_type == 1 && mail.reward_status == 0) {
                var mailData = {
                    uid: GameManager_1.gm.data.server_data.uid,
                    token: GameManager_1.gm.data.server_data.token,
                    mail_id: mail.mail_id,
                    op_status: 0,
                    reward_status: 1,
                };
                GameManager_1.gm.data.server_data.op_player_email(function () {
                    _this.receive_all_mail(callback);
                }, mailData);
            }
            else {
                this.receive_all_mail(callback);
            }
        }
        else {
            callback();
        }
    };
    Mail.prototype.editor_on_toggle_change_handler = function (toggle) {
        this._tab_index = this.tab_tog_array.indexOf(toggle);
        this.mail_log_list.node.active = false;
        this.inbox_node.active = false;
        if (this._tab_index === 0 || this._tab_index === 1) {
            this.mail_log_list.node.active = true;
            this.update_mail_log_view();
        }
        else if (this._tab_index === 2) {
            this.inbox_node.active = true;
            this.update_mail_inbox_view();
        }
    };
    Mail.prototype.update_mail_log_view = function () {
        var _this = this;
        var index = this._tab_index == 0 ? "1" : "2";
        GameManager_1.gm.data.get_player_fight_log_data(index, function () {
            _this.mail_log_list.setData(_this._tab_index == 0 ? GameManager_1.gm.data.mail_temp_data.mail_defense_log_data_array : GameManager_1.gm.data.mail_temp_data.mail_attack_log_data_array);
            _this.mail_log_list.scrollToTop();
        });
    };
    Mail.prototype.update_mail_inbox_view = function () {
        var _this = this;
        GameManager_1.gm.data.get_player_email_data(function () {
            _this.mail_inbox_list.setData(GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array);
            _this.delete_all_btn.interactable = GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array.length > 0;
            Utils_1.Utils.set_sprite_state(_this.delete_all_btn.node, _this.delete_all_btn.interactable ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
            _this.receive_all_btn.interactable = GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array.length > 0;
            Utils_1.Utils.set_sprite_state(_this.receive_all_btn.node, _this.receive_all_btn.interactable ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
        });
    };
    __decorate([
        property(cc.Button)
    ], Mail.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Mail.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property([cc.Toggle])
    ], Mail.prototype, "tab_tog_array", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Mail.prototype, "mail_log_list", void 0);
    __decorate([
        property(cc.Node)
    ], Mail.prototype, "inbox_node", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Mail.prototype, "mail_inbox_list", void 0);
    __decorate([
        property(cc.Button)
    ], Mail.prototype, "delete_all_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Mail.prototype, "receive_all_btn", void 0);
    Mail = __decorate([
        ccclass
    ], Mail);
    return Mail;
}(GameModule_1.GameModule));
exports.Mail = Mail;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELG1FQUFrRTtBQUNsRSwrREFBOEQ7QUFDOUQseURBQXdEO0FBQ3hELDJFQUEwRTtBQUVwRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQix3QkFBVTtJQUFwQztRQUFBLHFFQXFLQztRQW5LVyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLHdCQUFrQixHQUFjLElBQUksQ0FBQztRQUdyQyxtQkFBYSxHQUFnQixFQUFFLENBQUM7UUFHaEMsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFHakMscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFFbEMsZ0JBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQzs7SUE0SXBDLENBQUM7SUExSWEsdUJBQVEsR0FBbEI7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7Z0JBQzFCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDbEM7WUFFRCxJQUFJLENBQUMsK0JBQStCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEQsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxD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LEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuSSxLQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM1RixhQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekksQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbEtEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDOytDQUNrQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDOytDQUNvQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNpQjtJQUduQztRQURDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDO2lEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNxQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNzQjtJQXZCakMsSUFBSTtRQURoQixPQUFPO09BQ0ssSUFBSSxDQXFLaEI7SUFBRCxXQUFDO0NBcktELEFBcUtDLENBckt5Qix1QkFBVSxHQXFLbkM7QUFyS1ksb0JBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3JztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NoYW5uZWxNYW5hZ2VyJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgTWFpbCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGFueXdoZXJlX2Nsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlRvZ2dsZV0pXHJcbiAgICBwcml2YXRlIHRhYl90b2dfYXJyYXk6IGNjLlRvZ2dsZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSBtYWlsX2xvZ19saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGluYm94X25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgbWFpbF9pbmJveF9saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgZGVsZXRlX2FsbF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVjZWl2ZV9hbGxfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3RhYl9pbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90YWJfaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFiX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFRvZ2dsZSA9IHRoaXMudGFiX3RvZ19hcnJheVt0aGlzLl90YWJfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VG9nZ2xlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRvZ2dsZS5jaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXRvcl9vbl90b2dnbGVfY2hhbmdlX2hhbmRsZXIoY3VycmVudFRvZ2dsZSk7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd19iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLnNlcnZlcl9kYXRhLm1haWxfcmVkX3BvaW50KSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLnNlcnZlcl9kYXRhLm1haWxfcmVkX3BvaW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1haWxfbG9nX2xpc3QucmVzZXQoKTtcclxuICAgICAgICB0aGlzLm1haWxfaW5ib3hfbGlzdC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuX3RhYl9pbmRleCA9IC0xO1xyXG4gICAgICAgIGdtLmNoYW5uZWwuaGlkZV9iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSB0aGlzLmNsb3NlX2J0bi5ub2RlIHx8IHRhcmdldCA9PSB0aGlzLmFueXdoZXJlX2Nsb3NlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0Lk1haWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IHRoaXMuZGVsZXRlX2FsbF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2luYm94X2RhdGFfYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5kZWxldGVfYWxsX2J0bi5ub2RlLCBjYy5TcHJpdGUuU3RhdGUuR1JBWSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5yZWNlaXZlX2FsbF9idG4ubm9kZSwgY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVfYWxsX21haWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX21haWxfaW5ib3hfdmlldygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gdGhpcy5yZWNlaXZlX2FsbF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2luYm94X2RhdGFfYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5kZWxldGVfYWxsX2J0bi5ub2RlLCBjYy5TcHJpdGUuU3RhdGUuR1JBWSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5yZWNlaXZlX2FsbF9idG4ubm9kZSwgY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlX2FsbF9tYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9tYWlsX2luYm94X3ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVsZXRlX2FsbF9tYWlsKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWFpbExpc3QgPSBnbS5kYXRhLm1haWxfdGVtcF9kYXRhLm1haWxfaW5ib3hfZGF0YV9hcnJheTtcclxuICAgICAgICBpZiAoMCA8IG1haWxMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBtYWlsID0gbWFpbExpc3QucG9wKCk7XHJcbiAgICAgICAgICAgIGlmICgxID09IG1haWwubWFpbF90eXBlICYmIDAgIT0gbWFpbC5yZXdhcmRfc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBnbS5kYXRhLnNlcnZlcl9kYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1aWQ6IHNlcnZlci51aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHNlcnZlci50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBtYWlsX2lkOiBtYWlsLm1haWxfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3Bfc3RhdHVzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZF9zdGF0dXM6IDBcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub3BfcGxheWVyX2VtYWlsKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5SZXN1bHRDb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlX2FsbF9tYWlsKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH0sIGRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVfYWxsX21haWwoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjZWl2ZV9hbGxfbWFpbChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1haWxMaXN0ID0gZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2luYm94X2RhdGFfYXJyYXk7XHJcblxyXG4gICAgICAgIGlmIChtYWlsTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1haWwgPSBtYWlsTGlzdC5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYWlsLm1haWxfdHlwZSA9PSAxICYmIG1haWwucmV3YXJkX3N0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYWlsRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1aWQ6IGdtLmRhdGEuc2VydmVyX2RhdGEudWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIG1haWxfaWQ6IG1haWwubWFpbF9pZCxcclxuICAgICAgICAgICAgICAgICAgICBvcF9zdGF0dXM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkX3N0YXR1czogMSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5vcF9wbGF5ZXJfZW1haWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZV9hbGxfbWFpbChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9LCBtYWlsRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVfYWxsX21haWwoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fdG9nZ2xlX2NoYW5nZV9oYW5kbGVyKHRvZ2dsZTogY2MuVG9nZ2xlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGFiX2luZGV4ID0gdGhpcy50YWJfdG9nX2FycmF5LmluZGV4T2YodG9nZ2xlKTtcclxuICAgICAgICB0aGlzLm1haWxfbG9nX2xpc3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluYm94X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhYl9pbmRleCA9PT0gMCB8fCB0aGlzLl90YWJfaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWlsX2xvZ19saXN0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfbWFpbF9sb2dfdmlldygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdGFiX2luZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5ib3hfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9tYWlsX2luYm94X3ZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfbWFpbF9sb2dfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3RhYl9pbmRleCA9PSAwID8gXCIxXCIgOiBcIjJcIjtcclxuICAgICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfZmlnaHRfbG9nX2RhdGEoaW5kZXgsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYWlsX2xvZ19saXN0LnNldERhdGEodGhpcy5fdGFiX2luZGV4ID09IDAgPyBnbS5kYXRhLm1haWxfdGVtcF9kYXRhLm1haWxfZGVmZW5zZV9sb2dfZGF0YV9hcnJheSA6IGdtLmRhdGEubWFpbF90ZW1wX2RhdGEubWFpbF9hdHRhY2tfbG9nX2RhdGFfYXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLm1haWxfbG9nX2xpc3Quc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9tYWlsX2luYm94X3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5nZXRfcGxheWVyX2VtYWlsX2RhdGEoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1haWxfaW5ib3hfbGlzdC5zZXREYXRhKGdtLmRhdGEubWFpbF90ZW1wX2RhdGEubWFpbF9pbmJveF9kYXRhX2FycmF5KTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPSBnbS5kYXRhLm1haWxfdGVtcF9kYXRhLm1haWxfaW5ib3hfZGF0YV9hcnJheS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICBVdGlscy5zZXRfc3ByaXRlX3N0YXRlKHRoaXMuZGVsZXRlX2FsbF9idG4ubm9kZSwgdGhpcy5kZWxldGVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPyBjYy5TcHJpdGUuU3RhdGUuTk9STUFMIDogY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVfYWxsX2J0bi5pbnRlcmFjdGFibGUgPSBnbS5kYXRhLm1haWxfdGVtcF9kYXRhLm1haWxfaW5ib3hfZGF0YV9hcnJheS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICBVdGlscy5zZXRfc3ByaXRlX3N0YXRlKHRoaXMucmVjZWl2ZV9hbGxfYnRuLm5vZGUsIHRoaXMucmVjZWl2ZV9hbGxfYnRuLmludGVyYWN0YWJsZSA/IGNjLlNwcml0ZS5TdGF0ZS5OT1JNQUwgOiBjYy5TcHJpdGUuU3RhdGUuR1JBWSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=