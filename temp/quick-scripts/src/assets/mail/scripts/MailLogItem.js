"use strict";
cc._RF.push(module, '9016bULZixNyqGJv50qO4pz', 'MailLogItem');
// mail/scripts/MailLogItem.ts

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
// file này không import ở đâu
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListView_1 = require("../../start-scene/scripts/ListView");
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailLogItem = /** @class */ (function (_super) {
    __extends(MailLogItem, _super);
    function MailLogItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemy_name_lbl = null;
        _this.enemy_star_lbl = null;
        _this.replay_btn = null;
        _this.revenge_btn = null;
        _this.mail_hero_list = null;
        _this.mail_log_reward_list = null;
        _this.star_lbl = null;
        _this.star_change_lbl = null;
        _this.result_bg_node = null;
        _this.result_lbl = null;
        _this.reward_lbl = null;
        _this.reward_bg_node = null;
        return _this;
    }
    Object.defineProperty(MailLogItem.prototype, "data", {
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
    MailLogItem.prototype.update_view = function () {
        this.enemy_name_lbl.string = this._data.target_nickname;
        this.enemy_star_lbl.string = Math.max(0, this._data.target_change_star + this._data.target_star) + "";
        this.star_lbl.string = Math.max(0, this._data.star + this._data.change_star) + "";
        this.star_change_lbl.string = (0 < this._data.change_star ? "+" : "") + this._data.change_star;
        if ("1" == this._data.op_type) {
            if (1 == this._data.op_result) {
                this.result_lbl.string = "Bảo vệ thành công!";
                this.result_bg_node.color = cc.color().fromHEX("#9DD3EA");
                this.reward_bg_node.color = cc.color().fromHEX("#FEE693");
                this.reward_lbl.string = "Thưởng";
                this.mail_log_reward_list.node.active = false;
                this.star_change_lbl.node.color = cc.color().fromHEX("#FF0000");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = false;
            }
            else {
                this.result_lbl.string = "Phòng thủ thất bại!";
                this.result_bg_node.color = cc.color().fromHEX("#FF9999");
                this.reward_bg_node.color = cc.color().fromHEX("#cfdce5");
                this.reward_lbl.string = "Mất";
                this.mail_log_reward_list.node.active = false;
                this.mail_log_reward_list.setData(this._data.op_loss_reward);
                this.star_change_lbl.node.color = cc.color().fromHEX("#277E27");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = true;
            }
        }
        else if ("2" == this._data.op_type) {
            if (1 == this._data.op_result) {
                this.result_lbl.string = "Bạn đã thắng!";
                this.result_bg_node.color = cc.color().fromHEX("#9DD3EA");
                this.reward_bg_node.color = cc.color().fromHEX("#FEE693");
                this.reward_lbl.string = "Thưởng ";
                this.mail_log_reward_list.node.active = true;
                this.mail_log_reward_list.setData(this._data.op_reward);
                this.star_change_lbl.node.color = cc.color().fromHEX("#FF0000");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = false;
            }
            else {
                this.result_lbl.string = "Bạn thất bại!";
                this.result_bg_node.color = cc.color().fromHEX("#FF9999");
                this.reward_bg_node.color = cc.color().fromHEX("#cfdce5");
                this.reward_lbl.string = "Mất";
                this.mail_log_reward_list.node.active = false;
                this.star_change_lbl.node.color = cc.color().fromHEX("#277E27");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = true;
            }
        }
        this.mail_hero_list.setData(this._data.target_op_battle);
    };
    MailLogItem.prototype.reset = function () {
        // Reset logic here
    };
    MailLogItem.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.replay_btn.node) {
            GameManager_1.gm.ui.show_notice("Hãy chờ cập nhật sau!");
        }
        else if (event.target == this.revenge_btn.node && this._data && "" != this._data.target_uid) {
            GameManager_1.gm.data.get_rob_record(this._data.target_uid, function () {
                GameManager_1.gm.ui.mapMainUI.revenge(_this._data.target_uid);
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Mail);
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "enemy_name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "enemy_star_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogItem.prototype, "replay_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogItem.prototype, "revenge_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogItem.prototype, "mail_hero_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogItem.prototype, "mail_log_reward_list", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "star_change_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogItem.prototype, "result_bg_node", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "result_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "reward_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogItem.prototype, "reward_bg_node", void 0);
    MailLogItem = __decorate([
        ccclass
    ], MailLogItem);
    return MailLogItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();