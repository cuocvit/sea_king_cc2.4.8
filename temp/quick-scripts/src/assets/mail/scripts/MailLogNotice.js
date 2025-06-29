"use strict";
cc._RF.push(module, '5ad66Ay3tFNXq65/tmNOOMR', 'MailLogNotice');
// mail/scripts/MailLogNotice.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailLogNotice = /** @class */ (function (_super) {
    __extends(MailLogNotice, _super);
    function MailLogNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.fail_ok_btn = null;
        _this.success_ok_btn = null;
        _this.revenge_btn = null;
        _this.enemy_name_lbl = null;
        _this.enemy_star_lbl = null;
        _this.mail_hero_list = null;
        _this.mail_log_reward_list = null;
        _this.star_lbl = null;
        _this.star_change_lbl = null;
        _this.success_node = null;
        _this.fail_node = null;
        return _this;
    }
    MailLogNotice.prototype.onEnable = function () {
        var _this = this;
        GameManager_1.gm.data.get_player_fight_log_data("1", function () {
            _this._data = GameManager_1.gm.data.mail_temp_data.mail_defense_log_data_array[0];
            _this.update_view();
        });
    };
    MailLogNotice.prototype.onDisable = function () { };
    MailLogNotice.prototype.update_view = function () {
        var data = this._data;
        if (data) {
            this.enemy_name_lbl.string = data.target_nickname;
            this.enemy_star_lbl.string = Math.max(0, data.target_change_star + data.target_star) + "";
            this.star_lbl.string = Math.max(0, data.star + data.change_star) + "";
            this.star_change_lbl.string = (0 < data.change_star ? "+" : "") + data.change_star;
            if ("1" == data.op_type) {
                if (1 == data.op_result) {
                    this.success_node.active = true;
                    this.fail_node.active = false;
                    this.mail_log_reward_list.node.active = false;
                    this.revenge_btn.node.active = false;
                    this.success_ok_btn.node.active = true;
                    this.fail_ok_btn.node.active = false;
                }
                else {
                    this.success_node.active = false;
                    this.fail_node.active = true;
                    this.mail_log_reward_list.node.active = true;
                    this.mail_log_reward_list.setData(data.op_loss_reward);
                    this.revenge_btn.node.active = true;
                    this.success_ok_btn.node.active = false;
                    this.fail_ok_btn.node.active = true;
                }
            }
            this.mail_hero_list.setData(data.target_op_battle);
        }
    };
    MailLogNotice.prototype.editor_on_button_click_handler = function (event) {
        var data;
        if (event.target == this.close_btn.node ||
            event.target == this.anywhere_close_btn.node ||
            event.target == this.fail_ok_btn.node ||
            event.target == this.success_ok_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.MailLogNotice);
        }
        else if (event.target != this.revenge_btn.node || (data = this._data) && "" != data.target_uid) {
            GameManager_1.gm.data.get_rob_record(data.target_uid, function () {
                GameManager_1.gm.ui.mapMainUI.revenge(data.target_uid);
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.MailLogNotice);
            });
        }
    };
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "fail_ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "success_ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "revenge_btn", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "enemy_name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "enemy_star_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogNotice.prototype, "mail_hero_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogNotice.prototype, "mail_log_reward_list", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "star_change_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogNotice.prototype, "success_node", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogNotice.prototype, "fail_node", void 0);
    MailLogNotice = __decorate([
        ccclass
    ], MailLogNotice);
    return MailLogNotice;
}(GameModule_1.GameModule));

cc._RF.pop();