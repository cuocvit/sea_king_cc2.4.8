"use strict";
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